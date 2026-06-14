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
            this.audioElement.volume = 0.3; // Default volume for background music
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
        
        if (this.isPlaying) {
            this.audioElement.pause();
            this.isPlaying = false;
        } else {
            this.audioElement.play().catch(e => console.log("Autoplay prevented", e));
            this.isPlaying = true;
        }
        this.updateUI();
    },

    nextTrack: function() {
        if (!this.audioElement) this.init();
        this.loadTrack(this.currentTrackIndex + 1);
        if (this.isPlaying) this.audioElement.play();
    },

    prevTrack: function() {
        if (!this.audioElement) this.init();
        this.loadTrack(this.currentTrackIndex - 1);
        if (this.isPlaying) this.audioElement.play();
    },

    updateUI: function() {
        const titleEl = document.getElementById('music-track-title');
        const playBtnEl = document.getElementById('music-play-btn');
        
        if (titleEl) {
            let title = this.tracks[this.currentTrackIndex].replace(" (freetouse.com).mp3", "");
            titleEl.textContent = title;
        }
        
        if (playBtnEl) {
            if (this.isPlaying) {
                playBtnEl.innerHTML = '<i class="fa-solid fa-pause"></i>';
            } else {
                playBtnEl.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        }
    }
};

window.MusicPlayer = MusicPlayer;

// Initialize on first user interaction if needed, or wait for manual play
document.addEventListener('DOMContentLoaded', () => {
    MusicPlayer.init();
});
