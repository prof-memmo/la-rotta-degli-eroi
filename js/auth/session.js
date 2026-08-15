Object.assign(window.Auth = window.Auth || {}, {
    _user: null,
    _fbUser: null,
    _isReady: false,
    _readyPromise: null,
    _resolveReady: null,
    init: () => {
        let fallbackTimeoutId;
        window.Auth._readyPromise = new Promise((resolve) => {
            window.Auth._resolveReady = () => {
                if (fallbackTimeoutId) clearTimeout(fallbackTimeoutId);
                if (!window.Auth._isReady) {
                    window.Auth._isReady = true;
                    resolve();
                }
            };
        });

        const savedUser = localStorage.getItem('eroi_user');
        if (savedUser) {
            try {
                window.Auth._user = JSON.parse(savedUser);
            } catch(e) {
                window.Auth._user = null;
                localStorage.removeItem('eroi_user');
            }
        }

        if (window.fbAuth) {
            fallbackTimeoutId = setTimeout(() => {
                console.warn("Timeout Firebase Auth/Firestore: forzo il completamento del caricamento.");
                window.Auth._resolveReady();
            }, 4000);

            window.fbAuth.getRedirectResult().catch(e => {
                console.error("Errore post-redirect Google:", e);
            });

            window.fbAuth.onAuthStateChanged(async (user) => {
                if (user) {
                    window.Auth._fbUser = user;
                    try {
                        await window.Auth._handleFirebaseUser(user);
                    } finally {
                        window.Auth._resolveReady();
                    }
                } else {
                    window.Auth._fbUser = null;
                    const isLocalOnly = window.Auth._user && (window.Auth._user.isGuest || (window.Auth._user.uid && String(window.Auth._user.uid).startsWith('std_')));
                    if (!isLocalOnly) {
                        window.Auth._user = null;
                        localStorage.removeItem('eroi_user');
                    }
                    window.Auth._resolveReady();
                    window.dispatchEvent(new CustomEvent('authChange'));
                }
            });
        } else {
            window.Auth._resolveReady();
        }
    },

    whenReady: () => {
        return window.Auth._readyPromise;
    },

    _handleFirebaseUser: async (fbUser) => {
        try {
            const email = fbUser.email ? fbUser.email.toLowerCase() : '';
            let isSuperAdmin = (email === 'prof.memmo@gmail.com');
            let hubRole = 'studente';
            let hubName = fbUser.displayName || 'Eroe';

            // 1. Verifica sull'Hub Centrale (Single Sign-On Auth)
            try {
                const hubDoc = await window.fbDb.collection('hub_users').doc(fbUser.uid).get();
                if (hubDoc.exists) {
                    const hubData = hubDoc.data();
                    if (hubData.role === 'admin' || email === 'prof.memmo@gmail.com') {
                        isSuperAdmin = true;
                        hubRole = 'admin';
                    } else if (hubData.role === 'docente') {
                        hubRole = 'docente';
                    } else if (hubData.role === 'viandante' || hubData.role === 'forestiero') {
                        hubRole = 'forestiero';
                    } else {
                        hubRole = 'studente';
                    }
                    if (hubData.anagrafica && hubData.anagrafica.nome) {
                        hubName = hubData.anagrafica.nome;
                    }
                    if (!isSuperAdmin && hubData.statusAccount && (hubData.statusAccount === 'rejected' || hubData.statusAccount === 'suspended')) {
                        alert("Accesso negato: L'account è stato sospeso nell'Hub.");
                        window.location.href = 'https://prof-memmo.github.io/prof-memmo-gestione-siti/portal.html';
                        return;
                    }
                } else {
                    // Profilo non ancora presente su Hub: assegniamo ruolo iniziale
                    if (isSuperAdmin) {
                        hubRole = 'admin';
                    } else {
                        hubRole = 'studente';
                    }
                }
            } catch (err) {
                console.warn("Verifica Hub (fallback locale):", err);
                if (isSuperAdmin) hubRole = 'admin';
            }

            const doc = await window.fbDb.collection('users').doc(fbUser.uid).get();

            if (doc.exists) {
                window.Auth._user = doc.data();
                if (isSuperAdmin) {
                    window.Auth._user.role = 'admin';
                } else if (hubRole) {
                    window.Auth._user.role = hubRole;
                }
                if (!window.Auth._user.name && hubName) {
                    window.Auth._user.name = hubName;
                }
                window.Auth._user.setupComplete = true;
                window.Auth._user.approved = true;

                if (window.Auth._user.status === 'archived' && window.Auth._user.role === 'studente') {
                    const newClassCode = prompt("Il tuo account è archiviato. Inserisci il nuovo Codice Classe per riattivarti:");
                    if (newClassCode) {
                        const targetClass = window.EroiDB ? window.EroiDB.getClassByCode(newClassCode) : null;
                        if (targetClass) {
                            window.Auth._user.status = 'active';
                            window.Auth._user.classId = targetClass.id;
                            await window.fbDb.collection('users').doc(fbUser.uid).update({
                                status: 'active',
                                classId: targetClass.id
                            });
                            alert("Bentornato! Sei stato riattivato.");
                        } else {
                            alert("Codice classe non trovato in locale. Riprova dalla dashboard.");
                            window.Auth._user.status = 'active';
                            window.Auth._user.classId = null;
                            await window.fbDb.collection('users').doc(fbUser.uid).update({
                                status: 'active',
                                classId: null
                            });
                        }
                    } else {
                        window.Auth._user.status = 'active';
                        window.Auth._user.classId = null;
                        await window.fbDb.collection('users').doc(fbUser.uid).update({
                            status: 'active',
                            classId: null
                        });
                    }
                }
                if (!window.Auth._user.email && fbUser.email) {
                    window.Auth._user.email = fbUser.email;
                    await window.fbDb.collection('users').doc(fbUser.uid).update({ email: fbUser.email });
                }
            } else {
                window.Auth._user = {
                    uid: fbUser.uid,
                    name: hubName,
                    avatar: fbUser.photoURL || 'assets/avatar.png',
                    role: isSuperAdmin ? 'admin' : hubRole,
                    points: 0,
                    isGuest: false,
                    email: fbUser.email,
                    setupComplete: true,
                    approved: true,
                    createdAt: new Date().toISOString()
                };
                await window.fbDb.collection('users').doc(fbUser.uid).set(window.Auth._user);
            }

            localStorage.setItem('eroi_user', JSON.stringify(window.Auth._user));
            
            window.Auth._resolveReady();
            
            if (typeof hideLoginOverlay === 'function') hideLoginOverlay();
            
            if (window.Progress && typeof window.Progress.load === 'function') {
                await window.Progress.load();
            }

            window.dispatchEvent(new CustomEvent('authChange'));

        } catch (e) {
            console.error("Errore recupero/creazione dati cloud:", e);
            window.Auth._resolveReady();
            if (e.code === 'permission-denied') {
                alert("Errore di sincronizzazione: Permessi insufficienti sul database Firebase. Contatta l'amministratore per verificare le Security Rules.");
            }
        }
    }
});

// We must call init after it's defined, but wait till it's all loaded.
// It's safer to do this at the end of the modules, or just call it here:
setTimeout(() => { if (window.Auth.init) window.Auth.init(); }, 0);
