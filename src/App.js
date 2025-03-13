import React, { useState, useEffect, useRef } from 'react';
import { FiSun, FiMoon, FiRotateCcw } from 'react-icons/fi';
import './styles.css';

const CrudoCottoApp = () => {
  // Dati delle tabelle di conversione
  const conversionData = {
    "Cereali e derivati": [
      { alimento: "Pasta di semola corta", fattore: 2.00 },
      { alimento: "Pasta di semola lunga", fattore: 2.40 },
      { alimento: "Pasta all'uovo secca", fattore: 3.00 },
      { alimento: "Riso", fattore: 2.50 },
      { alimento: "Tortellini ravioli freschi", fattore: 2.00 }
    ],
    "Verdure e ortaggi": [
      { alimento: "Agretti", fattore: 0.80 },
      { alimento: "Asparagi", fattore: 0.90 },
      { alimento: "Bieta", fattore: 0.80 },
      { alimento: "Broccoletti a testa", fattore: 0.90 },
      { alimento: "Broccoletti di rapa", fattore: 0.90 },
      { alimento: "Carciofi", fattore: 0.75 },
      { alimento: "Cardi", fattore: 0.60 },
      { alimento: "Carote", fattore: 0.85 },
      { alimento: "Cavolfiore", fattore: 0.90 },
      { alimento: "Cavoli di Bruxelles", fattore: 0.90 },
      { alimento: "Cavolo broccolo verde ramoso", fattore: 0.60 },
      { alimento: "Cavolo cappuccio verde", fattore: 1.00 },
      { alimento: "Cavolo verza", fattore: 1.00 },
      { alimento: "Cicoria di campo", fattore: 1.00 },
      { alimento: "Cicoria di taglio coltivata", fattore: 0.80 },
      { alimento: "Cipolle", fattore: 0.70 },
      { alimento: "Finocchi", fattore: 0.85 },
      { alimento: "Funghi", fattore: 0.60 },
      { alimento: "Patata con buccia", fattore: 1.00 },
      { alimento: "Patata pelata", fattore: 0.85 },
      { alimento: "Porri", fattore: 1.00 },
      { alimento: "Rape", fattore: 0.90 },
      { alimento: "Spinaci", fattore: 0.80 },
      { alimento: "Topinabur", fattore: 1.00 },
      { alimento: "Zucchine e zucca", fattore: 0.90 }
    ],
    "Legumi freschi": [
      { alimento: "Fagiolini", fattore: 0.95 },
      { alimento: "Fave", fattore: 0.80 },
      { alimento: "Piselli", fattore: 0.87 }
    ],
    "Legumi secchi": [
      { alimento: "Ceci", fattore: 3.00 },
      { alimento: "Fagioli", fattore: 2.50 },
      { alimento: "Lenticchie", fattore: 2.50 }
    ]
  };

  // Stati per l'applicazione
  const [categoria, setCategoria] = useState(Object.keys(conversionData)[0]);
  const [alimento, setAlimento] = useState(conversionData[Object.keys(conversionData)[0]][0].alimento);
  const [quantita, setQuantita] = useState('');
  const [direzione, setDirezione] = useState('crudoCotto'); // 'crudoCotto' o 'cottoCrudo'
  const [risultato, setRisultato] = useState(null);
  const [fattore, setFattore] = useState(conversionData[Object.keys(conversionData)[0]][0].fattore);
  const [tema, setTema] = useState('light');
  const [isCalcolando, setIsCalcolando] = useState(false);
  
  const risultatoRef = useRef(null);
  const inputRef = useRef(null);

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alimento, categoria]);
  
  // Effetto di scrolling
  useEffect(() => {
    if (risultato && risultatoRef.current) {
      risultatoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [risultato]);

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
    setTema(tema === 'light' ? 'dark' : 'light');
  };

  // Reset del form
  const resetForm = () => {
    setCategoria(Object.keys(conversionData)[0]);
    setAlimento(conversionData[Object.keys(conversionData)[0]][0].alimento);
    setQuantita('');
    setRisultato(null);
  };

  return (
    <div className={`app-container ${tema}`}>
      {/* Toggle tema e reset */}
      <div className="control-panel">
        <button 
          onClick={resetForm}
          className="control-button"
          aria-label="Reimposta"
        >
          <FiRotateCcw />
        </button>
        <button
          onClick={toggleTema}
          className="control-button"
          aria-label="Cambia tema"
        >
          {tema === 'light' ? <FiMoon /> : <FiSun />}
        </button>
      </div>
      
      <div className="main-card">
        <h1 className="main-title">CrudoCotto</h1>
        <p className="subtitle">
          Converti i pesi degli alimenti da crudi a cotti e viceversa
        </p>
        
        {/* Selezione categoria */}
        <div className="form-group">
          <label className="form-label">Categoria</label>
          <div className="select-container">
            <select 
              value={categoria} 
              onChange={handleCategoriaChange}
              className="form-select"
            >
              {Object.keys(conversionData).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="select-arrow">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Selezione alimento */}
        <div className="form-group">
          <label className="form-label">Alimento</label>
          <div className="select-container">
            <select 
              value={alimento} 
              onChange={handleAlimentoChange}
              className="form-select"
            >
              {conversionData[categoria].map((item) => (
                <option key={item.alimento} value={item.alimento}>
                  {item.alimento}
                </option>
              ))}
            </select>
            <div className="select-arrow">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Direzione della conversione */}
        <div className="form-group">
          <label className="form-label">Conversione</label>
          <div className="direction-toggle">
            <button 
              className={`direction-button ${direzione === 'crudoCotto' ? 'active' : ''}`}
              onClick={() => handleDirezioneChange('crudoCotto')}
            >
              Da crudo a cotto
            </button>
            <button 
              className={`direction-button ${direzione === 'cottoCrudo' ? 'active' : ''}`}
              onClick={() => handleDirezioneChange('cottoCrudo')}
            >
              Da cotto a crudo
            </button>
          </div>
        </div>
        
        {/* Inserimento quantità */}
        <div className="form-group">
          <label className="form-label">
            Quantità in grammi ({direzione === 'crudoCotto' ? 'crudo' : 'cotto'})
          </label>
          <input 
            type="text"
            inputMode="decimal"
            ref={inputRef}
            value={quantita} 
            onChange={handleQuantitaChange}
            placeholder="Inserisci la quantità in grammi" 
            className="form-input"
          />
        </div>
        
        {/* Pulsante calcola */}
        <button 
          onClick={calcolaRisultato}
          disabled={!quantita || isCalcolando}
          className="calc-button"
          style={{ 
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {isCalcolando ? 
            "Calcolando..." :
            "Calcola"}
            
          {isCalcolando && (
            <span 
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1s infinite'
              }}
            ></span>
          )}
        </button>
        
        {/* Risultato */}
        {risultato && (
          <div className="result-box" ref={risultatoRef}>
            <p className="result-label">Risultato della conversione</p>
            <div className="result-value-container">
              <div className="result-value">{risultato} g</div>
              <div className="result-unit">
                {direzione === 'crudoCotto' ? 'cotto' : 'crudo'}
              </div>
            </div>
            <p className="factor-info">
              Fattore di conversione: {fattore}
            </p>
          </div>
        )}
        
        <div className="footer">
          CrudoCotto &copy; {new Date().getFullYear()} | 
          <a href="https://github.com/aleattino">
            aleattino
          </a>
        </div>
      </div>
    </div>
  );
};

export default CrudoCottoApp;
