window.Auth = window.Auth || {};\nwindow.Auth.login =name, avatar = 'assets/avatar.png', role = 'studente') => {
        // Questo metodo ora richiede l'autenticazione email/Google
        // Non creiamo più profili anonimi
        console.warn("Metodo login() deprecato. Usa loginWithEmail() o loginWithGoogle().");
    };\n\nwindow.Auth = window.Auth || {};\nwindow.Auth.loginWithEmail =name, email, password) => {
        if (!window.fbAuth) return;
        if (!email || !password) {
            alert("Inserisci email e password per continuare.");
            return;
        };\n\nwindow.Auth = window.Auth || {};\nwindow.Auth.loginWithClassCode =code, studentName) => {
        if (!window.fbDb) return false;
        
        try {
            const q = await window.fbDb.collection('classes').where('code', '==', code.toUpperCase()).get();
            if (q.empty) {
                alert("Codice classe non valido. Chiedi al tuo docente!");
                return false;
            };\n\nwindow.Auth = window.Auth || {};\nwindow.Auth.loginWithGoogle =) => {
        if (!window.fbAuth) return;
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        
        try {
            const result = await window.fbAuth.signInWithPopup(provider);
            if (result && result.user) {
                await Auth._handleFirebaseUser(result.user);
                if (typeof hideLoginOverlay === 'function') hideLoginOverlay();
            };\n\nwindow.Auth = window.Auth || {};\nwindow.Auth.continueAsGuest =) => {
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
    };\n