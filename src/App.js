import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

const NeoBrutalismCrudoCotto = () => {
  // Dati delle tabelle di conversione
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
