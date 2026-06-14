// Configurazione Firebase: LA ROTTA DEGLI EROI
// INSERISCI QUI LE CHIAVI DEL TUO NUOVO PROGETTO FIREBASE QUANDO LO CREERAI
const firebaseConfig = {
    apiKey: "INSERISCI_QUI_LA_TUA_API_KEY",
    authDomain: "INSERISCI_QUI_IL_TUO_AUTH_DOMAIN",
    projectId: "INSERISCI_QUI_IL_TUO_PROJECT_ID",
    storageBucket: "INSERISCI_QUI_IL_TUO_STORAGE_BUCKET",
    messagingSenderId: "INSERISCI_QUI_IL_TUO_MESSAGING_SENDER_ID",
    appId: "INSERISCI_QUI_IL_TUO_APP_ID"
};

// Inizializza Firebase
try {
    firebase.initializeApp(firebaseConfig);
    // Esponi auth e db globalmente per usarli negli altri script
    window.fbAuth = firebase.auth();
    window.fbDb = firebase.firestore();
    console.log("🔥 Firebase inizializzato correttamente");
} catch (e) {
    console.error("Errore inizializzazione Firebase (API keys mancanti o errate?):", e);
    window.fbAuth = null;
    window.fbDb = null;
}
