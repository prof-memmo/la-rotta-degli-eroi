
// Eroi in Viaggio - Local Database Module (localStorage Wrapper)
(function() {
  const STORAGE_KEY = 'eroi_viaggio_state_v23';
  let dbState = null;

  window.EroiDB = {
    init: function() {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          dbState = JSON.parse(stored);
          // Rilevamento automatico e migrazione degli hash password se obsoleti
          if (dbState && dbState.users && dbState.users["prof.memmo@gmail.com"] && 
              dbState.users["prof.memmo@gmail.com"].passwordHash === "5cf72d8a57e3350cb175b5b91cfb5fa15b7410313f8c5b058a9e048dfd6a8946") {
            console.log("Rilevato database obsoleto con hash errati, eseguo il ripristino automatico...");
            this.resetDatabase();
          }
          
          // Migrazione automatica per nuove schede o immagini in study_guides
          if (dbState && dbState.study_guides && window.EroiMockData && window.EroiMockData.study_guides) {
            let updated = false;
            window.EroiMockData.study_guides.forEach(mockG => {
              const dbG = dbState.study_guides.find(g => g.id === mockG.id);
              if (dbG) {
                if (mockG.image && !dbG.image) {
                  dbG.image = mockG.image;
                  updated = true;
                }
              } else {
                dbState.study_guides.push(JSON.parse(JSON.stringify(mockG)));
                updated = true;
              }
            });
            if (updated) {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(dbState));
              console.log("Database migrato con successo: aggiornate schede di studio.");
            }
          }
        } catch (e) {
          console.error("Errore nel caricamento del database locale, resetto ai dati di default.", e);
          this.resetDatabase();
        }
      } else {
        this.resetDatabase();
      }
    },

    save: function() {
      if (dbState) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dbState));
      }
    },

    resetDatabase: function() {
      // Clona profondamente i dati fittizi iniziali
      dbState = JSON.parse(JSON.stringify(window.EroiMockData));
      this.save();
      this.logActivity("system", "Ripristino del database ai valori iniziali completato.");
    },

    getSettings: function() {
      return dbState.settings;
    },

    saveSettings: function(newSettings) {
      dbState.settings = { ...dbState.settings, ...newSettings };
      this.save();
    },

    getRegolamenti: function() {
      return dbState.regolamenti || { studente: [], docente: [] };
    },

    saveRegolamenti: function(regolamenti) {
      dbState.regolamenti = regolamenti;
      this.save();
    },

    // --- UTENTI ED AUTENTICAZIONE ---
    getUser: function(email) {
      return dbState.users[email.toLowerCase()] || null;
    },

    saveUser: function(email, userData) {
      const key = email.toLowerCase();
      dbState.users[key] = { ...dbState.users[key], ...userData };
      this.save();
    },

    deleteUser: function(email) {
      const key = email.toLowerCase();
      if (dbState.users[key]) {
        delete dbState.users[key];
        if (dbState.students_profile[key]) {
          delete dbState.students_profile[key];
        }
        if (dbState.inventories[key]) {
          delete dbState.inventories[key];
        }
        this.save();
      }
    },

    getAllUsers: function() {
      return Object.values(dbState.users);
    },

    // --- PROFILI STUDENTI ---
    getStudentProfile: function(email) {
      return dbState.students_profile[email.toLowerCase()] || null;
    },

    saveStudentProfile: function(email, profileData) {
      const key = email.toLowerCase();
      dbState.students_profile[key] = { ...dbState.students_profile[key], ...profileData };
      this.save();
    },

    getAllStudents: function() {
      return Object.values(dbState.students_profile);
    },

    // --- CLASSI ---
    getClasses: function() {
      return dbState.classes;
    },

    saveClass: function(classId, classData) {
      if (!classData.code) {
        classData.code = "ER-" + Math.random().toString(36).substring(2, 6).toUpperCase();
      }
      if (!classData.collaborators) {
        classData.collaborators = [];
      }
      dbState.classes[classId] = { ...dbState.classes[classId], ...classData };
      this.save();
    },

    deleteClass: function(classId) {
      if (dbState.classes[classId]) {
        delete dbState.classes[classId];
        // Sgancia gli studenti associati a questa classe rimettendoli in classe null
        Object.keys(dbState.users).forEach(email => {
          if (dbState.users[email].classId === classId) {
            dbState.users[email].classId = "";
          }
        });
        this.save();
      }
    },

    getClassByCode: function(code) {
      const cleanCode = code.trim().toUpperCase();
      return Object.values(dbState.classes).find(c => c.code && c.code.toUpperCase() === cleanCode) || null;
    },

    joinClassAsCollaborator: function(classId, email) {
      const c = dbState.classes[classId];
      if (c) {
        if (!c.collaborators) c.collaborators = [];
        const cleanEmail = email.toLowerCase();
        if (!c.collaborators.includes(cleanEmail)) {
          c.collaborators.push(cleanEmail);
          this.save();
        }
      }
    },

    leaveClassAsCollaborator: function(classId, email) {
      const c = dbState.classes[classId];
      if (c && c.collaborators) {
        const cleanEmail = email.toLowerCase();
        c.collaborators = c.collaborators.filter(e => e !== cleanEmail);
        this.save();
      }
    },

    // --- MISSIONI ---
    getMissions: function() {
      return dbState.missions;
    },

    saveMission: function(missionId, missionData) {
      // Cerca se esiste già
      const index = dbState.missions.findIndex(m => m.id === missionId);
      if (index !== -1) {
        dbState.missions[index] = { ...dbState.missions[index], ...missionData };
      } else {
        dbState.missions.push({ id: missionId, ...missionData });
      }
      this.save();
    },

    deleteMission: function(missionId) {
      dbState.missions = dbState.missions.filter(m => m.id !== missionId);
      this.save();
    },

    // --- AIUTANTI ---
    getHelpers: function() {
      return dbState.helpers;
    },

    saveHelper: function(helperId, helperData) {
      if (dbState.helpers[helperId]) {
        dbState.helpers[helperId] = { ...dbState.helpers[helperId], ...helperData };
        this.save();
      }
    },

    // --- ARTEFATTI ---
    getArtifacts: function() {
      return dbState.artifacts;
    },

    saveArtifact: function(artifactId, artifactData) {
      if (dbState.artifacts[artifactId]) {
        dbState.artifacts[artifactId] = { ...dbState.artifacts[artifactId], ...artifactData };
      } else {
        dbState.artifacts[artifactId] = { id: artifactId, ...artifactData };
      }
      this.save();
    },

    deleteArtifact: function(artifactId) {
      if (dbState.artifacts[artifactId]) {
        delete dbState.artifacts[artifactId];
        // Rimuove dagli studenti che lo avevano equipaggiato
        Object.keys(dbState.students_profile).forEach(email => {
          const profile = dbState.students_profile[email];
          if (profile.activeArtifacts) {
            profile.activeArtifacts = profile.activeArtifacts.filter(id => id !== artifactId);
          }
        });
        this.save();
      }
    },

    // --- INVENTARI ---
    getInventory: function(email) {
      const key = email.toLowerCase();
      if (!dbState.inventories) dbState.inventories = {};
      return dbState.inventories[key] || [];
    },

    saveInventory: function(email, inventoryList) {
      const key = email.toLowerCase();
      if (!dbState.inventories) dbState.inventories = {};
      dbState.inventories[key] = inventoryList;
      this.save();
    },

    // --- SHOP ITEMS ---
    getShopItems: function() {
      return dbState.shop_items;
    },

    saveShopItem: function(itemId, itemData) {
      const index = dbState.shop_items.findIndex(item => item.id === itemId);
      if (index !== -1) {
        dbState.shop_items[index] = { ...dbState.shop_items[index], ...itemData };
      } else {
        dbState.shop_items.push({ id: itemId, ...itemData });
      }
      this.save();
    },

    deleteShopItem: function(itemId) {
      dbState.shop_items = dbState.shop_items.filter(item => item.id !== itemId);
      this.save();
    },

    // --- AREA STUDIO / GUIDE DIDATTICHE ---
    getStudyGuides: function() {
      return dbState.study_guides;
    },

    saveStudyGuide: function(guideId, guideData) {
      const index = dbState.study_guides.findIndex(g => g.id === guideId);
      if (index !== -1) {
        dbState.study_guides[index] = { ...dbState.study_guides[index], ...guideData };
      } else {
        dbState.study_guides.push({ id: guideId, ...guideData });
      }
      this.save();
    },

    deleteStudyGuide: function(guideId) {
      dbState.study_guides = dbState.study_guides.filter(g => g.id !== guideId);
      this.save();
    },

    // --- CITAZIONI E BRANI ---
    getCitations: function() {
      return dbState.citations || [];
    },

    saveCitations: function(citationsList) {
      dbState.citations = citationsList;
      this.save();
    },

    getBrani: function() {
      return dbState.brani || [];
    },

    saveBrani: function(braniList) {
      dbState.brani = braniList;
      this.save();
    },

    // --- LIVELLI ---
    getLevels: function() {
      return dbState.levels;
    },

    // --- TORNEI ---
    getTournaments: function() {
      if (!dbState.tournaments) dbState.tournaments = [];
      return dbState.tournaments;
    },

    saveTournament: function(tournamentId, tournamentData) {
      if (!dbState.tournaments) dbState.tournaments = [];
      const index = dbState.tournaments.findIndex(t => t.id === tournamentId);
      if (index !== -1) {
        dbState.tournaments[index] = { ...dbState.tournaments[index], ...tournamentData };
      } else {
        dbState.tournaments.push({ id: tournamentId, ...tournamentData });
      }
      this.save();
    },

    deleteTournament: function(tournamentId) {
      if (!dbState.tournaments) dbState.tournaments = [];
      dbState.tournaments = dbState.tournaments.filter(t => t.id !== tournamentId);
      this.save();
    },

    // --- LOG ATTIVITÀ ---
    getLogs: function() {
      return dbState.activity_logs || [];
    },

    logActivity: function(user, action) {
      const log = {
        timestamp: new Date().toISOString(),
        user: user || "unknown",
        action: action
      };
      if (!dbState.activity_logs) dbState.activity_logs = [];
      dbState.activity_logs.unshift(log); // Aggiunge all'inizio
      // Limita a 200 logs per non saturare localStorage
      if (dbState.activity_logs.length > 200) {
        dbState.activity_logs = dbState.activity_logs.slice(0, 200);
      }
      this.save();
    },

    // --- BACKUP & EXPORT ---
    exportBackup: function() {
      return JSON.stringify(dbState, null, 2);
    },

    importBackup: function(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        // Validazione minima delle chiavi principali
        const requiredKeys = ["users", "classes", "students_profile", "missions", "shop_items", "settings"];
        const keys = Object.keys(parsed);
        const hasAll = requiredKeys.every(k => keys.includes(k));
        
        if (!hasAll) {
          throw new Error("Formato del backup non valido. Mancano collezioni necessarie.");
        }

        dbState = parsed;
        this.save();
        this.logActivity("admin", "Ripristino totale del database effettuato da backup esterno.");
        return true;
      } catch (e) {
        console.error("Errore durante l'importazione del backup: ", e);
        return false;
      }
    },

    exportStudentsCSV: function(classId) {
      let students = this.getAllStudents();
      if (classId) {
        students = students.filter(s => {
          const u = this.getUser(s.email);
          return u && u.classId === classId;
        });
      }

      // Costruiamo le righe CSV
      const headers = ["Nome", "Email", "Classe", "Livello", "XP", "Dracme", "Coraggio", "Astuzia", "Sapienza", "Onore", "Aiutante Attivo"];
      const rows = [headers.join(",")];

      students.forEach(s => {
        const u = this.getUser(s.email);
        const userClass = u ? u.classId : "";
        const row = [
          `"${s.name.replace(/"/g, '""')}"`,
          `"${s.email}"`,
          `"${userClass}"`,
          `"${s.level}"`,
          s.xp,
          s.dracme,
          s.stats.coraggio,
          s.stats.astuzia,
          s.stats.sapienza,
          s.stats.onore,
          `"${s.activeHelper || 'Nessuno'}"`
        ];
        rows.push(row.join(","));
      });

      return rows.join("\n");
    }
  };

  // Inizializza automaticamente all'importazione del file
  window.EroiDB.init();
})();
