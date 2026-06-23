// Eroi in Viaggio - Main Application Controller

// UI Helpers per il Login
window.showLoginOverlay = function(redirectRoute = null) {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.remove('hidden');
};

window.hideLoginOverlay = function() {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.add('hidden');
};

const LEGAL_TEXTS = {
    privacy: `
        <h2>🔒 Privacy Policy</h2>
        <h3>1. Titolare del trattamento</h3>
        <p>Il titolare del trattamento è Guglielmo Piersanti, contattabile all'indirizzo email: prof.memmo@gmail.com</p>
        <h3>2. Finalità del sito</h3>
        <p>"La Rotta degli Eroi" è un'applicazione web didattica, utilizzata a scopo educativo e ludico e senza fini di lucro per l'apprendimento della lingua italiana.</p>
        <h3>3. Dati raccolti</h3>
        <p>Il sito può raccogliere i seguenti dati: nome utente (scelto dall'utente); informazioni di utilizzo relative agli esercizi (punteggi, attività completate, progressi); messaggi inviati tramite il modulo di contatto (nome, email, messaggio); dati tecnici minimi per il funzionamento (es. tipo di dispositivo tramite browser).</p>
        <h3>4. Finalità del trattamento</h3>
        <p>I dati vengono trattati esclusivamente per consentire l'accesso alle funzionalità della Palestra, gestire l'esperienza didattica personalizzata (come il salvataggio dei progressi e del vocabolario), rispondere alle richieste inviate tramite il modulo di contatto e migliorare il servizio didattico. Non vengono utilizzati per scopi commerciali o pubblicitari.</p>
        <h3>5. Base giuridica</h3>
        <p>Il trattamento dei dati si basa sul consenso fornito dall'utente al momento del primo accesso e sull'utilizzo delle funzionalità didattiche del sito.</p>
        <h3>6. Conservazione dei dati</h3>
        <p>I dati sono salvati localmente sul browser dell'utente (LocalStorage) e, se implementato, su database sicuri. Non vengono venduti né ceduti a terzi. Sono mantenuti solo per il tempo necessario al funzionamento didattico o fino alla richiesta di cancellazione da parte dell'utente.</p>
        <h3>8. Diritti dell'utente</h3>
        <p>L'utente può richiedere in qualsiasi momento l'accesso ai propri dati o la loro cancellazione (che può avvenire anche tramite il proprio profilo utente cancellando i dati locali). Per assistenza, è possibile contattare il titolare all'indirizzo email sopra indicato.</p>
        <h3>9. Cookie</h3>
        <p>Il sito non utilizza cookie di profilazione a scopo pubblicitario. Utilizza esclusivamente elementi tecnici necessari per il salvataggio dei progressi di studio.</p>
        <h3>9. Utenti minori</h3>
        <p>Il sito è destinato a un uso didattico scolastico. Per l'utilizzo da parte di minori, è responsabilità di un genitore o di un docente assicurare la supervisione necessaria. I tutori possono richiedere la cancellazione dei dati in qualsiasi momento.</p>
        <h3>10. Modifiche alla Policy</h3>
        <p>Questa informativa può essere aggiornata per riflettere nuove funzionalità didattiche. Le modifiche rilevanti verranno segnalate agli utenti.</p>
        <h3>11. Riferimenti normativi</h3>
        <p>Questa informativa è redatta in conformità ai principi del GDPR.</p>
    `,
    terms: `
        <h2>📜 Termini e Condizioni</h2>
        <p>Ultimo aggiornamento: 02/05/26</p>
        <h3>1. Titolare del sito</h3>
        <p>Il presente sito web "La Rotta degli Eroi" è gestito da: Guglielmo Piersanti. Email di contatto: prof.memmo@gmail.com</p>
        <h3>2. Accettazione dei termini</h3>
        <p>L'accesso alla Palestra implica l'accettazione dei presenti Termini e Condizioni. Se non si accettano tali condizioni, si invita a non utilizzare il sito.</p>
        <h3>3. Descrizione del servizio</h3>
        <p>Il sito offre esercizi interattivi di grammatica, lettura, lessico e produzione per la scuola secondaria di primo grado. Gli utenti possono: svolgere esercizi, monitorare i propri progressi e contattare il gestore per supporto o collaborazione.</p>
        <h3>4. Utilizzo del sito</h3>
        <p>L'utente si impegna a utilizzare il sito in modo corretto, evitando comportamenti che possano danneggiare la piattaforma o gli altri utenti. È vietato l'invio di messaggi offensivi o spam tramite il modulo di contatto.</p>
        <h3>5. Modulo di contatto</h3>
        <p>L'utente è responsabile dei dati inviati tramite il modulo. Il titolare si riserva il diritto di non rispondere a messaggi non pertinenti o inappropriati.</p>
        <h3>6. Proprietà intellettuale</h3>
        <p>I testi e i materiali didattici originali contenuti nel sito sono di proprietà del titolare, salvo dove diversamente indicato (es. fonti letterarie citate). È vietata la riproduzione per scopi commerciali senza autorizzazione.</p>
        <h3>7. Limitazione di responsabilità</h3>
        <p>Il sito è fornito a scopo didattico gratuito. Il titolare non è responsabile per eventuali problemi tecnici temporanei o per l'uso improprio delle informazioni contenute. L'obiettivo è fornire uno strumento di supporto all'apprendimento il più accurato possibile.</p>
        <h3>8. Link esterni</h3>
        <p>Eventuali link a siti esterni sono forniti per approfondimento didattico; il titolare non è responsabile del contenuto di tali siti.</p>
        <h3>9. Modifiche</h3>
        <p>Il titolare può modificare i presenti Termini in base all'evoluzione del progetto didattico.</p>
        <h3>10. Legge applicabile</h3>
        <p>I presenti Termini sono regolati dalla normativa italiana.</p>
    `
};

