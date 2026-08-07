window.showLoginOverlay = function(redirectRoute = null) {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.remove('hidden');
};

window.hideLoginOverlay = function() {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.add('hidden');
};
