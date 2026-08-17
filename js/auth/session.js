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
                        window.dispatchEvent(new CustomEvent('authChange'));
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
            const isSuperAdmin = (email === 'prof.memmo@gmail.com');
            let hubRole = isSuperAdmin ? 'admin' : 'studente';
            let hubName = isSuperAdmin ? 'Prof. Memmo' : (fbUser.displayName || 'Eroe');

            // Impostazione immediata dell'utente per evitare race condition
            window.Auth._user = {
                uid: fbUser.uid,
                name: hubName,
                avatar: fbUser.photoURL || 'assets/avatar.png',
                role: isSuperAdmin ? 'admin' : 'docente',
                points: 0,
                isGuest: false,
                email: fbUser.email,
                setupComplete: true,
                approved: true,
                createdAt: new Date().toISOString()
            };

            let hubDocExists = false;
            // 1. Verifica sull'Hub Centrale (Single Sign-On Auth)
            try {
                const hubDoc = await window.fbDb.collection('hub_users').doc(fbUser.uid).get();
                if (hubDoc.exists) {
                    hubDocExists = true;
                    const hubData = hubDoc.data();
                    if (hubData.role === 'admin' || isSuperAdmin) {
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
                    if (hubData.avatar || (hubData.anagrafica && hubData.anagrafica.avatar)) {
                        window.Auth._user.avatar = hubData.avatar || hubData.anagrafica.avatar;
                    }
                    if (!isSuperAdmin && hubData.statusAccount && (hubData.statusAccount === 'rejected' || hubData.statusAccount === 'suspended')) {
                        alert("Accesso negato: L'account è stato sospeso nell'Hub.");
                        window.location.href = 'https://prof-memmo.github.io/prof-memmo-gestione-siti/portal.html';
                        return;
                    }
                }
            } catch (err) {
                console.warn("Verifica Hub (fallback locale):", err);
            }

            // 2. Impostazione profilo utente sincronizzato
            window.Auth._user.role = isSuperAdmin ? 'admin' : (hubRole || 'studente');
            window.Auth._user.name = isSuperAdmin ? 'Prof. Memmo' : hubName;
            window.Auth._user.setupComplete = (hubDocExists || isSuperAdmin);
            window.Auth._user.approved = true;

            // 3. Lettura/scrittura documento users gioco per salvare XP/Dobloni
            try {
                const doc = await window.fbDb.collection('users').doc(fbUser.uid).get();
                if (doc.exists) {
                    const cloudData = doc.data();
                    window.Auth._user = { ...cloudData, ...window.Auth._user };
                } else {
                    await window.fbDb.collection('users').doc(fbUser.uid).set(window.Auth._user, { merge: true });
                }
            } catch (dbErr) {
                console.warn("Recupero documento users gioco:", dbErr);
            }

            localStorage.setItem('eroi_user', JSON.stringify(window.Auth._user));
            if (window.EroiDB && typeof window.EroiDB.saveUser === 'function') {
                window.EroiDB.saveUser(window.Auth._user.email, window.Auth._user);
            }
            
            window.Auth._resolveReady();
            
            if (typeof hideLoginOverlay === 'function') hideLoginOverlay();
            
            if (window.Progress && typeof window.Progress.load === 'function') {
                await window.Progress.load();
            }

            window.dispatchEvent(new CustomEvent('authChange'));

        } catch (e) {
            console.error("Errore recupero/creazione dati cloud:", e);
            const email = (fbUser && fbUser.email) ? fbUser.email.toLowerCase() : '';
            const isSuperAdmin = (email === 'prof.memmo@gmail.com');
            
            window.Auth._user = {
                uid: fbUser.uid,
                name: isSuperAdmin ? 'Prof. Memmo' : (fbUser.displayName || (email ? email.split('@')[0] : 'Eroe')),
                avatar: fbUser.photoURL || 'assets/avatar.png',
                role: isSuperAdmin ? 'admin' : 'docente',
                points: 0,
                isGuest: false,
                email: fbUser.email,
                setupComplete: true,
                approved: true,
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem('eroi_user', JSON.stringify(window.Auth._user));
            if (window.EroiDB && typeof window.EroiDB.saveUser === 'function') {
                window.EroiDB.saveUser(window.Auth._user.email, window.Auth._user);
            }
            window.Auth._resolveReady();
            if (typeof hideLoginOverlay === 'function') hideLoginOverlay();
            window.dispatchEvent(new CustomEvent('authChange'));
        }
    }
});

// We must call init after it's defined, but wait till it's all loaded.
// It's safer to do this at the end of the modules, or just call it here:
setTimeout(() => { if (window.Auth.init) window.Auth.init(); }, 0);
