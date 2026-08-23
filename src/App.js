import React, { useState, useEffect, useRef, useMemo } from 'react';
import './styles.css';
import OfflineNotice from './components/OfflineNotice';
import InstallPrompt from './components/InstallPrompt';
import SettingsPanel from './components/SettingsPanel';
import { IconaSole, IconaLuna, IconaImpostazioni, IconaChiudi, IconaFreccia } from './components/Icons';
import { METODI, ALIMENTI } from './dati';
import {
  PREDEFINITE,
  DIMENSIONI,
  caricaImpostazioni,
  salvaImpostazioni,
  caricaRecenti,
  salvaRecenti,
  aggiungiRecente,
  caricaFont,
  variabiliCss,
} from './settings';

const CHIAVI_METODI = Object.keys(METODI);

// Un alimento esiste solo per certi metodi: il pesce non si bolle e si griglia
// con lo stesso fattore, e per molte voci la fonte copre un metodo soltanto.
const perMetodo = (metodo) => ALIMENTI.filter((a) => a.fattori[metodo] !== undefined);

const categoriePerMetodo = (metodo) => {
  const viste = [];
  perMetodo(metodo).forEach((a) => {
    if (!viste.includes(a.categoria)) viste.push(a.categoria);
  });
  return viste;
};

const alimentiPer = (metodo, categoria) =>
  perMetodo(metodo).filter((a) => a.categoria === categoria);

