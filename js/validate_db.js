// Eroi in Viaggio - Local Database & Game Mechanics Validation Script
// Eseguibile via riga di comando con: node js/validate_db.js

const crypto = require('crypto');
const util = require('util');

console.log("==================================================");
console.log("AVVIO TEST AUTOMATICI - EROI IN VIAGGIO");
console.log("==================================================");

// 1. MOCKING DELL'AMBIENTE BROWSER
global.window = {};
global.TextEncoder = util.TextEncoder;

// Mock di crypto.subtle usando il modulo nativo crypto di Node
global.crypto = {
  subtle: {
    digest: async function(algorithm, msgBuffer) {
      if (algorithm !== 'SHA-256') {
        throw new Error("Algoritmo non supportato nei test: " + algorithm);
      }
      const hash = crypto.createHash('sha256').update(msgBuffer).digest();
      // Ritorna ArrayBuffer
      return hash.buffer.slice(hash.byteOffset, hash.byteOffset + hash.byteLength);
    }
  }
};

// Mock di localStorage
const storageMock = {};
global.localStorage = {
  getItem: function(key) {
    return storageMock[key] || null;
  },
  setItem: function(key, value) {
    storageMock[key] = String(value);
  },
  removeItem: function(key) {
    delete storageMock[key];
  },
  clear: function() {
    Object.keys(storageMock).forEach(k => delete storageMock[k]);
  }
};

// 2. IMPORTAZIONE DEI MODULI SOTTO TEST
try {
  require('./mockData.js');
  console.log("✅ mockData.js: Caricato con successo.");
  
  require('./db.js');
  console.log("✅ db.js: Inizializzato con successo.");
  
  require('./auth.js');
  console.log("✅ auth.js: Inizializzato con successo.");
  
  require('./game.js');
  console.log("✅ game.js: Inizializzato con successo.");
} catch (e) {
  console.error("❌ Errore durante l'importazione dei file:", e);
  process.exit(1);
}

