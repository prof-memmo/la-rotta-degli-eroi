// Eroi in Viaggio - Mini-giochi Interattivi (v2)
// Impiccato, Puzzle, Cloze, Riordina i versi — con contenuti tematici per missione

(function() {

  // =====================================================
  // DATABASE TEMATICO PER MISSIONE
  // =====================================================

  const MISSION_DATA = {

    // --- PRIMO VIAGGIO ---
    quiz_inizio: {
      topic: "Concetti di base dell'Epica",
      impiccato: [
        { word: "MITO", hint: "Racconto sacro che spiega fenomeni naturali" },
        { word: "EPICA", hint: "Genere letterario delle grandi gesta eroiche" },
        { word: "LEGGENDA", hint: "Mescola fantasia e realtà, tramandato oralmente" },
        { word: "VOLGARE", hint: "La lingua parlata dal popolo nel Medioevo" },
        { word: "AEDO", hint: "Il cantastorie dell'antica Grecia" },
        { word: "GESTA", hint: "Le imprese eroiche cantate nelle chansons" },
        { word: "ORALE", hint: "Trasmissione senza scrittura, a voce" },
        { word: "FIORENTINO", hint: "Dialetto base dell'italiano moderno" }
      ],
      puzzle: [
        { words: ["Il", "mito", "spiega", "fenomeni", "naturali", "attraverso", "l'immaginazione"], solution: "Il mito spiega fenomeni naturali attraverso l'immaginazione", source: "Definizione di Mito" },
        { words: ["L'aedo", "era", "il", "cantastorie", "dell'antica", "Grecia"], solution: "L'aedo era il cantastorie dell'antica Grecia", source: "L'Aedo" },
        { words: ["La", "leggenda", "mescola", "fantasia", "e", "realtà"], solution: "La leggenda mescola fantasia e realtà", source: "Definizione di Leggenda" }
      ],
      cloze: [
        { text: "Il ___ è un racconto tramandato che spiega l'origine di eventi ___ attraverso l'immaginazione.", blanks: ["mito", "naturali"], source: "Il Mito" },
        { text: "La ___ è il dialetto ___ parlato dal popolo nel territorio. Quello ___ è la base dell'italiano.", blanks: ["lingua", "volgare", "fiorentino"], source: "Il Volgare" }
      ],
      versi: [
        { title: "Definizione di Epica", lines: ["L'Epica è il genere letterario più antico,", "che narra in versi le grandi gesta degli eroi,", "cantate dagli aedi nelle corti dei re,", "trasmesse oralmente di generazione in generazione."], hint: "Definisci l'Epica partendo dalla sua natura antica." },
        { title: "Il Mito e la Leggenda", lines: ["Il Mito narra di dei e prodigi cosmici,", "la Leggenda di eroi in un passato storico.", "Entrambi si tramandano per via orale,", "ma solo il Mito è considerato sacro e vero."], hint: "Distingui prima il Mito, poi la Leggenda." }
      ],
      cantami_o_diva: [
        "Spiega la differenza principale tra Mito e Leggenda.",
        "Cos'è il genere letterario dell'Epica e cosa narra?"
      ]
    },

    quiz_fondazione: {
      topic: "Luoghi e Miti di Fondazione",
      impiccato: [
        { word: "TROIA", hint: "Città dell'Asia Minore, distrutta dopo 10 anni di assedio" },
        { word: "ROMA", hint: "Città eterna fondata da Romolo, legata al mito di Enea" },
        { word: "CARTAGINE", hint: "Città nordafricana fondata da Didone, amata da Enea" },
        { word: "ITACA", hint: "Patria di Ulisse, isola montuosa dello Ionio" },
        { word: "CAMELOT", hint: "Il leggendario castello di Re Artù e della Tavola Rotonda" },
        { word: "AQUISGRANA", hint: "Sede del palazzo di Carlo Magno e della sua cappella" },
        { word: "LAVINIO", hint: "Città fondata da Enea nel Lazio, in onore della sposa Lavinia" }
      ],
      puzzle: [
        { words: ["I", "miti", "di", "fondazione", "spiegano", "le", "origini", "delle", "città"], solution: "I miti di fondazione spiegano le origini delle città", source: "Miti di Fondazione" },
        { words: ["Enea", "è", "il", "mitico", "progenitore", "della", "stirpe", "romana"], solution: "Enea è il mitico progenitore della stirpe romana", source: "Il Lazio e Roma" }
      ],
      cloze: [
        { text: "Enea fuggì da ___ in fiamme e, dopo lunghe peripezie, giunse nel ___ per fondare la città di ___.", blanks: ["Troia", "Lazio", "Lavinio"], source: "Il viaggio di Enea" },
        { text: "La regina ___ fondò la città di ___ prima di innamorarsi e venire abbandonata da Enea.", blanks: ["Didone", "Cartagine"], source: "Didone e Cartagine" }
      ],
      versi: [
        { title: "Le origini di Roma", lines: ["Dalle ceneri calde di Troia distrutta,", "Enea salpa profugo per volere del fato,", "giunge nel Lazio e sposa Lavinia,", "dando inizio alla stirpe che fonderà Roma."], hint: "La successione dal fuoco troiano alla fondazione romana." },
        { title: "Camelot e la Tavola Rotonda", lines: ["A Camelot si radunano i nobili cavalieri,", "sotto il comando del leggendario re Artù,", "giurando fedeltà alla sacra corona,", "in cerca del Graal e della vera giustizia."], hint: "La vita ed i valori a Camelot." }
      ],
      cantami_o_diva: [
        "Spiega l'importanza di Troia e Roma come miti di fondazione dell'Eneide.",
        "Qual è il legame tra Didone, Cartagine ed Enea?",
        "Descrivi Camelot e il suo significato nel ciclo bretone."
      ]
    },

    quiz_autori: {
      topic: "Gli Autori dell'Epica",
      impiccato: [
        { word: "OMERO", hint: "Il leggendario aedo cieco autore di Iliade e Odissea" },
        { word: "VIRGILIO", hint: "Il sommo poeta romano autore dell'Eneide" },
        { word: "TUROLDO", hint: "Presunto autore della Chanson de Roland" },
        { word: "IONIA", hint: "Regione dell'Asia Minore dove viveva Omero" },
        { word: "MARONE", hint: "Secondo cognome di Publio Virgilio ___" },
        { word: "AUGUSTO", hint: "L'imperatore per cui Virgilio scrisse l'Eneide" },
        { word: "MECENATE", hint: "Il grande protettore delle arti che commissionò l'Eneide" },
        { word: "OMERICA", hint: "Questione ___ : il dubbio sull'esistenza di Omero" }
      ],
      puzzle: [
        { words: ["Omero", "è", "l'autore", "dell'Iliade", "e", "dell'Odissea"], solution: "Omero è l'autore dell'Iliade e dell'Odissea", source: "Omero" },
        { words: ["Virgilio", "scrisse", "l'Eneide", "su", "commissione", "di", "Augusto"], solution: "Virgilio scrisse l'Eneide su commissione di Augusto", source: "Virgilio" },
        { words: ["La", "Questione", "Omerica", "dibatte", "sull'esistenza", "reale", "di", "Omero"], solution: "La Questione Omerica dibatte sull'esistenza reale di Omero", source: "Questione Omerica" }
      ],
      cloze: [
        { text: "Omero avrebbe composto i suoi poemi in ___, nella regione della ___. Secondo la tradizione era ___.", blanks: ["IX-VIII sec. a.C.", "Ionia", "cieco"], source: "Omero" },
        { text: "Il nome completo di Virgilio è Publio ___ ___. Scrisse l'Eneide per glorificare ___ e la sua dinastia.", blanks: ["Virgilio", "Marone", "Augusto"], source: "Virgilio" }
      ],
      versi: [
        { title: "Chi era Omero?", lines: ["Omero, il cieco cantore dell'Asia Minore,", "compose in greco antico i poemi immortali.", "Ma esisteva davvero? La Questione Omerica", "ancora oggi divide gli studiosi del mondo."], hint: "Presenta Omero, poi accenna alla Questione Omerica." },
        { title: "Virgilio e Augusto", lines: ["Publio Virgilio Marone, sommo poeta di Roma,", "su commissione di Mecenate e volere di Augusto,", "scrisse l'Eneide per glorificare la stirpe romana", "e le divine origini della casata imperiale."], hint: "Chi commissionò l'Eneide e perché?" }
      ],
      cantami_o_diva: [
        "Chi era Omero e cos'è la Questione Omerica?",
        "Chi era Virgilio e perché scrisse l'Eneide?"
      ]
    },

    quiz_opere: {
      topic: "Le Opere dell'Epica Classica",
      impiccato: [
        { word: "ILIADE", hint: "24 canti, l'ira di Achille contro i Troiani" },
        { word: "ODISSEA", hint: "24 canti, il viaggio di Ulisse verso Itaca" },
        { word: "ENEIDE", hint: "12 libri, Enea fonda la stirpe romana" },
        { word: "PROEMIO", hint: "Il verso iniziale che enuncia il tema dell'opera" },
        { word: "NOSTOS", hint: "Il ritorno in patria, tema centrale dell'Odissea" },
        { word: "PIETAS", hint: "La virtù principale di Enea: fedeltà agli dei e alla patria" },
        { word: "TROIANI", hint: "I difensori della città di Ilio nell'Iliade" },
        { word: "ACHEI", hint: "Il nome collettivo dei Greci nell'Iliade" }
      ],
      puzzle: [
        { words: ["Cantami", "o", "Diva", "del", "pelide", "Achille", "l'ira", "funesta"], solution: "Cantami o Diva del pelide Achille l'ira funesta", source: "Proemio dell'Iliade" },
        { words: ["Canto", "le", "armi", "e", "l'uomo", "che", "per", "primo", "giunse", "in", "Italia"], solution: "Canto le armi e l'uomo che per primo giunse in Italia", source: "Proemio dell'Eneide" },
        { words: ["Dimmi", "o", "Musa", "dell'eroe", "dai", "mille", "artifici", "che", "a", "lungo", "errò"], solution: "Dimmi o Musa dell'eroe dai mille artifici che a lungo errò", source: "Proemio dell'Odissea" }
      ],
      cloze: [
        { text: "L'Iliade ha ___ canti e narra l'ira di ___ contro ___ durante il decimo anno della guerra di Troia.", blanks: ["24", "Achille", "Agamennone"], source: "L'Iliade" },
        { text: "L'Odissea racconta il ___ (ritorno) di Ulisse dopo ___ anni. Il tema principale è la fedeltà di ___.", blanks: ["nostos", "dieci", "Penelope"], source: "L'Odissea" }
      ],
      versi: [
        { title: "Proemio dell'Iliade", lines: ["Cantami, o Diva, del pelide Achille", "l'ira funesta che infiniti addusse", "lutti agli Achei, molte anzi tempo all'Orco", "generose travolse alme d'eroi."], hint: "Il proemio inizia con l'invocazione alla Musa. Il tema è l'ira di Achille." },
        { title: "Proemio dell'Odissea", lines: ["Dimmi, o Musa, dell'eroe multiforme,", "che tanto vagò, dopo che distrusse", "la rocca sacra di Troia:", "di molti uomini vide le città e conobbe i costumi."], hint: "Il proemio dell'Odissea enuncia il viaggio dell'eroe astuto." },
        { title: "Proemio dell'Eneide", lines: ["Canto le armi e l'uomo che per primo", "dalle coste di Troia, profugo per decreto del fato,", "giunse in Italia e al lido di Lavinio;", "molto fu sballottato per terra e per mare."], hint: "Il proemio dell'Eneide enuncia il destino di Enea: fondare Roma." }
      ],
      cantami_o_diva: [
        "Qual è il tema principale dell'Iliade e chi ne è il protagonista?",
        "Cos'è il 'nostos' nell'Odissea?",
        "Qual è la missione di Enea nell'Eneide?"
      ]
    },

    // --- MITOLOGIA ---
    mit_caos: {
      topic: "Il Caos Primordiale e le Origini",
      impiccato: [
        { word: "CAOS", hint: "Il vuoto primordiale da cui nacquero gli dei" },
        { word: "GEA", hint: "La Terra, prima dea nata dal Caos" },
        { word: "URANO", hint: "Il Cielo, sposo di Gea" },
        { word: "CRONO", hint: "Il titano che divorava i propri figli" },
        { word: "TITANI", hint: "I figli di Urano e Gea, sconfitti da Zeus" },
        { word: "PROMETEO", hint: "Il titano che donò il fuoco agli uomini" },
        { word: "OLIMPO", hint: "Il monte sacro dove vivevano i dodici dei" },
        { word: "PANDORA", hint: "La prima donna, punizione di Zeus per gli uomini" }
      ],
      puzzle: [
        { words: ["Dal", "Caos", "primordiale", "nacque", "prima", "la", "Terra", "poi", "il", "Cielo"], solution: "Dal Caos primordiale nacque prima la Terra poi il Cielo", source: "La Cosmogonia" },
        { words: ["Prometeo", "rubò", "il", "fuoco", "agli", "dei", "e", "lo", "donò", "agli", "uomini"], solution: "Prometeo rubò il fuoco agli dei e lo donò agli uomini", source: "Il Mito di Prometeo" }
      ],
      cloze: [
        { text: "Dal ___ primordiale nacque Gea, la ___. Dal loro unione nacquero i ___, che regnarono prima degli dei.", blanks: ["Caos", "Terra", "Titani"], source: "Le Origini" },
        { text: "___ rubò il fuoco agli dei e lo donò agli ___. Come punizione Zeus lo incatenò a una ___ dove un'aquila gli divorava il fegato.", blanks: ["Prometeo", "uomini", "roccia"], source: "Prometeo" }
      ],
      versi: [
        { title: "Il Caos e le Origini", lines: ["Prima di tutto fu il Caos, vuoto e buio,", "poi Gea, la vasta Terra, fondamento di tutto,", "poi Urano, il Cielo stellato, la colmò d'amore,", "e da loro nacquero i Titani immortali."], hint: "Descrivere la cosmogonia: Caos, Gea, Urano, Titani." },
        { title: "Il Dono di Prometeo", lines: ["Prometeo, il titano dal cuore nobile,", "vide gli uomini al freddo e nell'ignoranza,", "salì sull'Olimpo e rubò il sacro fuoco,", "portandolo agli uomini come dono immortale."], hint: "Il titano sale, ruba il fuoco, lo dona." }
      ],
      cantami_o_diva: [
        "Descrivi la nascita del cosmo a partire dal Caos primordiale.",
        "Chi era Prometeo e quale dono fece agli uomini sfidando Zeus?"
      ]
    },

    mit_dei: {
      topic: "Gli Dei dell'Olimpo",
      impiccato: [
        { word: "ZEUS", hint: "Re degli dei, signore del fulmine" },
        { word: "ERA", hint: "Regina dell'Olimpo, dea del matrimonio" },
        { word: "ATENA", hint: "Dea della saggezza, nata dalla testa di Zeus" },
        { word: "APOLLO", hint: "Dio del sole, della musica e delle profezie" },
        { word: "POSEIDONE", hint: "Dio del mare e dei terremoti con il tridente" },
        { word: "AFRODITE", hint: "Dea dell'amore, nata dalla spuma del mare" },
        { word: "ERMES", hint: "Messaggero degli dei con i sandali alati" },
        { word: "ARTEMIDE", hint: "Dea della caccia, gemella di Apollo" }
      ],
      puzzle: [
        { words: ["Zeus", "è", "il", "re", "degli", "dei", "signore", "del", "fulmine", "e", "dell'Olimpo"], solution: "Zeus è il re degli dei signore del fulmine e dell'Olimpo", source: "Zeus" },
        { words: ["Atena", "nacque", "già", "adulta", "e", "armata", "dalla", "testa", "di", "Zeus"], solution: "Atena nacque già adulta e armata dalla testa di Zeus", source: "Atena" }
      ],
      cloze: [
        { text: "___, in latino Giove, è il re degli dei e regna sull'___. Scaglia ___ come arma.", blanks: ["Zeus", "Olimpo", "fulmini"], source: "Zeus" },
        { text: "Poseidone, in latino ___, domina i ___ col suo tridente. È nemico di Ulisse perché questi accecò suo figlio ___.", blanks: ["Nettuno", "mari", "Polifemo"], source: "Poseidone" }
      ],
      versi: [
        { title: "I Dodici dell'Olimpo", lines: ["Zeus regna con la folgore sul monte sacro,", "Era, sposa e sorella, governa i matrimoni,", "Atena è saggezza, Apollo luce e poesia,", "Poseidone scuote il mare con il tridente."], hint: "Elenca le divinità principali e le loro funzioni." }
      ],
      cantami_o_diva: [
        "Presenta le principali caratteristiche di Zeus e di sua sorella/sposa Era.",
        "Parla di Atena, della sua nascita prodigiosa e di cosa rappresenta."
      ]
    },

    // --- ILIADE ---
    ili_achille: {
      topic: "L'Iliade: Achille e la Guerra di Troia",
      impiccato: [
        { word: "ACHILLE", hint: "Il più forte dei Greci, ucciso da una freccia al tallone" },
        { word: "ETTORE", hint: "Il più nobile guerriero troiano, ucciso da Achille" },
        { word: "PATROCLO", hint: "Il caro amico di Achille, ucciso da Ettore" },
        { word: "AGAMENNONE", hint: "Il comandante supremo dell'esercito acheo" },
        { word: "PARIDE", hint: "Principe troiano che rapì Elena e uccise Achille" },
        { word: "PRIAMO", hint: "Il vecchio re di Troia" },
        { word: "MENELAO", hint: "Il marito tradito di Elena, re di Sparta" },
        { word: "ARISTEIA", hint: "La sequenza in cui un eroe compie imprese straordinarie" }
      ],
      puzzle: [
        { words: ["L'ira", "di", "Achille", "contro", "Agamennone", "è", "il", "tema", "centrale", "dell'Iliade"], solution: "L'ira di Achille contro Agamennone è il tema centrale dell'Iliade", source: "L'Iliade" },
        { words: ["Ettore", "combatte", "per", "difendere", "Troia", "e", "la", "sua", "famiglia"], solution: "Ettore combatte per difendere Troia e la sua famiglia", source: "Ettore" }
      ],
      cloze: [
        { text: "L'Iliade narra ___ giorni del decimo anno della guerra. Il tema è l'___ di Achille contro ___ che lo priva della schiava Briseide.", blanks: ["51", "ira", "Agamennone"], source: "L'Iliade" },
        { text: "Dopo la morte di ___, Achille torna a combattere. Uccide ___ e ne trascina il corpo attorno alle mura di ___.", blanks: ["Patroclo", "Ettore", "Troia"], source: "La Vendetta di Achille" }
      ],
      versi: [
        { title: "L'Ira di Achille", lines: ["Cantami, o Diva, del pelide Achille", "l'ira funesta che infiniti addusse", "lutti agli Achei, molte anzi tempo all'Orco", "generose travolse alme d'eroi."], hint: "Il proemio annuncia il tema: l'ira di Achille." },
        { title: "Addio di Ettore e Andromaca", lines: ["Ettore tende le braccia al figlio piccolo,", "ma il bimbo piange per il cimiero piumato.", "Sorridendo il padre toglie l'elmo lucente,", "e abbraccia il figlio prima di tornare alla guerra."], hint: "Una scena tenera prima del tragico addio definitivo." }
      ],
      cantami_o_diva: [
        "Spiega perché si scatena l'ira di Achille contro Agamennone.",
        "Racconta l'addio tra Ettore e Andromaca prima della battaglia."
      ]
    },

    // --- ODISSEA ---
    od_viaggio: {
      topic: "L'Odissea: Il Viaggio di Ulisse",
      impiccato: [
        { word: "ULISSE", hint: "Re di Itaca dal multiforme ingegno" },
        { word: "PENELOPE", hint: "La moglie fedele che tesse e distesse la tela" },
        { word: "POLIFEMO", hint: "Il ciclope figlio di Poseidone" },
        { word: "CIRCE", hint: "La maga che trasformò i compagni di Ulisse in maiali" },
        { word: "CALIPSO", hint: "La ninfa che trattenne Ulisse sull'isola per 7 anni" },
        { word: "SIRENE", hint: "Le creature dal canto mortale che attiravano i marinai" },
        { word: "SCILLA", hint: "Il mostro a sei teste che divorava i marinai" },
        { word: "TELEMACO", hint: "Il figlio di Ulisse che parte alla ricerca del padre" }
      ],
      puzzle: [
        { words: ["Ulisse", "legò", "se", "stesso", "all'albero", "per", "ascoltare", "le", "Sirene", "senza", "morire"], solution: "Ulisse legò se stesso all'albero per ascoltare le Sirene senza morire", source: "Il Passo delle Sirene" },
        { words: ["Nessuno", "è", "il", "mio", "nome", "disse", "Ulisse", "al", "ciclope", "Polifemo"], solution: "Nessuno è il mio nome disse Ulisse al ciclope Polifemo", source: "L'Astuzia di Ulisse" }
      ],
      cloze: [
        { text: "Ulisse impiegò ___ anni per tornare a Itaca. Il suo nemico divino era ___, dio del mare, che lo perseguitò dopo l'accecamento di ___.", blanks: ["dieci", "Poseidone", "Polifemo"], source: "L'Odissea" },
        { text: "Il ___ (ritorno in patria) è il tema dell'Odissea. Penelope aspettò il marito per ___ anni tessendo la tela di giorno e ___ di notte.", blanks: ["nostos", "venti", "disfacendola"], source: "Penelope" }
      ],
      versi: [
        { title: "Proemio dell'Odissea", lines: ["Dimmi, o Musa, dell'eroe multiforme,", "che tanto vagò, dopo che distrusse", "la rocca sacra di Troia:", "di molti uomini vide le città e conobbe i costumi."], hint: "Il proemio enuncia il viaggio del multiforme Ulisse." },
        { title: "Il Canto delle Sirene", lines: ["Avvicinatevi, glorioso Ulisse, fermati!", "Le Sirene cantano con voci di miele.", "Ulisse, legato all'albero, supplica i compagni,", "ma loro remano forti, tappi nelle orecchie."], hint: "Prima le Sirene invitano, poi la reazione di Ulisse." }
      ],
      cantami_o_diva: [
        "Descrivi l'incontro tra Ulisse e il ciclope Polifemo.",
        "Come fa Ulisse a salvarsi dal canto ammaliatore delle Sirene?"
      ]
    },

    // --- ENEIDE ---
    en_enea: {
      topic: "L'Eneide: Il Destino di Enea",
      impiccato: [
        { word: "ENEA", hint: "L'eroe troiano destinato a fondare la stirpe romana" },
        { word: "DIDONE", hint: "La regina di Cartagine innamorata di Enea" },
        { word: "ANCHISE", hint: "Il padre di Enea, portato sulle spalle dalla Troia in fiamme" },
        { word: "ASCANIO", hint: "Il figlio di Enea, detto anche Iulo" },
        { word: "TURNO", hint: "Il re dei Rutuli che si oppone ad Enea nel Lazio" },
        { word: "LAVINIA", hint: "La principessa latina destinata a sposare Enea" },
        { word: "SIBILLA", hint: "La profetessa di Cuma che guida Enea agli Inferi" },
        { word: "GIUNONE", hint: "La dea nemica di Enea, lat. di Era, ostacola il suo viaggio" }
      ],
      puzzle: [
        { words: ["Enea", "fuggì", "da", "Troia", "portando", "il", "padre", "Anchise", "sulle", "spalle"], solution: "Enea fuggì da Troia portando il padre Anchise sulle spalle", source: "La Fuga da Troia" },
        { words: ["La", "pietas", "di", "Enea", "è", "il", "senso", "del", "dovere", "verso", "gli", "dei"], solution: "La pietas di Enea è il senso del dovere verso gli dei", source: "La Pietas" }
      ],
      cloze: [
        { text: "L'Eneide è divisa in ___ libri. I primi sei riecheggiano l'___, i secondi sei riecheggiano l'Iliade. Il protagonista è ___, figlio di Venere.", blanks: ["12", "Odissea", "Enea"], source: "L'Eneide" },
        { text: "Enea incarna la ___: fedeltà agli ___, alla ___ e alla famiglia. Questo lo distingue dagli eroi omerici.", blanks: ["pietas", "dei", "patria"], source: "La Pietas" }
      ],
      versi: [
        { title: "Proemio dell'Eneide", lines: ["Canto le armi e l'uomo che per primo", "dalle coste di Troia, profugo per decreto del fato,", "giunse in Italia e al lido di Lavinio;", "molto fu sballottato per terra e per mare."], hint: "Il proemio: le armi, l'uomo, il destino, il viaggio." },
        { title: "La Fuga da Troia", lines: ["Troia brucia, le fiamme divorano i palazzi.", "Enea carica il padre Anchise sulle sue spalle,", "stringe la mano del piccolo Ascanio,", "e fugge nella notte verso un destino incerto."], hint: "Descrivi la partenza di Enea: Troia, Anchise, Ascanio, la fuga." }
      ],
      cantami_o_diva: [
        "Parla dell'amore tragico tra Enea e la regina Didone a Cartagine.",
        "Narra la fuga di Enea da Troia in fiamme col padre Anchise."
      ]
    },
    car_orlando: {
      topic: "Ciclo Carolingio: Carlo Magno e i Paladini",
      impiccato: [
        { word: "ORLANDO", hint: "Il più valoroso paladino di Carlo Magno" },
        { word: "DURENDAL", hint: "La spada indistruttibile di Orlando" },
        { word: "OLIFANTE", hint: "Il corno d'avorio suonato da Orlando a Roncisvalle" },
        { word: "ANGELICA", hint: "La principessa del Catai di cui Orlando si innamora" }
      ],
      puzzle: [
        { words: ["Orlando", "era", "il", "più", "valoroso", "dei", "paladini", "di", "Francia"], solution: "Orlando era il più valoroso dei paladini di Francia", source: "Orlando" }
      ],
      cloze: [
        { text: "Orlando combatte a ___ contro i saraceni. Rifiuta di suonare l'___ fino alla fine.", blanks: ["Roncisvalle", "olifante"], source: "La Battaglia" }
      ],
      versi: [
        { title: "Morte di Orlando", lines: ["Orlando sente che la morte è vicina,", "sul colle erboso si sdraia supino,", "sotto di sé mette la spada Durendal,", "rivolgendo il viso alla terra pagana."], hint: "La morte del paladino a Roncisvalle." }
      ],
      cantami_o_diva: [
        "Chi sono i paladini di Carlo Magno e quali ideali cavallereschi difendono?",
        "Racconta la battaglia di Roncisvalle e la morte eroica di Orlando."
      ]
    },
    bre_artu: {
      topic: "Ciclo Bretone: Re Artù e la Tavola Rotonda",
      impiccato: [
        { word: "CAMELOT", hint: "Il leggendario castello di Re Artù" },
        { word: "EXCALIBUR", hint: "La leggendaria spada estratta dalla roccia" },
        { word: "MERLINO", hint: "Il grande mago consigliere di Artù" },
        { word: "GINEVRA", hint: "La regina sposa di Artù" },
        { word: "LANCELLOTTO", hint: "Il più forte dei cavalieri della Tavola Rotonda" }
      ],
      puzzle: [
        { words: ["I", "cavalieri", "della", "Tavola", "Rotonda", "erano", "tutti", "uguali"], solution: "I cavalieri della Tavola Rotonda erano tutti uguali", source: "Tavola Rotonda" }
      ],
      cloze: [
        { text: "La spada magica di Artù si chiama ___. Fu consegnata dalla Dama del ___.", blanks: ["Excalibur", "Lago"], source: "Excalibur" }
      ],
      versi: [
        { title: "La Cerca del Graal", lines: ["I cavalieri partono da Camelot,", "alla ricerca del calice di Cristo,", "ma solo il puro Galahad", "potrà contemplare il Sacro Graal."], hint: "La sacra cerca del Graal." }
      ],
      cantami_o_diva: [
        "Narra la leggenda della Spada nella Roccia e dell'ascesa di Re Artù.",
        "Cos'è la Tavola Rotonda e qual è il suo significato simbolico?",
        "Spiega l'importanza spirituale della ricerca del Sacro Graal per i cavalieri."
      ]
    },
    nib_sigfrido: {
      topic: "Epica Germanica: Il Canto dei Nibelunghi",
      impiccato: [
        { word: "SIGFRIDO", hint: "L'eroe invulnerabile che uccise il drago" },
        { word: "FAFNIR", hint: "Il drago custode del tesoro dei Nibelunghi" },
        { word: "KRIEMHILD", hint: "La moglie di Sigfrido, nota in italiano come Crimilde" },
        { word: "HAGEN", hint: "Il traditore che scoprì il punto debole di Sigfrido" }
      ],
      puzzle: [
        { words: ["Sigfrido", "divenne", "invulnerabile", "bagnandosi", "nel", "sangue", "del", "drago"], solution: "Sigfrido divenne invulnerabile bagnandosi nel sangue del drago", source: "Sigfrido" }
      ],
      cloze: [
        { text: "Una foglia di ___ si posò sulla schiena di Sigfrido, rendendo quel punto ___.", blanks: ["tiglio", "vulnerabile"], source: "Il Punto Debole" }
      ],
      versi: [
        { title: "Il Tesoro nel Reno", lines: ["Il tesoro d'oro dei Nibelunghi,", "custodito per secoli dai nani,", "viene gettato nel fiume Reno,", "perduto per sempre nel gorgo profondo."], hint: "Il destino finale del tesoro." }
      ],
      cantami_o_diva: [
        "Racconta le imprese di Sigfrido, lo scontro col drago Fafnir e il suo punto debole.",
        "Spiega le cause della vendetta di Crimilde e la fine tragica dei Burgundi."
      ]
    },

    quiz_videogiochi: {
      topic: "I Videogiochi",
      impiccato: [
        { word: "VIDEOGIOCO", hint: "Dispositivo elettronico interattivo con schermo" },
        { word: "MINECRAFT", hint: "Il videogioco più venduto della storia" },
        { word: "INTERNET", hint: "La rete mondiale che ha fatto espandere il gaming negli anni 90" },
        { word: "PLAYSTATION", hint: "Console Sony commercializzata dal 1994" },
        { word: "JOYSTICK", hint: "Periferica che trasforma i movimenti del giocatore" },
        { word: "AVATAR", hint: "L'identità virtuale o alter ego del giocatore" },
        { word: "NINTENDO", hint: "Azienda giapponese ideatrice di Mario e della Wii" }
      ],
      puzzle: [
        { words: ["Il", "videogioco", "è", "un", "medium", "che", "veicola", "un", "messaggio"], solution: "Il videogioco è un medium che veicola un messaggio", source: "Definizione Treccani" },
        { words: ["Minecraft", "ha", "venduto", "oltre", "trecento", "milioni", "di", "copie"], solution: "Minecraft ha venduto oltre trecento milioni di copie", source: "Il più venduto" }
      ],
      cloze: [
        { text: "I primi giochi elettronici sono apparsi negli anni ___. Negli anni ___ con l'avvento di Internet c'è stata una forte ___.", blanks: ["cinquanta", "novanta", "espansione"], source: "Storia dei Videogiochi" }
      ],
      versi: [
        { title: "Il Mondo Virtuale", lines: ["Nel gioco di ruolo online crei il tuo avatar,", "ti immergi in mondi condivisi con altri,", "giochi insieme a persone di tutto il globo,", "creando legami nell'intelligenza collettiva."], hint: "Dall'avatar all'intelligenza collettiva." }
      ],
      cantami_o_diva: [
        "Quali sono le principali tipologie o generi di videogiochi?",
        "Spiega la differenza tra Realtà Aumentata (AR) e Realtà Virtuale (VR)."
      ]
    }
  };

  // Contenuto di default per missioni senza dati specifici
  const DEFAULT_DATA = {
    topic: "Epica Classica e Medievale",
    impiccato: [
      { word: "ACHILLE", hint: "Il più forte guerriero greco dell'Iliade" },
      { word: "ODISSEA", hint: "Poema omerico sul ritorno di Ulisse" },
      { word: "ILIADE", hint: "Poema omerico sulla guerra di Troia" },
      { word: "ENEIDE", hint: "Poema epico latino di Virgilio" },
      { word: "ULISSE", hint: "Re di Itaca dal multiforme ingegno" },
      { word: "ETTORE", hint: "Il più grande eroe troiano" },
      { word: "OMERO", hint: "Il leggendario aedo greco cieco" },
      { word: "VIRGILIO", hint: "Il sommo poeta romano autore dell'Eneide" },
      { word: "ENEA", hint: "L'eroe troiano fondatore della stirpe romana" },
      { word: "DIDONE", hint: "La regina fenicia di Cartagine" },
      { word: "TROIA", hint: "La città assediata per dieci anni dagli Achei" },
      { word: "ORLANDO", hint: "Il più valoroso paladino di Carlo Magno" },
      { word: "DURENDAL", hint: "La spada indistruttibile di Orlando" },
      { word: "CAMELOT", hint: "Il regno di Re Artù e la Tavola Rotonda" },
      { word: "EXCALIBUR", hint: "La spada leggendaria di Re Artù" },
      { word: "PROMETEO", hint: "Il titano che donò il fuoco agli uomini" },
      { word: "POSEIDONE", hint: "Dio del mare e nemico di Ulisse" },
      { word: "GALAHAD", hint: "Il cavaliere puro che trovò il Santo Graal" },
      { word: "MINOTAURO", hint: "Il mostro metà uomo metà toro del labirinto" },
      { word: "PENELOPE", hint: "La moglie fedele che tesse e distesse la tela" }
    ],
    puzzle: [
      { words: ["Cantami", "o", "Diva", "del", "pelide", "Achille", "l'ira", "funesta"], solution: "Cantami o Diva del pelide Achille l'ira funesta", source: "Proemio dell'Iliade" },
      { words: ["Canto", "le", "armi", "e", "l'uomo", "che", "per", "primo", "giunse", "in", "Italia"], solution: "Canto le armi e l'uomo che per primo giunse in Italia", source: "Proemio dell'Eneide" },
      { words: ["Dimmi", "o", "Musa", "dell'eroe", "dai", "mille", "artifici", "che", "a", "lungo", "errò"], solution: "Dimmi o Musa dell'eroe dai mille artifici che a lungo errò", source: "Proemio dell'Odissea" },
      { words: ["Ulisse", "legò", "se", "stesso", "all'albero", "per", "ascoltare", "le", "Sirene", "senza", "morire"], solution: "Ulisse legò se stesso all'albero per ascoltare le Sirene senza morire", source: "L'Odissea" },
      { words: ["Enea", "fuggì", "da", "Troia", "portando", "il", "padre", "Anchise", "sulle", "spalle"], solution: "Enea fuggì da Troia portando il padre Anchise sulle spalle", source: "L'Eneide" }
    ],
    cloze: [
      { text: "Cantami, o ___ , del pelide ___ l'ira ___ che infiniti addusse lutti agli ___.", blanks: ["Diva", "Achille", "funesta", "Achei"], source: "Proemio dell'Iliade" },
      { text: "Ulisse era re di ___ ed era famoso per il suo ___ ingegno. Tornò a casa dopo ___ anni di viaggio.", blanks: ["Itaca", "multiforme", "dieci"], source: "L'Odissea" },
      { text: "Enea fuggì da ___ in fiamme portando sulle spalle il padre ___ e tenendo per mano il figlio ___.", blanks: ["Troia", "Anchise", "Ascanio"], source: "L'Eneide" },
      { text: "Il ___ è un racconto tramandato che spiega l'origine di eventi naturali. La ___ invece mescola elementi di fantasia con la ___.", blanks: ["mito", "leggenda", "realtà"], source: "Definizioni" }
    ],
    versi: [
      { title: "Proemio dell'ILIADE", lines: ["Cantami, o Diva, del pelide Achille", "l'ira funesta che infiniti addusse", "lutti agli Achei, molte anzi tempo all'Orco", "generose travolse alme d'eroi."], hint: "Il proemio annuncia il tema: l'ira di Achille. Inizia con l'invocazione alla Musa." },
      { title: "Proemio dell'ODISSEA", lines: ["Dimmi, o Musa, dell'eroe multiforme,", "che tanto vagò, dopo che distrusse", "la rocca sacra di Troia:", "di molti uomini vide le città e conobbe i costumi."], hint: "Il proemio enuncia il viaggio dell'eroe astuto. Il tema è il nostos, il ritorno." },
      { title: "Proemio dell'ENEIDE", lines: ["Canto le armi e l'uomo che per primo", "dalle coste di Troia, profugo per decreto del fato,", "giunse in Italia e al lido di Lavinio;", "molto fu sballottato per terra e per mare."], hint: "Il proemio dell'Eneide: armi, uomo, destino, Roma." }
    ]
  };

  function getData(missionId) {
    // Prova corrispondenza diretta, poi per prefisso categoria
    if (MISSION_DATA[missionId]) return MISSION_DATA[missionId];
    // Mappatura per categoria da prefisso id
    if (missionId && missionId.startsWith('mit_')) return MISSION_DATA.mit_caos;
    if (missionId && missionId.startsWith('il_')) return MISSION_DATA.ili_achille;
    if (missionId && (missionId.startsWith('od_') || missionId.startsWith('ods_'))) return MISSION_DATA.od_viaggio;
    if (missionId && (missionId.startsWith('en_') || missionId.startsWith('ene_'))) return MISSION_DATA.en_enea;
    return DEFAULT_DATA;
  }

  // =====================================================
  // STATO CORRENTE
  // =====================================================
  let currentMinigame = null;
  let currentMissionId = null;
  let impiccatoState = {};
  let puzzleState = {};
  let clozeState = {};
  let versiState = {};

  // =====================================================
  // API PUBBLICA
  // =====================================================
  window.EroiMinigames = {

    startMinigame: function(type, missionId) {
      currentMissionId = missionId || null;
      const data = getData(missionId);

      const container = document.getElementById('minigame-container');
      const content = document.getElementById('minigame-content');
      const title = document.getElementById('minigame-title');
      if (!container || !content) return;

      // Nasconde le liste
      const missionsContainer = document.getElementById('missions-categories-container');
      const quizContainer = document.getElementById('active-quiz-container');
      if (quizContainer && quizContainer.style.display !== 'none') {
        // Lanciato durante un quiz — non fare nulla di speciale
      }

      container.style.display = 'block';
      currentMinigame = type;
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Label del topic
      const topicBadge = data.topic ? `<span style="font-size:0.75rem; background:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.3); padding:2px 10px; border-radius:4px; color:var(--gold); margin-left:8px;">${data.topic}</span>` : '';

      const typeLabels = {
        impiccato: '🎭 Impiccato',
        puzzle: '🧩 Riordina la Frase',
        cloze: '📝 Cloze — Completa il Testo',
        versi: '📜 Riordina i Versi'
      };
      title.innerHTML = (typeLabels[type] || type) + topicBadge;

      switch(type) {
        case 'impiccato': this.initImpiccato(content, data); break;
        case 'puzzle':    this.initPuzzle(content, data); break;
        case 'cloze':     this.initCloze(content, data); break;
        case 'versi':     this.initVersi(content, data); break;
      }
    },

    closeMinigame: function() {
      const container = document.getElementById('minigame-container');
      if (container) container.style.display = 'none';
      currentMinigame = null;
    },

    // =====================================================
    // IMPICCATO
    // =====================================================
    initImpiccato: function(container, data) {
      const pool = data.impiccato && data.impiccato.length ? data.impiccato : DEFAULT_DATA.impiccato;
      const wordData = pool[Math.floor(Math.random() * pool.length)];
      impiccatoState = { word: wordData.word, hint: wordData.hint, guessed: new Set(), wrongGuesses: 0, maxWrong: 7 };
      this.renderImpiccato(container);
    },

    renderImpiccato: function(container) {
      const s = impiccatoState;
      const word = s.word;

      const parts = [
        '',
        '<line x1="20" y1="130" x2="100" y2="130" stroke="var(--gold)" stroke-width="3"/>',
        '<line x1="60" y1="130" x2="60" y2="20" stroke="var(--gold)" stroke-width="3"/>',
        '<line x1="60" y1="20" x2="100" y2="20" stroke="var(--gold)" stroke-width="3"/>',
        '<line x1="100" y1="20" x2="100" y2="35" stroke="var(--gold)" stroke-width="3"/>',
        '<circle cx="100" cy="45" r="10" stroke="var(--gold)" stroke-width="2" fill="none"/>',
        '<line x1="100" y1="55" x2="100" y2="90" stroke="var(--gold)" stroke-width="2"/><line x1="100" y1="65" x2="85" y2="80" stroke="var(--gold)" stroke-width="2"/><line x1="100" y1="65" x2="115" y2="80" stroke="var(--gold)" stroke-width="2"/>',
        '<line x1="100" y1="90" x2="85" y2="115" stroke="var(--gold)" stroke-width="2"/><line x1="100" y1="90" x2="115" y2="115" stroke="var(--gold)" stroke-width="2"/>'
      ];

      let svg = '';
      for (let i = 0; i <= s.wrongGuesses && i < parts.length; i++) svg += parts[i];

      const wordDisplay = word.split('').map(l => 
        s.guessed.has(l)
          ? `<span style="font-size:1.8rem;font-family:var(--font-heading);color:var(--gold);margin:0 4px;letter-spacing:2px;">${l}</span>`
          : `<span style="font-size:1.8rem;color:var(--text-muted);margin:0 4px;">_</span>`
      ).join('');

      const wrongLetters = [...s.guessed].filter(l => !word.includes(l));
      const won = word.split('').every(l => s.guessed.has(l));
      const lost = s.wrongGuesses >= s.maxWrong;

      const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      let kb = '<div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin-top:14px;">';
      alpha.forEach(l => {
        const isGuessed = s.guessed.has(l);
        const isWrong = isGuessed && !word.includes(l);
        const isOk = isGuessed && word.includes(l);
        let st = 'min-width:36px;height:36px;border-radius:6px;font-weight:bold;font-size:0.82rem;cursor:pointer;border:1px solid;transition:all 0.2s;';
        if (isWrong)   st += 'background:rgba(239,68,68,0.2);border-color:#ef4444;color:#ef4444;';
        else if (isOk) st += 'background:rgba(22,163,74,0.2);border-color:#16a34a;color:#16a34a;';
        else           st += 'background:rgba(212,175,55,0.08);border-color:rgba(212,175,55,0.3);color:var(--text-light);';
        kb += `<button style="${st}" ${isGuessed||won||lost?'disabled':''} onclick="EroiMinigames.guessLetter('${l}')">${l}</button>`;
      });
      kb += '</div>';

      let result = '';
      if (won) {
        result = `<div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;margin-top:16px;">
          <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">🎉 Hai indovinato! +20 XP, +10 Dracme</div>
          <button class="btn" style="margin-top:12px;" onclick="EroiMinigames.rewardAndNext('impiccato',20,10)">Nuova parola</button>
        </div>`;
      } else if (lost) {
        result = `<div style="background:rgba(239,68,68,0.1);border:1px solid #ef4444;border-radius:10px;padding:16px;text-align:center;margin-top:16px;">
          <div style="color:#ef4444;font-weight:bold;">💀 La parola era: <span style="color:var(--gold);">${word}</span></div>
          <button class="btn btn-secondary" style="margin-top:12px;" onclick="EroiMinigames.retryImpiccato()">Riprova</button>
        </div>`;
      }

      container.innerHTML = `
        <div style="display:grid;grid-template-columns:150px 1fr;gap:20px;align-items:start;">
          <div style="text-align:center;">
            <svg width="140" height="140" viewBox="0 0 140 140" style="background:rgba(0,0,0,0.3);border-radius:8px;border:1px solid rgba(212,175,55,0.2);">${svg}</svg>
            <div style="margin-top:6px;font-size:0.8rem;color:var(--text-muted);">Errori: ${s.wrongGuesses}/${s.maxWrong}</div>
          </div>
          <div>
            <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(212,175,55,0.2);border-radius:8px;padding:10px;margin-bottom:12px;font-size:0.84rem;color:var(--text-muted);">
              💡 <em>${s.hint}</em>
            </div>
            <div style="text-align:center;padding:14px 0;letter-spacing:6px;">${wordDisplay}</div>
            ${wrongLetters.length ? `<div style="font-size:0.8rem;color:#ef4444;margin-bottom:6px;">Lettere sbagliate: ${wrongLetters.join(', ')}</div>` : ''}
            ${kb}
          </div>
        </div>
        ${result}`;
    },

    guessLetter: function(l) {
      if (!impiccatoState.word) return;
      impiccatoState.guessed.add(l);
      if (!impiccatoState.word.includes(l)) impiccatoState.wrongGuesses++;
      const c = document.getElementById('minigame-content');
      if (c) this.renderImpiccato(c);
    },

    retryImpiccato: function() {
      const data = getData(currentMissionId);
      const c = document.getElementById('minigame-content');
      if (c) this.initImpiccato(c, data);
    },

    // =====================================================
    // PUZZLE (riordina frase)
    // =====================================================
    initPuzzle: function(container, data) {
      const pool = data.puzzle && data.puzzle.length ? data.puzzle : DEFAULT_DATA.puzzle;
      const ex = pool[Math.floor(Math.random() * pool.length)];
      const shuffled = [...ex.words].sort(() => Math.random() - 0.5);
      puzzleState = { ex, shuffled, selected: [], remaining: [...shuffled] };
      this.renderPuzzle(container);
    },

    renderPuzzle: function(container) {
      const s = puzzleState;
      const correct = s.selected.join(' ') === s.ex.solution;

      const sel = s.selected.length
        ? s.selected.map((w,i) => `<span style="display:inline-block;background:rgba(37,99,235,0.2);border:1px solid #2563eb;border-radius:6px;padding:6px 11px;margin:3px;font-weight:bold;cursor:pointer;color:var(--text-light);" onclick="EroiMinigames.puzzleRemove(${i})">${w}</span>`).join('')
        : '<span style="color:var(--text-muted);font-style:italic;">Clicca le parole nell\'ordine corretto...</span>';

      const rem = s.remaining.map((w,i) =>
        `<button style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.3);border-radius:6px;padding:7px 12px;margin:3px;font-weight:bold;color:var(--text-light);cursor:pointer;transition:all 0.2s;"
         onmouseover="this.style.background='rgba(212,175,55,0.2)'" onmouseout="this.style.background='rgba(212,175,55,0.08)'"
         onclick="EroiMinigames.puzzleAdd(${i})">${w}</button>`
      ).join('');

      const resultHtml = correct ? `
        <div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;margin-top:16px;">
          <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">✅ Perfetto! Frase ricostruita! +15 XP</div>
          <div style="font-size:0.83rem;color:var(--text-muted);margin-top:5px;">Fonte: <em>${s.ex.source}</em></div>
          <button class="btn" style="margin-top:12px;" onclick="EroiMinigames.rewardAndNext('puzzle',15,8)">Nuova frase</button>
        </div>` : '';

      container.innerHTML = `
        <div style="font-size:0.87rem;color:var(--text-muted);margin-bottom:10px;">📖 <em>${s.ex.source}</em></div>
        <div style="min-height:55px;border:1.5px dashed rgba(212,175,55,0.3);border-radius:8px;padding:10px;margin-bottom:14px;background:rgba(0,0,0,0.2);">${sel}</div>
        <div style="margin-bottom:8px;font-size:0.84rem;color:var(--text-muted);">Parole disponibili:</div>
        <div style="min-height:55px;">${rem}</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;">
          <button class="btn btn-secondary" onclick="EroiMinigames.puzzleReset()"><i class="fa-solid fa-rotate-left"></i> Reset</button>
        </div>
        ${resultHtml}`;
    },

    puzzleAdd: function(i) {
      const w = puzzleState.remaining[i];
      puzzleState.selected.push(w);
      puzzleState.remaining.splice(i, 1);
      const c = document.getElementById('minigame-content');
      if (c) this.renderPuzzle(c);
    },
    puzzleRemove: function(i) {
      const w = puzzleState.selected[i];
      puzzleState.remaining.push(w);
      puzzleState.selected.splice(i, 1);
      const c = document.getElementById('minigame-content');
      if (c) this.renderPuzzle(c);
    },
    puzzleReset: function() {
      puzzleState.selected = [];
      puzzleState.remaining = [...puzzleState.shuffled];
      const c = document.getElementById('minigame-content');
      if (c) this.renderPuzzle(c);
    },

    // =====================================================
    // CLOZE
    // =====================================================
    initCloze: function(container, data) {
      const pool = data.cloze && data.cloze.length ? data.cloze : DEFAULT_DATA.cloze;
      const ex = pool[Math.floor(Math.random() * pool.length)];
      clozeState = { ex, answers: new Array(ex.blanks.length).fill('') };
      this.renderCloze(container);
    },

    renderCloze: function(container) {
      const s = clozeState;
      let idx = 0;
      const textHtml = s.ex.text.replace(/_+/g, () => {
        const i = idx++;
        return `<input type="text" id="cloze-${i}" value="${s.answers[i]||''}"
          style="width:120px;background:rgba(37,99,235,0.1);border:1.5px solid rgba(37,99,235,0.4);border-radius:6px;padding:4px 8px;color:var(--text-light);font-weight:bold;text-align:center;font-size:0.9rem;"
          oninput="EroiMinigames.updateCloze(${i},this.value)" placeholder="___">`;
      });

      container.innerHTML = `
        <div style="background:rgba(0,0,0,0.3);border:1.5px solid rgba(212,175,55,0.2);border-radius:10px;padding:18px;margin-bottom:16px;">
          <div style="font-size:0.84rem;color:var(--text-muted);margin-bottom:10px;">📖 <em>${s.ex.source}</em></div>
          <div style="font-size:1.05rem;line-height:2.4;color:var(--text-light);font-weight:500;">${textHtml}</div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn" onclick="EroiMinigames.verifyCloze()"><i class="fa-solid fa-check"></i> Verifica</button>
          <button class="btn btn-secondary" onclick="EroiMinigames.retryCurrentCloze()"><i class="fa-solid fa-dice"></i> Nuovo esercizio</button>
        </div>
        <div id="cloze-result" style="margin-top:14px;"></div>`;
    },

    updateCloze: function(i, v) { if (clozeState.answers) clozeState.answers[i] = v; },

    verifyCloze: function() {
      const s = clozeState;
      // Prendi valori dagli input
      s.ex.blanks.forEach((_, i) => {
        const inp = document.getElementById(`cloze-${i}`);
        if (inp) s.answers[i] = inp.value.trim();
      });

      let correct = 0;
      s.ex.blanks.forEach((blank, i) => {
        const ok = (s.answers[i] || '').toLowerCase() === blank.toLowerCase();
        if (ok) correct++;
        const inp = document.getElementById(`cloze-${i}`);
        if (inp) {
          inp.style.borderColor = ok ? '#16a34a' : '#ef4444';
          inp.style.background = ok ? 'rgba(22,163,74,0.15)' : 'rgba(239,68,68,0.1)';
          if (!ok) { inp.value = blank; inp.style.color = '#f59e0b'; }
        }
      });

      const res = document.getElementById('cloze-result');
      if (!res) return;
      if (correct === s.ex.blanks.length) {
        res.innerHTML = `<div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;">
          <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">🎉 Perfetto! Tutte le risposte corrette! +25 XP</div>
          <button class="btn" style="margin-top:10px;" onclick="EroiMinigames.rewardAndNext('cloze',25,12)">Nuovo esercizio</button>
        </div>`;
      } else {
        res.innerHTML = `<div style="background:rgba(245,158,11,0.1);border:1px solid #f59e0b;border-radius:10px;padding:16px;text-align:center;">
          <div style="color:#f59e0b;font-weight:bold;">${correct}/${s.ex.blanks.length} corrette. Le risposte sono rivelate in oro.</div>
          <button class="btn btn-secondary" style="margin-top:10px;" onclick="EroiMinigames.retryCurrentCloze()">Riprova con nuovo testo</button>
        </div>`;
      }
    },

    retryCurrentCloze: function() {
      const data = getData(currentMissionId);
      const c = document.getElementById('minigame-content');
      if (c) this.initCloze(c, data);
    },

    // =====================================================
    // RIORDINA I VERSI (non solo proemio!)
    // =====================================================
    initVersi: function(container, data) {
      const pool = data.versi && data.versi.length ? data.versi : DEFAULT_DATA.versi;
      const ex = pool[Math.floor(Math.random() * pool.length)];
      const shuffled = [...ex.lines].sort(() => Math.random() - 0.5);
      versiState = { ex, shuffled, ordered: [], remaining: [...shuffled] };
      this.renderVersi(container);
    },

    renderVersi: function(container) {
      const s = versiState;
      const isComplete = s.ordered.length === s.ex.lines.length;
      const isCorrect = isComplete && s.ordered.every((l, i) => l === s.ex.lines[i]);

      const orderedHtml = s.ordered.length
        ? s.ordered.map((l, i) => {
            const ok = isComplete ? l === s.ex.lines[i] : null;
            const chk = isComplete ? (ok ? 'border-color:#16a34a;background:rgba(22,163,74,0.1);' : 'border-color:#ef4444;background:rgba(239,68,68,0.07);') : '';
            return `<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px solid rgba(212,175,55,0.2);border-radius:6px;margin-bottom:5px;${chk}cursor:pointer;" onclick="EroiMinigames.versiRemove(${i})">
              <span style="color:var(--gold);font-weight:bold;min-width:20px;">${i+1}.</span>
              <span style="color:var(--text-light);font-style:italic;">"${l}"</span>
            </div>`;
          }).join('')
        : '<div style="color:var(--text-muted);font-style:italic;padding:10px;">Clicca i versi in basso nell\'ordine corretto...</div>';

      const remainingHtml = s.remaining.map((l, i) =>
        `<div style="display:flex;align-items:center;gap:10px;padding:9px 13px;background:rgba(212,175,55,0.05);border:1px solid rgba(212,175,55,0.2);border-radius:7px;margin-bottom:7px;cursor:pointer;transition:all 0.2s;"
         onmouseover="this.style.background='rgba(212,175,55,0.15)'" onmouseout="this.style.background='rgba(212,175,55,0.05)'"
         onclick="EroiMinigames.versiAdd(${i})">
          <i class="fa-solid fa-grip-lines" style="color:var(--gold);font-size:0.75rem;"></i>
          <span style="color:var(--text-light);font-style:italic;">"${l}"</span>
        </div>`
      ).join('');

      let resultHtml = '';
      if (isComplete) {
        if (isCorrect) {
          resultHtml = `<div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;margin-top:14px;">
            <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">🏆 Eccellente! Versi nell'ordine corretto! +30 XP</div>
            <div style="font-size:0.84rem;color:var(--text-muted);margin-top:5px;"><em>${s.ex.title}</em></div>
            <button class="btn" style="margin-top:12px;" onclick="EroiMinigames.rewardAndNext('versi',30,15)">Nuovo testo</button>
          </div>`;
        } else {
          resultHtml = `<div style="background:rgba(245,158,11,0.1);border:1px solid #f59e0b;border-radius:10px;padding:14px;margin-top:14px;">
            <div style="color:#f59e0b;font-weight:bold;margin-bottom:8px;">Quasi! L'ordine corretto era:</div>
            ${s.ex.lines.map((l,i)=>`<div style="font-size:0.83rem;color:var(--text-muted);font-style:italic;margin-bottom:3px;">${i+1}. "${l}"</div>`).join('')}
            <button class="btn btn-secondary" style="margin-top:10px;" onclick="EroiMinigames.versiReset()">Riprova</button>
          </div>`;
        }
      }

      container.innerHTML = `
        <div style="background:rgba(120,53,15,0.08);border:1px solid rgba(120,53,15,0.3);border-radius:8px;padding:12px;margin-bottom:14px;">
          <div style="font-weight:bold;color:var(--gold);margin-bottom:4px;">📜 ${s.ex.title}</div>
          <div style="font-size:0.82rem;color:var(--text-muted);">💡 ${s.ex.hint}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
          <div>
            <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:8px;font-weight:600;">🔢 Il tuo ordine <span style="opacity:0.6;">(clicca per rimuovere)</span>:</div>
            <div style="min-height:160px;border:1.5px dashed rgba(212,175,55,0.3);border-radius:8px;padding:8px;background:rgba(0,0,0,0.2);">${orderedHtml}</div>
          </div>
          <div>
            <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:8px;font-weight:600;">📋 Versi disponibili <span style="opacity:0.6;">(clicca per aggiungere)</span>:</div>
            <div>${remainingHtml}</div>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
          <button class="btn btn-secondary" onclick="EroiMinigames.versiReset()"><i class="fa-solid fa-rotate-left"></i> Reset</button>
        </div>
        ${resultHtml}`;
    },

    versiAdd: function(i) {
      const l = versiState.remaining[i];
      versiState.ordered.push(l);
      versiState.remaining.splice(i, 1);
      const c = document.getElementById('minigame-content');
      if (c) this.renderVersi(c);
    },
    versiRemove: function(i) {
      const l = versiState.ordered[i];
      versiState.remaining.push(l);
      versiState.ordered.splice(i, 1);
      const c = document.getElementById('minigame-content');
      if (c) this.renderVersi(c);
    },
    versiReset: function() {
      versiState.ordered = [];
      versiState.remaining = [...versiState.shuffled];
      const c = document.getElementById('minigame-content');
      if (c) this.renderVersi(c);
    },

    // =====================================================
    // RICOMPENSE
    // =====================================================
    rewardAndNext: function(type, xp, dracme) {
      try {
        const user = window.EroiAuth.getCurrentUser();
        if (user && user.role === 'student') {
          if (window.EroiGame) {
            window.EroiGame.addXP(user.email, xp);
            window.EroiGame.addDracme(user.email, dracme);
          }
          if (window.EroiApp && window.EroiApp.showToast) {
            window.EroiApp.showToast(`+${xp} XP e +${dracme} Dracme guadagnate!`, 'success');
          }
        }
      } catch(e) { console.warn('Reward error:', e); }
      this.startMinigame(type, currentMissionId);
    }
  };

})();