const CrudoCotto = () => {
  const [metodo, setMetodo] = useState('bollitura');
  const [categoria, setCategoria] = useState('Cereali e derivati');
  const [alimento, setAlimento] = useState(
    (alimentiPer('bollitura', 'Cereali e derivati')[0] || {}).nome || ''
  );
  const [quantita, setQuantita] = useState('');
  const [direzione, setDirezione] = useState('crudoCotto');
  const [risultato, setRisultato] = useState(null);
  const [isCalcolando, setIsCalcolando] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [impostazioni, setImpostazioni] = useState(caricaImpostazioni);
  const [recenti, setRecenti] = useState(caricaRecenti);

  const [sistemaScuro, setSistemaScuro] = useState(() => {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      return false;
    }
  });

  const isDark =
    impostazioni.tema === 'scuro' ||
    (impostazioni.tema === 'sistema' && sistemaScuro);

  const risultatoRef = useRef(null);
  const inputRef = useRef(null);
  const infoRef = useRef(null);
  const infoButtonRef = useRef(null);

  const categorie = useMemo(() => categoriePerMetodo(metodo), [metodo]);

  // categoria e alimento sono la scelta dell'utente, che resta memorizzata
  // anche quando il metodo corrente non la copre. Quel che si mostra è la
  // selezione effettiva: se il metodo non ha quella categoria si ripiega,
  // ma il ripiego è temporaneo e la scelta torna appena il metodo la
  // rende di nuovo disponibile.
  const categoriaEffettiva = categorie.includes(categoria) ? categoria : categorie[0];
  const voci = useMemo(
    () => alimentiPer(metodo, categoriaEffettiva),
    [metodo, categoriaEffettiva]
  );
  const voce = useMemo(
    () => voci.find((a) => a.nome === alimento) || voci[0] || null,
    [voci, alimento]
  );
  const alimentoEffettivo = voce ? voce.nome : '';

  const fattore = voce ? voce.fattori[metodo] : 1;
  const infoText = voce && voce.info ? voce.info : '';
  const tipText = voce && voce.tip ? voce.tip : '';

  // Un alimento può esistere in più metodi con fattori diversi: quanti, e in che forbice
  const altriMetodi = useMemo(() => {
    if (!voce) return [];
    return CHIAVI_METODI
      .filter((m) => m !== metodo && voce.fattori[m] !== undefined)
      .map((m) => ({ chiave: m, nome: METODI[m].nome, fattore: voce.fattori[m] }));
  }, [voce, metodo]);

  // Segue la preferenza di tema del sistema operativo
  useEffect(() => {
    let mediaQuery = null;
    const onChange = (evento) => setSistemaScuro(evento.matches);
    try {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', onChange);
      else mediaQuery.addListener(onChange);
    } catch (error) {
      console.error('Impossibile seguire il tema di sistema:', error);
    }
    return () => {
      try {
        if (!mediaQuery) return;
        if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', onChange);
        else mediaQuery.removeListener(onChange);
      } catch (error) {
        console.error('Errore nella rimozione del listener del tema:', error);
      }
    };
  }, []);

  // Salva le preferenze, applica la dimensione e carica il carattere scelto
  useEffect(() => {
    salvaImpostazioni(impostazioni);
    caricaFont(impostazioni.carattere);
    const dimensione = DIMENSIONI[impostazioni.dimensione] || DIMENSIONI[PREDEFINITE.dimensione];
    try {
      document.documentElement.style.fontSize = `${dimensione.px}px`;
    } catch (error) {
      console.error('Impossibile applicare la dimensione:', error);
    }
  }, [impostazioni]);

  useEffect(() => {
    salvaRecenti(recenti);
  }, [recenti]);

  // Il colore della barra di stato segue tema e palette scelti: in standalone
  // resterebbe altrimenti il corallo fisso anche con la palette blu o in scuro.
  useEffect(() => {
    try {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', isDark ? '#1a1a1a' : '#ffffff');
    } catch (error) {
      console.error('Impossibile aggiornare il colore della barra:', error);
    }
  }, [isDark]);

  // In standalone il gesto indietro non esiste: Esc a parte, il pannello si
  // chiude anche con il tasto indietro del telefono.
  useEffect(() => {
    if (!settingsVisible) return;
    window.history.pushState({ pannello: true }, '');
    const indietro = () => setSettingsVisible(false);
    window.addEventListener('popstate', indietro);
    return () => {
      window.removeEventListener('popstate', indietro);
      if (window.history.state && window.history.state.pannello) window.history.back();
    };
  }, [settingsVisible]);

  useEffect(() => {
    if (risultato && risultatoRef.current) {
      try {
        risultatoRef.current.scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        console.error('Errore durante lo scrolling:', error);
      }
    }
  }, [risultato]);

  // Chiudi il riquadro informativo cliccando fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        infoRef.current && !infoRef.current.contains(event.target) &&
        infoButtonRef.current && !infoButtonRef.current.contains(event.target)
      ) {
        setInfoVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Chiudi il pannello con il tasto Esc
  useEffect(() => {
    if (!settingsVisible) return;
    const handleEsc = (event) => {
      if (event.key === 'Escape') setSettingsVisible(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [settingsVisible]);

  // Salva i dati in localStorage per l'accesso offline
  useEffect(() => {
    try {
      localStorage.setItem('crudocotto:alimenti', JSON.stringify(ALIMENTI));
    } catch (error) {
      console.error('Errore durante il salvataggio dei dati:', error);
    }
  }, []);

  // Cambiare metodo non tocca la scelta di categoria e alimento: al massimo
  // la lascia temporaneamente inapplicabile.
  const handleMetodoChange = (e) => {
    setMetodo(e.target.value);
    setRisultato(null);
  };

  const handleCategoriaChange = (e) => {
    const nuova = e.target.value;
    const prima = alimentiPer(metodo, nuova)[0];
    setCategoria(nuova);
    setAlimento(prima ? prima.nome : '');
    setRisultato(null);
  };

  const handleAlimentoChange = (e) => {
    const valore = e.target.value;
    if (valore.startsWith('recente:')) {
      const [, resto] = valore.split('recente:');
      const [suoMetodo, suaCategoria, suoAlimento] = resto.split('|');
      setMetodo(suoMetodo);
      setCategoria(suaCategoria);
      setAlimento(suoAlimento);
      setRisultato(null);
      return;
    }
    setAlimento(valore);
  };

  const handleQuantitaChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) setQuantita(val);
  };

  const calcolaRisultato = () => {
    if (!quantita || !voce) return;
    setIsCalcolando(true);
    setTimeout(() => {
      try {
        const q = parseFloat(quantita);
        if (isNaN(q)) {
          setRisultato('0.0');
          return;
        }
        const f = parseFloat(fattore);
        const r = direzione === 'crudoCotto' ? q * f : (f !== 0 ? q / f : 0);
        setRisultato(r.toFixed(1));
        setRecenti((prec) => aggiungiRecente(prec, metodo, categoriaEffettiva, voce.nome));
      } catch (error) {
        console.error('Errore nel calcolo:', error);
        setRisultato('0.0');
      } finally {
        setIsCalcolando(false);
      }
    }, 300);
  };

  const handleQuantitaKeyDown = (e) => {
    if (e.key === 'Enter' && quantita && !isCalcolando) {
      e.preventDefault();
      calcolaRisultato();
    }
  };

  const toggleTema = () =>
    setImpostazioni((p) => ({ ...p, tema: isDark ? 'chiaro' : 'scuro' }));

  const recentiDaMostrare = recenti.filter(
    (r) => !(r.metodo === metodo && r.categoria === categoriaEffettiva && r.nome === alimentoEffettivo)
  );

  return (
    <div
      className={`neobrutal-app ${isDark ? 'dark' : 'light'}`}
      style={variabiliCss(impostazioni)}
    >
      <div className="nb-noise-overlay"></div>

      <header className="nb-header">
        <div className="nb-logo">
          <h1>CrudoCotto</h1>
        </div>

        <div className="nb-header-actions">
          <button
            onClick={() => setSettingsVisible(true)}
            className="nb-settings-btn"
            aria-label="Impostazioni"
          >
            <IconaImpostazioni />
          </button>

          <button
            onClick={toggleTema}
            className="nb-theme-toggle"
            aria-label={isDark ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
          >
            {isDark ? <IconaSole /> : <IconaLuna />}
          </button>
        </div>
      </header>

      {settingsVisible && (
        <SettingsPanel
          impostazioni={impostazioni}
          onChange={setImpostazioni}
          onReset={() => setImpostazioni({ ...PREDEFINITE })}
          onClose={() => setSettingsVisible(false)}
        />
      )}

      <main className="nb-main">
        <div className="nb-card nb-main-card">
          <div className="nb-toggle-track">
            <button
              onClick={() => setDirezione('crudoCotto')}
              className={`nb-toggle-option ${direzione === 'crudoCotto' ? 'active' : ''}`}
            >
              Da crudo a cotto
            </button>
            <button
              onClick={() => setDirezione('cottoCrudo')}
              className={`nb-toggle-option ${direzione === 'cottoCrudo' ? 'active' : ''}`}
            >
              Da cotto a crudo
            </button>
          </div>

          <div className="nb-field">
            <label className="nb-label" htmlFor="nb-metodo">Metodo di cottura</label>
            <div className="nb-select-wrapper">
              <select id="nb-metodo" value={metodo} onChange={handleMetodoChange} className="nb-select">
                {CHIAVI_METODI.map((m) => (
                  <option key={m} value={m}>{METODI[m].nome}</option>
                ))}
              </select>
              <span className="nb-select-arrow"><IconaFreccia /></span>
            </div>
          </div>

          <div className="nb-field">
            <label className="nb-label" htmlFor="nb-categoria">Categoria</label>
            <div className="nb-select-wrapper">
              <select id="nb-categoria" value={categoriaEffettiva} onChange={handleCategoriaChange} className="nb-select">
                {categorie.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span className="nb-select-arrow"><IconaFreccia /></span>
            </div>
          </div>

          <div className="nb-field">
            <div className="nb-label-row">
              <label className="nb-label" htmlFor="nb-alimento">Alimento</label>
              {infoText && (
                <button
                  ref={infoButtonRef}
                  onClick={(e) => { e.preventDefault(); setInfoVisible(!infoVisible); }}
                  className="nb-info-btn"
                  aria-label="Informazioni sull'alimento"
                >
                  i
                </button>
              )}
            </div>
            <div className="nb-select-wrapper">
              <select id="nb-alimento" value={alimentoEffettivo} onChange={handleAlimentoChange} className="nb-select">
                {recentiDaMostrare.length > 0 && (
                  <optgroup label="Recenti">
                    {recentiDaMostrare.map((r) => (
                      <option
                        key={`recente:${r.metodo}|${r.categoria}|${r.nome}`}
                        value={`recente:${r.metodo}|${r.categoria}|${r.nome}`}
                      >
                        {r.nome} ({METODI[r.metodo] ? METODI[r.metodo].nome.toLowerCase() : r.metodo})
                      </option>
                    ))}
                  </optgroup>
                )}
                {voci.map((a) => (
                  <option key={a.nome} value={a.nome}>{a.nome}</option>
                ))}
              </select>
              <span className="nb-select-arrow"><IconaFreccia /></span>
            </div>

            {infoVisible && infoText && (
              <div ref={infoRef} className="nb-info-tooltip">
                <button
                  onClick={() => setInfoVisible(false)}
                  className="nb-tooltip-close-btn"
                  aria-label="Chiudi informazioni"
                >
                  <IconaChiudi />
                </button>
                <h4 className="nb-tooltip-title">{alimentoEffettivo}</h4>
                <p className="nb-tooltip-content">{infoText}</p>
              </div>
            )}
          </div>

          <div className="nb-field">
            <label className="nb-label" htmlFor="nb-quantita">
              Quantità in grammi ({direzione === 'crudoCotto' ? 'crudo' : 'cotto'})
            </label>
            <div className="nb-input-wrapper">
              <input
                id="nb-quantita"
                ref={inputRef}
                type="text"
                inputMode="decimal"
                enterKeyHint="go"
                autoComplete="off"
                value={quantita}
                onChange={handleQuantitaChange}
                onKeyDown={handleQuantitaKeyDown}
                placeholder="Inserisci la quantità in grammi"
                className="nb-input"
              />
              <span className="nb-input-suffix">g</span>
            </div>
          </div>

          <button
            onClick={calcolaRisultato}
            disabled={!quantita || isCalcolando}
            className={!quantita || isCalcolando ? 'nb-button disabled' : 'nb-button'}
          >
            {isCalcolando ? 'Calcolando...' : 'Calcola'}
          </button>
        </div>

        {risultato && (
          <div ref={risultatoRef} className="nb-card nb-result-card">
            <button onClick={() => setRisultato(null)} className="nb-close-btn" aria-label="Chiudi risultato">
              <IconaChiudi />
            </button>

            <h3 className="nb-card-title">Risultato della conversione</h3>

            <div className="nb-result">
              <div className="nb-result-value">{risultato} g</div>
              <div className="nb-result-unit">
                {direzione === 'crudoCotto' ? 'cotto' : 'crudo'} &middot; {METODI[metodo].nome.toLowerCase()}
              </div>
            </div>

            <div className="nb-factor-badge">
              Fattore {fattore.toFixed(2).replace('.', ',')} &middot; valore medio indicativo
            </div>

            {altriMetodi.length > 0 && (
              <div className="nb-altri-metodi">
                <span className="nb-altri-label">Con altri metodi</span>
                <ul>
                  {altriMetodi.map((m) => (
                    <li key={m.chiave}>
                      <span>{m.nome}</span>
                      <b>{m.fattore.toFixed(2).replace('.', ',')}</b>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tipText && (
              <div className="nb-cooking-tip">
                <span className="nb-tip-label">Consiglio</span>
                <p className="nb-tip-text">{tipText}</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="nb-footer">
        CrudoCotto &copy; {new Date().getFullYear()} &middot; dati di filiera INRAN/CREA
      </footer>

      <OfflineNotice />
      <InstallPrompt />
    </div>
  );
};

export default CrudoCotto;
