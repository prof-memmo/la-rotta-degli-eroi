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
      curiosita: "Gli aedi recitavano i poemi interamente a memoria accompagnati dalla cetra: il ritmo metrico dell'esametro serviva proprio come supporto mnemonico!",
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
      curiosita: "Il mito dell'amore tragico tra Didone ed Enea fu elaborato dai poeti latini per spiegare l'origine ancestrale della rivalità tra Roma e Cartagine nelle guerre puniche.",
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
      curiosita: "Omero era descritto come cieco perché nell'antichità la cecità era vista come dono divino che permetteva di 'vedere' la verità interiore e il volere degli dei.",
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
      curiosita: "Il nome 'Iliade' deriva da 'Ilio', il nome originario e poetico della rocca di Troia fondata dal mitico re Ilo!",
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
      curiosita: "Nella mitologia greca, 'Caos' significava letteralmente 'spazio aperto / voragine', non disordine come lo intendiamo oggi!",
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
      curiosita: "Il monte Olimpo in Tessaglia (2.917 m) è la vetta più alta della Grecia. Si riteneva che i suoi picchi immersi nelle nubi fossero inaccessibili ai mortali.",
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
      curiosita: "L'ira di Achille (in greco 'mênis') è il motore dell'intera Iliade: un sentimento devastante che si placherà solo quando restituirà il corpo di Ettore al vecchio padre Priamo.",
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
      curiosita: "L'arma più potente di Ulisse non è la spada ma la 'mêtis': l'intelligenza pratica, la prudenza e l'astuzia strategica che gli permettono di superare ogni prova.",
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
      curiosita: "A differenza degli eroi greci spinti dalla gloria personale, Enea è guidato dal 'Fato' e si sacrifica per la futura grandezza della civiltà romana.",
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
      curiosita: "L'elsa d'oro della spada Durendal custodiva secondo il poema preziose reliquie, simboleggiando la difesa della cristianità.",
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
      curiosita: "La Tavola Rotonda fu ideata circolare affinché nessun cavaliere occupasse una posizione di testa: tutti i cavalieri avevano pari dignità e diritto di parola.",
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
      curiosita: "Il punto debole di Sigfrido (la foglia di tiglio tra le scapole) riprende l'antico mito del tallone di Achille: nessun eroe è completamente invulnerabile.",
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
      curiosita: "Il termine 'avatar' deriva dall'antico sanscrito induista e indicava la discesa di una divinità sulla Terra in forma visibile!",
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
    curiosita: "I poemi epici venivano tramandati oralmente per generazioni prima di essere trascritti ad Atene sotto il governo di Pisistrato nel VI secolo a.C.!",
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
    ],
    memory: [
      { a: "Achille", b: "Tallone vulnerabile" },
      { a: "Ulisse", b: "Cavallo di Troia" },
      { a: "Enea", b: "Padre Anchise sulle spalle" },
      { a: "Re Artù", b: "Spada Excalibur" },
      { a: "Orlando", b: "Lama Durlindana" },
      { a: "Sigfrido", b: "Drago Fafnir" },
      { a: "Polifemo", b: "Unico occhio accecato" },
      { a: "Medusa", b: "Sguardo pietrificante" }
    ],
    cruciverba: {
      title: "Crocevia dei Grandi Eroi",
      grid: [
        ["U","L","I","S","S","E"],
        ["N","","L","","","T"],
        ["I","L","I","A","D","E"],
        ["C","","A","","","N"],
        ["O","M","E","R","O","E"]
      ],
      definitions: {
        orizzontali: [
          { num: 1, text: "L'astuto re di Itaca eroe dell'Odissea (6)", row: 0, col: 0, word: "ULISSE" },
          { num: 2, text: "Il poema sull'assedio di Troia e l'ira di Achille (6)", row: 2, col: 0, word: "ILIADE" },
          { num: 3, text: "Il sommo aedo greco autore dei poemi (5)", row: 4, col: 0, word: "OMERO" }
        ],
        verticali: [
          { num: 4, text: "L'occhio solitario del gigante Polifemo (5)", row: 0, col: 0, word: "UNICO" },
          { num: 5, text: "L'eroe difensore di Troia caduto nel duello (6)", row: 0, col: 5, word: "ETTORE" }
        ]
      }
    },
    rebus: [
      {
        emoji: "🐴 🏛️ ⚔️ 🔥",
        formula: "(7, 2, 5)",
        solution: "CAVALLO DI TROIA",
        hint: "Il leggendario stratagemma ideato da Ulisse per espugnare Ilio."
      },
      {
        emoji: "👑 🗡️ 🪨 ✨",
        formula: "(5, 5, 5)",
        solution: "SPADA NELLA ROCCIA",
        hint: "La prova sacra superata dal giovane Artù per diventare re di Britannia."
      },
      {
        emoji: "🛡️ 🐉 🩸 🌲",
        formula: "(8, 3, 5)",
        solution: "SIGFRIDO E IL DRAGO",
        hint: "Il leggendario eroe dei Nibelunghi che affrontò il mostro Fafnir."
      }
    ],
    crittografia: [
      {
        cipher: "CANTAMI O DIVA DEL PELIDE ACHILLE L'IRA FUNESTA",
        hint: "Il celebre incipit del primo libro dell'Iliade di Omero.",
        author: "Omero (Iliade)"
      },
      {
        cipher: "CANTO LE ARMI E L'UOMO CHE PER PRIMO GIUNSE IN ITALIA",
        hint: "Il solenne proemio dell'Eneide di Virgilio.",
        author: "Virgilio (Eneide)"
      },
      {
        cipher: "DIMMI O MUSA DELL'EROE MULTIFORME CHE A LUNGO ERRÒ",
        hint: "L'invocazione alla Musa che apre il viaggio di Ulisse nell'Odissea.",
        author: "Omero (Odissea)"
      }
    ],
    indovinello: [
      {
        title: "Chi sono?",
        clues: [
          "Sono nato sull'isola rocciosa di Itaca e ho combattuto sotto le mura di Troia.",
          "Ho accecato il ciclope Polifemo dicendogli di chiamarmi 'Nessuno'.",
          "Ho impiegato dieci anni di mare, mostri e incantesimi per riabbracciare Penelope."
        ],
        solution: "ULISSE",
        hint: "L'eroe dal multiforme ingegno protagonista dell'Odissea."
      },
      {
        title: "Chi sono?",
        clues: [
          "Sono il più valoroso tra tutti i guerrieri achei accampati a Troia.",
          "Mia madre Teti mi immerse nello Stige rendendomi invulnerabile, tranne in un punto.",
          "La mia ira funesta fu scatenata dall'offesa di Agamennone e dal dolore per Patroclo."
        ],
        solution: "ACHILLE",
        hint: "Il piè veloce, il più temuto eroe dell'Iliade."
      },
      {
        title: "Chi sono?",
        clues: [
          "Fuggii da Troia in fiamme portando sulle spalle il vecchio padre Anchise.",
          "La regina Didone si innamorò di me a Cartagine prima del mio destino nel Lazio.",
          "Dalla mia stirpe e dal matrimonio con Lavinia nasceranno i fondatori di Roma."
        ],
        solution: "ENEA",
        hint: "Il pio eroe troiano protagonista del poema di Virgilio."
      }
    ],
    anagramma: [
      {
        scrambled: "EXCALIBUR",
        letters: ["E","X","C","A","L","I","B","U","R"],
        solution: "EXCALIBUR",
        hint: "La mitica spada estratta dalla roccia dal giovane Re Artù."
      },
      {
        scrambled: "DURLINDANA",
        letters: ["D","U","R","L","I","N","D","A","N","A"],
        solution: "DURLINDANA",
        hint: "La lama indistruttibile del paladino Orlando a Roncisvalle."
      },
      {
        scrambled: "POLIFEMO",
        letters: ["P","O","L","I","F","E","M","O"],
        solution: "POLIFEMO",
        hint: "Il feroce gigante pastore con un solo occhio sulla fronte."
      },
      {
        scrambled: "PENELOPE",
        letters: ["P","E","N","E","L","O","P","E"],
        solution: "PENELOPE",
        hint: "La fedele regina di Itaca che tesseva la tela attendendo lo sposo."
      }
    ],
    differenze: [
      {
        title: "L'Imbarco di Ulisse verso Itaca",
        source: "Affresco storico su tavola mitologica",
        totalDiffs: 3,
        diffs: [
          { id: 1, x: 28, y: 35, label: "L'elmo piumato dell'eroe acheo" },
          { id: 2, x: 74, y: 22, label: "La vela quadrata della nave" },
          { id: 3, x: 52, y: 78, label: "Lo scudo dorato con la civetta" }
        ]
      }
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
        quiz: '⚔️ Quiz Epico <span style="font-size:0.75rem; background:rgba(96,165,250,0.15); border:1px solid rgba(96,165,250,0.4); padding:2px 8px; border-radius:4px; color:#60a5fa; font-weight:700; margin-left:6px;">🟢 Facile</span>',
        impiccato: '🎭 L\'Impiccato <span style="font-size:0.75rem; background:rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.4); padding:2px 8px; border-radius:4px; color:#4ade80; font-weight:700; margin-left:6px;">🟢 Facile</span>',
        cloze: '📝 Cloze — Testo Bucato <span style="font-size:0.75rem; background:rgba(234,179,8,0.15); border:1px solid rgba(234,179,8,0.4); padding:2px 8px; border-radius:4px; color:#fde047; font-weight:700; margin-left:6px;">🟡 Intermedio</span>',
        puzzle: '🧩 Puzzle di Frasi <span style="font-size:0.75rem; background:rgba(234,179,8,0.15); border:1px solid rgba(234,179,8,0.4); padding:2px 8px; border-radius:4px; color:#fde047; font-weight:700; margin-left:6px;">🟡 Intermedio</span>',
        versi: '📜 Riordina i Versi <span style="font-size:0.75rem; background:rgba(59,130,246,0.15); border:1px solid rgba(59,130,246,0.4); padding:2px 8px; border-radius:4px; color:#60a5fa; font-weight:700; margin-left:6px;">🔵 Avanzato</span>',
        memory: '🧠 Memory Mitologico <span style="font-size:0.75rem; background:rgba(168,85,247,0.15); border:1px solid rgba(168,85,247,0.4); padding:2px 8px; border-radius:4px; color:#a855f7; font-weight:700; margin-left:6px;">🟢 Facile</span>',
        cruciverba: '📐 Parole Crociate <span style="font-size:0.75rem; background:rgba(234,179,8,0.15); border:1px solid rgba(234,179,8,0.4); padding:2px 8px; border-radius:4px; color:#eab308; font-weight:700; margin-left:6px;">🔵 Avanzato</span>',
        rebus: '🔍 Rebus Epico <span style="font-size:0.75rem; background:rgba(249,115,22,0.15); border:1px solid rgba(249,115,22,0.4); padding:2px 8px; border-radius:4px; color:#f97316; font-weight:700; margin-left:6px;">🟡 Intermedio</span>',
        crittografia: '🗝️ Crittografia del Timone <span style="font-size:0.75rem; background:rgba(20,184,166,0.15); border:1px solid rgba(20,184,166,0.4); padding:2px 8px; border-radius:4px; color:#14b8a6; font-weight:700; margin-left:6px;">🔵 Avanzato</span>',
        indovinello: '❓ Indovinelli dell\'Aedo <span style="font-size:0.75rem; background:rgba(236,72,153,0.15); border:1px solid rgba(236,72,153,0.4); padding:2px 8px; border-radius:4px; color:#ec4899; font-weight:700; margin-left:6px;">🟡 Intermedio</span>',
        anagramma: '🔤 Anagrammi degli Eroi <span style="font-size:0.75rem; background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.4); padding:2px 8px; border-radius:4px; color:#6366f1; font-weight:700; margin-left:6px;">🟡 Intermedio</span>',
        differenze: '👀 Trova le Differenze <span style="font-size:0.75rem; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.4); padding:2px 8px; border-radius:4px; color:#10b981; font-weight:700; margin-left:6px;">🟢 Facile</span>'
      };
      title.innerHTML = (typeLabels[type] || type) + topicBadge;

      switch(type) {
        case 'quiz':         this.initQuiz(content, data); break;
        case 'impiccato':    this.initImpiccato(content, data); break;
        case 'puzzle':       this.initPuzzle(content, data); break;
        case 'cloze':        this.initCloze(content, data); break;
        case 'versi':        this.initVersi(content, data); break;
        case 'memory':       this.initMemory(content, data); break;
        case 'cruciverba':   this.initCruciverba(content, data); break;
        case 'rebus':        this.initRebus(content, data); break;
        case 'crittografia': this.initCrittografia(content, data); break;
        case 'indovinello':  this.initIndovinello(content, data); break;
        case 'anagramma':    this.initAnagramma(content, data); break;
        case 'differenze':   this.initDifferenze(content, data); break;
        default:             this.initQuiz(content, data); break;
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

      const buttonsBar = `
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;">
          <button class="btn btn-secondary" style="background:rgba(212,175,55,0.15);border:1px solid var(--gold);color:var(--gold);font-weight:600;" onclick="EroiMinigames.hintImpiccato()"><i class="fa-solid fa-lightbulb"></i> Aiuto: Svela Lettera (-2 🪙)</button>
          <button class="btn btn-secondary" style="background:rgba(255,255,255,0.05);color:#aaa;" onclick="EroiMinigames.skipCurrent('impiccato')"><i class="fa-solid fa-forward-step"></i> Passa</button>
        </div>`;

      const curiositaHtml = data.curiosita ? `
        <div style="background:rgba(212,175,55,0.08);border-left:3px solid var(--gold);padding:8px 12px;border-radius:4px;margin-top:12px;font-size:0.8rem;color:var(--text-light);text-align:left;">
          💡 <strong>Curiosità del Mito:</strong> ${data.curiosita}
        </div>` : '';

      let result = '';
      if (won) {
        result = `<div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;margin-top:16px;">
          <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">🎉 Hai indovinato! +20 XP, +10 Dracme</div>
          ${curiositaHtml}
          <button class="btn" style="margin-top:12px;" onclick="EroiMinigames.rewardAndNext('impiccato',20,10)">Nuova parola</button>
        </div>`;
      } else if (lost) {
        result = `<div style="background:rgba(239,68,68,0.1);border:1px solid #ef4444;border-radius:10px;padding:16px;text-align:center;margin-top:16px;">
          <div style="color:#ef4444;font-weight:bold;">💀 La parola era: <span style="color:var(--gold);">${word}</span></div>
          ${curiositaHtml}
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
            ${!won && !lost ? buttonsBar : ''}
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
      const data = getData(currentMissionId);
      const correct = s.selected.join(' ') === s.ex.solution;

      const sel = s.selected.length
        ? s.selected.map((w,i) => `<span style="display:inline-block;background:rgba(37,99,235,0.2);border:1px solid #2563eb;border-radius:6px;padding:6px 11px;margin:3px;font-weight:bold;cursor:pointer;color:var(--text-light);" onclick="EroiMinigames.puzzleRemove(${i})">${w}</span>`).join('')
        : '<span style="color:var(--text-muted);font-style:italic;">Clicca le parole nell\'ordine corretto...</span>';

      const rem = s.remaining.map((w,i) =>
        `<button style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.3);border-radius:6px;padding:7px 12px;margin:3px;font-weight:bold;color:var(--text-light);cursor:pointer;transition:all 0.2s;"
         onmouseover="this.style.background='rgba(212,175,55,0.2)'" onmouseout="this.style.background='rgba(212,175,55,0.08)'"
         onclick="EroiMinigames.puzzleAdd(${i})">${w}</button>`
      ).join('');

      const curiositaHtml = data.curiosita ? `
        <div style="background:rgba(212,175,55,0.08);border-left:3px solid var(--gold);padding:8px 12px;border-radius:4px;margin-top:12px;font-size:0.8rem;color:var(--text-light);text-align:left;">
          💡 <strong>Curiosità del Mito:</strong> ${data.curiosita}
        </div>` : '';

      const resultHtml = correct ? `
        <div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;margin-top:16px;">
          <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">✅ Perfetto! Frase ricostruita! +15 XP</div>
          <div style="font-size:0.83rem;color:var(--text-muted);margin-top:5px;">Fonte: <em>${s.ex.source}</em></div>
          ${curiositaHtml}
          <button class="btn" style="margin-top:12px;" onclick="EroiMinigames.rewardAndNext('puzzle',15,8)">Nuova frase</button>
        </div>` : '';

      container.innerHTML = `
        <div style="font-size:0.87rem;color:var(--text-muted);margin-bottom:10px;">📖 <em>${s.ex.source}</em></div>
        <div style="min-height:55px;border:1.5px dashed rgba(212,175,55,0.3);border-radius:8px;padding:10px;margin-bottom:14px;background:rgba(0,0,0,0.2);">${sel}</div>
        <div style="margin-bottom:8px;font-size:0.84rem;color:var(--text-muted);">Parole disponibili:</div>
        <div style="min-height:55px;">${rem}</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;">
          <button class="btn btn-secondary" onclick="EroiMinigames.puzzleReset()"><i class="fa-solid fa-rotate-left"></i> Reset</button>
          ${!correct ? `
            <button class="btn btn-secondary" style="background:rgba(212,175,55,0.15);border:1px solid var(--gold);color:var(--gold);font-weight:600;" onclick="EroiMinigames.hintPuzzle()"><i class="fa-solid fa-lightbulb"></i> Aiuto: Prossima Parola (-2 🪙)</button>
            <button class="btn btn-secondary" style="background:rgba(255,255,255,0.05);color:#aaa;" onclick="EroiMinigames.skipCurrent('puzzle')"><i class="fa-solid fa-forward-step"></i> Passa</button>
          ` : ''}
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
          <button class="btn btn-secondary" style="background:rgba(212,175,55,0.15);border:1px solid var(--gold);color:var(--gold);font-weight:600;" onclick="EroiMinigames.hintCloze()"><i class="fa-solid fa-lightbulb"></i> Aiuto: Iniziali (-2 🪙)</button>
          <button class="btn btn-secondary" style="background:rgba(255,255,255,0.05);color:#aaa;" onclick="EroiMinigames.skipCurrent('cloze')"><i class="fa-solid fa-forward-step"></i> Passa</button>
          <button class="btn btn-secondary" onclick="EroiMinigames.retryCurrentCloze()"><i class="fa-solid fa-dice"></i> Nuovo esercizio</button>
        </div>
        <div id="cloze-result" style="margin-top:14px;"></div>`;
    },

    updateCloze: function(i, v) { if (clozeState.answers) clozeState.answers[i] = v; },

    verifyCloze: function() {
      const s = clozeState;
      const data = getData(currentMissionId);
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

      const curiositaHtml = data.curiosita ? `
        <div style="background:rgba(212,175,55,0.08);border-left:3px solid var(--gold);padding:8px 12px;border-radius:4px;margin-top:12px;font-size:0.8rem;color:var(--text-light);text-align:left;">
          💡 <strong>Curiosità del Mito:</strong> ${data.curiosita}
        </div>` : '';

      if (correct === s.ex.blanks.length) {
        res.innerHTML = `<div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;">
          <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">🎉 Perfetto! Tutte le risposte corrette! +25 XP</div>
          ${curiositaHtml}
          <button class="btn" style="margin-top:10px;" onclick="EroiMinigames.rewardAndNext('cloze',25,12)">Nuovo esercizio</button>
        </div>`;
      } else {
        res.innerHTML = `<div style="background:rgba(245,158,11,0.1);border:1px solid #f59e0b;border-radius:10px;padding:16px;text-align:center;">
          <div style="color:#f59e0b;font-weight:bold;">${correct}/${s.ex.blanks.length} corrette. Le risposte sono rivelate in oro.</div>
          ${curiositaHtml}
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
      const data = getData(currentMissionId);
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

      const curiositaHtml = data.curiosita ? `
        <div style="background:rgba(212,175,55,0.08);border-left:3px solid var(--gold);padding:8px 12px;border-radius:4px;margin-top:12px;font-size:0.8rem;color:var(--text-light);text-align:left;">
          💡 <strong>Curiosità del Mito:</strong> ${data.curiosita}
        </div>` : '';

      let resultHtml = '';
      if (isComplete) {
        if (isCorrect) {
          resultHtml = `<div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;margin-top:14px;">
            <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">🏆 Eccellente! Versi nell'ordine corretto! +30 XP</div>
            <div style="font-size:0.84rem;color:var(--text-muted);margin-top:5px;"><em>${s.ex.title}</em></div>
            ${curiositaHtml}
            <button class="btn" style="margin-top:12px;" onclick="EroiMinigames.rewardAndNext('versi',30,15)">Nuovo testo</button>
          </div>`;
        } else {
          resultHtml = `<div style="background:rgba(245,158,11,0.1);border:1px solid #f59e0b;border-radius:10px;padding:14px;margin-top:14px;">
            <div style="color:#f59e0b;font-weight:bold;margin-bottom:8px;">Quasi! L'ordine corretto era:</div>
            ${s.ex.lines.map((l,i)=>`<div style="font-size:0.83rem;color:var(--text-muted);font-style:italic;margin-bottom:3px;">${i+1}. "${l}"</div>`).join('')}
            ${curiositaHtml}
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
          ${!isComplete ? `
            <button class="btn btn-secondary" style="background:rgba(212,175,55,0.15);border:1px solid var(--gold);color:var(--gold);font-weight:600;" onclick="EroiMinigames.hintVersi()"><i class="fa-solid fa-lightbulb"></i> Aiuto: Prossimo Verso (-2 🪙)</button>
            <button class="btn btn-secondary" style="background:rgba(255,255,255,0.05);color:#aaa;" onclick="EroiMinigames.skipCurrent('versi')"><i class="fa-solid fa-forward-step"></i> Passa</button>
          ` : ''}
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
    // LOGICA AIUTI E SALTO DOMANDA (INCLUSIVITÀ BES / DSA)
    // =====================================================
    useDracmeForHint: function(cost, callback) {
      try {
        const user = window.EroiAuth ? window.EroiAuth.getCurrentUser() : null;
        if (user && user.role === 'student' && window.EroiGame) {
          const profile = window.EroiGame.getProfile ? window.EroiGame.getProfile(user.email) : null;
          const currentDracme = (profile && profile.dracme !== undefined) ? profile.dracme : 10;
          if (currentDracme >= cost) {
            window.EroiGame.addDracme(user.email, -cost);
            if (window.EroiApp && window.EroiApp.showToast) {
              window.EroiApp.showToast(`-${cost} Dracme per l'indizio! (Saldo: ${currentDracme - cost} 🪙)`, 'info');
            }
          } else {
            if (window.EroiApp && window.EroiApp.showToast) {
              window.EroiApp.showToast(`Indizio concesso (Supporto Inclusivo)!`, 'info');
            }
          }
        }
      } catch(e) { console.warn('Hint currency error:', e); }
      callback();
    },

    hintImpiccato: function() {
      if (!impiccatoState.word) return;
      this.useDracmeForHint(2, () => {
        const missing = impiccatoState.word.split('').filter(l => !impiccatoState.guessed.has(l));
        if (missing.length) {
          const randomL = missing[Math.floor(Math.random() * missing.length)];
          this.guessLetter(randomL);
        }
      });
    },

    hintPuzzle: function() {
      if (!puzzleState.ex) return;
      this.useDracmeForHint(2, () => {
        const fullWords = puzzleState.ex.solution.split(' ');
        const nextIdx = puzzleState.selected.length;
        if (nextIdx < fullWords.length) {
          const expectedWord = fullWords[nextIdx];
          const remIndex = puzzleState.remaining.indexOf(expectedWord);
          if (remIndex !== -1) {
            this.puzzleAdd(remIndex);
          }
        }
      });
    },

    // =====================================================
    // QUIZ EPICO
    // =====================================================
    initQuiz: function(container, data) {
      const questions = (window.mockData && window.mockData.missions && window.mockData.missions.find(m => m.id === currentMissionId)?.questions) || [
        { q: "Quale eroe ideò l'inganno del Cavallo di Troia?", options: ["Achille", "Ulisse", "Enea", "Agamennone"], a: 1 },
        { q: "Chi è l'autore dell'Eneide?", options: ["Omero", "Virgilio", "Dante", "Turoldo"], a: 1 },
        { q: "Come si chiama la mitica spada di Re Artù?", options: ["Durlindana", "Excalibur", "Gioiosa", "Balmung"], a: 1 }
      ];
      const q = questions[Math.floor(Math.random() * questions.length)];
      
      container.innerHTML = `
        <div style="max-width: 500px; margin: 0 auto; text-align: center;">
          <h4 style="color: var(--gold); font-size: 1.1rem; margin-bottom: 15px;">${q.q}</h4>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
            ${q.options.map((opt, i) => `
              <button class="btn btn-secondary quiz-opt-btn" style="padding: 10px 14px; text-align: left; font-size: 0.9rem;" onclick="EroiMinigames.checkQuizAnswer(${i}, ${q.a})">
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    },

    checkQuizAnswer: function(selected, correct) {
      if (selected === correct) {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Risposta Esatta! Bravo Eroe!', 'success');
        this.rewardAndNext('quiz', 20, 10);
      } else {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Risposta errata. Riprova!', 'danger');
      }
    },

    // =====================================================
    // MEMORY MITOLOGICO
    // =====================================================
    initMemory: function(container, data) {
      const pool = data.memory && data.memory.length ? data.memory : DEFAULT_DATA.memory;
      const selectedPairs = pool.slice(0, 6);
      const cards = [];
      
      selectedPairs.forEach((pair, idx) => {
        cards.push({ id: idx, text: pair.a, pairId: idx });
        cards.push({ id: idx, text: pair.b, pairId: idx });
      });
      
      // Shuffle
      cards.sort(() => Math.random() - 0.5);

      this.memoryState = {
        cards: cards,
        flipped: [],
        matchedCount: 0,
        totalPairs: selectedPairs.length,
        lockBoard: false
      };

      this.renderMemory(container);
    },

    renderMemory: function(container) {
      const ms = this.memoryState;
      container.innerHTML = `
        <div style="max-width: 550px; margin: 0 auto; text-align: center;">
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">Abbina ciascun eroe o mostro al proprio attributo mitologico.</p>
          <div class="memory-grid">
            ${ms.cards.map((c, idx) => `
              <div class="memory-card" id="mem-card-${idx}" onclick="EroiMinigames.flipMemoryCard(${idx})">
                <div class="memory-card-front"><i class="fa-solid fa-shield-halved"></i></div>
                <div class="memory-card-back">${c.text}</div>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; justify-content: center; gap: 10px; margin-top: 15px;">
            <button class="btn btn-secondary" onclick="EroiMinigames.startMinigame('memory', currentMissionId)"><i class="fa-solid fa-rotate-left"></i> Ricomincia</button>
            <button class="btn btn-secondary" onclick="EroiMinigames.skipCurrent('memory')"><i class="fa-solid fa-forward-step"></i> Passa</button>
          </div>
        </div>
      `;
    },

    flipMemoryCard: function(index) {
      const ms = this.memoryState;
      if (ms.lockBoard) return;
      const cardEl = document.getElementById(`mem-card-${index}`);
      if (!cardEl || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

      cardEl.classList.add('flipped');
      ms.flipped.push({ index, card: ms.cards[index], el: cardEl });

      if (ms.flipped.length === 2) {
        ms.lockBoard = true;
        const [c1, c2] = ms.flipped;
        if (c1.card.pairId === c2.card.pairId) {
          setTimeout(() => {
            c1.el.classList.add('matched');
            c2.el.classList.add('matched');
            ms.matchedCount++;
            ms.flipped = [];
            ms.lockBoard = false;

            if (ms.matchedCount === ms.totalPairs) {
              if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Memory Completato! Tutte le coppie trovate!', 'success');
              this.rewardAndNext('memory', 25, 12);
            }
          }, 500);
        } else {
          setTimeout(() => {
            c1.el.classList.remove('flipped');
            c2.el.classList.remove('flipped');
            ms.flipped = [];
            ms.lockBoard = false;
          }, 900);
        }
      }
    },

    // =====================================================
    // PAROLE CROCIATE (CRUCIVERBA)
    // =====================================================
    initCruciverba: function(container, data) {
      const cw = data.cruciverba || DEFAULT_DATA.cruciverba;
      this.cwState = {
        data: cw,
        rows: cw.grid.length,
        cols: cw.grid[0].length
      };

      let boardHtml = `<div class="cw-board" style="grid-template-columns: repeat(${this.cwState.cols}, 32px);">`;
      for (let r = 0; r < this.cwState.rows; r++) {
        for (let c = 0; c < this.cwState.cols; c++) {
          const letter = cw.grid[r][c];
          if (letter === "") {
            boardHtml += `<div class="cw-cell block"></div>`;
          } else {
            let numLabel = "";
            cw.definitions.orizzontali.forEach(d => { if (d.row === r && d.col === c) numLabel = d.num; });
            cw.definitions.verticali.forEach(d => { if (d.row === r && d.col === c) numLabel = d.num; });

            boardHtml += `
              <div class="cw-cell">
                ${numLabel ? `<span class="cw-cell-num">${numLabel}</span>` : ''}
                <input type="text" class="cw-input" maxlength="1" data-r="${r}" data-c="${c}" data-sol="${letter}" id="cw-${r}-${c}" oninput="this.value = this.value.toUpperCase();">
              </div>
            `;
          }
        }
      }
      boardHtml += `</div>`;

      container.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto;">
          <h4 style="color: var(--gold); text-align: center; margin-bottom: 10px;">${cw.title || 'Parole Crociate'}</h4>
          ${boardHtml}
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; font-size: 0.82rem; text-align: left;">
            <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
              <strong style="color: var(--gold); display: block; margin-bottom: 4px;">ORIZZONTALI:</strong>
              ${cw.definitions.orizzontali.map(d => `<div style="margin-bottom: 4px;"><strong>${d.num}.</strong> ${d.text}</div>`).join('')}
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
              <strong style="color: var(--gold); display: block; margin-bottom: 4px;">VERTICALI:</strong>
              ${cw.definitions.verticali.map(d => `<div style="margin-bottom: 4px;"><strong>${d.num}.</strong> ${d.text}</div>`).join('')}
            </div>
          </div>
          <div style="display: flex; justify-content: center; gap: 10px;">
            <button class="btn" onclick="EroiMinigames.checkCruciverba()"><i class="fa-solid fa-check"></i> Verifica Schema</button>
            <button class="btn btn-secondary" onclick="EroiMinigames.hintCruciverba()"><i class="fa-solid fa-lightbulb"></i> Aiuto (-2 🪙)</button>
            <button class="btn btn-secondary" onclick="EroiMinigames.skipCurrent('cruciverba')"><i class="fa-solid fa-forward-step"></i> Passa</button>
          </div>
        </div>
      `;
    },

    checkCruciverba: function() {
      const inputs = document.querySelectorAll('.cw-input');
      let allCorrect = true;
      inputs.forEach(inp => {
        const sol = inp.dataset.sol;
        if (inp.value.toUpperCase() !== sol.toUpperCase()) {
          allCorrect = false;
          inp.style.background = 'rgba(239,68,68,0.3)';
        } else {
          inp.style.background = 'rgba(46,204,113,0.3)';
        }
      });

      if (allCorrect) {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Cruciverba Risolto Perfettamente!', 'success');
        this.rewardAndNext('cruciverba', 35, 15);
      } else {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Alcune lettere sono errate. Controlla le definizioni!', 'warning');
      }
    },

    hintCruciverba: function() {
      this.useDracmeForHint(2, () => {
        const emptyOrWrong = Array.from(document.querySelectorAll('.cw-input')).filter(inp => inp.value.toUpperCase() !== inp.dataset.sol.toUpperCase());
        if (emptyOrWrong.length > 0) {
          const target = emptyOrWrong[Math.floor(Math.random() * emptyOrWrong.length)];
          target.value = target.dataset.sol;
          target.style.background = 'rgba(46,204,113,0.3)';
        }
      });
    },

    // =====================================================
    // REBUS EPICO
    // =====================================================
    initRebus: function(container, data) {
      const pool = data.rebus && data.rebus.length ? data.rebus : DEFAULT_DATA.rebus;
      const r = pool[Math.floor(Math.random() * pool.length)];
      this.rebusState = { current: r };

      container.innerHTML = `
        <div style="max-width: 480px; margin: 0 auto; text-align: center;">
          <div class="rebus-container">
            <div style="font-size: 2.2rem; margin-bottom: 10px; letter-spacing: 4px;">${r.emoji}</div>
            <div style="display: inline-block; padding: 4px 12px; background: rgba(212,175,55,0.2); border: 1px solid var(--gold); border-radius: 20px; color: var(--gold); font-weight: 800; font-size: 0.9rem; margin-bottom: 12px;">
              Formula: ${r.formula}
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 15px;">Decifra l'enigma visivo per scoprire l'evento o l'eroe.</p>
            <input type="text" id="rebus-input" class="input-control" placeholder="Scrivi la soluzione..." style="width: 100%; text-align: center; text-transform: uppercase; font-size: 1.05rem; font-weight: 800; margin-bottom: 15px;" oninput="this.value = this.value.toUpperCase();">
            <div style="display: flex; justify-content: center; gap: 10px;">
              <button class="btn" onclick="EroiMinigames.checkRebus()"><i class="fa-solid fa-check"></i> Risolvi Rebus</button>
              <button class="btn btn-secondary" onclick="EroiMinigames.hintRebus()"><i class="fa-solid fa-lightbulb"></i> Indizio (-2 🪙)</button>
              <button class="btn btn-secondary" onclick="EroiMinigames.skipCurrent('rebus')"><i class="fa-solid fa-forward-step"></i> Passa</button>
            </div>
          </div>
        </div>
      `;
    },

    checkRebus: function() {
      const input = document.getElementById('rebus-input');
      if (!input || !this.rebusState.current) return;
      const sol = this.rebusState.current.solution.toUpperCase().replace(/\s+/g, '');
      const userVal = input.value.toUpperCase().replace(/\s+/g, '');

      if (userVal === sol) {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Rebus Decifrato con Successo!', 'success');
        this.rewardAndNext('rebus', 20, 10);
      } else {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Soluzione non corretta. Riprova!', 'danger');
      }
    },

    hintRebus: function() {
      if (!this.rebusState.current) return;
      this.useDracmeForHint(2, () => {
        if (window.EroiApp && window.EroiApp.showToast) {
          window.EroiApp.showToast(`Indizio: ${this.rebusState.current.hint}`, 'info');
        }
      });
    },

    // =====================================================
    // CRITTOGRAFIA DEL TIMONE
    // =====================================================
    initCrittografia: function(container, data) {
      const pool = data.crittografia && data.crittografia.length ? data.crittografia : DEFAULT_DATA.crittografia;
      const c = pool[Math.floor(Math.random() * pool.length)];
      
      const words = c.cipher.toUpperCase().split(' ');
      this.cryptoState = { current: c };

      const symbols = ["⚓","⚔️","🛡️","🏛️","🏹","📜","👑","⚡","🔥","🌊","🌙","☀️","🦅","🐍","🦁","🌲","⭐","👁️","🏺","🔱","🩸","🪙","🪨","🗡️","🎺","🐎"];
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const cipherMap = {};
      for (let i = 0; i < alphabet.length; i++) {
        cipherMap[alphabet[i]] = symbols[i % symbols.length] + (Math.floor(i / symbols.length) > 0 ? (Math.floor(i/symbols.length)+1) : '');
      }

      let gridHtml = `<div class="crypto-grid">`;
      let letterIdx = 0;
      words.forEach((w) => {
        gridHtml += `<div style="display:flex; gap:4px; margin: 4px 8px;">`;
        for (let char of w) {
          if (alphabet.includes(char)) {
            const sym = cipherMap[char] || char;
            gridHtml += `
              <div class="crypto-cell-box">
                <span class="crypto-symbol">${sym}</span>
                <input type="text" class="crypto-input" maxlength="1" data-letter="${char}" id="crypto-char-${letterIdx}" oninput="this.value = this.value.toUpperCase(); EroiMinigames.cryptoAdvance(${letterIdx});">
              </div>
            `;
            letterIdx++;
          } else {
            gridHtml += `<div style="display:flex; align-items:flex-end; padding-bottom:6px; font-weight:bold; color:var(--gold);">${char}</div>`;
          }
        }
        gridHtml += `</div>`;
      });
      gridHtml += `</div>`;

      container.innerHTML = `
        <div style="max-width: 650px; margin: 0 auto; text-align: center;">
          <h4 style="color: var(--gold); margin-bottom: 5px;">Cifrario Epico Antico</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 15px;">Decodifica ciascun simbolo per ricostruire la citazione immortale (${c.author}).</p>
          ${gridHtml}
          <div style="display: flex; justify-content: center; gap: 10px; margin-top: 15px;">
            <button class="btn" onclick="EroiMinigames.checkCrittografia()"><i class="fa-solid fa-check"></i> Convalida Frase</button>
            <button class="btn btn-secondary" onclick="EroiMinigames.hintCrittografia()"><i class="fa-solid fa-lightbulb"></i> Svela Lettera (-2 🪙)</button>
            <button class="btn btn-secondary" onclick="EroiMinigames.skipCurrent('crittografia')"><i class="fa-solid fa-forward-step"></i> Passa</button>
          </div>
        </div>
      `;
    },

    cryptoAdvance: function(currentIdx) {
      const nextInp = document.getElementById(`crypto-char-${currentIdx + 1}`);
      if (nextInp) nextInp.focus();
    },

    checkCrittografia: function() {
      const inputs = document.querySelectorAll('.crypto-input');
      let allCorrect = true;
      inputs.forEach(inp => {
        if (inp.value.toUpperCase() !== inp.dataset.letter.toUpperCase()) {
          allCorrect = false;
          inp.style.borderColor = 'red';
        } else {
          inp.style.borderColor = 'green';
        }
      });

      if (allCorrect) {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Crittografia Risolta! Profezia Svelata!', 'success');
        this.rewardAndNext('crittografia', 30, 15);
      } else {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Alcune lettere sono errate. Riprova!', 'danger');
      }
    },

    hintCrittografia: function() {
      this.useDracmeForHint(2, () => {
        const wrongOrEmpty = Array.from(document.querySelectorAll('.crypto-input')).filter(inp => inp.value.toUpperCase() !== inp.dataset.letter.toUpperCase());
        if (wrongOrEmpty.length > 0) {
          const target = wrongOrEmpty[0];
          target.value = target.dataset.letter;
          target.style.borderColor = 'green';
        }
      });
    },

    // =====================================================
    // INDOVINELLI DELL'AEDO
    // =====================================================
    initIndovinello: function(container, data) {
      const pool = data.indovinello && data.indovinello.length ? data.indovinello : DEFAULT_DATA.indovinello;
      const ind = pool[Math.floor(Math.random() * pool.length)];
      this.indovinelloState = { current: ind, revealedCount: 1 };

      container.innerHTML = `
        <div style="max-width: 500px; margin: 0 auto; text-align: center;">
          <h4 style="color: var(--gold); margin-bottom: 12px;">${ind.title || 'Indovinello dell\'Aedo'}</h4>
          <div class="indovinello-clues" id="indovinello-clues-list">
            <div class="indovinello-clue-item"><strong>1° Indizio:</strong> ${ind.clues[0]}</div>
          </div>
          <input type="text" id="indovinello-input" class="input-control" placeholder="Chi è il personaggio / eroe?..." style="width: 100%; text-align: center; text-transform: uppercase; font-weight: 800; margin-bottom: 15px;" oninput="this.value = this.value.toUpperCase();">
          <div style="display: flex; justify-content: center; gap: 10px;">
            <button class="btn" onclick="EroiMinigames.checkIndovinello()"><i class="fa-solid fa-check"></i> Rispondi</button>
            <button class="btn btn-secondary" onclick="EroiMinigames.revealNextClue()"><i class="fa-solid fa-eye"></i> Prossimo Indizio (-2 🪙)</button>
            <button class="btn btn-secondary" onclick="EroiMinigames.skipCurrent('indovinello')"><i class="fa-solid fa-forward-step"></i> Passa</button>
          </div>
        </div>
      `;
    },

    revealNextClue: function() {
      const is = this.indovinelloState;
      if (!is || !is.current) return;
      if (is.revealedCount >= is.current.clues.length) {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Tutti gli indizi sono già stati svelati!', 'info');
        return;
      }

      this.useDracmeForHint(2, () => {
        const cluesList = document.getElementById('indovinello-clues-list');
        const nextClueText = is.current.clues[is.revealedCount];
        is.revealedCount++;
        if (cluesList) {
          cluesList.innerHTML += `<div class="indovinello-clue-item"><strong>${is.revealedCount}° Indizio:</strong> ${nextClueText}</div>`;
        }
      });
    },

    checkIndovinello: function() {
      const input = document.getElementById('indovinello-input');
      if (!input || !this.indovinelloState.current) return;
      const sol = this.indovinelloState.current.solution.toUpperCase().trim();
      const userVal = input.value.toUpperCase().trim();

      if (userVal === sol || (sol.length > 4 && userVal.includes(sol))) {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast(`Esatto! Era proprio ${sol}!`, 'success');
        this.rewardAndNext('indovinello', 20, 10);
      } else {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Identità non corretta. Rileggi gli indizi!', 'danger');
      }
    },

    // =====================================================
    // ANAGRAMMI DEGLI EROI
    // =====================================================
    initAnagramma: function(container, data) {
      const pool = data.anagramma && data.anagramma.length ? data.anagramma : DEFAULT_DATA.anagramma;
      const a = pool[Math.floor(Math.random() * pool.length)];
      const scrambledLetters = [...a.letters].sort(() => Math.random() - 0.5);

      this.anagramState = {
        current: a,
        originalLetters: scrambledLetters,
        currentWord: []
      };

      container.innerHTML = `
        <div style="max-width: 500px; margin: 0 auto; text-align: center;">
          <h4 style="color: var(--gold); margin-bottom: 5px;">Anagramma Mitologico</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px;">${a.hint}</p>
          <div id="anagram-word-slot" style="min-height: 48px; background: rgba(0,0,0,0.4); border: 1.5px dashed var(--gold); border-radius: 10px; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 6px; margin-bottom: 15px; flex-wrap: wrap;">
            <span style="color: var(--text-muted); font-size: 0.85rem;">Clicca le lettere sotto per comporre la parola</span>
          </div>
          <div class="anagram-tiles" id="anagram-tiles-pool">
            ${scrambledLetters.map((l, idx) => `
              <div class="anagram-tile" id="ana-tile-${idx}" onclick="EroiMinigames.anagramPickLetter(${idx}, '${l}')">${l}</div>
            `).join('')}
          </div>
          <div style="display: flex; justify-content: center; gap: 10px; margin-top: 15px;">
            <button class="btn" onclick="EroiMinigames.checkAnagramma()"><i class="fa-solid fa-check"></i> Verifica</button>
            <button class="btn btn-secondary" onclick="EroiMinigames.resetAnagramma()"><i class="fa-solid fa-rotate-left"></i> Reset</button>
            <button class="btn btn-secondary" onclick="EroiMinigames.skipCurrent('anagramma')"><i class="fa-solid fa-forward-step"></i> Passa</button>
          </div>
        </div>
      `;
    },

    anagramPickLetter: function(idx, letter) {
      const tile = document.getElementById(`ana-tile-${idx}`);
      if (!tile || tile.classList.contains('used')) return;
      tile.classList.add('used');

      const as = this.anagramState;
      as.currentWord.push({ idx, letter });
      this.renderAnagramSlots();
    },

    anagramRemoveLetter: function(wordIdx) {
      const as = this.anagramState;
      const removed = as.currentWord.splice(wordIdx, 1)[0];
      if (removed) {
        const tile = document.getElementById(`ana-tile-${removed.idx}`);
        if (tile) tile.classList.remove('used');
      }
      this.renderAnagramSlots();
    },

    renderAnagramSlots: function() {
      const slot = document.getElementById('anagram-word-slot');
      const as = this.anagramState;
      if (!slot) return;

      if (as.currentWord.length === 0) {
        slot.innerHTML = `<span style="color: var(--text-muted); font-size: 0.85rem;">Clicca le lettere sotto per comporre la parola</span>`;
        return;
      }

      slot.innerHTML = as.currentWord.map((item, i) => `
        <div class="anagram-tile" style="background: rgba(46,204,113,0.25); border-color: #2ecc71;" onclick="EroiMinigames.anagramRemoveLetter(${i})">
          ${item.letter}
        </div>
      `).join('');
    },

    resetAnagramma: function() {
      const as = this.anagramState;
      as.currentWord = [];
      document.querySelectorAll('.anagram-tile').forEach(t => t.classList.remove('used'));
      this.renderAnagramSlots();
    },

    checkAnagramma: function() {
      const as = this.anagramState;
      if (!as || !as.current) return;
      const userWord = as.currentWord.map(w => w.letter).join('').toUpperCase();
      const sol = as.current.solution.toUpperCase();

      if (userWord === sol) {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast(`Anagramma Risolto! Parola: ${sol}!`, 'success');
        this.rewardAndNext('anagramma', 20, 10);
      } else {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Parola non corretta. Riprova!', 'danger');
      }
    },

    // =====================================================
    // TROVA LE DIFFERENZE MITOLOGICHE
    // =====================================================
    initDifferenze: function(container, data) {
      const pool = data.differenze && data.differenze.length ? data.differenze : DEFAULT_DATA.differenze;
      const diffObj = pool[0] || DEFAULT_DATA.differenze[0];

      let imgSrc = 'assets/images/navigatore_class.png';
      const topic = (data.topic || '').toLowerCase();
      if (topic.includes('iliade') || topic.includes('guerra') || topic.includes('carolingio') || topic.includes('nibelunghi')) {
        imgSrc = 'assets/images/guerriero_class.png';
      } else if (topic.includes('autori') || topic.includes('mito') || topic.includes('inizio') || topic.includes('caos') || topic.includes('opere')) {
        imgSrc = 'assets/images/cantastorie_class.png';
      }

      this.diffState = {
        current: diffObj,
        foundIds: new Set()
      };

      container.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
          <h4 style="color: var(--gold); margin-bottom: 4px;">${diffObj.title}</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px;">Trova i 3 dettagli discordanti tra le due tavole epiche (Trovate: <strong id="diff-found-count" style="color:var(--gold);">0/${diffObj.totalDiffs}</strong>).</p>
          <div class="diff-split">
            <div class="diff-image-wrapper" id="diff-box-left" onclick="EroiMinigames.clickDiffImage(event)">
              <img src="${imgSrc}" alt="Tavola A (Originale)">
            </div>
            <div class="diff-image-wrapper" id="diff-box-right" onclick="EroiMinigames.clickDiffImage(event)">
              <img src="${imgSrc}" alt="Tavola B (Indagine)" style="filter: sepia(0.2) contrast(1.05);">
            </div>
          </div>
          <div style="display: flex; justify-content: center; gap: 10px; margin-top: 15px;">
            <button class="btn btn-secondary" onclick="EroiMinigames.hintDifferenze()"><i class="fa-solid fa-lightbulb"></i> Aiuto (-2 🪙)</button>
            <button class="btn btn-secondary" onclick="EroiMinigames.skipCurrent('differenze')"><i class="fa-solid fa-forward-step"></i> Passa</button>
          </div>
        </div>
      `;
    },

    clickDiffImage: function(event) {
      const ds = this.diffState;
      if (!ds || !ds.current) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = ((event.clientX - rect.left) / rect.width) * 100;
      const clickY = ((event.clientY - rect.top) / rect.height) * 100;

      let hit = null;
      ds.current.diffs.forEach(d => {
        if (!ds.foundIds.has(d.id)) {
          const dist = Math.sqrt(Math.pow(clickX - d.x, 2) + Math.pow(clickY - d.y, 2));
          if (dist < 15) hit = d;
        }
      });

      if (hit) {
        ds.foundIds.add(hit.id);
        const marker = document.createElement('div');
        marker.className = 'diff-marker';
        marker.style.left = `${hit.x}%`;
        marker.style.top = `${hit.y}%`;
        event.currentTarget.appendChild(marker);

        const countLabel = document.getElementById('diff-found-count');
        if (countLabel) countLabel.textContent = `${ds.foundIds.size}/${ds.current.totalDiffs}`;

        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast(`Differenza trovata: ${hit.label}!`, 'success');

        if (ds.foundIds.size >= ds.current.totalDiffs) {
          setTimeout(() => {
            if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Tutte le differenze trovate! Bravo osservatore!', 'success');
            this.rewardAndNext('differenze', 25, 12);
          }, 600);
        }
      } else {
        if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast('Nessuna differenza qui. Osserva attentamente!', 'info');
      }
    },

    hintDifferenze: function() {
      const ds = this.diffState;
      if (!ds || !ds.current) return;
      this.useDracmeForHint(2, () => {
        const remaining = ds.current.diffs.filter(d => !ds.foundIds.has(d.id));
        if (remaining.length > 0) {
          if (window.EroiApp && window.EroiApp.showToast) window.EroiApp.showToast(`Cerca attorno a: ${remaining[0].label}`, 'info');
        }
      });
    },

    // =====================================================
    // HELPER INDIZI & DRACME
    // =====================================================
    useDracmeForHint: function(cost, callback) {
      cost = cost || 2;
      try {
        const user = (window.EroiAuth && window.EroiAuth.getCurrentUser && window.EroiAuth.getCurrentUser()) || (window.Auth && window.Auth.getUser && window.Auth.getUser()) || null;
        const userEmail = user ? (user.email || user.username || 'viandante') : 'viandante';
        let currentDracme = 999;
        if (window.EroiGame && window.EroiGame.getProfile) {
          const p = window.EroiGame.getProfile(userEmail);
          if (p && typeof p.dracme === 'number') currentDracme = p.dracme;
        }

        if (currentDracme < cost) {
          if (window.EroiApp && window.EroiApp.showToast) {
            window.EroiApp.showToast(`Dracme insufficienti! Ti servono ${cost} Dracme 🪙 per questo indizio.`, 'warning');
          }
          return;
        }

        if (window.EroiGame && window.EroiGame.addDracme && userEmail !== 'viandante') {
          window.EroiGame.addDracme(userEmail, -cost);
        }
        if (window.EroiApp && window.EroiApp.showToast) {
          window.EroiApp.showToast(`Indizio sbloccato! (-${cost} 🪙)`, 'info');
        }
        if (typeof callback === 'function') callback();
      } catch(e) {
        if (typeof callback === 'function') callback();
      }
    },

    skipCurrent: function(type) {
      if (window.EroiApp && window.EroiApp.showToast) {
        window.EroiApp.showToast('Esercizio saltato. Proseguiamo con il prossimo!', 'info');
      }
      this.startMinigame(type, currentMissionId);
    },

    // =====================================================
    // RICOMPENSE CALIBRATE (1° Vittoria vs Replay Allenamento)
    // =====================================================
    rewardAndNext: function(type, defaultXp, defaultDracme) {
      try {
        const user = (window.EroiAuth && window.EroiAuth.getCurrentUser && window.EroiAuth.getCurrentUser()) || (window.Auth && window.Auth.getUser && window.Auth.getUser()) || null;
        const userEmail = user ? (user.email || user.username || 'viandante') : 'viandante';
        
        // Traccia minigiochi vinti per evitare grinding
        const storageKey = 'eroi_completed_minigames_' + userEmail;
        let completed = {};
        try { completed = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch(e) {}
        
        const missionKey = (currentMissionId || 'default') + '_' + type;
        const isFirstWin = !completed[missionKey];
        
        const xp = isFirstWin ? (defaultXp || 20) : 5;
        const dracme = isFirstWin ? (defaultDracme || 10) : 2;
        
        if (isFirstWin) {
          completed[missionKey] = true;
          try { localStorage.setItem(storageKey, JSON.stringify(completed)); } catch(e) {}
        }
        
        if (window.EroiGame && window.EroiGame.addXP) {
          window.EroiGame.addXP(userEmail, xp);
          window.EroiGame.addDracme(userEmail, dracme);
        }
        
        const toastMsg = isFirstWin 
          ? `🏆 Vittoria! +${xp} XP e +${dracme} Dracme d'Oro 🪙` 
          : `⚡ Allenamento completato! +${xp} XP e +${dracme} Dracme 🪙`;
          
        if (window.EroiApp && window.EroiApp.showToast) {
          window.EroiApp.showToast(toastMsg, 'success');
        }
      } catch(e) { console.warn('Reward error:', e); }
      
      this.startMinigame(type, currentMissionId);
    }
  };

})();
