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
            }, 3000);

            window.fbAuth.getRedirectResult().catch(e => {
                console.error("Errore post-redirect Google:", e);
                if (e.code) alert("Errore di accesso: " + e.code + " - " + e.message);
            });

            window.fbAuth.onAuthStateChanged(async (user) => {
                if (user) {
                    window.Auth._fbUser = user;
                    await window.Auth._handleFirebaseUser(user);
                } else {
                    window.Auth._fbUser = null;
                    const isLocalOnly = window.Auth._user && (window.Auth._user.isGuest || (window.Auth._user.uid && String(window.Auth._user.uid).startsWith('std_')));
                    if (!isLocalOnly) {
                        window.Auth._user = null;
                        localStorage.removeItem('eroi_user');
                    }
                    window.Auth._resolveReady();
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
            const isSuperAdmin = (email === 'prof.memmo@gmail.com');

            // 1. Verifica sull'Hub Centrale (Single Sign-On Auth)
            if (!isSuperAdmin) {
                try {
                    const hubDoc = await window.fbDb.collection('hub_users').doc(fbUser.uid).get();
                    if (!hubDoc.exists) {
                        alert("Profilo Hub non trovato. Completa l'onboarding nell'Hub.");
                        window.location.href = 'https://prof-memmo.github.io/prof-memmo-gestione-siti/portal.html?redirect=rotta_degli_eroi';
                        return;
                    }
                    const hubData = hubDoc.data();
                    if (hubData.statusAccount !== 'active') {
                        alert("Accesso negato: L'account non è attivo nell'Hub (potrebbe essere sospeso o in attesa di approvazione).");
                        window.location.href = 'https://prof-memmo.github.io/prof-memmo-gestione-siti/portal.html';
                        return;
                    }
                    if (!hubData.platforms || !hubData.platforms.rotta_degli_eroi || !hubData.platforms.rotta_degli_eroi.enabled) {
                        alert("Accesso negato: Piattaforma La Rotta degli Eroi non abilitata per il tuo profilo.");
                        window.location.href = 'https://prof-memmo.github.io/prof-memmo-gestione-siti/portal.html';
                        return;
                    }
                } catch (err) {
                    console.error("Errore verifica Hub:", err);
                    alert("Errore di sicurezza Hub. Riprova.");
                    window.location.href = 'https://prof-memmo.github.io/prof-memmo-gestione-siti/portal.html';
                    return;
                }
            }

            const doc = await window.fbDb.collection('users').doc(fbUser.uid).get();
            const pendingRole = localStorage.getItem('pending_role');

            if (doc.exists) {
                window.Auth._user = doc.data();
                if (isSuperAdmin) {
                    window.Auth._user.role = 'docente';
                }
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
                        alert("Codice necessario per riattivare l'account in una classe.");
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
                    name: fbUser.displayName || '',
                    avatar: fbUser.photoURL || 'assets/avatar.png',
                    role: isSuperAdmin ? 'docente' : (pendingRole || 'pending'),
                    points: 0,
                    isGuest: false,
                    email: fbUser.email,
                    setupComplete: isSuperAdmin ? true : false,
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