// --- Funzione contatti (stile Palestra di Riflessione) ---
window.showContattiModal = function() {
    const modal = document.getElementById('modal-legal');
    const title = document.getElementById('modal-legal-title');
    const body = document.getElementById('modal-legal-body');
    if (!modal || !title || !body) return;
    title.textContent = '📧 Contatti';
    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="padding: 16px; background: rgba(212,175,55,0.08); border-left: 4px solid var(--gold); border-radius: 8px;">
          <h4 style="color: var(--gold); margin-bottom: 8px; font-family: var(--font-heading);">Scopri il mondo Prof. Memmo</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 10px;"><a href="https://prof-memmo.github.io/games/" target="_blank" style="color: var(--gold); font-weight: bold; text-decoration: underline;">Visita il sito</a> per scoprire i materiali, i giochi e la filosofia, oppure <a href="https://prof-memmo.github.io/games/condividi-esperienza.html" target="_blank" style="color: var(--gold); font-weight: bold; text-decoration: underline;">condividi la tua esperienza</a> lasciando commenti e feedback tramite il modulo!</p>
          <div style="display: flex; align-items: center; gap: 10px; color: var(--gold); font-weight: bold;">
            <i class="fa-solid fa-envelope"></i> <span>prof.memmo@gmail.com</span>
          </div>
        </div>
        <div style="padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,55,0.2); border-radius: 8px;">
          <h4 style="color: var(--text-light); margin-bottom: 12px; font-family: var(--font-heading); font-size: 0.95rem;">Invia un Messaggio</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <input type="text" id="contact-modal-name" placeholder="Il tuo nome" class="form-control" style="padding: 8px 12px;">
            <input type="email" id="contact-modal-email" placeholder="La tua email" class="form-control" style="padding: 8px 12px;">
            <textarea id="contact-modal-message" placeholder="Come posso aiutarti?" class="form-control" style="height: 80px; resize: none; padding: 8px 12px;"></textarea>
            <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.8rem; color: var(--text-muted); cursor: pointer;">
              <input type="checkbox" id="contact-modal-check" style="margin-top: 2px;">
              <span>Ho almeno 16 anni o sono sotto supervisione di un adulto. Accetto la 
                <a href="#" onclick="event.preventDefault(); showLegal('privacy')" style="color: var(--gold);">Privacy Policy</a> e i 
                <a href="#" onclick="event.preventDefault(); showLegal('terms')" style="color: var(--gold);">Termini</a>.
              </span>
            </label>
            <button class="btn" style="width: 100%; padding: 10px;" onclick="window.submitContattiModal()">
              <i class="fa-solid fa-paper-plane"></i> Invia Messaggio
            </button>
          </div>
        </div>
      </div>
    `;
    modal.classList.add('active');
};

window.submitContattiModal = function() {
    const name = document.getElementById('contact-modal-name')?.value.trim();
    const email = document.getElementById('contact-modal-email')?.value.trim();
    const message = document.getElementById('contact-modal-message')?.value.trim();
    const check = document.getElementById('contact-modal-check')?.checked;
    if (!name || !email || !message) { alert('Compila tutti i campi.'); return; }
    if (!check) { alert('Devi accettare la Privacy Policy e i Termini.'); return; }
    if (window.EroiApp) window.EroiApp.showToast('Messaggio inviato! Ti risponderemo presto.', 'success');
    window.EroiApp.closeLegalModal();
};

let _currentLegalType = null;
let _hasConfirmedPrivacy = false;
let _hasConfirmedTerms = false;

window.showLegal = function(type) {
    const modal = document.getElementById('legal-modal');
    const container = document.getElementById('legal-text-container');
    if (modal && container) {
        _currentLegalType = type;
        container.innerHTML = LEGAL_TEXTS[type] || 'Contenuto non disponibile.';
        modal.classList.remove('hidden');
    }
};

window.hideLegal = function() {
    const modal = document.getElementById('legal-modal');
    if (modal) modal.classList.add('hidden');
};

window.confirmLegal = function() {
    if (_currentLegalType === 'privacy') _hasConfirmedPrivacy = true;
    if (_currentLegalType === 'terms') _hasConfirmedTerms = true;

    // Se entrambi confermati, spunta automaticamente la checkbox privacy
    if (_hasConfirmedPrivacy && _hasConfirmedTerms) {
        const checkPrivacy = document.getElementById('check-privacy');
        if (checkPrivacy) checkPrivacy.checked = true;
    }

    hideLegal();
};

window.handleEmailLogin = async function() {
    const checkAge = document.getElementById('welcome-check-age')?.checked;
    const checkPrivacy = document.getElementById('welcome-check-privacy')?.checked;
    
    if (!checkAge || !checkPrivacy) {
        alert("Devi confermare l'età e accettare Privacy Policy e Termini per continuare.");
        return;
    }

    const email = (document.getElementById('login-email')?.value || '').trim();
    const password = (document.getElementById('login-password')?.value || '').trim();

    if (!email || !password) {
        alert("Inserisci email e password per continuare.");
        return;
    }

    const role = document.getElementById('login-role-select')?.value || 'studente';
    localStorage.setItem('pending_role', role);

    await Auth.loginWithEmail('', email, password);
};

window.handleGoogleLogin = function() {
    const checkAge = document.getElementById('welcome-check-age')?.checked;
    const checkPrivacy = document.getElementById('welcome-check-privacy')?.checked;
    
    if (!checkAge || !checkPrivacy) {
        alert("Devi confermare l'età e accettare Privacy Policy e Termini per continuare.");
        return;
    }

    Auth.loginWithGoogle();
};

window.selectOnboardingRole = async function(role) {
    const user = Auth.getUser();
    if (!user) return;
    
    if (role === 'studente') {
        window.EroiApp.switchActiveView('view-selezione-profilo');
    } else if (role === 'docente') {
        window.EroiApp.switchActiveView('view-iscrizione');
    } else if (role === 'forestiero') {
        // Forestiero completa subito
        user.role = 'forestiero';
        user.setupComplete = true;
        await window.fbDb.collection('users').doc(user.uid).update({ role: 'forestiero', setupComplete: true });
        localStorage.setItem('eroi_user', JSON.stringify(user));
        window.EroiApp.checkSession();
    }
};

window.finalizzaStudente = async function() {
    const nickname = document.getElementById('studente-nickname').value.trim();
    const classe = document.getElementById('studente-classe').value.trim();
    const eroeClass = document.getElementById('studente-classe-eroe').value;
    
    if (!nickname || !classe || !eroeClass) {
        alert("Compila tutti i campi!"); return;
    }
    
    const user = Auth.getUser();
    if (!user) return;
    
    user.role = 'studente';
    user.setupComplete = true;
    user.classId = classe;
    user.name = nickname; // Use nickname instead of full Google name if they want
    
    await window.fbDb.collection('users').doc(user.uid).update({ 
        role: 'studente', 
        setupComplete: true,
        classId: classe,
        name: nickname
    });
    
    // Create student profile in game DB
    const _u_profile = window.EroiDB.getUser(user.email);
    const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
    let profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(user.email) : window.EroiDB.getStudentProfile(user.email);
    if (!profile) {
        profile = {
            email: user.email,
            name: nickname,
            level: 1,
            xp: 0,
            dracme: 100,
            avatarClass: eroeClass.charAt(0).toUpperCase() + eroeClass.slice(1),
            inventory: [],
            stats: { missionsCompleted: 0, questionsAnswered: 0, perfectScores: 0 },
            visitedRegions: [],
            discoveredNodes: [],
            completedMissions: [],
            activeMissions: [],
            diario: []
        };
        window.EroiDB.saveStudentProfile(profile);
    }
    
    localStorage.setItem('eroi_user', JSON.stringify(user));
    window.EroiApp.checkSession();
};

window.finalizzaDocente = async function() {
    const scuola = document.getElementById('iscrizione-scuola').value.trim();
    const citta = document.getElementById('iscrizione-citta').value.trim();
    
    if (!scuola || !citta) {
        alert("Compila tutti i campi!"); return;
    }
    
    const user = Auth.getUser();
    if (!user) return;
    
    // Salva in pending_requests
    const requestData = {
        uid: user.uid,
        email: user.email,
        name: user.name,
        scuola: scuola,
        citta: citta,
        role: 'docente',
        status: 'pending'
    };
    await window.EroiDB.saveTeacherRequest(requestData);

    user.role = 'docente';
    user.setupComplete = true;
    user.approved = false; // Pending approval
    
    await window.fbDb.collection('users').doc(user.uid).update({ 
        role: 'docente', 
        setupComplete: true,
        approved: false,
        scuola: scuola,
        citta: citta
    });
    
    localStorage.setItem('eroi_user', JSON.stringify(user));
    window.EroiApp.checkSession();
};
(function() {
  let currentShopFilter = 'all';
  let activeTeacherTab = 'panoramica';
  let currentMissionsFilterArea = null;

  const EroiAudio = {
    audioCtx: null,
    isMuted: localStorage.getItem('eroi_audio_muted') === 'true',

    initContext: function() {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    },

    toggleMute: function() {
      this.isMuted = !this.isMuted;
      localStorage.setItem('eroi_audio_muted', this.isMuted);
      this.updateMuteUI();
      if (!this.isMuted) {
        this.initContext();
        this.playClick();
        if (window.MusicPlayer) {
          window.MusicPlayer._doPlay();
        }
      } else {
        if (window.MusicPlayer && window.MusicPlayer.audioElement) {
          window.MusicPlayer.audioElement.pause();
          window.MusicPlayer.isPlaying = false;
          window.MusicPlayer.updateUI();
        }
      }
    },

    updateMuteUI: function() {
      const btns = document.querySelectorAll('.btn-toggle-audio-action, #btn-toggle-audio');
      const btnLogin = document.getElementById('login-audio-btn');
      const updateBtn = (b) => {
          if(!b) return;
          const isIconOnly = b.id === 'btn-toggle-audio';
          if (isIconOnly) {
              b.innerHTML = this.isMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
          } else {
              b.innerHTML = this.isMuted ? '<i class="fa-solid fa-volume-xmark"></i> Attiva Musica' : '<i class="fa-solid fa-volume-high"></i> Disattiva Musica';
          }
          b.title = this.isMuted ? 'Attiva Audio' : 'Disattiva Audio';
      };
      btns.forEach(btn => {
        updateBtn(btn);
      });
      updateBtn(btnLogin);
    },

    playTone: function(frequency, type, duration, startTimeOffset = 0) {
      if (this.isMuted) return;
      this.initContext();
      try {
        const ctx = this.audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime + startTimeOffset);

        gain.gain.setValueAtTime(0.08, ctx.currentTime + startTimeOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTimeOffset + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + startTimeOffset);
        osc.stop(ctx.currentTime + startTimeOffset + duration);
      } catch (e) {
        console.error("Errore sintesi audio: ", e);
      }
    },

    playHover: function() {
      this.playTone(880, 'sine', 0.05);
    },

    playClick: function() {
      this.playTone(523.25, 'sine', 0.08); // Do5
      this.playTone(659.25, 'sine', 0.12, 0.05); // Mi5
    },

    playSuccess: function() {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        this.playTone(freq, 'triangle', 0.25, i * 0.1);
      });
    },

    playFailure: function() {
      if (this.isMuted) return;
      this.initContext();
      try {
        const ctx = this.audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      } catch(e){}
    },

    playLevelUp: function() {
      const melody = [
        { f: 523.25, d: 0.12 },
        { f: 659.25, d: 0.12 },
        { f: 783.99, d: 0.12 },
        { f: 1046.50, d: 0.2 },
        { f: 783.99, d: 0.12 },
        { f: 1046.50, d: 0.4 }
      ];
      let currentOffset = 0;
      melody.forEach(note => {
        this.playTone(note.f, 'triangle', note.d, currentOffset);
        currentOffset += note.d - 0.02;
      });
    }
  };

  window.EroiApp = {
    isSecondTermActiveForUser: function(userEmail) {
      const email = userEmail || (Auth.getUser() ? Auth.getUser().email : null);
      if (!email) return false;
      const user = window.EroiDB.getUser(email);
      if (!user) return false;
      
      if (user.role === 'admin') return true;
      if (user.role === 'docente') return true; // Un docente ha la vista globale sbloccata
      
      if (user.classId) {
        const c = window.EroiDB.getClasses()[user.classId];
        if (c && c.secondTermActive) return true;
      }
      return false;
    },
    toggleAudio: function() {
      EroiAudio.toggleMute();
    },
    isMuted: function() {
      return EroiAudio.isMuted;
    },
    unmute: function() {
      if (EroiAudio.isMuted) {
        EroiAudio.toggleMute();
      }
    },

    init: function() {
      EroiAudio.updateMuteUI();
      this.bindEvents();
      this.bindAudioEvents();
      this.checkSession();
      this.renderFooterDetails();
    },

    bindAudioEvents: function() {
      // Delegazione eventi globale per riprodurre suoni su hover e click di elementi attivi
      document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('a, button, .map-node:not(.locked), .guide-list-item, .tab-btn');
        if (target) {
          EroiAudio.playHover();
        }
      });

      document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button, .map-node:not(.locked), .guide-list-item, .tab-btn');
        if (target) {
          EroiAudio.playClick();
        }
      });
    },

    // --- GESTIONE VIDEO ---
    playIntroVideo: function(onComplete) {
        const overlay = document.getElementById('intro-video-overlay');
        const video = document.getElementById('intro-video');
        if (!overlay || !video) {
            if (onComplete) onComplete();
            return;
        }
        
        window.introVideoActive = true;

        // Pausa musica di sottofondo se attiva o in fase di caricamento
        if (window.MusicPlayer) {
            if (window.MusicPlayer.audioElement) {
                window.MusicPlayer.audioElement.pause();
            }
            window.MusicPlayer.isPlaying = false;
            if (typeof window.MusicPlayer.updateUI === 'function') {
                window.MusicPlayer.updateUI();
            }
        }
        
        document.body.style.overflow = 'hidden';
        overlay.style.display = 'flex';
        video.currentTime = 0;
        video.muted = false;
        const muteBtn = document.getElementById('btn-toggle-video-mute');
        if (muteBtn) muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        video.play().catch(e => {
            // Se l'autoplay con audio fallisce per le policy, proviamo in muto
            video.muted = true;
            if (muteBtn) muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            video.play().catch(e2 => {
                window.EroiApp.skipIntroVideo();
            });
        });
        
        this._videoCompleteCallback = onComplete;
        video.onended = () => {
            this.skipIntroVideo();
        };
    },

    toggleIntroVideoMute: function() {
        const video = document.getElementById('intro-video');
        const btn = document.getElementById('btn-toggle-video-mute');
        if (video && btn) {
            video.muted = !video.muted;
            btn.innerHTML = video.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
        }
    },

    skipIntroVideo: function() {
        window.introVideoActive = false;
        const overlay = document.getElementById('intro-video-overlay');
        const video = document.getElementById('intro-video');
        if (overlay) overlay.style.display = 'none';
        if (video) video.pause();
        document.body.style.overflow = '';
        
        // Riprendi musica di sottofondo se disattivata
        if (window.MusicPlayer && !window.MusicPlayer.isPlaying) {
            window.MusicPlayer.togglePlay();
        }
        
        if (this._videoCompleteCallback) {
            const cb = this._videoCompleteCallback;
            this._videoCompleteCallback = null;
            cb();
        }
    },

    // --- NAVIGATION & ROUTING ---
    navigateTo: function(viewId) {
      // Use the new Auth object
      const isLogged = typeof Auth !== 'undefined' && Auth.isLoggedIn ? Auth.isLoggedIn() : false;
      const user = isLogged ? Auth.getUser() : null;
      
      // Protezione delle rotte in base al ruolo
      const publicViews = ['view-login', 'view-welcome', 'view-onboarding', 'view-selezione-profilo', 'view-iscrizione', 'view-pending-docente'];
      const studentViews = ['view-student-dashboard', 'view-map', 'view-diario', 'view-missions', 'view-shop', 'view-inventory', 'view-guides', 'view-regolamento', 'view-pausa-obbligatoria'];
      const teacherViews = ['view-teacher-dashboard', 'view-guides', 'view-regolamento', 'view-map', 'view-diario', 'view-shop', 'view-inventory'];
      const adminViews = ['view-admin-dashboard', 'view-teacher-dashboard', 'view-guides', 'view-regolamento', 'view-map', 'view-diario', 'view-shop', 'view-inventory'];

      if (!isLogged || !user) {
        // Forza login se non autenticato
        hideLoginOverlay();
        document.body.classList.remove('logged-in');
        document.getElementById('main-sidebar').style.display = 'none';
        document.getElementById('mobile-navigation').style.display = 'none'; // nascosta su login
        document.getElementById('app-header').style.display = 'none';
        document.getElementById('main-layout').style.marginTop = '0';
        document.getElementById('main-layout').style.marginLeft = '0';
        
        // Genera i bottoni disabilitati per il login
        this.generateNavbarLinks(null);
        
        this.switchActiveView('view-welcome');
        return;
      }

      // Se autenticato, nascondi l'overlay
      hideLoginOverlay();

      // Se autenticato e chiede login, reindirizza
      if (publicViews.includes(viewId)) {
         // Lascia passare se è in onboarding
         if (!user.setupComplete || (user.role === 'docente' && user.approved === false)) {
             // pass
         } else {
            if (user.role === 'studente' || user.role === 'forestiero') viewId = 'view-student-dashboard';
            else if (user.role === 'docente') viewId = 'view-teacher-dashboard';
            else if (user.role === 'admin') viewId = 'view-admin-dashboard';
         }
      }

      // Hide sidebar/header during onboarding
      if (['view-onboarding', 'view-selezione-profilo', 'view-iscrizione', 'view-pending-docente', 'view-pausa-obbligatoria'].includes(viewId)) {
        document.body.classList.remove('logged-in');
        document.getElementById('main-sidebar').style.display = 'none';
        document.getElementById('mobile-navigation').style.display = 'none'; // nascosta anche durante onboarding
        document.getElementById('app-header').style.display = 'none';
        document.getElementById('main-layout').style.marginTop = '0';
        document.getElementById('main-layout').style.marginLeft = '0';
      } else {
        // Controllo permessi ruoli per le view principali
        if ((user.role === 'studente' || user.role === 'forestiero') && !studentViews.includes(viewId)) {
          this.showToast("Accesso negato.", "danger");
          viewId = 'view-student-dashboard';
        } else if (user.role === 'docente' && !teacherViews.includes(viewId) && viewId !== 'view-student-dashboard') {
          // I docenti non possono accedere alla dashboard amministrativa globale o alle viste di gioco studente
          if (adminViews.includes(viewId) && viewId !== 'view-teacher-dashboard' && viewId !== 'view-guides' && viewId !== 'view-regolamento') {
            this.showToast("Accesso negato: Sezione riservata all'Amministratore.", "danger");
            viewId = 'view-teacher-dashboard';
          }
        }
      }

      // Applica la visualizzazione della rotta
      this.switchActiveView(viewId);
      this.updateNavigationUI(viewId);

      // Innesca il rendering specifico della vista caricata
      this.renderViewData(viewId, user);
      
      // Video Intro per studenti (una volta per sessione di login)
      if (viewId === 'view-student-dashboard' && user.role === 'studente' && !sessionStorage.getItem('introVideoPlayed')) {
          sessionStorage.setItem('introVideoPlayed', 'true');
          this.playIntroVideo();
      }
    },

    switchActiveView: function(viewId) {
      document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
      });
      const target = document.getElementById(viewId);
      if (target) {
        target.classList.add('active');
        target.scrollTop = 0;
      }
      this.updateImpersonationBanner();
    },

    updateImpersonationBanner: function() {
        // Funzionalità disabilitata: il banner copriva l'header ed era poco utile
        const banner = document.getElementById('impersonation-banner');
        if (banner) banner.style.display = 'none';
    },

    updateNavigationUI: function(viewId) {
      const user = Auth.getUser();

      // Hiddiamo sempre la sidebar e mostriamo l'header e la navigazione bottom
      document.body.classList.add('logged-in');
      document.getElementById('main-sidebar').style.display = 'none';
      document.getElementById('app-header').style.display = 'flex';
      document.getElementById('mobile-navigation').style.display = 'flex';
      document.getElementById('main-layout').style.marginTop = '';
      document.getElementById('main-layout').style.marginLeft = '0';

      // Rigenera i link della navbar se non ancora fatti
      this.generateNavbarLinks(user);

      // Evidenzia la bottom-nav mobile/desktop dock
      if (document.querySelectorAll('.mobile-nav-item').length > 0) {
        document.querySelectorAll('.mobile-nav-item').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-view') === viewId) {
            link.classList.add('active');
          }
        });
      }
    },

    generateNavbarLinks: function(user) {
      const mobileMenu = document.getElementById('mobile-navigation');
      const profileWidget = document.getElementById('header-profile-widget');
      const profileDropdown = document.getElementById('profile-dropdown-card');
      
      // Renderizza Header Profile Widget e Dropdown Card
      if (user && profileWidget && profileDropdown) {
        let avatarImg = 'assets/images/pergamena_crest.png';
        let levelText = '';
        let dropdownHtml = '';
        
        if (user.role === 'studente' || user.role === 'forestiero') {
          const _u_profile = window.EroiDB.getUser(user.email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(user.email) : window.EroiDB.getStudentProfile(user.email);
          if (profile) {
            const u = window.EroiDB.getUser(user.email);
            const classId = u ? u.classId : "";
            avatarImg = this.getAvatarImage(profile.avatarClass);
            levelText = `LIV. ${profile.level || 1}`;
            const nextInfo = window.EroiGame.getNextLevelInfo(profile.xp);
            
            dropdownHtml = `
              <div class="dropdown-class-info" style="font-family: var(--font-heading); color: var(--gold); border-bottom: 1px solid rgba(212,175,55,0.1); padding-bottom: 8px;">
                <strong>${profile.name}</strong><br>
                <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-body);">${profile.avatarClass} | ${classId ? 'Classe ' + classId : 'Forestiero'}</span>
              </div>
              
              <div class="dropdown-xp-container" style="margin-top: 10px;">
                <div class="dropdown-xp-label">
                  <span>Esperienza (${profile.xp} XP)</span>
                  <span style="color: var(--gold); font-weight: bold;">Lvl ${profile.level || 1}</span>
                </div>
                <div class="dropdown-xp-bar" title="${profile.xp} XP (Mancano ${nextInfo.xpNeeded} XP a ${nextInfo.nextLevel})">
                  <div class="dropdown-xp-progress" style="width: ${nextInfo.percentage}%"></div>
                </div>
                <div class="dropdown-xp-needed">Mancano ${nextInfo.xpNeeded} XP a ${nextInfo.nextLevel}</div>
              </div>
              
              <div class="dropdown-dracme">
                <i class="fa-solid fa-coins gold-coin"></i>
                <span>${profile.dracme} Dracme</span>
              </div>
            `;
          }
        } else {
          // Docente o Admin
          const roleText = user.role === 'admin' ? 'Amministratore' : 'Docente';
          avatarImg = 'assets/images/pergamena_crest.png';
          levelText = roleText;
          
          dropdownHtml = `
            <div class="dropdown-class-info" style="font-family: var(--font-heading); color: var(--gold); border-bottom: 1px solid rgba(212,175,55,0.1); padding-bottom: 8px;">
              <strong>${user.name}</strong><br>
              <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-body); text-transform: uppercase;">${roleText}</span>
            </div>
          `;
        }
        
        // Aggiungi azioni comuni in fondo al dropdown (con timer per studente, privacy/contatti per tutti)
        const isStudente = user.role === 'studente' || user.role === 'forestiero';
        const timerHtml = isStudente ? `
          <div id="dropdown-timer-container" style="display: none; padding: 8px 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; margin-bottom: 10px; text-align: center;">
            <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;"><i class="fa-regular fa-clock"></i> TEMPO SESSIONE</div>
            <div id="dropdown-session-timer" style="font-family: monospace; font-size: 1.3rem; font-weight: bold; color: var(--gold); letter-spacing: 2px;">45:00</div>
          </div>` : '';
        dropdownHtml += `
          <div class="dropdown-divider"></div>
          
          ${timerHtml}
          

          <div class="dropdown-legal-btns">
            <button class="btn btn-secondary dropdown-sm-btn" onclick="EroiApp.openLegalModal('privacy')">
              <i class="fa-solid fa-shield"></i> Privacy
            </button>
            <button class="btn btn-secondary dropdown-sm-btn" onclick="EroiApp.openLegalModal('terms')">
              <i class="fa-solid fa-scroll"></i> Termini
            </button>
            <button class="btn btn-secondary dropdown-sm-btn" onclick="window.showContattiModal()">
              <i class="fa-solid fa-envelope"></i> Contatti
            </button>
          </div>
          
          <!-- Link dashboard visibile solo su mobile -->
          <div class="dropdown-dashboard-link">
            <button class="btn btn-secondary dropdown-sm-btn dropdown-dashboard-btn" onclick="EroiApp.closeMobileDropdown && EroiApp.closeMobileDropdown(); EroiApp.navigateTo('${user.role === 'docente' ? 'view-teacher-dashboard' : user.role === 'admin' ? 'view-admin-dashboard' : 'view-student-dashboard'}')">
              <i class="fa-solid fa-gauge"></i> Dashboard
            </button>
          </div>
          
          <div class="dropdown-actions">
            <button class="btn btn-secondary btn-toggle-audio-action dropdown-sm-btn" title="Toggle Audio">
              <i class="fa-solid fa-volume-high"></i> Effetti
            </button>
            <button class="btn btn-danger btn-logout-action dropdown-sm-btn">
              <i class="fa-solid fa-power-off"></i> Esci
            </button>
          </div>
        `;
        
        profileWidget.innerHTML = `
          <div class="header-avatar-wrapper">
            <img class="header-avatar-img" src="${avatarImg}" alt="${user.name}">
          </div>
          <div class="header-user-info" id="header-user-info-click" style="cursor: pointer;" title="Vai alla Dashboard">
            <span class="header-user-name">${user.name.split(' ')[0]}</span>
            <span class="header-user-level">${levelText}</span>
          </div>
          <i class="fa-solid fa-chevron-down dropdown-arrow"></i>
        `;
        
        profileDropdown.innerHTML = dropdownHtml;
        if (window.MusicPlayer) {
            window.MusicPlayer.updateUI();
        }

        const userInfoClick = profileWidget.querySelector('#header-user-info-click');
        if (userInfoClick) {
          userInfoClick.addEventListener('click', (e) => {
            e.stopPropagation();
            let dashboardView = 'view-student-dashboard';
            if (user.role === 'docente') dashboardView = 'view-teacher-dashboard';
            else if (user.role === 'admin') dashboardView = 'view-admin-dashboard';
            this.navigateTo(dashboardView);
          });
        }
        
        // Collega i click listener sui bottoni del dropdown
        const audioBtn = profileDropdown.querySelector('.btn-toggle-audio-action');
        if (audioBtn) {
          audioBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            EroiAudio.toggleMute();
          });
        }
        
        const logoutBtn = profileDropdown.querySelector('.btn-logout-action');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm("Sei sicuro di voler uscire dal gioco?")) {
              Auth.logout();
              this.showToast("Disconnessione effettuata.", "success");
              this.checkSession();
            }
          });
        }
        
        // Aggiorna l'icona dell'audio nel dropdown al rendering
        EroiAudio.updateMuteUI();
      }

      let links = [];

      if (!user) {
        links = [
          { view: 'disabled', label: 'Mappa', icon: 'fa-map-marked-alt' },
          { view: 'disabled', label: 'Diario', icon: 'fa-feather-pointed' },
          { view: 'disabled', label: 'Tempio', icon: 'fa-book-open' }
        ];
      } else if (user.role === 'studente' || user.role === 'forestiero') {
        links = [
          { view: 'view-map', label: 'Mappa', icon: 'fa-map-marked-alt' },
          { view: 'view-diario', label: 'Diario', icon: 'fa-feather-pointed' },
          { view: 'view-shop', label: 'Mercato', icon: 'fa-coins' },
          { view: 'view-inventory', label: 'Inventario', icon: 'fa-box-open' },
          { view: 'view-guides', label: 'Tempio', icon: 'fa-book-open' },
          { view: 'view-regolamento', label: 'Regolamento', icon: 'fa-gavel' }
        ];
      } else if (user.role === 'docente') {
        links = [
          { view: 'view-map', label: 'Mappa', icon: 'fa-map-marked-alt' },
          { view: 'view-diario', label: 'Diario', icon: 'fa-feather-pointed' },
          { view: 'view-shop', label: 'Mercato', icon: 'fa-coins' },
          { view: 'view-inventory', label: 'Inventario', icon: 'fa-box-open' },
          { view: 'view-guides', label: 'Tempio', icon: 'fa-book-open' },
          { view: 'view-regolamento', label: 'Regolamento', icon: 'fa-gavel' }
        ];
      } else if (user.role === 'admin') {
        links = [
          { view: 'view-admin-dashboard', label: 'Pannello Admin', icon: 'fa-screwdriver-wrench' },
          { view: 'view-teacher-dashboard', label: 'Pannello Docente', icon: 'fa-chalkboard-user' },
          { view: 'view-map', label: 'Mappa', icon: 'fa-map-marked-alt' },
          { view: 'view-diario', label: 'Diario', icon: 'fa-feather-pointed' },
          { view: 'view-shop', label: 'Mercato', icon: 'fa-coins' },
          { view: 'view-inventory', label: 'Inventario', icon: 'fa-box-open' },
          { view: 'view-guides', label: 'Tempio', icon: 'fa-book-open' },
          { view: 'view-regolamento', label: 'Regolamento', icon: 'fa-gavel' }
        ];
      }

      // Renderizza links nella bottom navigation per desktop/mobile dock (senza lo slice a 5 per mostrarli tutti)
      mobileMenu.innerHTML = links.map(l => {
        if (l.view === 'disabled') {
            return `
            <a href="#" class="mobile-nav-item" style="opacity: 0.5; cursor: not-allowed;">
              <i class="fa-solid ${l.icon}"></i>
              <span>${l.label}</span>
            </a>
            `;
        }
        return `
        <a href="#${l.view}" class="mobile-nav-item" data-view="${l.view}">
          <i class="fa-solid ${l.icon}"></i>
          <span>${l.label}</span>
        </a>
        `;
      }).join('');

      // Aggiungi click listener a mobile
      mobileMenu.querySelectorAll('.mobile-nav-item').forEach(link => {
        if (link.getAttribute('data-view')) {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              const view = link.getAttribute('data-view');
              this.navigateTo(view);
            });
        } else {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              this.showToast("Devi completare l'accesso per esplorare questa sezione.", "warning");
            });
        }
      });
    },

    bindEvents: function() {
      const self = this;

      // Toggle Dropdown Profilo
      const profileWidget = document.getElementById('header-profile-widget');
      const profileDropdown = document.getElementById('profile-dropdown-card');
      if (profileWidget && profileDropdown) {
        profileWidget.addEventListener('click', function(e) {
          e.stopPropagation();
          const isHidden = profileDropdown.style.display === 'none';
          profileDropdown.style.display = isHidden ? 'block' : 'none';
          if (window.MusicPlayer) window.MusicPlayer.updateUI();
        });
        
        document.addEventListener('click', function() {
          profileDropdown.style.display = 'none';
        });
        
        profileDropdown.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      }

      // Home/Dashboard Link nel logo dell'header
      const headerLogo = document.getElementById('header-logo-container');
      if (headerLogo) {
        headerLogo.addEventListener('click', function() {
          const user = Auth.getUser();
          if (user) {
            if (user.role === 'studente' || user.role === 'forestiero') self.navigateTo('view-student-dashboard');
            else if (user.role === 'docente') self.navigateTo('view-teacher-dashboard');
            else if (user.role === 'admin') self.navigateTo('view-admin-dashboard');
          }
        });
      }

      // Toggle Audio
      const toggleAudioBtn = document.getElementById('btn-toggle-audio');
      if (toggleAudioBtn) {
        toggleAudioBtn.addEventListener('click', function() {
          EroiAudio.toggleMute();
        });
      }

      // Navigazione tastiera per le guide dello studio (Freccia Su e Giù)
      document.addEventListener('keydown', function(e) {
        if (self.getCurrentViewId() === 'view-guides') {
          // Salta se l'utente sta scrivendo in un input o textarea
          if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
            return;
          }
          
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const items = Array.from(document.querySelectorAll('#guides-sidebar-list .guide-list-item'));
            if (items.length === 0) return;
            
            e.preventDefault(); // Previene lo scroll della pagina
            
            const activeItem = document.querySelector('#guides-sidebar-list .guide-list-item.active');
            let nextIndex = 0;
            
            if (activeItem) {
              const index = items.indexOf(activeItem);
              if (e.key === 'ArrowDown') {
                nextIndex = Math.min(index + 1, items.length - 1);
              } else {
                nextIndex = Math.max(index - 1, 0);
              }
            } else {
              nextIndex = e.key === 'ArrowDown' ? 0 : items.length - 1;
            }
            
            if (items[nextIndex]) {
              items[nextIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
              items[nextIndex].click();
            }
          }
        }
      });



      // Pulsante Logout
      document.getElementById('btn-logout').addEventListener('click', function() {
        if (confirm("Sei sicuro di voler uscire dal gioco?")) {
          Auth.logout();
          self.showToast("Disconnessione effettuata.", "success");
          self.checkSession();
        }
      });

      // Abbandona Quiz
      document.getElementById('btn-abort-quiz').addEventListener('click', function() {
        if (confirm("Vuoi abbandonare la missione? Tutti i progressi del quiz andranno persi.")) {
          document.getElementById('active-quiz-container').style.display = 'none';
          document.getElementById('missions-categories-container').style.display = 'block';
        }
      });

      // Cambio Tab dell'Inventario Studente
      document.getElementById('inv-tab-consumables').addEventListener('click', function() { self.switchInventoryTab('consumables'); });
      document.getElementById('inv-tab-artifacts').addEventListener('click', function() { self.switchInventoryTab('artifacts'); });
      document.getElementById('inv-tab-helpers').addEventListener('click', function() { self.switchInventoryTab('helpers'); });

      // --- DOCENTE SUBMISSIONS ---
      // Aggiungi Studente
      document.getElementById('form-create-student').addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('new-student-name').value;
        const email = document.getElementById('new-student-email').value;
        const classId = document.getElementById('new-student-class').value;
        const avatar = document.getElementById('new-student-avatar').value;
        
        try {
          const userExists = window.EroiDB.getUser(email);
          if (userExists) {
            alert("Email già registrata.");
            return;
          }

          // Genera password predefinita basata sul nome in minuscolo senza spazi
          const defaultPassword = name.toLowerCase().replace(/\s+/g, '') + "123";
          const hash = await window.EroiAuth.hashPassword(defaultPassword);

          window.EroiDB.saveUser(email, {
            email: email,
            name: name,
            role: "student",
            classId: classId,
            passwordHash: hash
          });

          const _su = window.EroiDB.getUser(email);
        if (_su && (_su.role === "docente" || _su.role === "admin")) window.EroiDB.saveTeacherPlayerProfile(email, {
            email: email,
            name: name,
            avatarClass: avatar,
            level: "Viaggiatore",
            xp: 0,
            dracme: 15, // Dracme di partenza
            stats: { ...window.EroiMockData.avatars[avatar].baseStats },
            activeHelper: null,
            activeArtifacts: [],
            unlockedAreas: ["Olimpo"]
          });
        else window.EroiDB.saveStudentProfile(email, {
            email: email,
            name: name,
            avatarClass: avatar,
            level: "Viaggiatore",
            xp: 0,
            dracme: 15, // Dracme di partenza
            stats: { ...window.EroiMockData.avatars[avatar].baseStats },
            activeHelper: null,
            activeArtifacts: [],
            unlockedAreas: ["Olimpo"]
          });

          const teacher = Auth.getUser();
          window.EroiDB.logActivity(teacher.email, `Iscritto lo studente: ${name} (Email: ${email}) nella classe ${classId}. Password temporanea: ${defaultPassword}`);
          self.showToast("Studente iscritto con successo!", "success");
          
          document.getElementById('new-student-name').value = '';
          document.getElementById('new-student-email').value = '';
          self.renderTeacherStudents();
          self.renderTeacherStats();
        } catch (err) {
          alert("Errore: " + err.message);
        }
      });

      // Crea Classe
      document.getElementById('form-create-class').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('new-class-id').value.toUpperCase().trim();
        const name = document.getElementById('new-class-name').value;
        const school = document.getElementById('new-class-school').value.trim();
        const city = document.getElementById('new-class-city').value.trim();
        
        const teacher = Auth.getUser();
        
        if (window.EroiDB.getClasses()[id]) {
          alert("Una classe con questo codice ID esiste già.");
          return;
        }

        const code = "ER-" + Math.random().toString(36).substring(2, 6).toUpperCase();

        window.EroiDB.saveClass(id, { 
          id: id, 
          name: name, 
          code: code, 
          teacher: teacher.email, 
          collaborators: [],
          school: school || null,
          city: city || null
        });

        window.EroiDB.logActivity(teacher.email, `Creata nuova classe ${id} - ${name} con codice ${code}`);
        self.showToast(`Classe creata! Codice: ${code}`, "success");
        
        document.getElementById('new-class-id').value = '';
        document.getElementById('new-class-name').value = '';
        document.getElementById('new-class-school').value = '';
        document.getElementById('new-class-city').value = '';

        self.renderTeacherClasses();
        self.populateClassSelects();
        self.renderTeacherStats();
      });

      // Unisciti come collaboratore ad una classe
      const formJoinCollaborator = document.getElementById('form-join-collaborator');
      if (formJoinCollaborator) {
        formJoinCollaborator.addEventListener('submit', function(e) {
          e.preventDefault();
          const codeInput = document.getElementById('recover-class-code');
          if (codeInput) {
            const code = codeInput.value.trim();
            self.joinClassAsCollaborator(code);
            codeInput.value = '';
          }
        });
      }

      // Crea Torneo Interno
      const formCreateTournament = document.getElementById('form-create-tournament');
      if (formCreateTournament) {
        formCreateTournament.addEventListener('submit', function(e) {
          e.preventDefault();
          const nameInput = document.getElementById('new-tournament-name');
          const name = nameInput ? nameInput.value.trim() : '';
          
          const checkedCheckboxes = document.querySelectorAll('input[name="tournament-classes"]:checked');
          const classIds = Array.from(checkedCheckboxes).map(cb => cb.value);

          if (classIds.length < 2) {
            alert("Seleziona almeno 2 classi per creare un torneo interno.");
            return;
          }

          const tournamentId = "T-" + Date.now();
          const tournamentData = {
            id: tournamentId,
            name: name,
            classes: classIds,
            createdAt: new Date().toISOString()
          };

          const user = Auth.getUser();
          window.EroiDB.saveTournament(tournamentId, tournamentData);
          window.EroiDB.logActivity(user.email, `Creato torneo interno: ${name} con classi: ${classIds.join(', ')}`);
          self.showToast("Torneo creato con successo!", "success");

          if (nameInput) nameInput.value = '';
          checkedCheckboxes.forEach(cb => cb.checked = false);

          self.renderTeacherTournaments();
        });
      }

      // Crea Missione
      document.getElementById('form-create-mission').addEventListener('submit', function(e) {
        e.preventDefault();
        // Se il bottone è in modalità edit, non fare nulla (gestisce saveEditedMission via onclick)
        const btn = document.getElementById('btn-save-mission');
        if (btn && btn.getAttribute('data-edit-id')) return;

        const id = document.getElementById('new-mission-id').value.trim();
        const title = document.getElementById('new-mission-title').value;
        const category = document.getElementById('new-mission-category').value;
        const area = document.getElementById('new-mission-area').value;
        const gameType = document.getElementById('new-mission-gametype').value;
        const xp = Number(document.getElementById('new-mission-xp').value);
        const dracme = Number(document.getElementById('new-mission-dracme').value);
        const desc = document.getElementById('new-mission-desc').value;
        
        // Prima domanda
        const qText = document.getElementById('new-mission-q').value;
        const opt0 = document.getElementById('new-mission-opt0').value;
        const opt1 = document.getElementById('new-mission-opt1').value;
        const opt2 = document.getElementById('new-mission-opt2').value;
        const opt3 = document.getElementById('new-mission-opt3').value;

        const missionObj = {
          id: id,
          category: category,
          title: title,
          desc: desc,
          area: area,
          gameType: gameType,
          rewards: { xp: xp, dracme: dracme },
          questions: [
            { q: qText, a: [opt0, opt1, opt2, opt3], correct: 0 }
          ]
        };

        const teacher = Auth.getUser();
        window.EroiDB.saveMission(id, missionObj);
        window.EroiDB.logActivity(teacher.email, `Creata/Modificata missione ${id}: ${title}`);
        self.showToast("Missione salvata!", "success");

        document.getElementById('new-mission-id').value = '';
        document.getElementById('new-mission-title').value = '';
        document.getElementById('new-mission-desc').value = '';
        self.resetMissionForm();
        self.renderTeacherMissions();
      });

      // Crea Oggetto Shop
      document.getElementById('form-create-shop-item').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('new-item-id').value.trim();
        const name = document.getElementById('new-item-name').value;
        const price = Number(document.getElementById('new-item-price').value);
        const rarity = document.getElementById('new-item-rarity').value;
        const type = document.getElementById('new-item-type').value;
        const stock = Number(document.getElementById('new-item-stock').value);
        const desc = document.getElementById('new-item-desc').value;

        const itemObj = {
          id: id,
          name: name,
          price: price,
          rarity: rarity,
          type: type,
          stock: stock,
          desc: desc,
          active: true
        };

        const teacher = Auth.getUser();
        window.EroiDB.saveShopItem(id, itemObj);
        window.EroiDB.logActivity(teacher.email, `Salvato oggetto shop: ${name} (Prezzo: ${price} Dracme)`);
        self.showToast("Prodotto salvato nello shop!", "success");

        document.getElementById('new-item-id').value = '';
        document.getElementById('new-item-name').value = '';
        document.getElementById('new-item-desc').value = '';
        self.renderTeacherShop();
      });

      // Crea Artefatto
      document.getElementById('form-create-artifact').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('new-art-id').value.trim();
        const name = document.getElementById('new-art-name').value;
        const rarity = document.getElementById('new-art-rarity').value;
        const icon = document.getElementById('new-art-icon').value;
        const bonus = document.getElementById('new-art-bonus').value;
        const desc = document.getElementById('new-art-desc').value;

        const artObj = {
          id: id,
          name: name,
          rarity: rarity,
          image: icon,
          bonus: bonus,
          desc: desc
        };

        const teacher = Auth.getUser();
        window.EroiDB.saveArtifact(id, artObj);
        window.EroiDB.logActivity(teacher.email, `Creato/Modificato artefatto leggendario/speciale: ${name}`);
        self.showToast("Artefatto salvato con successo!", "success");

        document.getElementById('new-art-id').value = '';
        document.getElementById('new-art-name').value = '';
        document.getElementById('new-art-desc').value = '';
        self.renderTeacherHelpersAndArtifacts();
      });

      // Crea Guida Didattica
      document.getElementById('form-create-guide').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('guide-id').value.trim();
        const title = document.getElementById('guide-title').value;
        const category = document.getElementById('guide-category').value;
        const summary = document.getElementById('guide-summary').value;
        const content = document.getElementById('guide-content').value;

        const guideObj = {
          id: id,
          title: title,
          category: category,
          summary: summary,
          content: content
        };

        const teacher = Auth.getUser();
        window.EroiDB.saveStudyGuide(id, guideObj);
        window.EroiDB.logActivity(teacher.email, `Pubblicata guida di studio: ${title}`);
        self.showToast("Guida didattica pubblicata!", "success");

        document.getElementById('guide-id').value = '';
        document.getElementById('guide-title').value = '';
        document.getElementById('guide-summary').value = '';
        document.getElementById('guide-content').value = '';
        self.renderTeacherGuides();
      });

      // Filtro ricerca e classe nella dashboard docente
      document.getElementById('search-student-teacher').addEventListener('input', function() { self.renderTeacherStudents(); });
      document.getElementById('filter-class-teacher').addEventListener('change', function() { self.renderTeacherStudents(); });

      // --- ADMIN SUBMISSIONS ---
      // Salva Impostazioni Globali
      document.getElementById('form-admin-settings').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('admin-setting-appname').value;
        const copy = document.getElementById('admin-setting-copyright').value;
        const cont = document.getElementById('admin-setting-contacts').value;

        window.EroiDB.saveSettings({
          appName: name,
          copyright: copy,
          contacts: cont
        });

        window.EroiDB.logActivity("admin", "Aggiornate le impostazioni globali");
        self.showToast("Configurazione globale salvata!", "success");
        self.renderFooterDetails();
      });

      // Salva Impostazioni Docente (Classe)
      const formTeacherSettings = document.getElementById('form-teacher-settings');
      if (formTeacherSettings) {
          formTeacherSettings.addEventListener('submit', function(e) {
            e.preventDefault();
            const classId = document.getElementById('teacher-settings-class-select').value;
            if (!classId) return;
            const secondTerm = document.getElementById('teacher-setting-secondterm').checked;
            
            window.EroiDB.saveClass(classId, { secondTermActive: secondTerm });
            
            const teacher = Auth.getUser();
            window.EroiDB.logActivity(teacher.email, `Aggiornato 2° Quadrimestre a ${secondTerm} per la classe ${classId}`);
            self.showToast("Impostazioni classe salvate!", "success");
          });
      }

      // Registra Staff
      document.getElementById('form-create-staff').addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('staff-name').value;
        const email = document.getElementById('staff-email').value;
        const pass = document.getElementById('staff-password').value;
        const role = document.getElementById('staff-role').value;

        try {
          const exists = window.EroiDB.getUser(email);
          if (exists) {
            alert("Questo account email esiste già.");
            return;
          }

          const hash = await window.EroiAuth.hashPassword(pass);
          window.EroiDB.saveUser(email, {
            email: email,
            name: name,
            role: role,
            passwordHash: hash
          });

          window.EroiDB.logActivity("admin", `Registrato un nuovo membro dello staff: ${name} (Ruolo: ${role})`);
          self.showToast("Account dello staff registrato!", "success");

          document.getElementById('staff-name').value = '';
          document.getElementById('staff-email').value = '';
          document.getElementById('staff-password').value = '';
          self.renderAdminStaff();
        } catch (err) {
          alert("Errore: " + err.message);
        }
      });

      // Salva Informative Legali
      document.getElementById('form-legal-docs').addEventListener('submit', function(e) {
        e.preventDefault();
        const privacy = document.getElementById('legal-doc-privacy').value;
        const terms = document.getElementById('legal-doc-terms').value;
        const cookies = document.getElementById('legal-doc-cookies').value;
        const gdpr = document.getElementById('legal-doc-gdpr').value;

        window.EroiDB.saveRegolamenti({
          studente: window.EroiDB.getRegolamenti().studente,
          docente: window.EroiDB.getRegolamenti().docente
        });
        
        // Salva nelle impostazioni legali del database
        const settings = window.EroiDB.getSettings();
        settings.privacy = privacy;
        settings.terms = terms;
        settings.cookies = cookies;
        settings.gdpr = gdpr;
        window.EroiDB.saveSettings(settings);

        window.EroiDB.logActivity("admin", "Aggiornata la documentazione legale della piattaforma.");
        self.showToast("Documenti legali aggiornati!", "success");
      });

      // Gestione ridimensionamento per ridisegnare la barra navigazione
      window.addEventListener('resize', function() {
        const user = Auth.getUser();
        if (user) {
          self.updateNavigationUI(self.getCurrentViewId());
        }
      });
    },

    getCurrentViewId: function() {
      const activeView = document.querySelector('.view.active');
      return activeView ? activeView.id : 'view-login';
    },

    checkSession: function() {
      const user = Auth.getUser();
      if (user) {
        // Handle auto-play on session restoration
        const needsVideo = user.role === 'studente' && !sessionStorage.getItem('introVideoPlayed');
        if (window.MusicPlayer && !window.MusicPlayer.isPlaying && !needsVideo) {
            // Musica: parte subito dopo login
            window.MusicPlayer.togglePlay();
        }
        
        document.getElementById('user-display-name').textContent = user.name;
        document.getElementById('user-display-role').textContent = user.role === 'admin' ? 'Amministratore' : (user.role === 'docente' ? 'Docente' : (user.role === 'forestiero' ? 'Forestiero' : 'Studente'));
        
        // Controlla se l'onboarding è completo
        if (!user.setupComplete) {
            if (user.role === 'pending') {
                this.navigateTo('view-onboarding');
                return;
            }
            if (user.role === 'docente') {
                this.navigateTo('view-iscrizione');
                return;
            }
            if (user.role === 'studente') {
                this.navigateTo('view-selezione-profilo');
                return;
            }
        }
        
        // Docente in attesa di approvazione
        if (user.role === 'docente' && user.setupComplete && user.approved === false) {
            this.navigateTo('view-pending-docente');
            return;
        }

        // Inizializza profilo Player Docente/Admin se non esiste
        if (user.role === 'docente' || user.role === 'admin') {
            let tProfile = window.EroiDB.getTeacherPlayerProfile(user.email);
            if (!tProfile) {
                tProfile = {
                    email: user.email,
                    name: user.name,
                    level: 1,
                    xp: 0,
                    dracme: 100,
                    avatarClass: user.role === 'admin' ? 'Custode della Sapienza' : 'Custode della Sapienza', // Predefinito per lo staff
                    inventory: [],
                    stats: { missionsCompleted: 0, questionsAnswered: 0, perfectScores: 0 },
                    visitedRegions: [],
                    discoveredNodes: [],
                    completedMissions: [],
                    activeMissions: [],
                    diario: []
                };
                window.EroiDB.saveTeacherPlayerProfile(user.email, tProfile);
            }
        }
        
        // Reindirizza alla dashboard corretta se eravamo fermi alla login o all'onboarding
        const currentView = this.getCurrentViewId();
        const authViews = ['view-login', 'view-welcome', 'view-onboarding', 'view-selezione-profilo', 'view-iscrizione', 'view-pending-docente'];
        if (authViews.includes(currentView)) {
          if (user.role === 'studente' || user.role === 'forestiero') this.navigateTo('view-student-dashboard');
          else if (user.role === 'docente') this.navigateTo('view-teacher-dashboard');
          else if (user.role === 'admin') this.navigateTo('view-admin-dashboard');
        } else {
          this.navigateTo(currentView);
        }
        
        // Initialize timer if applicable
        if (typeof SessionTimer !== 'undefined') {
            SessionTimer.init();
        }
      } else {
        this.navigateTo('view-welcome');
        if (typeof SessionTimer !== 'undefined' && SessionTimer.timerInterval) {
            clearInterval(SessionTimer.timerInterval);
        }
      }
    },

    // --- VIEW RENDERERS ---
    renderViewData: function(viewId, user) {
      switch (viewId) {
        case 'view-student-dashboard':
          this.renderStudentDashboard(user.email);
          break;
        case 'view-map':
          this.renderInteractiveMap(user.email);
          break;
        case 'view-diario':
          this.renderDiario(user.email);
          break;
        case 'view-missions':
          this.renderMissionsList(user.email);
          break;
        case 'view-shop':
          this.renderShop(user.email);
          break;
        case 'view-inventory':
          this.renderInventory(user.email);
          break;
        case 'view-guides':
          this.renderGuides();
          break;
        case 'view-teacher-dashboard':
          this.renderTeacherDashboard();
          break;
        case 'view-admin-dashboard':
          this.renderAdminDashboard();
          break;
        case 'view-regolamento':
          this.renderRegolamento(user);
          break;
      }
    },

    // --- MINI-GIOCHI ---
    startMinigame: function(type, missionId) {
      if (window.EroiMinigames) {
        window.EroiMinigames.startMinigame(type, missionId);
      } else {
        this.showToast('Mini-giochi non disponibili in questo momento.', 'danger');
      }
    },

    closeMinigame: function() {
      if (window.EroiMinigames) {
        window.EroiMinigames.closeMinigame();
      }
      const container = document.getElementById('missions-categories-container');
      if (container) {
        container.style.display = 'block';
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    renderFooterDetails: function() {
      const settings = window.EroiDB.getSettings();
      const nameEl = document.getElementById('footer-app-name');
      const copyEl = document.getElementById('footer-copyright-text');
      if (nameEl) nameEl.textContent = settings.appName;
      // if (copyEl) copyEl.textContent = settings.copyright;
    },

    // --- STUDENT RENDERERS ---
    renderStudentDashboard: function(email) {
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      if (!profile) return;

      const avatarBox = document.getElementById('stud-dashboard-avatar');
      if (avatarBox) {
        avatarBox.innerHTML = `
          <div class="dashboard-avatar-container" id="dashboard-avatar-container-3d">
            <div class="portrait-particles-container" id="dashboard-avatar-particles"></div>
            <img src="${this.getAvatarImage(profile.avatarClass)}" class="dashboard-avatar-img animated-3d-avatar" alt="${profile.avatarClass}">
          </div>
        `;
        // Inizializza particelle ed effetto 3D
        this.createParticles('dashboard-avatar-particles');
        this.bind3DTilt('dashboard-avatar-container-3d', '.dashboard-avatar-img', '.portrait-particles-container');
      }
      const u = window.EroiDB.getUser(email);
      const classId = u ? u.classId : "";
      document.getElementById('stud-dashboard-name').textContent = profile.name;
      document.getElementById('stud-dashboard-class').textContent = classId || "Nessuna";
      document.getElementById('stud-dashboard-level').textContent = profile.level;
      document.getElementById('stud-dashboard-dracme').innerHTML = `${profile.dracme} <i class="fa-solid fa-coins"></i>`;

      // Renderizza pannello classe studente
      const studentClassContent = document.getElementById('student-class-content');
      if (studentClassContent) {
        const classes = window.EroiDB.getClasses();
        const studentClass = classId ? classes[classId] : null;

        if (studentClass) {
          studentClassContent.innerHTML = `
            <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.02); border: 1.5px solid var(--gold); border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Codice Classe Attivo</span>
              <div style="font-size: 1.8rem; font-weight: bold; color: var(--gold); margin: 6px 0; font-family: var(--font-heading);">${studentClass.code}</div>
              <p style="font-size: 0.9rem; color: var(--text-light); font-weight: 600;">Classe: ${studentClass.name}</p>
              <button class="btn btn-danger" style="margin-top: 12px; padding: 6px 12px; font-size: 0.8rem; width: 100%;" onclick="EroiApp.leaveClass()">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Esci dalla classe
              </button>
            </div>
          `;
        } else {
          studentClassContent.innerHTML = `
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.4;">
              Non sei ancora iscritto a nessuna classe. Inserisci il codice fornito dal tuo docente per unirti e iniziare le missioni.
            </p>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="join-class-code" class="form-control" placeholder="Es: ER-XXXX" style="font-family: monospace; text-transform: uppercase;">
              <button class="btn" onclick="EroiApp.joinClassByCode()" style="padding: 0 15px;">Entra</button>
            </div>
          `;
        }
      }

      // Progression XP
      const nextInfo = window.EroiGame.getNextLevelInfo(profile.xp);
      document.getElementById('stud-dashboard-xp-text').textContent = `${profile.xp} XP / ${profile.xp + (nextInfo.xpNeeded || 0)} XP (Richiesto)`;
      document.getElementById('stud-dashboard-xp-fill').style.width = `${nextInfo.percentage}%`;
      
      if (nextInfo.xpNeeded > 0) {
        document.getElementById('stud-dashboard-next-level-tip').textContent = `Mancano ${nextInfo.xpNeeded} XP al livello successivo (${nextInfo.nextLevel}).`;
      } else {
        document.getElementById('stud-dashboard-next-level-tip').textContent = `Hai raggiunto il massimo livello di Epica! Sei una Leggenda.`;
      }

      // Stats
      document.getElementById('stud-stat-coraggio').textContent = profile.stats.coraggio;
      document.getElementById('stud-stat-astuzia').textContent = profile.stats.astuzia;
      document.getElementById('stud-stat-sapienza').textContent = profile.stats.sapienza;
      document.getElementById('stud-stat-onore').textContent = profile.stats.onore;

      // Renderizza aiutante attivo sul profilo
      const helpers = window.EroiDB.getHelpers();
      const helperBox = document.getElementById('stud-active-helper-box');
      if (profile.activeHelper && helpers[profile.activeHelper]) {
        const h = helpers[profile.activeHelper];
        helperBox.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px; padding: 6px; background: rgba(212,175,55,0.1); border-radius: 6px;">
            <span style="font-size: 1.5rem;">👑</span>
            <div>
              <strong style="color: var(--gold);">${h.name}</strong>
              <p style="font-size: 0.72rem; color: var(--text-muted);">${h.desc}</p>
            </div>
          </div>
        `;
      } else {
        helperBox.innerHTML = `<i style="color: var(--text-muted); font-size: 0.85rem;">Nessun aiutante equipaggiato. Visita l'Inventario.</i>`;
      }

      // Renderizza artefatti attivi sul profilo
      const arts = window.EroiDB.getArtifacts();
      const artsBox = document.getElementById('stud-active-artifacts-box');
      if (profile.activeArtifacts && profile.activeArtifacts.length > 0) {
        let html = '';
        profile.activeArtifacts.forEach(artId => {
          const a = arts[artId];
          if (a) {
            html += `
              <div style="display: flex; align-items: center; gap: 10px; padding: 6px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;">
                <span style="font-size: 1.2rem;">${a.image}</span>
                <div style="flex-grow: 1;">
                  <span style="font-size: 0.8rem; font-weight: 600; color: var(--gold);">${a.name}</span>
                  <p style="font-size: 0.7rem; color: var(--text-muted);">${a.bonus}</p>
                </div>
              </div>
            `;
          }
        });
        artsBox.innerHTML = html;
      } else {
        artsBox.innerHTML = `<i style="color: var(--text-muted); font-size: 0.85rem;">Nessun artefatto attivo. Visita l'Inventario.</i>`;
      }
    },

    getAvatarEmoji: function(avatarClass) {
      switch (avatarClass) {
        case 'Custode della Sapienza': return '🧙‍♂️';
        case 'Guerriero': return '🛡️';
        case 'Navigatore': return '⛵';
        case 'Cantastorie': return '🪕';
        case 'Esploratore': return '🏹';
        default: return '👤';
      }
    },

    getAvatarImage: function(avatarClass) {
      switch (avatarClass) {
        case 'Custode della Sapienza': return 'assets/images/sapienza_class.png';
        case 'Guerriero': return 'assets/images/guerriero_class.png';
        case 'Navigatore': return 'assets/images/navigatore_class.png';
        case 'Cantastorie': return 'assets/images/cantastorie_class.png';
        case 'Esploratore': return 'assets/images/esploratore_class.png';
        default: return 'assets/images/pergamena_crest.png';
      }
    },

    bind3DTilt: function(containerId, imgClass, particlesClass) {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.addEventListener('mousemove', (e) => {
        const img = container.querySelector(imgClass);
        if (!img) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -(y - centerY) / 8; // Max 15 degrees tilt
        const rotateY = (x - centerX) / 8;

        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        
        if (particlesClass) {
          const particles = container.querySelector(particlesClass);
          if (particles) {
            particles.style.transform = `perspective(1000px) rotateX(${rotateX/2}deg) rotateY(${rotateY/2}deg) translateZ(-20px)`;
          }
        }
      });

      container.addEventListener('mouseleave', () => {
        const img = container.querySelector(imgClass);
        if (img) {
          img.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        }
        if (particlesClass) {
          const particles = container.querySelector(particlesClass);
          if (particles) {
            particles.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(-20px)';
          }
        }
      });
    },

    createParticles: function(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = '';
      
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'sparkle';
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `0px`; // Start from bottom of the frame
        particle.style.animationDelay = `${Math.random() * 4}s`;
        particle.style.animationDuration = `${Math.random() * 4 + 3}s`;
        container.appendChild(particle);
      }
    },

    // --- INTERACTIVE MAP ---
    renderInteractiveMap: function(email) {
      
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      if (!profile) return;

      const unlocked = profile.unlockedAreas || ["Accademia"];
      const settings = window.EroiDB.getSettings();

      // Sblocca i nodi grafici e i collegamenti in base alle aree sbloccate dallo studente
      const areas = ["Accademia", "Miti di Fondazione", "Biblioteca", "Archivio", "Olimpo", "Creta", "Troia", "Itaca", "Lazio", "Aquisgrana", "Roncisvalle", "Camelot", "Foresta di Brocelandia", "Castello del Graal", "Worms", "Reno"];
      const secondTermAreas = ["Aquisgrana", "Roncisvalle", "Camelot", "Foresta di Brocelandia", "Castello del Graal", "Worms", "Reno"];

      areas.forEach(area => {
        const node = document.getElementById(`node-${area}`);
        if (!node) return;

        // Accademia è sempre sbloccata (punto di partenza)
        const alwaysUnlocked = area === 'Accademia';
        const isSecondTermLocked = secondTermAreas.includes(area) && !window.EroiApp.isSecondTermActiveForUser();

        if ((alwaysUnlocked || unlocked.includes(area)) && !isSecondTermLocked) {
          node.classList.remove('locked');
          node.onclick = () => {
            if (Auth.getUser() && Auth.getUser().role === 'docente' && secondTermAreas.includes(area)) {
                // Controlla se il docente ha attivato il 2Q per le sue classi
                const myClasses = Object.values(window.EroiDB.getClasses()).filter(c => c.teacher === Auth.getUser().email);
                const hasActive = myClasses.some(c => c.secondTermActive);
                if (!hasActive && myClasses.length > 0 && Auth.getUser().role !== 'admin') {
                    EroiApp.showToast("Nota: Quest'area appartiene al 2° Quadrimestre che non è ancora attivo per le tue classi. Puoi attivarlo dalle Impostazioni Classe.", "info");
                }
            }
            EroiApp.navigateToMissionsAndFilter(area);
          };
        } else {
          node.classList.add('locked');
          node.onclick = () => {
            if (isSecondTermLocked) {
              EroiApp.showToast("Quest'area appartiene al 2° Quadrimestre (non ancora attivo).", "danger");
            } else {
              EroiApp.showToast(`Completa le missioni precedenti per sbloccare ${area}.`, "danger");
            }
          };
        }
      });

      // Disegna i percorsi dorati
      const paths = [
        { from: "Accademia", to: "Miti di Fondazione" },
        { from: "Miti di Fondazione", to: "Biblioteca" },
        { from: "Biblioteca", to: "Archivio" },
        { from: "Archivio", to: "Olimpo" },
        { from: "Olimpo", to: "Creta" },
        { from: "Creta", to: "Troia" },
        { from: "Troia", to: "Itaca" },
        { from: "Itaca", to: "Lazio" },
        { from: "Lazio", to: "Aquisgrana" },
        { from: "Aquisgrana", to: "Roncisvalle" },
        { from: "Roncisvalle", to: "Camelot" },
        { from: "Camelot", to: "Foresta di Brocelandia" },
        { from: "Foresta di Brocelandia", to: "Castello del Graal" },
        { from: "Castello del Graal", to: "Worms" },
        { from: "Worms", to: "Reno" }
      ];

      paths.forEach(p => {
        // Path IDs use abbreviations for Brocelandia and Graal
        const fromId = p.from.replace('Foresta di Brocelandia', 'Brocelandia').replace('Castello del Graal', 'Graal').replace(/ /g, '-');
        const toId = p.to.replace('Foresta di Brocelandia', 'Brocelandia').replace('Castello del Graal', 'Graal').replace(/ /g, '-');
        const pathEl = document.getElementById(`path-${fromId}-${toId}`) ||
                       document.getElementById(`path-${p.from}-${p.to}`);
        if (!pathEl) return;

        const isSecondTermLocked = secondTermAreas.includes(p.to) && !window.EroiApp.isSecondTermActiveForUser();
        const fromUnlocked = p.from === 'Accademia' || unlocked.includes(p.from);

        if (fromUnlocked && unlocked.includes(p.to) && !isSecondTermLocked) {
          pathEl.classList.add('unlocked');
        } else {
          pathEl.classList.remove('unlocked');
        }
      });
    },

    navigateToMissionsAndFilter: function(areaName) {
      currentMissionsFilterArea = areaName;
      this.navigateTo('view-missions');
    },

    clearMissionsFilter: function() {
      currentMissionsFilterArea = null;
      const user = Auth.getUser();
      if (user) {
        this.renderMissionsList(user.email);
      }
    },

    // --- MISSIONS & QUIZZES ---
    renderMissionsList: function(email) {
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      const allMissions = window.EroiDB.getMissions();
      const settings = window.EroiDB.getSettings();
      const container = document.getElementById('missions-categories-container');
      
      container.style.display = 'block';
      document.getElementById('active-quiz-container').style.display = 'none';

      // Filtra in base all'area geografica selezionata
      const missions = currentMissionsFilterArea 
        ? allMissions.filter(m => m.area === currentMissionsFilterArea) 
        : allMissions;

      const categories = [
        // Nodi 1° Quadrimestre (seguono la mappa)
        { name: "Primo Viaggio",           mapArea: "Accademia",              term: 1, icon: "fa-compass",             color: "#a78bfa" },
        { name: "Mitologia",               mapArea: "Miti di Fondazione",     term: 1, icon: "fa-bolt",                color: "#f59e0b" },
        { name: "Iliade",                  mapArea: "Troia",                  term: 1, icon: "fa-shield-halved",       color: "#ef4444" },
        { name: "Odissea",                 mapArea: "Itaca",                  term: 1, icon: "fa-anchor",              color: "#3b82f6" },
        { name: "Eneide",                  mapArea: "Lazio",                  term: 1, icon: "fa-scroll",             color: "#10b981" },
        // Nodi 2° Quadrimestre
        { name: "Ciclo Carolingio",        mapArea: "Aquisgrana",             term: 2, icon: "fa-chess-rook",         color: "#ec4899" },
        { name: "Ciclo Bretone",           mapArea: "Camelot",               term: 2, icon: "fa-wand-magic-sparkles", color: "#8b5cf6" },
        { name: "Ciclo dei Nibelunghi",    mapArea: "Worms",                  term: 2, icon: "fa-dragon",             color: "#ea580c" },
        { name: "La Rimediazione",         mapArea: null,                    term: 2, icon: "fa-film",               color: "#f43f5e" },
        { name: "I Videogiochi",           mapArea: null,                    term: 2, icon: "fa-gamepad",            color: "#10b981" }
      ];

      function miniGameButtons(missionId) {
        return `
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.76rem; display: flex; align-items: center; gap: 6px; background: rgba(212,175,55,0.06); border: 1px solid rgba(212,175,55,0.2);" onclick="EroiApp.startMinigame('impiccato', '${missionId}')">
              <i class="fa-solid fa-masks-theater" style="color: var(--gold);"></i> Impiccato
            </button>
            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.76rem; display: flex; align-items: center; gap: 6px; background: rgba(212,175,55,0.06); border: 1px solid rgba(212,175,55,0.2);" onclick="EroiApp.startMinigame('puzzle', '${missionId}')">
              <i class="fa-solid fa-puzzle-piece" style="color: var(--gold);"></i> Puzzle
            </button>
            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.76rem; display: flex; align-items: center; gap: 6px; background: rgba(212,175,55,0.06); border: 1px solid rgba(212,175,55,0.2);" onclick="EroiApp.startMinigame('cloze', '${missionId}')">
              <i class="fa-solid fa-pen-to-square" style="color: var(--gold);"></i> Cloze
            </button>
            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.76rem; display: flex; align-items: center; gap: 6px; background: rgba(212,175,55,0.06); border: 1px solid rgba(212,175,55,0.2);" onclick="EroiApp.startMinigame('versi', '${missionId}')">
              <i class="fa-solid fa-scroll" style="color: var(--gold);"></i> Riordina Versi
            </button>
          </div>
        `;
      }

      let html = '';
      if (currentMissionsFilterArea) {
        const displayAreaName = currentMissionsFilterArea === 'Accademia' ? "L'inizio del Viaggio" :
                                currentMissionsFilterArea === 'Biblioteca' ? "Gli Autori" :
                                currentMissionsFilterArea === 'Archivio' ? "Le Opere" : currentMissionsFilterArea;
        html += `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 12px; background: rgba(212, 175, 55, 0.15); border: 1px solid var(--gold); border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
            <span style="font-size: 0.95rem; font-weight: bold; color: var(--gold); display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-map-location-dot"></i> Missioni dell'area: <strong style="color:var(--text-light); text-transform:uppercase;">${displayAreaName}</strong>
            </span>
            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="EroiApp.clearMissionsFilter()">
              <i class="fa-solid fa-globe"></i> Mostra Tutte
            </button>
          </div>
        `;
      }

      categories.forEach(cat => {
        const isSecondTermLocked = cat.term === 2 && !window.EroiApp.isSecondTermActiveForUser();
        const catMissions = missions.filter(m => m.category === cat.name);
        
        if (catMissions.length === 0) return;

        const isPrimoViaggio = cat.name === 'Primo Viaggio';

        html += `
          <div class="glass-panel" id="mission-area-group-${cat.name.replace(/\s+/g, '')}" 
               style="margin-top: 15px; opacity: ${isSecondTermLocked ? '0.6' : '1'}; 
                      ${isPrimoViaggio ? 'border: 1px solid rgba(167,139,250,0.4); background: linear-gradient(135deg, rgba(167,139,250,0.04), rgba(37,99,235,0.02));' : ''}">
            <h3 class="panel-title" style="color: ${cat.color || 'var(--gold)'}; justify-content: space-between;">
              <span>
                <i class="fa-solid ${cat.icon}" style="margin-right: 8px;"></i>${cat.name}
                ${cat.label ? `<span style="font-size:0.73rem; background:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.35); padding:2px 7px; border-radius:4px; margin-left:10px; color: var(--gold);">${cat.label}</span>` : ''}
              </span>
            </h3>
            <div style="display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 14px;">
        `;

        catMissions.forEach(m => {
          const isUnlocked = (profile.unlockedAreas || ['Accademia']).includes(m.area) || m.id === 'mit_caos' || m.id === 'quiz_inizio';
          const isPlayable = isUnlocked && !isSecondTermLocked;

          html += `
            <div style="padding: 16px; background: rgba(255,255,255,0.02); 
                        border: 1px solid ${isPlayable ? (isPrimoViaggio ? 'rgba(167,139,250,0.3)' : 'rgba(212,175,55,0.2)') : 'rgba(255,255,255,0.05)'}; 
                        border-radius: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
                <div style="flex-grow: 1; min-width: 220px;">
                  <h4 style="font-family: var(--font-heading); color: ${isPlayable ? 'var(--text-light)' : 'var(--text-muted)'}; margin-bottom: 5px;">${m.title}</h4>
                  <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0 0 6px 0;">
                    <i class="fa-solid fa-location-dot" style="color: ${cat.color || 'var(--gold)'}; margin-right: 4px;"></i>${m.area === 'Accademia' ? "L'inizio del Viaggio" : m.area === 'Biblioteca' ? "Gli Autori" : m.area === 'Archivio' ? "Le Opere" : m.area}
                  </p>
                  <p style="font-size: 0.84rem; color: ${isPlayable ? 'var(--text-light)' : 'var(--text-muted)'}; line-height: 1.5;">${m.desc}</p>
                  <div style="display: flex; gap: 12px; margin-top: 8px; font-size: 0.78rem; font-weight: bold; color: var(--gold);">
                    <span><i class="fa-solid fa-star" style="margin-right:3px;"></i>+${m.rewards.xp} XP</span>
                    <span><i class="fa-solid fa-coins" style="margin-right:3px;"></i>+${m.rewards.dracme} Dracme</span>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; min-width: 130px;">
                  ${isPlayable
                    ? `<button class="btn" style="padding: 9px 16px; font-size: 0.85rem;" onclick="EroiApp.startQuiz('${m.id}')">
                         <i class="fa-solid ${
                           m.gameType === 'puzzle' ? 'fa-puzzle-piece' :
                           m.gameType === 'cloze' ? 'fa-pen-to-square' :
                           m.gameType === 'cantami_o_diva' ? 'fa-microphone' :
                           'fa-play'
                         }"></i> ${
                           m.gameType === 'puzzle' ? 'Risolvi Puzzle' :
                           m.gameType === 'cloze' ? 'Completa Cloze' :
                           m.gameType === 'cantami_o_diva' ? 'Cantami o Diva' :
                           'Svolgi Quiz'
                         }
                       </button>`
                    : `<button class="btn" disabled style="background: rgba(255,255,255,0.05); color: var(--text-muted); padding: 9px 16px; font-size: 0.85rem;">
                         <i class="fa-solid fa-lock"></i> Bloccata
                       </button>`
                  }
                </div>
              </div>
              ${isPlayable ? `
              <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 6px; font-weight: 600; letter-spacing: 0.5px;">
                  <i class="fa-solid fa-gamepad" style="margin-right:4px; color: #a78bfa;"></i>ESERCIZI INTERATTIVI
                </div>
                ${miniGameButtons(m.id)}
              </div>` : ''}
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
    },

    startQuiz: function(missionId) {
      const user = Auth.getUser();
      const missions = window.EroiDB.getMissions();
      const m = missions.find(x => x.id === missionId);
      if (!m) return;

      document.getElementById('missions-categories-container').style.display = 'none';
      const mgContainer = document.getElementById('minigame-container');
      if (mgContainer) mgContainer.style.display = 'none';
      const qBox = document.getElementById('active-quiz-container');
      qBox.style.display = 'block';

      document.getElementById('quiz-title').textContent = `${m.category} - ${m.title}`;

      // Conta quanti indizi possiede lo studente nell'inventario
      const inventory = window.EroiDB.getInventory(user.email);
      const hints = inventory.find(i => i.itemId === 'item_indizio');
      const hintQty = hints ? hints.quantity : 0;
      document.getElementById('hint-qty-label').textContent = hintQty;

      const gameType = m.gameType || 'quiz';
      const hintBtn = document.getElementById('btn-use-hint');
      if (hintBtn) {
        hintBtn.style.display = gameType === 'quiz' ? 'block' : 'none';
      }

      const submitBtn = document.getElementById('btn-submit-quiz-answers');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.onclick = () => {
          EroiApp.submitQuiz(user.email, missionId);
        };
      }

      const listContainer = document.getElementById('quiz-questions-list');

      if (gameType === 'quiz') {
        listContainer.innerHTML = m.questions.map((q, qIndex) => `
          <div class="quiz-question-box" data-correct="${q.correct}">
            <p class="quiz-question-text">${qIndex + 1}. ${q.q}</p>
            <div class="quiz-options">
              ${q.a.map((opt, optIndex) => `
                <div class="quiz-option" onclick="EroiApp.selectQuizOption(this, ${qIndex}, ${optIndex})">
                  <span class="quiz-radio"></span>
                  <span>${opt}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('');

        // Aggancia trigger al bottone "Indizio"
        if (hintBtn) {
          hintBtn.onclick = () => {
            EroiApp.useHintInQuiz(user.email, m);
          };
        }
      } else if (gameType === 'puzzle') {
        const firstQ = m.questions && m.questions[0] ? m.questions[0].q : "Frase da ordinare";
        const words = firstQ.trim().split(/\s+/);
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        window.currentMissionGameState = {
          solution: firstQ,
          shuffled: shuffled,
          selected: [],
          remaining: [...shuffled],
          verified: false
        };
        this.renderMissionPuzzle();
      } else if (gameType === 'cloze') {
        const firstQ = m.questions && m.questions[0] ? m.questions[0].q : "Testo ___ da completare.";
        const blanks = m.questions && m.questions[0] ? m.questions[0].a : ["mancante"];
        window.currentMissionGameState = {
          text: firstQ,
          blanks: blanks.filter(Boolean),
          answers: [],
          verified: false
        };
        this.renderMissionCloze();
      } else if (gameType === 'cantami_o_diva') {
        const firstQ = m.questions && m.questions[0] ? m.questions[0].q : "Spiega il concetto.";
        window.currentMissionGameState = {
          prompt: firstQ,
          recorded: false,
          timerInterval: null
        };
        this.renderMissionCantamiODiva(missionId);
      }
    },

    renderMissionPuzzle: function() {
      const s = window.currentMissionGameState;
      const listContainer = document.getElementById('quiz-questions-list');
      const isCorrect = s.selected.join(' ') === s.solution;

      const selHtml = s.selected.length
        ? s.selected.map((w, i) => `<span style="display:inline-block; background:rgba(37,99,235,0.25); border:1px solid #2563eb; border-radius:6px; padding:6px 12px; margin:4px; font-weight:bold; cursor:pointer; color:var(--text-light);" onclick="EroiApp.puzzleRemove(${i})">${w}</span>`).join('')
        : '<span style="color:var(--text-muted); font-style:italic;">Clicca le parole in basso nel giusto ordine per ricostruire la frase...</span>';

      const remHtml = s.remaining.map((w, i) =>
        `<button class="btn btn-secondary" style="margin:4px; font-weight:bold; font-size:0.85rem;" onclick="EroiApp.puzzleAdd(${i})">${w}</button>`
      ).join('');

      listContainer.innerHTML = `
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; padding: 18px; margin-bottom: 20px;">
          <h4 style="color: var(--gold); font-family: var(--font-heading); margin-bottom: 12px;">🧩 Puzzle: Ricostruisci la frase</h4>
          <div style="min-height:60px; border:1.5px dashed rgba(212,175,55,0.3); border-radius:8px; padding:12px; margin-bottom:16px; background:rgba(0,0,0,0.3); display:flex; flex-wrap:wrap; align-items:center;">
            ${selHtml}
          </div>
          <div style="margin-bottom:8px; font-size:0.85rem; color:var(--text-muted); font-weight:600;">Parole disponibili:</div>
          <div style="min-height:50px; display:flex; flex-wrap:wrap;">
            ${remHtml}
          </div>
          <div style="margin-top:16px; display:flex; gap:10px;">
            <button class="btn btn-secondary" style="padding:6px 12px; font-size:0.8rem;" onclick="EroiApp.puzzleReset()"><i class="fa-solid fa-rotate-left"></i> Reset</button>
          </div>
        </div>
        <div id="puzzle-eval-result"></div>
      `;

      const res = document.getElementById('puzzle-eval-result');
      if (isCorrect) {
        res.innerHTML = `<div style="background:rgba(22,163,74,0.15); border:1px solid #16a34a; border-radius:8px; padding:12px; text-align:center; color:#16a34a; font-weight:bold; margin-bottom:15px;">
          🎉 Ottimo lavoro! La frase è corretta. Clicca su "Concludi Impresa" in basso per incassare i premi.
        </div>`;
      } else if (s.remaining.length === 0) {
        res.innerHTML = `<div style="background:rgba(239,68,68,0.1); border:1px solid #ef4444; border-radius:8px; padding:12px; text-align:center; color:#ef4444; font-weight:bold; margin-bottom:15px;">
          ❌ La frase inserita non è corretta. Premi "Reset" per riprovare.
        </div>`;
      } else {
        res.innerHTML = '';
      }

      const submitBtn = document.getElementById('btn-submit-quiz-answers');
      if (submitBtn) {
        submitBtn.disabled = !isCorrect;
        submitBtn.style.opacity = isCorrect ? '1' : '0.5';
      }
    },

    puzzleAdd: function(i) {
      const s = window.currentMissionGameState;
      const w = s.remaining[i];
      s.selected.push(w);
      s.remaining.splice(i, 1);
      EroiApp.renderMissionPuzzle();
    },

    puzzleRemove: function(i) {
      const s = window.currentMissionGameState;
      const w = s.selected[i];
      s.remaining.push(w);
      s.selected.splice(i, 1);
      EroiApp.renderMissionPuzzle();
    },

    puzzleReset: function() {
      const s = window.currentMissionGameState;
      s.selected = [];
      s.remaining = [...s.shuffled];
      EroiApp.renderMissionPuzzle();
    },

    renderMissionCloze: function() {
      const s = window.currentMissionGameState;
      const listContainer = document.getElementById('quiz-questions-list');

      let idx = 0;
      const renderedText = s.text.replace(/___/g, () => {
        const i = idx++;
        return `<input type="text" class="cloze-input" data-idx="${i}" value="${s.answers[i] || ''}"
          style="width:130px; background:rgba(37,99,235,0.15); border:1.5px solid rgba(37,99,235,0.4); border-radius:6px; padding:4px 8px; color:var(--text-light); font-weight:bold; text-align:center; font-size:0.9rem;"
          oninput="EroiApp.clozeUpdate(${i}, this.value)" placeholder="...">`;
      });

      listContainer.innerHTML = `
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; padding: 18px; margin-bottom: 20px;">
          <h4 style="color: var(--gold); font-family: var(--font-heading); margin-bottom: 12px;">📝 Cloze: Completa il testo inserendo le parole mancanti</h4>
          <div style="background: rgba(0,0,0,0.3); border:1px solid rgba(212,175,55,0.15); border-radius:8px; padding:16px; font-size:1.05rem; line-height:2.4; color:var(--text-light); font-weight:500;">
            ${renderedText}
          </div>
          <div style="margin-top:16px; display:flex; gap:10px;">
            <button class="btn btn-secondary" style="padding:6px 12px; font-size:0.8rem;" onclick="EroiApp.clozeVerify()"><i class="fa-solid fa-check"></i> Verifica</button>
          </div>
        </div>
        <div id="cloze-eval-result"></div>
      `;

      const submitBtn = document.getElementById('btn-submit-quiz-answers');
      if (submitBtn) {
        submitBtn.disabled = !window.currentMissionGameState.verified;
        submitBtn.style.opacity = window.currentMissionGameState.verified ? '1' : '0.5';
      }
    },

    clozeUpdate: function(i, val) {
      window.currentMissionGameState.answers[i] = val.trim();
    },

    clozeVerify: function() {
      const s = window.currentMissionGameState;
      let correctCount = 0;
      const inputs = document.querySelectorAll('.cloze-input');
      
      inputs.forEach(inp => {
        const i = parseInt(inp.getAttribute('data-idx'));
        const val = inp.value.trim();
        s.answers[i] = val;
        const expected = s.blanks[i];
        const isOk = expected && val.toLowerCase() === expected.toLowerCase();
        
        inp.style.borderColor = isOk ? '#16a34a' : '#ef4444';
        inp.style.background = isOk ? 'rgba(22,163,74,0.15)' : 'rgba(239,68,68,0.1)';
        
        if (isOk) correctCount++;
      });

      const isAllCorrect = correctCount === s.blanks.length;
      s.verified = isAllCorrect;

      const res = document.getElementById('cloze-eval-result');
      if (isAllCorrect) {
        res.innerHTML = `<div style="background:rgba(22,163,74,0.15); border:1px solid #16a34a; border-radius:8px; padding:12px; text-align:center; color:#16a34a; font-weight:bold; margin-bottom:15px;">
          🎉 Ottimo lavoro! Tutte le parole inserite sono corrette. Clicca su "Concludi Impresa" in basso per incassare i premi.
        </div>`;
      } else {
        res.innerHTML = `<div style="background:rgba(239,68,68,0.1); border:1px solid #ef4444; border-radius:8px; padding:12px; text-align:center; color:#ef4444; font-weight:bold; margin-bottom:15px;">
          ❌ Alcune risposte non sono corrette (${correctCount}/${s.blanks.length}). Controlla i campi in rosso e riprova.
        </div>`;
      }

      const submitBtn = document.getElementById('btn-submit-quiz-answers');
      if (submitBtn) {
        submitBtn.disabled = !isAllCorrect;
        submitBtn.style.opacity = isAllCorrect ? '1' : '0.5';
      }
    },

    renderMissionCantamiODiva: function(missionId) {
      const listContainer = document.getElementById('quiz-questions-list');
      const promptText = window.currentMissionGameState.prompt;

      listContainer.innerHTML = `
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; padding: 18px; margin-bottom: 20px;">
          <h4 style="color: var(--gold); font-family: var(--font-heading); margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-microphone-lines" style="color:var(--gold);"></i> Cantami o Diva: Spiegazione Orale
          </h4>
          <div style="background: rgba(120,53,15,0.1); border:1px solid rgba(212,175,55,0.25); border-radius:8px; padding:16px; margin-bottom:20px;">
            <strong style="color:var(--gold); font-size:0.9rem; display:block; margin-bottom:6px;">TRACCIA DA SPIEGARE:</strong>
            <span style="font-size:1.05rem; color:var(--text-light); line-height:1.5; font-style:italic;">"${promptText}"</span>
          </div>
          
          <div style="background: rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.05); border-radius:8px; padding:20px; text-align:center; min-height:150px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
            <div id="diva-timer-display" style="font-size:3rem; font-weight:bold; color:var(--gold); font-family:monospace; line-height:1; display:none; margin-bottom:10px;">10.0s</div>
            <div id="diva-mic-icon" style="font-size:2.5rem; color:var(--text-muted); margin-bottom:15px;">
              <i class="fa-solid fa-microphone"></i>
            </div>
            <p id="diva-instructions" style="color:var(--text-muted); font-size:0.88rem; max-width:400px; margin-bottom:15px;">
              Premi il tasto in basso per avviare la registrazione. Avrai esattamente 10 secondi per formulare la tua spiegazione ad alta voce.
            </p>
            <div id="diva-visualizer" style="display:none; width:80%; height:30px; margin-bottom:15px; align-items:center; justify-content:center; gap:3px;">
              <span class="vis-bar"></span><span class="vis-bar"></span><span class="vis-bar"></span><span class="vis-bar"></span>
              <span class="vis-bar"></span><span class="vis-bar"></span><span class="vis-bar"></span><span class="vis-bar"></span>
            </div>
            <button id="btn-diva-start" class="btn" style="padding:10px 20px; font-size:0.9rem; font-weight:bold;" onclick="EroiApp.divaStartRecording('${missionId}')">
              <i class="fa-solid fa-circle" style="color:#ef4444; margin-right:6px;"></i> Avvia Registrazione (10s)
            </button>
            <button id="btn-diva-stop" class="btn btn-danger" style="display:none; padding:10px 20px; font-size:0.9rem; font-weight:bold;" onclick="EroiApp.divaStopRecording()">
              <i class="fa-solid fa-square" style="margin-right:6px;"></i> Termina Ora
            </button>
          </div>
        </div>
      `;

      const submitBtn = document.getElementById('btn-submit-quiz-answers');
      if (submitBtn) {
        submitBtn.disabled = !window.currentMissionGameState.recorded;
        submitBtn.style.opacity = window.currentMissionGameState.recorded ? '1' : '0.5';
      }
    },

    divaStartRecording: function(missionId) {
      const timerDisplay = document.getElementById('diva-timer-display');
      const micIcon = document.getElementById('diva-mic-icon');
      const instructions = document.getElementById('diva-instructions');
      const vis = document.getElementById('diva-visualizer');
      const btnStart = document.getElementById('btn-diva-start');
      const btnStop = document.getElementById('btn-diva-stop');

      if (!timerDisplay || !micIcon || !instructions || !vis || !btnStart || !btnStop) return;

      EroiAudio.playClick();

      btnStart.style.display = 'none';
      btnStop.style.display = 'block';
      timerDisplay.style.display = 'block';
      vis.style.display = 'flex';
      micIcon.style.color = '#ef4444';
      micIcon.innerHTML = '<i class="fa-solid fa-microphone-lines animate-pulse" style="animation: pulse 1s infinite;"></i>';
      instructions.innerHTML = '🔴 <strong>Registrazione attiva:</strong> spiega il concetto ad alta voce ora!';

      window.currentMissionGameState.timeLeft = 10.0;
      window.currentMissionGameState.timerInterval = setInterval(() => {
        window.currentMissionGameState.timeLeft -= 0.1;
        if (window.currentMissionGameState.timeLeft <= 0) {
          window.currentMissionGameState.timeLeft = 0;
          EroiApp.divaStopRecording();
        }
        timerDisplay.textContent = window.currentMissionGameState.timeLeft.toFixed(1) + 's';
      }, 100);
    },

    divaStopRecording: function() {
      clearInterval(window.currentMissionGameState.timerInterval);
      const timerDisplay = document.getElementById('diva-timer-display');
      const micIcon = document.getElementById('diva-mic-icon');
      const instructions = document.getElementById('diva-instructions');
      const vis = document.getElementById('diva-visualizer');
      const btnStop = document.getElementById('btn-diva-stop');

      if (!instructions || !btnStop) return;

      btnStop.style.display = 'none';
      if (timerDisplay) timerDisplay.style.display = 'none';
      if (vis) vis.style.display = 'none';
      
      if (micIcon) {
        micIcon.style.color = '#16a34a';
        micIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      }

      instructions.innerHTML = `
        <div style="background:rgba(22,163,74,0.12); border:1px solid #16a34a; border-radius:8px; padding:12px; margin-top:10px; width:100%;">
          <span style="color:#16a34a; font-weight:bold; display:block; margin-bottom:8px;">✅ Spiegazione Registrata Correttamente!</span>
          <button class="btn btn-secondary" style="padding:5px 12px; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px; margin:auto;" onclick="EroiApp.divaPlayAudio()">
            <i class="fa-solid fa-play"></i> Ascolta la tua registrazione
          </button>
          <span id="diva-audio-playing-indicator" style="display:none; color:var(--gold); font-size:0.8rem; margin-left:10px;"><i class="fa-solid fa-volume-high"></i> Riproduzione...</span>
        </div>
      `;

      window.currentMissionGameState.recorded = true;

      // Enable submit button
      const submitBtn = document.getElementById('btn-submit-quiz-answers');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    },

    divaPlayAudio: function() {
      const indicator = document.getElementById('diva-audio-playing-indicator');
      if (indicator) {
        indicator.style.display = 'inline-block';
        setTimeout(() => {
          indicator.style.display = 'none';
        }, 2000);
      }
    },

    selectQuizOption: function(element, qIndex, optIndex) {
      const parent = element.parentNode;
      parent.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      element.classList.add('selected');
      element.setAttribute('data-selected-idx', optIndex);
    },

    useHintInQuiz: function(email, mission) {
      try {
        window.EroiGame.useConsumable(email, 'item_indizio');
        
        // Ricarica contatore
        const inventory = window.EroiDB.getInventory(email);
        const hints = inventory.find(i => i.itemId === 'item_indizio');
        document.getElementById('hint-qty-label').textContent = hints ? hints.quantity : 0;

        // Rivela un suggerimento: ad esempio evidenzia una risposta sbagliata
        const questionsBoxes = document.querySelectorAll('.quiz-question-box');
        let hintGiven = false;
        
        for (let i = 0; i < questionsBoxes.length; i++) {
          const box = questionsBoxes[i];
          const correct = Number(box.getAttribute('data-correct'));
          const options = box.querySelectorAll('.quiz-option');
          
          for (let o = 0; o < options.length; o++) {
            if (o !== correct && !options[o].style.opacity) {
              options[o].style.opacity = '0.4';
              options[o].style.textDecoration = 'line-through';
              options[o].style.pointerEvents = 'none';
              hintGiven = true;
              break;
            }
          }
          if (hintGiven) break;
        }

        this.showToast("Indizio utilizzato! È stata sbarrata un'opzione errata.", "success");
      } catch (err) {
        this.showToast(err.message, "danger");
      }
    },

    submitQuiz: function(email, missionId) {
      const missions = window.EroiDB.getMissions();
      const m = missions.find(x => x.id === missionId);
      const gameType = m ? (m.gameType || 'quiz') : 'quiz';

      if (gameType !== 'quiz') {
        try {
          const result = window.EroiGame.submitMission(email, missionId, [0]);
          if (result.passed) {
            if (result.levelUp) {
              EroiAudio.playLevelUp();
              this.showToast(`Congratulazioni! Sei salito al livello ${result.newLevel}!`, "level");
            } else {
              EroiAudio.playSuccess();
            }
            this.showToast(`Missione Superata! +${result.xpGained} XP e +${result.dracmeGained} Dracme.`, "success");
            this.navigateTo('view-missions');
          }
        } catch (err) {
          alert("Errore: " + err.message);
        }
        return;
      }

      const qBoxes = document.querySelectorAll('.quiz-question-box');
      const answers = [];
      let allAnswered = true;

      qBoxes.forEach((box, index) => {
        const selected = box.querySelector('.quiz-option.selected');
        if (!selected) {
          allAnswered = false;
        } else {
          answers[index] = Number(selected.getAttribute('data-selected-idx'));
        }
      });

      if (!allAnswered) {
        alert("Per favore, rispondi a tutte le domande prima di concludere la missione.");
        return;
      }

      try {
        const result = window.EroiGame.submitMission(email, missionId, answers);
        
        if (result.passed) {
          if (result.levelUp) {
            EroiAudio.playLevelUp();
            this.showToast(`Congratulazioni! Sei salito al livello ${result.newLevel}!`, "level");
          } else {
            EroiAudio.playSuccess();
          }
          this.showToast(`Missione Superata! +${result.xpGained} XP e +${result.dracmeGained} Dracme.`, "success");
          this.navigateTo('view-missions');
        } else {
          EroiAudio.playFailure();
          this.showToast(`Sfida Fallita (${result.correctCount}/${result.totalCount} esatte). Riprova dopo aver studiato le guide!`, "danger");
          
          const inventory = window.EroiDB.getInventory(email);
          const secondChance = inventory.find(i => i.itemId === 'item_ritentativo');
          
          if (secondChance && secondChance.quantity > 0) {
            if (confirm("Hai fallito la missione, ma possiedi un 'Secondo Tentativo' nell'inventario. Vuoi consumarlo per riprovare subito senza penalità?")) {
              window.EroiGame.useConsumable(email, 'item_ritentativo');
              document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
                opt.style.opacity = '1';
                opt.style.textDecoration = 'none';
                opt.style.pointerEvents = 'auto';
              });
              return;
            }
          }
          
          this.navigateTo('view-missions');
        }
      } catch (err) {
        alert("Errore: " + err.message);
      }
    },

    // --- SHOP ---
    renderShop: function(email) {
      const items = window.EroiDB.getShopItems(email);
      const grid = document.getElementById('shop-items-grid');
      
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      if (!profile) return;

      const dracme = profile.dracme;
      document.getElementById('shop-balance-display').innerHTML = `${dracme} <i class="fa-solid fa-coins"></i>`;
      grid.innerHTML = '';

      const filtered = items.filter(item => {
        if (!item.active) return false;
        if (currentShopFilter === 'all') return true;
        return item.rarity === currentShopFilter;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted); margin-top:20px;"><i>Nessun oggetto disponibile per questa categoria.</i></p>`;
        return;
      }

      filtered.forEach(item => {
        const finalPrice = window.EroiGame.calculateDiscountedPrice(email, item);
        const card = document.createElement('div');
        card.className = `card rarity-${item.rarity.toLowerCase()}`;
        
        // Icone predefinite basate sulla rarità o nome
        let icon = '📦';
        if (item.id.includes('indizio')) icon = '💡';
        else if (item.id.includes('ritentativo')) icon = '🔄';
        else if (item.id.includes('skin')) icon = '✨';
        else if (item.id.includes('mappa_conc')) icon = '🗺️';
        else if (item.id.includes('protezione')) icon = '🛡️';
        else if (item.id.includes('xp')) icon = '🧪';
        else if (item.id.includes('zeus')) icon = '⚡';
        else if (item.id.includes('tridente')) icon = '🔱';
        else if (item.id.includes('excalibur')) icon = '⚔️';

        card.innerHTML = `
          <div>
            <span class="card-rarity-badge">${item.rarity}</span>
            <span class="card-icon">${icon}</span>
            <h4 class="card-title">${item.name}</h4>
            <p class="card-desc">${item.desc}</p>
          </div>
          <div style="margin-top: 15px;">
            <div class="card-meta">
              ${finalPrice < item.price ? `<span style="text-decoration: line-through; color: var(--danger); font-size:0.8rem; margin-right:6px;">${item.price}</span>` : ''}
              <span style="color: var(--gold);">${finalPrice} Dracme</span>
            </div>
            <p style="font-size:0.7rem; color: var(--text-muted); margin-bottom: 8px;">Quantità in stock: ${item.stock}</p>
            <button class="btn" style="width: 100%;" onclick="EroiApp.buyItem('${email}', '${item.id}')">Acquista</button>
          </div>
        `;
        grid.appendChild(card);
      });
    },

    filterShop: function(rarity) {
      currentShopFilter = rarity;
      // Aggiorna stile bottoni filtri shop
      const tabBtns = document.querySelectorAll('#view-shop .tab-btn');
      tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().trim() === rarity.toLowerCase().trim() || (rarity === 'all' && btn.textContent.toLowerCase().trim() === 'tutto')) {
          btn.classList.add('active');
        }
      });
      const user = Auth.getUser();
      this.renderShop(user.email);
    },

    buyItem: function(email, itemId) {
      if (confirm("Vuoi confermare l'acquisto di questo oggetto?")) {
        try {
          const finalPrice = window.EroiGame.purchaseItem(email, itemId);
          this.showToast(`Acquistato con successo per ${finalPrice} Dracme!`, "success");
          this.renderShop(email);
        } catch (err) {
          alert("Errore d'acquisto: " + err.message);
        }
      }
    },

    // --- INVENTORY ---
    switchInventoryTab: function(tab) {
      document.querySelectorAll('#view-inventory .tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      document.getElementById(`inv-tab-${tab}`).classList.add('active');

      document.querySelectorAll('#view-inventory .tab-content').forEach(panel => {
        panel.classList.remove('active');
      });
      document.getElementById(`inv-panel-${tab}`).classList.add('active');
    },

    renderInventory: function(email) {
      const inventory = window.EroiDB.getInventory(email);
      const settings = window.EroiDB.getSettings();
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);

      // 1. Render Consumables
      const consumablesGrid = document.getElementById('inventory-consumables-grid');
      const consumables = inventory.filter(i => i.type === 'consumable');
      
      consumablesGrid.innerHTML = '';
      if (consumables.length === 0) {
        consumablesGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color: var(--text-muted); margin-top:20px;"><i>Nessun consumabile in inventario.</i></p>`;
      } else {
        consumables.forEach(item => {
          const card = document.createElement('div');
          card.className = `card rarity-${item.rarity.toLowerCase()}`;
          card.innerHTML = `
            <div>
              <span class="card-rarity-badge">${item.rarity}</span>
              <h4 class="card-title" style="margin-top: 10px;">${item.name}</h4>
              <p class="card-desc">Quantità posseduta: <strong>${item.quantity}</strong></p>
              <p style="font-size: 0.7rem; color: var(--text-muted);">Acquistato il: ${new Date(item.purchaseDate).toLocaleDateString()}</p>
            </div>
            <div style="margin-top: 15px;">
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px;">Usi effettuati: ${item.usedCount}</p>
              <button class="btn btn-secondary" style="width: 100%;" disabled>Si attiva durante i quiz</button>
            </div>
          `;
          consumablesGrid.appendChild(card);
        });
      }

      // 2. Render Artifacts
      const artifactsGrid = document.getElementById('inventory-artifacts-grid');
      const allArtifacts = window.EroiDB.getArtifacts();
      
      artifactsGrid.innerHTML = '';
      
      // Gli artefatti disponibili per l'equipaggiamento includono quelli nell'inventario o i predefiniti
      // Raccogliamo tutti gli ID posseduti
      const ownedArtifactIds = inventory.filter(i => i.type === 'permanent' && allArtifacts[i.itemId.replace('item_', '')])
                                       .map(i => i.itemId.replace('item_', ''));
      // Aggiungiamo quelli predefiniti sui profili mock per dimostrazione
      if (profile.activeArtifacts) {
        profile.activeArtifacts.forEach(id => {
          if (!ownedArtifactIds.includes(id)) ownedArtifactIds.push(id);
        });
      }

      if (ownedArtifactIds.length === 0) {
        artifactsGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color: var(--text-muted); margin-top:20px;"><i>Nessun artefatto posseduto. Acquistali nello Shop.</i></p>`;
      } else {
        ownedArtifactIds.forEach(artId => {
          const a = allArtifacts[artId];
          if (!a) return;

          const isEquipped = profile.activeArtifacts && profile.activeArtifacts.includes(artId);
          const card = document.createElement('div');
          card.className = `card rarity-${a.rarity.toLowerCase()}`;
          card.innerHTML = `
            <div>
              <span class="card-rarity-badge">${a.rarity}</span>
              <span class="card-icon">${a.image}</span>
              <h4 class="card-title">${a.name}</h4>
              <p class="card-desc">${a.desc}</p>
              <p style="font-size: 0.85rem; color: var(--gold); font-weight: bold; margin-bottom: 10px;">Bonus: ${a.bonus}</p>
            </div>
            <div>
              <button class="btn ${isEquipped ? 'btn-danger' : ''}" style="width: 100%;" onclick="EroiApp.toggleArtifact('${email}', '${artId}')">
                ${isEquipped ? '<i class="fa-solid fa-xmark"></i> Disattiva' : '<i class="fa-solid fa-check"></i> Equipaggia'}
              </button>
            </div>
          `;
          artifactsGrid.appendChild(card);
        });
      }

      // 3. Render Helpers (Aiutanti)
      const helpersGrid = document.getElementById('inventory-helpers-grid');
      const warningHelper = document.getElementById('second-term-warning-helper');
      const allHelpers = window.EroiDB.getHelpers();
      
      helpersGrid.innerHTML = '';
      if (!window.EroiApp.isSecondTermActiveForUser()) {
        warningHelper.style.display = 'block';
        helpersGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color: var(--text-muted); margin-top:20px;"><i>Aiutanti bloccati fino al 2° Quadrimestre.</i></p>`;
      } else {
        warningHelper.style.display = 'none';

        // Gli aiutanti posseduti includono quelli presenti in inventario con prefisso helper_ o sbloccati
        const ownedHelperIds = inventory.filter(i => i.itemId.startsWith('helper_') || i.itemId.startsWith('item_aiutante_'))
                                       .map(i => i.itemId.replace('helper_', '').replace('item_aiutante_', ''));
        
        // Aggiungi quello eventualmente attivo sul profilo
        if (profile.activeHelper && !ownedHelperIds.includes(profile.activeHelper)) {
          ownedHelperIds.push(profile.activeHelper);
        }

        if (ownedHelperIds.length === 0) {
          helpersGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color: var(--text-muted); margin-top:20px;"><i>Nessun aiutante sbloccato. Acquistali nello Shop (es. Benedizione di Zeus).</i></p>`;
        } else {
          ownedHelperIds.forEach(hId => {
            const h = allHelpers[hId];
            if (!h) return;

            const isActive = profile.activeHelper === hId;
            const card = document.createElement('div');
            card.className = `card rarity-leggendario`; // Tutti gli aiutanti sono di livello supremo
            card.innerHTML = `
              <div>
                <span class="card-rarity-badge">${h.category}</span>
                <span class="card-icon">👑</span>
                <h4 class="card-title">${h.name}</h4>
                <p class="card-desc">${h.desc}</p>
                <div style="text-align: left; font-size: 0.75rem; margin: 10px 0; border-top:1px solid rgba(255,255,255,0.05); padding-top: 8px;">
                  <p>🟢 <strong>Passivo</strong>: ${h.bonusPassive || 'Nessuno'}</p>
                  <p>🔵 <strong>Potere</strong>: ${h.potereSpeciale || 'Nessuno'}</p>
                  <p>🛡️ <strong>Immunità</strong>: ${h.immunita || 'Nessuna'}</p>
                </div>
              </div>
              <div>
                <button class="btn ${isActive ? 'btn-danger' : ''}" style="width: 100%;" onclick="EroiApp.toggleHelper('${email}', '${hId}', ${isActive})">
                  ${isActive ? '<i class="fa-solid fa-xmark"></i> Disattiva' : '<i class="fa-solid fa-check"></i> Equipaggia come Aiutante'}
                </button>
              </div>
            `;
            helpersGrid.appendChild(card);
          });
        }
      }
    },

    toggleArtifact: function(email, artId) {
      try {
        const result = window.EroiGame.toggleArtifact(email, artId);
        if (result.action === 'added') {
          this.showToast("Artefatto attivato!", "success");
        } else {
          this.showToast("Artefatto rimosso.", "success");
        }
        this.renderInventory(email);
      } catch (err) {
        alert(err.message);
      }
    },

    toggleHelper: function(email, helperId, isActive) {
      try {
        if (isActive) {
          window.EroiGame.activateHelper(email, null);
          this.showToast("Aiutante disattivato.", "success");
        } else {
          window.EroiGame.activateHelper(email, helperId);
          this.showToast("Aiutante equipaggiato con successo!", "success");
        }
        this.renderInventory(email);
      } catch (err) {
        alert(err.message);
      }
    },

    // --- GUIDE DIDATTICHE STUDY PLAN ---
    renderGuides: function() {
      const viewGuides = document.getElementById('view-guides');
      if (viewGuides) {
        viewGuides.classList.remove('detail-active');
      }
      const guides = window.EroiDB.getStudyGuides();
      const sidebar = document.getElementById('guides-sidebar-list');
      
      const categories = [
        "L'inizio del viaggio",
        "Luoghi e Miti di Fondazione",
        "Schede Autore",
        "Le Opere",
        "Divinità",
        "Schede Personaggio (Mitologia)",
        "Schede Personaggio (Iliade)",
        "Schede Personaggio (Odissea)",
        "Schede Personaggio (Eneide)",
        "Schede Personaggio (Ciclo Carolingio)",
        "Schede Personaggio (Ciclo Bretone)",
        "Schede Personaggio (Ciclo dei Nibelunghi)",
        "Schede Tematiche",
        "La Rimediazione",
        "I Videogiochi"
      ];
      let html = '';

      categories.forEach(cat => {
        const catGuides = guides.filter(g => g.category === cat);
        if (catGuides.length === 0) return;

        // Pulisce il nome della categoria per visualizzarlo in modo più pulito ed elegante
        let displayTitle = cat;
        if (cat === "Schede Autore") {
          displayTitle = "Autori";
        } else if (cat === "Schede Tematiche") {
          displayTitle = "Tematiche";
        } else if (cat.startsWith("Schede Personaggio (") && cat.endsWith(")")) {
          displayTitle = cat.substring("Schede Personaggio (".length, cat.length - 1);
        }

        html += `<div class="guide-category-title">${displayTitle}</div>`;
        catGuides.forEach(g => {
          html += `<div class="guide-list-item" onclick="EroiApp.readGuide('${g.id}', this)">${g.title}</div>`;
        });
      });

      sidebar.innerHTML = html;
    },

    readGuide: function(guideId, element) {
      // Evidenzia elemento attivo
      document.querySelectorAll('.guide-list-item').forEach(item => {
        item.classList.remove('active');
      });
      if (element) element.classList.add('active');

      const guides = window.EroiDB.getStudyGuides();
      const g = guides.find(x => x.id === guideId);
      if (!g) return;

      document.getElementById('guide-placeholder-text').style.display = 'none';
      const box = document.getElementById('guide-content-box');
      box.style.display = 'block';

      // Pulisce il nome della categoria per il badge
      let displayCategory = g.category;
      if (g.category === "Schede Autore") {
        displayCategory = "Autori";
      } else if (g.category === "Schede Tematiche") {
        displayCategory = "Tematiche";
      } else if (g.category.startsWith("Schede Personaggio (") && g.category.endsWith(")")) {
        displayCategory = g.category.substring("Schede Personaggio (".length, g.category.length - 1);
      }
      document.getElementById('guide-display-category').textContent = displayCategory;
      document.getElementById('guide-display-title').textContent = g.title;
      
      const imgEl = document.getElementById('guide-display-image');
      if (imgEl) {
        imgEl.src = g.image ? g.image + '?v=' + Date.now() : "assets/images/pergamena_crest.png";
        imgEl.alt = g.title;
        imgEl.style.filter = g.styleFilter || 'none';
      }

      const layoutEl = document.querySelector('.guide-game-portrait-layout');
      if (layoutEl) {
        if (g.horizontal) {
          layoutEl.classList.add('horizontal-layout');
        } else {
          layoutEl.classList.remove('horizontal-layout');
        }
      }

      const portraitContainer = document.getElementById('guide-portrait-container-3d');
      if (portraitContainer) {
        if (g.category === "L'inizio del viaggio") {
          portraitContainer.style.display = 'none';
        } else {
          portraitContainer.style.display = 'block';
        }
      }
      
      // Inizializza particelle ed effetto 3D
      this.createParticles('portrait-particles');
      this.bind3DTilt('guide-portrait-container-3d', '.guide-display-image', '.portrait-particles-container');

      // Ripulisce i prefissi Descrizione: o Biografia: all'inizio del testo
      let content = g.content || "";
      if (content.startsWith("Descrizione:")) {
        content = content.substring("Descrizione:".length).trim();
      } else if (content.startsWith("Biografia:")) {
        content = content.substring("Biografia:".length).trim();
      }

      // Evidenziazione parole chiave
      if (g.category !== "L'inizio del viaggio") {
        const blueTerms = [
          "OMERO", "VIRGILIO", "TUROLDO", "CHRÉTIEN DE TROYES", "PROMETEO", "ERACLE", "ERCOLE", 
          "TESEO", "MINOTAURO", "PERSEO", "MEDUSA", "ACHILLE", "ETTORE", "PATROCLO", "PRIAMO", 
          "AGAMENNONE", "PARIDE", "ELENA", "DIOMEDE", "ULISSE", "PENELOPE", "TELEMACO", "POLIFEMO", 
          "CIRCE", "ENEA", "DIDONE", "TURNO", "CAMILLA", "ORLANDO", "RINALDO", "ASTOLFO", 
          "LANCILLOTTO", "GALAHAD", "PARSIFAL", "CARLO MAGNO", "GINEVRA", "MERLINO", "DANTE ALIGHIERI",
          "MENELAO", "AIACE", "NESTORE", "ECUBA", "ANDROMACA", "NAUSICAA", "CALIPSO", "SCILLA", "CARIDDI",
          "ANCHISE", "ASCANIO", "LAVINIA", "LATINO", "OLIVIERO", "TURPINO", "GANO", "GANO DI MAGANZA",
          "ANGELICA", "BRADAMANTE", "RUGGIERO", "MORDRED", "ZEUS", "GIOVE", "ERA", "GIUNONE", "ATENA",
          "MINERVA", "POSEIDONE", "NETTUNO", "APOLLO", "ARTEMIDE", "DIANA", "ARES", "MARTE", "AFRODITE",
          "VENERE", "ERMES", "MERCURIO", "EFESTO", "VULCANO", "ADE", "PLUTONE", "DEMETRA", "CERERE",
          "ESTIA", "VESTA", "DIONISO", "BACCO", "MECENATE", "AUGUSTO",
          "CARLO", "DANTE", "ARTÙ", "SIGFRIDO", "BRUNILDE", "CRIMILDE", "HAGEN", "GUNTHER", "FAFNIR", 
          "NIBELUNGHI", "VALCHIRIE", "LOKI", "ODINO", "THOR", "FRIGG", "FREYA", "TYR", "ETZEL", 
          "GERNOT", "GISELHER", "RÜDIGER", "ALBERICO"
        ];
        const greenTerms = [
          "ILIADE", "ODISSEA", "ENEIDE", "TAVOLA ROTONDA", "SACRO GRAAL", "DURENDAL", "OLIFANTE", "EXCALIBUR", "FIORENTINO",
          "BUCOLICHE", "GEORGICHE", "CHANSON DE ROLAND"
        ];
        const orangeTerms = [
          "TROIA", "ROMA", "CARTAGINE", "ITACA", "CAMELOT", "AQUISGRANA", "RONCISVALLE", "VOLGARE", "LETTERATURA", "LAZIO", "CATAI",
          "LABIRINTO", "PROCI", "ACHEI", "TROIANI",
          "SPARTA", "URUK", "TEBE", "MICENE", "WORMS", "ATENE", "CRETA", "ILIO", "ILION"
        ];

        blueTerms.forEach(term => {
          const regex = new RegExp(`\\b${term}\\b`, 'gi');
          content = content.replace(regex, match => `<span style="color: #3b82f6; font-weight: bold;">${match}</span>`);
        });
        greenTerms.forEach(term => {
          const regex = new RegExp(`\\b${term}\\b`, 'gi');
          content = content.replace(regex, match => `<span style="color: #16a34a; font-weight: bold;">${match}</span>`);
        });
        orangeTerms.forEach(term => {
          const regex = new RegExp(`\\b${term}\\b`, 'gi');
          content = content.replace(regex, match => `<span style="color: var(--gold); font-weight: bold;">${match}</span>`);
        });
        content = content.replace(/ARTÙ/gi, match => `<span style="color: #2563eb; font-weight: bold;">${match}</span>`);
      }

      if (content.trim().startsWith("<")) {
        document.getElementById('guide-display-body').innerHTML = content;
      } else {
        document.getElementById('guide-display-body').innerHTML = content.replace(/\n/g, '<br>');
      }

      const viewGuides = document.getElementById('view-guides');
      if (viewGuides) {
        viewGuides.classList.add('detail-active');
      }

      // Gestione Note al Testo (docente) e Appunti Personali (studente)
      const user = Auth.getUser();

      // Se lo schermo è ridotto (es. <= 1024px), scrolla fino alla scheda pergamena
      if (window.innerWidth <= 1024) {
        const target = document.getElementById('guide-parchment-sheet');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },


    backToGuidesList: function() {
      const viewGuides = document.getElementById('view-guides');
      if (viewGuides) {
        viewGuides.classList.remove('detail-active');
      }
      document.querySelectorAll('.guide-list-item').forEach(item => {
        item.classList.remove('active');
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    backToDiarioNodes: function() {
      const viewDiario = document.getElementById('view-diario');
      if (viewDiario) viewDiario.classList.remove('detail-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // --- TEACHER DASHBOARD ---
    switchTeacherTab: function(tab) {
      if (tab === 'studenti') {
        tab = 'panoramica';
      }
      activeTeacherTab = tab;
      document.querySelectorAll('#view-teacher-dashboard .tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      // Trova il bottone specifico
      const activeBtn = document.querySelector(`#view-teacher-dashboard .tab-btn[onclick*="'${tab}'"]`);
      if (activeBtn) activeBtn.classList.add('active');

      document.querySelectorAll('#view-teacher-dashboard .tab-content').forEach(panel => {
        panel.classList.remove('active');
      });
      const tabEl = document.getElementById(`t-tab-${tab}`);
      if (tabEl) tabEl.classList.add('active');

      if (tab === 'nodi') {
        const select = document.getElementById('teacher-nodi-class-select');
        if (select) {
            const allUsers = window.EroiDB.getAllUsers();
            const classes = [...new Set(allUsers.filter(u => u.role === 'studente' && u.classId).map(u => u.classId))];
            select.innerHTML = '<option value="">Seleziona una classe</option>' + classes.map(c => `<option value="${c}">Classe ${c}</option>`).join('');
        }
        this.renderTeacherMapNodes();
      }

      if (tab === 'diario') {
        this.renderTeacherDiaries();
      }
    },

    // --- ADMIN DASHBOARD ---
    switchAdminTab: function(tab) {
      document.querySelectorAll('#view-admin-dashboard .tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      const activeBtn = document.querySelector(`#view-admin-dashboard .tab-btn[onclick*="'${tab}'"]`);
      if (activeBtn) activeBtn.classList.add('active');

      document.querySelectorAll('#view-admin-dashboard .tab-content').forEach(panel => {
        panel.classList.remove('active');
      });
      const tabEl = document.getElementById(`a-tab-${tab}`);
      if (tabEl) tabEl.classList.add('active');
    },

    onTeacherClassSelectSettings: function() {
        const classId = document.getElementById('teacher-settings-class-select').value;
        const classes = window.EroiDB.getClasses();
        if (classId && classes[classId]) {
            document.getElementById('teacher-setting-secondterm').checked = !!classes[classId].secondTermActive;
        } else {
            document.getElementById('teacher-setting-secondterm').checked = false;
        }
    },

    selectStatsCategory: function(category) {
      // Rimuovi active da tutte le card
      ['teachers', 'students', 'classes', 'schools', 'forestieri'].forEach(cat => {
        const card = document.getElementById(`card-stats-${cat}`);
        if (card) card.classList.remove('active');
      });

      // Attiva la card selezionata
      const activeCard = document.getElementById(`card-stats-${category}`);
      if (activeCard) activeCard.classList.add('active');

      // Nascondi tutti i pannelli
      document.querySelectorAll('.panoramica-sub-panel').forEach(p => {
        p.style.display = 'none';
      });

      // Forestieri ricicla il pannello studenti con filtro dedicato
      const panelId = category === 'forestieri' ? 'panel-stats-students' : `panel-stats-${category}`;
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.style.display = 'block';
        panel.style.animation = 'none';
        panel.offsetHeight; // reflow
        panel.style.animation = 'fadeInUp 0.3s ease forwards';
      }

      // Aggiorna titolo panel studenti per Forestieri
      const titleEl = document.getElementById('students-panel-title-text');
      if (titleEl) {
        titleEl.textContent = category === 'forestieri' ? 'Forestieri (Senza Classe)' : 'Studenti Iscritti';
      }

      // Renderizza dati specifici del pannello
      if (category === 'students' || category === 'forestieri') {
        const filterEl = document.getElementById('filter-class-teacher');
        if (filterEl) {
          filterEl.value = category === 'forestieri' ? 'forestieri' : 'all';
        }
        this.renderTeacherStudents();
      } else if (category === 'classes') {
        this.renderTeacherClasses();
        this.populateClassSelects();
      } else if (category === 'teachers') {
        this.renderTeacherDocenti();
      } else if (category === 'schools') {
        this.renderTeacherSchoolsList();
      }
    },

    renderTeacherDocenti: function() {
      const allUsers = window.EroiDB.getAllUsers();
      const docenti = allUsers.filter(u => u.role === 'teacher' || u.role === 'admin');
      const tbody = document.querySelector('#teacher-docenti-table tbody');
      if (!tbody) return;
      tbody.innerHTML = '';

      if (docenti.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;"><i>Nessun docente registrato.</i></td></tr>`;
        return;
      }

      docenti.forEach(u => {
        const tr = document.createElement('tr');
        const roleLabel = u.role === 'admin'
          ? `<span style="background: rgba(212,175,55,0.2); color: var(--gold); padding: 2px 8px; border-radius: 4px; font-size: 0.78rem; font-weight: 600;">Admin</span>`
          : `<span style="background: rgba(100,180,255,0.15); color: var(--blue-light, #8ab4f8); padding: 2px 8px; border-radius: 4px; font-size: 0.78rem;">Docente</span>`;
        tr.innerHTML = `
          <td><strong>${u.name || u.email.split('@')[0]}</strong></td>
          <td><span style="color: var(--text-muted); font-size: 0.85rem;">${u.email}</span></td>
          <td>${roleLabel}</td>
        `;
        tbody.appendChild(tr);
      });
    },

    renderTeacherSchoolsList: function() {
      const classes = window.EroiDB.getClasses();
      const tbody = document.querySelector('#teacher-schools-table tbody');
      if (!tbody) return;
      tbody.innerHTML = '';

      // Raggruppa per scuola
      const schoolMap = {};
      Object.values(classes).forEach(c => {
        if (!c.school) return;
        if (!schoolMap[c.school]) {
          schoolMap[c.school] = { city: c.city || '—', classes: [] };
        }
        schoolMap[c.school].classes.push(c.name || c.id);
      });

      const schools = Object.keys(schoolMap);
      if (schools.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;"><i>Nessuna scuola registrata. Aggiungi una classe con un istituto per iniziare.</i></td></tr>`;
        return;
      }

      schools.forEach(school => {
        const { city, classes: classList } = schoolMap[school];
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${school}</strong></td>
          <td>${city}</td>
          <td>${classList.map(cn => `<span style="background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; margin-right: 4px;">${cn}</span>`).join('')}</td>
        `;
        tbody.appendChild(tr);
      });
    },

    scrollToSection: function(sectionId, filterValue) {
      // Forza l'attivazione della tab panoramica se siamo altrove
      this.switchTeacherTab('panoramica');

      // Determina la categoria in base all'ID sezione
      if (sectionId === 'teacher-students-section' || sectionId === 'panel-stats-students') {
        const cat = (filterValue === 'forestieri') ? 'forestieri' : 'students';
        this.selectStatsCategory(cat);
        // Scrolla alla sezione
        setTimeout(() => {
          const el = document.getElementById('panel-stats-students');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
        return;
      }

      const el = document.getElementById(sectionId);
      if (el) {
        // Scrolla morbido al contenitore
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Applica effetto bagliore dorato temporaneo
        el.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
        el.style.borderColor = 'var(--gold)';
        el.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.45)';

        setTimeout(() => {
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }, 1500);

        // Se specificato, applica il filtro classi della tabella studenti
        if (filterValue !== undefined && filterValue !== null) {
          const classFilter = document.getElementById('filter-class-teacher');
          if (classFilter) {
            classFilter.value = filterValue;
            this.renderTeacherStudents();
          }
        }
      }
    },

    renderTeacherDashboard: function() {
      this.renderTeacherStats();
      this.populateClassSelects();
      this.renderTeacherMissions();
      this.renderTeacherShop();
      this.renderTeacherHelpersAndArtifacts();
      this.renderTeacherGuides();
      this.renderTeacherLogs();
      this.renderTeacherTournaments();
      this.renderTeacherDiaries();
      // Attiva pannello studenti per default (come Palestra di Riflessione)
      this.selectStatsCategory('students');
    },

    renderTeacherStats: function() {
      const allUsers = window.EroiDB.getAllUsers();
      const user = Auth.getUser();
      const isAdmin = user && user.role === 'admin';
      
      const myClasses = Object.values(window.EroiDB.getClasses()).filter(c => {
         if (isAdmin) return true;
         return c.teacher === user.email || (c.collaborators && c.collaborators.includes(user.email));
      });
      const myClassIds = myClasses.map(c => c.id);

      const students = allUsers.filter(u => u.role === 'student' && (isAdmin || myClassIds.includes(u.classId)));
      const teachers = allUsers.filter(u => u.role === 'teacher' || u.role === 'admin');
      const forestieri = allUsers.filter(u => u.role === 'amico' || (u.role === 'student' && !u.classId));
      
      const schools = new Set(myClasses.map(c => c.school).filter(Boolean));

      document.getElementById('teacher-stats-teachers').textContent = teachers.length;
      document.getElementById('teacher-stats-students').textContent = students.length;
      document.getElementById('teacher-stats-classes').textContent = myClasses.length;
      document.getElementById('teacher-stats-schools').textContent = schools.size;
      document.getElementById('teacher-stats-forestieri').textContent = forestieri.length;
    },

    populateClassSelects: function() {
      const classes = window.EroiDB.getClasses();
      const studentClassSelect = document.getElementById('new-student-class');
      const filterClassSelect = document.getElementById('filter-class-teacher');
      const settingsClassSelect = document.getElementById('teacher-settings-class-select');

      const user = Auth.getUser();
      const filtered = Object.values(classes).filter(c => {
        if (user.role === 'admin') return true;
        return c.teacher === user.email || (c.collaborators && c.collaborators.includes(user.email));
      });

      const optionsHtml = filtered.map(c => `
        <option value="${c.id}">${c.name} (${c.id})</option>
      `).join('');

      if (studentClassSelect) studentClassSelect.innerHTML = optionsHtml;
      if (filterClassSelect) filterClassSelect.innerHTML = `<option value="all">Tutte le Classi</option>` +
                                     `<option value="forestieri">Forestieri (Senza classe)</option>` +
                                     optionsHtml;
      if (settingsClassSelect) {
          settingsClassSelect.innerHTML = optionsHtml;
          this.onTeacherClassSelectSettings();
      }
    },

    renderTeacherClasses: function() {
      const classes = window.EroiDB.getClasses();
      const tbody = document.querySelector('#teacher-classes-table tbody');
      tbody.innerHTML = '';

      const user = Auth.getUser();
      const filtered = Object.values(classes).filter(c => {
        if (user.role === 'admin') return true;
        return c.teacher === user.email || (c.collaborators && c.collaborators.includes(user.email));
      });

      filtered.forEach(c => {
        const isOwner = c.teacher === user.email || user.role === 'admin';
        const teacherNames = [c.teacher.split('@')[0]];
        if (c.collaborators) {
          c.collaborators.forEach(email => {
            teacherNames.push(email.split('@')[0]);
          });
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${c.id}</strong></td>
          <td>${c.name}</td>
          <td>
            <span class="badge" style="font-family: monospace; font-size: 0.85rem; padding: 4px 8px; border: 1.5px solid var(--gold); border-radius: 6px; color: var(--gold); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; background: rgba(212,175,55,0.05);" onclick="navigator.clipboard.writeText('${c.code}'); alert('Codice classe copiato: ${c.code}')" title="Clicca per copiare">
              ${c.code} <i class="fa-solid fa-copy" style="font-size: 0.75rem;"></i>
            </span>
          </td>
          <td><span style="font-size: 0.8rem; color: var(--text-muted);">${teacherNames.join(', ')}</span></td>
          <td>
            ${isOwner ? `
              <button class="btn btn-danger" style="padding: 4px 8px; font-size:0.75rem;" onclick="EroiApp.deleteClass('${c.id}')">
                <i class="fa-solid fa-trash"></i> Elimina
              </button>
            ` : `
              <button class="btn btn-secondary" style="padding: 4px 8px; font-size:0.75rem;" onclick="EroiApp.leaveClassAsCollaborator('${c.id}')">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Abbandona
              </button>
            `}
          </td>
        `;
        tbody.appendChild(tr);
      });
    },

    deleteClass: function(classId) {
      if (confirm(`Eliminare la classe ${classId}? Gli studenti associati non verranno eliminati, ma rimarranno senza classe.`)) {
        window.EroiDB.deleteClass(classId);
        this.showToast("Classe eliminata.", "success");
        this.renderTeacherClasses();
        this.populateClassSelects();
        this.renderTeacherStudents();
      }
    },

    renderTeacherStudents: function() {
      const students = window.EroiDB.getAllStudents();
      const search = document.getElementById('search-student-teacher').value.toLowerCase();
      const filterClass = document.getElementById('filter-class-teacher').value;
      const tbody = document.querySelector('#teacher-students-table tbody');
      
      tbody.innerHTML = '';

      const user = Auth.getUser();
      const classes = window.EroiDB.getClasses();
      const myClassIds = Object.values(classes)
        .filter(c => user.role === 'admin' || c.teacher === user.email || (c.collaborators && c.collaborators.includes(user.email)))
        .map(c => c.id);

      const filtered = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search) || s.email.toLowerCase().includes(search);
        
        const u = window.EroiDB.getUser(s.email);
        let matchesClass = false;
        if (filterClass === 'all') {
          matchesClass = (user.role === 'admin' || (u && u.classId && myClassIds.includes(u.classId)));
        } else if (filterClass === 'forestieri') {
          matchesClass = (!u || !u.classId || u.role === 'amico');
        } else {
          matchesClass = (u && u.classId === filterClass);
        }

        return matchesSearch && matchesClass;
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nessuno studente trovato.</td></tr>`;
        return;
      }

      filtered.forEach(s => {
        const u = window.EroiDB.getUser(s.email);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:1.4rem;">${this.getAvatarEmoji(s.avatarClass)}</span>
              <div>
                <strong>${s.name}</strong><br>
                <span style="font-size:0.75rem; color:var(--text-muted);">${s.email}</span>
              </div>
            </div>
          </td>
          <td>${u ? u.classId : 'Senza classe'}</td>
          <td><span style="color:var(--gold); font-weight:bold;">${s.level}</span></td>
          <td>${s.xp} XP / ${s.dracme} Dracme</td>
          <td>
            <div style="display:flex; gap:6px;">
              <button class="btn" style="padding:4px 8px; font-size:0.72rem; border: 1px solid var(--gold); color: var(--gold); background: transparent;" onclick="EroiApp.openStudentPreviewAll('${s.email}')" title="Preview Didattica">
                <i class="fa-solid fa-eye"></i> Osserva
              </button>
              <button class="btn btn-secondary" style="padding:4px 8px; font-size:0.72rem;" onclick="EroiApp.openAwardModal('${s.email}', '${s.name.replace(/'/g, "\\'")}')">
                🏆 Premia
              </button>
              <button class="btn btn-secondary" style="padding:4px 8px; font-size:0.72rem;" onclick="EroiApp.openSpostaModal('${s.email}', '${s.name.replace(/'/g, "\\'")}', '${u ? u.classId : ''}')">
                📁 Trasferisci
              </button>
              <button class="btn btn-danger" style="padding:4px 8px; font-size:0.72rem;" onclick="EroiApp.deleteStudent('${s.email}', '${s.name.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    },

    openAwardModal: function(email, name) {
      document.getElementById('award-student-email').value = email;
      document.getElementById('award-student-name').textContent = `Studente: ${name} (${email})`;
      document.getElementById('award-xp-qty').value = "0";
      document.getElementById('award-dracme-qty').value = "0";

      // Carica gli artefatti sbloccabili nella select
      const select = document.getElementById('award-artifact-select');
      const artifacts = window.EroiDB.getArtifacts();
      select.innerHTML = '<option value="">-- Nessun Artefatto --</option>' + Object.values(artifacts).map(a => `
        <option value="${a.id}">${a.name} (${a.rarity})</option>
      `).join('');

      document.getElementById('modal-teacher-award').classList.add('active');
    },

    closeAwardModal: function() {
      document.getElementById('modal-teacher-award').classList.remove('active');
    },

    submitTeacherAward: function() {
      const email = document.getElementById('award-student-email').value;
      const xp = Number(document.getElementById('award-xp-qty').value);
      const dracme = Number(document.getElementById('award-dracme-qty').value);
      const artId = document.getElementById('award-artifact-select').value;
      
      const teacher = Auth.getUser();

      if (xp !== 0) {
        window.EroiGame.addXP(email, xp);
        window.EroiDB.logActivity(teacher.email, `Assegnati ${xp} XP allo studente ${email}`);
      }
      if (dracme !== 0) {
        window.EroiGame.addDracme(email, dracme);
        window.EroiDB.logActivity(teacher.email, `Assegnate ${dracme} Dracme allo studente ${email}`);
      }

      if (artId) {
        // Aggiunge l'artefatto nell'inventario dello studente come oggetto permanente
        const inventory = window.EroiDB.getInventory(email);
        const art = window.EroiDB.getArtifacts()[artId];
        
        if (!inventory.some(i => i.itemId === artId)) {
          inventory.push({
            itemId: artId,
            name: art.name,
            type: "permanent",
            rarity: art.rarity,
            quantity: 1,
            usedCount: 0,
            purchaseDate: new Date().toISOString()
          });
          window.EroiDB.saveInventory(email, inventory);
          window.EroiDB.logActivity(teacher.email, `Assegnato l'artefatto "${art.name}" a ${email}`);
        }
      }

      this.showToast("Ricompense assegnate con successo!", "success");
      this.closeAwardModal();
      this.renderTeacherStudents();
      this.renderTeacherStats();
    },

    openSpostaModal: function(email, name, currentClass) {
      document.getElementById('sposta-studente-email').value = email;
      document.getElementById('sposta-studente-label').innerHTML = `Sposta lo studente <strong>${name}</strong> (Email: ${email}) attualmente in classe: <strong>${currentClass || 'Nessuna'}</strong>.`;
      
      const select = document.getElementById('sposta-studente-select');
      const classes = window.EroiDB.getClasses();
      select.innerHTML = Object.values(classes).map(c => `
        <option value="${c.id}">${c.name} (${c.id})</option>
      `).join('');

      document.getElementById('modal-sposta-studente').classList.add('active');
    },

    closeSpostaModal: function() {
      document.getElementById('modal-sposta-studente').classList.remove('active');
    },

    submitSpostaStudente: function() {
      const email = document.getElementById('sposta-studente-email').value;
      const targetClass = document.getElementById('sposta-studente-select').value;
      
      const teacher = Auth.getUser();
      
      // Salva
      const user = window.EroiDB.getUser(email);
      if (user) {
        user.classId = targetClass;
        window.EroiDB.saveUser(email, user);
        window.EroiDB.logActivity(teacher.email, `Trasferito lo studente ${email} nella classe ${targetClass}`);
        this.showToast("Studente trasferito con successo!", "success");
      }
      
      this.closeSpostaModal();
      this.renderTeacherStudents();
    },

    deleteStudent: function(email, name) {
      if (confirm(`Sei sicuro di voler cancellare definitivamente lo studente ${name}? Tutti i suoi XP, Dracme e inventario verranno distrutti.`)) {
        const teacher = Auth.getUser();
        window.EroiDB.deleteUser(email);
        window.EroiDB.logActivity(teacher.email, `Eliminato definitivamente lo studente ${name} (${email})`);
        this.showToast("Studente rimosso.", "success");
        this.renderTeacherStudents();
        this.renderTeacherStats();
      }
    },

    // --- TEACHER MISSIONS & QUIZZES ---
    renderTeacherMissions: function() {
      const missions = window.EroiDB.getMissions();
      const tbody = document.querySelector('#teacher-missions-table tbody');
      tbody.innerHTML = '';

      if (missions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--text-muted);"><i>Nessuna missione disponibile.</i></td></tr>`;
      }

      missions.forEach(m => {
        const isPreset = window.EroiDB.isPresetMission(m.id);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <strong>${m.id}</strong>
            ${isPreset ? `<span title="Missione predefinita" style="margin-left:6px; font-size:0.7rem; background:rgba(212,175,55,0.15); color:var(--gold); border:1px solid rgba(212,175,55,0.4); border-radius:4px; padding:1px 6px;">🔒 preset</span>` : ''}
          </td>
          <td>${m.title}</td>
          <td>${m.category}</td>
          <td>${m.area}</td>
          <td>XP: +${m.rewards.xp} | Dracme: +${m.rewards.dracme}</td>
          <td>${m.questions.length} domande</td>
          <td>
            <div style="display:flex; gap:4px;">
              <button class="btn btn-secondary" style="padding:4px 8px; font-size:0.72rem;" onclick="EroiApp.openEditMissionModal('${m.id}')" title="Modifica missione">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn btn-danger" style="padding:4px 8px; font-size:0.72rem;" onclick="EroiApp.deleteMission('${m.id}')" title="${isPreset ? 'Nascondi missione (ripristinabile)' : 'Elimina definitivamente'}">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });

      // Renderizza il cestino delle preset nascoste
      this.renderMissionTrash();
    },

    openEditMissionModal: function(missionId) {
      const missions = [...window.EroiDB.getMissions(), ...window.EroiDB.getHiddenMissions()];
      const m = missions.find(m => m.id === missionId);
      if (!m) return;

      const isPreset = window.EroiDB.isPresetMission(missionId);

      // Popola il form di creazione riutilizzandolo in modalità edit
      document.getElementById('new-mission-id').value = m.id;
      document.getElementById('new-mission-id').readOnly = isPreset;
      document.getElementById('new-mission-id').style.opacity = isPreset ? '0.5' : '1';
      document.getElementById('new-mission-title').value = m.title || '';
      document.getElementById('new-mission-category').value = m.category || 'Mitologia';
      document.getElementById('new-mission-area').value = m.area || 'Olimpo';
      document.getElementById('new-mission-gametype').value = m.gameType || 'quiz';
      document.getElementById('new-mission-xp').value = m.rewards ? m.rewards.xp : 50;
      document.getElementById('new-mission-dracme').value = m.rewards ? m.rewards.dracme : 30;
      document.getElementById('new-mission-desc').value = m.desc || '';
      // Prima domanda (se esiste)
      if (m.questions && m.questions.length > 0) {
        const q = m.questions[0];
        document.getElementById('new-mission-q').value = q.q || '';
        document.getElementById('new-mission-opt0').value = q.a[0] || '';
        document.getElementById('new-mission-opt1').value = q.a[1] || '';
        document.getElementById('new-mission-opt2').value = q.a[2] || '';
        document.getElementById('new-mission-opt3').value = q.a[3] || '';
      }

      // Aggiorna l'editor in base al tipo di gioco
      this.onGameTypeChange();

      // Cambia il bottone e titolo in modalità edit
      const btn = document.getElementById('btn-save-mission');
      btn.textContent = '💾 Salva Modifiche';
      btn.setAttribute('data-edit-id', missionId);
      btn.onclick = function(e) {
        e.preventDefault();
        EroiApp.saveEditedMission(missionId);
      };

      // Segnala con un banner visivo che siamo in edit mode
      let banner = document.getElementById('mission-edit-banner');
      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'mission-edit-banner';
        banner.style.cssText = 'background: rgba(212,175,55,0.12); border: 1px solid var(--gold); border-radius:8px; padding:10px 16px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; font-size:0.88rem;';
        document.getElementById('form-create-mission').before(banner);
      }
      banner.innerHTML = `
        <span>✏️ <strong>Modifica in corso:</strong> <em>${m.title}</em>${isPreset ? ' <span style="color:var(--gold);">(preset — l\'ID non è modificabile)</span>' : ''}</span>
        <button class="btn btn-secondary" style="padding:4px 12px; font-size:0.78rem;" onclick="EroiApp.resetMissionForm()">✕ Annulla</button>
      `;

      // Scrolla al form
      document.getElementById('form-create-mission').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    saveEditedMission: function(missionId) {
      const id = document.getElementById('new-mission-id').value.trim();
      const title = document.getElementById('new-mission-title').value.trim();
      const category = document.getElementById('new-mission-category').value;
      const area = document.getElementById('new-mission-area').value;
      const gameType = document.getElementById('new-mission-gametype').value;
      const xp = parseInt(document.getElementById('new-mission-xp').value) || 50;
      const dracme = parseInt(document.getElementById('new-mission-dracme').value) || 30;
      const desc = document.getElementById('new-mission-desc').value.trim();
      const q = document.getElementById('new-mission-q').value.trim();
      const opts = [
        document.getElementById('new-mission-opt0').value.trim(),
        document.getElementById('new-mission-opt1').value.trim(),
        document.getElementById('new-mission-opt2').value.trim(),
        document.getElementById('new-mission-opt3').value.trim(),
      ];

      if (!title || !desc) {
        this.showToast('Titolo e descrizione sono obbligatori.', 'error');
        return;
      }

      // Leggi le domande esistenti per non perderle
      const missions = [...window.EroiDB.getMissions(), ...window.EroiDB.getHiddenMissions()];
      const existing = missions.find(m => m.id === missionId);
      let questions = existing ? [...existing.questions] : [];
      // Aggiorna la prima domanda
      if (q && opts[0]) {
        const firstQ = { q, a: opts, correct: 0 };
        if (questions.length > 0) questions[0] = firstQ;
        else questions.push(firstQ);
      }

      window.EroiDB.saveMission(missionId, { title, category, area, desc, rewards: { xp, dracme }, gameType, questions });
      const teacher = Auth.getUser();
      window.EroiDB.logActivity(teacher.email, `Modificata la missione "${title}" (${missionId})`);
      this.showToast(`Missione "${title}" aggiornata con successo!`, 'success');
      this.resetMissionForm();
      this.renderTeacherMissions();
    },

    resetMissionForm: function() {
      const form = document.getElementById('form-create-mission');
      form.reset();
      document.getElementById('new-mission-id').readOnly = false;
      document.getElementById('new-mission-id').style.opacity = '1';
      document.getElementById('new-mission-gametype').value = 'quiz';
      this.onGameTypeChange();
      const btn = document.getElementById('btn-save-mission');
      btn.textContent = 'Crea e Pubblica Missione';
      btn.removeAttribute('data-edit-id');
      // Ripristina l'onclick originale
      btn.onclick = null;
      const banner = document.getElementById('mission-edit-banner');
      if (banner) banner.remove();
    },

    onGameTypeChange: function() {
      const type = document.getElementById('new-mission-gametype').value;
      const header = document.getElementById('new-mission-editor-header');
      const label = document.getElementById('new-mission-q-label');
      const qInput = document.getElementById('new-mission-q');
      const optionsContainer = document.getElementById('new-mission-options-container');
      const hint = document.getElementById('new-mission-editor-hint');

      if (!header || !label || !qInput || !optionsContainer || !hint) return;

      // Reset styles and display
      optionsContainer.style.display = 'grid';
      hint.style.display = 'none';

      if (type === 'quiz') {
        header.textContent = 'Domande/Quiz (Modificabile nel DB)';
        label.textContent = 'Testo Domanda';
        qInput.placeholder = 'Chi uccide Patroclo in battaglia?';
        
        optionsContainer.style.display = 'grid';
        optionsContainer.querySelectorAll('.form-group').forEach((group, idx) => {
          const lbl = group.querySelector('label');
          const inp = group.querySelector('input');
          lbl.textContent = idx === 0 ? 'Opzione 0 (Corretta)' : `Opzione ${idx}`;
          inp.placeholder = `Opzione ${idx}`;
        });
      } else if (type === 'puzzle') {
        header.textContent = 'Frase da Riordinare (Puzzle)';
        label.textContent = 'Inserisci la frase completa';
        qInput.placeholder = 'Cantami o Diva del pelide Achille l\'ira funesta';
        
        optionsContainer.style.display = 'none';
        hint.style.display = 'block';
        hint.textContent = '💡 Lo studente vedrà le parole di questa frase mescolate e dovrà selezionarle nel giusto ordine.';
      } else if (type === 'cloze') {
        header.textContent = 'Testo da Completare (Cloze)';
        label.textContent = 'Inserisci il testo (usa ___ per indicare gli spazi da riempire)';
        qInput.placeholder = 'Achille è l\'eroe dell\'___ e combatte contro ___.';
        
        optionsContainer.style.display = 'grid';
        optionsContainer.querySelectorAll('.form-group').forEach((group, idx) => {
          const lbl = group.querySelector('label');
          const inp = group.querySelector('input');
          lbl.textContent = `Parola per Spazio ${idx + 1}`;
          inp.placeholder = `Parola ${idx + 1}`;
        });
        hint.style.display = 'block';
        hint.textContent = '💡 Inserisci il testo con ___ nel campo sopra e scrivi le parole corrette in ordine nei campi qui sotto.';
      } else if (type === 'cantami_o_diva') {
        header.textContent = 'Argomento Spiegazione Orale (Cantami o Diva)';
        label.textContent = 'Traccia/Argomento da spiegare';
        qInput.placeholder = 'Spiega brevemente chi era Achille e le ragioni della sua ira.';
        
        optionsContainer.style.display = 'none';
        hint.style.display = 'block';
        hint.textContent = '💡 Gli studenti avranno 10 secondi per spiegare oralmente questo concetto dopo aver letto la traccia.';
      }
    },

    deleteMission: function(missionId) {
      const isPreset = window.EroiDB.isPresetMission(missionId);
      const teacher = Auth.getUser();

      if (isPreset) {
        if (confirm(`Nascondere la missione preset "${missionId}"?\n\nSarà rimossa dalla lista ma potrai ripristinarla in qualsiasi momento dal pannello "Missioni Nascoste".`)) {
          window.EroiDB.hideMission(missionId);
          window.EroiDB.logActivity(teacher.email, `Nascosta la missione preset ${missionId}`);
          this.showToast('Missione nascosta. Puoi ripristinarla dal cestino.', 'success');
          this.renderTeacherMissions();
        }
      } else {
        if (confirm(`Eliminare definitivamente la missione "${missionId}"? Questa azione non è reversibile.`)) {
          window.EroiDB.deleteMission(missionId);
          window.EroiDB.logActivity(teacher.email, `Eliminata definitivamente la missione ${missionId}`);
          this.showToast('Missione eliminata.', 'success');
          this.renderTeacherMissions();
          this.renderTeacherStats();
        }
      }
    },

    restoreMission: function(missionId) {
      window.EroiDB.restoreMission(missionId);
      const teacher = Auth.getUser();
      window.EroiDB.logActivity(teacher.email, `Ripristinata la missione preset ${missionId}`);
      this.showToast('Missione ripristinata ai valori originali.', 'success');
      this.renderTeacherMissions();
    },

    renderMissionTrash: function() {
      const hidden = window.EroiDB.getHiddenMissions();
      let panel = document.getElementById('missions-trash-panel');

      if (hidden.length === 0) {
        if (panel) panel.style.display = 'none';
        return;
      }

      if (!panel) {
        // Crea il pannello se non esiste ancora
        panel = document.createElement('div');
        panel.id = 'missions-trash-panel';
        panel.className = 'glass-panel';
        panel.style.marginTop = '20px';
        const missionsGlassPanel = document.querySelector('#teacher-missions-table').closest('.glass-panel');
        if (missionsGlassPanel) missionsGlassPanel.after(panel);
        else return;
      }

      panel.style.display = 'block';
      panel.innerHTML = `
        <h3 class="panel-title" style="color: var(--text-muted);">
          <i class="fa-solid fa-trash-can-arrow-up" style="color: var(--gold);"></i>
          Missioni Nascoste
          <span style="background: rgba(212,175,55,0.15); color: var(--gold); font-size:0.78rem; padding:2px 10px; border-radius:20px; margin-left:8px; font-family: var(--font-body);">${hidden.length}</span>
        </h3>
        <p style="color: var(--text-muted); font-size: 0.83rem; margin-bottom: 16px;">
          Queste missioni predefinite sono state nascoste. Possono essere ripristinate ai valori originali in qualsiasi momento.
        </p>
        <div class="table-responsive">
          <table class="game-table" style="border-top: 1px dashed rgba(212,175,55,0.25);">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titolo</th>
                <th>Categoria</th>
                <th>Area Mappa</th>
                <th>Premi</th>
                <th>Azione</th>
              </tr>
            </thead>
            <tbody>
              ${hidden.map(m => `
                <tr>
                  <td><strong>${m.id}</strong> <span style="font-size:0.68rem; background:rgba(212,175,55,0.1); color:var(--gold); border:1px solid rgba(212,175,55,0.3); border-radius:4px; padding:1px 5px; margin-left:4px;">🔒 preset</span></td>
                  <td>${m.title}</td>
                  <td>${m.category}</td>
                  <td>${m.area || ''}</td>
                  <td>XP: +${m.rewards ? m.rewards.xp : '?'} | Dracme: +${m.rewards ? m.rewards.dracme : '?'}</td>
                  <td>
                    <button class="btn btn-secondary" style="padding:4px 10px; font-size:0.75rem;" onclick="EroiApp.restoreMission('${m.id}')">
                      <i class="fa-solid fa-rotate-left"></i> Ripristina
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    },

    // --- TEACHER SHOP CONTROL ---
    renderTeacherShop: function() {
      const items = window.EroiDB.getShopItems();
      const tbody = document.querySelector('#teacher-shop-table tbody');
      if (!tbody) return;
      tbody.innerHTML = '';

      let container = document.getElementById('teacher-shop-preview-container');
      if (!container) {
          container = document.createElement('div');
          container.id = 'teacher-shop-preview-container';
          container.style.marginBottom = '15px';
          container.innerHTML = `
             <button class="btn" style="background: var(--bg-card); border: 1px solid var(--gold); color: var(--gold);" onclick="EroiApp.openStudentShopPreview()">
               <i class="fa-solid fa-eye" style="color: var(--gold);"></i> Preview Mercato Studenti (Read-Only)
             </button>
          `;
          const tableNode = document.getElementById('teacher-shop-table');
          if (tableNode && tableNode.parentNode) {
              tableNode.parentNode.insertBefore(container, tableNode);
          }
      }

      items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${item.id}</strong></td>
          <td>${item.name}</td>
          <td>${item.rarity}</td>
          <td>${item.price} Dracme</td>
          <td>${item.stock}</td>
          <td>
            <span style="color: ${item.active ? 'var(--success)' : 'var(--danger)'}; font-weight:bold;">
              ${item.active ? 'Attivo' : 'Disattivato'}
            </span>
          </td>
          <td>
            <div style="display:flex; gap:4px;">
              <button class="btn btn-secondary" style="padding:4px 8px; font-size:0.72rem;" onclick="EroiApp.toggleShopItemActive('${item.id}', ${item.active})">
                ${item.active ? 'Disattiva' : 'Attiva'}
              </button>
              <button class="btn btn-danger" style="padding: 4px 8px; font-size:0.72rem;" onclick="EroiApp.deleteShopItem('${item.id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    },

    toggleShopItemActive: function(itemId, currentActive) {
      const items = window.EroiDB.getShopItems();
      const item = items.find(i => i.id === itemId);
      if (item) {
        item.active = !currentActive;
        const teacher = Auth.getUser();
        window.EroiDB.saveShopItem(itemId, item);
        window.EroiDB.logActivity(teacher.email, `${item.active ? 'Attivato' : 'Disattivato'} l'oggetto shop: ${item.name}`);
        this.renderTeacherShop();
      }
    },

    openStudentShopPreview: function() {
      const items = window.EroiDB.getShopItems(); // Legge stock studenti
      const modal = document.createElement('div');
      modal.id = 'student-shop-preview-modal';
      modal.className = 'modal-overlay';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = '9999';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.background = 'rgba(10, 15, 26, 0.85)';
      modal.style.backdropFilter = 'blur(5px)';

      const content = document.createElement('div');
      content.className = 'glass-panel';
      content.style.width = '90%';
      content.style.maxWidth = '1000px';
      content.style.maxHeight = '90vh';
      content.style.overflowY = 'auto';
      content.style.position = 'relative';
      content.style.border = '2px solid var(--gold)';

      let html = `
        <button class="btn btn-danger" style="position:absolute; top:15px; right:15px;" onclick="document.getElementById('student-shop-preview-modal').remove()">Chiudi</button>
        <h2 style="color:var(--gold); margin-bottom: 5px;"><i class="fa-solid fa-eye"></i> Preview Mercato Studenti</h2>
        <p style="color:var(--danger); font-size: 0.85rem; font-weight: bold; margin-bottom: 20px;">
           MODALITÀ READ-ONLY: Fotografia statica del sistema didattico. Nessuna interazione possibile.
        </p>
        <div class="cards-grid" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); display: grid; gap: 20px;">
      `;

      items.forEach(item => {
        html += `
          <div class="card rarity-${item.rarity.toLowerCase()}" style="opacity: ${item.active ? '1' : '0.5'}; position: relative; overflow: hidden;">
            ${!item.active ? '<div style="position: absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:1; display:flex; align-items:center; justify-content:center; color:var(--danger); font-weight:bold; font-size:1.2rem; transform:rotate(-15deg);">DISATTIVATO</div>' : ''}
            <div>
              <span class="card-rarity-badge">${item.rarity}</span>
              <div style="font-size: 2.5rem; text-align: center; margin: 15px 0;">${item.image || '🎁'}</div>
              <h4 class="card-title">${item.name}</h4>
              <p class="card-desc" style="font-size: 0.8rem;">${item.desc}</p>
              ${item.bonus ? `<p class="card-bonus" style="font-size: 0.75rem; color: var(--gold); margin-top:5px;"><strong>Bonus:</strong> ${item.bonus}</p>` : ''}
            </div>
            <div style="margin-top: 15px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 10px; color: var(--text-muted);">
                <span>Prezzo: <strong style="color:var(--gold);">${item.price} <i class="fa-solid fa-coins"></i></strong></span>
                <span>Stock: <strong>${item.stock >= 99 ? '∞' : item.stock}</strong></span>
              </div>
              <button class="btn btn-secondary" style="width: 100%; cursor: not-allowed; opacity: 0.5;" disabled>
                Acquisto Disabilitato
              </button>
            </div>
          </div>
        `;
      });

      html += `</div>`;
      content.innerHTML = html;
      modal.appendChild(content);
      document.body.appendChild(modal);
    },

    openStudentPreviewAll: function(email) {
      const student = window.EroiDB.getUser(email);
      const profile = window.EroiDB.getStudentProfile(email);
      if (!student || !profile) {
        alert("Studente non trovato o profilo inesistente.");
        return;
      }

      const modalId = 'student-preview-modal';
      let modal = document.getElementById(modalId);
      if (modal) modal.remove();

      modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'modal-overlay';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = '9999';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.background = 'rgba(10, 15, 26, 0.85)';
      modal.style.backdropFilter = 'blur(5px)';

      const content = document.createElement('div');
      content.className = 'glass-panel';
      content.style.width = '95%';
      content.style.maxWidth = '1200px';
      content.style.height = '90vh';
      content.style.display = 'flex';
      content.style.flexDirection = 'column';
      content.style.position = 'relative';
      content.style.border = '2px solid var(--gold)';

      const header = document.createElement('div');
      header.style.borderBottom = '1px solid rgba(212,175,55,0.3)';
      header.style.paddingBottom = '10px';
      header.style.marginBottom = '15px';
      header.innerHTML = `
        <button class="btn btn-danger" style="position:absolute; top:15px; right:15px;" onclick="document.getElementById('${modalId}').remove()">Chiudi</button>
        <h2 style="color:var(--gold); margin-bottom: 5px;"><i class="fa-solid fa-user-graduate"></i> Preview Didattica: ${student.name}</h2>
        <p style="color:var(--danger); font-size: 0.85rem; font-weight: bold; margin: 0;">
           MODALITÀ READ-ONLY: Fotografia statica del profilo studente. Nessuna interazione attiva sul motore di gioco.
        </p>
      `;

      const tabsDiv = document.createElement('div');
      tabsDiv.style.display = 'flex';
      tabsDiv.style.gap = '10px';
      tabsDiv.style.marginBottom = '20px';
      tabsDiv.innerHTML = `
        <button class="tab-btn active" id="btn-prev-map" onclick="EroiApp.renderPreviewTab('${email}', 'map')"><i class="fa-solid fa-map"></i> Mappa</button>
        <button class="tab-btn" id="btn-prev-inv" onclick="EroiApp.renderPreviewTab('${email}', 'inv')"><i class="fa-solid fa-box-open"></i> Inventario</button>
        <button class="tab-btn" id="btn-prev-miss" onclick="EroiApp.renderPreviewTab('${email}', 'miss')"><i class="fa-solid fa-scroll"></i> Missioni</button>
        <button class="tab-btn" id="btn-prev-stat" onclick="EroiApp.renderPreviewTab('${email}', 'stat')"><i class="fa-solid fa-chart-line"></i> Statistiche</button>
      `;

      const bodyContainer = document.createElement('div');
      bodyContainer.id = 'preview-tab-container';
      bodyContainer.style.flexGrow = '1';
      bodyContainer.style.overflowY = 'auto';

      content.appendChild(header);
      content.appendChild(tabsDiv);
      content.appendChild(bodyContainer);
      modal.appendChild(content);
      document.body.appendChild(modal);

      this.renderPreviewTab(email, 'map');
    },

    renderPreviewTab: function(email, tab) {
      document.querySelectorAll('#student-preview-modal .tab-btn').forEach(b => b.classList.remove('active'));
      document.getElementById(`btn-prev-${tab}`).classList.add('active');

      const container = document.getElementById('preview-tab-container');
      container.innerHTML = ''; 

      const profile = window.EroiDB.getStudentProfile(email);
      const inventory = window.EroiDB.getInventory(email);
      const missions = window.EroiDB.getMissions();

      if (tab === 'map') {
        const nodes = window.EroiDB.getMapNodes();
        let mapHtml = `<div class="map-container" style="position:relative; width:100%; height:100%; min-height:500px; background:rgba(0,0,0,0.5); border-radius:8px;">`;
        nodes.forEach(node => {
          const isUnlocked = profile.unlockedAreas.includes(node.id);
          const icon = isUnlocked ? node.icon : "fa-lock";
          const color = isUnlocked ? "var(--gold)" : "var(--text-muted)";
          mapHtml += `
            <div style="position:absolute; left:${node.x}%; top:${node.y}%; transform:translate(-50%, -50%); text-align:center; opacity:${isUnlocked?1:0.5}; cursor:not-allowed;">
              <div style="width:40px; height:40px; background:var(--bg-card); border:2px solid ${color}; border-radius:50%; display:flex; justify-content:center; align-items:center; margin:0 auto;">
                <i class="fa-solid ${icon}" style="color:${color};"></i>
              </div>
              <span style="font-size:0.75rem; color:${color}; font-weight:bold; background:rgba(0,0,0,0.7); padding:2px 5px; border-radius:4px; white-space:nowrap;">${node.name}</span>
            </div>
          `;
        });
        mapHtml += `</div>`;
        container.innerHTML = mapHtml;

      } else if (tab === 'inv') {
        let invHtml = `<div class="cards-grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); display:grid; gap:15px;">`;
        if (inventory.length === 0) {
           invHtml = `<p style="text-align:center; color:var(--text-muted); font-style:italic;">Nessun oggetto nell'inventario.</p>`;
        } else {
           inventory.forEach(item => {
             invHtml += `
               <div class="card rarity-${item.rarity.toLowerCase()}" style="cursor:not-allowed;">
                 <span class="card-rarity-badge">${item.rarity}</span>
                 <h4 style="margin-top:20px; font-size:1.1rem; color:var(--text-light);">${item.name}</h4>
                 <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:5px;">Tipo: ${item.type}</p>
                 <p style="font-size:0.8rem; color:var(--gold);">Quantità: <strong>${item.quantity}</strong></p>
               </div>
             `;
           });
        }
        invHtml += `</div>`;
        
        container.innerHTML = `
           <h3 style="color:var(--gold); margin-bottom:15px;">Oggetti Posseduti</h3>
           ${invHtml}
           <h3 style="color:var(--gold); margin-top:30px; margin-bottom:15px;">Artefatti Attivi</h3>
           <div style="display:flex; gap:10px;">
             ${profile.activeArtifacts && profile.activeArtifacts.length > 0 ? profile.activeArtifacts.map(a => `<span style="background:rgba(212,175,55,0.2); border:1px solid var(--gold); padding:5px 10px; border-radius:20px; font-size:0.85rem; color:var(--gold);">${a}</span>`).join('') : '<span style="color:var(--text-muted); font-size:0.85rem;">Nessun artefatto equipaggiato.</span>'}
           </div>
        `;

      } else if (tab === 'miss') {
        let missHtml = `<table class="game-table"><thead><tr><th>Titolo</th><th>Categoria</th><th>Area</th><th>Stato</th><th>Ricompensa Base</th></tr></thead><tbody>`;
        missions.forEach(m => {
           const isUnlocked = profile.unlockedAreas.includes(m.area) || m.unlockedBy === null; 
           const isCompleted = window.EroiDB.getLogs().some(log => log.email === email && log.activity.includes(`Completata missione "${m.title}"`));
           
           let statusText = "<span style='color:var(--text-muted);'>Bloccata</span>";
           if (isCompleted) statusText = "<span style='color:var(--success); font-weight:bold;'><i class='fa-solid fa-check'></i> Completata</span>";
           else if (isUnlocked) statusText = "<span style='color:var(--gold); font-weight:bold;'>Disponibile</span>";

           missHtml += `
             <tr>
               <td>${m.title}</td>
               <td>${m.category}</td>
               <td>${m.area}</td>
               <td>${statusText}</td>
               <td>${m.rewards.xp} XP / ${m.rewards.dracme} Dracme</td>
             </tr>
           `;
        });
        missHtml += `</tbody></table>`;
        container.innerHTML = missHtml;

      } else if (tab === 'stat') {
        const statsHtml = `
           <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
             <div class="glass-panel" style="background:rgba(0,0,0,0.2);">
               <h3 style="color:var(--gold); margin-bottom:15px; border-bottom:1px solid rgba(212,175,55,0.3); padding-bottom:5px;"><i class="fa-solid fa-star"></i> Progressione Primaria</h3>
               <p style="font-size:1.1rem; margin-bottom:8px;">Livello: <strong style="color:var(--gold);">${profile.level}</strong></p>
               <p style="font-size:1.1rem; margin-bottom:8px;">Esperienza: <strong style="color:var(--success);">${profile.xp} XP</strong></p>
               <p style="font-size:1.1rem; margin-bottom:8px;">Dracme: <strong style="color:var(--gold);">${profile.dracme} <i class="fa-solid fa-coins"></i></strong></p>
               <p style="font-size:1.1rem; margin-bottom:8px;">Avatar Classe: <strong>${profile.avatarClass}</strong></p>
               <p style="font-size:1.1rem; margin-bottom:8px;">Aiutante Equipaggiato: <strong style="color:var(--info);">${profile.activeHelper || 'Nessuno'}</strong></p>
             </div>
             <div class="glass-panel" style="background:rgba(0,0,0,0.2);">
               <h3 style="color:var(--gold); margin-bottom:15px; border-bottom:1px solid rgba(212,175,55,0.3); padding-bottom:5px;"><i class="fa-solid fa-bolt"></i> Attributi Avatar</h3>
               <p style="font-size:1.1rem; margin-bottom:8px;">Coraggio: <strong>${profile.stats.coraggio}</strong></p>
               <p style="font-size:1.1rem; margin-bottom:8px;">Astuzia: <strong>${profile.stats.astuzia}</strong></p>
               <p style="font-size:1.1rem; margin-bottom:8px;">Sapienza: <strong>${profile.stats.sapienza}</strong></p>
               <p style="font-size:1.1rem; margin-bottom:8px;">Onore: <strong>${profile.stats.onore}</strong></p>
             </div>
           </div>
        `;
        container.innerHTML = statsHtml;
      }
    },

    deleteShopItem: function(itemId) {
      if (confirm(`Rimuovere l'articolo ${itemId} dallo shop?`)) {
        const teacher = Auth.getUser();
        window.EroiDB.deleteShopItem(itemId);
        window.EroiDB.logActivity(teacher.email, `Rimosso l'articolo shop: ${itemId}`);
        this.showToast("Articolo rimosso dallo Shop.", "success");
        this.renderTeacherShop();
      }
    },

    // --- TEACHER HELPERS & ARTEFACTS ---
    renderTeacherHelpersAndArtifacts: function() {
      // 1. Helpers
      const helpers = window.EroiDB.getHelpers();
      const hTbody = document.querySelector('#teacher-helpers-table tbody');
      hTbody.innerHTML = '';

      Object.values(helpers).forEach(h => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <strong>${h.name}</strong>
            <span title="Aiutante predefinito" style="margin-left:6px; font-size:0.68rem; background:rgba(212,175,55,0.15); color:var(--gold); border:1px solid rgba(212,175,55,0.4); border-radius:4px; padding:1px 5px;">🔒 preset</span>
          </td>
          <td>${h.category}</td>
          <td><input type="text" id="helper-pass-${h.id}" class="form-control" style="padding:4px; font-size:0.8rem;" value="${h.bonusPassive || ''}"></td>
          <td><input type="text" id="helper-power-${h.id}" class="form-control" style="padding:4px; font-size:0.8rem;" value="${h.potereSpeciale || ''}"></td>
          <td><input type="text" id="helper-imm-${h.id}" class="form-control" style="padding:4px; font-size:0.8rem;" value="${h.immunita || ''}"></td>
          <td>
            <div style="display:flex; gap:4px;">
              <button class="btn" style="padding:4px 8px; font-size:0.75rem;" onclick="EroiApp.saveHelperConfig('${h.id}')">Salva</button>
              <button class="btn btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="EroiApp.hideHelper('${h.id}')" title="Nascondi aiutante (ripristinabile)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        `;
        hTbody.appendChild(tr);
      });

      this.renderHelperTrash();

      // 2. Artifacts
      const artifacts = window.EroiDB.getArtifacts();
      const aTbody = document.querySelector('#teacher-artifacts-table tbody');
      aTbody.innerHTML = '';

      if (Object.keys(artifacts).length === 0) {
        aTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted);"><i>Nessun artefatto disponibile.</i></td></tr>`;
      }

      Object.values(artifacts).forEach(a => {
        const isPreset = window.EroiDB.isPresetArtifact(a.id);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="font-size:1.3rem;">${a.image}</td>
          <td>
            <strong>${a.id}</strong>
            ${isPreset ? `<span title="Artefatto predefinito" style="margin-left:6px; font-size:0.68rem; background:rgba(212,175,55,0.15); color:var(--gold); border:1px solid rgba(212,175,55,0.4); border-radius:4px; padding:1px 5px;">🔒 preset</span>` : ''}
          </td>
          <td>${a.name}</td>
          <td>${a.rarity}</td>
          <td>${a.bonus}</td>
          <td>
            <div style="display:flex; gap:4px;">
              <button class="btn btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="EroiApp.deleteArtifact('${a.id}')" title="${isPreset ? 'Nascondi artefatto (ripristinabile)' : 'Elimina definitivamente'}">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        `;
        aTbody.appendChild(tr);
      });

      this.renderArtifactTrash();
    },

    hideHelper: function(helperId) {
      const helpers = window.EroiDB.getHelpers();
      const h = helpers[helperId];
      const name = h ? h.name : helperId;
      if (confirm(`Nascondere l'aiutante "${name}"?\nPotrà essere ripristinato in qualsiasi momento.`)) {
        window.EroiDB.hideHelper(helperId);
        const teacher = Auth.getUser();
        window.EroiDB.logActivity(teacher.email, `Nascosto l'aiutante ${name}`);
        this.showToast('Aiutante nascosto. Puoi ripristinarlo dal cestino.', 'success');
        this.renderTeacherHelpersAndArtifacts();
      }
    },

    restoreHelper: function(helperId) {
      window.EroiDB.restoreHelper(helperId);
      const teacher = Auth.getUser();
      window.EroiDB.logActivity(teacher.email, `Ripristinato l'aiutante ${helperId}`);
      this.showToast('Aiutante ripristinato ai valori originali.', 'success');
      this.renderTeacherHelpersAndArtifacts();
    },

    renderHelperTrash: function() {
      const hidden = Object.values(window.EroiDB.getHiddenHelpers());
      let panel = document.getElementById('helpers-trash-panel');
      if (hidden.length === 0) { if (panel) panel.style.display = 'none'; return; }
      if (!panel) {
        panel = document.createElement('div');
        panel.id = 'helpers-trash-panel';
        panel.className = 'glass-panel';
        panel.style.marginTop = '20px';
        const ref = document.querySelector('#teacher-helpers-table').closest('.glass-panel');
        if (ref) ref.after(panel); else return;
      }
      panel.style.display = 'block';
      panel.innerHTML = `
        <h3 class="panel-title" style="color:var(--text-muted);">
          <i class="fa-solid fa-trash-can-arrow-up" style="color:var(--gold);"></i> Aiutanti Nascosti
          <span style="background:rgba(212,175,55,0.15);color:var(--gold);font-size:0.78rem;padding:2px 10px;border-radius:20px;margin-left:8px;font-family:var(--font-body);">${hidden.length}</span>
        </h3>
        <p style="color:var(--text-muted);font-size:0.83rem;margin-bottom:16px;">Aiutanti predefiniti nascosti — ripristinabili in qualsiasi momento.</p>
        <div class="table-responsive">
          <table class="game-table" style="border-top: 1px dashed rgba(212,175,55,0.25);">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Azione</th>
              </tr>
            </thead>
            <tbody>
              ${hidden.map(h => `
                <tr>
                  <td><strong>${h.id}</strong> <span style="font-size:0.68rem; background:rgba(212,175,55,0.1); color:var(--gold); border:1px solid rgba(212,175,55,0.3); border-radius:4px; padding:1px 5px; margin-left:4px;">🔒 preset</span></td>
                  <td>${h.name}</td>
                  <td>${h.category}</td>
                  <td>
                    <button class="btn btn-secondary" style="padding:4px 10px; font-size:0.75rem;" onclick="EroiApp.restoreHelper('${h.id}')">
                      <i class="fa-solid fa-rotate-left"></i> Ripristina
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    },

    saveHelperConfig: function(helperId) {
      const pass = document.getElementById(`helper-pass-${helperId}`).value;
      const power = document.getElementById(`helper-power-${helperId}`).value;
      const imm = document.getElementById(`helper-imm-${helperId}`).value;

      const helpers = window.EroiDB.getHelpers();
      const h = helpers[helperId];
      if (h) {
        h.bonusPassive = pass;
        h.potereSpeciale = power;
        h.immunita = imm;
        
        const teacher = Auth.getUser();
        window.EroiDB.saveHelper(helperId, h);
        window.EroiDB.logActivity(teacher.email, `Personalizzato l'aiutante ${h.name}`);
        this.showToast(`Aiutante ${h.name} configurato!`, "success");
      }
    },

    deleteArtifact: function(artId) {
      const isPreset = window.EroiDB.isPresetArtifact(artId);
      const teacher = Auth.getUser();
      if (isPreset) {
        if (confirm(`Nascondere l'artefatto preset "${artId}"?\nSarà rimosso dalla lista ma potrai ripristinarlo in qualsiasi momento.`)) {
          window.EroiDB.hideArtifact(artId);
          window.EroiDB.logActivity(teacher.email, `Nascosto l'artefatto preset ${artId}`);
          this.showToast('Artefatto nascosto. Puoi ripristinarlo dal cestino.', 'success');
          this.renderTeacherHelpersAndArtifacts();
        }
      } else {
        if (confirm(`Eliminare definitivamente l'artefatto "${artId}"? Verrà rimosso anche dagli studenti.`)) {
          window.EroiDB.deleteArtifact(artId);
          window.EroiDB.logActivity(teacher.email, `Eliminato definitivamente l'artefatto ${artId}`);
          this.showToast('Artefatto eliminato.', 'success');
          this.renderTeacherHelpersAndArtifacts();
        }
      }
    },

    restoreArtifact: function(artId) {
      window.EroiDB.restoreArtifact(artId);
      const teacher = Auth.getUser();
      window.EroiDB.logActivity(teacher.email, `Ripristinato l'artefatto preset ${artId}`);
      this.showToast('Artefatto ripristinato ai valori originali.', 'success');
      this.renderTeacherHelpersAndArtifacts();
    },

    renderArtifactTrash: function() {
      const hidden = Object.values(window.EroiDB.getHiddenArtifacts());
      let panel = document.getElementById('artifacts-trash-panel');
      if (hidden.length === 0) { if (panel) panel.style.display = 'none'; return; }
      if (!panel) {
        panel = document.createElement('div');
        panel.id = 'artifacts-trash-panel';
        panel.className = 'glass-panel';
        panel.style.marginTop = '20px';
        const ref = document.querySelector('#teacher-artifacts-table').closest('.glass-panel');
        if (ref) ref.after(panel); else return;
      }
      panel.style.display = 'block';
      panel.innerHTML = `
        <h3 class="panel-title" style="color:var(--text-muted);">
          <i class="fa-solid fa-trash-can-arrow-up" style="color:var(--gold);"></i> Artefatti Nascosti
          <span style="background:rgba(212,175,55,0.15);color:var(--gold);font-size:0.78rem;padding:2px 10px;border-radius:20px;margin-left:8px;font-family:var(--font-body);">${hidden.length}</span>
        </h3>
        <p style="color:var(--text-muted);font-size:0.83rem;margin-bottom:16px;">Artefatti predefiniti nascosti — ripristinabili in qualsiasi momento.</p>
        <div class="table-responsive">
          <table class="game-table" style="border-top: 1px dashed rgba(212,175,55,0.25);">
            <thead>
              <tr>
                <th>Icona</th>
                <th>ID</th>
                <th>Nome</th>
                <th>Rarità</th>
                <th>Effetti</th>
                <th>Azione</th>
              </tr>
            </thead>
            <tbody>
              ${hidden.map(a => `
                <tr>
                  <td style="font-size:1.4rem;">${a.image}</td>
                  <td><strong>${a.id}</strong> <span style="font-size:0.68rem; background:rgba(212,175,55,0.1); color:var(--gold); border:1px solid rgba(212,175,55,0.3); border-radius:4px; padding:1px 5px; margin-left:4px;">🔒 preset</span></td>
                  <td>${a.name}</td>
                  <td>${a.rarity}</td>
                  <td>${a.bonus}</td>
                  <td>
                    <button class="btn btn-secondary" style="padding:4px 10px; font-size:0.75rem;" onclick="EroiApp.restoreArtifact('${a.id}')">
                      <i class="fa-solid fa-rotate-left"></i> Ripristina
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    },

    // --- TEACHER STUDY GUIDES ---
    renderTeacherGuides: function() {
      const guides = window.EroiDB.getStudyGuides();
      const tbody = document.querySelector('#teacher-guides-table tbody');
      tbody.innerHTML = '';

      if (guides.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);"><i>Nessuna scheda disponibile.</i></td></tr>`;
      }

      guides.forEach(g => {
        const isPreset = window.EroiDB.isPresetStudyGuide(g.id);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <strong>${g.id}</strong>
            ${isPreset ? `<span title="Scheda predefinita" style="margin-left:6px;font-size:0.68rem;background:rgba(212,175,55,0.15);color:var(--gold);border:1px solid rgba(212,175,55,0.4);border-radius:4px;padding:1px 5px;">🔒 preset</span>` : ''}
          </td>
          <td>${g.title}</td>
          <td>${g.category}</td>
          <td style="font-size:0.82rem;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${g.summary}</td>
          <td>
            <button class="btn btn-danger" style="padding:4px 8px;font-size:0.75rem;" onclick="EroiApp.deleteGuide('${g.id}')" title="${isPreset ? 'Nascondi scheda (ripristinabile)' : 'Elimina definitivamente'}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });

      this.renderGuideTrash();
    },

    deleteGuide: function(guideId) {
      const isPreset = window.EroiDB.isPresetStudyGuide(guideId);
      const teacher = Auth.getUser();
      if (isPreset) {
        if (confirm(`Nascondere la scheda didattica preset "${guideId}"?\nPotrà essere ripristinata in qualsiasi momento.`)) {
          window.EroiDB.hideStudyGuide(guideId);
          window.EroiDB.logActivity(teacher.email, `Nascosta la scheda studio preset: ${guideId}`);
          this.showToast('Scheda nascosta. Puoi ripristinarla dal cestino.', 'success');
          this.renderTeacherGuides();
        }
      } else {
        if (confirm(`Eliminare definitivamente la scheda "${guideId}"? Questa azione non è reversibile.`)) {
          window.EroiDB.deleteStudyGuide(guideId);
          window.EroiDB.logActivity(teacher.email, `Eliminata definitivamente scheda studio: ${guideId}`);
          this.showToast('Scheda studio rimossa.', 'success');
          this.renderTeacherGuides();
        }
      }
    },

    restoreGuide: function(guideId) {
      window.EroiDB.restoreStudyGuide(guideId);
      const teacher = Auth.getUser();
      window.EroiDB.logActivity(teacher.email, `Ripristinata scheda studio preset: ${guideId}`);
      this.showToast('Scheda ripristinata ai valori originali.', 'success');
      this.renderTeacherGuides();
    },

    renderGuideTrash: function() {
      const hidden = window.EroiDB.getHiddenStudyGuides();
      let panel = document.getElementById('guides-trash-panel');
      if (hidden.length === 0) { if (panel) panel.style.display = 'none'; return; }
      if (!panel) {
        panel = document.createElement('div');
        panel.id = 'guides-trash-panel';
        panel.className = 'glass-panel';
        panel.style.marginTop = '20px';
        const ref = document.querySelector('#teacher-guides-table').closest('.glass-panel');
        if (ref) ref.after(panel); else return;
      }
      panel.style.display = 'block';
      panel.innerHTML = `
        <h3 class="panel-title" style="color:var(--text-muted);">
          <i class="fa-solid fa-trash-can-arrow-up" style="color:var(--gold);"></i> Schede Didattiche Nascoste
          <span style="background:rgba(212,175,55,0.15);color:var(--gold);font-size:0.78rem;padding:2px 10px;border-radius:20px;margin-left:8px;font-family:var(--font-body);">${hidden.length}</span>
        </h3>
        <p style="color:var(--text-muted);font-size:0.83rem;margin-bottom:16px;">Schede predefinite nascoste — ripristinabili in qualsiasi momento.</p>
        <div class="table-responsive">
          <table class="game-table" style="border-top: 1px dashed rgba(212,175,55,0.25);">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titolo</th>
                <th>Categoria</th>
                <th>Riassunto</th>
                <th>Azione</th>
              </tr>
            </thead>
            <tbody>
              ${hidden.map(g => `
                <tr>
                  <td><strong>${g.id}</strong> <span style="font-size:0.68rem; background:rgba(212,175,55,0.1); color:var(--gold); border:1px solid rgba(212,175,55,0.3); border-radius:4px; padding:1px 5px; margin-left:4px;">🔒 preset</span></td>
                  <td>${g.title}</td>
                  <td>${g.category}</td>
                  <td style="font-size:0.82rem;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${g.summary}</td>
                  <td>
                    <button class="btn btn-secondary" style="padding:4px 10px; font-size:0.75rem;" onclick="EroiApp.restoreGuide('${g.id}')">
                      <i class="fa-solid fa-rotate-left"></i> Ripristina
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    },


    // --- TEACHER LOGS ---
    renderTeacherLogs: function() {
      const logs = window.EroiDB.getLogs();
      const tbody = document.querySelector('#teacher-logs-table tbody');
      tbody.innerHTML = '';

      logs.forEach(l => {
        const tr = document.createElement('tr');
        const d = new Date(l.timestamp);
        tr.innerHTML = `
          <td style="font-size:0.8rem; color:var(--text-muted);">${d.toLocaleDateString()} ${d.toLocaleTimeString()}</td>
          <td><strong style="font-size:0.8rem;">${l.user}</strong></td>
          <td style="font-size:0.85rem;">${l.action}</td>
        `;
        tbody.appendChild(tr);
      });
    },

    joinClassByCode: function() {
      const codeInput = document.getElementById('join-class-code');
      if (!codeInput) return;
      const code = codeInput.value.trim().toUpperCase();
      if (!code) {
        this.showToast("Inserisci un codice classe.", "danger");
        return;
      }

      const targetClass = window.EroiDB.getClassByCode(code);
      if (!targetClass) {
        this.showToast("Codice errato. Classe non trovata.", "danger");
        return;
      }

      const user = Auth.getUser();
      if (!user) return;

      const dbUser = window.EroiDB.getUser(user.email);
      if (dbUser) {
        dbUser.classId = targetClass.id;
        window.EroiDB.saveUser(user.email, dbUser);

        // Aggiorna sessione locale
        user.classId = targetClass.id;
        localStorage.setItem('eroi_viaggio_session', JSON.stringify(user));

        window.EroiDB.logActivity(user.email, `Iscritto alla classe: ${targetClass.name} (${targetClass.id}) con codice ${code}`);
        this.showToast(`Benvenuto nella classe ${targetClass.name}!`, "success");

        // Forza render della dashboard
        this.renderStudentDashboard(user.email);
      }
    },

    leaveClass: function() {
      if (!confirm("Sei sicuro di voler abbandonare questa classe? Non parteciperai più ai tornei di classe.")) {
        return;
      }

      const user = Auth.getUser();
      if (!user) return;

      const dbUser = window.EroiDB.getUser(user.email);
      if (dbUser) {
        const oldClassId = dbUser.classId;
        dbUser.classId = "";
        window.EroiDB.saveUser(user.email, dbUser);

        // Aggiorna sessione locale
        user.classId = null;
        localStorage.setItem('eroi_viaggio_session', JSON.stringify(user));

        window.EroiDB.logActivity(user.email, `Abbandonata la classe ${oldClassId}.`);
        this.showToast("Hai lasciato la classe.", "success");

        this.renderStudentDashboard(user.email);
      }
    },

    joinClassAsCollaborator: function(code) {
      if (!code) return;
      const targetClass = window.EroiDB.getClassByCode(code);
      if (!targetClass) {
        this.showToast("Classe non trovata. Controlla il codice.", "danger");
        return;
      }

      const teacher = Auth.getUser();
      if (!teacher) return;

      if (targetClass.teacher === teacher.email) {
        this.showToast("Sei già il docente principale di questa classe.", "danger");
        return;
      }

      window.EroiDB.joinClassAsCollaborator(targetClass.id, teacher.email);
      window.EroiDB.logActivity(teacher.email, `Unito come collaboratore alla classe ${targetClass.name} (${targetClass.id}).`);
      this.showToast(`Unito come collaboratore alla classe ${targetClass.name}!`, "success");

      this.renderTeacherClasses();
      this.populateClassSelects();
      this.renderTeacherStudents();
      this.renderTeacherStats();
      this.renderTeacherTournaments();
    },

    leaveClassAsCollaborator: function(classId) {
      if (!confirm(`Abbandonare la collaborazione con la classe ${classId}?`)) {
        return;
      }

      const teacher = Auth.getUser();
      if (!teacher) return;

      window.EroiDB.leaveClassAsCollaborator(classId, teacher.email);
      window.EroiDB.logActivity(teacher.email, `Abbandonata la collaborazione con la classe ${classId}.`);
      this.showToast("Collaborazione abbandonata.", "success");

      this.renderTeacherClasses();
      this.populateClassSelects();
      this.renderTeacherStudents();
      this.renderTeacherStats();
      this.renderTeacherTournaments();
    },

    deleteTournament: function(id) {
      if (!confirm("Sei sicuro di voler eliminare questo torneo?")) {
        return;
      }

      window.EroiDB.deleteTournament(id);
      const user = Auth.getUser();
      window.EroiDB.logActivity(user.email, `Eliminato il torneo interno ${id}.`);
      this.showToast("Torneo eliminato con successo.", "success");

      this.renderTeacherTournaments();
    },

    renderTeacherTournaments: function() {
      const user = Auth.getUser();
      if (!user) return;

      const classes = window.EroiDB.getClasses();
      const myClasses = Object.values(classes).filter(c => {
        if (user.role === 'admin') return true;
        return c.teacher === user.email || (c.collaborators && c.collaborators.includes(user.email));
      });

      // Popola checkbox nel form di creazione
      const checkboxContainer = document.getElementById('tournament-classes-checkboxes');
      if (checkboxContainer) {
        if (myClasses.length === 0) {
          checkboxContainer.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted); font-style:italic;">Crea prima una classe per avviare un torneo.</p>`;
        } else {
          checkboxContainer.innerHTML = myClasses.map(c => `
            <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-light); cursor: pointer;">
              <input type="checkbox" name="tournament-classes" value="${c.id}" style="accent-color: var(--gold);">
              <span>${c.name} (${c.id})</span>
            </label>
          `).join('');
        }
      }

      // Popola la lista dei tornei attivi
      const tournamentsContainer = document.getElementById('tournaments-list-container');
      if (tournamentsContainer) {
        const tournaments = window.EroiDB.getTournaments();
        const visibleTournaments = tournaments.filter(t => {
          if (user.role === 'admin') return true;
          return t.classes && t.classes.some(classId => myClasses.some(mc => mc.id === classId));
        });

        if (visibleTournaments.length === 0) {
          tournamentsContainer.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted); text-align:center; padding: 20px 0;">Nessun torneo attivo al momento.</p>`;
          return;
        }

        let html = '';
        visibleTournaments.forEach(t => {
          const leaderboard = [];
          t.classes.forEach(classId => {
            const c = classes[classId];
            if (!c) return;

            const classStudents = window.EroiDB.getAllStudents().filter(s => {
              const u = window.EroiDB.getUser(s.email);
              return u && u.classId === classId;
            });

            const totalXP = classStudents.reduce((sum, s) => sum + (s.xp || 0), 0);
            const avgXP = classStudents.length > 0 ? Math.round(totalXP / classStudents.length) : 0;

            leaderboard.push({
              classId: classId,
              className: c.name,
              studentCount: classStudents.length,
              avgXP: avgXP
            });
          });

          leaderboard.sort((a, b) => b.avgXP - a.avgXP);

          const rowsHtml = leaderboard.map((item, idx) => {
            let medal = '';
            if (idx === 0) medal = '🥇 ';
            else if (idx === 1) medal = '🥈 ';
            else if (idx === 2) medal = '🥉 ';
            
            return `
              <tr style="background: ${idx === 0 ? 'rgba(212,175,55,0.05)' : 'transparent'};">
                <td style="text-align: center; font-weight: bold; color: ${idx === 0 ? 'var(--gold)' : 'inherit'};">${medal}${idx + 1}</td>
                <td><strong>${item.className}</strong> <span style="font-size: 0.72rem; color: var(--text-muted);">(${item.classId})</span></td>
                <td style="text-align: center;">${item.studentCount}</td>
                <td style="text-align: right; font-weight: bold; color: var(--gold);">${item.avgXP} XP</td>
              </tr>
            `;
          }).join('');

          html += `
            <div style="margin-bottom: 25px; padding: 15px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px;">
                <h4 style="color: var(--gold); font-size: 1.05rem; font-family: var(--font-heading); margin: 0; display: flex; align-items: center; gap: 8px;">
                  🏆 ${t.name}
                </h4>
                <button class="btn btn-danger" style="padding: 4px 8px; font-size: 0.72rem;" onclick="EroiApp.deleteTournament('${t.id}')">
                  <i class="fa-solid fa-trash"></i> Elimina
                </button>
              </div>
              <div class="table-responsive">
                <table class="game-table" style="margin-bottom: 0; font-size: 0.82rem;">
                  <thead>
                    <tr>
                      <th style="width: 50px; text-align: center;">Pos</th>
                      <th>Classe</th>
                      <th style="width: 80px; text-align: center;">Studenti</th>
                      <th style="text-align: right;">Media XP</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rowsHtml.length > 0 ? rowsHtml : `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Nessuna classe valida in questo torneo.</td></tr>`}
                  </tbody>
                </table>
              </div>
            </div>
          `;
        });

        tournamentsContainer.innerHTML = html;
      }
    },

    // --- ADMIN DASHBOARD ---
    renderAdminDashboard: function() {
      const settings = window.EroiDB.getSettings();
      
      // Ricarica input impostazioni globali
      document.getElementById('admin-setting-appname').value = settings.appName;
      document.getElementById('admin-setting-copyright').value = settings.copyright;
      document.getElementById('admin-setting-contacts').value = settings.contacts;

      this.renderPendingRequests();
      this.renderAdminStaff();
      
      // Renderizza componenti spostati da Teacher a Admin
      this.renderTeacherMissions();
      this.renderTeacherShop();
      this.renderTeacherHelpersAndArtifacts();
      this.renderTeacherGuides();
      this.renderTeacherLogs();

      // Renderizza analytics shop
      const shopLogs = window.EroiDB.getLogs().filter(l => l.action.includes("Acquistato"));
      const analyticsBox = document.getElementById('shop-analytics-info');
      
      if (analyticsBox) {
          if (shopLogs.length === 0) {
            analyticsBox.innerHTML = `<p><i>Nessun acquisto ancora effettuato nello shop da parte degli studenti.</i></p>`;
          } else {
            const counts = {};
            shopLogs.forEach(l => {
              const match = l.action.match(/"([^"]+)"/);
              if (match) {
                const name = match[1];
                counts[name] = (counts[name] || 0) + 1;
              }
            });
            let listHtml = '<ul>';
            Object.keys(counts).forEach(name => {
              listHtml += `<li>🛍️ <strong>${name}</strong>: acquistato ${counts[name]} volte</li>`;
            });
            listHtml += '</ul>';
            analyticsBox.innerHTML = `
              <p style="margin-bottom: 10px;">Storico acquisti registrato. Prodotti popolari nel regno:</p>
              ${listHtml}
            `;
          }
      }

      // Documenti legali
      document.getElementById('legal-doc-privacy').value = settings.privacy || '';
      document.getElementById('legal-doc-terms').value = settings.terms || '';
      document.getElementById('legal-doc-cookies').value = settings.cookies || '';
      document.getElementById('legal-doc-gdpr').value = settings.gdpr || '';

      this.renderPendingRequests();
      this.renderAdminStaff();
      this.renderAdminAllUsers();
    },

    renderPendingRequests: async function() {
      const tbody = document.querySelector('#admin-pending-table tbody');
      tbody.innerHTML = '<tr><td colspan="5">Caricamento richieste in corso...</td></tr>';
      
      try {
        const requests = await window.EroiDB.getTeacherRequests();
        tbody.innerHTML = '';
        
        if (requests.length === 0) {
          tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Nessuna richiesta in attesa</td></tr>';
          return;
        }
        
        requests.forEach(req => {
          const tr = document.createElement('tr');
          // Salviamo i dati completi codificati in base64 per sicurezza nei pulsanti
          const reqStr = btoa(encodeURIComponent(JSON.stringify(req)));
          tr.innerHTML = `
            <td><strong>${req.name}</strong></td>
            <td>${req.email}</td>
            <td>${req.scuola}</td>
            <td>${req.citta}</td>
            <td style="display: flex; gap: 5px;">
              <button class="btn" style="padding: 4px 8px; font-size:0.75rem;" onclick="EroiApp.approveTeacher('${req.id}', '${reqStr}')">
                <i class="fa-solid fa-check"></i> Approva
              </button>
              <button class="btn btn-danger" style="padding: 4px 8px; font-size:0.75rem;" onclick="EroiApp.rejectTeacher('${req.id}')">
                <i class="fa-solid fa-times"></i> Rifiuta
              </button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      } catch (e) {
        console.error("Errore recupero richieste:", e);
        tbody.innerHTML = '<tr><td colspan="5" style="color:red;">Errore durante il caricamento</td></tr>';
      }
    },

    approveTeacher: async function(requestId, encodedData) {
      if (!confirm("Sei sicuro di voler approvare questo docente? Avrà pieno accesso al pannello docenti.")) return;
      try {
        const data = JSON.parse(decodeURIComponent(atob(encodedData)));
        await window.EroiDB.approveTeacherRequest(requestId, data);
        this.showToast("Docente approvato con successo!", "success");
        this.renderPendingRequests();
        this.renderAdminStaff();
        
        // Apertura client mail (mailto)
        const email = data.email;
        const nomeDocente = data.name || 'Docente';
        const emailSubject = encodeURIComponent('✅ Benvenuto ne La Rotta degli Eroi!');
        const emailBody = encodeURIComponent(
            `Ciao ${nomeDocente}!\n\n` +
            `La tua richiesta di iscrizione a La Rotta degli Eroi è stata APPROVATA. 🎉\n` +
            `Da adesso puoi accedere alla piattaforma con la tua email: ${email}\n\n` +
            `Potrai creare le tue squadre, consultare le missioni e gestire i tuoi studenti.\n\n` +
            `Aiutaci a far crescere la community! Aggiungi SEMPRE il seguente invito a fine percorso:\n` +
            `https://prof-memmo.github.io/games/condividi-esperienza.html\n\n` +
            `Che l'epica sia con te!\n` +
            `Il Team de La Rotta degli Eroi`
        );
        window.location.href = `mailto:${email}?subject=${emailSubject}&body=${emailBody}`;
      } catch (e) {
        console.error("Errore approvazione docente:", e);
        alert("Errore durante l'approvazione: " + e.message);
      }
    },

    rejectTeacher: async function(requestId) {
      if (!confirm("Sei sicuro di voler rifiutare ed eliminare questa richiesta?")) return;
      try {
        await window.EroiDB.rejectTeacherRequest(requestId);
        this.showToast("Richiesta rifiutata ed eliminata.", "success");
        this.renderPendingRequests();
      } catch (e) {
        console.error("Errore rifiuto docente:", e);
        alert("Errore durante l'operazione: " + e.message);
      }
    },

    renderAdminStaff: function() {
      const users = window.EroiDB.getAllUsers().filter(u => u.role === 'teacher' || u.role === 'admin');
      const tbody = document.querySelector('#admin-staff-table tbody');
      tbody.innerHTML = '';

      users.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${u.name}</strong></td>
          <td>${u.email}</td>
          <td><span style="text-transform:uppercase; font-size:0.75rem; font-weight:bold; color:var(--gold);">${u.role}</span></td>
          <td>
            ${u.email !== 'prof.memmo@gmail.com' ? `
              <button class="btn btn-danger" style="padding: 4px 8px; font-size:0.75rem;" onclick="EroiApp.deleteStaff('${u.email}')">
                <i class="fa-solid fa-trash"></i> Rimuovi
              </button>
            ` : '<i>Admin Principale</i>'}
          </td>
        `;
        tbody.appendChild(tr);
      });
    },

    deleteStaff: function(email) {
      if (confirm(`Eliminare definitivamente l'account staff ${email}? Non potrà più accedere.`)) {
        window.EroiDB.deleteUser(email);
        window.EroiDB.logActivity("admin", `Eliminato l'account staff: ${email}`);
        this.showToast("Membro dello staff rimosso.", "success");
        this.renderAdminStaff();
      }
    },

    renderAdminAllUsers: function() {
      const users = window.EroiDB.getAllUsers();
      const tbody = document.querySelector('#admin-all-users-table tbody');
      if(!tbody) return;
      tbody.innerHTML = '';

      if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">Nessun utente trovato</td></tr>';
        return;
      }

      users.forEach(u => {
        const tr = document.createElement('tr');
        const isDocente = u.role === 'docente' || u.role === 'admin' || u.role === 'teacher';
        
        tr.innerHTML = `
          <td><strong>${u.name || 'Sconosciuto'}</strong></td>
          <td>${u.email}</td>
          <td>
            <select class="input-field" style="padding: 4px; font-size: 0.75rem; width: auto;" onchange="EroiApp.changeUserRole('${u.email}', this.value)" ${u.email === 'prof.memmo@gmail.com' ? 'disabled' : ''}>
              <option value="student" ${!isDocente ? 'selected' : ''}>Studente</option>
              <option value="docente" ${isDocente ? 'selected' : ''}>Docente</option>
            </select>
          </td>
          <td>
            ${u.email !== 'prof.memmo@gmail.com' ? `
              <button class="btn btn-danger" style="padding: 4px 8px; font-size:0.75rem;" onclick="EroiApp.deleteUserAdmin('${u.email}')">
                <i class="fa-solid fa-trash"></i> Elimina
              </button>
            ` : '<span style="color:var(--text-muted); font-size:0.75rem;">Admin Intoccabile</span>'}
          </td>
        `;
        tbody.appendChild(tr);
      });
    },

    changeUserRole: async function(email, newRole) {
      if (!confirm(`Sei sicuro di voler cambiare il ruolo di ${email} in ${newRole.toUpperCase()}?`)) {
        this.renderAdminAllUsers(); // reset select
        return;
      }
      try {
        await window.EroiDB.updateUserRole(email, newRole);
        this.showToast(`Ruolo di ${email} aggiornato a ${newRole}.`, "success");
        this.renderAdminStaff();
        this.renderAdminAllUsers();
      } catch (e) {
        console.error("Errore cambio ruolo:", e);
        alert("Errore durante l'operazione: " + e.message);
      }
    },

    deleteUserAdmin: async function(email) {
      if (!confirm(`Sei ASSOLUTAMENTE sicuro di voler eliminare DEFINITIVAMENTE l'utente ${email}? L'azione è irreversibile e cancellerà anche i suoi progressi se è studente.`)) return;
      try {
        await window.EroiDB.deleteUser(email);
        this.showToast(`Utente ${email} eliminato.`, "success");
        this.renderAdminStaff();
        this.renderAdminAllUsers();
      } catch (e) {
        console.error("Errore eliminazione utente:", e);
        alert("Errore durante l'operazione: " + e.message);
      }
    },

    // --- REGOLAMENTO ---
    renderRegolamento: function(user) {
      const rules = window.EroiDB.getRegolamenti();
      
      const studBox = document.getElementById('rules-student-box');
      const teachBox = document.getElementById('rules-teacher-box');
      const teachSection = document.getElementById('rules-teacher-section');

      studBox.innerHTML = rules.studente.map(r => `
        <div style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.02); border-left:3px solid var(--gold); border-radius:4px;">
          <strong style="color:var(--text-light); font-size:0.95rem;">${r.titolo}</strong>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:5px; line-height:1.4;">${r.testo}</p>
        </div>
      `).join('');

      // Mostra sezione docenti solo a docenti e amministratori
      if (user.role === 'docente' || user.role === 'admin') {
        teachSection.style.display = 'block';
        teachBox.innerHTML = rules.docente.map(r => `
          <div style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.02); border-left:3px solid var(--gold); border-radius:4px;">
            <strong style="color:var(--text-light); font-size:0.95rem;">${r.titolo}</strong>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:5px; line-height:1.4;">${r.testo}</p>
          </div>
        `).join('');
      } else {
        teachSection.style.display = 'none';
      }
    },

    // --- BACKUP SYSTEMS ---
    triggerBackupExport: function() {
      try {
        const json = window.EroiDB.exportBackup();
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `eroi_in_viaggio_db_backup_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        window.EroiDB.logActivity("admin", "Backup del database esportato con successo in formato JSON.");
        this.showToast("Backup JSON scaricato!", "success");
      } catch (e) {
        alert("Errore esportazione: " + e.message);
      }
    },

    triggerBackupImport: function(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      const self = this;
      reader.onload = function(e) {
        const success = window.EroiDB.importBackup(e.target.result);
        if (success) {
          self.showToast("Database ripristinato con successo!", "success");
          self.renderAdminDashboard();
          self.renderFooterDetails();
        } else {
          alert("Errore: Il file di backup non è valido o è corrotto.");
        }
      };
      reader.readAsText(file);
    },

    triggerCSVExport: function() {
      try {
        const csv = window.EroiDB.exportStudentsCSV();
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `studenti_eroi_viaggio_${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        window.EroiDB.logActivity("admin", "Anagrafiche studenti esportate in formato CSV.");
        this.showToast("Report CSV scaricato!", "success");
      } catch (e) {
        alert("Errore esportazione CSV: " + e.message);
      }
    },

    triggerDatabaseReset: function() {
      if (confirm("ATTENZIONE! Questa operazione distruggerà tutti i progressi degli studenti, le classi e le missioni create ripristinando il database ai dati di fabbrica fittizi. Vuoi procedere?")) {
        window.EroiDB.resetDatabase();
        this.showToast("Database ripristinato!", "success");
        this.renderAdminDashboard();
        this.renderFooterDetails();
        // Ricarica per pulire lo stato in memoria
        window.location.reload();
      }
    },

    archiviaAnnoCorrente: async function() {
      const currentYear = new Date().getFullYear();
      if(!confirm(`Sei ASSOLUTAMENTE sicuro di voler archiviare l'anno ${currentYear}?`)) return;
      try {
          const backupName = prompt("Inserisci un nome per l'archivio (es: Eroi_${currentYear}_${currentYear+1}):", `Archivio_${currentYear}`);
          if(!backupName) return;
          
          const usersSnapshot = await window.fbDb.collection('users').get();
          let batch = window.fbDb.batch();
          
          usersSnapshot.docs.forEach(doc => {
              const data = doc.data();
              if (data.role !== 'admin' && data.role !== 'docente') {
                  batch.update(doc.ref, { archivedYear: backupName, status: 'archived', classId: null, classCode: null });
              }
          });

          await batch.commit();
          this.showToast(`Archiviazione "${backupName}" completata. Gli studenti sono stati archiviati.`, 'success');
          setTimeout(() => window.location.reload(), 1500);
      } catch(e) {
          console.error(e);
          alert("Errore archiviazione: " + e.message);
      }
    },

    // --- LEGAL POPUPS ---
    openLegalModal: function(docKey) {
      // Contatti: usa il modal personalizzato stile palestra
      if (docKey === 'contacts') {
        window.showContattiModal();
        return;
      }
      
      const title = document.getElementById('modal-legal-title');
      const body = document.getElementById('modal-legal-body');

      // Privacy e Termini: usa il testo ricco di LEGAL_TEXTS (formattato con h3/p)
      if (docKey === 'privacy' || docKey === 'terms') {
        title.textContent = docKey === 'privacy' ? 'Privacy Policy' : 'Termini e Condizioni';
        body.innerHTML = LEGAL_TEXTS[docKey] || 'Contenuto non disponibile.';
        document.getElementById('modal-legal').classList.add('active');
        return;
      }

      // Altri documenti (cookies, gdpr): usa testo da settings
      const settings = window.EroiDB.getSettings();
      let heading = '';
      let text = '';

      if (docKey === 'cookies') {
        heading = 'Cookie Policy';
        text = settings.cookies;
      } else if (docKey === 'gdpr') {
        heading = 'Informativa GDPR';
        text = settings.gdpr;
      }

      title.textContent = heading;
      body.innerHTML = (text || '').replace(/\n/g, '<br>');
      document.getElementById('modal-legal').classList.add('active');
    },

    closeLegalModal: function() {
      document.getElementById('modal-legal').classList.remove('active');
    },

    // --- TOAST NOTIFICATIONS ---
    showToast: function(message, type) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = `toast toast-${type || 'success'}`;
      
      let icon = '🔔';
      if (type === 'success') icon = '✅';
      else if (type === 'danger') icon = '❌';
      else if (type === 'level') icon = '👑';

      toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
      container.appendChild(toast);

      // Rimuove dopo 5 secondi (in conformità con l'animazione CSS fadeOut)
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 5000);
    },

    // --- DIARIO DI BORDO ---
    getDiaryPrompts: function(area) {
      const allPrompts = {
        "Accademia": [
          { label: "Impressioni ed Emozioni", prompt: "Descrivi le tue sensazioni nell'iniziare questo viaggio nell'Epica. Quale aspetto di questo mondo ti incuriosisce di più?" },
          { label: "Analisi delle Tematiche", prompt: "Rifletti sulla differenza tra mito, leggenda ed epica. Perché pensi che i popoli antichi avessero bisogno di raccontare storie?" },
          { label: "Riformulazione o Argomentazione", prompt: "Spiega con parole tue cos'è l'Epica e quali sono le sue caratteristiche fondamentali." }
        ],
        "Miti di Fondazione": [
          { label: "Impressioni ed Emozioni", prompt: "Quale dei miti di fondazione che hai studiato (Roma, Atene, Tebe...) ti ha colpito maggiormente e perché?" },
          { label: "Analisi delle Tematiche", prompt: "Rifletti sull'importanza di avere un mito di fondazione per una città o un popolo. Che legame c'è tra identità e racconto?" },
          { label: "Riformulazione o Argomentazione", prompt: "Scegli un mito di fondazione e riassumi le tappe fondamentali della nascita della città (es. la vacca sacra per Tebe o la contesa per Atene)." }
        ],
        "Biblioteca": [
          { label: "Impressioni ed Emozioni", prompt: "Pensa alla figura di Omero come cantore cieco. Quali emozioni ti suscita l'idea che poesie così grandiose siano nate dall'oralità?" },
          { label: "Analisi delle Tematiche", prompt: "La figura del poeta (aedo o rapsodo) era considerata sacra e ispirata dagli dei. Perché il poeta ha questo ruolo così importante?" },
          { label: "Riformulazione o Argomentazione", prompt: "Illustra cos'è la Questione Omerica e quali sono le principali tesi a riguardo." }
        ],
        "Archivio": [
          { label: "Impressioni ed Emozioni", prompt: "Tra l'Iliade, l'Odissea e l'Eneide, quale proemio o incipit ti sembra più avvincente e perché?" },
          { label: "Analisi delle Tematiche", prompt: "Confronta il fine dei tre grandi poemi classici: l'ira nell'Iliade, il nostos nell'Odissea, la pietas e rifondazione nell'Eneide." },
          { label: "Riformulazione o Argomentazione", prompt: "Scegli uno dei tre poemi ed elenca in modo sintetico la struttura in canti e il tema principale." }
        ],
        "Olimpo": [
          { label: "Impressioni ed Emozioni", prompt: "Se potessi incontrare una divinità dell'Olimpo, chi sceglieresti? Descrivi come immagini questo incontro e cosa le chiederesti." },
          { label: "Analisi delle Tematiche", prompt: "Gli dei greci sono antropomorfi, cioè hanno passioni e difetti umani. Come influenza questo la vita e il destino degli eroi?" },
          { label: "Riformulazione o Argomentazione", prompt: "Spiega le funzioni principali del pantheon greco e descrivi i simboli di due divinità a tua scelta." }
        ],
        "Creta": [
          { label: "Impressioni ed Emozioni", prompt: "Mettiti nei panni di Teseo che entra nel labirinto per affrontare il Minotauro. Quali sono le tue paure ed emozioni?" },
          { label: "Analisi delle Tematiche", prompt: "Il Labirinto è un simbolo universale. Che cosa rappresenta per te? Quali sono i 'minotauri' e i 'labirinti' della nostra vita quotidiana?" },
          { label: "Riformulazione o Argomentazione", prompt: "Riassumi il mito del filo di Arianna e spiega come Teseo riesce a sconfiggere il mostro e fuggire." }
        ],
        "Troia": [
          { label: "Impressioni ed Emozioni", prompt: "Descrivi il tragico addio tra Ettore e Andromaca. Quali sentimenti provi di fronte al conflitto tra affetto familiare e dovere militare?" },
          { label: "Analisi delle Tematiche", prompt: "L'amicizia tra Achille e Patroclo: scrivi cosa rappresenta per te l'amicizia vera e descrivi un tuo amico speciale o un gesto importante di fedeltà." },
          { label: "Riformulazione o Argomentazione", prompt: "Riformula in breve la trama dell'Iliade, spiegando l'ira di Achille e la caduta di Ettore." }
        ],
        "Itaca": [
          { label: "Impressioni ed Emozioni", prompt: "Mettiti nei panni di Ulisse che, dopo vent'anni di viaggio, rivede finalmente le coste rocciose della sua Itaca. Cosa prova?" },
          { label: "Analisi delle Tematiche", prompt: "Il tema del 'nostos' (ritorno). Che cosa significa per te sentirti 'a casa'? Descrivi un luogo o uno stato d'animo che rappresenta il tuo porto sicuro." },
          { label: "Riformulazione o Argomentazione", prompt: "Pensi che l'astuzia di Ulisse sia sempre una qualità positiva, o ci sono casi in cui l'inganno diventa scorretto? Argomenta la tua risposta." }
        ],
        "Lazio": [
          { label: "Impressioni ed Emozioni", prompt: "Descrivi il tormento interiore di Enea costretto a lasciare Didone per seguire il Fato. Provi più simpatia per il dovere di Enea o il dolore di Didone?" },
          { label: "Analisi delle Tematiche", prompt: "Il valore della 'pietas' virgiliana. Come si differenzia la pietas (dovere collettivo) dall'individualismo eroico di Achille?" },
          { label: "Riformulazione o Argomentazione", prompt: "Spiega in sintesi gli eventi che portano all'unione tra Troiani e Latini nel Lazio, ponendo fine alla guerra." }
        ],
        "Aquisgrana": [
          { label: "Impressioni ed Emozioni", prompt: "Come immagini la vita alla corte di Carlo Magno tra cavalieri e paladini? Quale figura ti affascina di più?" },
          { label: "Analisi delle Tematiche", prompt: "I paladini combattono per la fede e l'imperatore. Quali sono i valori della cavalleria medievale e come si differenziano da quelli degli eroi antichi?" },
          { label: "Riformulazione o Argomentazione", prompt: "Presenta in sintesi la figura dell'Imperatore Carlo Magno e il ruolo della sua corte nel ciclo carolingio." }
        ],
        "Roncisvalle": [
          { label: "Impressioni ed Emozioni", prompt: "Mettiti nei panni di Orlando che rifiuta di suonare l'Olifante per orgoglio e onore. Condividi la sua scelta o la reputi un errore tragico?" },
          { label: "Analisi delle Tematiche", prompt: "Il sacrificio eroico e il tradimento di Gano. Rifletti sul valore della lealtà verso i propri compagni d'arme." },
          { label: "Riformulazione o Argomentazione", prompt: "Riassumi lo svolgimento della battaglia di Roncisvalle e il destino finale di Orlando e della spada Durendal." }
        ],
        "Camelot": [
          { label: "Impressioni ed Emozioni", prompt: "Immagina di sederti alla Tavola Rotonda di Re Artù. Come ti fa sentire l'idea che tutti i presenti, dal re all'ultimo cavaliere, siano uguali?" },
          { label: "Analisi delle Tematiche", prompt: "La Tavola Rotonda come ideale di giustizia e uguaglianza. Pensi che questa utopia sia realizzabile nella società di oggi?" },
          { label: "Riformulazione o Argomentazione", prompt: "Descrivi il mito della spada nella roccia e come Artù divenne re di Britannia." }
        ],
        "Foresta di Brocelandia": [
          { label: "Impressioni ed Emozioni", prompt: "La foresta magica è luogo di incantesimi, fate e smarrimento. Ti spaventa o ti affascina l'ignoto e la magia?" },
          { label: "Analisi delle Tematiche", prompt: "L'amore cortese tra Lancillotto e Ginevra. Quale conflitto si crea tra la passione personale e il dovere di lealtà verso il proprio re?" },
          { label: "Riformulazione o Argomentazione", prompt: "Descrivi il ruolo di Merlino e della fata Viviana negli incantesimi legati alla foresta di Brocelandia." }
        ],
        "Castello del Graal": [
          { label: "Impressioni ed Emozioni", prompt: "Mettiti nei panni di Parsifal che vede passare il Graal ma esita a fare la domanda fondamentale. Quali emozioni provi di fronte al timore di sbagliare?" },
          { label: "Analisi delle Tematiche", prompt: "La cerca (Quest) spirituale. Ognuno di noi ha il suo 'Graal' da cercare. Che cos'è per te la ricerca della felicità o della tua strada?" },
          { label: "Riformulazione o Argomentazione", prompt: "Spiega cos'è il Santo Graal e perché rappresenta la più elevata avventura dei cavalieri della Tavola Rotonda." }
        ],
        "Worms": [
          { label: "Impressioni ed Emozioni", prompt: "Come giudichi l'inganno ordito da Sigfrido per aiutare Gunther a sposare Brunilde? Quali saranno secondo te le conseguenze dell'inganno?" },
          { label: "Analisi delle Tematiche", prompt: "L'invidia, l'onore ferito e l'oro maledetto dei Nibelunghi. Rifletti su come il desiderio di ricchezza possa corrompere gli animi." },
          { label: "Riformulazione o Argomentazione", prompt: "Riassumi le imprese di Sigfrido (l'uccisione di Fafnir, il sangue del drago, la conquista del tesoro)." }
        ],
        "Reno": [
          { label: "Impressioni ed Emozioni", prompt: "Crimilde compie una vendetta sanguinosa e implacabile. Pensi che il suo dolore giustifichi una simile ferocia?" },
          { label: "Analisi delle Tematiche", prompt: "La spirale d'odio e vendetta che porta alla rovina totale nel Canto dei Nibelunghi. Come si può interrompere una catena di risentimenti?" },
          { label: "Riformulazione o Argomentazione", prompt: "Spiega come si conclude il Canto dei Nibelunghi e cosa accade al mitico oro nel fiume Reno." }
        ]
      };
      return allPrompts[area] || [
        { label: "Riflessione 1", prompt: "Scrivi le tue impressioni su questo luogo o capitolo sbloccato." },
        { label: "Riflessione 2", prompt: "Quali sono i valori o le tematiche più importanti emersi?" },
        { label: "Riflessione 3", prompt: "Riassumi o argomenta brevemente quanto hai appreso in questa lezione." }
      ];
    },

    renderDiario: function(studentEmail) {
      
      const _u_profile = window.EroiDB.getUser(studentEmail);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(studentEmail) : window.EroiDB.getStudentProfile(studentEmail);
      if (!profile) return;
      
      const unlockedAreas = profile.unlockedAreas || [];
      const diaries = window.EroiDB.getDiaries();

      const nodeListContainer = document.getElementById('diario-nodes-list');
      if (!nodeListContainer) return;

      nodeListContainer.innerHTML = '';

      const allAreas = [
        "Accademia",
        "Miti di Fondazione",
        "Biblioteca",
        "Archivio",
        "Olimpo",
        "Creta",
        "Troia",
        "Itaca",
        "Lazio",
        "Aquisgrana",
        "Roncisvalle",
        "Camelot",
        "Foresta di Brocelandia",
        "Castello del Graal",
        "Worms",
        "Reno"
      ];

      const areaTitles = {
        "Accademia": "L'inizio del Viaggio",
        "Miti di Fondazione": "Miti di Fondazione",
        "Biblioteca": "Gli Autori",
        "Archivio": "Le Opere",
        "Olimpo": "Olimpo",
        "Creta": "Creta",
        "Troia": "Troia",
        "Itaca": "Itaca",
        "Lazio": "Lazio",
        "Aquisgrana": "Aquisgrana",
        "Roncisvalle": "Roncisvalle",
        "Camelot": "Camelot",
        "Foresta di Brocelandia": "Brocelandia",
        "Castello del Graal": "Castello del Graal",
        "Worms": "Worms",
        "Reno": "Fiume Reno"
      };

      const settings = window.EroiDB.getSettings() || {};
      const activeDiaries = settings.activeDiaries || ["Accademia"];

      if (!window.activeDiarioArea) {
        window.activeDiarioArea = "Accademia";
      }

      // Legenda rimossa
      nodeListContainer.innerHTML = '';

      const secondTermAreas = ["Aquisgrana", "Roncisvalle", "Camelot", "Foresta di Brocelandia", "Castello del Graal", "Worms", "Reno"];

      allAreas.forEach(area => {
        const areaDiaries = diaries.filter(d => d.studentEmail === studentEmail && d.area === area && !d.isSelfEval);
        const count = areaDiaries.length;
        const isSecondTermLocked = secondTermAreas.includes(area) && !window.EroiApp.isSecondTermActiveForUser();
        const isTeacherUnlocked = activeDiaries.includes(area);
        const isUnlockedOnMap = (area === 'Accademia' || unlockedAreas.includes(area) || isTeacherUnlocked) && !isSecondTermLocked;

        
        let badgeColor = 'rgba(255,255,255,0.1)';
        if (count === 3) badgeColor = 'rgba(16,185,129,0.2)';
        else if (count > 0) badgeColor = 'rgba(245,158,11,0.2)';

        const activeClass = (window.activeDiarioArea === area) ? 'active' : '';

        const btn = document.createElement('button');
        btn.className = `btn btn-secondary ${activeClass}`;
        btn.style.width = '100%';
        btn.style.textAlign = 'left';
        btn.style.display = 'flex';
        btn.style.justifyContent = 'space-between';
        btn.style.alignItems = 'center';
        btn.style.padding = '8px 12px';
        btn.style.fontSize = '0.9rem';
        btn.style.marginBottom = '6px';
        btn.style.borderRadius = '6px';
        btn.style.transition = 'all 0.2s';
        btn.style.background = activeClass ? 'var(--gold-dark)' : 'rgba(255,255,255,0.03)';
        btn.style.borderColor = activeClass ? 'var(--gold)' : 'rgba(212,175,55,0.15)';
        btn.style.color = activeClass ? '#ffffff' : 'var(--text-color)';
        if (!isUnlockedOnMap) {
          btn.style.opacity = '0.5';
          btn.style.pointerEvents = 'none'; // Bloccata se non esplorabile
        }

        btn.onclick = () => {
          window.activeDiarioArea = area;
          // Su mobile: attiva il pannello dettaglio (nasconde la lista)
          const viewDiario = document.getElementById('view-diario');
          if (viewDiario) viewDiario.classList.add('detail-active');
          this.renderDiario(studentEmail);
        };

        const displayTitle = areaTitles[area] || area;
        
        let lockIcon = '';
        if (!isUnlockedOnMap) {
          lockIcon = '<i class="fa-solid fa-lock" style="font-size: 0.75rem; margin-left: 6px; color: #ef4444;" title="Bloccato"></i>';
        } else if (count >= 3) {
          lockIcon = '<i class="fa-solid fa-circle" style="font-size: 0.5rem; margin-left: 6px; color: #22c55e;" title="Completato"></i>';
        }

        btn.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>${displayTitle}</span>
            ${lockIcon}
          </div>
          <span style="font-size: 0.75rem; background: ${badgeColor}; padding: 2px 6px; border-radius: 10px; font-weight: bold; border: 1px solid rgba(255,255,255,0.1);">
            ${count}/3
          </span>
        `;
        nodeListContainer.appendChild(btn);
      });

      const emptyState = document.getElementById('diario-empty-state');
      const activeState = document.getElementById('diario-active-state');

      emptyState.style.display = 'none';
      activeState.style.display = 'flex';

      const area = window.activeDiarioArea;
      const displayTitle = areaTitles[area] || area;
      document.getElementById('diario-active-node-title').innerHTML = `
        <i class="fa-solid fa-map-pin" style="color: var(--gold); margin-right: 8px;"></i> Riflessioni: ${displayTitle}
      `;

      const tasksContainer = document.getElementById('diario-tasks-container');
      tasksContainer.innerHTML = '';

      const isSecondTermLocked = secondTermAreas.includes(area) && !window.EroiApp.isSecondTermActiveForUser();
      const isTeacherUnlocked = activeDiaries.includes(area);
      const isUnlockedOnMap = (area === 'Accademia' || unlockedAreas.includes(area) || isTeacherUnlocked) && !isSecondTermLocked;

      if (!isUnlockedOnMap) {
        const lockPanel = document.createElement('div');
        lockPanel.className = 'glass-panel';
        lockPanel.style.padding = '40px 20px';
        lockPanel.style.textAlign = 'center';
        lockPanel.style.marginTop = '20px';
        lockPanel.style.border = '1px solid rgba(239,68,68,0.25)';
        lockPanel.style.background = 'rgba(239,68,68,0.03)';
        lockPanel.innerHTML = `
          <div style="font-size: 3rem; color: #ef4444; margin-bottom: 20px;">
            <i class="fa-solid fa-map-location-dot"></i>
          </div>
          <h3 style="font-family: var(--font-heading); color: #ef4444; font-size: 1.5rem; margin-bottom: 12px;">Diario Bloccato</h3>
          <p style="font-size: 1.05rem; line-height: 1.6; color: var(--text-muted); max-width: 500px; margin: 0 auto;">
            Raggiungi questo luogo sulla mappa per sbloccare il relativo diario!
          </p>
        `;
        tasksContainer.appendChild(lockPanel);
        return;
      }

      // (isAreaActive check removed as it's merged into isUnlockedOnMap)

      const prompts = this.getDiaryPrompts(area);

      prompts.forEach((p, index) => {
        const diaryId = `diary_${studentEmail}_${area.replace(/\s+/g, '_')}_${index}`;
        const existing = diaries.find(d => d.id === diaryId);
        
        const taskCard = document.createElement('div');
        taskCard.className = 'glass-panel';
        taskCard.style.padding = '15px';
        taskCard.style.borderRadius = '8px';
        taskCard.style.marginBottom = '0';
        taskCard.style.border = '1px solid rgba(212,175,55,0.15)';
        taskCard.style.background = 'rgba(0,0,0,0.2)';

        let statusBadge = '';
        let readOnly = false;
        let gradeHTML = '';

        if (existing) {
          if (existing.grade !== undefined && existing.grade !== null) {
            statusBadge = `<span class="badge badge-success" style="background: rgba(16,185,129,0.2); border: 1px solid rgb(16,185,129); color: #10b981; font-size: 0.75rem; padding: 3px 8px;"><i class="fa-solid fa-circle-check"></i> Valutato: ${existing.grade}/10</span>`;
            readOnly = true;
            gradeHTML = `
              <div style="margin-top: 15px; padding: 12px; background: rgba(16,185,129,0.05); border-left: 3px solid rgb(16,185,129); border-radius: 4px;">
                <div style="font-weight: bold; color: var(--gold); font-size: 0.9rem;">Valutazione Docente:</div>
                <div style="font-size: 1.1rem; font-weight: bold; color: #10b981; margin: 4px 0;">Voto: ${existing.grade}/10</div>
                <div style="font-style: italic; color: var(--text-muted); font-size: 0.85rem;">Feedback: "${existing.feedback || 'Nessun commento fornito.'}"</div>
              </div>
            `;
          } else {
            statusBadge = `<span class="badge badge-warning" style="background: rgba(245,158,11,0.2); border: 1px solid rgb(245,158,11); color: #f59e0b; font-size: 0.75rem; padding: 3px 8px;"><i class="fa-solid fa-spinner"></i> Inviato (In attesa)</span>`;
            readOnly = true;
          }
        } else {
          statusBadge = `<span class="badge" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: var(--text-muted); font-size: 0.75rem; padding: 3px 8px;"><i class="fa-regular fa-pen-to-square"></i> Da completare</span>`;
        }

        taskCard.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 6px;">
            <h4 style="margin: 0; color: var(--gold); font-size: 0.95rem; font-family: var(--font-heading);">${index + 1}. ${p.label}</h4>
            ${statusBadge}
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px; font-style: italic;">
            ${p.prompt}
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <textarea id="ta-${diaryId}" class="form-control" style="width: 100%; height: 100px; resize: none; font-size: 0.9rem; padding: 8px; line-height: 1.4;" placeholder="Scrivi qui la tua riflessione..." ${readOnly ? 'disabled' : ''}>${existing ? existing.text : ''}</textarea>
          </div>
          ${gradeHTML}
        `;
        tasksContainer.appendChild(taskCard);
      });

      // Pulsante unico per inviare tutta la scheda al docente
      const hasUnsentEntries = prompts.some((p, index) => {
        const diaryId = `diary_${studentEmail}_${area.replace(/\s+/g, '_')}_${index}`;
        const existing = diaries.find(d => d.id === diaryId);
        return !existing; // non ancora inviata
      });
      if (hasUnsentEntries) {
        const submitAllBtn = document.createElement('div');
        submitAllBtn.style.cssText = 'display: flex; justify-content: flex-end; margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(212,175,55,0.15);';
        submitAllBtn.innerHTML = `
          <button class="btn btn-primary" style="padding: 10px 24px; font-size: 0.9rem; border-radius: 6px;" onclick="EroiApp.submitAllDiaryEntries('${area}')">
            <i class="fa-solid fa-paper-plane"></i> Invia Scheda al Docente
          </button>
        `;
        tasksContainer.appendChild(submitAllBtn);
      }

      // Form di autovalutazione
      const selfValId = `selfval_${studentEmail}_${area.replace(/\s+/g, '_')}`;
      const selfVal = diaries.find(d => d.id === selfValId);

      const selfValCard = document.createElement('div');
      selfValCard.className = 'glass-panel';
      selfValCard.style.padding = '18px';
      selfValCard.style.borderRadius = '8px';
      selfValCard.style.marginTop = '25px';
      selfValCard.style.border = '1px solid rgba(37,99,235,0.25)';
      selfValCard.style.background = 'rgba(37,99,235,0.02)';

      const characters = this.getCharactersForArea(area);
      let selectOptions = '<option value="">-- Seleziona un personaggio --</option>';
      characters.forEach(char => {
        const isSel = selfVal && selfVal.favoriteCharacter === char.title ? 'selected' : '';
        selectOptions += `<option value="${char.title}" ${isSel}>${char.title}</option>`;
      });

      const isReadOnly = !isUnlockedOnMap;

      selfValCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid rgba(37,99,235,0.2); padding-bottom: 6px;">
          <h4 style="margin: 0; color: var(--gold); font-size: 0.95rem; font-family: var(--font-heading);"><i class="fa-solid fa-face-smile"></i> Autovalutazione della Sezione</h4>
          <span class="badge" style="background: ${selfVal ? 'rgba(16,185,129,0.2)' : 'rgba(37,99,235,0.15)'}; border: 1px solid ${selfVal ? 'rgb(16,185,129)' : 'rgb(37,99,235)'}; color: ${selfVal ? '#10b981' : '#3b82f6'}; font-size: 0.75rem; padding: 3px 8px;">
            ${selfVal ? '<i class="fa-solid fa-circle-check"></i> Salvato' : '<i class="fa-regular fa-pen-to-square"></i> Da completare'}
          </span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px; font-style: italic;">
          Quale personaggio ti è piaciuto di più in questa sezione e come stai affrontando lo studio?
        </p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--gold); display: block; margin-bottom: 4px;"><strong>Il personaggio che ti è piaciuto di più:</strong></label>
            <select id="sel-char-${selfValId}" class="form-control" style="width: 100%; font-size: 0.9rem; padding: 6px; background: rgba(0,0,0,0.3); color: #fff; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;" ${isReadOnly ? 'disabled' : ''}>
              ${selectOptions}
            </select>
          </div>
          <div style="display: flex; gap: 15px; margin-top: 5px; align-items: center; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <label style="font-size: 0.85rem; color: var(--text-light); margin:0;">L'argomento ti è piaciuto?</label>
              <select id="sel-liked-${selfValId}" class="form-control" style="padding: 4px 8px; font-size: 0.85rem; width: auto; background: rgba(0,0,0,0.5); color: white; border: 1px solid rgba(255,255,255,0.2);" ${isReadOnly ? 'disabled' : ''}>
                <option value="" ${(!selfVal || !selfVal.liked) ? 'selected' : ''}>-</option>
                <option value="yes" ${selfVal && selfVal.liked === 'yes' ? 'selected' : ''}>Sì, molto</option>
                <option value="ok" ${selfVal && selfVal.liked === 'ok' ? 'selected' : ''}>Abbastanza</option>
                <option value="no" ${selfVal && selfVal.liked === 'no' ? 'selected' : ''}>Per niente</option>
              </select>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <input type="checkbox" id="chk-more-${selfValId}" ${selfVal && selfVal.wantMore ? 'checked' : ''} ${isReadOnly ? 'disabled' : ''} style="cursor: pointer; width: 16px; height: 16px;">
              <label for="chk-more-${selfValId}" style="font-size: 0.85rem; color: var(--text-light); margin: 0; cursor: pointer;">Desidero approfondirlo</label>
            </div>
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 4px; display: block;">Consigli, migliorie o richieste di aiuto (opzionale):</label>
            <textarea id="ta-help-${selfValId}" class="form-control" style="width: 100%; height: 50px; resize: none; font-size: 0.85rem; padding: 6px; line-height: 1.4; background: rgba(0,0,0,0.3); color: #fff; border: 1px solid rgba(255,255,255,0.15);" placeholder="Scrivi qui se hai bisogno di chiarimenti o hai suggerimenti..." ${isReadOnly ? 'disabled' : ''}>${selfVal && selfVal.helpNotes ? selfVal.helpNotes : ''}</textarea>
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--gold); display: block; margin-bottom: 4px;"><strong>Come stai affrontando lo studio di questa sezione?</strong></label>
            <textarea id="ta-study-${selfValId}" class="form-control" style="width: 100%; height: 80px; resize: none; font-size: 0.9rem; padding: 8px; line-height: 1.4; background: rgba(0,0,0,0.3); color: #fff; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;" placeholder="Descrivi brevemente il tuo metodo (es. riassunti, schemi, ripasso a gruppi)..." ${isReadOnly ? 'disabled' : ''}>${selfVal ? selfVal.studyMethod : ''}</textarea>
          </div>
          ${!isReadOnly ? `
            <div style="display: flex; justify-content: flex-end; margin-top: 5px;">
              <button class="btn btn-primary" style="padding: 6px 15px; font-size: 0.8rem; border-radius: 4px; background: #2563eb; border-color: #2563eb;" onclick="EroiApp.submitSelfEvaluation('${selfValId}', '${area}')">
                <i class="fa-solid fa-floppy-disk"></i> Salva Autovalutazione
              </button>
            </div>
          ` : ''}
        </div>
      `;
      tasksContainer.appendChild(selfValCard);
    },

    submitAllDiaryEntries: function(area) {
      const studentEmail = Auth.getUser().email;
      const diaries = window.EroiDB.getDiaries();
      const prompts = this.getDiaryPrompts(area);
      const entries = [];

      for (let index = 0; index < prompts.length; index++) {
        const diaryId = `diary_${studentEmail}_${area.replace(/\s+/g, '_')}_${index}`;
        const existing = diaries.find(d => d.id === diaryId);
        if (existing) continue; // già inviata, salta

        const ta = document.getElementById(`ta-${diaryId}`);
        if (!ta) continue;
        const text = ta.value.trim();
        if (text.length < 10) {
          alert(`La riflessione n. ${index + 1} deve essere lunga almeno 10 caratteri!`);
          ta.focus();
          return;
        }
        entries.push({ diaryId, area, taskIndex: index, text });
      }

      if (entries.length === 0) {
        this.showToast('Tutte le riflessioni sono già state inviate.', 'warning');
        return;
      }

      if (!confirm(`Sei sicuro di voler inviare tutte le ${entries.length} riflessioni? Una volta inviate non potrai più modificarle finché il docente non le avrà valutate.`)) return;

      entries.forEach(e => {
        const entry = {
          id: e.diaryId,
          studentEmail,
          area: e.area,
          taskIndex: e.taskIndex,
          text: e.text,
          submittedAt: new Date().toISOString(),
          liked: '',
          wantMore: false,
          helpNotes: '',
          grade: null,
          feedback: null,
          gradedAt: null,
          gradedBy: null
        };
        window.EroiDB.saveDiaryEntry(entry);
      });

      const _u_profile = window.EroiDB.getUser(studentEmail);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(studentEmail) : window.EroiDB.getStudentProfile(studentEmail);
      const profileName = profile ? profile.name : studentEmail;
      window.EroiDB.logActivity('student', `${profileName} ha inviato la scheda del Diario per ${area}.`);
      this.showToast('Scheda inviata al docente!', 'success');
      this.renderDiario(studentEmail);
    },

    submitDiaryEntry: function(diaryId, area, taskIndex) {
      const ta = document.getElementById(`ta-${diaryId}`);
      if (!ta) return;
      
      const text = ta.value.trim();
      if (text.length < 10) {
        alert("La riflessione deve essere lunga almeno 10 caratteri!");
        return;
      }

      if (confirm("Sei sicuro di voler inviare la riflessione? Una volta inviata non potrai più modificarla finché il docente non l'avrà valutata.")) {
        const studentEmail = Auth.getUser().email;
        const entry = {
          id: diaryId,
          studentEmail: studentEmail,
          area: area,
          taskIndex: taskIndex,
          text: text,
          submittedAt: new Date().toISOString(),
          liked: '',
          wantMore: false,
          helpNotes: '',
          grade: null,
          feedback: null,
          gradedAt: null,
          gradedBy: null
        };
        
        window.EroiDB.saveDiaryEntry(entry);
        const _u_profile = window.EroiDB.getUser(studentEmail);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(studentEmail) : window.EroiDB.getStudentProfile(studentEmail);
        const profileName = profile ? `${profile.firstName} ${profile.lastName}` : studentEmail;
        window.EroiDB.logActivity("student", `${profileName} ha inviato un compito del Diario per ${area}.`);
        this.showToast("Riflessione inviata al docente!", "success");
        this.renderDiario(studentEmail);
      }
    },

    submitSelfEvaluation: function(selfValId, area) {
      const select = document.getElementById(`sel-char-${selfValId}`);
      const textarea = document.getElementById(`ta-study-${selfValId}`);
      if (!select || !textarea) return;
      
      const charVal = select.value;
      const textVal = textarea.value.trim();
      
      if (!charVal) {
        alert("Per favore seleziona il personaggio che ti è piaciuto di più!");
        return;
      }
      if (textVal.length < 10) {
        alert("La descrizione di come stai studiando deve essere lunga almeno 10 caratteri!");
        return;
      }
      
      const studentEmail = Auth.getUser().email;
      const entry = {
        id: selfValId,
        studentEmail: studentEmail,
        area: area,
        isSelfEval: true,
        favoriteCharacter: charVal,
        studyMethod: textVal,
        liked: document.getElementById(`sel-liked-${selfValId}`)?.value || '',
        wantMore: document.getElementById(`chk-more-${selfValId}`)?.checked || false,
        helpNotes: document.getElementById(`ta-help-${selfValId}`)?.value.trim() || '',
        submittedAt: new Date().toISOString()
      };
      
      window.EroiDB.saveDiaryEntry(entry);
      this.showToast("Autovalutazione salvata con successo!", "success");
      this.renderDiario(studentEmail);
    },

    getCharactersForArea: function(area) {
      const guides = window.EroiDB.getStudyGuides() || [];
      let categories = [];
      
      if (["Accademia", "Miti di Fondazione", "Olimpo"].includes(area)) {
        categories = ["Schede Personaggio (Mitologia)"];
      } else if (["Creta", "Troia"].includes(area)) {
        categories = ["Schede Personaggio (Iliade)"];
      } else if (area === "Itaca") {
        categories = ["Schede Personaggio (Odissea)"];
      } else if (area === "Lazio") {
        categories = ["Schede Personaggio (Eneide)"];
      } else if (["Aquisgrana", "Roncisvalle"].includes(area)) {
        categories = ["Schede Personaggio (Ciclo Carolingio)"];
      } else if (["Camelot", "Foresta di Brocelandia", "Castello del Graal"].includes(area)) {
        categories = ["Schede Personaggio (Ciclo Bretone)"];
      } else if (["Worms", "Reno"].includes(area)) {
        categories = ["Schede Personaggio (Ciclo dei Nibelunghi)"];
      }
      
      return guides.filter(g => categories.includes(g.category));
    },

    renderTeacherDiarioToggles: function() {
      const togglesContainer = document.getElementById('teacher-diario-toggles');
      if (!togglesContainer) return;

      const settings = window.EroiDB.getSettings() || {};
      const activeDiaries = settings.activeDiaries || ["Accademia"];

      const allAreas = [
        "Accademia",
        "Miti di Fondazione",
        "Biblioteca",
        "Archivio",
        "Olimpo",
        "Creta",
        "Troia",
        "Itaca",
        "Lazio",
        "Aquisgrana",
        "Roncisvalle",
        "Camelot",
        "Foresta di Brocelandia",
        "Castello del Graal",
        "Worms",
        "Reno"
      ];

      const areaTitles = {
        "Accademia": "L'inizio del Viaggio",
        "Miti di Fondazione": "Miti di Fondazione",
        "Biblioteca": "Gli Autori",
        "Archivio": "Le Opere",
        "Olimpo": "Olimpo",
        "Creta": "Creta",
        "Troia": "Troia",
        "Itaca": "Itaca",
        "Lazio": "Lazio",
        "Aquisgrana": "Aquisgrana",
        "Roncisvalle": "Roncisvalle",
        "Camelot": "Camelot",
        "Foresta di Brocelandia": "Brocelandia",
        "Castello del Graal": "Castello del Graal",
        "Worms": "Worms",
        "Reno": "Fiume Reno"
      };

      togglesContainer.innerHTML = '';

      allAreas.forEach(area => {
        const isActive = activeDiaries.includes(area);
        const displayTitle = areaTitles[area] || area;

        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.justifyContent = 'space-between';
        wrapper.style.padding = '8px 12px';
        wrapper.style.background = 'rgba(255,255,255,0.02)';
        wrapper.style.border = '1px solid rgba(212,175,55,0.15)';
        wrapper.style.borderRadius = '6px';

        wrapper.innerHTML = `
          <span style="font-size: 0.85rem; font-weight: 500;">${displayTitle}</span>
          <label class="switch-container" style="position: relative; display: inline-block; width: 44px; height: 22px;">
            <input type="checkbox" ${isActive ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
            <span class="slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #374151; transition: .3s; border-radius: 22px;"></span>
          </label>
        `;

        const input = wrapper.querySelector('input');
        const slider = wrapper.querySelector('.slider');
        
        if (isActive) {
          slider.style.backgroundColor = 'var(--gold)';
        }

        input.onchange = (e) => {
          this.toggleDiaryArea(area);
        };

        togglesContainer.appendChild(wrapper);
      });
    },

    toggleDiaryArea: function(area) {
      const settings = window.EroiDB.getSettings() || {};
      let activeDiaries = settings.activeDiaries || ["Accademia"];

      if (activeDiaries.includes(area)) {
        activeDiaries = activeDiaries.filter(a => a !== area);
      } else {
        activeDiaries.push(area);
      }

      window.EroiDB.saveSettings({ activeDiaries });
      this.showToast(`Stato diario per ${area} aggiornato.`, "success");
      this.renderTeacherDiarioToggles();
    },

    renderTeacherDiaries: function() {
      this.renderTeacherDiarioToggles();
      const diaries = window.EroiDB.getDiaries();
      const students = window.EroiDB.getAllStudents();
      const classes = window.EroiDB.getClasses();
      
      const listContainer = document.getElementById('teacher-diaries-list');
      if (!listContainer) return;

      const filterStatus = document.getElementById('teacher-diario-filter-status').value;
      const filterClass = document.getElementById('teacher-diario-filter-class').value;

      // Popola il selettore classi se vuoto
      const classSelect = document.getElementById('teacher-diario-filter-class');
      if (classSelect && classSelect.options.length <= 1) {
        classSelect.innerHTML = '<option value="ALL">Tutte le Classi</option>';
        classes.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c.id;
          opt.textContent = c.name;
          classSelect.appendChild(opt);
        });
      }

      listContainer.innerHTML = '';

      // Filtra i diari
      let filtered = diaries.filter(d => !d.isSelfEval);

      if (filterStatus === 'pending') {
        filtered = filtered.filter(d => d.grade === null || d.grade === undefined);
      } else {
        filtered = filtered.filter(d => d.grade !== null && d.grade !== undefined);
      }

      if (filterClass !== 'ALL') {
        filtered = filtered.filter(d => {
          const stud = students.find(s => s.email === d.studentEmail);
          return stud && stud.classId === filterClass;
        });
      }

      if (filtered.length === 0) {
        listContainer.innerHTML = '<div style="color: var(--text-muted); font-style: italic; text-align: center; padding: 40px;">Nessun elaborato trovato per questi filtri.</div>';
        return;
      }

      filtered.forEach(entry => {
        const stud = students.find(s => s.email === entry.studentEmail);
        const clsName = stud ? (classes.find(c => c.id === stud.classId)?.name || 'Senza Classe') : 'Studente sconosciuto';
        const prompts = this.getDiaryPrompts(entry.area);
        const promptInfo = prompts[entry.taskIndex] || { label: `Compito ${entry.taskIndex + 1}`, prompt: "" };

        const card = document.createElement('div');
        card.className = 'glass-panel';
        card.style.padding = '18px';
        card.style.borderRadius = '8px';
        card.style.marginBottom = '15px';
        card.style.border = '1px solid rgba(212,175,55,0.2)';
        card.style.background = 'rgba(255,255,255,0.01)';

        const formattedDate = new Date(entry.submittedAt).toLocaleString('it-IT');

        let gradeSection = '';
        if (entry.grade !== null && entry.grade !== undefined) {
          gradeSection = `
            <div style="margin-top: 15px; padding: 12px; background: rgba(16,185,129,0.04); border: 1px solid rgba(16,185,129,0.2); border-radius: 6px;">
              <span style="font-weight: bold; color: #10b981; font-size: 1.05rem;"><i class="fa-solid fa-clipboard-check"></i> Valutato: Voto ${entry.grade}/10</span>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 6px 0 0 0; font-style: italic;">Commento: "${entry.feedback || ''}"</p>
              <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">Valutato da ${entry.gradedBy} il ${new Date(entry.gradedAt).toLocaleString('it-IT')}</div>
            </div>
          `;
        } else {
          gradeSection = `
            <div style="margin-top: 15px; padding: 15px; background: rgba(212,175,55,0.03); border: 1px dashed rgba(212,175,55,0.25); border-radius: 6px; display: flex; flex-direction: column; gap: 10px;">
              <div style="font-weight: bold; color: var(--gold); font-size: 0.85rem; text-transform: uppercase;">Valutazione elaborato</div>
              <div style="display: flex; gap: 10px; align-items: center;">
                <div style="width: 100px;">
                  <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 2px;">Voto (1-10)</label>
                  <input type="number" id="grade-${entry.id}" class="form-control" min="1" max="10" step="1" required style="padding: 4px 8px; height: 32px; font-size: 0.9rem;" value="8" />
                </div>
                <div style="flex: 1;">
                  <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 2px;">Feedback / Commento</label>
                  <input type="text" id="feedback-${entry.id}" class="form-control" placeholder="Inserisci un commento per lo studente..." style="padding: 4px 8px; height: 32px; font-size: 0.9rem;" />
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end;">
                <button class="btn btn-primary" style="padding: 5px 15px; font-size: 0.8rem; border-radius: 4px;" onclick="EroiApp.submitTeacherEvaluation('${entry.id}')">
                  <i class="fa-solid fa-check"></i> Conferma Valutazione
                </button>
              </div>
            </div>
          `;
        }

        // Trova se c'è un'autovalutazione di questo studente per questa area
        const selfValId = `selfval_${entry.studentEmail}_${entry.area.replace(/\s+/g, '_')}`;
        const selfVal = diaries.find(d => d.id === selfValId);
        let selfValHTML = '';
        if (selfVal) {
          selfValHTML = `
            <div style="margin-top: 15px; padding: 12px; background: rgba(37,99,235,0.05); border-left: 3px solid rgb(37,99,235); border-radius: 6px; border: 1px solid rgba(37,99,235,0.15);">
              <div style="font-weight: bold; color: var(--gold); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 6px;"><i class="fa-solid fa-face-smile"></i> Autovalutazione della Sezione</div>
              <div style="font-size: 0.85rem; margin-bottom: 4px; color: var(--text-color);">❤️ <strong>Personaggio preferito</strong>: <span style="color: var(--gold); font-weight: bold;">${selfVal.favoriteCharacter || 'Non selezionato'}</span></div>
              <div style="font-size: 0.85rem; color: var(--text-color); line-height: 1.4;">📝 <strong>Metodo di studio</strong>: "${selfVal.studyMethod || 'Nessuna descrizione'}"</div>
            </div>
          `;
        }

        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: start; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; margin-bottom: 12px;">
            <div>
              <span style="font-weight: bold; color: var(--gold); font-size: 1rem;">${stud ? `${stud.lastName} ${stud.firstName}` : entry.studentEmail}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 8px;">(${clsName})</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${formattedDate}</span>
          </div>
          <div style="font-size: 0.8rem; background: rgba(0,0,0,0.15); padding: 8px 12px; border-radius: 4px; border-left: 3px solid var(--gold); margin-bottom: 10px;">
            <div style="font-weight: bold; color: var(--gold);">${entry.area}</div>
            <div style="color: var(--text-muted); font-style: italic;">Sezione: "${promptInfo.label}" (${promptInfo.prompt})</div>
          </div>
          <div style="font-size: 0.95rem; line-height: 1.5; background: rgba(0,0,0,0.25); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05); white-space: pre-wrap; color: #f3f4f6;">${entry.text}</div>
          ${selfValHTML}
          ${gradeSection}
        `;

        listContainer.appendChild(card);
      });
    },

    submitTeacherEvaluation: function(entryId) {
      const gradeInput = document.getElementById(`grade-${entryId}`);
      const feedbackInput = document.getElementById(`feedback-${entryId}`);
      
      if (!gradeInput) return;
      
      const grade = parseInt(gradeInput.value);
      if (isNaN(grade) || grade < 1 || grade > 10) {
        alert("Inserisci un voto numerico valido compreso tra 1 e 10!");
        return;
      }
      
      const feedback = feedbackInput ? feedbackInput.value.trim() : '';
      const teacherUser = Auth.getUser();

      const diaries = window.EroiDB.getDiaries();
      const existing = diaries.find(d => d.id === entryId);
      if (!existing) return;

      const isFirstEvaluation = (existing.grade === null || existing.grade === undefined);

      if (confirm(`Vuoi salvare la valutazione? Voto: ${grade}/10${isFirstEvaluation ? '\nAll\'assegnazione del primo voto lo studente guadagnerà +30 XP e +15 Dracme!' : ''}`)) {
        existing.grade = grade;
        existing.feedback = feedback;
        existing.gradedAt = new Date().toISOString();
        existing.gradedBy = teacherUser.email;

        // Salva nel database locale
        window.EroiDB.saveDiaryEntry(existing);

        // Se è la prima valutazione, assegna XP e Dracme al profilo dello studente
        if (isFirstEvaluation) {
          const _u_studProfile = window.EroiDB.getUser(existing.studentEmail);
      const _isT_studProfile = _u_studProfile && (_u_studProfile.role === "docente" || _u_studProfile.role === "admin");
      const studProfile = _isT_studProfile ? window.EroiDB.getTeacherPlayerProfile(existing.studentEmail) : window.EroiDB.getStudentProfile(existing.studentEmail);
          if (studProfile) {
            window.EroiGame.addXP(existing.studentEmail, 30);
            window.EroiGame.addDracme(existing.studentEmail, 15);
            window.EroiDB.logActivity("system", `Assegnati +30 XP e +15 Dracme a ${studProfile.firstName} ${studProfile.lastName} per la prima valutazione del Diario (${existing.area}).`);
          }
        }

        window.EroiDB.logActivity("teacher", `${teacherUser.email} ha valutato il compito del Diario per ${existing.studentEmail} (${existing.area}) con voto ${grade}.`);
        this.showToast("Valutazione salvata con successo!", "success");
        this.renderTeacherDiaries();
      }
    },
    // GESTIONE NODI DA PARTE DEL DOCENTE
    renderTeacherMapNodes: function() {
      const classSelect = document.getElementById('teacher-nodi-class-select');
      const listContainer = document.getElementById('teacher-nodi-list');
      if (!classSelect || !listContainer) return;

      const classId = classSelect.value;
      if (!classId) {
          listContainer.innerHTML = '<p>Seleziona una classe.</p>';
          return;
      }

      const allUsers = window.EroiDB.getAllUsers();
      const students = allUsers.filter(u => u.role === 'studente' && u.classId === classId);
      if (students.length === 0) {
          listContainer.innerHTML = '<p>Nessuno studente in questa classe.</p>';
          return;
      }

      // Prendi lo stato dei nodi basato sul primo studente della classe per praticità (supponendo che la classe viaggi insieme)
      const firstStudentProfile = window.EroiDB.getStudentProfile(students[0].email);
      const unlockedAreas = firstStudentProfile ? firstStudentProfile.unlockedAreas : [];
      
      const nodes = window.EroiDB.getMapNodes();
      
      let html = '';
      nodes.forEach(node => {
          const isUnlocked = unlockedAreas.includes(node.id);
          html += `
            <div class="glass-panel" style="padding:15px; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <i class="${node.icon}" style="font-size:1.5rem; color:${isUnlocked ? 'var(--gold)' : 'var(--text-muted)'};"></i>
                    <div>
                        <h4 style="margin:0; font-size:1.1rem; color:${isUnlocked ? '#fff' : 'var(--text-muted)'};">${node.name}</h4>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${node.region} - Lvl ${node.requiredLevel}</span>
                    </div>
                </div>
                <button class="btn ${isUnlocked ? 'btn-secondary' : ''}" style="width:auto; padding: 5px 15px;" onclick="window.EroiApp.toggleTeacherMapNode('${classId}', '${node.id}', ${!isUnlocked})">
                    <i class="fa-solid ${isUnlocked ? 'fa-lock' : 'fa-lock-open'}"></i> ${isUnlocked ? 'Blocca' : 'Sblocca'}
                </button>
            </div>
          `;
      });
      listContainer.innerHTML = html;
    },

    toggleTeacherMapNode: function(classId, nodeId, unlock) {
        if (!confirm(`Sei sicuro di voler ${unlock ? 'sbloccare' : 'bloccare'} il nodo per tutta la classe ${classId}?`)) return;
        
        const allUsers = window.EroiDB.getAllUsers();
        const students = allUsers.filter(u => u.role === 'studente' && u.classId === classId);
        
        students.forEach(student => {
            const profile = window.EroiDB.getStudentProfile(student.email);
            if (profile) {
                if (unlock && !profile.unlockedAreas.includes(nodeId)) {
                    profile.unlockedAreas.push(nodeId);
                } else if (!unlock && profile.unlockedAreas.includes(nodeId)) {
                    profile.unlockedAreas = profile.unlockedAreas.filter(id => id !== nodeId);
                }
                window.EroiDB.saveStudentProfile(profile);
            }
        });
        
        this.showToast(`Nodo ${unlock ? 'sbloccato' : 'bloccato'} per la classe ${classId}`, 'success');
        this.renderTeacherMapNodes();
    }
  };

  // Inizializza l'applicazione al caricamento del DOM
  document.addEventListener('DOMContentLoaded', async function() {
    if (window.Auth && typeof window.Auth.whenReady === 'function') {
        await window.Auth.whenReady();
    }
    
    // Ricarica la vista quando l'autenticazione cambia (es. login effettuato)
    window.addEventListener('authChange', () => {
        window.EroiApp.checkSession();
    });

    window.EroiApp.init();
  });
})();
