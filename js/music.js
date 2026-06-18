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
            this._doPlay();
        }
    },

    // Avvia la riproduzione (interno)
    _doPlay: function() {
        if (!this.audioElement) this.init();
        if (window.introVideoActive) return;
        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                this.updateUI();
                this._hideAutoplayBanner();
            }).catch(() => {
                this.isPlaying = false;
                this.updateUI();
                // Autoplay bloccato: mostra il banner
                this._showAutoplayBanner();
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
    },

    // Banner sottile "tap per avviare la musica" mostrato se autoplay bloccato
    _showAutoplayBanner: function() {
        if (document.getElementById('autoplay-banner')) return;
        const banner = document.createElement('div');
        banner.id = 'autoplay-banner';
        banner.style.cssText = `
            position: fixed; bottom: 70px; left: 50%; transform: translateX(-50%);
            background: rgba(212,175,55,0.95); color: #1a1a2e;
            padding: 8px 20px; border-radius: 20px;
            font-size: 0.78rem; font-weight: bold; cursor: pointer;
            z-index: 99999; box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            display: flex; align-items: center; gap: 8px;
            animation: pulse 1.5s ease-in-out infinite;
        `;
        banner.innerHTML = '<i class="fa-solid fa-music"></i> Tocca per avviare la musica';
        banner.addEventListener('click', () => {
            this._doPlay();
            this._hideAutoplayBanner();
        });
        document.body.appendChild(banner);
    },

    _hideAutoplayBanner: function() {
        const banner = document.getElementById('autoplay-banner');
        if (banner) banner.remove();
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