// 3. ESECUZIONE DELLE ASSERZIONI DI TEST
async function runTests() {
  let failed = false;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FALLITO: ${message}`);
      failed = true;
    } else {
      console.log(`  🔹 superato: ${message}`);
    }
  }

  console.log("\n--- TEST SISTEMA DI LIVELLI & PROGRESSIONE ---");
  try {
    const lvl1 = window.EroiGame.calculateLevel(120);
    assert(lvl1 === "Viaggiatore", "120 XP corrisponde al livello 'Viaggiatore'");

    const lvl2 = window.EroiGame.calculateLevel(450);
    assert(lvl2 === "Avventuriero", "450 XP corrisponde al livello 'Avventuriero'");

    const lvlMax = window.EroiGame.calculateLevel(10000);
    assert(lvlMax === "Custode dei Miti", "10000 XP corrisponde al livello massimo 'Custode dei Miti'");

    const nextInfo = window.EroiGame.getNextLevelInfo(450);
    assert(nextInfo.nextLevel === "Eroe", "Livello successivo dopo Avventuriero è Eroe");
    assert(nextInfo.xpNeeded === 350, "Mancano 350 XP per raggiungere il livello Eroe (800 XP)");
  } catch (err) {
    console.error("❌ Errore nei test di progressione:", err);
    failed = true;
  }

  console.log("\n--- TEST SISTEMA AUTENTICAZIONE & HASHING ---");
  try {
    // Test hashing
    const hash = await window.EroiAuth.hashPassword("antigravity2026");
    assert(hash === "248bba23ba97be555f52f60049174aa5f7e2bfd39b72345f21e6a695899b50c9", "Hashing corretto per 'antigravity2026'");

    // Test Login
    const session = await window.EroiAuth.login("prof.memmo@gmail.com", "antigravity2026");
    assert(session !== null && session.role === "admin", "Login riuscito con ruolo admin per prof.memmo@gmail.com");

    const sessionStudent = await window.EroiAuth.login("achille.studente@gmail.com", "guerra123");
    assert(sessionStudent !== null && sessionStudent.role === "student", "Login riuscito con ruolo student per achille.studente@gmail.com");
  } catch (err) {
    console.error("❌ Errore nei test di autenticazione:", err);
    failed = true;
  }

  console.log("\n--- TEST ECONOMIA & BILANCIAMENTO SHOP (SCONTI) ---");
  try {
    const studentEmail = "achille.studente@gmail.com";
    const profile = window.EroiDB.getStudentProfile(studentEmail);
    
    // Oggetto comune: prezzo base 15
    const commonItem = window.EroiDB.getShopItems().find(i => i.id === 'item_indizio');
    
    // Senza aiutanti ed artefatti attivi (rimuovi scudo_atena temporaneamente)
    profile.activeArtifacts = [];
    profile.activeHelper = null;
    window.EroiDB.saveStudentProfile(studentEmail, profile);

    let price = window.EroiGame.calculateDiscountedPrice(studentEmail, commonItem);
    assert(price === 15, "Prezzo dell'indizio senza sconti è 15");

    // Attiviamo il Sacro Graal (25% sconto globale)
    profile.activeArtifacts = ["sacro_graal"];
    window.EroiDB.saveStudentProfile(studentEmail, profile);
    price = window.EroiGame.calculateDiscountedPrice(studentEmail, commonItem);
    // 15 * 0.75 = 11.25 -> 11 Dracme arrotondato
    assert(price === 11, "Prezzo dell'indizio con Sacro Graal (25% sconto) è 11");

    // Attiviamo aiutante Hermes (+5% sconto globale) insieme al Graal
    profile.activeHelper = "hermes";
    window.EroiDB.saveStudentProfile(studentEmail, profile);
    price = window.EroiGame.calculateDiscountedPrice(studentEmail, commonItem);
    // 15 * 0.70 = 10.5 -> 11 Dracme arrotondato
    assert(price === 11, "Prezzo dell'indizio con Sacro Graal + Hermes (30% sconto) è 11");
  } catch (err) {
    console.error("❌ Errore nei test di bilanciamento shop:", err);
    failed = true;
  }

  console.log("\n--- TEST ABILITÀ SPECIALI AIUTANTI & MOLTIPLICATORI QUIZ ---");
  try {
    const studentEmail = "achille.studente@gmail.com";
    const profile = window.EroiDB.getStudentProfile(studentEmail);
    
    // Inizializza studente con 0 XP e 0 Dracme
    profile.xp = 0;
    profile.dracme = 0;
    profile.level = "Viaggiatore";
    profile.activeArtifacts = [];
    profile.activeHelper = null;
    window.EroiDB.saveStudentProfile(studentEmail, profile);

    // Eseguiamo sottomissione missione senza aiuti (mit_caos: xp=40, dracme=25)
    // Domande di mit_caos corrette sono: risp0=0, risp1=1
    let result = window.EroiGame.submitMission(studentEmail, "mit_caos", [0, 1]);
    assert(result.passed === true, "La missione 'Il Caos Primordiale' è superata rispondendo correttamente");
    assert(result.xpGained === 40, "XP guadagnati base = 40");
    assert(result.dracmeGained === 25, "Dracme guadagnate base = 25");

    // Resetta per testare con Aiutante Achille (+20% XP)
    profile.xp = 0;
    profile.dracme = 0;
    profile.activeHelper = "achille";
    window.EroiDB.saveStudentProfile(studentEmail, profile);

    result = window.EroiGame.submitMission(studentEmail, "mit_caos", [0, 1]);
    assert(result.xpGained === 48, "XP guadagnati con Achille (+20%) = 48");
    assert(result.dracmeGained === 25, "Dracme guadagnate rimangono base = 25");

    // Resetta per testare con Aiutante Ulisse (+20% Dracme) ed Excalibur (+15% XP globali)
    profile.xp = 0;
    profile.dracme = 0;
    profile.activeHelper = "ulisse";
    profile.activeArtifacts = ["excalibur"];
    window.EroiDB.saveStudentProfile(studentEmail, profile);

    result = window.EroiGame.submitMission(studentEmail, "mit_caos", [0, 1]);
    // XP: 40 * 1.15 = 46. Dracme: 25 * 1.20 = 30
    assert(result.xpGained === 46, "XP guadagnati con Excalibur (+15%) = 46");
    assert(result.dracmeGained === 30, "Dracme guadagnate con Ulisse (+20%) = 30");

  } catch (err) {
    console.error("❌ Errore nei test di abilità e moltiplicatori:", err);
    failed = true;
  }

  console.log("\n==================================================");
  if (failed) {
    console.error("❌ VERIFICA FALLITA: Alcuni test non sono stati superati.");
    process.exit(1);
  } else {
    console.log("🎉 VERIFICA COMPLETATA CON SUCCESSO! Tutti i test sono OK.");
    process.exit(0);
  }
}

runTests();
