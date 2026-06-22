
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
          
          // Migrazione automatica per nuove schede, missioni, aiutanti, artefatti o allineamento contenuti
          let updated = false;
          
          // Rimozione hardcoded delle vecchie lezioni rimosse
          if (dbState.study_guides) {
            const idx = dbState.study_guides.findIndex(g => g.id === "ref_rimediazione_film_libri");
            if (idx > -1) { dbState.study_guides.splice(idx, 1); updated = true; }
          }
          if (dbState.missions) {
            const idx = dbState.missions.findIndex(m => m.id === "quiz_rimediazione");
            if (idx > -1) { dbState.missions.splice(idx, 1); updated = true; }
            
            const qV = dbState.missions.find(m => m.id === "quiz_videogiochi");
            if (qV && qV.unlockedBy === "quiz_rimediazione") {
              qV.unlockedBy = "nib_vendetta";
              updated = true;
            }
          }
          
          // 1. Migrazione per study_guides (aggiorna contenuti/immagini delle schede predefinite)
          if (dbState && dbState.study_guides && window.EroiMockData && window.EroiMockData.study_guides) {
            window.EroiMockData.study_guides.forEach(mockG => {
              const dbG = dbState.study_guides.find(g => g.id === mockG.id);
              if (dbG) {
                if (dbG.content !== mockG.content || dbG.notes !== mockG.notes || dbG.image !== mockG.image || dbG.title !== mockG.title || dbG.summary !== mockG.summary || dbG.styleFilter !== mockG.styleFilter || dbG.category !== mockG.category) {
                  dbG.content = mockG.content;
                  dbG.category = mockG.category;
                  dbG.notes = mockG.notes;
                  dbG.image = mockG.image;
                  dbG.title = mockG.title;
                  dbG.summary = mockG.summary;
                  dbG.styleFilter = mockG.styleFilter;
                  updated = true;
                }
              } else {
                dbState.study_guides.push(JSON.parse(JSON.stringify(mockG)));
                updated = true;
              }
            });
          }

          // 2. Migrazione per missioni (aggiunge nuove missioni predefinite e aggiorna i quiz/domande)
          if (dbState && dbState.missions && window.EroiMockData && window.EroiMockData.missions) {
            window.EroiMockData.missions.forEach(mockM => {
              const dbM = dbState.missions.find(m => m.id === mockM.id);
              if (dbM) {
                const dbQStr = JSON.stringify(dbM.questions);
                const mockQStr = JSON.stringify(mockM.questions);
                if (dbQStr !== mockQStr || dbM.title !== mockM.title || dbM.desc !== mockM.desc || dbM.unlockedBy !== mockM.unlockedBy || dbM.area !== mockM.area || dbM.category !== mockM.category) {
                  dbM.questions = JSON.parse(JSON.stringify(mockM.questions));
                  dbM.title = mockM.title;
                  dbM.desc = mockM.desc;
                  dbM.rewards = JSON.parse(JSON.stringify(mockM.rewards));
                  dbM.area = mockM.area;
                  dbM.unlockedBy = mockM.unlockedBy;
                  dbM.category = mockM.category;
                  updated = true;
                }
              } else {
                dbState.missions.push(JSON.parse(JSON.stringify(mockM)));
                updated = true;
              }
            });
          }

          // 3. Migrazione per aiutanti (helpers)
          if (dbState && dbState.helpers && window.EroiMockData && window.EroiMockData.helpers) {
            Object.keys(window.EroiMockData.helpers).forEach(helperId => {
              const mockH = window.EroiMockData.helpers[helperId];
              if (!dbState.helpers[helperId]) {
                dbState.helpers[helperId] = JSON.parse(JSON.stringify(mockH));
                updated = true;
              } else {
                const dbH = dbState.helpers[helperId];
                if (dbH.bonusPassive !== mockH.bonusPassive || dbH.potereSpeciale !== mockH.potereSpeciale || dbH.immunita !== mockH.immunita || dbH.name !== mockH.name || dbH.image !== mockH.image) {
                  dbH.name = mockH.name;
                  dbH.image = mockH.image;
                  dbH.desc = mockH.desc;
                  dbH.bonusPassive = mockH.bonusPassive;
                  dbH.potereSpeciale = mockH.potereSpeciale;
                  dbH.immunita = mockH.immunita;
                  updated = true;
                }
              }
            });
          }

          // 4. Migrazione per artefatti (artifacts)
          if (dbState && dbState.artifacts && window.EroiMockData && window.EroiMockData.artifacts) {
            Object.keys(window.EroiMockData.artifacts).forEach(artId => {
              const mockA = window.EroiMockData.artifacts[artId];
              if (!dbState.artifacts[artId]) {
                dbState.artifacts[artId] = JSON.parse(JSON.stringify(mockA));
                updated = true;
              } else {
                const dbA = dbState.artifacts[artId];
                if (dbA.bonus !== mockA.bonus || dbA.desc !== mockA.desc || dbA.name !== mockA.name || dbA.image !== mockA.image) {
                  dbA.name = mockA.name;
                  dbA.desc = mockA.desc;
                  dbA.bonus = mockA.bonus;
                  dbA.image = mockA.image;
                  updated = true;
                }
              }
            });
          }

          // 5. Inizializzazione per diario di bordo
          if (dbState && !dbState.diaries) {
            dbState.diaries = [];
            updated = true;
          }

          // Inizializzazione teacher_profiles
          if (dbState && !dbState.teacher_profiles) {
            dbState.teacher_profiles = {};
            updated = true;
          }

          // 6. Migrazione per settings (assicura la presenza di tutte le chiavi predefinite come activeDiaries)
          if (dbState && dbState.settings && window.EroiMockData && window.EroiMockData.settings) {
            Object.keys(window.EroiMockData.settings).forEach(key => {
              if (dbState.settings[key] === undefined) {
                dbState.settings[key] = JSON.parse(JSON.stringify(window.EroiMockData.settings[key]));
                updated = true;
              }
            });
          }

          // 7. Migrazione forzata Regolamenti (per isolamento economico)
          if (dbState && window.EroiMockData && window.EroiMockData.regolamenti) {
            dbState.regolamenti = JSON.parse(JSON.stringify(window.EroiMockData.regolamenti));
            updated = true;
          }

          if (updated) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dbState));
            console.log("Database migrato con successo: aggiornate schede di studio, missioni, aiutanti e artefatti.");
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

    // --- RICHIESTE DOCENTI (Firestore) ---
    saveTeacherRequest: async function(requestData) {
      if (!window.fbDb) return;
      await window.fbDb.collection("pending_requests").add({
        ...requestData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    },
    getTeacherRequests: async function() {
      if (!window.fbDb) return [];
      const snapshot = await window.fbDb.collection("pending_requests").get();
      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    },
    approveTeacherRequest: async function(requestId, requestData) {
      if (!window.fbDb) return;
      const uid = requestData.uid;
      // Aggiorna ruolo in users (cloud)
      await window.fbDb.collection('users').doc(uid).update({
        role: 'docente',
        setupComplete: true,
        approved: true,
        scuola: requestData.scuola,
        citta: requestData.citta
      });
      // Elimina da pending_requests
      await window.fbDb.collection("pending_requests").doc(requestId).delete();
    },
    rejectTeacherRequest: async function(requestId) {
      if (!window.fbDb) return;
      await window.fbDb.collection("pending_requests").doc(requestId).delete();
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

    // --- PROFILI PLAYER DOCENTE ---
    getTeacherPlayerProfile: function(email) {
      if (!dbState.teacher_profiles) dbState.teacher_profiles = {};
      return dbState.teacher_profiles[email.toLowerCase()] || null;
    },

    saveTeacherPlayerProfile: function(email, profileData) {
      if (!dbState.teacher_profiles) dbState.teacher_profiles = {};
      const key = email.toLowerCase();
      dbState.teacher_profiles[key] = { ...dbState.teacher_profiles[key], ...profileData };
      this.save();
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
    getPresetMissionIds: function() {
      if (!window.EroiMockData || !window.EroiMockData.missions) return [];
      return window.EroiMockData.missions.map(m => m.id);
    },

    isPresetMission: function(missionId) {
      return this.getPresetMissionIds().includes(missionId);
    },

    getMissions: function() {
      // Restituisce solo le missioni non nascoste
      return dbState.missions.filter(m => !m.hidden);
    },

    getHiddenMissions: function() {
      // Restituisce le missioni nasconate (solo le preset)
      return dbState.missions.filter(m => m.hidden);
    },

    saveMission: function(missionId, missionData) {
      const index = dbState.missions.findIndex(m => m.id === missionId);
      if (index !== -1) {
        dbState.missions[index] = { ...dbState.missions[index], ...missionData, hidden: false };
      } else {
        dbState.missions.push({ id: missionId, ...missionData, hidden: false });
      }
      this.save();
    },

    hideMission: function(missionId) {
      // Nasconde una missione preset (non la elimina)
      const index = dbState.missions.findIndex(m => m.id === missionId);
      if (index !== -1) {
        dbState.missions[index].hidden = true;
        this.save();
      }
    },

    deleteMission: function(missionId) {
      // Elimina definitivamente (solo per missioni custom)
      dbState.missions = dbState.missions.filter(m => m.id !== missionId);
      this.save();
    },

    restoreMission: function(missionId) {
      // Ripristina una preset dal mockData originale
      const original = window.EroiMockData && window.EroiMockData.missions
        ? window.EroiMockData.missions.find(m => m.id === missionId)
        : null;
      const index = dbState.missions.findIndex(m => m.id === missionId);
      if (index !== -1 && original) {
        dbState.missions[index] = { ...JSON.parse(JSON.stringify(original)), hidden: false };
      } else if (index !== -1) {
        dbState.missions[index].hidden = false;
      }
      this.save();
    },

    // --- AIUTANTI ---
    getHelpers: function() {
      const all = dbState.helpers;
      const result = {};
      Object.keys(all).forEach(k => { if (!all[k].hidden) result[k] = all[k]; });
      return result;
    },

    getHiddenHelpers: function() {
      const all = dbState.helpers;
      const result = {};
      Object.keys(all).forEach(k => { if (all[k].hidden) result[k] = all[k]; });
      return result;
    },

    isPresetHelper: function(helperId) {
      return !!(window.EroiMockData && window.EroiMockData.helpers && window.EroiMockData.helpers[helperId]);
    },

    saveHelper: function(helperId, helperData) {
      if (dbState.helpers[helperId]) {
        dbState.helpers[helperId] = { ...dbState.helpers[helperId], ...helperData, hidden: false };
        this.save();
      }
    },

    hideHelper: function(helperId) {
      if (dbState.helpers[helperId]) {
        dbState.helpers[helperId].hidden = true;
        this.save();
      }
    },

    restoreHelper: function(helperId) {
      const original = window.EroiMockData && window.EroiMockData.helpers
        ? window.EroiMockData.helpers[helperId]
        : null;
      if (dbState.helpers[helperId]) {
        if (original) {
          dbState.helpers[helperId] = { ...JSON.parse(JSON.stringify(original)), hidden: false };
        } else {
          dbState.helpers[helperId].hidden = false;
        }
        this.save();
      }
    },

    // --- ARTEFATTI ---
    getArtifacts: function() {
      const all = dbState.artifacts;
      const result = {};
      Object.keys(all).forEach(k => { if (!all[k].hidden) result[k] = all[k]; });
      return result;
    },

    getHiddenArtifacts: function() {
      const all = dbState.artifacts;
      const result = {};
      Object.keys(all).forEach(k => { if (all[k].hidden) result[k] = all[k]; });
      return result;
    },

    isPresetArtifact: function(artifactId) {
      return !!(window.EroiMockData && window.EroiMockData.artifacts && window.EroiMockData.artifacts[artifactId]);
    },

    saveArtifact: function(artifactId, artifactData) {
      if (dbState.artifacts[artifactId]) {
        dbState.artifacts[artifactId] = { ...dbState.artifacts[artifactId], ...artifactData, hidden: false };
      } else {
        dbState.artifacts[artifactId] = { id: artifactId, ...artifactData, hidden: false };
      }
      this.save();
    },

    hideArtifact: function(artifactId) {
      if (dbState.artifacts[artifactId]) {
        dbState.artifacts[artifactId].hidden = true;
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

    deleteArtifact: function(artifactId) {
      if (dbState.artifacts[artifactId]) {
        delete dbState.artifacts[artifactId];
        Object.keys(dbState.students_profile).forEach(email => {
          const profile = dbState.students_profile[email];
          if (profile.activeArtifacts) {
            profile.activeArtifacts = profile.activeArtifacts.filter(id => id !== artifactId);
          }
        });
        this.save();
      }
    },

    restoreArtifact: function(artifactId) {
      const original = window.EroiMockData && window.EroiMockData.artifacts
        ? window.EroiMockData.artifacts[artifactId]
        : null;
      if (dbState.artifacts[artifactId]) {
        if (original) {
          dbState.artifacts[artifactId] = { ...JSON.parse(JSON.stringify(original)), hidden: false };
        } else {
          dbState.artifacts[artifactId].hidden = false;
        }
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

    // --- SHOP ---
    getShopItems: function(email) {
      if (email) {
        const user = this.getUser(email);
        if (user && (user.role === 'docente' || user.role === 'admin')) {
          if (!dbState.teacher_shop_items) {
            dbState.teacher_shop_items = JSON.parse(JSON.stringify(window.EroiMockData.shop_items));
            this.save();
          }
          return dbState.teacher_shop_items;
        }
      }
      return dbState.shop_items;
    },

    saveShopItem: function(itemId, itemData, email) {
      let targetArray = dbState.shop_items;
      if (email) {
        const user = this.getUser(email);
        if (user && (user.role === 'docente' || user.role === 'admin')) {
          if (!dbState.teacher_shop_items) {
            dbState.teacher_shop_items = JSON.parse(JSON.stringify(window.EroiMockData.shop_items));
          }
          targetArray = dbState.teacher_shop_items;
        }
      }

      const index = targetArray.findIndex(item => item.id === itemId);
      if (index !== -1) {
        targetArray[index] = { ...targetArray[index], ...itemData };
      } else {
        targetArray.push({ id: itemId, ...itemData });
      }
      this.save();
    },

    deleteShopItem: function(itemId, email) {
      if (email) {
        const user = this.getUser(email);
        if (user && (user.role === 'docente' || user.role === 'admin')) {
          if (dbState.teacher_shop_items) {
            dbState.teacher_shop_items = dbState.teacher_shop_items.filter(item => item.id !== itemId);
            this.save();
          }
          return;
        }
      }
      dbState.shop_items = dbState.shop_items.filter(item => item.id !== itemId);
      this.save();
    },

    // --- AREA STUDIO / GUIDE DIDATTICHE ---
    getStudyGuides: function() {
      return dbState.study_guides.filter(g => !g.hidden);
    },

    getHiddenStudyGuides: function() {
      return dbState.study_guides.filter(g => g.hidden);
    },

    isPresetStudyGuide: function(guideId) {
      return !!(window.EroiMockData && window.EroiMockData.study_guides &&
        window.EroiMockData.study_guides.find(g => g.id === guideId));
    },

    saveStudyGuide: function(guideId, guideData) {
      const index = dbState.study_guides.findIndex(g => g.id === guideId);
      if (index !== -1) {
        dbState.study_guides[index] = { ...dbState.study_guides[index], ...guideData, hidden: false };
      } else {
        dbState.study_guides.push({ id: guideId, ...guideData, hidden: false });
      }
      this.save();
    },

    hideStudyGuide: function(guideId) {
      const index = dbState.study_guides.findIndex(g => g.id === guideId);
      if (index !== -1) {
        dbState.study_guides[index].hidden = true;
        this.save();
      }
    },

    deleteStudyGuide: function(guideId) {
      dbState.study_guides = dbState.study_guides.filter(g => g.id !== guideId);
      this.save();
    },

    restoreStudyGuide: function(guideId) {
      const original = window.EroiMockData && window.EroiMockData.study_guides
        ? window.EroiMockData.study_guides.find(g => g.id === guideId)
        : null;
      const index = dbState.study_guides.findIndex(g => g.id === guideId);
      if (index !== -1 && original) {
        dbState.study_guides[index] = { ...JSON.parse(JSON.stringify(original)), hidden: false };
      } else if (index !== -1) {
        dbState.study_guides[index].hidden = false;
      }
      this.save();
    },

    getStudentGuideNotes: function(email, guideId) {
      if (!dbState.student_guide_notes) {
        dbState.student_guide_notes = {};
      }
      const key = `${email}_${guideId}`;
      return dbState.student_guide_notes[key] || "";
    },

    saveStudentGuideNotes: function(email, guideId, text) {
      if (!dbState.student_guide_notes) {
        dbState.student_guide_notes = {};
      }
      const key = `${email}_${guideId}`;
      dbState.student_guide_notes[key] = text;
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

    
    // --- ARCHIVIO ANNUALE ---
    archiveCurrentYear: function(yearName) {
      if (!dbState.archives) dbState.archives = {};
      dbState.archives[yearName] = {
        users: {},
        students_profile: JSON.parse(JSON.stringify(dbState.students_profile || {})),
        classes: JSON.parse(JSON.stringify(dbState.classes || {}))
      };
      
      // Sposta solo studenti e forestieri (amici), preserva admin/teacher
      const newUsers = {};
      Object.keys(dbState.users).forEach(k => {
        const u = dbState.users[k];
        if (u.role === 'teacher' || u.role === 'admin') {
          newUsers[k] = u;
        } else {
          dbState.archives[yearName].users[k] = u;
        }
      });
      
      dbState.users = newUsers;
      dbState.students_profile = {};
      dbState.classes = {};
      
      this.save();
      return true;
    },

    // --- LOG ATTIVITÀ ---
    getLogs: function() {
      return dbState.activity_logs || [];
    },

    logActivity: function(userEmail, action) {
      const u = typeof userEmail === 'string' ? this.getUser(userEmail) : null;
      const isTeacher = u && (u.role === 'docente' || u.role === 'admin');

      const log = {
        timestamp: new Date().toISOString(),
        user: userEmail || "unknown",
        action: action
      };

      if (isTeacher) {
        if (!dbState.teacher_activity_logs) dbState.teacher_activity_logs = [];
        dbState.teacher_activity_logs.unshift(log);
        if (dbState.teacher_activity_logs.length > 200) {
          dbState.teacher_activity_logs = dbState.teacher_activity_logs.slice(0, 200);
        }
      } else {
        if (!dbState.activity_logs) dbState.activity_logs = [];
        dbState.activity_logs.unshift(log);
        if (dbState.activity_logs.length > 200) {
          dbState.activity_logs = dbState.activity_logs.slice(0, 200);
        }
      }
      this.save();
    },

    // --- DIARIO DI BORDO ---
    getDiaries: function() {
      return dbState.diaries || [];
    },

    saveDiaryEntry: function(entry) {
      if (!dbState.diaries) dbState.diaries = [];
      const index = dbState.diaries.findIndex(d => d.id === entry.id);
      if (index !== -1) {
        dbState.diaries[index] = { ...dbState.diaries[index], ...entry };
      } else {
        dbState.diaries.push(entry);
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
        if (!dbState.diaries) dbState.diaries = [];
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
