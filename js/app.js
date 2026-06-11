// Eroi in Viaggio - Main Application Controller
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
      }
    },

    updateMuteUI: function() {
      const btns = document.querySelectorAll('.btn-toggle-audio-action, #btn-toggle-audio');
      btns.forEach(btn => {
        btn.innerHTML = this.isMuted 
          ? '<i class="fa-solid fa-volume-xmark"></i>' 
          : '<i class="fa-solid fa-volume-high"></i>';
        btn.title = this.isMuted ? 'Attiva Audio' : 'Disattiva Audio';
      });
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

    // --- NAVIGATION & ROUTING ---
    navigateTo: function(viewId) {
      const user = window.EroiAuth.getCurrentUser();
      
      // Protezione delle rotte in base al ruolo
      const publicViews = ['view-login'];
      const studentViews = ['view-student-dashboard', 'view-map', 'view-missions', 'view-shop', 'view-inventory', 'view-guides', 'view-regolamento'];
      const teacherViews = ['view-teacher-dashboard', 'view-guides', 'view-regolamento'];
      const adminViews = ['view-admin-dashboard', 'view-teacher-dashboard', 'view-guides', 'view-regolamento'];

      if (!user) {
        // Forza login se non autenticato
        this.switchActiveView('view-login');
        document.getElementById('main-sidebar').style.display = 'none';
        document.getElementById('mobile-navigation').style.display = 'none';
        document.getElementById('app-header').style.display = 'none';
        document.getElementById('main-layout').style.marginLeft = '0';
        return;
      }

      // Se autenticato, blocca l'accesso alla login
      if (viewId === 'view-login') {
        if (user.role === 'student' || user.role === 'amico') viewId = 'view-student-dashboard';
        else if (user.role === 'teacher') viewId = 'view-teacher-dashboard';
        else if (user.role === 'admin') viewId = 'view-admin-dashboard';
      }

      // Controllo permessi ruoli
      if ((user.role === 'student' || user.role === 'amico') && !studentViews.includes(viewId)) {
        this.showToast("Accesso negato.", "danger");
        viewId = 'view-student-dashboard';
      } else if (user.role === 'teacher' && !teacherViews.includes(viewId) && viewId !== 'view-student-dashboard') {
        // I docenti non possono accedere alla dashboard amministrativa globale o alle viste di gioco studente
        if (adminViews.includes(viewId) && viewId !== 'view-teacher-dashboard' && viewId !== 'view-guides' && viewId !== 'view-regolamento') {
          this.showToast("Accesso negato: Sezione riservata all'Amministratore.", "danger");
          viewId = 'view-teacher-dashboard';
        }
      }

      // Applica la visualizzazione della rotta
      this.switchActiveView(viewId);
      this.updateNavigationUI(viewId);

      // Innesca il rendering specifico della vista caricata
      this.renderViewData(viewId, user);
    },

    switchActiveView: function(viewId) {
      document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
      });
      const target = document.getElementById(viewId);
      if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
      }
    },

    updateNavigationUI: function(viewId) {
      const user = window.EroiAuth.getCurrentUser();
      if (!user) return;

      // Hiddiamo sempre la sidebar e mostriamo l'header e la navigazione bottom
      document.getElementById('main-sidebar').style.display = 'none';
      document.getElementById('app-header').style.display = 'flex';
      document.getElementById('mobile-navigation').style.display = 'flex';
      document.getElementById('main-layout').style.marginLeft = '0';

      // Rigenera i link della navbar se non ancora fatti
      this.generateNavbarLinks(user);

      // Evidenzia la bottom-nav mobile/desktop dock
      document.querySelectorAll('.mobile-nav-item').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-view') === viewId) {
          link.classList.add('active');
        }
      });
    },

    generateNavbarLinks: function(user) {
      const mobileMenu = document.getElementById('mobile-navigation');
      const profileWidget = document.getElementById('header-profile-widget');
      const profileDropdown = document.getElementById('profile-dropdown-card');
      
      // Renderizza Header Profile Widget e Dropdown Card
      if (profileWidget && profileDropdown) {
        let avatarImg = 'assets/images/pergamena_crest.png';
        let levelText = '';
        let dropdownHtml = '';
        
        if (user.role === 'student' || user.role === 'amico') {
          const profile = window.EroiDB.getStudentProfile(user.email);
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
        
        // Aggiungi azioni comuni in fondo al dropdown
        dropdownHtml += `
          <div class="dropdown-divider"></div>
          <div class="dropdown-actions">
            <button class="btn btn-secondary btn-toggle-audio-action" title="Toggle Audio" style="font-size: 0.75rem; padding: 8px;">
              <i class="fa-solid fa-volume-high"></i> Audio
            </button>
            <button class="btn btn-danger btn-logout-action" style="font-size: 0.75rem; padding: 8px;">
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

        const userInfoClick = profileWidget.querySelector('#header-user-info-click');
        if (userInfoClick) {
          userInfoClick.addEventListener('click', (e) => {
            e.stopPropagation();
            let dashboardView = 'view-student-dashboard';
            if (user.role === 'teacher') dashboardView = 'view-teacher-dashboard';
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
              window.EroiAuth.logout();
              this.showToast("Disconnessione effettuata.", "success");
              this.checkSession();
            }
          });
        }
        
        // Aggiorna l'icona dell'audio nel dropdown al rendering
        EroiAudio.updateMuteUI();
      }

      let links = [];

      if (user.role === 'student' || user.role === 'amico') {
        links = [
          { view: 'view-map', label: 'Mappa', icon: 'fa-map-marked-alt' },
          { view: 'view-shop', label: 'Mercato', icon: 'fa-coins' },
          { view: 'view-inventory', label: 'Inventario', icon: 'fa-box-open' },
          { view: 'view-guides', label: 'Tempio', icon: 'fa-book-open' },
          { view: 'view-regolamento', label: 'Regolamento', icon: 'fa-gavel' }
        ];
      } else if (user.role === 'teacher') {
        links = [
          { view: 'view-guides', label: 'Tempio', icon: 'fa-book-open' },
          { view: 'view-regolamento', label: 'Regolamento', icon: 'fa-gavel' }
        ];
      } else if (user.role === 'admin') {
        links = [
          { view: 'view-admin-dashboard', label: 'Pannello Admin', icon: 'fa-screwdriver-wrench' },
          { view: 'view-teacher-dashboard', label: 'Pannello Docente', icon: 'fa-chalkboard-user' },
          { view: 'view-guides', label: 'Tempio', icon: 'fa-book-open' },
          { view: 'view-regolamento', label: 'Regolamento', icon: 'fa-gavel' }
        ];
      }

      // Renderizza links nella bottom navigation per desktop/mobile dock (senza lo slice a 5 per mostrarli tutti)
      mobileMenu.innerHTML = links.map(l => `
        <a href="#${l.view}" class="mobile-nav-item" data-view="${l.view}">
          <i class="fa-solid ${l.icon}"></i>
          <span>${l.label}</span>
        </a>
      `).join('');

      // Aggiungi click listener a mobile
      mobileMenu.querySelectorAll('.mobile-nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const view = link.getAttribute('data-view');
          this.navigateTo(view);
        });
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
          const user = window.EroiAuth.getCurrentUser();
          if (user) {
            if (user.role === 'student' || user.role === 'amico') self.navigateTo('view-student-dashboard');
            else if (user.role === 'teacher') self.navigateTo('view-teacher-dashboard');
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

      // Form Login
      document.getElementById('form-login-submit').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        try {
          const session = await window.EroiAuth.login(email, pass);
          self.showToast(`Benvenuto, ${session.name}!`, "success");
          self.checkSession();
        } catch (err) {
          self.showToast(err.message, "danger");
        }
      });

      // Toggle Login / Registrazione Forestiero
      const linkShowRegister = document.getElementById('link-show-register');
      const linkShowLogin = document.getElementById('link-show-login');
      const formLogin = document.getElementById('form-login-submit');
      const formRegister = document.getElementById('form-register-submit');

      if (linkShowRegister && linkShowLogin && formLogin && formRegister) {
        linkShowRegister.addEventListener('click', function() {
          formLogin.style.display = 'none';
          formRegister.style.display = 'block';
        });
        linkShowLogin.addEventListener('click', function() {
          formRegister.style.display = 'none';
          formLogin.style.display = 'block';
        });
      }

      // Registrazione Forestiero (Ospite / Amico)
      if (formRegister) {
        formRegister.addEventListener('submit', async function(e) {
          e.preventDefault();
          const name = document.getElementById('register-name').value;
          const email = document.getElementById('register-email').value;
          const password = document.getElementById('register-password').value;
          const avatar = document.getElementById('register-avatar').value;

          try {
            const session = await window.EroiAuth.register(name, email, password, avatar);
            self.showToast(`Benvenuto, ${session.name}! Registrato come Forestiero.`, "success");
            
            document.getElementById('register-name').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            
            self.checkSession();
          } catch (err) {
            self.showToast(err.message, "danger");
          }
        });
      }


      // Recupero Password
      document.getElementById('link-recover-password').addEventListener('click', async function() {
        const email = prompt("Inserisci la tua email scolastica per ricevere il link di ripristino:");
        if (email) {
          try {
            await window.EroiAuth.recoverPassword(email);
            alert("Simulazione: È stata inviata un'email di ripristino della password a " + email);
          } catch (err) {
            alert("Errore: " + err.message);
          }
        }
      });

      // Pulsante Logout
      document.getElementById('btn-logout').addEventListener('click', function() {
        if (confirm("Sei sicuro di voler uscire dal gioco?")) {
          window.EroiAuth.logout();
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

          window.EroiDB.saveStudentProfile(email, {
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

          const teacher = window.EroiAuth.getCurrentUser();
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
        
        const teacher = window.EroiAuth.getCurrentUser();
        
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

          const user = window.EroiAuth.getCurrentUser();
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
          rewards: { xp: xp, dracme: dracme },
          questions: [
            { q: qText, a: [opt0, opt1, opt2, opt3], correct: 0 }
          ]
        };

        const teacher = window.EroiAuth.getCurrentUser();
        window.EroiDB.saveMission(id, missionObj);
        window.EroiDB.logActivity(teacher.email, `Creata/Modificata missione ${id}: ${title}`);
        self.showToast("Missione salvata!", "success");

        document.getElementById('new-mission-id').value = '';
        document.getElementById('new-mission-title').value = '';
        document.getElementById('new-mission-desc').value = '';
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

        const teacher = window.EroiAuth.getCurrentUser();
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

        const teacher = window.EroiAuth.getCurrentUser();
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

        const teacher = window.EroiAuth.getCurrentUser();
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
        const secondTerm = document.getElementById('admin-setting-secondterm').checked;

        window.EroiDB.saveSettings({
          appName: name,
          copyright: copy,
          contacts: cont,
          secondTermActive: secondTerm
        });

        window.EroiDB.logActivity("admin", "Aggiornate le impostazioni globali e lo stato del 2° quadrimestre: " + secondTerm);
        self.showToast("Configurazione globale salvata!", "success");
        self.renderFooterDetails();
      });

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
        const user = window.EroiAuth.getCurrentUser();
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
      const user = window.EroiAuth.getCurrentUser();
      if (user) {
        document.getElementById('user-display-name').textContent = user.name;
        document.getElementById('user-display-role').textContent = user.role === 'admin' ? 'Amministratore' : (user.role === 'teacher' ? 'Docente' : (user.role === 'amico' ? 'Forestiero' : 'Studente'));
        
        // Reindirizza alla dashboard corretta se eravamo fermi alla login
        if (this.getCurrentViewId() === 'view-login') {
          if (user.role === 'student' || user.role === 'amico') this.navigateTo('view-student-dashboard');
          else if (user.role === 'teacher') this.navigateTo('view-teacher-dashboard');
          else if (user.role === 'admin') this.navigateTo('view-admin-dashboard');
        } else {
          this.navigateTo(this.getCurrentViewId());
        }
      } else {
        this.navigateTo('view-login');
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
      if (copyEl) copyEl.textContent = settings.copyright;
    },

    // --- STUDENT RENDERERS ---
    renderStudentDashboard: function(email) {
      const profile = window.EroiDB.getStudentProfile(email);
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
      const profile = window.EroiDB.getStudentProfile(email);
      if (!profile) return;

      const unlocked = profile.unlockedAreas || ["Accademia"];
      const settings = window.EroiDB.getSettings();

      // Sblocca i nodi grafici e i collegamenti in base alle aree sbloccate dallo studente
      const areas = ["Accademia", "Biblioteca", "Archivio", "Olimpo", "Creta", "Troia", "Itaca", "Lazio", "Aquisgrana", "Roncisvalle", "Camelot", "Foresta di Brocelandia", "Castello del Graal", "Worms", "Reno"];
      const secondTermAreas = ["Aquisgrana", "Roncisvalle", "Camelot", "Foresta di Brocelandia", "Castello del Graal", "Worms", "Reno"];

      areas.forEach(area => {
        const node = document.getElementById(`node-${area}`);
        if (!node) return;

        // Accademia è sempre sbloccata (punto di partenza)
        const alwaysUnlocked = area === 'Accademia';
        const isSecondTermLocked = secondTermAreas.includes(area) && !settings.secondTermActive;

        if ((alwaysUnlocked || unlocked.includes(area)) && !isSecondTermLocked) {
          node.classList.remove('locked');
          node.onclick = () => {
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
        { from: "Accademia", to: "Biblioteca" },
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
        const fromId = p.from.replace('Foresta di Brocelandia', 'Brocelandia').replace('Castello del Graal', 'Graal');
        const toId = p.to.replace('Foresta di Brocelandia', 'Brocelandia').replace('Castello del Graal', 'Graal');
        const pathEl = document.getElementById(`path-${fromId}-${toId}`) ||
                       document.getElementById(`path-${p.from}-${p.to}`);
        if (!pathEl) return;

        const isSecondTermLocked = secondTermAreas.includes(p.to) && !settings.secondTermActive;
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
      const user = window.EroiAuth.getCurrentUser();
      if (user) {
        this.renderMissionsList(user.email);
      }
    },

    // --- MISSIONS & QUIZZES ---
    renderMissionsList: function(email) {
      const profile = window.EroiDB.getStudentProfile(email);
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
        { name: "Primo Viaggio", term: 1, icon: "fa-compass", color: "#a78bfa" },
        { name: "Mitologia", term: 1, icon: "fa-bolt", color: "#f59e0b" },
        { name: "Iliade", term: 1, icon: "fa-shield-halved", color: "#ef4444" },
        { name: "Odissea", term: 1, icon: "fa-anchor", color: "#3b82f6" },
        { name: "Eneide", term: 1, icon: "fa-scroll", color: "#10b981" },
        { name: "Ciclo Carolingio", term: 2, icon: "fa-chess-rook", color: "#ec4899" },
        { name: "Ciclo Bretone", term: 2, icon: "fa-wand-magic-sparkles", color: "#8b5cf6" },
        { name: "Ciclo dei Nibelunghi", term: 2, icon: "fa-dragon", color: "#ea580c" }
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
        const isSecondTermLocked = cat.term === 2 && !settings.secondTermActive;
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
                         <i class="fa-solid fa-play"></i> Svolgi Quiz
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
      const user = window.EroiAuth.getCurrentUser();
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

      const listContainer = document.getElementById('quiz-questions-list');
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

      // Aggancia trigger al bottone "Concludi"
      const submitBtn = document.getElementById('btn-submit-quiz-answers');
      submitBtn.onclick = () => {
        EroiApp.submitQuiz(user.email, missionId);
      };

      // Aggancia trigger al bottone "Indizio"
      const hintBtn = document.getElementById('btn-use-hint');
      hintBtn.onclick = () => {
        EroiApp.useHintInQuiz(user.email, m);
      };
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
        // Troviamo la prima domanda non ancora risposta o a caso
        const questionsBoxes = document.querySelectorAll('.quiz-question-box');
        let hintGiven = false;
        
        for (let i = 0; i < questionsBoxes.length; i++) {
          const box = questionsBoxes[i];
          const correct = Number(box.getAttribute('data-correct'));
          const options = box.querySelectorAll('.quiz-option');
          
          // Trova un'opzione errata non evidenziata
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
          // Ritorna all'elenco delle missioni
          this.navigateTo('view-missions');
        } else {
          EroiAudio.playFailure();
          this.showToast(`Sfida Fallita (${result.correctCount}/${result.totalCount} esatte). Riprova dopo aver studiato le guide!`, "danger");
          
          // Controlliamo se lo studente ha l'oggetto "Secondo Tentativo" nell'inventario
          const inventory = window.EroiDB.getInventory(email);
          const secondChance = inventory.find(i => i.itemId === 'item_ritentativo');
          
          if (secondChance && secondChance.quantity > 0) {
            if (confirm("Hai fallito la missione, ma possiedi un 'Secondo Tentativo' nell'inventario. Vuoi consumarlo per riprovare subito senza penalità?")) {
              window.EroiGame.useConsumable(email, 'item_ritentativo');
              // Mantieni il quiz aperto ma deseleziona tutto
              document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
                opt.style.opacity = '1';
                opt.style.textDecoration = 'none';
                opt.style.pointerEvents = 'auto';
              });
              return;
            }
          }
          
          // Altrimenti torna indietro
          this.navigateTo('view-missions');
        }
      } catch (err) {
        alert("Errore: " + err.message);
      }
    },

    // --- SHOP ---
    renderShop: function(email) {
      const items = window.EroiDB.getShopItems();
      const grid = document.getElementById('shop-items-grid');
      const profile = window.EroiDB.getStudentProfile(email);
      if (!profile) return;

      document.getElementById('shop-balance-display').innerHTML = `${profile.dracme} <i class="fa-solid fa-coins"></i>`;
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
      const user = window.EroiAuth.getCurrentUser();
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
      const profile = window.EroiDB.getStudentProfile(email);

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
      if (!settings.secondTermActive) {
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
      const container = document.querySelector('.guides-container');
      if (container) {
        container.classList.remove('detail-active');
      }
      const guides = window.EroiDB.getStudyGuides();
      const sidebar = document.getElementById('guides-sidebar-list');
      
      const categories = [
        "L'inizio del viaggio",
        "Le Opere",
        "Schede Autore",
        "Divinità",
        "Schede Personaggio (Mitologia)",
        "Schede Personaggio (Iliade)",
        "Schede Personaggio (Odissea)",
        "Schede Personaggio (Eneide)",
        "Schede Personaggio (Ciclo Carolingio)",
        "Schede Personaggio (Ciclo Bretone)",
        "Schede Personaggio (Ciclo dei Nibelunghi)",
        "Schede Tematiche"
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

      // Applica l'uppercase e l'evidenziazione se NON è una lezione dell'inizio del viaggio
      if (g.category !== "L'inizio del viaggio") {
        // Converti in maiuscolo
        content = content.toUpperCase();

        // Parole chiave da evidenziare
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
          "ESTIA", "VESTA", "DIONISO", "BACCO"
        ];
        const greenTerms = [
          "ILIADE", "ODISSEA", "ENEIDE", "TAVOLA ROTONDA", "SACRO GRAAL", "DURENDAL", "OLIFANTE", "EXCALIBUR", "FIORENTINO"
        ];
        const orangeTerms = [
          "TROIA", "ROMA", "CARTAGINE", "ITACA", "CAMELOT", "AQUISGRANA", "RONCISVALLE", "VOLGARE", "LETTERATURA", "LAZIO", "CATAI"
        ];

        blueTerms.forEach(term => {
          const regex = new RegExp(`\\b${term}\\b`, 'g');
          content = content.replace(regex, `<span style="color: #2563eb; font-weight: bold;">${term}</span>`);
        });
        greenTerms.forEach(term => {
          const regex = new RegExp(`\\b${term}\\b`, 'g');
          content = content.replace(regex, `<span style="color: #16a34a; font-weight: bold;">${term}</span>`);
        });
        orangeTerms.forEach(term => {
          const regex = new RegExp(`\\b${term}\\b`, 'g');
          content = content.replace(regex, `<span style="color: #ea580c; font-weight: bold;">${term}</span>`);
        });
        content = content.replace(/ARTÙ/g, `<span style="color: #2563eb; font-weight: bold;">ARTÙ</span>`);
      }

      if (content.trim().startsWith("<")) {
        document.getElementById('guide-display-body').innerHTML = content;
      } else {
        document.getElementById('guide-display-body').innerHTML = content.replace(/\n/g, '<br>');
      }

      const container = document.querySelector('.guides-container');
      if (container) {
        container.classList.add('detail-active');
      }

      // Se lo schermo è ridotto (es. <= 1024px), scrolla fino alla scheda pergamena
      if (window.innerWidth <= 1024) {
        const target = document.getElementById('guide-parchment-sheet');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },

    backToGuidesList: function() {
      const container = document.querySelector('.guides-container');
      if (container) {
        container.classList.remove('detail-active');
      }
      document.querySelectorAll('.guide-list-item').forEach(item => {
        item.classList.remove('active');
      });
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
      // Attiva pannello studenti per default (come Palestra di Riflessione)
      this.selectStatsCategory('students');
    },

    renderTeacherStats: function() {
      const allUsers = window.EroiDB.getAllUsers();
      const students = allUsers.filter(u => u.role === 'student');
      const teachers = allUsers.filter(u => u.role === 'teacher' || u.role === 'admin');
      const classes = window.EroiDB.getClasses();
      const forestieri = allUsers.filter(u => u.role === 'amico' || (u.role === 'student' && !u.classId));
      
      const schools = new Set(Object.values(classes).map(c => c.school).filter(Boolean));

      document.getElementById('teacher-stats-teachers').textContent = teachers.length;
      document.getElementById('teacher-stats-students').textContent = students.length;
      document.getElementById('teacher-stats-classes').textContent = Object.keys(classes).length;
      document.getElementById('teacher-stats-schools').textContent = schools.size;
      document.getElementById('teacher-stats-forestieri').textContent = forestieri.length;

      // Renderizza analytics shop
      const shopLogs = window.EroiDB.getLogs().filter(l => l.action.includes("Acquistato"));
      const analyticsBox = document.getElementById('shop-analytics-info');
      
      if (shopLogs.length === 0) {
        analyticsBox.innerHTML = `<p><i>Nessun acquisto ancora effettuato nello shop da parte degli studenti.</i></p>`;
      } else {
        // Conta popolarità
        const counts = {};
        shopLogs.forEach(l => {
          // Estrae il nome dell'oggetto racchiuso tra virgolette
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
    },

    populateClassSelects: function() {
      const classes = window.EroiDB.getClasses();
      const studentClassSelect = document.getElementById('new-student-class');
      const filterClassSelect = document.getElementById('filter-class-teacher');

      const user = window.EroiAuth.getCurrentUser();
      const filtered = Object.values(classes).filter(c => {
        if (user.role === 'admin') return true;
        return c.teacher === user.email || (c.collaborators && c.collaborators.includes(user.email));
      });

      const optionsHtml = filtered.map(c => `
        <option value="${c.id}">${c.name} (${c.id})</option>
      `).join('');

      studentClassSelect.innerHTML = optionsHtml;
      filterClassSelect.innerHTML = `<option value="all">Tutte le Classi</option>` +
                                     `<option value="forestieri">Forestieri (Senza classe)</option>` +
                                     optionsHtml;
    },

    renderTeacherClasses: function() {
      const classes = window.EroiDB.getClasses();
      const tbody = document.querySelector('#teacher-classes-table tbody');
      tbody.innerHTML = '';

      const user = window.EroiAuth.getCurrentUser();
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

      const user = window.EroiAuth.getCurrentUser();
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
      
      const teacher = window.EroiAuth.getCurrentUser();

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
      
      const teacher = window.EroiAuth.getCurrentUser();
      
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
        const teacher = window.EroiAuth.getCurrentUser();
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

      window.EroiDB.saveMission(missionId, { title, category, area, desc, rewards: { xp, dracme }, questions });
      const teacher = window.EroiAuth.getCurrentUser();
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
      const btn = document.getElementById('btn-save-mission');
      btn.textContent = 'Crea e Pubblica Missione';
      btn.removeAttribute('data-edit-id');
      // Ripristina l'onclick originale
      btn.onclick = null;
      const banner = document.getElementById('mission-edit-banner');
      if (banner) banner.remove();
    },

    deleteMission: function(missionId) {
      const isPreset = window.EroiDB.isPresetMission(missionId);
      const teacher = window.EroiAuth.getCurrentUser();

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
      const teacher = window.EroiAuth.getCurrentUser();
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
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px;">
          ${hidden.map(m => `
            <div style="background: rgba(255,255,255,0.03); border: 1px dashed rgba(212,175,55,0.25); border-radius: 10px; padding: 14px;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <div>
                  <strong style="font-size:0.9rem;">${m.title}</strong>
                  <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">${m.category} · ${m.area}</div>
                </div>
                <span style="font-size:0.72rem; background:rgba(212,175,55,0.1); color:var(--gold); border:1px solid rgba(212,175,55,0.3); border-radius:4px; padding:1px 6px; white-space:nowrap;">🔒 ${m.id}</span>
              </div>
              <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">
                ${m.questions ? m.questions.length : 0} domande · XP +${m.rewards ? m.rewards.xp : '?'} · Dracme +${m.rewards ? m.rewards.dracme : '?'}
              </div>
              <button class="btn" style="width:100%; padding:6px; font-size:0.8rem;" onclick="EroiApp.restoreMission('${m.id}')">
                <i class="fa-solid fa-rotate-left"></i> Ripristina
              </button>
            </div>
          `).join('')}
        </div>
      `;
    },

    // --- TEACHER SHOP CONTROL ---
    renderTeacherShop: function() {
      const items = window.EroiDB.getShopItems();
      const tbody = document.querySelector('#teacher-shop-table tbody');
      tbody.innerHTML = '';

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
        const teacher = window.EroiAuth.getCurrentUser();
        window.EroiDB.saveShopItem(itemId, item);
        window.EroiDB.logActivity(teacher.email, `${item.active ? 'Attivato' : 'Disattivato'} l'oggetto shop: ${item.name}`);
        this.renderTeacherShop();
      }
    },

    deleteShopItem: function(itemId) {
      if (confirm(`Rimuovere l'articolo ${itemId} dallo shop?`)) {
        const teacher = window.EroiAuth.getCurrentUser();
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
          <td><strong>${h.name}</strong></td>
          <td>${h.category}</td>
          <td><input type="text" id="helper-pass-${h.id}" class="form-control" style="padding:4px; font-size:0.8rem;" value="${h.bonusPassive || ''}"></td>
          <td><input type="text" id="helper-power-${h.id}" class="form-control" style="padding:4px; font-size:0.8rem;" value="${h.potereSpeciale || ''}"></td>
          <td><input type="text" id="helper-imm-${h.id}" class="form-control" style="padding:4px; font-size:0.8rem;" value="${h.immunita || ''}"></td>
          <td>
            <button class="btn" style="padding:4px 8px; font-size:0.75rem;" onclick="EroiApp.saveHelperConfig('${h.id}')">
              Salva
            </button>
          </td>
        `;
        hTbody.appendChild(tr);
      });

      // 2. Artifacts
      const artifacts = window.EroiDB.getArtifacts();
      const aTbody = document.querySelector('#teacher-artifacts-table tbody');
      aTbody.innerHTML = '';

      Object.values(artifacts).forEach(a => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="font-size:1.3rem;">${a.image}</td>
          <td><strong>${a.id}</strong></td>
          <td>${a.name}</td>
          <td>${a.rarity}</td>
          <td>${a.bonus}</td>
          <td>
            <button class="btn btn-danger" style="padding: 4px 8px; font-size:0.75rem;" onclick="EroiApp.deleteArtifact('${a.id}')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        `;
        aTbody.appendChild(tr);
      });
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
        
        const teacher = window.EroiAuth.getCurrentUser();
        window.EroiDB.saveHelper(helperId, h);
        window.EroiDB.logActivity(teacher.email, `Personalizzato l'aiutante ${h.name}`);
        this.showToast(`Aiutante ${h.name} configurato!`, "success");
      }
    },

    deleteArtifact: function(artId) {
      if (confirm(`Cancellare definitivamente l'artefatto ${artId}? Verrà disattivato e rimosso anche dagli studenti.`)) {
        const teacher = window.EroiAuth.getCurrentUser();
        window.EroiDB.deleteArtifact(artId);
        window.EroiDB.logActivity(teacher.email, `Eliminato l'artefatto ${artId}`);
        this.showToast("Artefatto eliminato.", "success");
        this.renderTeacherHelpersAndArtifacts();
      }
    },

    // --- TEACHER STUDY GUIDES ---
    renderTeacherGuides: function() {
      const guides = window.EroiDB.getStudyGuides();
      const tbody = document.querySelector('#teacher-guides-table tbody');
      tbody.innerHTML = '';

      guides.forEach(g => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${g.id}</strong></td>
          <td>${g.title}</td>
          <td>${g.category}</td>
          <td>${g.summary}</td>
          <td>
            <button class="btn btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="EroiApp.deleteGuide('${g.id}')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    },

    deleteGuide: function(guideId) {
      if (confirm(`Eliminare la scheda didattica ${guideId}?`)) {
        const teacher = window.EroiAuth.getCurrentUser();
        window.EroiDB.deleteStudyGuide(guideId);
        window.EroiDB.logActivity(teacher.email, `Eliminata scheda studio: ${guideId}`);
        this.showToast("Scheda studio rimossa.", "success");
        this.renderTeacherGuides();
      }
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

      const user = window.EroiAuth.getCurrentUser();
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

      const user = window.EroiAuth.getCurrentUser();
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

      const teacher = window.EroiAuth.getCurrentUser();
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

      const teacher = window.EroiAuth.getCurrentUser();
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
      const user = window.EroiAuth.getCurrentUser();
      window.EroiDB.logActivity(user.email, `Eliminato il torneo interno ${id}.`);
      this.showToast("Torneo eliminato con successo.", "success");

      this.renderTeacherTournaments();
    },

    renderTeacherTournaments: function() {
      const user = window.EroiAuth.getCurrentUser();
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
      document.getElementById('admin-setting-secondterm').checked = !!settings.secondTermActive;

      // Documenti legali
      document.getElementById('legal-doc-privacy').value = settings.privacy || '';
      document.getElementById('legal-doc-terms').value = settings.terms || '';
      document.getElementById('legal-doc-cookies').value = settings.cookies || '';
      document.getElementById('legal-doc-gdpr').value = settings.gdpr || '';

      this.renderAdminStaff();
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
      if (user.role === 'teacher' || user.role === 'admin') {
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

    // --- LEGAL POPUPS ---
    openLegalModal: function(docKey) {
      const settings = window.EroiDB.getSettings();
      const title = document.getElementById('modal-legal-title');
      const body = document.getElementById('modal-legal-body');

      let heading = '';
      let text = '';

      if (docKey === 'privacy') {
        heading = 'Privacy Policy';
        text = settings.privacy;
      } else if (docKey === 'terms') {
        heading = 'Termini e Condizioni';
        text = settings.terms;
      } else if (docKey === 'cookies') {
        heading = 'Cookie Policy';
        text = settings.cookies;
      } else if (docKey === 'gdpr') {
        heading = 'Informativa GDPR';
        text = settings.gdpr;
      } else if (docKey === 'contacts') {
        heading = 'Contatti Globali';
        text = settings.contacts;
      }

      title.textContent = heading;
      body.innerHTML = text.replace(/\n/g, '<br>');

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
    }
  };

  // Inizializza l'applicazione al caricamento del DOM
  document.addEventListener('DOMContentLoaded', function() {
    window.EroiApp.init();
  });
})();
