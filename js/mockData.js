// Eroi in Viaggio - Initial Mock Data
window.EroiMockData = {
  settings: {
    appName: "La Rotta degli Eroi",
    logoUrl: "", // Sarà modificabile dall'Admin
    copyright: "© 2026 Prof. Memmo Games & Co. - Tutti i diritti riservati.",
    secondTermActive: false, // Se true, attiva aiutanti e ciclo carolingio/bretone
    contacts: "Email: prof.memmo@gmail.com | Supporto: support@profmemmogames.it | Tel: +39 06 1234567",
    privacy: "Il titolare del trattamento è Guglielmo Piersanti, contattabile all’indirizzo email: prof.memmo@gmail.com\n\n1. Finalità dell’app\n“La Rotta degli Eroi” è un’app didattica, utilizzata a scopo educativo e ludico e senza fini di lucro.\n\n2. Dati raccolti\nL’app può raccogliere i seguenti dati personali: indirizzo e-mail; informazioni di utilizzo relative ai giochi online (punteggi, attività didattiche ecc.); messaggio inviato tramite modulo di contatto; dati tecnici forniti automaticamente dalla piattaforma (es. tipo di dispositivo, dati di log)\n\n3. Finalità del trattamento\nI dati vengono trattati esclusivamente per consentire l’accesso all’app e alle sue funzionalità, gestire l’esperienza didattica e le classifiche interne, migliorare il funzionamento del servizio, fornire assistenza o informazioni richieste dall’utente. Non vengono utilizzati per scopi commerciali o pubblicitari.\n\n4. Conservazione dei dati\nI dati sono trattati in modo lecito e sicuro. Non vengono venduti né ceduti a terzi. Sono mantenuti solo per il tempo necessario al funzionamento didattico dell’app. Vengono utilizzati servizi terzi per l’archiviazione dei dati (Firebase).",
    terms: "Ultimo aggiornamento: 31/04/26\n\n1. Titolare del sito\nIl presente sito web è gestito da: Guglielmo Piersanti. Email di contatto: prof.memmo@gmail.com\n\n2. Accettazione dei termini\nL’accesso e l’utilizzo del sito implicano l’accettazione dei presenti Termini e Condizioni.\n\n3. Descrizione del servizio\nIl sito ha finalità informative ed educative. Gli utenti possono: Consultare i contenuti disponibili e usufruire della piattaforma di gioco.\n\n4. Utilizzo del sito\nL’utente si impegna a utilizzare il sito in modo lecito e corretto.\n\n5. Proprietà intellettuale\nTutti i contenuti del sito (testi, materiali, ecc.) sono di proprietà del titolare, salvo diversa indicazione. È vietata la copia, distribuzione o utilizzo senza autorizzazione.",
    cookies: "Cookie Policy: Questa piattaforma utilizza esclusivamente cookie tecnici essenziali o il Local Storage del browser per salvare lo stato della sessione di gioco e i progressi dello studente. Non sono presenti cookie di tracciamento o di terze parti.",
    gdpr: "Informativa GDPR: I dati personali (nome, cognome, email scolastica, classe di appartenenza) sono raccolti e trattati unicamente per finalità didattiche legate alla campagna scolastica di Epica. Il titolare del trattamento è il Prof. Memmo (prof.memmo@gmail.com)."
  },

  regolamenti: {
    studente: [
      { id: "s1", titolo: "Il Cammino dell'Eroe e le Mappe", testo: "Il tuo obiettivo è viaggiare per il mondo della letteratura. Completando le prove nei vari nodi, sbloccherai le aree della mappa e guadagnerai XP e Dracme da spendere nello Shop. Attenzione: alcune sezioni possono essere affrontate solo se sbloccate dal tuo Docente, il quale guida il ritmo del gioco per favorire l'apprendimento di pari passo con le lezioni in classe." },
      { id: "s2", titolo: "Limiti di Sessione (Prevenzione Affaticamento Digitale)", testo: "La salute prima di tutto: per evitare l'affaticamento visivo e cognitivo da schermo, ogni sessione di gioco dura al massimo 45 minuti. Al termine, entrerai automaticamente in una Pausa Obbligatoria di 15 minuti in cui il gioco sarà bloccato. Puoi giocare al massimo 2 sessioni al giorno. Superati i 90 minuti totali, la piattaforma bloccherà l'accesso fino al giorno successivo." },
      { id: "s3", titolo: "Il Diario di Bordo", testo: "Il Diario non è un semplice gioco, ma il cuore della tua riflessione. Man mano che sblocchi le aree sulla mappa (se il docente le ha attivate), potrai scrivere i tuoi pensieri sulle sfide affrontate. I docenti valuteranno le tue riflessioni e ti assegneranno voti, premi e XP bonus." },
      { id: "s4", titolo: "Il Tempio e lo Studio", testo: "Nel Tempio troverai le 'Schede Autore' e le 'Schede Personaggio' che costituiscono i tuoi materiali di studio (Guide). Puoi consultarle liberamente per prepararti ai minigiochi, come Cloze, Puzzle e 'Cantami o Diva'." },
      { id: "s5", titolo: "L'Inventario e gli Equipaggiamenti", testo: "Nell'inventario puoi accumulare consumabili (indizi, tentativi extra), skin per l'avatar e Artefatti. Puoi tenere attivi fino a 2 Artefatti contemporaneamente." },
      { id: "s6", titolo: "Gli Aiutanti (Secondo Quadrimestre)", testo: "Dal secondo quadrimestre potrai scegliere un Aiutante fisso (Eroi, Paladini, Cavalieri o Divinità) che ti garantirà un bonus passivo, un potere speciale a usi limitati e un'immunità contro malus." }
    ],
    docente: [
      { id: "d1", titolo: "Ruolo di Guida e Regista (Game Master)", testo: "Il docente è il 'Game Master' dell'esperienza. Tu decidi quali nodi e quali diari attivare o disattivare per gli studenti. Questo meccanismo di blocco/sblocco è fondamentale per mantenere il gioco allineato con la programmazione didattica ed evitare che gli studenti 'corrano troppo' rovinando il fattore scoperta." },
      { id: "d2", titolo: "Gestione di Classi, Studenti e Valutazioni", testo: "Dal tuo pannello puoi gestire gli iscritti, approvare le iscrizioni pendenti, e soprattutto valutare i 'Diari di Bordo'. Attraverso le tue valutazioni puoi assegnare un voto in decimi, un feedback testuale e, soprattutto, ricompensare l'impegno con XP extra e Dracme." },
      { id: "d3", titolo: "Creazione di Missioni e Quiz", testo: "Puoi creare nuove missioni didattiche o modificare quelle esistenti, stabilendo le domande a risposta multipla, i cruciverba, e definendo le ricompense in base alla difficoltà." },
      { id: "d4", titolo: "Controllo dello Shop e Bilanciamento Economico", testo: "Puoi inserire nuovi oggetti nello shop, impostare i prezzi in Dracme, e attivare/disattivare gli articoli per mantenere un'economia bilanciata nella classe." },
      { id: "d5", titolo: "Tutela della Salute degli Studenti", testo: "Il sistema applica un limite ferreo: massimo 45 minuti consecutivi di gioco, seguiti da 15 minuti di pausa obbligatoria, per un massimo di due sessioni giornaliere (90 min totali). Questa 'Nota Didattica' rassicura i genitori e tutela gli studenti dall'affaticamento." }
    ]
  },

  users: {
    "prof.memmo@gmail.com": {
      email: "prof.memmo@gmail.com",
      name: "Prof. Memmo",
      role: "admin",
      passwordHash: "248bba23ba97be555f52f60049174aa5f7e2bfd39b72345f21e6a695899b50c9" // "antigravity2026"
    },
    "docente.aurora@gmail.com": {
      email: "docente.aurora@gmail.com",
      name: "Prof.ssa Aurora",
      role: "teacher",
      passwordHash: "dafdf80d25755872f4255e5bfea666c98a5b16b86c4085485a16578c07ce1079" // "storia123"
    },
    "achille.studente@gmail.com": {
      email: "achille.studente@gmail.com",
      name: "Achille Rossi",
      role: "student",
      classId: "1A",
      passwordHash: "04b51e5ae5cb21575540518a2743f37b8e87f9f358f974ca3dedbee53424c054" // "guerra123"
    },
    "ulisse.studente@gmail.com": {
      email: "ulisse.studente@gmail.com",
      name: "Ulisse Bianchi",
      role: "student",
      classId: "1A",
      passwordHash: "d3a5779693588af113f543d9789a1380e9169be769de1adebd32e82e9982ffbc" // "viaggio123"
    },
    "artu.studente@gmail.com": {
      email: "artu.studente@gmail.com",
      name: "Arturo Verdi",
      role: "student",
      classId: "1B",
      passwordHash: "fffb7d65fd8d6772a4ebda9b2200d7cf44fa253ec059712964fc71f33dfc6dd0" // "tavolaronda"
    }
  },

  classes: {
    "1A": { id: "1A", name: "Classe 1ª A Epica", code: "ER-1A99", teacher: "docente.aurora@gmail.com", collaborators: [], school: "Scuola Statale Olimpo", city: "Atene" },
    "1B": { id: "1B", name: "Classe 1ª B Cavalieri", code: "ER-1B88", teacher: "docente.aurora@gmail.com", collaborators: [], school: "Scuola Statale Olimpo", city: "Atene" }
  },

  students_profile: {
    "achille.studente@gmail.com": {
      email: "achille.studente@gmail.com",
      name: "Achille Rossi",
      avatarClass: "Guerriero",
      level: "Viaggiatore",
      xp: 120,
      dracme: 75,
      stats: { coraggio: 18, astuzia: 8, sapienza: 6, onore: 14 },
      activeHelper: null,
      activeArtifacts: ["scudo_atena"],
      unlockedAreas: ["Accademia", "Biblioteca", "Archivio", "Olimpo", "Creta", "Troia"]
    },
    "ulisse.studente@gmail.com": {
      email: "ulisse.studente@gmail.com",
      name: "Ulisse Bianchi",
      avatarClass: "Navigatore",
      level: "Avventuriero",
      xp: 450,
      dracme: 140,
      stats: { coraggio: 12, astuzia: 20, sapienza: 15, onore: 10 },
      activeHelper: null,
      activeArtifacts: ["sandali_alati"],
      unlockedAreas: ["Accademia", "Biblioteca", "Archivio", "Olimpo", "Creta", "Troia", "Itaca"]
    },
    "artu.studente@gmail.com": {
      email: "artu.studente@gmail.com",
      name: "Arturo Verdi",
      avatarClass: "Esploratore",
      level: "Viaggiatore",
      xp: 80,
      dracme: 25,
      stats: { coraggio: 10, astuzia: 12, sapienza: 10, onore: 12 },
      activeHelper: null,
      activeArtifacts: [],
      unlockedAreas: ["Accademia"]
    }
  },

  levels: [
    { name: "Viaggiatore", xpRequired: 0 },
    { name: "Avventuriero", xpRequired: 300 },
    { name: "Eroe", xpRequired: 800 },
    { name: "Campione", xpRequired: 1500 },
    { name: "Semidio", xpRequired: 2500 },
    { name: "Leggenda", xpRequired: 4000 },
    { name: "Custode dei Miti", xpRequired: 6000 }
  ],

  avatars: {
    "Custode della Sapienza": { name: "Custode della Sapienza", baseStats: { coraggio: 6, astuzia: 12, sapienza: 18, onore: 10 }, description: "Studioso dei miti antichi, eccelle in intelligenza e memoria." },
    "Guerriero": { name: "Guerriero", baseStats: { coraggio: 18, astuzia: 8, sapienza: 6, onore: 14 }, description: "Combattente impavido ispirato ad Achille ed Ettore." },
    "Navigatore": { name: "Navigatore", baseStats: { coraggio: 10, astuzia: 18, sapienza: 12, onore: 8 }, description: "Esploratore dei mari, agile ed astuto come Ulisse." },
    "Cantastorie": { name: "Cantastorie", baseStats: { coraggio: 8, astuzia: 14, sapienza: 12, onore: 14 }, description: "Poeta errante che tramanda le leggende, amato da tutti." },
    "Esploratore": { name: "Esploratore", baseStats: { coraggio: 12, astuzia: 14, sapienza: 10, onore: 12 }, description: "Cacciatore di segreti tra selve e regni sconosciuti." }
  },

  helpers: {
    // Divisi per Categorie. Concessi dal 2° quadrimestre
    "achille": { id: "achille", category: "Eroi", name: "Achille", desc: "Il piè veloce dell'Iliade.", bonusPassive: "XP incrementati del 20% in battaglia.", potereSpeciale: "Vittoria Rapida (Salta 1 risposta errata per quiz, Max 2 volte)", immunita: "Protezione dalla perdita di XP in caso di malus.", active: false },
    "ulisse": { id: "ulisse", category: "Eroi", name: "Ulisse", desc: "L'uomo dal multiforme ingegno.", bonusPassive: "Dracme incrementate del 20% per missione.", potereSpeciale: "Indizio della Mente (Rivelazione risposta errata, Max 3 volte)", immunita: "Protezione dal malus 'Nebbia della Mente'.", active: false },
    "enea": { id: "enea", category: "Eroi", name: "Enea", desc: "Il pio fondatore del futuro impero.", bonusPassive: "+3 a tutte le statistiche di Onore.", potereSpeciale: "Scudo del Fato (Recupera 50% XP persi, Max 1 volta)", immunita: "Protezione dalla perdita di Dracme.", active: false },
    "eracle": { id: "eracle", category: "Eroi", name: "Eracle", desc: "L'eroe delle dodici fatiche.", bonusPassive: "+5 al Coraggio.", potereSpeciale: "Forza Bruta (Raddoppia ricompensa di un quiz, Max 1 volta)", immunita: "Protezione dalle penalità comportamentali.", active: false },
    
    "orlando": { id: "orlando", category: "Paladini", name: "Orlando", desc: "Il più prode paladino di Carlo Magno.", bonusPassive: "+10% XP e +10% Dracme nelle sfide cooperative.", potereSpeciale: "Suono dell'Olifante (Richiama aiuto compagno, Max 2 volte)", immunita: "Protezione dal malus temporaneo 'Follia'.", active: false },
    "rinaldo": { id: "rinaldo", category: "Paladini", name: "Rinaldo", desc: "Il coraggioso cugino di Orlando.", bonusPassive: "Sconti del 15% nello Shop sugli oggetti Comuni.", potereSpeciale: "Balzo di Baiardo (Supera un quiz a tempo automaticamente, Max 1 volta)", immunita: "Immunità alla perdita di oggetti consumabili.", active: false },
    "astolfo": { id: "astolfo", category: "Paladini", name: "Astolfo", desc: "Il viaggiatore sulla luna con l'Ippogrifo.", potereSpeciale: "Recupero del Senno (Rivela la soluzione di un quiz, Max 1 volta)", bonusPassive: "+4 all'Astuzia.", immunita: "Protezione da trappole e trabocchetti.", active: false },
    
    "artu": { id: "artu", category: "Cavalieri Bretoni", name: "Re Artù", desc: "Il leggendario re di Camelot.", bonusPassive: "+5 Onore per tutta la squadra.", potereSpeciale: "Tavola Rotonda (Crea missione extra per la classe, Max 1 volta)", immunita: "Protezione globale contro penalità di classe.", active: false },
    "lancillotto": { id: "lancillotto", category: "Cavalieri Bretoni", name: "Lancillotto", desc: "Il cavaliere perfetto, tormentato dall'amore.", bonusPassive: "+4 Coraggio.", potereSpeciale: "Carica del Cavaliere (Raddoppia XP della missione, Max 1 volta)", immunita: "Protezione da malus legati al fallimento delle sfide narrative.", active: false },
    "galahad": { id: "galahad", category: "Cavalieri Bretoni", name: "Galahad", desc: "Il cavaliere più puro della Tavola Rotonda.", bonusPassive: "Nessun malus di Onore.", potereSpeciale: "Pura Fede (Immunità immediata da penalità, Max 2 volte)", immunita: "Immunità da qualsiasi perdita di XP.", active: false },
    "parsifal": { id: "parsifal", category: "Cavalieri Bretoni", name: "Parsifal", desc: "Colui che vide il Santo Graal.", bonusPassive: "+4 Sapienza.", potereSpeciale: "Domanda del Graal (Ottieni indizio gratuito per ogni quiz, Max 5 volte)", immunita: "Protezione contro la perdita di Dracme.", active: false },
    
    "zeus": { id: "zeus", category: "Divinità", name: "Zeus", desc: "Il re dell'Olimpo.", bonusPassive: "+10% XP e +10% Dracme globali.", potereSpeciale: "Folgore Divina (Supera una missione immediatamente, Max 1 volta)", immunita: "Immunità totale a tutti i malus per 1 settimana.", active: false },
    "atena": { id: "atena", category: "Divinità", name: "Atena", desc: "La dea della saggezza e della guerra strategica.", bonusPassive: "+5 Sapienza, +2 Astuzia.", potereSpeciale: "Occhio della Civetta (Rivela le risposte errate in 2 quiz consecutivi, Max 2 volte)", immunita: "Immunità da errori nei quiz logici.", active: false },
    "apollo": { id: "apollo", category: "Divinità", name: "Apollo", desc: "Dio della luce, delle arti e delle profezie.", bonusPassive: "+4 Sapienza, +4 Onore.", potereSpeciale: "Luce Profetica (Rivela la risposta corretta di un quiz intero, Max 1 volta)", immunita: "Immunità da penalità della mappa.", active: false },
    "hermes": { id: "hermes", category: "Divinità", name: "Hermes", desc: "Il messaggero degli dei alato.", bonusPassive: "+20% velocità di accumulo Dracme e +5% sconti shop.", potereSpeciale: "Passo Alato (Evita una penalità di tempo nei quiz, Max 3 volte)", immunita: "Protezione dal furto/smarrimento di Dracme.", active: false },
    "poseidone": { id: "poseidone", category: "Divinità", name: "Poseidone", desc: "Il potente signore degli abissi.", bonusPassive: "+4 Coraggio.", potereSpeciale: "Maremoto Didattico (Resetta un quiz fallito per riprovare subito, Max 1 volta)", immunita: "Protezione da fallimento di navigazione sulla mappa.", active: false }
  },

  artifacts: {
    "fulmine_zeus": { id: "fulmine_zeus", name: "Fulmine di Zeus", desc: "Il potere supremo del cielo. Scatena tempeste di sapienza.", rarity: "Leggendario", bonus: "+5 Sapienza, +10 XP per quiz", image: "⚡", active: false },
    "tridente_poseidone": { id: "tridente_poseidone", name: "Tridente di Poseidone", desc: "Domina le acque e le maree dell'apprendimento.", rarity: "Epico", bonus: "+3 Coraggio, +5 Dracme per quiz", image: "🔱", active: false },
    "elmo_ade": { id: "elmo_ade", name: "Elmo di Ade", desc: "Rende invisibili agli errori scolastici.", rarity: "Leggendario", bonus: "Immunità da una risposta errata per quiz", image: "🪖", active: false },
    "sandali_alati": { id: "sandali_alati", name: "Sandali Alati", desc: "Permettono di viaggiare velocemente tra i concetti.", rarity: "Epico", bonus: "+3 Astuzia, Sblocco aree sulla mappa facilitato", image: "🥿", active: false },
    "scudo_atena": { id: "scudo_atena", name: "Scudo di Atena", desc: "Protegge l'intelletto contro le risposte ingannevoli.", rarity: "Epico", bonus: "+3 Sapienza, +3 Onore", image: "🛡️", active: false },
    "arco_apollo": { id: "arco_apollo", name: "Arco di Apollo", desc: "Colpisce con precisione la risposta corretta.", rarity: "Raro", bonus: "+2 Sapienza, +1 indizio gratuito a missione", image: "🏹", active: false },
    "durendal": { id: "durendal", name: "Durendal", desc: "La leggendaria spada di Orlando, indistruttibile.", rarity: "Leggendario", bonus: "+5 Coraggio, +5 Onore", image: "🗡️", active: false },
    "olifante_orlando": { id: "olifante_orlando", name: "Olifante di Orlando", desc: "Il corno che risuona richiamando il soccorso degli dei.", rarity: "Raro", bonus: "+3 Onore, +10% Dracme cooperative", image: "📯", active: false },
    "excalibur": { id: "excalibur", name: "Excalibur", desc: "La spada estratta dalla roccia. Simbolo di regalità.", rarity: "Leggendario", bonus: "+6 Coraggio, +4 Onore, +15% XP globali", image: "⚔️", active: false },
    "sacro_graal": { id: "sacro_graal", name: "Sacro Graal", desc: "La coppa dell'immortalità e della saggezza eterna.", rarity: "Leggendario", bonus: "Sconto 25% su tutto lo shop, +5 Sapienza", image: "🏆", active: false }
  },

  missions: [
    // === MISSIONI INIZIALI (Aree Introduttive) ===
    { id: "quiz_inizio", category: "Primo Viaggio", title: "L'inizio del Viaggio", desc: "Metti alla prova la tua conoscenza sui concetti di base: Epica, Mito, Leggenda e Letteratura.", rewards: { xp: 50, dracme: 30 }, area: "Accademia", unlockedBy: null, questions: [
      { q: "Cosa si intende per 'Epica'?", a: ["Un genere di pittura medievale", "Racconti in versi che celebrano le gesta degli eroi", "Un testo scritto in prosa dai filosofi greci", "Una danza sacra degli antichi romani"], correct: 1 },
      { q: "Cosa si intende per 'Mito'?", a: ["Una storia inventata per bambini piccoli", "Un racconto storico completamente documentato", "Un racconto tramandato che spiega fenomeni naturali e storici attraverso l'immaginazione", "Un trattato scientifico dell'antichità"], correct: 2 },
      { q: "Cosa si intende per 'Leggenda'?", a: ["Un testo narrativo che mescola fantasia e realtà, tramandato oralmente", "Un racconto puramente fantastico senza alcun elemento reale", "Una biografia romanzata di un grande re", "Una cronaca di guerra medievale scritta dai monaci"], correct: 0 },
      { q: "Cos'è il 'Volgare'?", a: ["Il latino usato nella liturgia della messa", "Il dialetto parlato dal popolo in un territorio limitato", "Il greco antico usato dai filosofi", "L'inglese antico parlato dai Vichinghi"], correct: 1 },
      { q: "Quale dialetto volgare è alla base dell'italiano contemporaneo?", a: ["Il veneziano", "Il siciliano", "Il fiorentino", "Il napoletano"], correct: 2 },
      { q: "Che cos'è un 'Aedo'?", a: ["Un guerriero greco che combatteva in prima linea", "Un cantastorie dell'antichità greca che tramandava i poemi oralmente", "Un filosofo ateniese del V secolo a.C.", "Un sacerdote del tempio di Apollo"], correct: 1 },
      { q: "Le 'Chansons de Geste' sono:", a: ["Poesie d'amore provenzali", "Canti che narrano le gesta degli eroi cavallereschi medievali", "Favole morali attribuite ad Esopo", "Inni sacri cristiani cantati nelle cattedrali"], correct: 1 }
    ] },

    { id: "quiz_autori", category: "Primo Viaggio", title: "Gli Autori", desc: "Conosci bene gli autori dei grandi poemi epici? Mettiti alla prova!", rewards: { xp: 60, dracme: 40 }, area: "Biblioteca", unlockedBy: "quiz_inizio", questions: [
      { q: "A chi è attribuita la paternità dell'Iliade e dell'Odissea?", a: ["Virgilio", "Omero", "Turoldo", "Chrétien de Troyes"], correct: 1 },
      { q: "Qual è il vero nome completo di Virgilio?", a: ["Publio Ovidio Nasone", "Tito Livio Patavinese", "Publio Virgilio Marone", "Gaio Giulio Cesare"], correct: 2 },
      { q: "Che cosa si intende con 'Questione Omerica'?", a: ["Il dibattito sul valore poetico dell'Iliade rispetto all'Odissea", "Il dubbio sull'esistenza reale di Omero e sulla paternità dei poemi", "La disputa geografica sulla nascita di Omero", "Il confronto tra la poesia greca e quella latina"], correct: 1 },
      { q: "Chi è il presunto autore (o trascrittore) della Chanson de Roland?", a: ["Ludovico Ariosto", "Matteo Maria Boiardo", "Chrétien de Troyes", "Turoldo"], correct: 3 },
      { q: "Per quale imperatore romano Virgilio scrisse l'Eneide?", a: ["Giulio Cesare", "Augusto", "Traiano", "Marco Aurelio"], correct: 1 },
      { q: "Chrétien de Troyes è celebre soprattutto per aver fondato:", a: ["Il poema epico cavalleresco spagnolo", "Il romanzo cavalleresco bretone in lingua francese", "La lirica provenzale d'amore", "La storiografia medievale francese"], correct: 1 },
      { q: "Dove e quando Omero avrebbe composto i suoi poemi, secondo la tradizione?", a: ["In Grecia continentale, V secolo a.C.", "A Roma, I secolo d.C.", "In Asia Minore (Ionia), IX-VIII secolo a.C.", "In Egitto, III secolo a.C."], correct: 2 }
    ] },

    { id: "quiz_opere", category: "Primo Viaggio", title: "Le Opere", desc: "Dimostra di conoscere i grandi poemi epici: Iliade, Odissea ed Eneide!", rewards: { xp: 70, dracme: 50 }, area: "Archivio", unlockedBy: "quiz_autori", questions: [
      { q: "Quanti canti compone l'Iliade?", a: ["12", "24", "36", "48"], correct: 1 },
      { q: "Qual è il primo verso dell'Iliade (proemio)?", a: ["'Canto le armi e l'uomo...'", "'Dimmi, o Musa, dell'eroe dai mille artifici...'", "'Cantami, o Diva, del pelide Achille l'ira funesta...'", "'Il re Carlo, il nostro grande imperatore...'"], correct: 2 },
      { q: "Quanti anni dura il viaggio di ritorno di Ulisse nell'Odissea?", a: ["5", "7", "10", "20"], correct: 2 },
      { q: "Chi incaricò Virgilio di scrivere l'Eneide?", a: ["Giulio Cesare", "Mecenate su commissione di Augusto", "Il Senato romano", "L'imperatore Traiano"], correct: 1 },
      { q: "Qual è la caratteristica principale dell'eroe dell'Eneide rispetto agli eroi omerici?", a: ["La forza fisica sovrumana", "L'astuzia e l'inganno", "La 'pietas': il senso del dovere verso gli dei, la patria e la famiglia", "La ricerca della gloria individuale sul campo di battaglia"], correct: 2 },
      { q: "Da dove parte l'Odissea, a differenza dell'Iliade?", a: ["Da Troia, con Ulisse già in viaggio", "Da Itaca, con Telemaco in cerca del padre (Telemachia)", "Dall'Olimpo, con il discorso degli dei", "Da Cartagine, con l'incontro tra Ulisse e Didone"], correct: 1 },
      { q: "Cosa rappresenta il 'Cavallo di Troia' nel racconto della guerra?", a: ["Un tributo di pace offerto dai Troiani agli Achei", "Un animale sacro del tempio di Atena rubato dai Greci", "L'astuzia di Ulisse: un cavallo di legno vuoto dentro cui si nascosero i guerrieri greci", "Una macchina da guerra costruita dai Troiani per difendersi"], correct: 2 }
    ] },
    // Mitologia (Term 1)
    { id: "mit_caos", category: "Mitologia", title: "Il Caos Primordiale", desc: "Prima degli Dei, c'era solo l'oscurità insondabile del Caos. Scopri come l'universo ha preso forma.", rewards: { xp: 40, dracme: 25 }, area: "Olimpo", unlockedBy: null, questions: [
      { q: "Chi fu la prima divinità a nascere dal Caos primordiale?", a: ["Gea (la Terra)", "Urano (il Cielo)", "Crono (il Tempo)", "Zeus (il Fulmine)"], correct: 0 },
      { q: "Quale divinità guidò la rivolta dei Titani contro Urano?", a: ["Zeus", "Crono", "Prometeo", "Atlante"], correct: 1 },
      { q: "Chi è Prometeo nella mitologia greca?", a: ["Il dio del mare", "Il titano che donò il fuoco agli uomini", "Il figlio di Zeus e Giunone", "Il dio della guerra"], correct: 1 },
      { q: "Dove fu confinato Atlante come punizione?", a: ["Negli abissi del mare", "Nel Tartaro sotterraneo", "Fu condannato a reggere la volta del cielo sulle spalle", "Su un'isola deserta"], correct: 2 },
      { q: "Qual è il monte dove vivevano le dodici divinità principali greche?", a: ["Monte Etna", "Monte Olimpo", "Monte Athos", "Monte Parnaso"], correct: 1 }
    ] },
    { id: "mit_dei", category: "Mitologia", title: "Gli Dei dell'Olimpo", desc: "Sali sul monte Olimpo ed impara a riconoscere le dodici divinità maggiori.", rewards: { xp: 50, dracme: 30 }, area: "Olimpo", unlockedBy: "mit_caos", questions: [
      { q: "Quali animali sono sacri ad Atena?", a: ["Il lupo", "Il pavone", "La civetta", "Il toro"], correct: 2 },
      { q: "Chi è il messaggero degli dei dell'Olimpo?", a: ["Ares", "Hermes", "Apollo", "Efesto"], correct: 1 },
      { q: "Quale dio forgiava armi e oggetti straordinari per gli dei?", a: ["Ares", "Apollo", "Efesto", "Poseidone"], correct: 2 },
      { q: "Di quale elemento naturale è divinità Poseidone?", a: ["Il fuoco", "Il vento", "Il mare e i terremoti", "La terra"], correct: 2 },
      { q: "Chi è la dea protettrice dei cacciatori e della natura selvaggia?", a: ["Afrodite", "Era", "Artemide", "Demetra"], correct: 2 }
    ] },
    { id: "mit_eracle", category: "Mitologia", title: "Le Fatiche di Eracle", desc: "Affronta le dodici prove leggendarie imposte all'eroe forzuto.", rewards: { xp: 60, dracme: 40 }, area: "Creta", unlockedBy: "mit_dei", questions: [
      { q: "Qual è la prima fatica affrontata da Eracle?", a: ["L'Idra di Lerna", "La cattura del cinghiale", "Il leone di Nemea", "La pulizia delle stalle"], correct: 2 },
      { q: "Chi impose a Eracle le dodici fatiche?", a: ["Zeus", "Il re Euristeo di Micene", "Atena", "Apollo"], correct: 1 },
      { q: "Quante fatiche in totale doveva compiere Eracle?", a: ["7", "10", "12", "15"], correct: 2 },
      { q: "Qual è la nona fatica di Eracle?", a: ["Uccidere l'Idra di Lerna", "Rubare la cintura di Ippolita, regina delle Amazzoni", "Catturare il toro di Creta", "Pulire le stalle di Augia"], correct: 1 },
      { q: "Chi era il padre divino di Eracle?", a: ["Poseidone", "Apollo", "Ares", "Zeus"], correct: 3 }
    ] },
    { id: "mit_medusa", category: "Mitologia", title: "Perseo e Medusa", desc: "Decapita la Gorgone con lo sguardo pietrificante senza guardarla negli occhi.", rewards: { xp: 50, dracme: 35 }, area: "Creta", unlockedBy: "mit_dei", questions: [
      { q: "Quale dono ricevette Perseo da Atena per sconfiggere Medusa?", a: ["La spada di bronzo", "Lo scudo lucido come uno specchio", "I calzari alati", "L'elmo dell'invisibilità"], correct: 1 },
      { q: "Chi nacque dal sangue della Medusa decapitata?", a: ["Il Minotauro", "Il Cerbero", "Pegaso (il cavallo alato)", "La Chimera"], correct: 2 },
      { q: "Da dove proveniva Perseo?", a: ["Da Troia", "Da Argo", "Da Sparta", "Da Creta"], correct: 1 },
      { q: "Quale principessa salvò Perseo dopo l'uccisione di Medusa?", a: ["Arianna", "Elena", "Andromeda", "Nausicaa"], correct: 2 },
      { q: "Come riuscì Perseo a evitare lo sguardo pietrificante di Medusa?", a: ["Indossando l'elmo dell'invisibilità", "Guardando il riflesso di lei nello scudo lucido", "Tenendo gli occhi chiusi durante il duello", "Usando frecce a distanza di sicurezza"], correct: 1 }
    ] },
    { id: "mit_minotauro", category: "Mitologia", title: "Teseo e il Minotauro", desc: "Entra nel labirinto di Cnosso per abbattere il mostro taurino.", rewards: { xp: 55, dracme: 35 }, area: "Creta", unlockedBy: "mit_eracle", questions: [
      { q: "Chi diede a Teseo il filo rosso per ritrovare la via d'uscita?", a: ["Elena", "Arianna", "Penelope", "Didone"], correct: 1 },
      { q: "Dove viveva il Minotauro?", a: ["In una caverna del monte Olimpo", "Nel labirinto di Cnosso, sull'isola di Creta", "Negli abissi del mare Egeo", "In una foresta oscura della Tracia"], correct: 1 },
      { q: "Qual era la natura del Minotauro?", a: ["Metà uomo e metà toro", "Metà uomo e metà leone", "Metà uomo e metà aquila", "Metà cavallo e metà serpente"], correct: 0 },
      { q: "Chi era il padre di Teseo?", a: ["Il re Minosse di Creta", "Il re Egeo di Atene", "Il re Priamo di Troia", "Il re Menelao di Sparta"], correct: 1 },
      { q: "Quanti giovani ateniesi venivano offerti ogni anno al Minotauro?", a: ["5 ragazzi e 5 ragazze", "7 ragazzi e 7 ragazze", "10 ragazzi e 10 ragazze", "12 ragazzi e 12 ragazze"], correct: 1 }
    ] },

    // Iliade (Term 1)
    { id: "ili_guerra", category: "Iliade", title: "La Guerra di Troia", desc: "La mela della discordia e lo sbarco acheo sulle spiagge di Ilio.", rewards: { xp: 60, dracme: 40 }, area: "Troia", unlockedBy: "mit_minotauro", questions: [
      { q: "Quale dea vinse la mela d'oro assegnata da Paride?", a: ["Era", "Atena", "Afrodite", "Artemide"], correct: 2 },
      { q: "Cosa promise Afrodite a Paride in cambio della mela d'oro?", a: ["La vittoria in tutte le battaglie", "La saggezza suprema", "L'amore della donna più bella del mondo (Elena)", "Il potere di regnare su tutti i Greci"], correct: 2 },
      { q: "Per quanti anni durò la guerra di Troia?", a: ["3 anni", "7 anni", "10 anni", "20 anni"], correct: 2 },
      { q: "Come fu conquistata Troia dagli Achei?", a: ["Con un assalto diretto alle mura", "Con il Cavallo di Troia, un inganno ideato da Ulisse", "Con la forza di Achille che abbatté le mura", "Con un accordo diplomatico con il re Priamo"], correct: 1 },
      { q: "Chi era il comandante supremo dell'esercito acheo (greco)?", a: ["Achille", "Ulisse", "Agamennone", "Menelao"], correct: 2 }
    ] },
    { id: "ili_ira", category: "Iliade", title: "L'Ira di Achille", desc: "Cantami o Diva... Scopri perché Achille decise di ritirarsi dalla tenda achea.", rewards: { xp: 65, dracme: 45 }, area: "Troia", unlockedBy: "ili_guerra", questions: [
      { q: "Perché Achille si adira contro Agamennone?", a: ["Perché Agamennone gli sottrae Briseide", "Perché non voleva combattere", "Perché voleva tornare a Ftia", "Per la morte di Patroclo"], correct: 0 },
      { q: "Chi è Briseide nell'Iliade?", a: ["La madre di Achille", "La schiava di guerra sottratta ad Achille da Agamennone", "La figlia del re Priamo di Troia", "La dea che protegge Achille"], correct: 1 },
      { q: "Cosa fa Achille dopo la lite con Agamennone?", a: ["Torna a Ftia dalla sua famiglia", "Si rifugia nella tenda, rifiutandosi di combattere", "Si unisce ai Troiani per vendetta", "Sfida Agamennone a duello singolo"], correct: 1 },
      { q: "Chi è la madre divina di Achille?", a: ["Atena", "Afrodite", "Teti (la ninfa marina)", "Era"], correct: 2 },
      { q: "Qual è il 'tallone d'Achille'?", a: ["Il punto del corpo dove Achille fu reso invulnerabile", "Il suo unico punto vulnerabile, non immerso nel Lete", "Il nome della sua spada", "Un luogo della Grecia dove Achille combatté"], correct: 1 }
    ] },
    { id: "ili_ettore", category: "Iliade", title: "Il Duello con Ettore", desc: "La resa dei conti sotto le porte Scee. Il destino dei difensori di Troia.", rewards: { xp: 80, dracme: 60 }, area: "Troia", unlockedBy: "ili_ira", questions: [
      { q: "Chi indossa le armi di Achille spaventando i Troiani prima del duello?", a: ["Odisseo", "Patroclo", "Aiace", "Diomede"], correct: 1 },
      { q: "Chi uccide Ettore?", a: ["Agamennone", "Aiace", "Achille", "Ulisse"], correct: 2 },
      { q: "Cosa fa Achille con il corpo di Ettore dopo averlo ucciso?", a: ["Lo restituisce immediatamente ai Troiani", "Lo trascina tre volte attorno alle mura di Troia legato al suo carro", "Lo brucia su una pira funebre onorevole", "Lo offre come sacrificio agli dei"], correct: 1 },
      { q: "Come il vecchio re Priamo riscatta il corpo di Ettore?", a: ["Con un esercito di rinforzo dalla Lidia", "Andando da solo di notte a supplicare Achille con un ricco riscatto", "Con una missione diplomatica con Agamennone", "Inviando il figlio Paride come ostaggio"], correct: 1 },
      { q: "Chi è Andromaca nell'Iliade?", a: ["La madre di Ettore", "La sorella di Paride", "La moglie fedele di Ettore", "La sacerdotessa del tempio di Troia"], correct: 2 }
    ] },

    // Odissea (Term 1)
    { id: "odi_ciclope", category: "Odissea", title: "Il Ciclope", desc: "Acceca Polifemo nella sua caverna usando l'astuzia di 'Nessuno'.", rewards: { xp: 70, dracme: 50 }, area: "Itaca", unlockedBy: "ili_ettore", questions: [
      { q: "Cosa dice Ulisse a Polifemo di chiamarsi?", a: ["Odisseo", "Nessuno", "Qualcuno", "Un re"], correct: 1 },
      { q: "Di chi è figlio il ciclope Polifemo?", a: ["Di Zeus", "Di Ares", "Di Poseidone", "Di Efesto"], correct: 2 },
      { q: "Come Ulisse riesce a fuggire dalla caverna di Polifemo con i suoi uomini?", a: ["Di notte quando il ciclope dorme", "Aggrappati sotto la pancia delle pecore del gregge", "Scavando un tunnel nel pavimento della grotta", "Usando l'elmo dell'invisibilità"], correct: 1 },
      { q: "Cosa urlò Ulisse a Polifemo mentre fuggiva, causando la sua rovina?", a: ["'Sono Ulisse di Itaca, figlio di Laerte!'", "'Addio Polifemo, non ci vedrai mai più!'", "'Potete ringraziarmi quando siete al sicuro!'", "'Viva Agamennone, re dei Greci!'"], correct: 0 },
      { q: "Come acceca Ulisse il ciclope Polifemo?", a: ["Con la punta della sua spada", "Con un tizzone ardente", "Con un lungo palo di legno temprato nel fuoco", "Con le frecce di Apollo"], correct: 2 }
    ] },
    { id: "odi_sirene", category: "Odissea", title: "Le Sirene", desc: "L'inganno del canto ammaliatore. Fatti legare all'albero della nave.", rewards: { xp: 60, dracme: 40 }, area: "Itaca", unlockedBy: "odi_ciclope", questions: [
      { q: "Come protegge Ulisse i suoi marinai dal canto delle Sirene?", a: ["Chiudendo le orecchie con la cera d'api", "Cantando a squarciagola", "Legando tutti all'albero", "Navigando di notte"], correct: 0 },
      { q: "Come si comporta Ulisse stesso di fronte al canto delle Sirene?", a: ["Tiene anche lui le orecchie tappate con la cera", "Si fa legare all'albero della nave per ascoltare il canto senza cedere", "Rimane sotto coperta per non sentire il canto", "Ordina di accelerare per superare velocemente lo stretto"], correct: 1 },
      { q: "Cosa promettevano le Sirene a chi le ascoltava?", a: ["Ricchezza e potere immensi", "L'immortalità degli dei", "Conoscenza di tutto il passato e l'avvenire", "Il ritorno sicuro a casa"], correct: 2 },
      { q: "Quali erano le conseguenze di chi cedeva al canto delle Sirene?", a: ["Diventava loro schiavo per sempre", "Moriva naufragando vicino all'isola, attratto verso gli scogli", "Dimenticava completamente la sua vita precedente", "Veniva tramutato in animale"], correct: 1 },
      { q: "Chi suggerì a Ulisse come sfuggire alle Sirene?", a: ["La dea Atena", "Il profeta Tiresia", "La maga Circe prima della partenza", "Il vecchio saggio Nestore"], correct: 2 }
    ] },
    { id: "odi_scilla", category: "Odissea", title: "Scilla e Cariddi", desc: "Naviga nello stretto tra il mostro dalle molte teste e il gorgo marino.", rewards: { xp: 65, dracme: 45 }, area: "Itaca", unlockedBy: "odi_sirene", questions: [
      { q: "Quale mostro marino risucchia l'acqua del mare tre volte al giorno sputandola?", a: ["Scilla", "Cariddi", "Idra", "Ceto"], correct: 1 },
      { q: "Quante teste aveva il mostro Scilla?", a: ["3", "6", "9", "12"], correct: 1 },
      { q: "Che scelta deve fare Ulisse tra i due mostri?", a: ["Decidere quale mostro combattere prima", "Scegliere di passare più vicino a Scilla, perdendo 6 uomini, per salvare la nave da Cariddi", "Tornare indietro per trovare un'altra rotta", "Sacrificare la nave in cambio dei suoi uomini"], correct: 1 },
      { q: "Dove si trovano Scilla e Cariddi?", a: ["Nello stretto di Messina (tra Sicilia e Calabria)", "Nel mar Egeo vicino a Creta", "Nell'oceano a ovest di Gibilterra", "Nell'Adriatico settentrionale"], correct: 0 },
      { q: "Cosa rappresenta la scelta tra Scilla e Cariddi come tema letterario?", a: ["La metafora di un viaggio infinito", "L'impossibilità di evitare un danno tra due mali, dovendo scegliere il minore", "La punizione degli dei per i marinai arroganti", "Un riferimento alle guerre persiane"], correct: 1 }
    ] },
    { id: "odi_ritorno", category: "Odissea", title: "Il Ritorno a Itaca", desc: "Riappropriati del trono superando la prova dell'arco contro i Proci.", rewards: { xp: 85, dracme: 70 }, area: "Itaca", unlockedBy: "odi_scilla", questions: [
      { q: "Quale animale fedele riconosce per primo Ulisse al suo ritorno a Itaca?", a: ["La sua nutrice", "Il suo cane Argo", "Il maiale Eumeo", "Nessuno lo riconosce"], correct: 1 },
      { q: "Come si maschera Ulisse per non essere riconosciuto al suo ritorno?", a: ["Indossa un'armatura da guerriero straniero", "Travestito da vecchio mendicante grazie all'aiuto di Atena", "Arriva di notte sulla spiaggia deserta", "Usa un filtro magico di Circe"], correct: 1 },
      { q: "Qual è la prova dell'arco imposta da Penelope ai Proci?", a: ["Colpire un bersaglio a 100 metri di distanza", "Tendere l'arco di Ulisse e scoccare una freccia attraverso dodici scuri allineate", "Sconfiggere in duello il campione dei Proci", "Portare a termine un lungo viaggio in mare"], correct: 1 },
      { q: "Come Penelope ingan i Proci per guadagnare tempo?", a: ["Finge di essere malata", "Di giorno tesse un sudario per Laerte, di notte lo disfà in segreto", "Organizza una serie di prove impossibili da superare", "Li convince ad aspettare il ritorno del figlio Telemaco"], correct: 1 },
      { q: "Chi aiuta Ulisse nella vendetta finale contro i Proci?", a: ["Solo Telemaco e due servi fedeli", "L'intero esercito di Itaca", "Gli dei scendono dall'Olimpo in suo aiuto", "I Feaci con le loro navi da guerra"], correct: 0 }
    ] },

    // Eneide (Term 1)
    { id: "ene_caduta", category: "Eneide", title: "La Caduta di Troia", desc: "Fuggi dall'incendio di Troia portando sulle spalle il vecchio padre Anchise.", rewards: { xp: 70, dracme: 50 }, area: "Lazio", unlockedBy: "odi_ritorno", questions: [
      { q: "Chi porta in salvo Enea uscendo da Troia in fiamme?", a: ["Il figlio Ascanio e il padre Anchise", "La moglie Creusa", "Elena di Troia", "Il re Priamo"], correct: 0 },
      { q: "Qual è il destino di Enea secondo i decreti degli dei?", a: ["Tornare a Creta, patria degli antenati", "Fondare una nuova Troia in Grecia", "Raggiungere l'Italia e dare origine alla stirpe che fonderà Roma", "Regnare su Cartagine con Didone"], correct: 2 },
      { q: "Cosa porta via con sé Enea da Troia in fiamme?", a: ["Il tesoro del re Priamo", "I Penati (statuette degli dei protettori) e il padre sulle spalle", "L'armatura di Achille", "Il Palladio (statua di Atena)"], correct: 1 },
      { q: "Chi è la madre divina di Enea?", a: ["Era / Giunone", "Atena / Minerva", "Afrodite / Venere", "Artemide / Diana"], correct: 2 },
      { q: "Qual è il ruolo di Ascanio nella storia di Enea?", a: ["È il fratello di Enea, re di Troia", "È il figlio di Enea, capostipite della dinastia Iulia", "È il padre di Enea, che porta sulle spalle", "È il consigliere divino di Enea"], correct: 1 }
    ] },
    { id: "ene_viaggio", category: "Eneide", title: "Il Viaggio di Enea", desc: "La tempesta inviata da Giunone e l'amore tragico con la regina Didone a Cartagine.", rewards: { xp: 75, dracme: 55 }, area: "Lazio", unlockedBy: "ene_caduta", questions: [
      { q: "In quale città africana approda Enea incontrando la regina Didone?", a: ["Tiro", "Tebe", "Cartagine", "Alessandria"], correct: 2 },
      { q: "Chi scatena la tempesta che sospinge Enea a Cartagine?", a: ["Poseidone", "Zeus", "Giunone / Era", "Eolo, dio dei venti"], correct: 2 },
      { q: "Come si conclude la storia d'amore tra Enea e Didone?", a: ["Enea rimane a Cartagine, rinunciando al suo destino", "Enea parte per l'Italia obbedendo agli dei, e Didone si suicida", "Didone parte con Enea verso l'Italia", "I due si sposano e fondano insieme una nuova città"], correct: 1 },
      { q: "Cosa rivela l'anima di Anchise a Enea durante la sua visita agli Inferi?", a: ["Il luogo del tesoro di Troia nascosto", "Il percorso più sicuro per raggiungere l'Italia", "Il glorioso destino futuro di Roma e dei suoi eroi", "Il modo per sconfiggere il re Turno"], correct: 2 },
      { q: "Quale guida accompagna Enea nella sua discesa agli Inferi?", a: ["La dea Venere (sua madre)", "Il profeta Tiresia", "La Sibilla cumana", "L'ombra del padre Anchise"], correct: 2 }
    ] },
    { id: "ene_fondazione", category: "Eneide", title: "La Fondazione del Nuovo Regno", desc: "Il duello finale con Turno e il matrimonio con Lavinia per unire i destini dei Troiani e dei Latini.", rewards: { xp: 90, dracme: 80 }, area: "Lazio", unlockedBy: "ene_viaggio", questions: [
      { q: "Chi è l'antagonista principale che contende a Enea la mano di Lavinia nel Lazio?", a: ["Turno, re dei Rutuli", "Latino, re del Lazio", "Mezenzio", "Evandro"], correct: 0 },
      { q: "Chi è Lavinia nell'Eneide?", a: ["La figlia del re Latino, promessa sposa di Enea", "La sorella di Didone, regina di Cartagine", "Una sacerdotessa del tempio di Giunone", "La figlia della Sibilla cumana"], correct: 0 },
      { q: "Come si chiama la guerra che scoppia nel Lazio tra Troiani e Latini?", a: ["La guerra Latina", "La guerra di Azio", "La guerra troiana del Lazio", "La seconda guerra di Troia"], correct: 0 },
      { q: "Come si conclude l'Eneide?", a: ["Enea muore in battaglia poco dopo la vittoria", "Enea perdona Turno e lo libera", "Enea uccide Turno nel duello finale e conquista il Lazio", "I Troiani si impiccano sulle navi e fuggono"], correct: 2 },
      { q: "Qual è la differenza tra l'eroe Enea e gli eroi omerici come Achille?", a: ["Enea è più coraggioso fisicamente di Achille", "Enea combatte per la gloria personale, Achille per il dovere", "Enea sacrifica i propri desideri per il bene collettivo (pietas), Achille mette prima la gloria individuale", "Non c'è differenza sostanziale tra i due eroi"], correct: 2 }
    ] },

    // Ciclo Carolingio (Term 2)
    { id: "car_paladini", category: "Ciclo Carolingio", title: "Carlo Magno e i Paladini", desc: "Entra nella corte imperiale dei Franchi e conosci i difensori della fede.", rewards: { xp: 75, dracme: 60 }, area: "Aquisgrana", unlockedBy: "ene_fondazione", questions: [
      { q: "Qual è il nome dello storico biografo di Carlo Magno?", a: ["Eginardo", "Alcuino di York", "Ariosto", "Boiardo"], correct: 0 },
      { q: "Quanti erano i Paladini di Carlo Magno?", a: ["7", "12", "24", "100"], correct: 1 },
      { q: "Contro chi combattevano principalmente i paladini di Carlo Magno nelle chansons de geste?", a: ["Contro i Vichinghi del nord", "Contro i Saraceni (musulmani)", "Contro i Cavalieri bretoni di Re Artù", "Contro l'Impero Romano d'Oriente"], correct: 1 },
      { q: "Qual è la capitale dell'impero di Carlo Magno?", a: ["Parigi", "Roma", "Aquisgrana", "Toledo"], correct: 2 },
      { q: "Chi è il più celebre paladino di Carlo Magno?", a: ["Lancillotto", "Orlando", "Artù", "Parsifal"], correct: 1 }
    ] },
    { id: "car_durendal", category: "Ciclo Carolingio", title: "Orlando e Durendal", desc: "Le gloriose imprese di Orlando a capo dei paladini dell'imperatore.", rewards: { xp: 80, dracme: 65 }, area: "Roncisvalle", unlockedBy: "car_paladini", questions: [
      { q: "Qual è l'origine mitologica della spada Durendal secondo la tradizione?", a: ["Fu forgiata dai nani", "Venne consegnata a Carlo Magno da un angelo per Orlando", "Venne trovata nella roccia", "Apparteneva a Ettore di Troia"], correct: 1 },
      { q: "Cosa rende la spada Durendal speciale?", a: ["È invisibile ai nemici", "È indistruttibile", "Dà forza soprannaturale a chi la impugna", "Può evocare fulmini"], correct: 1 },
      { q: "Chi è il cugino di Orlando e suo fedele compagno d'arme?", a: ["Oliviero", "Rinaldo di Montalbano", "Astolfo d'Inghilterra", "Turpino"], correct: 1 },
      { q: "Di cosa è principalmente protagonista Orlando nelle Chansons de Geste?", a: ["Della ricerca del Santo Graal", "Della difesa della fede cristiana contro i Saraceni", "Della rivalità con Re Artù per il dominio d'Europa", "Del viaggio verso Gerusalemme in Terra Santa"], correct: 1 },
      { q: "Di chi è nipote Orlando?", a: ["Del re di Francia", "Di Carlo Magno", "Di Gano di Maganza", "Del papa di Roma"], correct: 1 }
    ] },
    { id: "car_roncisvalle", category: "Ciclo Carolingio", title: "La Battaglia di Roncisvalle", desc: "L'imboscata dei Baschi e il sacrificio eroico di Orlando nei Pirenei.", rewards: { xp: 95, dracme: 80 }, area: "Roncisvalle", unlockedBy: "car_durendal", questions: [
      { q: "Perché Orlando tarda a suonare l'Olifante per chiedere aiuto a Carlo Magno?", a: ["Per orgoglio cavalleresco", "Perché l'olifante era rotto", "Perché era svenuto", "Per tradimento"], correct: 0 },
      { q: "Chi tradisce Orlando e causa l'imboscata di Roncisvalle?", a: ["Rinaldo", "Oliviero", "Gano di Maganza", "Astolfo"], correct: 2 },
      { q: "Cosa fa Orlando alla fine della battaglia, sconfitto, prima di morire?", a: ["Fugge a cavallo verso la Francia", "Tenta invano di spezzare Durendal per non lasciarla ai nemici e muore con il viso rivolto verso la Spagna", "Si arrende ai nemici e chiede pietà", "Viene salvato da un angelo di Dio"], correct: 1 },
      { q: "Chi si vendica della sconfitta di Roncisvalle?", a: ["I sopravvissuti della retroguardia", "Carlo Magno con l'intero esercito franco", "Il figlio di Orlando", "I Cavalieri della Tavola Rotonda"], correct: 1 },
      { q: "Il corno da guerra di Orlando si chiama:", a: ["Excalibur", "Durendal", "Olifante", "Baiardo"], correct: 2 }
    ] },

    // Ciclo Bretone (Term 2)
    { id: "bre_roccia", category: "Ciclo Bretone", title: "La Spada nella Roccia", desc: "Estrai Excalibur e dimostra il tuo diritto divino a governare la Britannia.", rewards: { xp: 80, dracme: 60 }, area: "Camelot", unlockedBy: "car_roncisvalle", questions: [
      { q: "Quale mago consiglia e assiste il giovane Artù nella sua ascesa?", a: ["Mago Merlino", "Mago Gandalf", "Mago Silente", "Morgana"], correct: 0 },
      { q: "Come si chiama la famosa spada di Re Artù?", a: ["Durendal", "Gram", "Excalibur", "Caliburn"], correct: 2 },
      { q: "Chi era il padre biologico di Re Artù?", a: ["Merlino", "Il re Lot di Orkney", "Uther Pendragon, re di Britannia", "Il re del Galles"], correct: 2 },
      { q: "Cosa dimostra il gesto di estrarre la spada dalla roccia?", a: ["La forza fisica dell'eroe", "Il diritto divino al trono di tutta l'Inghilterra", "L'approvazione di Merlino", "La benedizione del Papa"], correct: 1 },
      { q: "Come si chiama il regno che Artù fonda?", a: ["Albione", "Avalon", "Camelot", "Brocelandia"], correct: 2 }
    ] },
    { id: "bre_tavola", category: "Ciclo Bretone", title: "Re Artù e la Tavola Rotonda", desc: "Costruisci il regno basato sull'uguaglianza tra i nobili cavalieri.", rewards: { xp: 85, dracme: 70 }, area: "Camelot", unlockedBy: "bre_roccia", questions: [
      { q: "Perché la tavola dei cavalieri di Camelot è rotonda?", a: ["Perché la stanza era circolare", "Perché nessun cavaliere potesse pretendere la precedenza o sentirsi superiore", "Fu un dono dei giganti", "Per risparmiare spazio"], correct: 1 },
      { q: "Chi è la moglie di Re Artù?", a: ["Morgana", "Viviana", "Ginevra", "Isotta"], correct: 2 },
      { q: "Qual è il cavaliere considerato il più valoroso della Tavola Rotonda?", a: ["Galahad", "Parsifal", "Lancillotto del Lago", "Gawain"], correct: 2 },
      { q: "Qual è il 'Seggio Pericoloso' alla Tavola Rotonda?", a: ["Il seggio di Re Artù che nessuno può sfidare", "Il posto rimasto vuoto, riservato al cavaliere eletto a trovare il Graal", "Il trono della strega Morgana", "Il posto di Lancillotto, troppo pericoloso da avvicinare"], correct: 1 },
      { q: "Chi è il mago prigioniero della Dama del Lago?", a: ["Gandalf", "Silente", "Merlino", "Viviana"], correct: 2 }
    ] },
    { id: "bre_lancillotto", category: "Ciclo Bretone", title: "Lancillotto e Ginevra", desc: "L'amore proibito che mette a dura prova la lealtà del regno.", rewards: { xp: 90, dracme: 75 }, area: "Foresta di Brocelandia", unlockedBy: "bre_tavola", questions: [
      { q: "Di chi si innamora perdutamente Sir Lancillotto del Lago?", a: ["Morgana", "Isotta", "Ginevra, regina di Camelot", "Viviana, la dama del lago"], correct: 2 },
      { q: "Perché l'amore tra Lancillotto e Ginevra è pericoloso per il regno?", a: ["Perché Lancillotto è un cavaliere straniero", "Perché rompe il patto di lealtà alla Tavola Rotonda e porta alla guerra civile", "Perché Merlino aveva profetizzato che avrebbe portato sfortuna", "Perché Ginevra era già promessa a un altro re"], correct: 1 },
      { q: "Chi è il figlio di Lancillotto?", a: ["Parsifal", "Gawain", "Galahad", "Tristan"], correct: 2 },
      { q: "Come si chiama l'isola mistica dove Re Artù viene portato dopo la battaglia?", a: ["Brocelandia", "Avalon", "Camelot", "Lyonesse"], correct: 1 },
      { q: "Chi è il cavaliere ribelle che usurpa il trono di Artù in sua assenza?", a: ["Lancillotto", "Gawain", "Mordred", "Galahad"], correct: 2 }
    ] },
    { id: "bre_graal", category: "Ciclo Bretone", title: "La Ricerca del Graal", desc: "L'avventura più sacra e misteriosa: la cerca della coppa di Cristo.", rewards: { xp: 100, dracme: 90 }, area: "Castello del Graal", unlockedBy: "bre_lancillotto", questions: [
      { q: "Quale cavaliere, celebre per la sua totale purezza, riesce infine a trovare il Graal?", a: ["Lancillotto", "Galahad", "Artù", "Gawain"], correct: 1 },
      { q: "Cos'è il Santo Graal nella tradizione medievale?", a: ["La spada sacra di Re Artù", "La coppa usata da Gesù nell'Ultima Cena", "Lo scudo di un antico re cristiano", "Il libro delle profezie di Merlino"], correct: 1 },
      { q: "Perché Lancillotto non può vedere il Graal?", a: ["Perché non è abbastanza coraggioso", "A causa del suo amore peccaminoso per Ginevra che lo rende impuro", "Perché non è della stirpe di Re Artù", "Perché arriva in ritardo alla visione sacra"], correct: 1 },
      { q: "Chi accompagna Galahad nella 'Cerca' del Graal?", a: ["Lancillotto e Gawain", "Parsifal e Bors di Gaunes", "Artù e Merlino", "Tristan e Isotta"], correct: 1 },
      { q: "Cosa rappresenta la Cerca del Graal come tema spirituale?", a: ["La conquista militare di Gerusalemme", "La ricerca di potere e gloria terrena", "Il percorso di purificazione interiore e ricerca della perfezione spirituale", "La vendetta dei cavalieri cristiani contro i Saraceni"], correct: 2 }
    ] },
    { id: "nib_tesoro", category: "Ciclo dei Nibelunghi", title: "Il Tesoro di Sigfrido", desc: "Supera le prove e aiuta Sigfrido ad affrontare il drago Fafnir e a conquistare il tesoro dei Nibelunghi.", rewards: { xp: 110, dracme: 95 }, area: "Worms", unlockedBy: "bre_graal", questions: [
      { q: "Chi forgia nuovamente la spada Gram per permettere a Sigfrido di uccidere il drago Fafnir?", a: ["Il nano Alberico", "Il nano Regin / Mime", "Odino", "Hagen"], correct: 1 },
      { q: "In quale punto del corpo Sigfrido è vulnerabile dopo essersi bagnato nel sangue del drago?", a: ["Il tallone destro", "Una spalla o tra le scapole a causa di una foglia di tiglio", "La pianta del piede", "Il petto"], correct: 1 },
      { q: "Chi è il nano guardiano che custodisce il tesoro dei Nibelunghi e viene sconfitto da Sigfrido?", a: ["Loki", "Alberico", "Fafnir", "Rüdiger"], correct: 1 },
      { q: "Quale oggetto magico sottrae Sigfrido ad Alberico, che permette di diventare invisibili?", a: ["L'anello magico", "Il mantello dell'invisibilità / Tarnkappe", "La spada Balmung", "L'Olifante"], correct: 1 },
      { q: "Di chi era la sposa designata Brunilde, che Sigfrido aiuta a conquistare con l'inganno?", a: ["Gunther, re dei Burgundi", "Giselher", "Hagen", "Etzel"], correct: 0 }
    ] },
    { id: "nib_vendetta", category: "Ciclo dei Nibelunghi", title: "La Vendetta di Crimilde", desc: "La tragedia di Worms e il tragico destino del tesoro nascosto nel fiume Reno.", rewards: { xp: 120, dracme: 100 }, area: "Reno", unlockedBy: "nib_tesoro", questions: [
      { q: "Chi complotta contro Sigfrido e lo uccide a tradimento durante una battuta di caccia?", a: ["Crimilde", "Gunther e Hagen", "Etzel", "Rüdiger"], correct: 1 },
      { q: "Dove decide Hagen di nascondere il tesoro dei Nibelunghi per sottrarlo a Crimilde?", a: ["Nelle viscere del monte Olimpo", "Nel fondo del fiume Reno", "Nel castello del Graal", "A Worms nella sala del trono"], correct: 1 },
      { q: "Quale sovrano degli Unni sposa Crimilde per ottenere l'esercito necessario alla sua vendetta?", a: ["Carlo Magno", "Etzel (Attila)", "Artù", "Gano"], correct: 1 },
      { q: "Chi è il nobile cavaliere amico sia di Crimilde sia dei Burgundi che muore combattendo nel conflitto finale?", a: ["Alberico", "Rüdiger", "Gernot", "Giselher"], correct: 1 },
      { q: "Come si conclude il Canto dei Nibelunghi dopo la strage alla corte degli Unni?", a: ["Sigfrido risorge", "Con la morte di tutti i Burgundi, di Hagen e della stessa Crimilde", "Con la fondazione di una nuova Roma", "Con il trionfo dei cavalieri della Tavola Rotonda"], correct: 1 }
    ] }
  ],

  study_guides: [
    { id: "auth_omero", category: "Schede Autore", title: "Omero", image: "assets/images/tempio/omero_portrait.png", summary: "Il leggendario poeta cieco a cui si attribuisce la paternità di Iliade e Odissea.", content: "Biografia: La figura di Omero rappresenta il punto di partenza dell'intera letteratura occidentale, sebbene sia avvolta nel mistero e nella leggenda. La tradizione lo dipinge come un aedo cieco, nativo della Ionia (Asia Minore), che girovagava cantando le sue composizioni. Opere principali: L'Iliade, che narra l'ira di Achille e la tragica guerra di Troia, e l'Odissea, incentrata sul tormentato ritorno a casa dell'astuto Ulisse. Contesto storico e Questione Omerica: I critici moderni hanno sollevato la celebre 'Questione Omerica', un fitto dibattito filologico sulla reale esistenza del poeta e sulla paternità dei poemi. Oggi si ritiene che l'Iliade e l'Odissea siano il frutto di una lunga tradizione orale portata avanti da generazioni di cantastorie (aedi e rapsodi) che tramandavano formule fisse ed epiteti ripetuti. Soltanto nel VI secolo a.C., ad Atene, sotto la tirannide di Pisistrato, questi canti vennero raccolti, unificati e messi per iscritto per preservarne l'integrità, dando vita ai testi che leggiamo oggi." },
    { id: "auth_virgilio", category: "Schede Autore", title: "Publio Virgilio Marone", image: "assets/images/tempio/virgilio_portrait.png", summary: "Il sommo poeta romano autore dell'Eneide.", content: "Biografia: Nato a Mantova nel 70 a.C., divenne il principale poeta del circolo di Mecenate sotto l'imperatore Augusto. Opere principali: Eneide, Bucoliche, Georgiche. Contesto storico: Scrisse l'Eneide per celebrare le origini divine di Roma e della dinastia Giulio-Claudia." },
    { id: "auth_turoldo", category: "Schede Autore", title: "Turoldo (Chanson de Roland)", image: "assets/images/tempio/turoldo_portrait.png", summary: "Il presunto autore o trascrittore del capolavoro del ciclo carolingio.", content: "Biografia: Sconosciuto ai più, il nome 'Turoldo' compare nell'ultimo verso del manoscritto di Oxford della Chanson de Roland ('Qui finisce la ballata che Turoldo declama'). Opere: La Canzone di Orlando (Chanson de Roland), capostipite delle 'Chansons de Geste'. Contesto storico: XI secolo, in pieno feudalesimo e spirito di crociata." },
    { id: "auth_troyes", category: "Schede Autore", title: "Chrétien de Troyes", image: "assets/images/tempio/troyes_portrait.png", summary: "Il poeta francese fondatore del romanzo cavalleresco bretone.", content: "Biografia: Attivo nella seconda metà del XII secolo alla corte di Maria di Champagne. Opere: Lancillotto o il cavaliere della carretta, Parsifal o il romanzo del Graal. Contesto storico: Nascita delle corti feudali raffinate dove si sviluppa l'amor cortese e la ricerca mistica." },
    { id: "char_prometeo", category: "Schede Personaggio (Mitologia)", title: "Prometeo", image: "assets/images/tempio/prometeo_portrait.png", summary: "Il Titano che donò il fuoco all'umanità.", content: "Descrizione: Titano amico degli uomini. Caratteristiche: Simbolo di ribellione contro il potere tirannico degli dei. Rubò il fuoco a Zeus per donarlo agli esseri umani, permettendo loro di progredire e fondare la civiltà. Per questo fu condannato a essere incatenato a una roccia del Caucaso, dove un'aquila gli rodeva eternamente il fegato.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"PREFERISCO ESSERE INCATENATO A QUESTA ROCCIA PIUTTOSTO CHE ESSERE IL SERVO OBBEDIENTE DI ZEUS.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— ESCHILO, PROMETEO INCATENATO</span></div>" },
    { id: "char_eracle", category: "Schede Personaggio (Mitologia)", title: "Eracle (Ercole)", image: "assets/images/tempio/eracle_portrait.png", summary: "Il semidio forzuto famoso per le sue dodici fatiche.", content: "Descrizione: Figlio di Zeus e di Alcmena, perseguitato dall'ira di Era. Caratteristiche: Rappresenta la forza fisica indomabile accoppiata a un profondo senso del dovere morale. Superò le dodici fatiche (tra cui uccidere il Leone di Nemea e catturare Cerbero) guadagnandosi l'immortalità sull'Olimpo." },
    { id: "char_teseo", category: "Schede Personaggio (Mitologia)", title: "Teseo", image: "assets/images/tempio/teseo_portrait.png", summary: "Il leggendario fondatore di Atene e uccisore del Minotauro.", content: "Descrizione: Eroe ateniese, figlio di Egeo (o Poseidone). Caratteristiche: Famoso per aver liberato la sua città dal tributo di sangue imposto dal re Minosse di Creta, uccidendo il Minotauro all'interno del Labirinto con l'aiuto del filo di Arianna." },
    { id: "char_perseo", category: "Schede Personaggio (Mitologia)", title: "Perseo", image: "assets/images/tempio/perseo_portrait.png", summary: "L'eroe che sconfisse la Gorgone Medusa.", content: "Descrizione: Figlio di Zeus e di Danae. Caratteristiche: Uccise Medusa usando il riflesso dello scudo lucido donatogli da Atena per non essere pietrificato dal suo sguardo. Salvò inoltre la principessa Andromeda dalle fauci di un mostro marino." },
    { id: "char_achille", category: "Schede Personaggio (Iliade)", title: "Achille", image: "assets/images/tempio/achille_portrait.png", summary: "Il più forte guerriero acheo, semidio dell'ira funesta.", content: "Descrizione: Figlio del mortale Peleo e della ninfa marina Teti. Caratteristiche: Reso invulnerabile dalla madre ad eccezione del tallone. Guidato dalla ricerca della gloria eterna ('kleos') a costo della vita. La sua ira per la sottrazione di Briseide e, successivamente, per la morte di Patroclo è il fulcro narrativo dell'Iliade.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"CANTAMI, O DIVA, DEL PELIDE ACHILLE L'IRA FUNESTA CHE INFINITI ADDUSSE LUTTI AGLI ACHEI...\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— OMERO, ILIADE</span></div>" },
    { id: "char_ettore", category: "Schede Personaggio (Iliade)", title: "Ettore", image: "assets/images/tempio/ettore_portrait.png", summary: "Principe ereditario troiano e valoroso protettore della patria.", content: "Descrizione: Figlio del re Priamo e di Ecuba, marito di Andromaca e padre di Astianatte. Caratteristiche: L'antagonista nobile dell'Iliade. A differenza di Achille, Ettore non combatte per la gloria personale ma per il dovere civile, per proteggere la propria famiglia e la propria patria dal massacro acheo. Muore valorosamente per mano di Achille.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"UN SOLO AUGURIO È IL MIGLIORE: COMBATTER PER LA PATRIA.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— OMERO, ILIADE</span></div>" },
    { id: "char_patroclo", category: "Schede Personaggio (Iliade)", title: "Patroclo", image: "assets/images/tempio/patroclo_portrait.png", summary: "L'amatissimo compagno e scudiero di Achille.", content: "Descrizione: Cresciuto alla corte di Peleo insieme ad Achille. Caratteristiche: Caratterizzato da una profonda lealtà, compassione ed altruismo. Pur di salvare le navi achee in fiamme, indossa le armi di Achille spaventando i Troiani, ma viene ucciso da Ettore con l'aiuto di Apollo, scatenando il ritorno furioso di Achille in battaglia." },
    { id: "char_priamo", category: "Schede Personaggio (Iliade)", title: "Priamo", image: "assets/images/tempio/priamo_portrait.png", summary: "Il vecchio re di Troia e padre di cinquanta figli.", content: "Descrizione: Sovrano saggio e tormentato della città di Troia. Caratteristiche: Simbolo del dolore paterno. Compie il gesto straordinario di recarsi da solo, di notte, nella tenda del nemico giurato Achille per supplicarlo di restituirgli il corpo del figlio Ettore dietro riscatto, toccando il cuore dell'eroe acheo." },
    { id: "char_agamennone", category: "Schede Personaggio (Iliade)", title: "Agamennone", image: "assets/images/tempio/agamennone_portrait.png", summary: "Re di Micene e comandante in capo della coalizione greca.", content: "Descrizione: Fratello di Menelao, sposo di Clitennestra. Caratteristiche: Leader arrogante e avido di potere. La sua contesa con Achille per il possesso della schiava Briseide scatena il ritiro del guerriero e rischia di causare la sconfitta totale degli Achei." },
    { id: "char_paride", category: "Schede Personaggio (Iliade)", title: "Paride", image: "assets/images/tempio/paride_portrait.png", summary: "Il principe troiano il cui rapimento di Elena scatenò la guerra.", content: "Descrizione: Figlio di Priamo, celebre per la sua straordinaria bellezza. Caratteristiche: Scelto per giudicare chi fosse la dea più bella, assegna la mela d'oro ad Afrodite in cambio dell'amore di Elena. È un arciere abile (colpirà Achille al tallone guidato da Apollo), ma è descritto spesso come pavido nei duelli corpo a corpo." },
    { id: "char_elena", category: "Schede Personaggio (Iliade)", title: "Elena", image: "assets/images/tempio/elena_portrait.png", summary: "La donna più bella del mondo, contesa tra Sparta e Troia.", content: "Descrizione: Moglie del re Menelao di Sparta, fuggita a Troia con Paride. Caratteristiche: Simbolo della bellezza distruttiva e della colpa involontaria. Si strugge per il rimorso del conflitto scatenato a causa sua, divisa tra la nostalgia per la patria e il fascino di Troia." },
    { id: "char_diomede", category: "Schede Personaggio (Iliade)", title: "Diomede", image: "assets/images/tempio/diomede_portrait.png", summary: "Il giovane e impavido re di Argo.", content: "Descrizione: Uno dei guerrieri achei più valorosi e assennati. Caratteristiche: Protetto da Atena, durante la sua 'aristeia' (glorificazione) fa strage di nemici e giunge persino a ferire due divinità scese in campo: Afrodite e Ares." },
    { id: "char_ulisse", category: "Schede Personaggio (Odissea)", title: "Ulisse", image: "assets/images/tempio/ulisse_portrait.png", summary: "Re di Itaca, noto per il suo multiforme ingegno e la sua curiosità.", content: "Descrizione: Eroe dell'astuzia, ideatore dell'inganno del Cavallo di Troia. Caratteristiche: Rappresenta la sete di conoscenza, l'intelligenza strategica (metis) e la perseveranza. Il suo viaggio di ritorno a Itaca dura dieci anni, costellato di prove terribili superate grazie alla mente piuttosto che alla forza bruta.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"CONSIDERATE LA VOSTRA SEMENZA: FATTI NON FOSTE A VIVER COME BRUTI, MA PER SEGUIR VIRTUTE E CANOSCENZA.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— DANTE ALIGHIERI, INFERNO</span></div>" },
    { id: "char_penelope", category: "Schede Personaggio (Odissea)", title: "Penelope", image: "assets/images/tempio/penelope_portrait.png", summary: "La fedele sposa di Ulisse e regina di Itaca.", content: "Descrizione: Moglie devota che attende il marito per vent'anni. Caratteristiche: Emblema di fedeltà e astuzia femminile. Per ritardare le nozze con i Proci che occupano la sua reggia, promette di scegliere uno sposo solo al termine della tessitura di un sudario per il vecchio suocero Laerte: di giorno lo tesse, di notte lo disfa in segreto." },
    { id: "char_telemaco", category: "Schede Personaggio (Odissea)", title: "Telemaco", image: "assets/images/tempio/telemaco_portrait.png", summary: "Il figlio di Ulisse, cresciuto nell'attesa del padre.", content: "Descrizione: Giovane principe di Itaca, rimasto neonato alla partenza di Ulisse. Caratteristiche: Intraprende un viaggio di crescita personale alla ricerca di notizie del padre (Telemachia) e, al ritorno di quest'ultimo, lo aiuta nella vendetta finale contro i Proci." },
    { id: "char_polifemo", category: "Schede Personaggio (Odissea)", title: "Polifemo", image: "assets/images/tempio/polifemo_portrait.png", summary: "Il ciclope antropofago figlio di Poseidone.", content: "Descrizione: Gigante pastore con un solo occhio sulla fronte. Caratteristiche: Rappresenta la barbarie e il rifiuto delle leggi dell'ospitalità sacre agli dei. Divora i compagni di Ulisse, ma viene accecato dall'astuzia dell'eroe che si fa chiamare 'Nessuno'." },
    { id: "char_circe", category: "Schede Personaggio (Odissea)", title: "Circe", image: "assets/images/tempio/circe_portrait.png", summary: "La maga divina dell'isola di Eea.", content: "Descrizione: Figlia del dio Sole (Elio) ed esperta di filtri magici. Caratteristiche: Trasforma in maiali i marinai di Ulisse che approdano sulla sua isola. Ulisse riesce a resisterle grazie all'erba 'moli' regalatagli da Hermes, convincendola poi a restituire forma umana ai compagni e ospitandoli per un anno." },
    { id: "char_orlando", category: "Schede Personaggio (Ciclo Carolingio)", title: "Orlando", image: "assets/images/tempio/orlando_portrait.png", summary: "Il più valoroso e leale paladino di Carlo Magno.", content: "Descrizione: Prefetto della Marca di Bretagna e nipote dell'Imperatore. Caratteristiche: Il cavaliere cristiano perfetto, difensore della fede e della patria. È invulnerabile a eccezione delle piante dei piedi. Muore eroicamente nell'imboscata di Roncisvalle proteggendo la ritirata dell'esercito franco e rifiutandosi di suonare l'Olifante fino all'ultimo respiro.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"QUANDO ORLANDO SENTE CHE LA MORTE LO SOVRASTA... VOLGE IL VISO VERSO LA SPAGNA PAGANA E STRINGE AL PETTO LA SUA DURENDAL...\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— CHANSON DE ROLAND</span></div>" },
    { id: "char_rinaldo", category: "Schede Personaggio (Ciclo Carolingio)", title: "Rinaldo di Montalbano", image: "assets/images/tempio/rinaldo_portrait.png", summary: "Cugino di Orlando, guerriero coraggioso e impulsivo.", content: "Descrizione: Cavaliere franco possessore del magico cavallo Baiardo e della spada Fusberta. Caratteristiche: Fiero e spesso in contrasto con l'Imperatore Carlo. Rivaleggia con il cugino Orlando per l'amore della bellissima Angelica, principessa del Catai." },
    { id: "char_astolfo", category: "Schede Personaggio (Ciclo Carolingio)", title: "Astolfo d'Inghilterra", image: "assets/images/tempio/astolfo_portrait.png", summary: "Il paladino stravagante possessore di oggetti magici.", content: "Descrizione: Figlio del re d'Inghilterra, amico intimo di Orlando. Caratteristiche: Meno forte in battaglia ma dotato di incredibile curiosità e coraggio spirituale. Cavalca l'Ippogrifo alato e compie un viaggio sulla Luna per recuperare il senno perduto di Orlando, che era impazzito per amore." },
    { id: "char_artu", category: "Schede Personaggio (Ciclo Bretone)", title: "Re Artù Pendragon", image: "assets/images/tempio/artu_portrait.png", summary: "Il leggendario monarca di Britannia e creatore di Camelot.", content: "Descrizione: Figlio di Uther Pendragon, cresciuto dal mago Merlino. Caratteristiche: Estrae la spada magica conficcata nella roccia dimostrando il suo diritto di regnare. Istituisce la Tavola Rotonda per sancire l'uguaglianza tra i suoi cavalieri e combattere per la giustizia e la pace.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"CHIUNQUE ESTRARRÀ QUESTA SPADA DA QUESTA ROCCIA... È DI DIRITTO RE DI TUTTA L'INGHILTERRA.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— SIR THOMAS MALORY, LA MORTE DI ARTÙ</span></div>" },
    { id: "char_lancillotto", category: "Schede Personaggio (Ciclo Bretone)", title: "Sir Lancillotto del Lago", image: "assets/images/tempio/lancillotto_portrait.png", summary: "Il primo cavaliere della Tavola Rotonda, perfetto ma tormentato.", content: "Descrizione: Allevato dalla Dama del Lago. Caratteristiche: Il guerriero più nobile e abile nei tornei di Camelot. Tuttavia, il suo amore segreto e proibito per la regina Ginevra (moglie di Artù) rompe il patto di lealtà tra i cavalieri e innesca la guerra civile che porterà alla caduta del regno." },
    { id: "char_galahad", category: "Schede Personaggio (Ciclo Bretone)", title: "Sir Galahad", image: "assets/images/tempio/galahad_portrait.png", summary: "Il cavaliere più puro al mondo, figlio di Lancillotto.", content: "Descrizione: Considerato il cavaliere eletto destinato a sedere sul 'Seggio Pericoloso'. Caratteristiche: Caratterizzato da una devozione e purezza spirituale assolute. È l'unico, insieme a Parsifal e Bors, a completare la Cerca del Santo Graal, venendo assunto in cielo subito dopo aver visto i misteri della coppa." },
    { id: "char_parsifal", category: "Schede Personaggio (Ciclo Bretone)", title: "Sir Parsifal", image: "assets/images/tempio/parsifal_portrait.png", summary: "Il cavaliere ingenuo e puro che cercò il Graal.", content: "Descrizione: Cresciuto in una foresta dalla madre lontano dalle armi. Caratteristiche: Rappresenta la purezza dell'innocenza. Giunge al castello del Re Pescatore e vede passare il Graal, ma per timidezza non pone la domanda che avrebbe guarito il sovrano malato, dovendo intraprendere una lunga ricerca per rimediare all'errore." },
    {
      id: "char_sigfrido",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Sigfrido",
      image: "assets/images/tempio/sigfrido_portrait.png",
      summary: "Giovane eroe invincibile che uccide un drago e conquista il tesoro dei Nibelunghi.",
      content: "Descrizione: Il protagonista del ciclo, un giovane eroe invincibile dotato della spada Gram (o Balmung). Uccide il drago Fafnir e si bagna nel suo sangue per diventare invulnerabile, tranne in un punto tra le spalle coperto da una foglia di tiglio. Conquista il magico tesoro dei Nibelunghi e l'anello d'oro."
    },
    {
      id: "char_crimilde",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Crimilde",
      image: "assets/images/tempio/crimilde_portrait.png",
      summary: "Sorella dei re burgundi e devota moglie di Sigfrido.",
      content: "Descrizione: Principessa burgunda, sorella del re Gunther e moglie di Sigfrido. Dopo l'assassinio del marito da parte di Hagen, consumata dal dolore e dal desiderio di vendetta, sposa il re degli Unni Etzel al fine di sterminare la propria famiglia durante un banchetto, portando al crollo del regno burgundo."
    },
    {
      id: "char_gunther",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Gunther",
      image: "assets/images/tempio/gunther_portrait.png",
      summary: "Re dei Burgundi a Worms e fratello di Crimilde.",
      content: "Descrizione: Re di Worms, capo dei Burgundi. Desidera sposare la regina Brunilde ma riesce a superare le sue prove di forza straordinaria solo grazie all'aiuto invisibile di Sigfrido (che indossa il mantello dell'invisibilità). Questo segreto scatenerà la tragedia finale."
    },
    {
      id: "char_gernot",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Gernot",
      image: "assets/images/tempio/gernot_portrait.png",
      summary: "Fratello di Gunther.",
      content: "Descrizione: Fratello di Gunther e di Crimilde. Nobile e onorevole guerriero burgundo, cerca inizialmente di mediare tra Sigfrido e Hagen. Muore combattendo valorosamente durante il massacro finale alla corte di Etzel."
    },
    {
      id: "char_giselher",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Giselher",
      image: "assets/images/tempio/giselher_portrait.png",
      summary: "Fratello minore di Gunther.",
      content: "Descrizione: Il più giovane dei fratelli regnanti burgundi. Estraneo al complotto per uccidere Sigfrido, rimane fedele a sua sorella Crimilde e cerca di proteggerla. Muore tragicamente nel massacro finale nel regno degli Unni."
    },
    {
      id: "char_brunilde",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Brunilde",
      image: "assets/images/tempio/brunilde_portrait.png",
      summary: "Regina guerriera dall'enorme forza.",
      content: "Descrizione: Sovrana d'Islanda e regina guerriera dalla forza semidivina. Giura di sposare solo chi riuscirà a superarla in tre prove di forza fisica. Ingannata da Sigfrido per conto di Gunther, scopre l'inganno scatenando la contesa con Crimilde e spingendo Hagen a uccidere Sigfrido per lavare l'offesa."
    },
    {
      id: "char_hagen",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Hagen",
      image: "assets/images/tempio/hagen_portrait.png",
      summary: "Fedele vassallo di Gunther e assassino di Sigfrido.",
      content: "Descrizione: Fiero e cupo guerriero, consigliere e fedele vassallo di re Gunther. Scopre il punto vulnerabile di Sigfrido da Crimilde e lo colpisce a tradimento durante una battuta di caccia. Per impedire che Crimilde usi il tesoro dei Nibelunghi per vendicarsi, lo getta nel fiume Reno."
    },
    {
      id: "char_etzel",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Etzel",
      image: "assets/images/tempio/etzel_portrait.png",
      summary: "Re degli Unni (corrisponde ad Attila).",
      content: "Descrizione: Re degli Unni, sposa in seconde nozze Crimilde dopo la morte di Sigfrido. Desideroso di mantenere la pace, ospita i Burgundi nel suo regno, ignaro del piano di vendetta della moglie che trasformerà il banchetto d'accoglienza in un bagno di sangue."
    },
    {
      id: "char_rudiger",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Rüdiger",
      image: "assets/images/tempio/rudiger_portrait.png",
      summary: "Nobile cavaliere amico sia di Crimilde sia dei Burgundi.",
      content: "Descrizione: Margravio di Bechelaren, cavaliere esemplare rinomato per la sua lealtà ed ospitalità. Amico fraterno dei Burgundi e fedele vassallo del re Etzel, si ritrova diviso in un tragico conflitto interiore di doveri quando scoppia la guerra tra le due fazioni, trovando la morte in duello."
    },
    {
      id: "char_alberico",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Alberico",
      image: "assets/images/tempio/alberico_portrait.png",
      summary: "Custode del tesoro dei Nibelunghi in alcune versioni della leggenda.",
      content: "Descrizione: Custode e difensore del tesoro dei Nibelunghi. Viene sconfitto in combattimento da Sigfrido, che gli sottrae il mantello dell'invisibilità (Tarnkappe) e lo costringe a giurargli fedeltà come amministratore della favolosa ricchezza sotterranea."
    },
    {
      id: "char_fafnir",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Drago Fafnir",
      image: "assets/images/tempio/fafnir_portrait.png",
      summary: "Drago ucciso da Sigfrido nelle versioni nordiche della leggenda.",
      content: "Descrizione: Nella saga nordica, Fafnir è originariamente un nano corrotto dall'avidità per l'anello maledetto di Andvari, trasformatosi in un drago spaventoso per proteggere il suo tesoro. Viene ucciso dal giovane Sigfrido, che gli trafigge il cuore da una fossa scavata lungo il suo sentiero."
    },
    {
      id: "char_nibelunghi",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Nibelunghi",
      image: "assets/images/tempio/nibelunghi_portrait.png",
      summary: "Antichi possessori del tesoro magico.",
      content: "Descrizione: Popolo di nani guidato dal re Nibelung, custodi di immani ricchezze scavate nelle viscere della terra. Il loro nome passa successivamente a identificare i possessori del tesoro (gli uomini di Sigfrido) e infine gli stessi Burgundi nel Canto dei Nibelunghi."
    },
    {
      id: "char_valchirie",
      category: "Schede Personaggio (Ciclo dei Nibelunghi)",
      title: "Valchirie",
      image: "assets/images/tempio/valchirie_portrait.png",
      summary: "Guerriere soprannaturali che scelgono gli eroi caduti.",
      content: "Descrizione: Guerriere soprannaturali alate che sorvolano i campi di battaglia per scegliere i guerrieri più valorosi destinati a morire. Li scortano nel Valhalla per prepararsi al Ragnarok. Brunilde è originariamente una di loro, condannata da Odino al sonno eterno su una roccia di fuoco prima di essere salvata da Sigfrido."
    },
    {
      id: "theme_eroe",
      category: "Schede Tematiche",
      title: "L'eroismo",
      summary: "L'EVOLUZIONE DEL CONCETTO DI EROE DAL MONDO GRECO AL MEDIOEVO IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  IL CONCETTO DI EROE SUBISCE UNA PROFONDA EVOLUZIONE NEL CORSO DEI SECOLI. NELL'ILIADE L'EROE CELEBRA LA <span style="color: #2563eb;">GLORIA INDIVIDUALE</span> E LA FORZA BRUTA SUL CAMPO DI BATTAGLIA. NELL'ODISSEA L'EROISMO SI TRASFORMA IN ASTUZIA E CAPACITÀ DI ADATTAMENTO PER SOPRAVVIVERE, RAPPRESENTATE DALLA <span style="color: #ea580c;">METIS</span> DI ULISSE. NELL'ENEIDE L'EROE DIVENTA IL DIFENSORE DEL BENE COMUNE E SI SOTTOMETTE AL DOVERE RELIGIOSO DELLA <span style="color: #16a34a;">PIETAS</span>. INFINE, NEL MEDIOEVO I CAVALIERI CAROLINGI COMBATTONO PER FEDE E IMPERO, MENTRE NEI CICLI BRETONI L'EROISMO DIVENTA RICERCA SPIRITUALE E AMORE CORTESE.
</div>`
    },
    {
      id: "theme_viaggio",
      category: "Schede Tematiche",
      title: "Il viaggio",
      summary: "IL VIAGGIO COME METAFORA DI CRESCITA E CONOSCENZA IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  IL VIAGGIO INCARNA LA METAFORA DELLA VITA ED IL PERCORSO DI CONOSCENZA ED EVOLUZIONE DELL'UOMO. IL VIAGGIO DI ULISSE NELL'ODISSEA È UN VIAGGIO DI RITORNO (<span style="color: #16a34a;">NOSTOS</span>), RIVOLTO AL PASSATO E ALLA RICONQUISTA DELLA PROPRIA IDENTITÀ. IL VIAGGIO DI ENEA NELL'ENEIDE È UN VIAGGIO DI RIFONDAZIONE RIVOLTO AL FUTURO, DESTINATO A COSTRUIRE UNA NUOVA PATRIA. NEI POEMI MEDIEVALI IL VIAGGIO DEVIENE LA RICERCA (<span style="color: #2563eb;">QUEST</span>) DI ELEMENTI SACRI O IL PERCORSO INIZIATICO DEI CAVALIERI ALLA RICERCA DELLA PUREZZA MORALE E DEL <span style="color: #ea580c;">SANTO GRAAL</span>.
</div>`
    },
    {
      id: "theme_famiglia",
      category: "Schede Tematiche",
      title: "La famiglia",
      summary: "IL RUOLO E IL VALORE DEI LEGAMI FAMILIARI NELL'EPICA ANTICA E MEDIEVALE IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  NEI POEMI EPICI I <span style="color: #2563eb;">LEGAMI FAMILIARI</span> COSTITUISCONO IL FONDAMENTO DELLA SOCIETÀ E DELL'ORDINE MORALE. NELL'ILIADE IL RAPPORTO TRA <span style="color: #ea580c;">ETTORE E ANDROMACA</span> RAPPRESENTA L'AFFETTO CONIUGALE E IL CONFLITTO TRA IL DOVERE VERSO LA PATRIA E LA PROTEZIONE DELLA FAMIGLIA. NELL'ODISSEA IL RITORNO A CASA (<span style="color: #16a34a;">NOSTOS</span>) DI ULISSE È SPINTO DALL'AMORE PER LA SPOSA PENELOPE E PER IL FIGLIO TELEMACO, SIMBOLO DI RICONGIUNGIMENTO DEL NUCLEO FAMILIARE. NELL'ENEIDE LA FAMIGLIA È LEGATA ALLA CONTINUITÀ DELLA STIRPE: ENEA CHE FUGGE DA TROIA PORTANDO SULLE SPALLE IL VECCHIO PADRE ANCHISE E TENENDO PER MANO IL FIGLIO ASCANIO INCARNA LA TRASMISSIONE DEI VALORI TRA LE GENERAZIONI.
</div>`
    },
    {
      id: "theme_morte",
      category: "Schede Tematiche",
      title: "La morte",
      summary: "IL DESTINO ULTIMO DEGLI EROI E IL SIGNIFICATO DEL PASSAGGIO ALL'ADE IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  LA <span style="color: #ea580c;">MORTE</span> NELL'EPICA CLASSICA È IL DESTINO INEVITABILE A CUI NESSUN MORTALE PUÒ SFUGGIRE, NEMMENO GLI EROI SEMIDEI COME ACHILLE. NELL'ILIADE LA MORTE IN BATTAGLIA È L'UNICO MODO PER CONSEGUIRE LA <span style="color: #2563eb;">GLORIA ETERNA</span> (KLEOS), CAPACE DI SOPRAVVIVERE ALLA MEMORIA UMANA. LA DISCESA AGLI INFERI (<span style="color: #16a34a;">KATABASI</span>) DI ULISSE NELL'ODISSEA E DI ENEA NELL'ENEIDE RAPPRESENTA IL CONTATTO CON IL MONDO DELLE OMBRE PER RICEVERE PROFEZIE SUL FUTURO. NEL MEDIOEVO CRISTIANO, LA MORTE DI ROLANDO DIVENTA UN ATTO DI SACRIFICIO ED OFFERTA RELIGIOSA A DIO.
</div>`
    },
    {
      id: "theme_pietas",
      category: "Schede Tematiche",
      title: "La pietas",
      summary: "IL SENSO DEL DOVERE E DEL RISPETTO VERSO GLI DEI E LA PATRIA IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  LA <span style="color: #2563eb;">PIETAS</span> È LA VIRTÙ CARDINE DELL'EROE VIRGILIANO ENEA, CHE SIGNIFICA DEVOZIONE, SENSO DEL DOVERE E RISPETTO RELIGIOSO VERSO GLI <span style="color: #ea580c;">DEI</span>, LA PATRIA E LA FAMIGLIA. A DIFFERENZA DELL'INDIVIDUALISMO DEGLI EROI GRECI, LA PIETAS IMPONE IL SACRIFICIO DEI DESIDERI PERSONALI IN NOME DI UN PROGETTO COLLETTIVO PIÙ GRANDE, COME LA FONDAZIONE DI <span style="color: #16a34a;">ROMA</span>. ANCHE NELL'ILIADE IL COMPORTAMENTO DI ACHILLE CHE RESTITUISCE IL CORPO DI ETTORE AL VECCHIO PRIAMO RAPPRESENTA UN MOMENTO DI COMPASSIONE E PIETÀ UNIVERSALE.
</div>`
    },
    {
      id: "theme_guerra",
      category: "Schede Tematiche",
      title: "L'arte della guerra",
      summary: "LA RAPPRESENTAZIONE DEI COMBATTIMENTI E DEL VALORE SUL CAMPO DI BATTAGLIA IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  LA <span style="color: #ea580c;">GUERRA</span> È LA CORNICE NARRATIVA PRINCIPALE DI GRANDI POEMI COME L'ILIADE E L'ENEIDE. ESSA VIENE RAPPRESENTATA SIA NELLA SUA DIMENSIONE EROICA E DI GLORIA, SIA NELLE SUE CONSEGUENZE TRAGICHE E DOLOROSE PER I VINTI. IL VALORE MILITARE (<span style="color: #2563eb;">ARISTEIA</span>) DEL SINGOLO GUERRIERO SI COMPLETA CON IL RISPETTO DI CODICI DI COMPORTAMENTO PRECISI, COME IL DUELLO INDIVIDUALE E LE SOLENNI ESEQUIE DEI CADUTI. NEL CICLO CAROLINGIO LA GUERRA SI TRASFORMA IN UNA <span style="color: #16a34a;">CROCIATA SANTA</span> TRA CRISTIANI E SARACENI.
</div>`
    },
    {
      id: "theme_pace",
      category: "Schede Tematiche",
      title: "La pace",
      summary: "LA RICERCA DELL'ORDINE, DELLA CONCORDIA E DELLA FINE DEI CONFLITTI IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  NEI POEMI EPICI LA <span style="color: #16a34a;">PACE</span> È IL FINE ULTIMO A CUI ASPIRANO GLI UOMINI DOPO LUNGHI ANNI DI SOFFERENZE E CONFLITTI. NELL'ENEIDE LA PACE RAPPRESENTA LA COESIONE TRA IL POPOLO TROIANO E I LATINI ATTRAVERSO IL MATRIMONIO DI ENEA E LAVINIA, CHE DIEDE VITA ALL'UNIONE CHE PORTERÀ ALLA PACE AUGUSTEA. LA FINE DEGLI SCONTRI PORTA ALL'IMPOSTAZIONE DI NUOVE <span style="color: #2563eb;">LEGGI</span>, CITTÀ E PROSPERITÀ. NELL'ODISSEA LA PACE È IL RIPRISTINO DELL'ORDINE A ITACA DOPO LA CACCIATA DEI PROCI, GARANTITO DALL'INTERVENTO PACIFICATORE DI <span style="color: #ea580c;">ATENA</span>.
</div>`
    },
    {
      id: "ref_mitologia_epica",
      category: "L'inizio del viaggio",
      title: "Mitologia, leggenda ed epica",
      image: "assets/images/pergamena_crest.png",
      summary: "I CONCETTI E LE DEFINIZIONI DI BASE DEL GENERE EPICO E DELLE ORIGINI NARRATIVE IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  <p style="margin-bottom: 20px; border-left: 4px solid #2563eb; padding-left: 10px;">
    <span style="color: #2563eb; font-size: 1.1rem;">MITOLOGIA:</span> INSIEME DI RACCONTI TRAMANDATI IN VIA <span style="color: #ea580c;">ORALE</span> E POI SCRITTI CHE SPIEGANO L'ORIGINE DI ALCUNI EVENTI NATURALI E STORICI ATTRAVERSO L'IMMAGINAZIONE E ASSUNTI COME DATI DI FATTO E SACRI PER UNA COMUNITÀ.
  </p>
  <p style="margin-bottom: 20px; border-left: 4px solid #16a34a; padding-left: 10px;">
    <span style="color: #16a34a; font-size: 1.1rem;">LEGGENDA:</span> TESTI NARRATIVI CHE RIELABORANO ELEMENTI DI <span style="color: #ea580c;">FANTASIA</span> CON QUELLI DELLA <span style="color: #16a34a;">REALTÀ</span>. SONO TRAMANDATI ORALMENTE E IL LORO SCOPO È SPIEGARE LE ORIGINI DI MISTERI, FENOMENI O PERSONAGGI E RAFFORZARE LA COESIONE DI UN POPOLO.
  </p>
  <p style="border-left: 4px solid #2563eb; padding-left: 10px;">
    <span style="color: #2563eb; font-size: 1.1rem;">EPICA:</span> COMPONIMENTI IN POESIA (<span style="color: #ea580c;">RACCONTI IN VERSI</span>) CHE CELEBRANO LE GESTA E LE IMPRESE DEGLI EROI, FAVORITE O OSTEGGIATE DALL'INFLUENZA DEGLI DEI. LE STORIE VENIVANO CANTATE NELLE CORTI DA UN <span style="color: #16a34a;">AEDO</span> E MANDATE A MEMORIA.
  </p>
</div>`
    },
    {
      id: "ref_leggenda",
      category: "L'inizio del viaggio",
      title: "La leggenda",
      image: "assets/images/pergamena_crest.png",
      summary: "Cos'è la leggenda? Come si distingue dal mito?",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937;">
  <div style="background: linear-gradient(135deg, #16a34a22, #2563eb11); border: 2px solid #16a34a; border-radius: 10px; padding: 18px; margin-bottom: 20px; text-align: center;">
    <div style="font-size: 1.6rem; margin-bottom: 6px;">📜</div>
    <div style="font-size: 0.85rem; color: #78350f; margin-top: 6px;">Dal latino <em>legenda</em> = ciò che deve essere letto / tramandato</div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: start; margin-bottom: 20px;">
    <div style="background: rgba(37,99,235,0.07); border: 1.5px solid #2563eb; padding: 14px; border-radius: 8px;">
      <div style="color: #2563eb; font-size: 0.9rem; margin-bottom: 8px; text-align: center;">📖 DEFINIZIONE</div>
      <div style="color: #1f2937; font-size: 0.85rem; line-height: 1.6;">Testi narrativi che rielaborano elementi di <span style="color:#2563eb;">fantasia</span> con quelli della <span style="color:#ea580c;">realtà</span>, tramandati oralmente.</div>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; padding: 0 8px;">
      <div style="font-size: 1.4rem; color: #f59e0b;">⚔️</div>
    </div>
    <div style="background: rgba(22,163,74,0.07); border: 1.5px solid #16a34a; padding: 14px; border-radius: 8px;">
      <div style="color: #16a34a; font-size: 0.9rem; margin-bottom: 8px; text-align: center;">🎯 SCOPO</div>
      <div style="color: #1f2937; font-size: 0.85rem; line-height: 1.6;">Spiegare origini di misteri o fenomeni, tenere unita una comunità, ma <span style="color:#ea580c;">non verificabile</span>.</div>
    </div>
  </div>
  <div style="background: rgba(245,158,11,0.08); border: 1.5px solid #f59e0b; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <div style="color: #78350f; font-size: 0.95rem; margin-bottom: 10px; font-weight: bold; text-align: center;">⚖️ MITO VS LEGGENDA</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.85rem;">
      <div style="background: rgba(37,99,235,0.1); padding: 10px; border-radius: 6px;">
        <div style="color: #2563eb; margin-bottom: 6px;">MITO</div>
        <div>• Personaggi divini</div>
        <div>• Tempo primordiale</div>
        <div>• Ritenuto sacro e vero</div>
        <div>• Spiega fenomeni cosmici</div>
      </div>
      <div style="background: rgba(22,163,74,0.1); padding: 10px; border-radius: 6px;">
        <div style="color: #16a34a; margin-bottom: 6px;">LEGGENDA</div>
        <div>• Personaggi eroici umani</div>
        <div>• Passato storico</div>
        <div>• Spesso dubitata</div>
        <div>• Spiega origini locali</div>
      </div>
    </div>
  </div>
  <div style="background: rgba(239,68,68,0.06); border-left: 4px solid #ef4444; padding: 14px; border-radius: 6px;">
    <div style="color: #dc2626; font-size: 0.9rem; margin-bottom: 8px;">🏰 ESEMPI DI LEGGENDE</div>
    <div style="font-size: 0.85rem; color: #1f2937; line-height: 1.7;">
      • <span style="color:#2563eb;">Re Artù</span> e la Tavola Rotonda → re realmente esistito o figura leggendaria?<br>
      • <span style="color:#2563eb;">Romolo e Remo</span> → leggenda sulla fondazione di Roma<br>
      • <span style="color:#2563eb;">Rolando a Roncisvalle</span> → evento storico del 778 d.C. trasformato in leggenda
    </div>
  </div>
</div>`
    },
    {
      id: "ref_mito",
      category: "L'inizio del viaggio",
      title: "Il mito",
      image: "assets/images/pergamena_crest.png",
      summary: "Cos'è il mito? Caratteristiche, funzioni e differenze con la leggenda.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937;">
  <div style="background: linear-gradient(135deg, #f59e0b22, #ea580c11); border: 2px solid #f59e0b; border-radius: 10px; padding: 18px; margin-bottom: 20px; text-align: center;">
    <div style="font-size: 1.6rem; margin-bottom: 6px;">⚡</div>
    <div style="font-size: 0.85rem; color: #78350f; margin-top: 6px;">Dal greco <em>mythos</em> = racconto, favola</div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
    <div style="background: rgba(37,99,235,0.07); border-left: 4px solid #2563eb; padding: 14px; border-radius: 6px;">
      <div style="color: #2563eb; font-size: 0.9rem; margin-bottom: 8px;">📖 DEFINIZIONE</div>
      <div style="color: #1f2937; font-size: 0.88rem; line-height: 1.6;">Racconto tramandato oralmente e scritto che spiega l'origine di eventi naturali e storici <span style="color:#ea580c;">attraverso l'immaginazione</span> e assunto come dato di fatto.</div>
    </div>
    <div style="background: rgba(22,163,74,0.07); border-left: 4px solid #16a34a; padding: 14px; border-radius: 6px;">
      <div style="color: #16a34a; font-size: 0.9rem; margin-bottom: 8px;">🎯 FUNZIONE</div>
      <div style="color: #1f2937; font-size: 0.88rem; line-height: 1.6;">Spiegare i misteri del mondo (fenomeni atmosferici, nascita di riti) e <span style="color:#16a34a;">unificare la comunità</span> attorno a credenze comuni.</div>
    </div>
  </div>
  <div style="background: rgba(245,158,11,0.05); border: 1.5px solid #f59e0b; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
    <div style="color: #78350f; font-size: 0.95rem; margin-bottom: 10px; font-weight: bold; display: flex; align-items: center; gap: 8px;">🏛️ CARATTERISTICHE DEL MITO</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.88rem; line-height: 1.6; color: #1f2937;">
      <div>🔸 Protagonisti: <span style="color:#2563eb;">dèi, eroi e mostri</span></div>
      <div>🔸 Tempo: <span style="color:#ea580c;">lontano e indeterminato</span></div>
      <div>🔸 Trasmissione <span style="color:#2563eb;">orale</span> poi scritta</div>
      <div>🔸 Creduto <span style="color:#ea580c;">vero</span> dalla comunità</div>
      <div>🔸 Spiegazione di fenomeni <span style="color:#16a34a;">naturali</span></div>
    </div>
  </div>
  <div style="background: rgba(239,68,68,0.06); border-left: 4px solid #ef4444; padding: 14px; border-radius: 6px;">
    <div style="color: #dc2626; font-size: 0.9rem; margin-bottom: 8px;">⚡ ESEMPI FAMOSI</div>
    <div style="font-size: 0.85rem; color: #1f2937; line-height: 1.7;">
      • <span style="color:#2563eb;">Prometeo</span> che ruba il fuoco → spiega come gli uomini ottennero il fuoco<br>
      • <span style="color:#2563eb;">Demetra e Persefone</span> → spiega il ciclo delle stagioni<br>
      • <span style="color:#2563eb;">Zeus</span> che scaglia fulmini → spiega i temporali
    </div>
  </div>
</div>`
    },
    {
      id: "ref_classica",
      category: "L'inizio del viaggio",
      title: "Epica classica",
      image: "assets/images/pergamena_crest.png",
      summary: "OPERE GRECHE E OPERE LATINE A CONFRONTO IN MAIUSCOLO.",
      content: `<div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 20px; align-items: center; text-align: center; font-weight: bold; font-size: 0.95rem; margin-top: 15px;">
  <div>
    <div style="background-color: #f59e0b; color: #fff; padding: 6px 12px; display: inline-block; margin-bottom: 15px; border-radius: 4px;">OPERE GRECHE</div>
    <div style="color: #2563eb; font-size: 1.15rem; margin-bottom: 12px;">ILIADE E ODISSEA</div>
    <div style="margin-bottom: 12px; color: #1f2937; line-height: 1.4;">SCRITTE DA OMERO<br>(AUTORE FITTIZIO)</div>
    <div style="color: #ea580c; font-size: 0.85rem; line-height: 1.4;">(LUNGA TRADIZIONE ORALE E SOLO DOPO SONO STATE SCRITTE)</div>
  </div>
  <div style="display: flex; justify-content: center; align-items: center; padding: 0 10px;">
    <svg width="60" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22,22 C26,22 34,55 38,72 C41,85 45,72 50,52 C55,32 62,20 65,18 C62,22 55,50 48,68 C42,82 39,88 36,88 C32,88 28,70 24,48 C20,30 20,22 22,22 Z" fill="#1f2937"/><path d="M78,35 C82,28 75,20 66,23 C55,27 60,45 65,50 C72,56 78,60 76,72 C74,82 62,88 52,82 C46,78 43,73 44,69 C46,73 52,76 57,76 C65,76 69,69 67,64 C65,58 56,54 50,47 C44,38 50,29 58,25 C65,22 72,25 78,35 Z" fill="#1f2937"/></svg>
  </div>
  <div>
    <div style="background-color: #f59e0b; color: #fff; padding: 6px 12px; display: inline-block; margin-bottom: 15px; border-radius: 4px;">OPERE LATINE</div>
    <div style="color: #2563eb; font-size: 1.15rem; margin-bottom: 12px;">ENEIDE</div>
    <div style="margin-bottom: 12px; color: #1f2937; line-height: 1.4;">SCRITTA DA VIRGILIO</div>
    <div style="color: #ea580c; font-size: 0.85rem; line-height: 1.4;">(HA AVUTO SOLO UNA TRADIZIONE SCRITTA PERCHÉ È STATA SCRITTA PROPRIO DA LUI)</div>
  </div>
</div>`
    },
    {
      id: "ref_medievale",
      category: "L'inizio del viaggio",
      title: "Epica medievale",
      image: "assets/images/pergamena_crest.png",
      summary: "SACRO ROMANO IMPERO VS INGHILTERRA MEDIEVALE IN MAIUSCOLO.",
      content: `<div style="display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 15px; align-items: center; text-align: center; font-weight: bold; font-size: 0.95rem; margin-top: 15px;">
  <div>
    <div style="background-color: #f59e0b; color: #fff; padding: 6px 12px; display: inline-block; margin-bottom: 15px; border-radius: 4px;">CAVALIERI DI CARLO MAGNO</div>
    <div style="color: #2563eb; font-size: 1.15rem; margin-bottom: 12px;">SACRO ROMANO IMPERO</div>
    <div style="margin-bottom: 12px; color: #1f2937; line-height: 1.4;">LOTTANO CONTRO I MUSULMANI PER LIBERARE GERUSALEMME</div>
    <div style="color: #ea580c; font-size: 0.85rem; line-height: 1.4;">(LUNGA TRADIZIONE ORALE PERCHÉ NON AVEVANO UN AUTORE SCRITTO)</div>
  </div>
  <div style="display: flex; justify-content: center; align-items: center;">
    <svg width="40" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22,22 C26,22 34,55 38,72 C41,85 45,72 50,52 C55,32 62,20 65,18 C62,22 55,50 48,68 C42,82 39,88 36,88 C32,88 28,70 24,48 C20,30 20,22 22,22 Z" fill="#1f2937"/><path d="M78,35 C82,28 75,20 66,23 C55,27 60,45 65,50 C72,56 78,60 76,72 C74,82 62,88 52,82 C46,78 43,73 44,69 C46,73 52,76 57,76 C65,76 69,69 67,64 C65,58 56,54 50,47 C44,38 50,29 58,25 C65,22 72,25 78,35 Z" fill="#1f2937"/></svg>
  </div>
  <div>
    <div style="background-color: #f59e0b; color: #fff; padding: 6px 12px; display: inline-block; margin-bottom: 15px; border-radius: 4px;">CAVALIERI DI RE ARTÙ</div>
    <div style="color: #2563eb; font-size: 1.15rem; margin-bottom: 12px;">INGHILTERRA MEDIEVALE</div>
    <div style="margin-bottom: 12px; color: #1f2937; line-height: 1.4;">SIEDONO ALLA TAVOLA ROTONDA E CERCANO IL SACRO GRAAL</div>
    <div style="color: #ea580c; font-size: 0.85rem; line-height: 1.4;">(ERANO RACCONTI POPOLARI E LEGGENDE DI TRADIZIONE ORALE)</div>
  </div>
  <div style="display: flex; justify-content: center; align-items: center;">
    <svg width="40" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22,22 C26,22 34,55 38,72 C41,85 45,72 50,52 C55,32 62,20 65,18 C62,22 55,50 48,68 C42,82 39,88 36,88 C32,88 28,70 24,48 C20,30 20,22 22,22 Z" fill="#1f2937"/><path d="M78,35 C82,28 75,20 66,23 C55,27 60,45 65,50 C72,56 78,60 76,72 C74,82 62,88 52,82 C46,78 43,73 44,69 C46,73 52,76 57,76 C65,76 69,69 67,64 C65,58 56,54 50,47 C44,38 50,29 58,25 C65,22 72,25 78,35 Z" fill="#1f2937"/></svg>
  </div>
  <div>
    <div style="background-color: #f59e0b; color: #fff; padding: 6px 12px; display: inline-block; margin-bottom: 15px; border-radius: 4px;">EROI DI SIGFRIDO</div>
    <div style="color: #2563eb; font-size: 1.15rem; margin-bottom: 12px;">CICLO DEI NIBELUNGHI</div>
    <div style="margin-bottom: 12px; color: #1f2937; line-height: 1.4;">COMBATTONO CONTRO DRAGHI E DIVINITÀ PER UN TESORO MALEDETTO</div>
    <div style="color: #ea580c; font-size: 0.85rem; line-height: 1.4;">(SAGHE NORDICHE E GERMANICHE TRAMANDATE DA POETI E SCALDI)</div>
  </div>
</div>`
    },
    {
      id: "ref_gesta",
      category: "L'inizio del viaggio",
      title: "Le canzoni di gesta",
      image: "assets/images/pergamena_crest.png",
      summary: "IL CICLO CAROLINGIO, IL CICLO BRETONE E IL CICLO DEI NIBELUNGHI IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; text-align: center; margin-top: 15px;">
    <div style="background: rgba(37,99,235,0.04); border: 1.5px solid rgba(37,99,235,0.2); border-radius: 8px; padding: 14px;">
      <div style="background-color: #2563eb; color: #fff; padding: 4px 8px; display: inline-block; margin-bottom: 12px; border-radius: 4px; font-size: 0.82rem;">CICLO CAROLINGIO</div>
      <div style="color: #2563eb; font-size: 1rem; margin-bottom: 8px;">CARLO MAGNO E I PALADINI</div>
      <div style="font-size: 0.82rem; line-height: 1.5; color: #1f2937; margin-bottom: 8px;">LOTTANO CONTRO I SARACENI PER DIFENDERE LA FEDE CRISTIANA.</div>
      <div style="color: #ea580c; font-size: 0.76rem; line-height: 1.4;">L'EROE PRINCIPALE È <span style="color:#ea580c;">ORLANDO</span>, PRODE E LEALE NIPOTE DELL'IMPERATORE.</div>
    </div>
    
    <div style="background: rgba(139,92,246,0.04); border: 1.5px solid rgba(139,92,246,0.2); border-radius: 8px; padding: 14px;">
      <div style="background-color: #7c3aed; color: #fff; padding: 4px 8px; display: inline-block; margin-bottom: 12px; border-radius: 4px; font-size: 0.82rem;">CICLO BRETONE</div>
      <div style="color: #7c3aed; font-size: 1rem; margin-bottom: 8px;">RE ARTÙ E LA TAVOLA ROTONDA</div>
      <div style="font-size: 0.82rem; line-height: 1.5; color: #1f2937; margin-bottom: 8px;">RICERCA SPIRITUALE DEL SANTO GRAAL E STORIE D'AMORE CORTESE.</div>
      <div style="color: #ea580c; font-size: 0.76rem; line-height: 1.4;">RE ARTÙ, GINEVRA, <span style="color:#ea580c;">LANCILLOTTO</span> E GLI INCANTESIMI DI MERLINO.</div>
    </div>

    <div style="background: rgba(22,163,74,0.04); border: 1.5px solid rgba(22,163,74,0.2); border-radius: 8px; padding: 14px;">
      <div style="background-color: #16a34a; color: #fff; padding: 4px 8px; display: inline-block; margin-bottom: 12px; border-radius: 4px; font-size: 0.82rem;">CICLO DEI NIBELUNGHI</div>
      <div style="color: #16a34a; font-size: 1rem; margin-bottom: 8px;">SAGHE NORDICHE E GERMANICHE</div>
      <div style="font-size: 0.82rem; line-height: 1.5; color: #1f2937; margin-bottom: 8px;">LEGGENDE DI DRAGHI, TESORI MALEDETTI E DIVINITÀ DI ASGARD.</div>
      <div style="color: #ea580c; font-size: 0.76rem; line-height: 1.4;">L'EROE PRINCIPALE È <span style="color:#ea580c;">SIGFRIDO</span> CHE UCCIDE IL DRAGO FAFNYR.</div>
    </div>
  </div>
</div>`
    },
    {
      id: "ref_linguaggio",
      category: "L'inizio del viaggio",
      title: "Linguaggio e tecniche dell'epica",
      image: "assets/images/pergamena_crest.png",
      summary: "LE TECNICHE RETORICHE E DI STRUTTURA DEI GRANDI POEMI IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">

  <p style="margin-bottom: 15px;">
    ALCUNE TECNICHE PERMETTEVANO ALL'AEDO DI MEMORIZZARE LA STORIA.
  </p>

  <p style="margin-bottom: 15px; border-left: 4px solid #16a34a; padding-left: 10px;">
    <span style="color: #16a34a; font-size: 1.05rem;">EPITETI:</span> AGGETTIVI O ESPRESSIONI FISSE RIPETUTE E RIFERITE A PERSONAGGI PER MEGLIO IDENTIFICARLI; INDICANO SPESSO UNA QUALITÀ DELLO STESSO. ES.: ACHILLE <span style="color: #ea580c;">"PIÈ VELOCE"</span>; ANDROMACA <span style="color: #ea580c;">"BRACCIO BIANCO"</span>; MARE <span style="color: #ea580c;">"COLOR DEL VINO"</span>.
  </p>

  <p style="margin-bottom: 15px; border-left: 4px solid #16a34a; padding-left: 10px;">
    <span style="color: #16a34a; font-size: 1.05rem;">FORME FISSE RICORRENTI:</span> FORMULE STEREOTIPATE RIPETUTE IN SITUAZIONI SIMILI. ES.: L'ARRIVO DI UN NUOVO GIORNO: <span style="color: #ea580c;">"MA QUANDO LA FIGLIA DI LUCE BRILLÒ LE DITA ROSATE"</span>; LA MORTE DI UN GUERRIERO: <span style="color: #ea580c;">"E SUGLI OCCHI BUI LA NOTTE L'AVVOLSE"</span> O <span style="color: #ea580c;">"SCESE NELL'ADE"</span>.
  </p>

  <p style="margin-bottom: 15px; border-left: 4px solid #16a34a; padding-left: 10px;">
    <span style="color: #16a34a; font-size: 1.05rem;">PATRONIMICI:</span> I NOMI DEI PERSONAGGI SOSTITUITI O ACCOMPAGNATI DAL NOME DEL PADRE TRASFORMATO IN AGGETTIVO CON IL SUFFISSO -IDE. ES.: ACHILLE <span style="color: #ea580c;">"PELIDE"</span> (FIGLIO DI PELEO); AGAMENNONE <span style="color: #ea580c;">"ATRIDE"</span> (FIGLIO DI ATREO); ULISSE <span style="color: #ea580c;">"LAERZIADE"</span> (FIGLIO DI LAERTE).
  </p>

  <p style="margin-bottom: 15px; border-left: 4px solid #16a34a; padding-left: 10px;">
    <span style="color: #16a34a; font-size: 1.05rem;">SIMILITUDINE:</span> LA SIMILITUDINE È UNA <span style="color: #2563eb;">FIGURA RETORICA</span> DI SIGNIFICATO. È UN PARAGONE FRA COSE, PERSONE E SITUAZIONI CHE HANNO ELEMENTI IN COMUNE. È INTRODOTTA DA ESPRESSIONI COME: "COME... COSÌ"; "TAL... QUALE"; "SIMILMENTE"; "SEMBRA...". ES. <span style="color: #2563eb;">LUCIO È ASTUTO COME UNA VOLPE</span>; <span style="color: #2563eb;">CARLA È COSÌ VELOCE CHE SEMBRA UNA GAZZELLA</span>.
  </p>

  <p style="margin-bottom: 15px; border-left: 4px solid #16a34a; padding-left: 10px;">
    <span style="color: #16a34a; font-size: 1.05rem;">METAFORA:</span> LA METAFORA È UNA <span style="color: #2563eb;">FIGURA RETORICA</span> DI SIGNIFICATO. CONSISTE NELLA SOSTITUZIONE DI UNA PAROLA CON UN'ALTRA LEGATA ALLA PRIMA DA UN RAPPORTO DI SOMIGLIANZA. SI PUÒ DEFINIRE COME UNA SIMILITUDINE ABBREVIATA IN CUI SONO SCOMPARSI I TERMINI DI PARAGONE (COME, SEMBRA, PARE...). ES. <span style="color: #2563eb;">IL MARE È UN GIARDINO FIORITO</span>; <span style="color: #2563eb;">LUCA È UN LEONE</span>.
  </p>

  <p style="margin-bottom: 15px; border-left: 4px solid #16a34a; padding-left: 10px;">
    <span style="color: #16a34a; font-size: 1.05rem;">SINEDDOCHE:</span> LA SINEDDOCHE È UNA <span style="color: #2563eb;">FIGURA RETORICA</span> DI SIGNIFICATO. CONSISTE NEL DEFINIRE UN CONCETTO SERVENDOSI DI UN TERMINE IN RELAZIONE. PUÒ INDICARE UNA PARTE DI UN TUTTO, UN SINGOLARE PER UN PLURALE, UN GENERE PER UNA SPECIE, UNA MATERIA PER UN OGGETTO. ES. <span style="color: #2563eb;">È STATO TRAFITTO DAL BRONZO</span>; <span style="color: #2563eb;">SOTTO LO STESSO TETTO</span>.
  </p>
</div>`
    },
    { id: "char_menelao", category: "Schede Personaggio (Iliade)", title: "Menelao", image: "assets/images/tempio/menelao_portrait.png", summary: "Re di Sparta e sposo di Elena.", content: "Descrizione: Re di Sparta e fratello di Agamennone. Sposo di Elena, il cui rapimento da parte di Paride scatena la guerra di Troia. Combatte con ardore nel conflitto per vendicare l'onore offeso." },
    { id: "char_aiace", category: "Schede Personaggio (Iliade)", title: "Aiace Telamonio", image: "assets/images/tempio/aiace_portrait.png", summary: "Imponente e indomito guerriero acheo.", content: "Descrizione: Re di Salamina, secondo solo ad Achille per valore militare e forza fisica. Famoso per il suo gigantesco scudo di bronzo e pelli di bue con cui difende strenuamente le navi dei Greci." },
    { id: "char_nestore", category: "Schede Personaggio (Iliade)", title: "Nestore", image: "assets/images/tempio/nestore_portrait.png", summary: "Il più anziano e saggio dei sovrani greci.", content: "Descrizione: Re di Pilo, celebre per la sua incredibile longevità ed eloquenza. Rispettato da tutti i condottieri achei come consigliere fidato, interviene spesso per placare le liti, come quella tra Achille e Agamennone." },
    { id: "char_ecuba", category: "Schede Personaggio (Iliade)", title: "Ecuba", image: "assets/images/tempio/ecuba_portrait.png", summary: "Regina di Troia e sposa del re Priamo.", content: "Descrizione: Regina di Troia, madre di Ettore, Paride e Cassandra. Simbolo eterno della sofferenza materna, assiste al massacro dei suoi figli e alla distruzione della sua patria ad opera degli Achei." },
    { id: "char_andromaca", category: "Schede Personaggio (Iliade)", title: "Andromaca", image: "assets/images/tempio/andromaca_portrait.png", summary: "Sposa fedele dell'eroe troiano Ettore.", content: "Descrizione: Moglie di Ettore e madre di Astianatte. Incarna la dedizione familiare e il dramma delle spose di guerra. Famosa per la commovente scena alle porte Scee, in cui prega il marito di non scendere in battaglia." },
    { id: "char_nausicaa", category: "Schede Personaggio (Odissea)", title: "Nausicaa", image: "assets/images/tempio/nausicaa_portrait.png", summary: "La principessa dei Feaci che accoglie Ulisse.", content: "Descrizione: Giovane e nobile figlia di Alcinoo, re dei Feaci. Trova Ulisse naufrago e stremato sulla riva del mare e, dimostrando grande virtù e ospitalità, lo guida alla reggia dove l'eroe riceve soccorso e navi." },
    { id: "char_calipso", category: "Schede Personaggio (Odissea)", title: "Calipso", image: "assets/images/tempio/calipso_portrait.png", summary: "La ninfa marina innamorata di Ulisse.", content: "Descrizione: Splendida ninfa che regna sulla solitaria isola di Ogigia. Accoglie Ulisse dopo il naufragio e lo trattiene per sette anni, offrendogli l'immortalità pur di averlo come sposo, prima di cedere al volere degli dei." },
    { id: "char_scilla", category: "Schede Personaggio (Odissea)", title: "Scilla", image: "assets/images/tempio/scilla_portrait.png", summary: "Mostro marino a sei teste dello stretto di Messina.", content: "Descrizione: Terribile mostro marino con sei teste canine e dodici piedi, nascosto in una grotta dello stretto. Divora sei compagni di Ulisse mentre la nave tenta di evitare l'adiacente Gorgo di Cariddi." },
    { id: "char_cariddi", category: "Schede Personaggio (Odissea)", title: "Cariddi", image: "assets/images/tempio/cariddi_portrait.png", summary: "Il gorgo marino distruttore dello stretto.", content: "Descrizione: Mostruosa creatura marina situata di fronte a Scilla. Tre volte al giorno inghiotte l'acqua di mare risputandola con violenza, creando gorghi letali in grado di inghiottire intere navi." },
    { id: "char_anchise", category: "Schede Personaggio (Eneide)", title: "Anchise", image: "assets/images/tempio/anchise_portrait.png", summary: "Padre di Enea e custode della tradizione troiana.", content: "Descrizione: Principe troiano amato dalla dea Venere. Enea lo porta sulle spalle fuori da Troia in fiamme. Muore durante il viaggio, ma la sua anima incontra Enea negli Inferi rivelandogli la futura grandezza di Roma." },
    { id: "char_ascanio", category: "Schede Personaggio (Eneide)", title: "Ascanio (Iulo)", image: "assets/images/tempio/ascanio_portrait.png", summary: "Giovane figlio di Enea e Creusa.", content: "Descrizione: Figlio di Enea, capostipite della dinastia Iulia (da cui deriverà Giulio Cesare). Fugge da Troia con il padre e rappresenta il futuro e la continuazione della stirpe troiana in terra italica." },
    { id: "char_lavinia", category: "Schede Personaggio (Eneide)", title: "Lavinia", image: "assets/images/tempio/lavinia_portrait.png", summary: "Principessa italica e sposa designata di Enea.", content: "Descrizione: Figlia del re Latino. La sua unione con Enea, profetizzata dagli dei per dare inizio alla stirpe romana, scatena la gelosia di Turno e la successiva sanguinosa guerra nel Lazio." },
    { id: "char_latino", category: "Schede Personaggio (Eneide)", title: "Re Latino", image: "assets/images/tempio/latino_portrait.png", summary: "Sovrano del Lazio che accoglie i Troiani.", content: "Descrizione: Re dei Latini, saggio ed accogliente. Riconosce in Enea lo sposo straniero voluto dal destino per la figlia Lavinia e cerca di evitare la guerra, pur venendo travolto dagli eventi." },
    { id: "char_carlo", category: "Schede Personaggio (Ciclo Carolingio)", title: "Carlo Magno", image: "assets/images/tempio/carlo_portrait.png", summary: "Imperatore dei Franchi e difensore della cristianità.", content: "Descrizione: Re dei Franchi e imperatore. Nella Chanson de Roland è una figura di maestosa autorevolezza e profonda fede, che guida i suoi paladini e riceve messaggi e aiuti direttamente dagli angeli." },
    { id: "char_oliviero", category: "Schede Personaggio (Ciclo Carolingio)", title: "Oliviero", image: "assets/images/tempio/oliviero_portrait.png", summary: "Saggio paladino e intimo amico di Orlando.", content: "Descrizione: Uno dei dodici paladini di Carlo Magno, rinomato per la sua saggezza e moderazione che fanno da contrappeso al temperamento impetuoso dell'amico fraterno Orlando. Muore valorosamente a Roncisvalle." },
    { id: "char_turpino", category: "Schede Personaggio (Ciclo Carolingio)", title: "Arcivescovo Turpino", image: "assets/images/tempio/turpino_portrait.png", summary: "L'arcivescovo guerriero di Carlo Magno.", content: "Descrizione: Arcivescovo di Reims. Esempio di fede e valore militare, combatte strenuamente a Roncisvalle a fianco di Orlando, benedicendo i soldati e assolvendoli in punto di morte prima di cadere a sua volta." },
    { id: "char_gano", category: "Schede Personaggio (Ciclo Carolingio)", title: "Gano di Maganza", image: "assets/images/tempio/gano_portrait.png", summary: "Il paladino traditore patrigno di Orlando.", content: "Descrizione: Cognato di Carlo Magno e patrigno di Orlando. Roso dal rancore e dalla gelosia verso Orlando, si accorda con il re saraceno Marsilio per far attaccare la retroguardia a Roncisvalle, compiendo il grande tradimento." },
    { id: "char_angelica", category: "Schede Personaggio (Ciclo Carolingio)", title: "Angelica", image: "assets/images/tempio/angelica_portrait.png", summary: "Principessa del Catai di straordinaria bellezza.", content: "Descrizione: Bellissima principessa asiatica. Con il suo fascino irresistibile e l'anello dell'invisibilità, semina la discordia tra i cavalieri franchi e saraceni, portando Orlando alla follia d'amore prima di sposare Medoro." },
    { id: "char_bradamante", category: "Schede Personaggio (Ciclo Carolingio)", title: "Bradamante", image: "assets/images/tempio/bradamante_portrait.png", summary: "Valorosa guerriera sorella di Rinaldo.", content: "Descrizione: Fiera combattente cristiana dotata di lancia magica. Sfidando incantesimi e avversità, combatte con indomito coraggio per ricongiungersi al suo amato, il cavaliere saraceno Ruggiero." },
    { id: "char_ruggiero", category: "Schede Personaggio (Ciclo Carolingio)", title: "Ruggiero", image: "assets/images/tempio/ruggiero_portrait.png", summary: "Nobile guerriero saraceno destinato a convertirsi.", content: "Descrizione: Valoroso eroe saraceno di origini cristiane. Sposo promesso di Bradamante, viene trattenuto dal mago Atlante in castelli incantati, ma l'amore per Bradamante lo guida a compiere il suo destino di gloria." },
    { id: "char_merlino", category: "Schede Personaggio (Ciclo Bretone)", title: "Mago Merlino", image: "assets/images/tempio/merlino_portrait.png", summary: "Il leggendario incantatore consigliere di Camelot.", content: "Descrizione: Mago e profeta dotato di immensi poteri. Guida le sorti del regno di Britannia, assiste la nascita e l'ascesa al trono di Re Artù e progetta la Tavola Rotonda prima di essere imprigionato dalla Dama del Lago." },
    { id: "char_ginevra", category: "Schede Personaggio (Ciclo Bretone)", title: "Regina Ginevra", image: "assets/images/tempio/ginevra_portrait.png", summary: "Sposa di Re Artù e regina di Camelot.", content: "Descrizione: Regina nobile e bellissima sposa di Artù. Il suo amore segreto, travolgente e proibito per Sir Lancillotto spezzerà l'armonia della Tavola Rotonda e guiderà il regno verso una drammatica guerra civile." },
    { id: "char_mordred", category: "Schede Personaggio (Ciclo Bretone)", title: "Sir Mordred", image: "assets/images/tempio/mordred_portrait.png", summary: "Il cavaliere ribelle che distrusse Camelot.", content: "Descrizione: Figlio o nipote traditore di Re Artù. Approfittando dell'assenza del re, usurpa il trono e affronta il sovrano nella tragica battaglia di Camlann, in cui ferisce a morte il padre prima di essere trafitto." },
    {
      id: "god_muse",
      category: "Divinità",
      title: "Le Muse",
      image: "assets/images/tempio/muses_portrait.png",
      summary: "LE NOVE CUSTODI DELLE ARTI E DELLA POESIA IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  <p style="margin-bottom: 15px;">
    LE MUSE SONO DIVINITÀ "MINORI" APPARTENENTI AL COMPLESSO PANTHEON DELLA MITOLOGIA GRECA. PER GLI ANTICHI GRECI QUESTE NOVE SORELLE ERANO LE CUSTODI DELLA CULTURA E DELLE ARTI E PERMETTEVANO AI GRANDI AVVENIMENTI DI NON VENIR DIMENTICATI NEL CORSO DEL TEMPO GRAZIE AL LORO CANTO.
  </p>
  <p style="margin-bottom: 15px;">
    SECONDO LA TRADIZIONE MITOLOGICA, LE MUSE SONO FIGLIE DI ZEUS E <span style="color: #2563eb;">MNEMOSINE</span>, LA DEA DELLA MEMORIA, CHE LE PARTORÌ DOPO LA <span style="color: #ea580c;">VITTORIA DI ZEUS SUI TITANI</span>. PROPRIO LA NASCITA DELLE MUSE PROVVIDE A RENDERE INDIMENTICABILE QUELLA VITTORIA, POICHÈ LE DEE NE ETERNARONO GLI AVVENIMENTI CON IL LORO CANTO.
  </p>
  <p>
    QUESTE DIVINITÀ, OLTRE A DILETTARE GLI DEI CON <span style="color: #16a34a;">IL LORO CANTO</span>, INFONDEVANO NELL'ANIMO SENSIBILE DI POETI, ARTISTI E SCRITTORI <span style="color: #ea580c;">L'ISPIRAZIONE</span> NECESSARIA PER COMPORRE GRANDI POEMI O REALIZZARE MIRABILI LAVORI ARTISTICI. ANCORA OGGI NEL LINGUAGGIO COMUNE SI USA DEFINIRE "MUSA" UNA FIGURA CAPACE DI ISPIRARE UNA GRANDE OPERA.
  </p>
</div>`
    },
    { id: "god_zeus", category: "Divinità", title: "Zeus / Giove", image: "assets/images/tempio/zeus_portrait.png", summary: "Re degli dèi e signore del cielo.", content: "Descrizione: Zeus, in latino Giove, è il padre degli dèi, sovrano dell'Olimpo e signore dei fulmini e delle tempeste. Nei poemi omerici garantisce il rispetto della giustizia e delle leggi universali, sebbene spesso debba mediare tra i capricci delle altre divinità. Nell'Iliade stabilisce il destino della guerra piegandosi alle preghiere di Teti per riabilitare l'onore di Achille, mentre nell'Odissea e nell'Eneide sovrintende al ritorno di Ulisse e alla fondazione della stirpe romana da parte di Enea.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"CANTANO LE MUSE E LODANO IL RE DEI NUMI, CHE TRA GLI IMMORTALI È IL PIÙ GRANDE E POTENTE, E SCUOTE LA TERRA CON I SUOI FULMINI.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— INNI OMERICI</span></div>" },
    { id: "god_era", category: "Divinità", title: "Era / Giunone", image: "assets/images/tempio/era_portrait.png", summary: "Dea del matrimonio e regina dell'Olimpo.", content: "Descrizione: Era, in latino Giunone, è la regina dell'Olimpo, moglie e sorella di Zeus, protettrice del matrimonio e della fedeltà coniugale. Nell'Iliade è accecata dall'odio contro i Troiani a causa del giudizio di Paride, sostenendo strenuamente gli Achei. Nell'Eneide assume il ruolo di antagonista divina principale, scatenando tempeste tremende contro i Troiani e spingendo Didone e Turno alla guerra pur di impedire a Enea di adempiere al suo glorioso destino nel Lazio.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"O GIUNONE, ECCELSA SOVRANA DAL TRONO D'ORO, CHE REGNI IMMORTALE SUL VASTO CIELO ACCANTO AL TONANTE ZEUS.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— INNI OMERICI</span></div>" },
    { id: "god_atena", category: "Divinità", title: "Atena / Minerva", image: "assets/images/tempio/atena_portrait.png", summary: "Dea della saggezza e della strategia militare.", content: "Descrizione: Atena, in latino Minerva, è la vergine guerriera dea della saggezza, dell'intelligenza strategica e delle arti utili. Protettrice degli eroi astuti e virtuosi, interviene costantemente per soccorrere Achille e guidare Ulisse nel suo tormentato ritorno a casa. Nell'Eneide aiuta i Greci nel sacco di Troia e sostiene i guerrieri nella lotta, simboleggiando la ragione contrapposta alla forza cieca e distruttiva della guerra.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"ATENA, DEA DELLA SAPIENZA E DELLE BATTAGLIE, TU CHE GUIDI I PASSI DEGLI EROI SAGGI NELL'OSCURITÀ DEL PERICOLO.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— OMERO, ODISSEA</span></div>" },
    { id: "god_poseidone", category: "Divinità", title: "Poseidone / Nettuno", image: "assets/images/tempio/poseidone_portrait.png", summary: "Dio del mare e dei terremoti.", content: "Descrizione: Poseidone, in latino Nettuno, è il potente signore dei mari, dei terremoti e dei cavalli. Armato del suo tridente d'oro, scatena tempeste devastanti e squassa le fondamenta della terra. Diventa l'implacabile nemico di Ulisse dopo che l'eroe ne ha accecato il figlio, il ciclope Polifemo, perseguitandolo per mare e ritardandone il ritorno. Nell'Eneide, tuttavia, seda le onde agitate da Giunone per salvaguardare il passaggio delle navi troiane.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"POSEIDONE DALLE CHIOME AZZURRE, TU CHE DOMINI GLI ABISSI OCEANICI E CON IL TRIDENTE GOVERNI LA FURIA DELLE ACQUE.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— INNI OMERICI</span></div>" },
    { id: "god_apollo", category: "Divinità", title: "Apollo / Apollo", image: "assets/images/tempio/apollo_portrait.png", summary: "Dio della musica, della poesia e della profezia.", content: "Descrizione: Apollo, in latino Apollo, è il dio del sole, della musica, della poesia, delle arti e delle profezie, nonché custode degli oracoli. Con le sue frecce d'argento infonde malattie e morte o elargisce guarigione e luce. Nell'Iliade interviene per punire l'orgoglio di Agamennone scatenando una terribile pestilenza sul campo acheo e guida la freccia di Paride che trafigge il tallone dell'invincibile Achille.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"APOLLO D'ORO, CHE SUONI LA LIRA ARMONIOSA E CON I TUOI DARDI D'ARGENTO ILLUMINI LA VIA DELLA VERITÀ E DELLA PROFEZIA.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— OMERO, ILIADE</span></div>" },
    { id: "god_artemide", category: "Divinità", title: "Artemide / Diana", image: "assets/images/tempio/artemide_portrait.png", summary: "Dea della caccia e della natura selvaggia.", content: "Descrizione: Artemide, in latino Diana, è la dea vergine della caccia, dei boschi, della luna e degli animali selvatici. Armata di arco e dardi d'oro, custodisce la natura incontaminata e difende con rigore la sua purezza. Prima della spedizione contro Troia, esige il sacrificio di Ifigenia, figlia di Agamennone, per placare i venti contrari trattenuti in Aulide. Nell'Eneide ispira il valore della vergine guerriera Camilla, che combatte valorosamente al fianco di Turno.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"ARTEMIDE, CACCIATRICE DELLE SELVE SELVAGGE, CHE CON FRECCE FATALI CORRI SUI MONTI OMBROSI INSEGUENDO LE PREDE.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— INNI OMERICI</span></div>" },
    { id: "god_ares", category: "Divinità", title: "Ares / Marte", image: "assets/images/tempio/ares_portrait.png", summary: "Dio della guerra sanguinosa.", content: "Descrizione: Ares, in latino Marte, è il dio della guerra sanguinosa, della violenza fisica e della furia distruttiva dei combattimenti. Al contrario di Atena che rappresenta la strategia, Ares incarna la brutalità disordinata della battaglia. Nell'Iliade parteggia apertamente per i Troiani sotto l'influenza di Afrodite, giungendo a combattere in prima linea finché non viene ferito dal mortale Diomede con l'aiuto diretto della dea Atena.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"ARES DISTRUTTORE DI MURA, SIGNORE DELLE ARMI SPLENDENTI, CHE GODI DEL SANGUE DEI GUERRIERI E DEL FRAGORE DELLA MISCHIA.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— INNI OMERICI</span></div>" },
    { id: "god_afrodite", category: "Divinità", title: "Afrodite / Venere", image: "assets/images/tempio/afrodite_portrait.png", summary: "Dea dell'amore e della bellezza.", content: "Descrizione: Afrodite, in latino Venere, è la dea dell'amore, della bellezza, del desiderio e della fertilità. Nata dalla spuma del mare, esercita un potere irresistibile su dei e mortali. Causa scatenante della guerra di Troia avendo promesso Elena a Paride in cambio della mela d'oro, nell'Iliade protegge strenuamente i Troiani. Nell'Eneide assume il ruolo di amorevole protettrice e madre di Enea, guidandolo verso l'Italia e forgiandogli armi divine grazie a Vulcano.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"AFRODITE SORRIDENTE, NATA DAL MARE, TU CHE PIEGHI I CUORI DEGLI DEI E PORTI LA DOLCEZZA DELL'AMORE AGLI UOMINI MORTALI.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— INNI OMERICI</span></div>" },
    { id: "god_ermes", category: "Divinità", title: "Ermes / Mercurio", image: "assets/images/tempio/ermes_portrait.png", summary: "Messaggero degli dèi e protettore dei viaggiatori.", content: "Descrizione: Ermes, in latino Mercurio, è the veloce messaggero degli dei, psicopompo (guida delle anime nell'Ade), protettore dei viaggiatori, del commercio e degli inganni. Calzando i suoi calzari alati d'oro, viaggia tra l'Olimpo, la terra e gli Inferi. Sostiene Ulisse donandogli l'erba magica 'moli' per neutralizzare gli incantesimi della maga Circe e nell'Eneide viene inviato da Zeus a Cartagine per ordinare a Enea di abbandonare Didone ed adempiere al suo fato.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"ERMES MESSAGGERO, DAL BASTONE D'ORO, GUIDA DEI VIAGGIATORI E AMICO DEI MORTALI, CHE PORTI LA VOCE DELL'OLIMPO SULLA TERRA.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— OMERO, ODISSEA</span></div>" },
    { id: "god_efesto", category: "Divinità", title: "Efesto / Vulcano", image: "assets/images/tempio/efesto_portrait.png", summary: "Fabbro degli dèi.", content: "Descrizione: Efesto, in latino Vulcano, è il fabbro degli dei, signore del fuoco, della metallurgia e delle arti manuali. Sebbene zoppo e deforme, forgia palazzi sontuosi e straordinarie meraviglie meccaniche nelle sue officine situate sotto i vulcani. Nell'Iliade modella la celeberrima e splendida armatura di Achille su richiesta di Teti, mentre nell'Eneide costruisce lo scudo profetico del protagonista su richiesta di sua moglie Venere.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"EFESTO CELEBRE ARTEFICE, CHE CON IL FUOCO PIEGHI IL METALLO E CREI CAPOLAVORI SPLENDENTI DEGNI DEGLI DEI IMMORTALI.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— INNI OMERICI</span></div>" },
    { id: "god_ade", category: "Divinità", title: "Ade / Plutone", image: "assets/images/tempio/ade_portrait.png", summary: "Signore del regno dei morti.", content: "Descrizione: Ade, in latino Plutone, è il signore degli Inferi e sovrano del regno delle ombre, fratello di Zeus e Poseidone. Custode severo delle anime dei trapassati, impedisce a chiunque di violare il confine tra la vita e la morte. Il suo regno spaventoso viene disceso ed esplorato sia da Ulisse nel celebre rito dell'evocazione (Nekyia) sia da Enea, che guidato dalla Sibilla vi accede per consultare l'ombra del padre Anchise.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"ADE, RE SOTTERRANEO CHE DOMINI LA FOLLA INVISIBILE DEI MORTI, CUSTODE INESORABILE DELLA FINE COMUNE DI OGNI UOMO.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— INNI OMERICI</span></div>" },
    { id: "god_demetra", category: "Divinità", title: "Demetra / Cerere", image: "assets/images/tempio/demetra_portrait.png", summary: "Dea dell'agricoltura e della fertilità.", content: "Descrizione: Demetra, in latino Cerere, è la dea dei raccolti, dell'agricoltura e della fertilità della terra. Il suo mito principale è legato al rapimento della figlia Persefone da parte di Ade, evento che causa il ciclo delle stagioni e la nascita della cura dei campi. Sebbene non partecipi attivamente alle battaglie dell'Iliade e dell'Eneide, rappresenta la forza vitale e il nutrimento sacro a cui gli eroi tributano solenni libagioni.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"DEMETRA DALLE BELLE CHIOME, DEA DEL GRANO E DELLA TERRA FECONDA, CHE DONI FRUTTI ABBONDANTI E VITA AI SOLCHI DEI CAMPI.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— INNI OMERICI</span></div>" },
    { id: "god_estia", category: "Divinità", title: "Estia / Vesta", image: "assets/images/tempio/estia_portrait.png", summary: "Dea della casa e del focolare.", content: "Descrizione: Estia, in latino Vesta, è la dea del focolare domestico, della casa e dello stato, simbolo di stabilità, ordine e sacralità familiare. Custodisce il fuoco sacro che non deve mai spegnersi. Nell'Eneide riveste un'importanza fondamentale: Enea trae in salvo da Troia in fiamme proprio i Penati e il fuoco perenne di Vesta, portandoli nel Lazio come fondamenta religiose per la futura grandezza di Roma.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"ESTIA CHE CUSTODISCI NELLE CASE DEGLI UOMINI LA FIAMMA PERENNE DELL'ALTARE, DISPENSATRICE DI PACE E UNIONE PER OGNI FOCOLARE.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— INNI OMERICI</span></div>" },
    { id: "god_dioniso", category: "Divinità", title: "Dioniso / Bacco", image: "assets/images/tempio/dioniso_portrait.png", summary: "Dio del vino, della festa e del teatro.", content: "Descrizione: Dioniso, in latino Bacco, è il dio del vino, dell'ebbrezza, della festa, del teatro and della liberazione dei sensi. Rappresenta l'impulso vitale, il caos creativo e la forza rigeneratrice della natura. Presente come divinità di contorno nei poemi epici arcaici, il suo culto misterico ispira cerimonie di pacificazione e di ebbrezza rituale che simboleggiano la purificazione interiore dell'eroe dopo le dure fatiche della guerra.<div style=\"font-style: italic; border-left: 3px solid var(--gold); padding-left: 10px; margin-top: 15px; color: #78350f;\">\"DIONISO CORONATO DI EDERA, DIO DEL VINO E DELLA GIOIA SFRENATA, CHE LIBERI GLI ANIMI DAGLI AFFANNI DEL GIORNO CON IL TUO DOLCE NETTARE.\"<br><span style=\"font-size: 0.8rem; font-weight: bold; font-style: normal;\">— INNI OMERICI</span></div>" },
    {
      id: "god_odino",
      category: "Divinità",
      title: "Odino",
      image: "assets/images/tempio/odino_portrait.png",
      summary: "Re degli dèi, dio della sapienza e della guerra.",
      content: "Descrizione: Odino (detto anche Allfather) è la divinità suprema della mitologia nordica, sovrano del regno di Asgard e padre di tutti gli dei. È il dio della sapienza, della guerra, della poesia e della magia runica. Ha sacrificato un occhio alla fonte di Mimir pur di ottenere la conoscenza cosmica e si è appeso per nove giorni all'albero del mondo Yggdrasil trafitto dalla sua stessa lancia Gungnir per scoprire il segreto delle rune. Accoglie i guerrieri caduti valorosamente in battaglia nel suo salone, il Valhalla, scortati dalle Valchirie."
    },
    {
      id: "god_thor",
      category: "Divinità",
      title: "Thor",
      image: "assets/images/tempio/thor_portrait.png",
      summary: "Dio del tuono e della forza.",
      content: "Descrizione: Thor è il dio del tuono, della tempesta e della forza fisica, figlio di Odino e di Jord (la Terra). È il protettore degli dei e degli uomini contro le forze del caos rappresentate dai giganti. Impugna il leggendario martello Mjolnir, capace di colpire qualsiasi bersaglio e di tornare sempre nelle sue mani, e indossa la cintura magica Megingjord che raddoppia la sua forza."
    },
    {
      id: "god_frigg",
      category: "Divinità",
      title: "Frigg",
      image: "assets/images/tempio/frigg_portrait.png",
      summary: "Dea della famiglia e sposa di Odino.",
      content: "Descrizione: Regina degli dei nordici e sposa di Odino, Frigg è la dea della famiglia, del matrimonio, dell'amore e dell'unione domestica. Dotata del dono della preveggenza, conosce il destino di tutti gli esseri viventi ma sceglie di non rivelarlo mai. Tenta disperatamente di salvare il figlio Balder facendosi giurare fedeltà da ogni elemento del cosmo, tranne dal vischio."
    },
    {
      id: "god_freya",
      category: "Divinità",
      title: "Freya",
      image: "assets/images/tempio/freya_portrait.png",
      summary: "Dea dell'amore e della bellezza.",
      content: "Descrizione: Dea dell'amore, della bellezza, della fertilità e della magia (Seidr). Appartenente alla stirpe dei Vani, è anche associata alla guerra: raccoglie nei suoi prati di Folkvangr la metà dei guerrieri caduti sul campo, accogliendoli nel suo palazzo, mentre l'altra metà viene ospitata da Odino nel Valhalla."
    },
    {
      id: "god_loki",
      category: "Divinità",
      title: "Loki",
      image: "assets/images/tempio/loki_portrait.png",
      summary: "Dio astuto e ingannatore.",
      content: "Descrizione: Loki è una figura complessa e ambigua della mitologia nordica. Pur essendo un gigante di nascita, viene accolto tra gli dei di Asgard grazie a un patto di sangue con Odino. È il dio degli inganni, delle trasformazioni e della discordia. Con la sua astuzia risolve spesso i problemi degli dei, ma altrettanto spesso ne è la causa, fino al tradimento definitivo nel Ragnarok."
    },
    {
      id: "god_tyr",
      category: "Divinità",
      title: "Tyr",
      image: "assets/images/tempio/tyr_portrait.png",
      summary: "Dio della guerra e del coraggio.",
      content: "Descrizione: Tyr è il dio della guerra, del coraggio, della giustizia e del diritto nelle assemblee popolari. Esempio massimo di valore morale e lealtà, ha sacrificato la sua mano destra fauci del lupo Fenrir per consentire agli dei di incatenare la temibile creatura e preservare l'ordine cosmico."
    },
    {
      id: "opere_iliade",
      category: "Le Opere",
      title: "L'Iliade",
      image: "assets/images/tempio/achille_portrait.png",
      summary: "Il grande poema omerico sulla guerra di Troia e l'ira di Achille.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937;">
  <div style="background: linear-gradient(135deg, #dc262622, #f59e0b11); border: 2px solid #dc2626; border-radius: 10px; padding: 18px; margin-bottom: 20px; text-align: center;">
    <div style="font-size: 1.6rem; margin-bottom: 6px;">⚔️</div>
    <div style="font-size: 0.85rem; color: #78350f; margin-top: 6px;">di Omero · IX-VIII sec. a.C. · 24 Canti · ~15.700 versi</div>
  </div>
  <div style="background: rgba(220,38,38,0.06); border-left: 4px solid #dc2626; padding: 14px; border-radius: 6px; margin-bottom: 16px; font-style: italic; font-size: 0.92rem; text-align: center;">
    "Cantami, o Diva, del Pelide Achille l'ira funesta che infiniti addusse lutti agli Achei..."<br>
    <span style="font-size: 0.8rem; font-weight: bold; font-style: normal; color: #78350f;">— PROEMIO DELL'ILIADE</span>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
    <div style="background: rgba(37,99,235,0.07); border-left: 4px solid #2563eb; padding: 12px; border-radius: 6px;">
      <div style="color: #2563eb; font-size: 0.88rem; margin-bottom: 8px;">📍 AMBIENTAZIONE</div>
      <div style="font-size: 0.85rem; line-height: 1.6;">
        • Città di <span style="color:#dc2626;">Troia</span> (Ilio)<br>
        • Campo acheo (greco)<br>
        • Durata: <span style="color:#ea580c;">51 giorni</span> del decimo anno di guerra
      </div>
    </div>
    <div style="background: rgba(220,38,38,0.07); border-left: 4px solid #dc2626; padding: 12px; border-radius: 6px;">
      <div style="color: #dc2626; font-size: 0.88rem; margin-bottom: 8px;">🎭 TEMA CENTRALE</div>
      <div style="font-size: 0.85rem; line-height: 1.6;">
        L'<span style="color:#dc2626;">ira di Achille</span> contro Agamennone e le sue conseguenze devastanti per entrambi gli eserciti.
      </div>
    </div>
  </div>
  <div style="background: rgba(245,158,11,0.08); border: 1.5px solid #f59e0b; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
    <div style="color: #78350f; font-size: 0.9rem; margin-bottom: 10px;">👥 SCHIERAMENTI</div>
    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; text-align: center; font-size: 0.85rem;">
      <div style="background: rgba(37,99,235,0.1); padding: 10px; border-radius: 6px;">
        <div style="color: #2563eb; margin-bottom: 6px;">⚔️ ACHEI (GRECI)</div>
        <div>Achille · Agamennone</div>
        <div>Ulisse · Aiace · Diomede</div>
      </div>
      <div style="display: flex; align-items: center; color: #f59e0b; font-size: 1.5rem;">VS</div>
      <div style="background: rgba(220,38,38,0.1); padding: 10px; border-radius: 6px;">
        <div style="color: #dc2626; margin-bottom: 6px;">🛡️ TROIANI</div>
        <div>Ettore · Priamo</div>
        <div>Paride · Elena</div>
      </div>
    </div>
  </div>
  <div style="background: rgba(22,163,74,0.07); border-left: 4px solid #16a34a; padding: 12px; border-radius: 6px;">
    <div style="color: #16a34a; font-size: 0.88rem; margin-bottom: 8px;">📊 STRUTTURA NARRATIVA</div>
    <div style="font-size: 0.85rem; line-height: 1.7;">
      1. <span style="color:#dc2626;">Lite</span>: Achille si ritira dalla battaglia (Canti I-IX)<br>
      2. <span style="color:#ea580c;">Aristeia</span>: battaglie degli altri eroi (Canti X-XV)<br>
      3. <span style="color:#2563eb;">Morte di Patroclo</span>: Achille torna (Canti XVI-XVIII)<br>
      4. <span style="color:#16a34a;">Duello finale</span>: Achille uccide Ettore (Canti XIX-XXIV)
    </div>
  </div>
</div>`
    },
    {
      id: "opere_odissea",
      category: "Le Opere",
      title: "L'Odissea",
      image: "assets/images/tempio/ulisse_portrait.png",
      summary: "Il grande viaggio di Ulisse verso Itaca: 10 anni di avventure e prove.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937;">
  <div style="background: linear-gradient(135deg, #2563eb22, #16a34a11); border: 2px solid #2563eb; border-radius: 10px; padding: 18px; margin-bottom: 20px; text-align: center;">
    <div style="font-size: 1.6rem; margin-bottom: 6px;">🚢</div>
    <div style="font-size: 0.85rem; color: #78350f; margin-top: 6px;">di Omero · IX-VIII sec. a.C. · 24 Canti · ~12.100 versi</div>
  </div>
  <div style="background: rgba(37,99,235,0.06); border-left: 4px solid #2563eb; padding: 14px; border-radius: 6px; margin-bottom: 16px; font-style: italic; font-size: 0.92rem; text-align: center;">
    "Dimmi, o Musa, dell'eroe dai mille artifici, che a lungo errò dopo la guerra di Troia..."<br>
    <span style="font-size: 0.8rem; font-weight: bold; font-style: normal; color: #78350f;">— PROEMIO DELL'ODISSEA</span>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
    <div style="background: rgba(37,99,235,0.07); border-left: 4px solid #2563eb; padding: 12px; border-radius: 6px;">
      <div style="color: #2563eb; font-size: 0.88rem; margin-bottom: 8px;">🧭 PROTAGONISTA</div>
      <div style="font-size: 0.85rem; line-height: 1.6;">
        <span style="color:#2563eb;">Ulisse (Odisseo)</span>, re di Itaca.<br>
        Eroe dell'<span style="color:#ea580c;">astuzia</span> e dell'intelligenza (metis), non della forza bruta.
      </div>
    </div>
    <div style="background: rgba(22,163,74,0.07); border-left: 4px solid #16a34a; padding: 12px; border-radius: 6px;">
      <div style="color: #16a34a; font-size: 0.88rem; margin-bottom: 8px;">🏠 TEMA CENTRALE</div>
      <div style="font-size: 0.85rem; line-height: 1.6;">
        Il <span style="color:#16a34a;">nostos</span> (ritorno in patria) dopo vent'anni di assenza. La fedeltà di Penelope e il viaggio di Telemaco.
      </div>
    </div>
  </div>
  <div style="background: rgba(245,158,11,0.08); border: 1.5px solid #f59e0b; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
    <div style="color: #78350f; font-size: 0.9rem; margin-bottom: 12px; text-align: center;">🗺️ LE TAPPE DEL VIAGGIO</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 0.82rem; text-align: center;">
      <div style="background: rgba(220,38,38,0.08); padding: 8px; border-radius: 6px;"><span style="color:#dc2626;">🌀</span><br>Ciclope<br>Polifemo</div>
      <div style="background: rgba(37,99,235,0.08); padding: 8px; border-radius: 6px;"><span style="color:#2563eb;">🎵</span><br>Sirene</div>
      <div style="background: rgba(22,163,74,0.08); padding: 8px; border-radius: 6px;"><span style="color:#16a34a;">🐷</span><br>Circe</div>
      <div style="background: rgba(245,158,11,0.08); padding: 8px; border-radius: 6px;"><span style="color:#f59e0b;">🌊</span><br>Scilla e<br>Cariddi</div>
      <div style="background: rgba(139,92,246,0.08); padding: 8px; border-radius: 6px;"><span style="color:#7c3aed;">⭐</span><br>Calipso</div>
      <div style="background: rgba(37,99,235,0.08); padding: 8px; border-radius: 6px;"><span style="color:#2563eb;">🏹</span><br>Ritorno<br>a Itaca</div>
    </div>
  </div>
  <div style="background: rgba(22,163,74,0.07); border-left: 4px solid #16a34a; padding: 12px; border-radius: 6px;">
    <div style="color: #16a34a; font-size: 0.88rem; margin-bottom: 8px;">📊 STRUTTURA (3 PARTI)</div>
    <div style="font-size: 0.85rem; line-height: 1.7;">
      1. <span style="color:#2563eb;">Telemachia</span>: viaggio di Telemaco in cerca del padre (Canti I-IV)<br>
      2. <span style="color:#ea580c;">Avventure di Ulisse</span>: raccontate dai Feaci (Canti V-XII)<br>
      3. <span style="color:#16a34a;">Vendetta sui Proci</span>: ritorno e liberazione di Itaca (Canti XIII-XXIV)
    </div>
  </div>
</div>`
    },
    {
      id: "opere_eneide",
      category: "Le Opere",
      title: "L'Eneide",
      image: "assets/images/tempio/didone_portrait.png",
      summary: "Il poema epico latino di Virgilio: il viaggio di Enea e la fondazione di Roma.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937;">
  <div style="background: linear-gradient(135deg, #78350f22, #f59e0b11); border: 2px solid #78350f; border-radius: 10px; padding: 18px; margin-bottom: 20px; text-align: center;">
    <div style="font-size: 1.6rem; margin-bottom: 6px;">🦅</div>
    <div style="font-size: 0.85rem; color: #78350f; margin-top: 6px;">di Publio Virgilio Marone · 29-19 a.C. · 12 Libri · ~9.900 versi</div>
  </div>
  <div style="background: rgba(120,53,15,0.06); border-left: 4px solid #78350f; padding: 14px; border-radius: 6px; margin-bottom: 16px; font-style: italic; font-size: 0.92rem; text-align: center;">
    "Canto le armi e l'uomo che per primo dalle coste di Troia, profugo per decreto del fato, giunse in Italia..."<br>
    <span style="font-size: 0.8rem; font-weight: bold; font-style: normal; color: #78350f;">— PROEMIO DELL'ENEIDE</span>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
    <div style="background: rgba(120,53,15,0.07); border-left: 4px solid #78350f; padding: 12px; border-radius: 6px;">
      <div style="color: #78350f; font-size: 0.88rem; margin-bottom: 8px;">👑 PROTAGONISTA</div>
      <div style="font-size: 0.85rem; line-height: 1.6;">
        <span style="color:#78350f;">Enea</span>, eroe troiano figlio di Venere.<br>
        Incarna la <span style="color:#ea580c;">pietas</span>: fedeltà agli dei, alla patria e alla famiglia.
      </div>
    </div>
    <div style="background: rgba(37,99,235,0.07); border-left: 4px solid #2563eb; padding: 12px; border-radius: 6px;">
      <div style="color: #2563eb; font-size: 0.88rem; margin-bottom: 8px;">🎯 SCOPO POLITICO</div>
      <div style="font-size: 0.85rem; line-height: 1.6;">
        Virgilio scrisse l'Eneide per <span style="color:#2563eb;">glorificare Roma</span> e la dinastia di Augusto, mostrando le origini divine degli imperatori.
      </div>
    </div>
  </div>
  <div style="background: rgba(245,158,11,0.08); border: 1.5px solid #f59e0b; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
    <div style="color: #78350f; font-size: 0.9rem; margin-bottom: 10px; text-align: center;">📊 STRUTTURA (2 METÀ)</div>
    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; text-align: center; font-size: 0.85rem;">
      <div style="background: rgba(37,99,235,0.1); padding: 12px; border-radius: 6px;">
        <div style="color: #2563eb; margin-bottom: 6px;">📖 LIBRI I-VI<br>"L'Odissea di Enea"</div>
        <div>Fuga da Troia<br>Tempesta<br>Didone a Cartagine<br>Discesa agli Inferi</div>
      </div>
      <div style="display: flex; align-items: center; color: #f59e0b; font-size: 1.5rem;">VS</div>
      <div style="background: rgba(220,38,38,0.1); padding: 12px; border-radius: 6px;">
        <div style="color: #dc2626; margin-bottom: 6px;">⚔️ LIBRI VII-XII<br>"L'Iliade di Enea"</div>
        <div>Arrivo nel Lazio<br>Guerra contro Turno<br>Alleanze e battaglie<br>Duello finale</div>
      </div>
    </div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-size: 0.82rem; text-align: center; margin-bottom: 4px;">
    <div style="background: rgba(37,99,235,0.08); padding: 10px; border-radius: 8px;">
      <div style="color:#2563eb; font-size: 1.1rem;">🔥</div>
      <div style="color:#2563eb;">Caduta di Troia</div>
    </div>
    <div style="background: rgba(239,68,68,0.08); padding: 10px; border-radius: 8px;">
      <div style="color:#dc2626; font-size: 1.1rem;">💔</div>
      <div style="color:#dc2626;">Amore per Didone</div>
    </div>
    <div style="background: rgba(22,163,74,0.08); padding: 10px; border-radius: 8px;">
      <div style="color:#16a34a; font-size: 1.1rem;">🏛️</div>
      <div style="color:#16a34a;">Fondazione Roma</div>
    </div>
  </div>
</div>`
    },
    {
      id: "place_uruk",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Uruk",
      image: "assets/images/tempio/uruk_landscape.png",
      summary: "L'antichissima città mesopotamica di Gilgamesh, protetta dalle leggendarie mura da lui edificate.",
      content: "Descrizione: Uruk è l'antichissima città della Mesopotamia (nell'odierno Iraq) governata dal leggendario re Gilgamesh, protagonista del primo poema epico della storia dell'umanità. Il mito di fondazione e la grandezza di Uruk sono intrinsecamente legati alle sue maestose mura di mattoni cotti, che il poema celebra come opera immortale costruita da Gilgamesh stesso. La città rappresenta il passaggio dallo stato selvaggio alla civiltà urbana, simboleggiato dall'incontro tra Gilgamesh ed Enkidu. Le mura di Uruk non sono solo una difesa fisica, ma il simbolo della gloria imperitura che l'uomo può conquistare attraverso le opere culturali e architettoniche, sfidando la mortalità. Uruk fu un centro fiorente di commerci, cultura e religione, dove i grandi templi a gradoni (ziggurat) svettavano verso il cielo, dimostrando l'ingegnosità e l'ambizione dei suoi abitanti. L'Epopea di Gilgamesh ci restituisce l'immagine di una metropoli pulsante di vita, la cui grandiosità architettonica serviva a compensare il tragico destino umano e la paura della morte, offrendo una forma tangibile e collettiva di immortalità."
    },
    {
      id: "place_troia",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Troia",
      image: "assets/images/tempio/troia_landscape.png",
      summary: "La leggendaria città dell'Asia Minore, teatro della guerra cantata nell'Iliade e punto di partenza del mito di fondazione romano.",
      content: "Descrizione: Troia (o Ilio) è la leggendaria città dell'Asia Minore cantata da Omero nell'Iliade. Dopo dieci anni di assedio acheo, la città capitolò a causa del celebre inganno del cavallo ideato da Ulisse. Dalle sue ceneri e fiamme fuggì il valoroso guerriero troiano Enea, portando con sé il vecchio padre Anchise sulle spalle e il figlioletto Ascanio. Questa drammatica fuga costituisce l'anello di congiunzione tra l'epica greca e la fondazione di Roma: il viaggio di Enea verso il Lazio è infatti dettato dal volere divino di dare inizio a una stirpe gloriosa e imperitura, facendo di Troia la culla ancestrale del futuro Impero Romano. L'inespugnabile cinta muraria di Troia, costruita con l'aiuto degli dei Apollo e Poseidone, respinse innumerevoli assalti prima di cedere all'astuzia greca. La tragica fine della città, con la distruzione dei suoi palazzi e lo sterminio della sua casa reale guidata da Priamo, divenne nell'immaginario collettivo il simbolo universale del tramonto delle grandi civiltà e del fato ineluttabile che regola la vita degli uomini e degli eroi."
    },
    {
      id: "place_micene",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Micene",
      image: "assets/images/tempio/micene_landscape.png",
      summary: "La possente roccaforte di Agamennone, celebre per la Porta dei Leoni e le mura ciclopiche.",
      content: "Descrizione: Micene è la potente e rocciosa roccaforte del Peloponneso, culla della civiltà micenea e regno del re Agamennone, capo supremo della spedizione greca contro Troia. Celebre per la sua monumentale Porta dei Leoni e le mura ciclopiche (che la leggenda voleva costruite dai giganti Ciclopi), Micene rappresenta il fulcro politico e militare del ciclo troiano. La sua fondazione mitica è attribuita a Perseo, figlio di Zeus. Nella tradizione epica e tragica greca, Micene è legata alla sanguinosa saga degli Atridi, una stirpe reale tormentata da delitti familiari e vendette implacabili, che fa da sfondo alle fatiche morali e alle sventure dei vincitori di Troia al loro ritorno. Il destino oscuro della casa reale micenea sottolinea la fragilità del potere e le conseguenze devastanti dell'arroganza umana (la 'hybris'). Nonostante la gloria militare conquistata a Troia, Micene divenne teatro di orribili spargimenti di sangue, dimostrando come la maledizione degli dei potesse colpire inesorabilmente le famiglie più illustri e potenti dell'antica Grecia."
    },
    {
      id: "place_tebe",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Tebe",
      image: "assets/images/tempio/tebe_landscape.png",
      summary: "La città delle sette porte, fondata dall'eroe fenicio Cadmo che seminò i denti del drago.",
      content: "Descrizione: Il mito di fondazione di Tebe inizia in Fenicia, quando la principessa Europa viene rapita da Zeus. Il fratello Cadmo parte alla sua ricerca e, consultando l'oracolo di Delfi, riceve l'ordine di abbandonare l'impresa, seguire una vacca sacra e fondare una città nel punto in cui l'animale si fosse sdraiato per la stanchezza. La vacca lo condusse in Beozia. Lì Cadmo dovette affrontare e uccidere un drago sacro a Ares che custodiva una sorgente. Su consiglio di Atena, Cadmo seminò i denti del drago nel terreno: da essi nacquero guerrieri armati, gli Sparti ('gli uomini seminati'), che si combatterono tra loro finché ne rimasero solo cinque. Con questi superstiti Cadmo fondò la rocca Cadmea e la città di Tebe, dando inizio a una stirpe reale tormentata dal destino, che farà da sfondo a celebri tragedie greche. La maledizione di Tebe, segnata da sfingi, pestilenze, profezie oscure e guerre fratricide, ha ispirato opere immortali come quelle incentrate sulla figura di Edipo. Nonostante i numerosi drammi che colpirono i suoi governanti, Tebe rimase una potenza di primo piano nell'antica Grecia, caratterizzata dalla maestosità delle sue mura difese dalle famose 'sette porte'."
    },
    {
      id: "place_itaca",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Itaca",
      image: "assets/images/tempio/itaca_landscape.png",
      summary: "La rocciosa isola greca patria di Ulisse, traguardo del tormentato viaggio di ritorno (nostos).",
      content: "Descrizione: Itaca è la montuosa e aspra isola del mar Ionio, patria e regno dell'astuto Ulisse. Nonostante il territorio arido e impervio ne modelli il carattere fiero e resiliente degli abitanti, Ulisse desidera ritornarvi sopra ogni cosa durante i suoi venti anni di assenza (dieci in guerra e dieci in viaggio). Il suo ritorno rappresenta il concetto epico del nostos: la riconquista delle proprie radici, il ricongiungimento con la sposa Penelope e il figlio Telemaco, e il ripristino dell'ordine perduto a causa dei Proci che usurpavano la reggia. In termini mitologici e di identità, Itaca rappresenta la difesa del proprio focolare e la giustizia del sovrano legittimo. L'isola non è solo un luogo geografico, ma un potente simbolo universale della meta agognata dopo lunghe peripezie, il rifugio sicuro in cui ritrovare se stessi e la propria identità. Per Ulisse, Itaca è il faro che guida il suo ingegno e la sua volontà attraverso pericoli mortali, tempeste e tentazioni divine, rendendola l'emblema stesso della perseveranza umana."
    },
    {
      id: "place_sparta",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Sparta",
      image: "assets/images/tempio/sparta_landscape.png",
      summary: "La patria del re Menelao ed Elena, il cui rapimento diede inizio alla celebre guerra di Troia.",
      content: "Descrizione: Sparta, situata nella fertile valle del fiume Eurota nel Peloponneso, è la patria del re Menelao e della bellissima sposa Elena. Il rapimento di Elena da parte del principe troiano Paride rompe il sacro vincolo dell'ospitalità (xenia) e scatena l'unione dei re greci per muovere guerra a Troia. Sparta incarna l'ideale della forza militare, della disciplina e del valore bellico estremo. Fondata da Lacedemone, figlio di Zeus, Sparta si sviluppa nel mito come una società dedita interamente alle armi. Nel ciclo epico rappresenta il dovere morale e l'onore violato che esigono una vendetta spietata e collettiva, segnando l'inizio del grande scontro tra Occidente e Oriente. La città-stato di Sparta si distingueva nettamente dalle altre polis greche per la sua rigorosa educazione militare (l'agoghé) e il suo sistema politico peculiare. I suoi cittadini-soldato, gli Spartiati, erano votati al servizio esclusivo dello stato, ponendo l'onore, il coraggio in battaglia e l'obbedienza cieca al di sopra di ogni affetto personale. Sparta rimase nella storia e nel mito come l'esempio supremo della dedizione guerriera e dell'austerità marziale."
    },
    {
      id: "place_atene",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Atene",
      image: "assets/images/tempio/atene_landscape.png",
      summary: "La culla della democrazia fondata sulla celebre contesa tra la dea Atena e il dio Poseidone.",
      content: "Descrizione: Atene, la leggendaria culla della filosofia, democrazia e cultura greca, è legata a un celebre mito di fondazione che ne spiega il nome. Il mito narra della contesa tra la dea della saggezza Atena e il dio del mare Poseidone per il patronato della nascente città. Per decidere chi l'avrebbe protetta, il re Cecrope stabilì che ciascuna divinità dovesse presentare un dono ai cittadini. Poseidone colpì la roccia dell'Acropoli col suo tridente, facendo scaturire una sorgente d'acqua (tuttavia salata e di scarsa utilità). Atena, invece, piantò il primo ulivo, offrendo cibo, olio per l'illuminazione e un simbolo di pace e progresso. I cittadini scelsero il dono di Atena, battezzando la città in suo onore. Questo mito celebra il trionfo della ragione e dell'agricoltura sulle forze brute della natura. Nel corso dei secoli, Atene si trasformò in un faro di civiltà, dove le arti, la letteratura e le scienze fiorirono sotto la protezione della sua dea tutelare. La città divenne il cuore pulsante dell'antica Grecia, un luogo dove il dibattito pubblico e la ricerca della verità formavano le basi della democrazia moderna."
    },
    {
      id: "place_cartagine",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Cartagine",
      image: "assets/images/tempio/cartagine_landscape.png",
      summary: "La splendida città fenicia d'Africa fondata dalla regina Didone, patria del tragico amore con Enea.",
      content: "Descrizione: Cartagine è la splendida e ricca città dell'Africa settentrionale (nell'odierna Tunisia) fondata da profughi fenici guidati dalla coraggiosa regina Didone, sfuggita alle ire del fratello Pigmalione di Tiro. Nel corso delle sue peregrinazioni dopo la caduta di Troia, Enea naufragò sulle coste cartaginesi e venne accolto con magnificenza da Didone. Tra i due nacque un amore travolgente, ma il destino divino ordinò a Enea di riprendere il mare verso l'Italia per compiere il suo dovere di fondatore. L'abbandono causò la disperazione e il suicidio di Didone, la quale, sulla pira funebre, pronunciò una solenne maledizione che profetizzava l'eterna e sanguinosa rivalità tra il futuro popolo romano e quello cartaginese. Questa profezia trovò il suo tragico compimento nelle sanguinose Guerre Puniche, che per secoli opposero le due superpotenze del Mediterraneo antico. La storia di Cartagine, strettamente intrecciata al destino di Roma, rimane uno dei racconti più intensi di amore, tradimento e destino ineluttabile nell'epica classica."
    },
    {
      id: "place_roma",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Roma",
      image: "assets/images/tempio/roma_landscape.png",
      summary: "La Città Eterna fondata sul colle Palatino, il culmine del viaggio di rifondazione troiano.",
      content: "Descrizione: Il mito di fondazione di Roma si ricollega direttamente alla dinastia troiana di Enea. Secondo la leggenda, i gemelli Romolo e Remo, nati dalla sacerdotessa Rea Silvia (discendente di Enea) e dal dio della guerra Marte, vennero salvati dalle acque del Tevere e allattati da una lupa sacra. Cresciuti e appreso il loro glorioso lignaggio, decisero di fondare una nuova città sul colle Palatino. La fondazione si compì il 21 aprile del 753 a.C. con un rito sacro: Romolo tracciò un confine invalicabile (il pomerio) con un aratro e, a seguito di un tragico scontro in cui Remo fu ucciso per aver violato quel confine, divenne il primo re di Roma, dando alla città il proprio nome. Da queste umili ma prodigiose origini, Roma crebbe fino a diventare il centro di un impero vasto e ineguagliabile, estendendo la sua influenza militare, culturale e giuridica su gran parte del mondo conosciuto. Il mito di fondazione romano non solo giustificava il suo potere egemonico, ma trasmetteva i valori fondamentali della 'pietas' (dovere verso gli dei, la patria e la famiglia) e della virtù marziale che resero Roma l'emblema dell'ordine e della civilizzazione per secoli."
    },
    {
      id: "place_camelot",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Camelot",
      image: "assets/images/tempio/camelot_landscape.png",
      summary: "La leggendaria corte di Re Artù, simbolo di giustizia, cavalleria e della Tavola Rotonda.",
      content: "Descrizione: Camelot è il mitico castello e capitale del regno di Britannia sotto la guida di Re Artù Pendragon. Fondata con l'aiuto del mago Merlino, Camelot incarna l'utopia di una società basata sui più alti valori della cavalleria medievale: onore, difesa dei deboli e giustizia. Il fulcro di questo ideale è la Tavola Rotonda, un tavolo circolare donato al re affinché nessuno dei suoi valorosi cavalieri potesse rivendicare la precedenza o sentirsi superiore agli altri. Da Camelot partirono le più straordinarie avventure del ciclo bretone, tra cui la cerca del Santo Graal e le imprese d'amore di Lancillotto e Ginevra. Oltre alle gesta eroiche, Camelot rappresenta un momento di fugace perfezione in un mondo turbolento, un'epoca d'oro dove la legge del più forte fu sostituita dal codice cavalleresco. Tuttavia, la sua stessa grandezza portava in sé i semi della distruzione, intrecciati nelle passioni e nei tradimenti dei suoi membri più illustri, rendendo Camelot un simbolo eterno sia di speranza che di tragica caducità."
    },
    {
      id: "place_worms",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Worms",
      image: "assets/images/tempio/worms_landscape.png",
      summary: "L'antica città sul Reno, capitale dei Burgundi e palcoscenico centrale del ciclo dei Nibelunghi.",
      content: "Descrizione: Worms, situata sulla riva occidentale del fiume Reno, è l'antica capitale storica del regno dei Burgundi e la principale ambientazione terrena del celebre poema epico germanico, il Nibelungenlied (Canto dei Nibelunghi). Nel mito, Worms è la splendida corte dove regna il re Gunther con i suoi fratelli e la bellissima Crimilde. Qui giunge l'eroe invincibile Sigfrido per chiedere la mano di Crimilde, dando inizio a un intreccio di amori, inganni e patti di sangue. È proprio a Worms, sul sagrato della cattedrale, che scoppia la contesa fatale tra Crimilde e Brunilde sulla precedenza del rango dei rispettivi sposi, e nei pressi della città Hagen di Tronje nasconde il leggendario oro del Reno, segnando il destino tragico dell'intera stirpe burgunda. L'atmosfera che si respira a Worms oscilla tra i fasti delle corti cavalleresche e l'incombente oscurità del fato nordico, culminando nell'inganno mortale teso a Sigfrido nella foresta circostante. La città del Reno resta indissolubilmente legata alle vicende oscure di lealtà ferita e vendetta sanguinaria che chiudono l'epopea nibelungica."
    },
    {
      id: "place_aquisgrana",
      category: "Luoghi e Miti di Fondazione",
      horizontal: true,
      title: "Aquisgrana",
      image: "assets/images/tempio/aquisgrana_landscape.png",
      summary: "Il cuore dell'impero cristiano di Carlo Magno, base di partenza delle imprese dei Paladini.",
      content: "Descrizione: Aquisgrana (Aachen) è la capitale storica dell'Impero Carolingio, eletta da Carlo Magno come centro amministrativo e culturale del suo regno. Nel ciclo carolingio, Aquisgrana rappresenta il baluardo e la culla della fede e dell'autorità cristiana in Europa. Da qui l'imperatore governava circondato dai suoi dodici Paladini, guidati dal prode Orlando. La città funge da base di partenza logistica e ideale per le leggendarie spedizioni militari contro i Saraceni in Spagna e nei Pirenei, celebrando l'unione mitica tra il potere imperiale sacro e la difesa dei confini dell'Europa cristiana. La corte di Aquisgrana è anche un luogo di ritrovo e di festa, dove le virtù cavalleresche vengono esaltate e dove si narrano le epiche gesta degli eroi in difesa della fede. La maestosa Cappella Palatina, cuore architettonico della città, è il simbolo del profondo legame tra il potere temporale dell'imperatore e l'autorità spirituale della Chiesa."
    },
    {
      id: "theme_destino",
      category: "Schede Tematiche",
      title: "Il destino",
      summary: "IL CONCETTO DI FATO, MOIRA E FATUM NEI GRANDI POEMI EPICI IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  NEL MONDO EPICO IL <span style="color: #ea580c;">DESTINO</span> NON È UNA SCELTA DELL'UOMO, MA UN DISEGNO SUPERIORE TRACCIATO DAGLI DEI E DALLE FORZE COSMICHE. NEI POEMI GRECI QUESTA FORZA INELUTTABILE SI CHIAMA <span style="color: #2563eb;">MOIRA</span>, CHE ASSEGNA AD OGNI MORTALE UNA SORTE PRECISA SIN DALLA NASCITA. ACHILLE SA CHE LA GLORIA ETERNA COSTERÀ LA VITA, EPPURE SCEGLIE DI COMBATTERE. ULISSE DEVE PASSARE PER LE SOFFERENZE DEL MARE PRIMA DI RAGGIUNGERE ITACA. NELL'ENEIDE IL <span style="color: #16a34a;">FATUM</span> DI ENEA COINCIDE CON I PIANI DI GIOVE PER LA FONDAZIONE DI ROMA, E NESSUNA FORZA — NEMMENO L'AMORE PER DIDONE — PUÒ FERMARLO. ANCHE I NIBELUNGHI VIVONO SOTTO L'OMBRA DI UN DESTINO MALEDETTO SEGNATO DALL'ORO DEL RENO.
</div>`
    },
    {
      id: "theme_amicizia",
      category: "Schede Tematiche",
      title: "L'amicizia",
      summary: "IL VALORE DEL LEGAME TRA COMPAGNI D'ARME E FIDATI ALLEATI IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  L'<span style="color: #2563eb;">AMICIZIA</span> TRA COMPAGNI COSTITUISCE UNO DEI TEMI PIÙ POTENTI DELL'EPICA. IL LEGAME TRA <span style="color: #ea580c;">ACHILLE E PATROCLO</span> NELL'ILIADE TRASCENDE LA SEMPLICE CAMARADERIA: LA MORTE DI PATROCLO RISVEGLIA L'EROE DAL SUO LETARGO D'IRA E LO SPINGE A TORNARE IN BATTAGLIA, ACCETTANDO IL PROPRIO DESTINO MORTALE PUR DI VENDICARE L'AMICO. NELL'ODISSEA L'AMICIZIA TRA ULISSE E I SUOI COMPAGNI DI NAVIGAZIONE È CONTINUAMENTE MESSA ALLA PROVA, EVIDENZIANDO QUANTO LA FEDELTÀ SIA UN DONO PREZIOSO. NEI CICLI MEDIEVALI TROVIAMO LA <span style="color: #16a34a;">FRATELLANZA D'ARMI</span> TRA I PALADINI DI CARLO MAGNO, LA TAVOLA ROTONDA DI ARTÙ E IL PATTO TRA ORLANDO E OLIVIERO, SPECCHIO DI LEALTÀ ASSOLUTA.
</div>`
    },
    {
      id: "theme_vendetta",
      category: "Schede Tematiche",
      title: "La vendetta",
      summary: "IL CICLO SENZA FINE DELL'ODIO E DELLA RIVALSA NEI POEMI EPICI IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  LA <span style="color: #ea580c;">VENDETTA</span> È UN MOTORE NARRATIVO POTENTE NELL'EPICA: ESSA ALIMENTA CONFLITTI CHE SPESSO SUPERANO I CONFINI DELLA VITA DEL SINGOLO EROE. ACHILLE NON COMBATTE PER CONQUISTARE TROIA, MA PER VENDICARE LA MORTE DI <span style="color: #2563eb;">PATROCLO</span>. NELL'ODISSEA ULISSE TORNA A ITACA E STERMINARA I PROCI IN UNO SLANCIO DI GIUSTIZIA E RISCATTO. NEL CICLO DEI NIBELUNGHI <span style="color: #16a34a;">CRIMILDE</span> CONSACRA L'INTERA SECONDA PARTE DELLA SUA VITA ALL'IMPLACABILE PIANIFICAZIONE DELLA MORTE DI HAGEN, ARRIVANDO A SPOSARE IL RE DEGLI UNNI SOLO PER USARLO COME STRUMENTO DI DISTRUZIONE. IL TEMA DELLA VENDETTA RIVELA COME L'ODIO POSSA CORROMPERE ANCHE LE ANIME PIÙ NOBILI.
</div>`
    },
    {
      id: "theme_amore",
      category: "Schede Tematiche",
      title: "L'amore",
      summary: "LE DIVERSE FORME DELL'EROS E DELL'AMOR CORTESE DALL'EPICA CLASSICA AL MEDIOEVO IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  L'<span style="color: #2563eb;">AMORE</span> NELL'EPICA CAMBIA FORMA E SIGNIFICATO A SECONDA DEL CONTESTO STORICO-CULTURALE. NELL'ILIADE L'EROS HA FORZA COSMICA: È L'AMORE DI PARIDE PER <span style="color: #ea580c;">ELENA</span> A SCATENARE UNA GUERRA DI DIECI ANNI. NELL'ODISSEA L'AMORE CONIUGALE TRA ULISSE E PENELOPE È RESISTENZA, FEDELTÀ E PROMESSA. NELL'ENEIDE L'AMORE TRAGICO TRA <span style="color: #16a34a;">ENEA E DIDONE</span> INCARNA IL DRAMMA DI CHI DEVE SCEGLIERE TRA IL CUORE E IL DOVERE. NEL MEDIOEVO NASCE L'<span style="color: #2563eb;">AMOR CORTESE</span>: UN AMORE PURIFICANTE E SPIRITUALIZZATO (LANCILLOTTO-GINEVRA, TRISTANO-ISOTTA) CHE INNALZA L'AMANTE E LO RENDE VIRTUOSO, MA CHE TALVOLTA ENTRA IN CONFLITTO CON LA LEALTÀ VERSO IL PROPRIO SIGNORE.
</div>`
    },
    {
      id: "theme_tradimento",
      category: "Schede Tematiche",
      title: "Il tradimento",
      summary: "L'INGANNO E LA ROTTURA DEL PATTO DI LEALTÀ COME CAUSA DI TRAGEDIA IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  IL <span style="color: #ea580c;">TRADIMENTO</span> È LA SCINTILLA CHE INNESCA LE TRAGEDIE PIÙ DEVASTANTI DEI POEMI EPICI. IL TRADIMENTO DI <span style="color: #2563eb;">GANO DI MAGANZA</span> CAUSA L'IMBOSCATA DI RONCISVALLE E LA MORTE DI ORLANDO E DELL'INTERA RETROGUARDIA FRANCA: UN ATTO CODARDO CHE MACCHIA PER SEMPRE L'ONORE DEL VASSALLO. NEL CICLO DEI NIBELUNGHI <span style="color: #16a34a;">HAGEN</span> TRADISCE L'OSPITALITÀ SACRA UCCIDENDO SIGFRIDO A TRADIMENTO DURANTE UNA CACCIA. NEL CICLO BRETONE, L'AMORE DI LANCILLOTTO PER GINEVRA RAPPRESENTA IL TRADIMENTO INVOLONTARIO VERSO IL RE E L'IDEALE DELLA TAVOLA ROTONDA. OGNI TRADIMENTO NELL'EPICA NON È MAI IMPUNITO: SCATENA SEMPRE UNA CATENA DI CONSEGUENZE CHE PORTA ALLA ROVINA DEI TRADITORI E DEI TRADITI.
</div>`
    },
    {
      id: "theme_fedelta",
      category: "Schede Tematiche",
      title: "La fedeltà",
      summary: "LA LEALTÀ E IL RISPETTO DEI VINCOLI DI ONORE COME VIRTÙ EROICA IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  LA <span style="color: #16a34a;">FEDELTÀ</span> È IL CONTRALTARE VIRTUOSO DEL TRADIMENTO E COSTITUISCE IL CODICE D'ONORE DEGLI EROI. <span style="color: #2563eb;">PENELOPE</span> INCARNA LA FEDELTÀ CONIUGALE PIÙ ASSOLUTA: ASPETTA IL MARITO VENT'ANNI SENZA CEDERE AI PRETENDENTI, PROTEGGENDO ITACA E L'ONORE DELLA SUA CASA. <span style="color: #ea580c;">ENEA</span> È FEDELE AGLI DEI E AL SUO DESTINO ANCHE QUANDO QUESTO SIGNIFICA ABBANDONARE DIDONE E LA FELICITÀ PERSONALE. NEI CICLI MEDIEVALI LA FEDELTÀ AL PROPRIO SIGNORE (VASSALLO → SIGNORE) COSTITUISCE IL CARDINE DEL SISTEMA FEUDALE: I PALADINI GIURANO LEALTÀ A CARLO MAGNO, I CAVALIERI AD ARTÙ, E QUESTA LEALTÀ LI RENDE NOBILI. ANCHE IL VECCHIO CANE ARGO DI ULISSE, CHE MUORE APPENA RIVEDE IL PADRONE, DIVENTA SIMBOLO DI FEDELTÀ ETERNA.
</div>`
    },
    {
      id: "theme_patria",
      category: "Schede Tematiche",
      title: "La patria",
      summary: "IL SENSO DI APPARTENENZA AL PROPRIO POPOLO E ALLA PROPRIA TERRA IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  LA <span style="color: #2563eb;">PATRIA</span> — LA TERRA NATIA, IL PROPRIO POPOLO, LE TRADIZIONI — È UNO DEI VALORI PIÙ PROFONDI ATTORNO A CUI RUOTANO I POEMI EPICI. <span style="color: #ea580c;">ETTORE</span> DIFENDE TROIA SAPENDO CHE MORRÀ, PER AMORE DELLA SUA FAMIGLIA E DELLA SUA CITTÀ. <span style="color: #16a34a;">ULISSE</span> RINUNCIA ALL'IMMORTALITÀ OFFERTA DALLA NINFA CALIPSO PUR DI TORNARE ALLA ROCCIOSA ITACA: LA PATRIA VALE PIÙ DELL'ETERNITÀ. NELL'ENEIDE ENEA PORTA CON SÉ NON ORO O RICCHEZZE, MA I PENATI E LA MEMORIA DI TROIA, PERCHÉ LA VERA PATRIA SOPRAVVIVE NEI VALORI, NEI RITI E NELLA MEMORIA DEL PROPRIO POPOLO. ANCHE IL SACRIFICIO DI ORLANDO A RONCISVALLE HA UNA DIMENSIONE PATRIOTTICA: MUORE PER L'IMPERO CRISTIANO DI CARLO MAGNO, PER UNA PATRIA SPIRITUALE PIÙ GRANDE.
</div>`
    },
    {
      id: "theme_conoscenza",
      category: "Schede Tematiche",
      title: "La conoscenza",
      summary: "LA SETE DI SAPERE E IL RUOLO DEL POETA COME CUSTODE DELLA MEMORIA IN MAIUSCOLO.",
      content: `<div style="font-weight: bold; line-height: 1.8; font-size: 0.95rem; color: #1f2937; text-align: justify; text-transform: uppercase;">
  LA <span style="color: #2563eb;">CONOSCENZA</span> È UNA DELLE SPINTE PIÙ POTENTI CHE MUOVONO GLI EROI EPICI. <span style="color: #ea580c;">ULISSE</span> RISCHIA LA VITA PER ASCOLTARE IL CANTO DELLE SIRENE: PREFERISCE CONOSCERE (LEGATO ALL'ALBERO) PIUTTOSTO CHE IGNORARE. DANTE, NELL'INFERNO, METTE IN BOCCA AD ULISSE L'ESORTAZIONE PIÙ BELLA SULLA SETE DI CONOSCENZA: "FATTI NON FOSTE A VIVER COME BRUTI, MA PER SEGUIR VIRTUTE E CANOSCENZA." IL <span style="color: #16a34a;">POETA-AEDO</span> (OMERO, VIRGILIO) STESSO È IL SUPREMO CUSTODE DELLA CONOSCENZA: TRAMANDA LE GESTA DEGLI EROI PER PRESERVARLE DALL'OBLIO. NEL TEMPIO DELLO STUDIO DI QUESTO GIOCO, TU SEI L'EREDE DI QUESTA TRADIZIONE: OGNI SCHEDA È UNA TESSERA DEL GRANDE MOSAICO DELLA CIVILTÀ LETTERARIA.
</div>`
    }
  ],

  citations: [
    { text: "Cantami, o Diva, del pelide Achille l'ira funesta...", author: "Omero, Iliade" },
    { text: "Considerate la vostra semenza: fatti non foste a viver come bruti, ma per seguir virtute e canoscenza.", author: "Dante, Inferno (riferito a Ulisse)" },
    { text: "Canto le armi e l'uomo che per primo dalle coste di Troia giunse profugo in Italia...", author: "Virgilio, Eneide" },
    { text: "Il re Carlo, il nostro grande imperatore, per sette anni interi è rimasto in Spagna...", author: "Turoldo, Chanson de Roland" }
  ],

  brani: [
    { title: "L'inganno del Cavallo", text: "I capi dei Greci, stanchi della guerra che durava ormai da dieci anni, idearono un inganno su suggerimento di Ulisse. Costruirono un enorme cavallo di legno, all'interno del quale si nascosero i guerrieri più valorosi. Finsero poi di levare l'ancora e abbandonare la spiaggia...", book: "Iliade / Eneide II" },
    { text: "Quando Orlando sente che la morte lo sovrasta, si stende sotto un pino, volge il viso verso la Spagna pagana e stringe al petto la sua Durendal...", book: "Chanson de Roland" }
  ],

  shop_items: [
    // Comuni
    { id: "item_indizio", name: "Indizio Extra", desc: "Rivela un piccolo suggerimento durante lo svolgimento di un quiz.", price: 15, rarity: "Comune", type: "consumable", stock: 99, active: true },
    { id: "item_ritentativo", name: "Secondo Tentativo", desc: "Ti permette di riprovare un quiz fallito senza perdere Dracme.", price: 25, rarity: "Comune", type: "consumable", stock: 99, active: true },
    { id: "item_skin_scudo", name: "Cornice Dorata Avatar", desc: "Una splendida cornice dorata per decorare il tuo avatar nel profilo.", price: 30, rarity: "Comune", type: "permanent", stock: 99, active: true },
    
    // Rari
    { id: "item_mappa_conc", name: "Mappa Concettuale", desc: "Sblocca una mappa riassuntiva di un capitolo per aiutarti nello studio.", price: 50, rarity: "Raro", type: "consumable", stock: 20, active: true },
    { id: "item_protezione_errore", name: "Protezione Errore", desc: "Annulla la prima risposta sbagliata data in una verifica in classe.", price: 60, rarity: "Raro", type: "consumable", stock: 15, active: true },
    
    // Epici
    { id: "item_bonus_xp", name: "Elisir dell'Esperienza", desc: "Raddoppia gli XP guadagnati nella prossima missione.", price: 100, rarity: "Epico", type: "consumable", stock: 10, active: true },
    { id: "item_tridente_replica", name: "Replica Tridente Poseidone", desc: "+2 Coraggio temporaneo per 3 giorni.", price: 110, rarity: "Epico", type: "consumable", stock: 5, active: true },

    // Leggendari
    { id: "item_excalibur_pass", name: "Patto di Spada Excalibur", desc: "Sblocca la spada Excalibur nell'inventario permanente.", price: 180, rarity: "Leggendario", type: "permanent", stock: 1, active: true },
    { id: "item_aiutante_zeus", name: "Benedizione di Zeus", desc: "Sblocca Zeus come aiutante per il secondo quadrimestre.", price: 250, rarity: "Leggendario", type: "permanent", stock: 1, active: true }
  ],

  tournaments: [],

  activity_logs: [
    { timestamp: "2026-06-09T20:30:00Z", user: "system", action: "Inizializzazione del database di Eroi in Viaggio completata." }
  ]
};
