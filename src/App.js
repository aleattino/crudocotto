import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

const CrudoCottoApp = () => {
  // Dati delle tabelle di conversione con suggerimenti di cottura
  const conversionData = {
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
      },
      { 
        alimento: "Carote", 
        fattore: 0.85,
        info: "Le carote, grazie alla loro densità, perdono solo circa il 15% del peso durante la cottura.",
        tip: "Le carote cotte intere conservano fino al 25% in più di antiossidanti rispetto a quelle tagliate. La cottura aumenta la biodisponibilità del beta-carotene."
      },
      { 
        alimento: "Cavolfiore", 
        fattore: 0.90,
        info: "Il cavolfiore mantiene gran parte del suo peso durante la cottura, perdendo solo circa il 10%.",
        tip: "Per ridurre l'odore durante la cottura, aggiungi un cucchiaino di aceto all'acqua. La cottura a vapore o al forno preserva meglio i composti solforati benefici."
      },
      { 
        alimento: "Cavoli di Bruxelles", 
        fattore: 0.90,
        info: "I cavoli di Bruxelles hanno una struttura compatta che contribuisce a limitare la perdita di peso durante la cottura.",
        tip: "Incidi una piccola X alla base per una cottura più uniforme. La tostatura a forno caldo (200°C) sviluppa zuccheri che bilanciano il sapore amarognolo."
      },
      { 
        alimento: "Cavolo broccolo verde ramoso", 
        fattore: 0.60,
        info: "Il cavolo broccolo ramoso perde circa il 40% del suo peso durante la cottura per via dell'elevata superficie esposta.",
        tip: "La cottura breve (3-5 minuti) preserva enzimi anticancro come la mirosinasi. Per massimizzare i benefici, trita il broccolo crudo 40 minuti prima della cottura."
      },
      { 
        alimento: "Cavolo cappuccio verde", 
        fattore: 1.00,
        info: "Il cavolo cappuccio verde mantiene praticamente invariato il suo peso durante la cottura grazie alla struttura compatta.",
        tip: "La fermentazione naturale (come nei crauti) aumenta la vitamina C e crea probiotici benefici. Se cotto, tempi brevi preservano la croccantezza e il valore nutrizionale."
      },
      { 
        alimento: "Cavolo verza", 
        fattore: 1.00,
        info: "La verza mantiene il suo peso durante la cottura grazie alla sua struttura e alla ridotta perdita di acqua.",
        tip: "Rimuovi la costa centrale dura per una cottura più uniforme. La cottura lenta (brasatura) sviluppa sapori dolci naturali riducendo l'amarezza."
      },
      { 
        alimento: "Cicoria di campo", 
        fattore: 1.00,
        info: "La cicoria di campo mantiene il suo peso durante la cottura, soprattutto se cotta per breve tempo.",
        tip: "La cottura rapida in acqua bollente seguita da raffreddamento in acqua ghiacciata riduce l'amarezza mantenendo il colore vivace e i nutrienti."
      },
      { 
        alimento: "Cicoria di taglio coltivata", 
        fattore: 0.80,
        info: "La cicoria coltivata perde circa il 20% del suo peso durante la cottura.",
        tip: "La combinazione con ingredienti dolci come uvetta o riduzione di aceto balsamico bilancia naturalmente l'amarezza senza eliminare i composti benefici."
      },
      { 
        alimento: "Cipolle", 
        fattore: 0.70,
        info: "Le cipolle perdono circa il 30% del loro peso durante la cottura, principalmente per l'evaporazione dell'acqua.",
        tip: "La caramellizzazione lenta (30-40 minuti a fuoco basso) converte gli zuccheri complessi in zuccheri semplici, creando il tipico sapore dolce e riducendo la piccantezza."
      },
      { 
        alimento: "Finocchi", 
        fattore: 0.85,
        info: "I finocchi perdono circa il 15% del peso durante la cottura mantenendo parte della loro croccantezza.",
        tip: "La cottura a vapore preserva l'anetolo, il composto che conferisce il caratteristico aroma di anice. La cottura al forno caramellizza gli zuccheri naturali sviluppando dolcezza."
      },
      { 
        alimento: "Funghi", 
        fattore: 0.60,
        info: "I funghi hanno un alto contenuto di acqua che viene rilasciata durante la cottura, causando una riduzione del 40% del peso.",
        tip: "Cuoci i funghi in padella ben calda senza affollare per evaporare rapidamente l'acqua. Questo metodo concentra i sapori e mantiene la consistenza senza renderli acquosi."
      },
      { 
        alimento: "Patata con buccia", 
        fattore: 1.00,
        info: "Le patate con buccia mantengono il loro peso durante la cottura poiché la buccia limita la perdita di acqua.",
        tip: "La cottura con buccia preserva fino al 30% in più di vitamina C e minerali. Per la massima ritenzione di nutrienti, cuoci al vapore o al microonde anziché bollire."
      },
      { 
        alimento: "Patata pelata", 
        fattore: 0.85,
        info: "Le patate pelate perdono circa il 15% del loro peso durante la cottura per via dell'assenza della buccia protettiva.",
        tip: "Per ridurre la perdita di nutrienti in acqua, inizia la cottura con acqua fredda. L'amido resistente che si forma dopo il raffreddamento ha benefici per la flora intestinale."
      },
      { 
        alimento: "Porri", 
        fattore: 1.00,
        info: "I porri mantengono il loro peso durante la cottura grazie alla struttura stratificata che aiuta a trattenere l'umidità.",
        tip: "Taglia i porri longitudinalmente e lavali accuratamente tra gli strati prima della cottura per rimuovere la terra nascosta. La brasatura lenta sviluppa dolcezza naturale."
      },
      { 
        alimento: "Rape", 
        fattore: 0.90,
        info: "Le rape perdono solo il 10% del loro peso durante la cottura grazie alla loro densità.",
        tip: "La cottura delle rape giovani richiede meno tempo (10-15 minuti). L'aggiunta di un cucchiaino di zucchero all'acqua di cottura bilancia il sapore amarognolo preservando i nutrienti."
      },
      { 
        alimento: "Spinaci", 
        fattore: 0.80,
        info: "Gli spinaci hanno un alto contenuto di acqua che viene parzialmente rilasciata durante la cottura, causando una riduzione del peso al 80% del valore originale.",
        tip: "La cottura breve riduce significativamente l'acido ossalico, aumentando l'assorbimento di calcio e ferro. Saltare rapidamente in padella preserva più nutrienti della bollitura."
      },
      { 
        alimento: "Topinambur", 
        fattore: 1.00,
        info: "Il topinambur mantiene il suo peso durante la cottura grazie al suo contenuto di inulina che aiuta a trattenere l'acqua.",
        tip: "L'inulina contenuta nel topinambur è un prebiotico che nutre i batteri intestinali benefici. La tostatura a 180°C sviluppa note dolci simili a quelle del carciofo."
      },
      { 
        alimento: "Zucchine e zucca", 
        fattore: 0.90,
        info: "Zucchine e zucca perdono circa il 10% del loro peso durante la cottura, mantenendo gran parte dell'acqua interna.",
        tip: "Salare le zucchine tagliate e lasciarle riposare 15 minuti prima della cottura rimuove l'eccesso di acqua, evitando che rilascino troppi liquidi in padella."
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
  const [categoria, setCategoria] = useState(Object.keys(conversionData)[0]);
  const [alimento, setAlimento] = useState(conversionData[Object.keys(conversionData)[0]][0].alimento);
  const [quantita, setQuantita] = useState('');
  const [direzione, setDirezione] = useState('crudoCotto'); // 'crudoCotto' o 'cottoCrudo'
  const [risultato, setRisultato] = useState(null);
  const [fattore, setFattore] = useState(conversionData[Object.keys(conversionData)[0]][0].fattore);
  const [tema, setTema] = useState('auto'); // Modificato: 'light', 'dark' o 'auto'
  const [isCalcolando, setIsCalcolando] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [tipText, setTipText] = useState('');
  
  // Determina se usare il tema scuro in base alle preferenze di sistema
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  // Calcola il tema effettivo da usare
  const isDark = tema === 'dark' || (tema === 'auto' && systemPrefersDark);
  
  const risultatoRef = useRef(null);
  const inputRef = useRef(null);
  const infoRef = useRef(null);
  const infoButtonRef = useRef(null);

  // Ascolto dei cambiamenti nelle preferenze di tema del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setSystemPrefersDark(e.matches);
    };
    
    // Aggiungi il listener per i cambiamenti
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback per vecchi browser
      mediaQuery.addListener(handleChange);
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

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
    const alimentoScelto = conversionData[categoria].find(item => item.alimento === alimento);
    if (alimentoScelto) {
      setFattore(alimentoScelto.fattore);
      setInfoText(alimentoScelto.info || '');
      setTipText(alimentoScelto.tip || '');
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
    setAlimento(conversionData[nuovaCategoria][0].alimento);
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

  // Cambia il tema (aggiornato per includere 'auto')
  const ciclaTema = () => {
    if (tema === 'light') setTema('dark');
    else if (tema === 'dark') setTema('auto');
    else setTema('light');
  };

  // Reset del form
  const resetForm = () => {
    setRisultato(null);
  };

  return (
    <div className={`font-figtree ${isDark ? 'theme-dark' : 'theme-light'}`}>
      <div className="container">
        {/* Header */}
        <header className="app-header">
          <div>
            <h1 className="app-title">CrudoCotto</h1>
            <p className="app-subtitle">Converti i pesi degli alimenti</p>
          </div>
          
          <button 
            onClick={ciclaTema}
            className="theme-toggle-btn"
            aria-label="Cambia tema"
            title={tema === 'auto' ? 'Tema: Auto (segue sistema)' : tema === 'light' ? 'Tema: Chiaro' : 'Tema: Scuro'}
          >
            {tema === 'auto' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v6M12 21v-6M3 12h6M21 12h-6" />
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              </svg>
            ) : isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </header>
        
        {/* Main Card */}
        <div className="main-card">
          {/* Toggle direction conversion */}
          <div className="toggle-container">
            <div className="direction-toggle">
              <button 
                onClick={() => handleDirezioneChange('crudoCotto')}
                className={direzione === 'crudoCotto' ? 'direction-btn active' : 'direction-btn'}
              >
                Da crudo a cotto
              </button>
              <button 
                onClick={() => handleDirezioneChange('cottoCrudo')}
                className={direzione === 'cottoCrudo' ? 'direction-btn active' : 'direction-btn'}
              >
                Da cotto a crudo
              </button>
            </div>
          </div>
          
          {/* Category Selection */}
          <div className="form-group">
            <label className="form-label">
              Categoria
            </label>
            <div className="select-wrapper">
              <select 
                value={categoria}
                onChange={handleCategoriaChange}
                className="form-select"
              >
                {Object.keys(conversionData).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="select-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Food Selection with Info Button */}
          <div className="form-group">
            <div className="label-with-info">
              <label className="form-label">
                Alimento
              </label>
              <button 
                ref={infoButtonRef}
                onClick={showInfo}
                className="info-button"
                aria-label="Informazioni sull'alimento"
              >
                i
              </button>
            </div>
            <div className="select-wrapper">
              <select 
                value={alimento}
                onChange={handleAlimentoChange}
                className="form-select"
              >
                {conversionData[categoria].map(item => (
                  <option key={item.alimento} value={item.alimento}>{item.alimento}</option>
                ))}
              </select>
              <div className="select-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            {/* Info Tooltip with Glassmorphism */}
            {infoVisible && (
              <div ref={infoRef} className="info-tooltip">
                {/* Triangle connector */}
                <div className="tooltip-arrow"></div>
                
                {/* Close button */}
                <button 
                  onClick={() => setInfoVisible(false)}
                  className="tooltip-close-btn"
                  aria-label="Chiudi informazioni"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </button>
                
                {/* Title */}
                <h4 className="tooltip-title">{alimento}</h4>
                
                {/* Content */}
                <div className="tooltip-content">{infoText}</div>
              </div>
            )}
          </div>
          
          {/* Quantity Input */}
          <div className="form-group">
            <label className="form-label">
              Quantità in grammi ({direzione === 'crudoCotto' ? 'crudo' : 'cotto'})
            </label>
            <div className="input-wrapper">
              <input 
                ref={inputRef}
                type="text" 
                inputMode="decimal"
                value={quantita}
                onChange={handleQuantitaChange}
                placeholder="Inserisci la quantità in grammi" 
                className="form-input"
              />
              <div className="input-suffix">
                <span>g</span>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <button 
            onClick={calcolaRisultato}
            disabled={!quantita || isCalcolando}
            className={!quantita || isCalcolando ? 'calc-btn disabled' : 'calc-btn'}
          >
            {isCalcolando ? 'Calcolando...' : 'Calcola'}
          </button>
        </div>
        
        {/* Result Card with Cooking Tip */}
        {risultato && (
          <div 
            ref={risultatoRef}
            className="result-card"
          >
            {/* Close button */}
            <button 
              onClick={resetForm}
              className="close-btn"
              aria-label="Chiudi risultato"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
            
            <div className="result-content">
              <h3 className="result-title">
                Risultato della conversione
              </h3>
              
              <div className="result-value-container">
                <span className="result-value">
                  {risultato} g
                </span>
                <span className="result-unit">
                  {direzione === 'crudoCotto' ? 'cotto' : 'crudo'}
                </span>
              </div>
              
              <div className="conversion-factor">
                <svg className="factor-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 16v-6h-6M8 8l8 8"/>
                </svg>
                Fattore di conversione: {fattore.toFixed(2)}
              </div>
              
              {/* Cooking Tip */}
              {tipText && (
                <div className="cooking-tip">
                  <svg className="tip-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span className="tip-text">{tipText}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <footer className="app-footer">
          CrudoCotto &copy; {new Date().getFullYear()} | 
          <a href="https://github.com/aleattino" className="footer-link">
            aleattino
          </a>
        </footer>
      </div>
    </div>
   );
  };
  