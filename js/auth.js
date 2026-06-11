// Eroi in Viaggio - Authentication & Role Management Module
(function() {
  const SESSION_KEY = 'eroi_viaggio_session';

  // Funzione asincrona di hashing SHA-256 nativa del browser
  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  window.EroiAuth = {
    // Calcola l'hash della password (esposto per permettere la creazione di nuovi docenti/studenti)
    hashPassword: async function(password) {
      return await sha256(password);
    },

    // Login asincrono (simula Firebase Auth)
    login: async function(email, password) {
      const emailClean = email.trim().toLowerCase();
      const user = window.EroiDB.getUser(emailClean);
      
      if (!user) {
        throw new Error("Utente non trovato.");
      }

      const hash = await sha256(password);
      if (user.passwordHash !== hash) {
        throw new Error("Password errata.");
      }

      // Salva la sessione
      const sessionData = {
        email: user.email,
        name: user.name,
        role: user.role,
        classId: user.classId || null,
        loggedInAt: new Date().toISOString()
      };
      
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      window.EroiDB.logActivity(user.email, "Accesso effettuato con successo (Ruolo: " + user.role + ").");
      return sessionData;
    },

    // Registrazione Forestiero (Ospite / Amico)
    register: async function(name, email, password, avatarClass) {
      const emailClean = email.trim().toLowerCase();
      const userExists = window.EroiDB.getUser(emailClean);
      if (userExists) {
        throw new Error("Email già registrata.");
      }

      const hash = await sha256(password);

      // Salva utente con ruolo 'amico' (Forestiero)
      window.EroiDB.saveUser(emailClean, {
        email: emailClean,
        name: name,
        role: "amico",
        classId: "",
        passwordHash: hash
      });

      // Salva il profilo studente
      window.EroiDB.saveStudentProfile(emailClean, {
        email: emailClean,
        name: name,
        avatarClass: avatarClass,
        level: "Viaggiatore",
        xp: 0,
        dracme: 15,
        stats: { ...window.EroiMockData.avatars[avatarClass].baseStats },
        activeHelper: null,
        activeArtifacts: [],
        unlockedAreas: ["Olimpo"]
      });

      // Salva la sessione
      const sessionData = {
        email: emailClean,
        name: name,
        role: "amico",
        classId: null,
        loggedInAt: new Date().toISOString()
      };
      
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      window.EroiDB.logActivity(emailClean, "Registrato come Forestiero ed effettuato l'accesso.");
      return sessionData;
    },

    // Logout
    logout: function() {
      const user = this.getCurrentUser();
      if (user) {
        window.EroiDB.logActivity(user.email, "Disconnessione effettuata.");
      }
      localStorage.removeItem(SESSION_KEY);
    },

    // Recupera l'utente attualmente loggato dalla sessione locale
    getCurrentUser: function() {
      const stored = localStorage.getItem(SESSION_KEY);
      if (!stored) return null;
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    },

    // Verifica se l'utente ha un determinato ruolo
    hasRole: function(allowedRoles) {
      const user = this.getCurrentUser();
      if (!user) return false;
      return allowedRoles.includes(user.role);
    },

    // Recupero Password simulato
    recoverPassword: async function(email) {
      const emailClean = email.trim().toLowerCase();
      const user = window.EroiDB.getUser(emailClean);
      
      if (!user) {
        throw new Error("Nessun account associato a questa email.");
      }

      // Simula l'invio dell'email scrivendo nel log di sistema
      window.EroiDB.logActivity("system", "Simulazione recupero password inviata a: " + emailClean);
      return true;
    },

    // Modifica password per l'utente loggato
    changePassword: async function(email, oldPassword, newPassword) {
      const emailClean = email.trim().toLowerCase();
      const user = window.EroiDB.getUser(emailClean);
      
      if (!user) {
        throw new Error("Utente non trovato.");
      }

      const oldHash = await sha256(oldPassword);
      if (user.passwordHash !== oldHash) {
        throw new Error("La vecchia password è errata.");
      }

      const newHash = await sha256(newPassword);
      window.EroiDB.saveUser(emailClean, { passwordHash: newHash });
      window.EroiDB.logActivity(emailClean, "Modificata la password di accesso.");
      return true;
    }
  };
})();
