const Auth = {
    _user: null,
    _fbUser: null,
    _isReady: false,
    _readyPromise: null,
    _resolveReady: null,
    init: () => {
        let fallbackTimeoutId;
        // Inizializza la promise di ready
        Auth._readyPromise = new Promise((resolve) => {
            Auth._resolveReady = () => {
                if (fallbackTimeoutId) clearTimeout(fallbackTimeoutId);
                if (!Auth._isReady) {
                    Auth._isReady = true;
                    resolve();
                }
            };
        });

        // Fallback locale per utenti già esistenti (caricamento sincrono iniziale)
        const savedUser = localStorage.getItem('eroi_user');
        if (savedUser) {
            try {
                Auth._user = JSON.parse(savedUser);
            } catch(e) {
                Auth._user = null;
                localStorage.removeItem('eroi_user');
            }
        }

        // Inizializza listener Firebase
        if (window.fbAuth) {
            fallbackTimeoutId = setTimeout(() => {
                console.warn("Timeout Firebase Auth/Firestore: forzo il completamento del caricamento.");
                Auth._resolveReady();
            }, 3000);

            // Gestione del ritorno dal redirect (se usato)
            window.fbAuth.getRedirectResult().catch(e => {
                console.error("Errore post-redirect Google:", e);
                if (e.code) alert("Errore di accesso: " + e.code + " - " + e.message);
            });

            window.fbAuth.onAuthStateChanged(async (user) => {
                if (user) {
                    Auth._fbUser = user;
                    await Auth._handleFirebaseUser(user);
                } else {
                    Auth._fbUser = null;
                    Auth._user = null;
                    localStorage.removeItem('eroi_user');
                    Auth._resolveReady();
                }
            });
        } else {
            Auth._resolveReady();
        }
    },

    whenReady: () => {
        return Auth._readyPromise;
    },

    _handleFirebaseUser: async (fbUser) => {
        try {
            const doc = await window.fbDb.collection('users').doc(fbUser.uid).get();
            const pendingRole = localStorage.getItem('pending_role');

            if (doc.exists) {
                Auth._user = doc.data();
                // Ensure email is always present and updated from Firebase Auth
                if (!Auth._user.email && fbUser.email) {
                    Auth._user.email = fbUser.email;
                    await window.fbDb.collection('users').doc(fbUser.uid).update({ email: fbUser.email });
                }
            } else {
                // Se l'utente non esiste nel database (es. primo accesso Google), creiamo un profilo base non completato
                Auth._user = {
                    uid: fbUser.uid,
                    name: fbUser.displayName || '',
                    avatar: fbUser.photoURL || 'assets/avatar.png',
                    role: 'pending', // Ruolo da scegliere nell'onboarding
                    points: 0,
                    isGuest: false,
                    email: fbUser.email,
                    setupComplete: false, // Richiede onboarding
                    createdAt: new Date().toISOString()
                };
                // Salvataggio iniziale nel DB per persistere il profilo
                await window.fbDb.collection('users').doc(fbUser.uid).set(Auth._user);
            }
            
            // La verifica dell'amministratore è ora demandata unicamente 
            // alla proprietà "role" salvata nel documento Firestore. 
            // L'hardcoding di ADMIN_EMAILS è stato rimosso per maggiore sicurezza.

            localStorage.setItem('eroi_user', JSON.stringify(Auth._user));
            
            // 1. Risolviamo la promise di ready PRIMA di dispatchare l'evento
            Auth._resolveReady();
            
            // 2. Nascondi l'overlay
            if (typeof hideLoginOverlay === 'function') hideLoginOverlay();
            
            // 3. Carica progressi
            if (window.Progress && typeof window.Progress.load === 'function') {
                await window.Progress.load();
            }

            // 4. Notifica il cambio di stato
            window.dispatchEvent(new CustomEvent('authChange'));
        } catch (e) {
            console.error("Errore recupero/creazione dati cloud:", e);
            Auth._resolveReady(); // Risolviamo comunque per non bloccare l'app
            if (e.code === 'permission-denied') {
                alert("Errore di sincronizzazione: Permessi insufficienti sul database Firebase. Contatta l'amministratore per verificare le Security Rules.");
            }
        }
    },

    isLoggedIn: () => {
        return !!Auth._user;
    },

    getUser: () => {
        return Auth._user || { name: 'Atleta Anonimo', avatar: '👤', role: 'studente', isGuest: true };
    },

    login: async (name, avatar = 'assets/avatar.png', role = 'studente') => {
        // Questo metodo ora richiede l'autenticazione email/Google
        // Non creiamo più profili anonimi
        console.warn("Metodo login() deprecato. Usa loginWithEmail() o loginWithGoogle().");
    },

    loginWithEmail: async (name, email, password) => {
        if (!window.fbAuth) return;
        if (!email || !password) {
            alert("Inserisci email e password per continuare.");
            return;
        }
        /* if (!name) {
            alert("Inserisci il tuo nome.");
            return;
        } */

        try {
            let fbUser;
            try {
                // Prova prima ad accedere (utente esistente)
                const result = await window.fbAuth.signInWithEmailAndPassword(email, password);
                fbUser = result.user;
            } catch (signInError) {
                if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
                    // Utente non trovato: registrazione
                    const result = await window.fbAuth.createUserWithEmailAndPassword(email, password);
                    fbUser = result.user;
                    const finalName = name || email.split('@')[0];
                    await fbUser.updateProfile({ displayName: finalName });
                } else {
                    throw signInError;
                }
            }

            // Salva il nome scelto come pending per _handleFirebaseUser
            localStorage.setItem('pending_display_name', name || email.split('@')[0]);
            Auth._handleFirebaseUser(fbUser);
            if (typeof hideLoginOverlay === 'function') hideLoginOverlay();
        } catch (e) {
            console.error("Errore Email Login:", e);
            if (e.code === 'auth/wrong-password') alert("Password errata. Riprova.");
            else if (e.code === 'auth/invalid-email') alert("Email non valida.");
            else if (e.code === 'auth/weak-password') alert("Password troppo corta (minimo 6 caratteri).");
            else alert("Errore di accesso: " + e.message);
        }
    },

    loginWithClassCode: async (code, studentName) => {
        if (!window.fbDb) return false;
        
        try {
            const q = await window.fbDb.collection('classes').where('code', '==', code.toUpperCase()).get();
            if (q.empty) {
                alert("Codice classe non valido. Chiedi al tuo docente!");
                return false;
            }
            
            const classData = q.docs[0].data();
            const classId = q.docs[0].id;

            Auth._user = {
                uid: 'std_' + Math.random().toString(36).substr(2, 9),
                name: studentName || 'Studente',
                avatar: 'assets/avatar.png',
                role: 'studente',
                classId: classId,
                teacherId: classData.teacherId,
                className: classData.name,
                points: 0,
                isGuest: false,
                setupComplete: true
            };

            localStorage.setItem('eroi_user', JSON.stringify(Auth._user));
            window.dispatchEvent(new CustomEvent('authChange'));
            return true;
        } catch (e) {
            console.error("Errore login con codice:", e);
            alert("Si è verificato un errore durante l'accesso.");
            return false;
        }
    },

    loginWithGoogle: async () => {
        if (!window.fbAuth) return;
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        
        try {
            const result = await window.fbAuth.signInWithPopup(provider);
            if (result && result.user) {
                await Auth._handleFirebaseUser(result.user);
                if (typeof hideLoginOverlay === 'function') hideLoginOverlay();
            }
        } catch (e) {
            console.error("Errore Google Login:", e);
            if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
                console.warn("Popup bloccato dal browser o chiuso dall'utente, fallback su redirect...");
                window.fbAuth.signInWithRedirect(provider);
            } else {
                const errorMessage = "Si è verificato un errore durante l'accesso con Google: " + e.code + " - " + e.message;
                if (window.EroiApp && window.EroiApp.showToast) {
                    window.EroiApp.showToast(errorMessage, "error");
                } else {
                    alert(errorMessage);
                }
            }
        }
    },

    continueAsGuest: () => {
        Auth._user = {
            name: 'Atleta Anonimo',
            avatar: '👤',
            role: 'studente',
            isGuest: true,
            setupComplete: false,
            joinedAt: new Date().toISOString()
        };
        window.dispatchEvent(new CustomEvent('authChange'));
        if (typeof hideLoginOverlay === 'function') hideLoginOverlay(); // Assicura che l'overlay scompaia
    },

    logout: async () => {
        try {
            if (window.fbAuth) await window.fbAuth.signOut();
        } catch(e) {}
        
        Auth._user = null;
        localStorage.removeItem('eroi_user');
        sessionStorage.removeItem('introVideoPlayed');
        window.dispatchEvent(new CustomEvent('authChange'));
        window.location.hash = 'home';
        setTimeout(() => {
            window.location.reload();
        }, 100);
    },

    updateProfile: async (name, avatar) => {
        if (!Auth._user) return;
        
        Auth._user.name = name;
        Auth._user.avatar = avatar;
        
        localStorage.setItem('eroi_user', JSON.stringify(Auth._user));
        
        if (window.fbAuth && window.fbAuth.currentUser) {
            try {
                await window.fbDb.collection('users').doc(window.fbAuth.currentUser.uid).set(Auth._user, { merge: true });
            } catch (e) {
                console.error("Errore aggiornamento cloud profilo:", e);
            }
        }
        
        window.dispatchEvent(new CustomEvent('authChange'));
    }
};

Auth.init();
window.Auth = Auth;
