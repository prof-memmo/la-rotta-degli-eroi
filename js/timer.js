const SessionTimer = {
    SESSION_DURATION: 45 * 60, // 45 minuti in secondi
    BREAK_DURATION: 15 * 60,   // 15 minuti in secondi
    MAX_SESSIONS_PER_DAY: 2,
    
    data: null,
    timerInterval: null,
    saveInterval: null,

    init: async function() {
        if (!window.Auth || !window.Auth.getUser) return;
        const user = window.Auth.getUser();
        if (!user || user.role !== 'studente') return;

        await this.loadSessionData(user);
        this.startEngine(user);
    },

    loadSessionData: async function(user) {
        try {
            const doc = await window.fbDb.collection('users').doc(user.uid).get();
            let data = doc.data().sessionData || null;
            const today = new Date().toLocaleDateString();
            
            if (!data || data.date !== today) {
                data = {
                    date: today,
                    sessionsPlayed: 0,
                    timeLeft: this.SESSION_DURATION,
                    breakEndTime: null
                };
                await this.saveSessionData(user.uid, data);
            }
            this.data = data;
        } catch(e) { console.error("Error loading timer", e); }
    },

    saveSessionData: async function(uid, data) {
        this.data = data;
        try {
            await window.fbDb.collection('users').doc(uid).update({ sessionData: data });
        } catch(e) {}
    },

    startEngine: function(user) {
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.saveInterval) clearInterval(this.saveInterval);

        this.timerInterval = setInterval(() => this.tick(user), 1000);
        this.saveInterval = setInterval(() => this.saveSessionData(user.uid, this.data), 10000);
    },

    tick: function(user) {
        const now = Date.now();
        
        // 1. Check se è in pausa
        if (this.data.breakEndTime) {
            if (now >= this.data.breakEndTime) {
                // Pausa finita
                this.data.breakEndTime = null;
                this.data.timeLeft = this.SESSION_DURATION;
                this.saveSessionData(user.uid, this.data);
                
                // Torna al gioco
                if (window.EroiApp.getCurrentViewId() === 'view-pausa-obbligatoria') {
                    window.EroiApp.navigateTo('view-student-dashboard');
                }
            } else {
                // Mostra pausa
                if (window.EroiApp.getCurrentViewId() !== 'view-pausa-obbligatoria') {
                    window.EroiApp.navigateTo('view-pausa-obbligatoria');
                }
                const remainingBreak = Math.ceil((this.data.breakEndTime - now) / 1000);
                this.updateBreakUI(remainingBreak);
            }
            return;
        }

        // 2. Non è in pausa. Check se bloccato per oggi
        if (this.data.sessionsPlayed >= this.MAX_SESSIONS_PER_DAY) {
            if (window.EroiApp.getCurrentViewId() !== 'view-pausa-obbligatoria') {
                window.EroiApp.navigateTo('view-pausa-obbligatoria');
            }
            this.updateBlockUI();
            return;
        }

        // 3. Gioco in corso
        if (this.data.timeLeft > 0) {
            this.data.timeLeft--;
            this.updateTimerUI(this.data.timeLeft);
        } else {
            // Sessione terminata
            this.data.sessionsPlayed++;
            if (this.data.sessionsPlayed < this.MAX_SESSIONS_PER_DAY) {
                this.data.breakEndTime = now + (this.BREAK_DURATION * 1000);
            }
            this.saveSessionData(user.uid, this.data);
            this.tick(user); // Force immediate UI update
        }
    },

    updateTimerUI: function(secsLeft) {
        // Nascondi timer se in onboarding
        const currentView = window.EroiApp.getCurrentViewId();
        const onboardingViews = ['view-welcome', 'view-login', 'view-onboarding', 'view-selezione-profilo', 'view-iscrizione', 'view-pausa-obbligatoria'];
        
        // Rimuovi timer dall'header se esiste (legacy)
        const oldHeaderTimer = document.getElementById('student-session-timer');
        if (oldHeaderTimer) oldHeaderTimer.remove();
        
        const dropdownContainer = document.getElementById('dropdown-timer-container');
        const dropdownTimer = document.getElementById('dropdown-session-timer');
        
        const m = Math.floor(secsLeft / 60);
        const s = secsLeft % 60;
        const timeStr = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
        
        if (onboardingViews.includes(currentView)) {
            if (dropdownContainer) dropdownContainer.style.display = 'none';
        } else {
            if (dropdownContainer && dropdownTimer) {
                dropdownContainer.style.display = 'block';
                dropdownTimer.textContent = timeStr;
            }
        }
    },

    updateBreakUI: function(secsLeft) {
        const blockMsg = document.getElementById('pausa-block-msg');
        const timerDisplay = document.getElementById('pausa-timer-display');
        if (blockMsg) blockMsg.style.display = 'none';
        if (timerDisplay) {
            timerDisplay.style.display = 'block';
            const m = Math.floor(secsLeft / 60);
            const s = secsLeft % 60;
            timerDisplay.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
        }
    },

    updateBlockUI: function() {
        const blockMsg = document.getElementById('pausa-block-msg');
        const timerDisplay = document.getElementById('pausa-timer-display');
        if (timerDisplay) timerDisplay.style.display = 'none';
        if (blockMsg) blockMsg.style.display = 'block';
    }
};

window.SessionTimer = SessionTimer;
