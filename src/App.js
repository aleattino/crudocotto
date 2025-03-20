import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

const NeoBrutalismCrudoCotto = () => {
  // Dati delle tabelle di conversione
  const conversionData = {
    "Carne": [
      { 
        alimento: "Bovino adulto magro", 
        fattore: 0.65,
        info: "Durante la cottura, la carne bovina perde circa il 35% del suo peso a causa dell'evaporazione dell'acqua e della contrazione delle fibre muscolari dovuta alla denaturazione delle proteine. La perdita di peso è influenzata dal contenuto di grasso e dal metodo di cottura.",
        tip: "Per mantenere la succulenza della carne bovina, lasciarla riposare per 5-10 minuti dopo la cottura. Questo permette ai succhi di ridistribuirsi nelle fibre muscolari invece di fuoriuscire al taglio."
      },
      { 
        alimento: "Pollo (petto)", 
        fattore: 0.90,
        info: "Il petto di pollo ha una perdita di peso relativamente limitata durante la cottura (circa 10%) grazie al basso contenuto di grasso e alla struttura compatta delle fibre muscolari che trattengono meglio l'umidità.",
        tip: "Per un petto di pollo perfettamente cotto, utilizzare la tecnica della doratura seguita da cottura a fuoco medio-basso. Interrompere la cottura quando la temperatura interna raggiunge 73°C per evitare che diventi secco."
      },
      { 
        alimento: "Pollo (coscio)", 
        fattore: 0.76,
        info: "Il coscio di pollo perde circa il 24% del suo peso durante la cottura. La maggiore perdita rispetto al petto è dovuta al più elevato contenuto di grasso e collagene che si sciolgono con il calore.",
        tip: "La cottura lenta e a temperatura moderata (150-160°C) permette al collagene di trasformarsi in gelatina, rendendo il coscio di pollo tenero e succoso. Ideale la cottura con pelle per mantenere l'umidità."
      },
      { 
        alimento: "Tacchino (petto)", 
        fattore: 1.00,
        info: "Il petto di tacchino ha una composizione proteica e un contenuto di umidità che porta a una minima perdita di peso durante la cottura. Il fattore di conversione 1:1 indica che il peso rimane sostanzialmente invariato.",
        tip: "Per evitare che il petto di tacchino diventi secco, considerare la marinatura con olio e acidi (limone, yogurt) per almeno 2 ore prima della cottura. Questo aiuta a denaturare parzialmente le proteine, migliorando la ritenzione di umidità."
      },
      { 
        alimento: "Tacchino (coscio)", 
        fattore: 0.70,
        info: "Il coscio di tacchino perde circa il 30% del suo peso durante la cottura. La perdita è causata principalmente dalla fuoriuscita di grasso e umidità dalle fibre muscolari, più pronunciata nelle parti scure della carne.",
        tip: "La cottura a bassa temperatura (140-150°C) per tempi prolungati permette al collagene di trasformarsi in gelatina senza eccessiva perdita di umidità. Spennellare periodicamente con i succhi di cottura per mantenere la superficie idratata."
      }
    ],
    "Pesce fresco": [
      { 
        alimento: "Alici", 
        fattore: 0.85,
        info: "Le alici fresche perdono circa il 15% del loro peso durante la cottura. La loro struttura proteica subisce una rapida denaturazione, causando il restringimento delle fibre muscolari e la conseguente perdita di acqua.",
        tip: "Le alici richiedono cotture brevissime (1-2 minuti per lato) per mantenere la loro texture delicata. La cottura eccessiva porta a una consistenza gommosa e a una maggiore perdita di nutrienti essenziali."
      },
      { 
        alimento: "Cefalo", 
        fattore: 0.85,
        info: "Il cefalo mantiene l'85% del peso originale dopo la cottura. La perdita di peso è dovuta principalmente alla contrazione delle proteine muscolari che espellono parte dell'acqua contenuta nei tessuti.",
        tip: "Il cefalo ha una carne che tende a seccarsi rapidamente. La cottura al cartoccio o al vapore aiuta a preservare l'umidità naturale e i sapori. La presenza di pelle durante la cottura funge da barriera contro l'eccessiva perdita di liquidi."
      },
      { 
        alimento: "Cernia", 
        fattore: 0.85,
        info: "La cernia fresca perde circa il 15% del peso durante la cottura. La sua carne compatta e a basso contenuto di grasso subisce una moderata contrazione, con conseguente rilascio di umidità.",
        tip: "Per una cottura ottimale della cernia, prediligere metodi delicati come la cottura al vapore o al forno a bassa temperatura (160°C). La cottura rapida ad alta temperatura causa maggiore contrazione e perdita di umidità."
      },
      { 
        alimento: "Dentice", 
        fattore: 0.85,
        info: "Il dentice mantiene l'85% del suo peso durante la cottura. La sua carne, ricca di proteine e con moderato contenuto di grasso, subisce una denaturazione proteica che causa una modesta perdita di liquidi.",
        tip: "La cottura ideale del dentice prevede temperature moderate (170-180°C) per preservare la succulenza. La presalatura 30 minuti prima della cottura migliora la ritenzione dell'umidità, creando una barriera proteica sulla superficie."
      },
      { 
        alimento: "Merluzzo", 
        fattore: 0.85,
        info: "Il merluzzo fresco perde circa il 15% del peso durante la cottura. La sua carne magra e a elevato contenuto d'acqua rilascia umidità quando le proteine si contraggono per effetto del calore.",
        tip: "Il merluzzo ha fibre muscolari delicate che si separano facilmente con la sovracottura. Interrompere la cottura quando la carne inizia appena a sfaldarsi (circa 60°C al cuore) per massima succulenza e texture ideale."
      },
      { 
        alimento: "Orata", 
        fattore: 0.85,
        info: "L'orata mantiene l'85% del peso originale dopo la cottura. La moderata perdita di peso è dovuta alla contrazione delle fibre muscolari e alla fuoriuscita di parte dell'acqua tissutale.",
        tip: "La cottura dell'orata intera, con pelle e possibilmente squame, crea una barriera naturale che riduce la perdita di umidità. L'aggiunta di erbe aromatiche nella cavità addominale migliora il sapore e mantiene l'umidità della carne."
      },
      { 
        alimento: "Sgombro", 
        fattore: 0.65,
        info: "Lo sgombro perde circa il 35% del suo peso durante la cottura, una percentuale maggiore rispetto ad altri pesci. Questo è dovuto all'alto contenuto di grassi che si sciolgono durante la cottura, oltre alla normale perdita di acqua.",
        tip: "Per lo sgombro, le cotture brevi e intense (grigliatura, scottatura) sono ideali per preservare gli acidi grassi omega-3 benefici. La marinatura preventiva con acidi (limone, aceto) aiuta a stabilizzare le proteine, riducendo la perdita di nutrienti."
      },
      { 
        alimento: "Sogliola o rombo", 
        fattore: 0.80,
        info: "La sogliola e il rombo perdono circa il 20% del loro peso durante la cottura. La loro carne delicata subisce una moderata contrazione delle fibre muscolari con conseguente rilascio di umidità.",
        tip: "Per pesci piatti come sogliola e rombo, la cottura a temperatura moderata (160-170°C) preserva la delicata texture. La cottura eccessiva causa rapidamente secchezza; considerare ultimata la cottura quando la carne si stacca facilmente dalla lisca centrale."
      },
      { 
        alimento: "Spigola", 
        fattore: 0.85,
        info: "La spigola mantiene l'85% del suo peso iniziale dopo la cottura. La perdita del 15% è dovuta principalmente alla contrazione delle proteine muscolari che espellono parte dell'acqua intracellulare.",
        tip: "La cottura della spigola al sale (completamente ricoperta di sale grosso) crea un guscio che mantiene l'umidità all'interno, preservando sapore e consistenza. La temperatura interna ideale è di 58-60°C per una texture perfetta."
      },
      { 
        alimento: "Tonno fresco o pesce spada", 
        fattore: 0.80,
        info: "Il tonno fresco e il pesce spada perdono circa il 20% del loro peso durante la cottura. La loro carne densa e con moderato contenuto di grasso subisce una contrazione che causa la fuoriuscita di liquidi.",
        tip: "Per tonno e pesce spada, la cottura al sangue o media (45-50°C al cuore) preserva la morbidezza e i nutrienti. Questi pesci continuano a cuocere anche dopo essere stati rimossi dalla fonte di calore, quindi terminare la cottura leggermente prima del punto desiderato."
      }
    ],
    "Pesce surgelato": [
      { 
        alimento: "Cernia", 
        fattore: 0.80,
        info: "La cernia surgelata perde circa il 20% del peso durante la cottura. Il processo di congelamento forma cristalli di ghiaccio che danneggiano le membrane cellulari, causando una maggiore perdita di liquidi durante la successiva cottura rispetto al pesce fresco.",
        tip: "Per la cernia surgelata, lo scongelamento lento in frigorifero (12-24 ore) minimizza la perdita di umidità. La cottura senza scongelamento completo può ridurre ulteriormente la perdita di liquidi, specialmente con metodi come la cottura al vapore."
      },
      { 
        alimento: "Dentice", 
        fattore: 0.80,
        info: "Il dentice surgelato mantiene l'80% del suo peso dopo la cottura. La perdita del 20% è dovuta sia alla rottura cellulare causata dal congelamento che alla normale contrazione proteica durante la cottura.",
        tip: "Per il dentice surgelato, l'aggiunta di un sottile strato di olio prima della cottura crea una barriera che riduce la perdita di umidità. Le temperature moderate (170°C) e tempi più brevi rispetto al pesce fresco migliorano la texture finale."
      },
      { 
        alimento: "Filetti di platessa", 
        fattore: 0.70,
        info: "I filetti di platessa surgelati perdono circa il 30% del loro peso durante la cottura. La loro struttura delicata e sottile subisce un maggiore danneggiamento durante il congelamento, risultando in una significativa perdita di liquidi in cottura.",
        tip: "Per i filetti di platessa surgelati, la cottura avvolta in carta da forno o alluminio crea un ambiente umido che riduce la perdita di liquidi. Aggiungere un filo d'olio e aromi a contatto con il pesce migliora il gusto e mantiene la texture."
      },
      { 
        alimento: "Merluzzo", 
        fattore: 0.80,
        info: "Il merluzzo surgelato perde il 20% del peso durante la cottura. Il processo di congelamento altera la struttura delle proteine muscolari, aumentando leggermente la perdita di liquidi rispetto al prodotto fresco.",
        tip: "Per il merluzzo surgelato, la panatura leggera crea una barriera che trattiene l'umidità durante la cottura. La cottura al forno a temperatura moderata (180°C) in un ambiente umido (aggiungendo un po' d'acqua nella teglia) riduce la perdita di liquidi."
      },
      { 
        alimento: "Spigola oppure orata", 
        fattore: 0.80,
        info: "La spigola e l'orata surgelate mantengono l'80% del loro peso dopo la cottura. La perdita del 20% è causata dalla combinazione del danneggiamento cellulare durante il congelamento e dalla normale contrazione proteica in cottura.",
        tip: "Per spigola e orata surgelate, la cottura con pelle mantiene meglio l'umidità. La tecnica della cottura en papillote (in cartoccio) con l'aggiunta di liquidi aromatici crea un ambiente umido che preserva la morbidezza della carne."
      }
    ],
    "Cereali e derivati": [
      { 
        alimento: "Pasta di semola corta", 
        fattore: 2.00,
        info: "Durante la cottura, l'amido della pasta assorbe acqua, aumentando il suo peso di circa il doppio. Questo processo, chiamato gelatinizzazione dell'amido, è responsabile della consistenza morbida della pasta cotta.",
        tip: "Per una cottura ottimale, cuoci in abbondante acqua salata (10g di sale per litro). La pasta al dente trattiene meglio i condimenti e ha un indice glicemico più basso."
      },
      { 
        alimento: "Pasta di semola lunga", 
        fattore: 2.40,
        info: "La pasta lunga, come spaghetti e linguine, tende ad assorbire più acqua rispetto alla pasta corta a causa della maggiore superficie esposta. L'amido presente assorbe l'acqua durante la cottura, aumentando il peso di circa 2,4 volte.",
        tip: "Per evitare che si attacchi, immergi la pasta lunga in acqua bollente e mescola nei primi 30 secondi. Non spezzarla: si cuocerà uniformemente piegandosi naturalmente nel liquido."
      },
      { 
        alimento: "Pasta all'uovo secca", 
        fattore: 3.00,
        info: "La pasta all'uovo contiene proteine aggiuntive che, insieme all'amido, assorbono una quantità maggiore di acqua durante la cottura, triplicando il peso originale.",
        tip: "La pasta all'uovo richiede tempi di cottura più brevi rispetto alla pasta di semola. Controlla la consistenza 1-2 minuti prima del tempo indicato sulla confezione."
      },
      { 
        alimento: "Riso", 
        fattore: 2.50,
        info: "Il riso assorbe significativamente l'acqua durante la cottura. I granelli si espandono quando l'amido assorbe l'umidità, aumentando il peso di circa 2,5 volte rispetto al crudo.",
        tip: "Per un riso perfettamente cotto, rispetta il rapporto 1:2 (una parte di riso, due di acqua). Dopo l'ebollizione, cuoci a fuoco lento con coperchio senza mescolare per ottenere chicchi separati."
      },
      { 
        alimento: "Tortellini ravioli freschi", 
        fattore: 2.00,
        info: "La pasta ripiena fresca contiene già umidità, quindi l'aumento di peso durante la cottura è minore rispetto alla pasta secca. L'incremento è dovuto principalmente all'assorbimento di acqua nell'involucro di pasta.",
        tip: "I tortellini sono cotti quando risalgono in superficie. Scolali entro 20-30 secondi da questo momento per evitare che il ripieno perda sapore e la pasta si sfalsi."
      }
    ],
    "Verdure e ortaggi": [
      { 
        alimento: "Agretti", 
        fattore: 0.80,
        info: "Gli agretti perdono parte dell'acqua contenuta durante la cottura, riducendo il loro peso all'80% del valore iniziale. Questo è dovuto alla rottura delle cellule vegetali che rilasciano acqua.",
        tip: "Per preservare il sapore caratteristico, cuoci gli agretti in poca acqua salata per soli 3-4 minuti. Completare la cottura in padella conserva meglio nutrienti e consistenza."
      },
      { 
        alimento: "Asparagi", 
        fattore: 0.90,
        info: "La struttura fibrosa degli asparagi trattiene buona parte dell'acqua durante la cottura, con una perdita limitata di peso, circa il 10% del peso originale.",
        tip: "Cuoci gli asparagi in posizione verticale con le punte fuori dall'acqua per una cottura uniforme. Le punte cuociono più velocemente dei gambi e vanno protette dall'eccessivo calore."
      },
      { 
        alimento: "Bieta", 
        fattore: 0.80,
        info: "La bieta, come molte verdure a foglia, perde circa il 20% dell'acqua durante la cottura per via della rottura delle pareti cellulari.",
        tip: "Per massimizzare il contenuto di antiossidanti, cuoci la bieta a vapore invece che in acqua bollente. Mantiene così più nutrienti e una consistenza migliore."
      },
      { 
        alimento: "Broccoletti a testa", 
        fattore: 0.90,
        info: "I broccoletti a testa mantengono gran parte della loro massa durante la cottura grazie alla struttura compatta dei tessuti.",
        tip: "Per mantenere il colore verde brillante e massimizzare l'assimilazione dei nutrienti, scottali in acqua bollente per 3-4 minuti e poi raffreddali rapidamente in acqua ghiacciata."
      },
      { 
        alimento: "Broccoletti di rapa", 
        fattore: 0.90,
        info: "Con una buona capacità di trattenere l'acqua, i broccoletti di rapa perdono solo il 10% del loro peso durante la cottura.",
        tip: "Per ridurre l'amarezza, sbollenta brevemente in acqua salata e completa la cottura in padella. L'aggiunta di un pizzico di bicarbonato all'acqua di cottura mantiene il colore vivace."
      },
      { 
        alimento: "Carciofi", 
        fattore: 0.75,
        info: "I carciofi perdono una quantità significativa di acqua durante la cottura, riducendosi a circa il 75% del peso originale.",
        tip: "Per evitare l'ossidazione, immergili subito in acqua acidulata con limone. La cottura al vapore per 20-30 minuti mantiene intatti più aromi rispetto alla bollitura."
      },
      { 
        alimento: "Cardi", 
        fattore: 0.60,
        info: "I cardi hanno un'elevata perdita di acqua durante la cottura, mantenendo solo il 60% del peso originale.",
        tip: "Prima della cottura, immergi i cardi in acqua acidulata per evitare l'imbrunimento. La prebollitura con un cucchiaio di farina riduce l'amarezza prima della cottura finale."
      }
    ],
    "Legumi freschi": [
      { 
        alimento: "Fagiolini", 
        fattore: 0.95,
        info: "I fagiolini mantengono buona parte del loro peso durante la cottura grazie alla buccia resistente che impedisce una eccessiva perdita d'acqua.",
        tip: "La cottura al vapore per 4-5 minuti mantiene la croccantezza e il colore vivace. Il raffreddamento rapido in acqua ghiacciata ferma immediatamente la cottura preservando consistenza e nutrienti."
      },
      { 
        alimento: "Fave", 
        fattore: 0.80,
        info: "Le fave fresche perdono circa il 20% del loro peso durante la cottura per via del rilascio di acqua contenuta all'interno dei semi.",
        tip: "Rimuovi la pellicina esterna dopo la cottura per una consistenza più morbida e digeribile. Le fave giovani richiedono solo 3-4 minuti di cottura per preservare dolcezza e colore."
      },
      { 
        alimento: "Piselli", 
        fattore: 0.87,
        info: "I piselli freschi perdono parte dell'umidità durante la cottura, mantenendo comunque una buona percentuale della loro massa originale grazie alla buccia protettiva.",
        tip: "I piselli freschi necessitano solo di 3-4 minuti di cottura. Tempi più lunghi degradano la clorofilla, causando perdita di colore e nutrienti. Il congelamento rapido preserva meglio i nutrienti."
      }
    ],
    "Legumi secchi": [
      { 
        alimento: "Ceci", 
        fattore: 3.00,
        info: "I ceci secchi assorbono molta acqua durante l'ammollo e la cottura, aumentando il loro peso di circa tre volte. Questo è dovuto alla reidratazione delle proteine e dell'amido presenti.",
        tip: "L'ammollo con bicarbonato (1/2 cucchiaino per litro) riduce i tempi di cottura del 25% e migliora la digeribilità. L'aggiunta di foglie di alloro previene la formazione di schiuma durante la cottura."
      },
      { 
        alimento: "Fagioli", 
        fattore: 2.50,
        info: "I fagioli secchi, durante ammollo e cottura, assorbono acqua che viene incorporata nelle cellule precedentemente disidratate, aumentando il peso di 2,5 volte.",
        tip: "Non salare i fagioli durante la cottura ma solo negli ultimi 10 minuti: il sale rallenta l'assorbimento dell'acqua e indurisce la buccia, allungando i tempi di cottura."
      },
      { 
        alimento: "Lenticchie", 
        fattore: 2.50,
        info: "Le lenticchie secche raddoppiano e mezzo il loro peso durante la cottura grazie all'assorbimento di acqua. Hanno una capacità di assorbimento simile ai fagioli ma richiedono tempi minori.",
        tip: "Le lenticchie rosse decorticate cuociono in soli 15-20 minuti e non richiedono ammollo. Le lenticchie verdi e marroni mantengono meglio la forma durante la cottura, ideali per insalate."
      }
    ]
  };

  // Stati per l'applicazione
  const firstCategory = Object.keys(conversionData)[0];
  const [categoria, setCategoria] = useState(firstCategory);
  const [alimento, setAlimento] = useState(conversionData[firstCategory][0]?.alimento || '');
  const [quantita, setQuantita] = useState('');
  const [direzione, setDirezione] = useState('crudoCotto'); // 'crudoCotto' o 'cottoCrudo'
  const [risultato, setRisultato] = useState(null);
  const [fattore, setFattore] = useState(conversionData[firstCategory][0]?.fattore || 1);
  const [tema, setTema] = useState('light'); // 'light', 'dark'
  const [isCalcolando, setIsCalcolando] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [tipText, setTipText] = useState('');
  
  const isDark = tema === 'dark';
  
  const risultatoRef = useRef(null);
  const inputRef = useRef(null);
  const infoRef = useRef(null);
  const infoButtonRef = useRef(null);

  // Previene lo zoom su iOS quando si fa focus sull'input
  useEffect(() => {
    const preventZoom = () => {
      document.documentElement.style.touchAction = 'manipulation';
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.documentElement.style.webkitTextSizeAdjust = '100%';
      }
      
      // Assicuriamoci che il viewport sia impostato correttamente
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
    };

    // Chiamiamo preventZoom all'inizio e anche quando si tocca l'input
    preventZoom();
    
    // Aggiungiamo listener per il focus sull'input
    const handleInputInteraction = () => {
      preventZoom();
    };
    
    if (inputRef.current) {
      inputRef.current.addEventListener('focus', handleInputInteraction);
      inputRef.current.addEventListener('touchstart', handleInputInteraction);
      
      return () => {
        if (inputRef.current) {
          inputRef.current.removeEventListener('focus', handleInputInteraction);
          inputRef.current.removeEventListener('touchstart', handleInputInteraction);
        }
      };
    }
  }, []);

  // Aggiorna il fattore di conversione quando l'alimento cambia
  useEffect(() => {
    if (categoria && alimento && conversionData[categoria]) {
      const alimentoScelto = conversionData[categoria].find(item => item.alimento === alimento);
      if (alimentoScelto) {
        setFattore(alimentoScelto.fattore);
        setInfoText(alimentoScelto.info || '');
        setTipText(alimentoScelto.tip || '');
      }
    }
  }, [alimento, categoria]);
  
  // Effetto di scrolling
  useEffect(() => {
    if (risultato && risultatoRef.current) {
      risultatoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [risultato]);

  // Chiudi info popup quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (infoRef.current && !infoRef.current.contains(event.target) && 
          infoButtonRef.current && !infoButtonRef.current.contains(event.target)) {
        setInfoVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Gestisce il cambio di categoria
  const handleCategoriaChange = (e) => {
    const nuovaCategoria = e.target.value;
    setCategoria(nuovaCategoria);
    if (conversionData[nuovaCategoria] && conversionData[nuovaCategoria].length > 0) {
      setAlimento(conversionData[nuovaCategoria][0].alimento);
    }
  };

  // Gestisce il cambio di alimento
  const handleAlimentoChange = (e) => {
    setAlimento(e.target.value);
  };

  // Gestisce il cambio di quantità
  const handleQuantitaChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setQuantita(val);
    }
  };

  // Gestisce il cambio di direzione (crudo->cotto o cotto->crudo)
  const handleDirezioneChange = (dir) => {
    setDirezione(dir);
  };

  // Mostra informazioni sull'alimento
  const showInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInfoVisible(!infoVisible);
  };

  // Calcola il risultato della conversione con animazione
  const calcolaRisultato = () => {
    if (!quantita) return;

    setIsCalcolando(true);
    
    // Simula un breve ritardo per l'effetto di calcolo
    setTimeout(() => {
      const q = parseFloat(quantita);
      let result;

      if (direzione === 'crudoCotto') {
        result = q * fattore;
      } else {
        result = q / fattore;
      }

      setRisultato(result.toFixed(1));
      setIsCalcolando(false);
    }, 300);
  };

  // Cambia il tema
  const toggleTema = () => {
    setTema(isDark ? 'light' : 'dark');
  };

  // Reset del form
  const resetForm = () => {
    setRisultato(null);
  };

  return (
    <div className={`neobrutal-app ${isDark ? 'dark' : 'light'}`}>
      <div className="nb-noise-overlay"></div>
      
      <header className="nb-header">
        <div className="nb-logo">
          <h1>CrudoCotto</h1>
        </div>
        
        <button 
          onClick={toggleTema}
          className="nb-theme-toggle" 
          aria-label={isDark ? "Passa al tema chiaro" : "Passa al tema scuro"}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>
      
      <main className="nb-main">
        <div className="nb-card nb-main-card">
          {/* Toggle direction conversion */}
          <div className="nb-toggle-container">
            <div className="nb-toggle-track">
              <button 
                onClick={() => handleDirezioneChange('crudoCotto')}
                className={`nb-toggle-option ${direzione === 'crudoCotto' ? 'active' : ''}`}
              >
                Da crudo a cotto
              </button>
              <button 
                onClick={() => handleDirezioneChange('cottoCrudo')}
                className={`nb-toggle-option ${direzione === 'cottoCrudo' ? 'active' : ''}`}
              >
                Da cotto a crudo
              </button>
            </div>
          </div>
          
          {/* Category Selection */}
          <div className="nb-field">
            <label className="nb-label">
              Categoria
            </label>
            <div className="nb-select-wrapper">
              <select 
                value={categoria}
                onChange={handleCategoriaChange}
                className="nb-select"
              >
                {Object.keys(conversionData).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="nb-select-arrow">↓</span>
            </div>
          </div>
          
          {/* Food Selection with Info Button */}
          <div className="nb-field">
            <div className="nb-label-row">
              <label className="nb-label">
                Alimento
              </label>
              <button 
                ref={infoButtonRef}
                onClick={showInfo}
                className="nb-info-btn"
                aria-label="Informazioni sull'alimento"
              >
                i
              </button>
            </div>
            <div className="nb-select-wrapper">
              <select 
                value={alimento}
                onChange={handleAlimentoChange}
                className="nb-select"
              >
                {conversionData[categoria].map(item => (
                  <option key={item.alimento} value={item.alimento}>{item.alimento}</option>
                ))}
              </select>
              <span className="nb-select-arrow">↓</span>
            </div>
            
            {/* Info Tooltip */}
            {infoVisible && (
              <div ref={infoRef} className="nb-info-tooltip">
                <button 
                  onClick={() => setInfoVisible(false)}
                  className="nb-tooltip-close-btn"
                  aria-label="Chiudi informazioni"
                >
                  ✕
                </button>
                
                <h4 className="nb-tooltip-title">{alimento}</h4>
                <p className="nb-tooltip-content">{infoText}</p>
              </div>
            )}
          </div>
          
          {/* Quantity Input */}
          <div className="nb-field">
            <label className="nb-label">
              Quantità in grammi ({direzione === 'crudoCotto' ? 'crudo' : 'cotto'})
            </label>
            <div className="nb-input-wrapper">
              <input 
                ref={inputRef}
                type="text" 
                inputMode="decimal"
                value={quantita}
                onChange={handleQuantitaChange}
                placeholder="Inserisci la quantità in grammi" 
                className="nb-input"
              />
              <span className="nb-input-suffix">g</span>
            </div>
          </div>
          
          {/* Action Button */}
          <button 
            onClick={calcolaRisultato}
            disabled={!quantita || isCalcolando}
            className={!quantita || isCalcolando ? 'nb-button disabled' : 'nb-button'}
          >
            {isCalcolando ? 'Calcolando...' : 'Calcola'}
          </button>
        </div>
        
        {/* Result Card */}
        {risultato && (
          <div 
            ref={risultatoRef}
            className="nb-card nb-result-card"
          >
            {/* Close button */}
            <button 
              onClick={resetForm}
              className="nb-close-btn"
              aria-label="Chiudi risultato"
            >
              ✕
            </button>
            
            <h3 className="nb-card-title">
              Risultato della conversione
            </h3>
            
            <div className="nb-result">
              <div className="nb-result-value">
                {risultato} g
              </div>
              <div className="nb-result-unit">
                {direzione === 'crudoCotto' ? 'cotto' : 'crudo'}
              </div>
            </div>
            
            <div className="nb-factor-badge">
              Fattore di conversione: {fattore.toFixed(2)}
            </div>
            
            {/* Cooking Tip */}
            {tipText && (
              <div className="nb-cooking-tip">
                <div className="nb-tip-icon">💡</div>
                <p className="nb-tip-text">{tipText}</p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="nb-footer">
        CrudoCotto &copy; {new Date().getFullYear()} | 
        <a href="https://github.com/aleattino" className="nb-link">
          aleattino
        </a>
      </footer>
    </div>
  );
};

export default NeoBrutalismCrudoCotto;
