// Eroi in Viaggio - Game Mechanics Engine
(function() {

  // ── Mappe di sblocco per progressione ────────────────────────────────────────
  // Helper per categoria letteraria (1 random per missione completata nell'area)
  var HELPER_CATEGORY_MAP = {
    'Epica Classica':   ['achille', 'ulisse', 'enea', 'eracle'],
    'Ciclo Carolingio': ['orlando', 'rinaldo', 'astolfo'],
    'Ciclo Bretone':    ['artu', 'lancillotto', 'galahad', 'parsifal']
  };

  // Divinità sbloccate per soglia XP (Zeus è solo shop)
  var DEITY_HELPERS   = ['atena', 'apollo', 'hermes', 'poseidone'];
  var DEITY_XP_GATES  = [300, 800, 1500, 2500]; // 1 divinità random per soglia

  // Artefatti sbloccati per soglia XP (Excalibur è solo shop)
  var ARTIFACT_TIERS = [
    { xp: 300,  pool: ['arco_apollo', 'olifante_orlando'] },
    { xp: 800,  pool: ['sandali_alati', 'tridente_poseidone', 'scudo_atena'] },
    { xp: 1500, pool: ['durendal', 'fulmine_zeus'] },
    { xp: 2500, pool: ['elmo_ade'] },
    { xp: 4000, pool: ['sacro_graal'] }
  ];

  // Seleziona 1 random da pool non ancora sbloccato
  function pickRandom(pool, alreadyUnlocked) {
    var available = pool.filter(function(id) { return !alreadyUnlocked.includes(id); });
    if (!available.length) return null;
    return available[Math.floor(Math.random() * available.length)];
  }
  // ─────────────────────────────────────────────────────────────────────────────
  window.EroiGame = {
    // Calcola il livello dello studente in base agli XP correnti
    calculateLevel: function(xp) {
      const levels = window.EroiDB.getLevels();
      let activeLevel = levels[0].name;
      for (let i = 0; i < levels.length; i++) {
        if (xp >= levels[i].xpRequired) {
          activeLevel = levels[i].name;
        } else {
          break;
        }
      }
      return activeLevel;
    },

    // Ottiene le informazioni per il passaggio al livello successivo
    getNextLevelInfo: function(xp) {
      const levels = window.EroiDB.getLevels();
      let currentLevelIdx = 0;
      for (let i = 0; i < levels.length; i++) {
        if (xp >= levels[i].xpRequired) {
          currentLevelIdx = i;
        } else {
          break;
        }
      }

      if (currentLevelIdx >= levels.length - 1) {
        return { nextLevel: "Nessuno (Livello Max)", xpNeeded: 0, percentage: 100 };
      }

      const currentLevelObj = levels[currentLevelIdx];
      const nextLevelObj = levels[currentLevelIdx + 1];
      const range = nextLevelObj.xpRequired - currentLevelObj.xpRequired;
      const progress = xp - currentLevelObj.xpRequired;
      const pct = Math.min(Math.round((progress / range) * 100), 100);

      return {
        nextLevel: nextLevelObj.name,
        xpNeeded: nextLevelObj.xpRequired - xp,
        percentage: pct
      };
    },

    // Aggiunge XP e verifica passaggi di livello
    addXP: function(email, amount) {
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      if (!profile) return { levelUp: false };

      const oldXP = profile.xp;
      const newXP = Math.max(0, oldXP + amount);
      const oldLevel = profile.level;
      const newLevel = this.calculateLevel(newXP);

      profile.xp = newXP;
      profile.level = newLevel;
      const _su = window.EroiDB.getUser(email);
        if (_su && (_su.role === "docente" || _su.role === "admin")) window.EroiDB.saveTeacherPlayerProfile(email, profile);
        else window.EroiDB.saveStudentProfile(email, profile);

      let levelUp = false;
      if (oldLevel !== newLevel) {
        levelUp = true;
        window.EroiDB.logActivity(email, `Passaggio di livello! Da ${oldLevel} a ${newLevel}.`);
      }

      return { levelUp: levelUp, oldLevel: oldLevel, newLevel: newLevel, currentXP: newXP };
    },

    // Aggiunge Dracme (applicando eventuali moltiplicatori se specificati)
    addDracme: function(email, amount) {
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      if (!profile) return 0;

      const oldDracme = profile.dracme;
      const newDracme = Math.max(0, oldDracme + amount);
      profile.dracme = newDracme;
      const _su = window.EroiDB.getUser(email);
        if (_su && (_su.role === "docente" || _su.role === "admin")) window.EroiDB.saveTeacherPlayerProfile(email, profile);
        else window.EroiDB.saveStudentProfile(email, profile);
      return newDracme;
    },

    // Sottrae Dracme (tenendo conto di immunità o limitazioni)
    deductDracme: function(email, amount) {
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      if (!profile) return false;

      // Se lo studente ha un aiutante attivo con immunità alla perdita di Dracme
      if (amount > 0 && profile.activeHelper) {
        const helper = window.EroiDB.getHelpers()[profile.activeHelper];
        // Ad esempio Enea o Poseidone o Parsifal possono proteggere
        if (helper && (helper.id === 'enea' || helper.id === 'parsifal' || helper.id === 'hermes')) {
          // In base alla personalizzazione o regola, riduce o annulla il malus
          window.EroiDB.logActivity(email, `L'aiutante ${helper.name} protegge parzialmente o totalmente dalla perdita di Dracme.`);
          return true;
        }
      }

      if (profile.dracme < amount) {
        return false; // Dracme insufficienti
      }

      profile.dracme -= amount;
      const _su = window.EroiDB.getUser(email);
        if (_su && (_su.role === "docente" || _su.role === "admin")) window.EroiDB.saveTeacherPlayerProfile(email, profile);
        else window.EroiDB.saveStudentProfile(email, profile);
      return true;
    },

    // Calcola il prezzo finale scontato di un oggetto per uno studente
    calculateDiscountedPrice: function(email, item) {
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      if (!profile) return item.price;

      let discount = 0; // in percentuale (es. 0.15 = 15%)

      // 1. Controlla aiutante attivo
      if (profile.activeHelper) {
        const helper = window.EroiDB.getHelpers()[profile.activeHelper];
        if (helper) {
          if (helper.id === 'hermes') {
            discount += 0.05; // 5% sconto globale
          }
          if (helper.id === 'rinaldo' && item.rarity === 'Comune') {
            discount += 0.15; // 15% sconto su oggetti comuni
          }
        }
      }

      // 2. Controlla artefatti attivi (es. Sacro Graal dà 25% di sconto)
      if (profile.activeArtifacts && profile.activeArtifacts.length > 0) {
        const artifacts = window.EroiDB.getArtifacts();
        profile.activeArtifacts.forEach(artId => {
          if (artId === 'sacro_graal') {
            discount += 0.25; // 25% sconto globale
          }
        });
      }

      const finalPrice = Math.max(1, Math.round(item.price * (1 - Math.min(0.9, discount))));
      return finalPrice;
    },

    // Gestione degli acquisti nello shop
    // Controlla e applica gli sblocchi automatici dopo una missione superata
    checkProgressionUnlocks: function(mission, profile, newXP, oldXP) {
      if (!profile.unlockedHelpers)  profile.unlockedHelpers  = [];
      if (!profile.unlockedArtifacts) profile.unlockedArtifacts = [];

      var unlocked = { helper: null, artifact: null };

      // 1. Helper per categoria missione (1 random per missione completata)
      var categoryHelpers = HELPER_CATEGORY_MAP[mission.category];
      if (categoryHelpers) {
        var alreadyFromCat = profile.unlockedHelpers.filter(function(h) {
          return categoryHelpers.includes(h);
        });
        var completedInCat = (profile.completedMissions || []).filter(function(mid) {
          var m = window.EroiDB.getMissions().find(function(x) { return x.id === mid; });
          return m && m.category === mission.category;
        }).length;
        // Sblocca 1 nuovo helper se ne ha completate più di quanti ne ha già sbloccati
        if (completedInCat > alreadyFromCat.length && alreadyFromCat.length < categoryHelpers.length) {
          var newHelper = pickRandom(categoryHelpers, profile.unlockedHelpers);
          if (newHelper) {
            profile.unlockedHelpers.push(newHelper);
            unlocked.helper = newHelper;
          }
        }
      }

      // 2. Divinità per soglia XP
      DEITY_XP_GATES.forEach(function(threshold, i) {
        if (oldXP < threshold && newXP >= threshold) {
          var alreadyDeities = profile.unlockedHelpers.filter(function(h) {
            return DEITY_HELPERS.includes(h);
          });
          if (alreadyDeities.length <= i) {
            var newDeity = pickRandom(DEITY_HELPERS, profile.unlockedHelpers);
            if (newDeity) {
              profile.unlockedHelpers.push(newDeity);
              if (!unlocked.helper) unlocked.helper = newDeity;
            }
          }
        }
      });

      // 3. Artefatti per soglia XP
      ARTIFACT_TIERS.forEach(function(tier) {
        if (oldXP < tier.xp && newXP >= tier.xp) {
          var newArtifact = pickRandom(tier.pool, profile.unlockedArtifacts);
          if (newArtifact) {
            profile.unlockedArtifacts.push(newArtifact);
            unlocked.artifact = newArtifact;
          }
        }
      });

      return unlocked;
    },

    purchaseItem: function(email, itemId) {
      const shopItems = window.EroiDB.getShopItems(email);
      const item = shopItems.find(i => i.id === itemId);
      if (!item || !item.active) {
        throw new Error("Oggetto non disponibile o inesistente nello shop.");
      }

      if (item.stock <= 0) {
        throw new Error("Oggetto esaurito.");
      }

      const finalPrice = this.calculateDiscountedPrice(email, item);
      const success = this.deductDracme(email, finalPrice);
      if (!success) {
        throw new Error("Dracme insufficienti per l'acquisto.");
      }

      // Decrementa lo stock se non è infinito (solo se non è un docente)
      if (item.stock < 99) {
        item.stock--;
        window.EroiDB.saveShopItem(itemId, item, email);
      }

      // Aggiunge all'inventario dello studente
      const inventory = window.EroiDB.getInventory(email);
      const existing = inventory.find(inv => inv.itemId === itemId);

      if (existing) {
        existing.quantity++;
      } else {
        inventory.push({
          itemId: itemId,
          name: item.name,
          type: item.type, // 'consumable' o 'permanent'
          rarity: item.rarity,
          quantity: 1,
          usedCount: 0,
          purchaseDate: new Date().toISOString()
        });
      }
      
      window.EroiDB.saveInventory(email, inventory);
      window.EroiDB.logActivity(email, `Acquistato "${item.name}" dallo Shop per ${finalPrice} Dracme (Prezzo base: ${item.price}).`);

      // Sblocchi speciali shop: Zeus helper e Excalibur artefatto
      var _u = window.EroiDB.getUser(email);
      var _isT = _u && (_u.role === 'docente' || _u.role === 'admin');
      var _prof = _isT ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      if (_prof) {
        if (!_prof.unlockedHelpers)   _prof.unlockedHelpers   = [];
        if (!_prof.unlockedArtifacts) _prof.unlockedArtifacts = [];
        if (itemId === 'item_aiutante_zeus' && !_prof.unlockedHelpers.includes('zeus')) {
          _prof.unlockedHelpers.push('zeus');
        }
        if (itemId === 'item_excalibur_pass' && !_prof.unlockedArtifacts.includes('excalibur')) {
          _prof.unlockedArtifacts.push('excalibur');
        }
        if (_isT) window.EroiDB.saveTeacherPlayerProfile(email, _prof);
        else      window.EroiDB.saveStudentProfile(email, _prof);
      }

      return finalPrice;
    },

    // Utilizza un consumabile dell'inventario
    useConsumable: function(email, itemId) {
      const inventory = window.EroiDB.getInventory(email);
      const item = inventory.find(i => i.itemId === itemId);
      
      if (!item || item.quantity <= 0) {
        throw new Error("Non possiedi questo oggetto nell'inventario.");
      }

      item.quantity--;
      item.usedCount++;
      window.EroiDB.saveInventory(email, inventory);
      window.EroiDB.logActivity(email, `Utilizzato l'oggetto consumabile: "${item.name}".`);
      return true;
    },

    // Equipaggia un aiutante (Secondo Quadrimestre)
    activateHelper: function(email, helperId) {
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      if (!profile) return false;

      const helperObj = window.EroiDB.getHelpers()[helperId];
      if (!helperObj) throw new Error("Aiutante sconosciuto.");

      if (!profile.unlockedHelpers) profile.unlockedHelpers = [];

      // Verifica che l'aiutante sia stato sbloccato tramite progressione
      if (!profile.unlockedHelpers.includes(helperId)) {
        throw new Error(`"${helperObj.name}" non è ancora sbloccato. Completa più missioni per ottenerlo!`);
      }

      profile.activeHelper = helperId;
      const _su = window.EroiDB.getUser(email);
      if (_su && (_su.role === "docente" || _su.role === "admin")) window.EroiDB.saveTeacherPlayerProfile(email, profile);
      else window.EroiDB.saveStudentProfile(email, profile);
      window.EroiDB.logActivity(email, `Equipaggiato l'aiutante: ${helperObj.name}.`);
      return true;
    },

    // Equipaggia/Rimuove un artefatto (massimo 2 attivi contemporaneamente)
    toggleArtifact: function(email, artifactId) {
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      if (!profile) return false;

      if (!profile.activeArtifacts)  profile.activeArtifacts  = [];
      if (!profile.unlockedArtifacts) profile.unlockedArtifacts = [];

      const isEquipped = profile.activeArtifacts.includes(artifactId);

      if (isEquipped) {
        // Rimuovi dall'equipaggiamento
        profile.activeArtifacts = profile.activeArtifacts.filter(id => id !== artifactId);
        const _su = window.EroiDB.getUser(email);
        if (_su && (_su.role === "docente" || _su.role === "admin")) window.EroiDB.saveTeacherPlayerProfile(email, profile);
        else window.EroiDB.saveStudentProfile(email, profile);
        window.EroiDB.logActivity(email, `Rimosso l'artefatto equipaggiato: ${artifactId}.`);
        return { action: "removed", list: profile.activeArtifacts };
      } else {
        // Verifica sblocco tramite progressione
        if (!profile.unlockedArtifacts.includes(artifactId)) {
          const artifacts = window.EroiDB.getArtifacts();
          const artName = artifacts[artifactId] ? artifacts[artifactId].name : artifactId;
          throw new Error(`"${artName}" non è ancora sbloccato. Continua a progredire nel gioco!`);
        }

        // Max 2 artefatti attivi
        if (profile.activeArtifacts.length >= 2) {
          throw new Error("Puoi tenere attivi al massimo due artefatti contemporaneamente. Disattiva prima uno di quelli equipaggiati.");
        }

        profile.activeArtifacts.push(artifactId);
        const _su = window.EroiDB.getUser(email);
        if (_su && (_su.role === "docente" || _su.role === "admin")) window.EroiDB.saveTeacherPlayerProfile(email, profile);
        else window.EroiDB.saveStudentProfile(email, profile);
        window.EroiDB.logActivity(email, `Equipaggiato l'artefatto: ${artifactId}.`);
        return { action: "added", list: profile.activeArtifacts };
      }
    },

    // Risolve una missione tramite risposte al quiz
    submitMission: function(email, missionId, answers) {
      const _u_profile = window.EroiDB.getUser(email);
      const _isT_profile = _u_profile && (_u_profile.role === "docente" || _u_profile.role === "admin");
      const profile = _isT_profile ? window.EroiDB.getTeacherPlayerProfile(email) : window.EroiDB.getStudentProfile(email);
      if (!profile) throw new Error("Profilo studente inesistente.");

      const missions = window.EroiDB.getMissions();
      const mission = missions.find(m => m.id === missionId);
      if (!mission) throw new Error("Missione inesistente.");

      // Controlla se la missione è già bloccata nel secondo quadrimestre
      const settings = window.EroiDB.getSettings();
      const categoryTerm2 = ["Ciclo Carolingio", "Ciclo Bretone"];
      if (categoryTerm2.includes(mission.category) && !window.EroiApp.isSecondTermActiveForUser()) {
        throw new Error("Questa missione appartiene al Secondo Quadrimestre, che non è ancora attivo.");
      }

      // Valuta risposte
      let correctCount = 0;
      const totalQuestions = mission.questions.length;
      
      mission.questions.forEach((qObj, index) => {
        if (answers[index] !== undefined && Number(answers[index]) === qObj.correct) {
          correctCount++;
        }
      });

      // Calcola se la missione è superata (almeno 50% di risposte esatte per la sufficienza)
      const passed = correctCount >= Math.ceil(totalQuestions / 2);
      
      if (!passed) {
        // Applica eventuale aiuto da aiutante o artefatti (es. secondo tentativo gratis)
        window.EroiDB.logActivity(email, `Fallito quiz missione "${mission.title}" (${correctCount}/${totalQuestions}).`);
        return {
          passed: false,
          correctCount: correctCount,
          totalCount: totalQuestions,
          xpGained: 0,
          dracmeGained: 0
        };
      }

      // Calcola i premi base
      let xpGained = mission.rewards.xp;
      let dracmeGained = mission.rewards.dracme;

      // Applica moltiplicatori e bonus degli aiutanti attivi
      let xpMultiplier = 1.0;
      let dracmeMultiplier = 1.0;

      if (profile.activeHelper) {
        const helper = window.EroiDB.getHelpers()[profile.activeHelper];
        if (helper) {
          if (helper.id === "achille") {
            xpMultiplier += 0.20; // +20% XP
          }
          if (helper.id === "ulisse") {
            dracmeMultiplier += 0.20; // +20% Dracme
          }
          if (helper.id === "zeus") {
            xpMultiplier += 0.10;
            dracmeMultiplier += 0.10;
          }
        }
      }

      // Applica moltiplicatori e bonus degli artefatti equipaggiati
      if (profile.activeArtifacts) {
        profile.activeArtifacts.forEach(artId => {
          if (artId === "excalibur") {
            xpMultiplier += 0.15; // +15% XP globali
          }
          if (artId === "fulmine_zeus") {
            xpGained += 10; // +10 XP piatti
          }
          if (artId === "tridente_poseidone") {
            dracmeGained += 5; // +5 Dracme piatte
          }
        });
      }

      // Applica moltiplicatori finali
      const finalXPGained = Math.round(xpGained * xpMultiplier);
      const finalDracmeGained = Math.round(dracmeGained * dracmeMultiplier);

      // Cattura XP prima dell'aggiornamento (serve per calcolo soglie progressione)
      const xpBeforeMission = profile.xp;

      // Accredita XP e Dracme
      const xpResult = this.addXP(email, finalXPGained);
      this.addDracme(email, finalDracmeGained);

      // Traccia missione completata
      if (!profile.completedMissions) profile.completedMissions = [];
      if (!profile.completedMissions.includes(missionId)) {
        profile.completedMissions.push(missionId);
      }

      // Controlla sblocchi progressione (helper + artefatti)
      const progressionUnlocks = this.checkProgressionUnlocks(
        mission, profile, profile.xp, xpBeforeMission
      );

      // Sblocca la nuova area geografica collegata sulla mappa se non già sbloccata
      if (mission.area && !profile.unlockedAreas.includes(mission.area)) {
        profile.unlockedAreas.push(mission.area);
      }

      // Sblocco automatico dell'area successiva nel flusso lineare del viaggio
      const areaProgression = {
        "Accademia": "Miti di Fondazione",
        "Miti di Fondazione": "Biblioteca",
        "Biblioteca": "Archivio",
        "Archivio": "Olimpo",
        "Olimpo": "Creta",
        "Creta": "Troia",
        "Troia": "Itaca",
        "Itaca": "Lazio",
        "Lazio": "Aquisgrana",
        "Aquisgrana": "Roncisvalle",
        "Roncisvalle": "Camelot",
        "Camelot": "Foresta di Brocelandia",
        "Foresta di Brocelandia": "Castello del Graal",
        "Castello del Graal": "Worms",
        "Worms": "Reno"
      };

      const nextArea = areaProgression[mission.area];
      if (nextArea && !profile.unlockedAreas.includes(nextArea)) {
        profile.unlockedAreas.push(nextArea);
      }

      const _su = window.EroiDB.getUser(email);
        if (_su && (_su.role === "docente" || _su.role === "admin")) window.EroiDB.saveTeacherPlayerProfile(email, profile);
        else window.EroiDB.saveStudentProfile(email, profile);

      window.EroiDB.logActivity(email, `Completata missione "${mission.title}" con punteggio ${correctCount}/${totalQuestions}. Guadagnati ${finalXPGained} XP e ${finalDracmeGained} Dracme.`);

      return {
        passed: true,
        correctCount: correctCount,
        totalCount: totalQuestions,
        xpGained: finalXPGained,
        dracmeGained: finalDracmeGained,
        levelUp: xpResult.levelUp,
        newLevel: xpResult.newLevel,
        unlockedHelper:   progressionUnlocks ? progressionUnlocks.helper   : null,
        unlockedArtifact: progressionUnlocks ? progressionUnlocks.artifact : null
      };
    }
  };

  function itemIdMapping(helperId) {
    return `item_aiutante_${helperId}`;
  }
})();
