// Configurazione Firebase: LA ROTTA DEGLI EROI (PUNTA ALL'HUB CENTRALE)
const firebaseConfig = {
  apiKey: "AIzaSyD-n2m-kYEuzGXPMKclZTggf4Y5Zm8_cdM",
  authDomain: "prof-memmo-hub.firebaseapp.com",
  projectId: "prof-memmo-hub",
  storageBucket: "prof-memmo-hub.firebasestorage.app",
  messagingSenderId: "839149485689",
  appId: "1:839149485689:web:04ee4fa6237d94d0b71ea8"
};

// Inizializza Firebase
try {
    let app = (firebase.apps || []).find(a => a.name === '[DEFAULT]');
    if (!app) {
        app = firebase.initializeApp(firebaseConfig);
    }
    
    // Esponi auth e db globalmente per usarli negli altri script
    window.fbAuth = app.auth();
    
    // Forza la persistenza locale in modo esplicito
    window.fbAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function(error) {
        console.error("Errore impostazione persistenza:", error);
    });

    window.fbDb = app.firestore();
    window.db = window.fbDb;
    window.auth = window.fbAuth;

    // =========================================================
    // WRAPPER "ZERO REFACTORING" PER LE COLLEZIONI HUB
    // =========================================================
    // Aggiunge automaticamente il prefisso 'eroi_' a tutte le 
    // chiamate db.collection() effettuate dal codice esistente.
    const originalCollection = window.fbDb.collection.bind(window.fbDb);
    window.fbDb.collection = function(path) {
        // Eccezioni per le collezioni globali dell'Hub
        if (path.startsWith('hub_') || path === 'games_status' || path === 'vetrina' || path.startsWith('fanta_') || path.startsWith('palestra_') || path.startsWith('corte_')) {
            return originalCollection(path);
        }
        // Se il path ha già il prefisso, non lo ri-aggiunge
        if (path.startsWith('eroi_')) return originalCollection(path);
        return originalCollection('eroi_' + path);
    };

    console.log("🔥 Firebase Rotta degli Eroi inizializzato correttamente con Hub SSO.");
} catch (e) {
    console.error("Errore inizializzazione Firebase Hub:", e);
    window.fbAuth = null;
    window.fbDb = null;
}
