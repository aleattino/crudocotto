// Configurazione e persistenza delle preferenze di aspetto.
// I valori vengono applicati come variabili CSS sulla radice dell'app,
// quindi nessun componente ha bisogno di conoscerli.

export const PALETTE = {
  corallo: {
    nome: 'Corallo',
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#ffe66d',
  },
  oceano: {
    nome: 'Oceano',
    primary: '#4361ee',
    secondary: '#4cc9f0',
    accent: '#ffd60a',
  },
  bosco: {
    nome: 'Bosco',
    primary: '#2a9d8f',
    secondary: '#e9c46a',
    accent: '#f4a261',
  },
  neon: {
    nome: 'Neon',
    primary: '#e5007d',
    secondary: '#b8e600',
    accent: '#00e5ff',
  },
};

export const CARATTERI = {
  grotesk: {
    nome: 'Grotesk',
    stack: "'Space Grotesk', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap',
  },
  mono: {
    nome: 'Mono',
    stack: "'Space Mono', monospace",
    url: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap',
  },
  archivo: {
    nome: 'Archivo',
    stack: "'Archivo', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap',
  },
};

// 15px è il minimo prudente: sotto quella soglia gli input scendono
// abbastanza da far scattare lo zoom automatico su iOS.
export const DIMENSIONI = {
  compatta: { nome: 'Compatta', px: 15 },
  normale: { nome: 'Normale', px: 16 },
  grande: { nome: 'Grande', px: 18 },
};

export const OMBRE = {
  piatta: { nome: 'Piatta', scala: 0 },
  normale: { nome: 'Normale', scala: 1 },
  marcata: { nome: 'Marcata', scala: 1.6 },
};

export const TEMI = {
  sistema: { nome: 'Sistema' },
  chiaro: { nome: 'Chiaro' },
  scuro: { nome: 'Scuro' },
};

export const PREDEFINITE = {
  tema: 'sistema',
  palette: 'corallo',
  dimensione: 'normale',
  carattere: 'grotesk',
  ombre: 'normale',
};

const CHIAVE = 'crudocotto:impostazioni';
const CHIAVE_RECENTI = 'crudocotto:recenti';
const MAX_RECENTI = 5;

// Ogni valore letto da localStorage viene validato contro le mappe qui sopra:
// una chiave rimossa in una versione futura non deve rompere l'avvio.
const VALIDI = {
  tema: TEMI,
  palette: PALETTE,
  dimensione: DIMENSIONI,
  carattere: CARATTERI,
  ombre: OMBRE,
};

export function caricaImpostazioni() {
  const impostazioni = { ...PREDEFINITE };

  try {
    const grezzo = localStorage.getItem(CHIAVE);
    if (!grezzo) return impostazioni;

    const salvate = JSON.parse(grezzo);
    Object.keys(PREDEFINITE).forEach((campo) => {
      const valore = salvate[campo];
      if (typeof valore === 'string' && valore in VALIDI[campo]) {
        impostazioni[campo] = valore;
      }
    });
  } catch (error) {
    console.error('Impostazioni non leggibili, uso le predefinite:', error);
  }

  return impostazioni;
}

export function salvaImpostazioni(impostazioni) {
  try {
    localStorage.setItem(CHIAVE, JSON.stringify(impostazioni));
  } catch (error) {
    console.error('Impossibile salvare le impostazioni:', error);
  }
}

export function caricaRecenti() {
  try {
    const grezzo = localStorage.getItem(CHIAVE_RECENTI);
    if (!grezzo) return [];

    const salvati = JSON.parse(grezzo);
    if (!Array.isArray(salvati)) return [];

    return salvati
      .filter((voce) =>
        voce &&
        typeof voce.metodo === 'string' &&
        typeof voce.categoria === 'string' &&
        typeof voce.nome === 'string'
      )
      .slice(0, MAX_RECENTI);
  } catch (error) {
    console.error('Recenti non leggibili:', error);
    return [];
  }
}

export function salvaRecenti(recenti) {
  try {
    localStorage.setItem(CHIAVE_RECENTI, JSON.stringify(recenti));
  } catch (error) {
    console.error('Impossibile salvare i recenti:', error);
  }
}

// Un recente porta con sé anche il metodo: lo stesso alimento ha fattori
// diversi bollito o al forno, quindi senza il metodo non è ricostruibile.
export function aggiungiRecente(recenti, metodo, categoria, nome) {
  const senzaDuplicato = recenti.filter(
    (voce) => !(voce.metodo === metodo && voce.categoria === categoria && voce.nome === nome)
  );
  return [{ metodo, categoria, nome }, ...senzaDuplicato].slice(0, MAX_RECENTI);
}

// Il carattere viene richiesto solo quando serve: caricarli tutti all'avvio
// significherebbe scaricare tre famiglie per usarne una.
export function caricaFont(chiave) {
  const carattere = CARATTERI[chiave];
  if (!carattere || typeof document === 'undefined') return;

  const id = `nb-font-${chiave}`;
  if (document.getElementById(id)) return;

  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = carattere.url;
  document.head.appendChild(link);
}

// Variabili CSS da applicare alla radice dell'app.
export function variabiliCss(impostazioni) {
  const palette = PALETTE[impostazioni.palette] || PALETTE[PREDEFINITE.palette];
  const carattere = CARATTERI[impostazioni.carattere] || CARATTERI[PREDEFINITE.carattere];
  const ombre = OMBRE[impostazioni.ombre] || OMBRE[PREDEFINITE.ombre];

  return {
    '--nb-primary': palette.primary,
    '--nb-secondary': palette.secondary,
    '--nb-accent': palette.accent,
    '--nb-font': carattere.stack,
    '--nb-shadow-scale': ombre.scala,
  };
}
