window.Auth = window.Auth || {};\nwindow.Auth.logout =) => {
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
    };\n