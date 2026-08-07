window.Auth = window.Auth || {};\nwindow.Auth.isLoggedIn =) => {
        return !!Auth._user;
    };\n\nwindow.Auth = window.Auth || {};\nwindow.Auth.getUser =) => {
        return Auth._user || { name: 'Atleta Anonimo', avatar: '👤', role: 'studente', isGuest: true };
    };\n\nwindow.Auth = window.Auth || {};\nwindow.Auth.updateProfile =name, avatar) => {
        if (!Auth._user) return;
        
        Auth._user.name = name;
        Auth._user.avatar = avatar;
        
        localStorage.setItem('eroi_user', JSON.stringify(Auth._user));
        
        if (window.fbAuth && window.fbAuth.currentUser) {
            try {
                await window.fbDb.collection('users').doc(window.fbAuth.currentUser.uid).set(Auth._user, { merge: true });
            } catch (e) {
                console.error("Errore aggiornamento cloud profilo:", e);
            };\n