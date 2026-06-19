const MusicPlayer = {
    tracks: [
        "Alegend - In Flight (freetouse.com).mp3",
        "Alegend - Warriors (freetouse.com).mp3",
        "Aylex - Travelling (freetouse.com).mp3",
        "Aylex - Where We Belong (freetouse.com).mp3",
        "Pufino - There Be Dragons (freetouse.com).mp3",
        "Walen - Champions (freetouse.com).mp3"
    ],
    currentTrackIndex: 0,
    audioElement: null,
    isPlaying: false,

    init: function() {
        if (!this.audioElement) {
            this.audioElement = new Audio();
            this.audioElement.loop = false;
            this.audioElement.volume = 0.3;
            this.audioElement.addEventListener('ended', () => this.nextTrack());
            this.loadTrack(this.currentTrackIndex);
        }
    },

    loadTrack: function(index) {
        if (index < 0) index = this.tracks.length - 1;
        if (index >= this.tracks.length) index = 0;
        this.currentTrackIndex = index;
        this.audioElement.src = `assets/Musica/${this.tracks[this.currentTrackIndex]}`;
        this.updateUI();
    },

    togglePlay: function() {
        if (!this.audioElement) this.init();

        // Non avviare la musica se il video introduttivo è in riproduzione
        if (!this.isPlaying && window.introVideoActive) return;

        if (this.isPlaying) {
            this.audioElement.pause();
            this.isPlaying = false;
            this.updateUI();
        } else {
            if (window.EroiApp && typeof window.EroiApp.isMuted === 'function' && window.EroiApp.isMuted()) {
                window.EroiApp.unmute();
            }
            this._doPlay();
        }
    },

    // Avvia la riproduzione (interno)
    _doPlay: function() {
        if (!this.audioElement) this.init();
        if (window.introVideoActive) return;
        if (localStorage.getItem('eroi_audio_muted') === 'true') return;

        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                this.updateUI();
            }).catch(() => {
                // Autoplay bloccato dal browser — riprova al primo click (listener globale)
                this.isPlaying = false;
                this.updateUI();
            });
        } else {
            this.isPlaying = true;
            this.updateUI();
        }
    },

    nextTrack: function() {
        if (!this.audioElement) this.init();
        this.loadTrack(this.currentTrackIndex + 1);
        if (this.isPlaying) {
            this.audioElement.play().catch(() => {
                this.isPlaying = false;
                this.updateUI();
            });
        }
    },

    prevTrack: function() {
        if (!this.audioElement) this.init();
        this.loadTrack(this.currentTrackIndex - 1);
        if (this.isPlaying) {
            this.audioElement.play().catch(() => {
                this.isPlaying = false;
                this.updateUI();
            });
        }
    },

    updateUI: function() {
        const titleEl = document.getElementById('music-track-title');
        const playBtnEl = document.getElementById('music-play-btn');
        if (titleEl) {
            let title = this.tracks[this.currentTrackIndex].replace(" (freetouse.com).mp3", "");
            titleEl.textContent = title;
        }
        if (playBtnEl) {
            playBtnEl.innerHTML = this.isPlaying
                ? '<i class="fa-solid fa-pause"></i>'
                : '<i class="fa-solid fa-play"></i>';
        }
    }
};

window.MusicPlayer = MusicPlayer;

// Inizializza al caricamento DOM
document.addEventListener('DOMContentLoaded', () => {
    MusicPlayer.init();

    // Tenta autoplay immediato: i browser moderni lo bloccano,
    // ma alcuni (es. Chrome se l'utente ha già visitato il sito) lo permettono.
    setTimeout(() => {
        if (!window.introVideoActive) {
            MusicPlayer._doPlay();
        }
    }, 800);
});

// Fallback: avvia al primo click/touch se ancora non in play
(function() {
    let _started = false;
    function startOnInteraction() {
        if (_started) return;
        _started = true;
        document.removeEventListener('click', startOnInteraction, true);
        document.removeEventListener('touchstart', startOnInteraction, true);
        document.removeEventListener('keydown', startOnInteraction, true);
        setTimeout(() => {
            if (window.MusicPlayer && !window.MusicPlayer.isPlaying && !window.introVideoActive) {
                window.MusicPlayer._doPlay();
            }
        }, 300);
    }
    document.addEventListener('click', startOnInteraction, true);
    document.addEventListener('touchstart', startOnInteraction, true);
    document.addEventListener('keydown', startOnInteraction, true);
})();
