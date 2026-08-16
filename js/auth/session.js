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

            // 1. Verifica sull'Hub Centrale (Single Sign-On Auth)
            try {
                const hubDoc = await window.fbDb.collection('hub_users').doc(fbUser.uid).get();
                if (hubDoc.exists) {
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
                    if (!isSuperAdmin && hubData.statusAccount && (hubData.statusAccount === 'rejected' || hubData.statusAccount === 'suspended')) {
                        alert("Accesso negato: L'account è stato sospeso nell'Hub.");
                        window.location.href = 'https://prof-memmo.github.io/prof-memmo-gestione-siti/portal.html';
                        return;
                    }
                }
            } catch (err) {
                console.warn("Verifica Hub (fallback locale):", err);
            }

            // 2. Lettura/scrittura documento utente gioco
            let docExists = false;
            try {
                const doc = await window.fbDb.collection('users').doc(fbUser.uid).get();
                if (doc.exists) {
                    docExists = true;
                    const cloudData = doc.data();
                    window.Auth._user = { ...window.Auth._user, ...cloudData };
                }
            } catch (dbErr) {
                console.warn("Recupero documento users gioco:", dbErr);
            }

            if (isSuperAdmin) {
                window.Auth._user.role = 'admin';
                window.Auth._user.setupComplete = true;
                window.Auth._user.approved = true;
            } else {
                window.Auth._user.role = hubRole || 'studente';
                window.Auth._user.setupComplete = docExists ? (window.Auth._user.setupComplete || false) : false;
                window.Auth._user.approved = docExists ? (window.Auth._user.approved !== false) : false;
            }

            if (hubName && !isSuperAdmin) {
                window.Auth._user.name = hubName;
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
