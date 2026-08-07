window.showLoginOverlay = function(redirectRoute = null) {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.remove('hidden');
};\n\nwindow.hideLoginOverlay = function() {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.add('hidden');
};\n