// Configurazione Firebase: LA ROTTA DEGLI EROI
// INSERISCI QUI LE CHIAVI DEL TUO NUOVO PROGETTO FIREBASE QUANDO LO CREERAI
const firebaseConfig = {
    apiKey: "AIzaSyCVCg9G6RbDDYMoQ0oWCs2Z9-1iFBSZZ5A",
    authDomain: "la-rotta-degli-eroi.firebaseapp.com",
    projectId: "la-rotta-degli-eroi",
    storageBucket: "la-rotta-degli-eroi.firebasestorage.app",
    messagingSenderId: "947694535022",
    appId: "1:947694535022:web:905d6739ebe61fe27f417f"
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
