// Script per aggiornare App.js in modo sicuro
const fs = require('fs');
const path = require('path');
// Corretto l'import per gestire un modulo ES con export default
const verdureAggiuntiveModule = require('./src/verdure_aggiuntive.js');
const verdureAggiuntive = verdureAggiuntiveModule.default || verdureAggiuntiveModule;

// Leggi il file App.js
const appPath = path.join(__dirname, 'src', 'App.js');
let appContent = fs.readFileSync(appPath, 'utf8');

// 1. Aggiungi le verdure mancanti
const verdureSection = appContent.match(/"Verdure e ortaggi"[\s\S]*?\[[\s\S]*?\]/);
if (verdureSection) {
  const originalVerdure = verdureSection[0];
  const updatedVerdure = originalVerdure.replace(/\]$/, ',\n      ' + 
    (Array.isArray(verdureAggiuntive) ? verdureAggiuntive : []).map(v => JSON.stringify(v, null, 2).replace(/"([^"]+)":/g, '$1:')).join(',\n      ') + 
    '\n    ]');
  
  // Aggiorna il contenuto
  appContent = appContent.replace(originalVerdure, updatedVerdure);
}

// 2. Correggi il termine "coscio" in "coscia"
appContent = appContent.replace(/coscio di pollo/gi, 'coscia di pollo');
appContent = appContent.replace(/coscio di tacchino/gi, 'coscia di tacchino');
// Correggi anche i nomi degli alimenti
appContent = appContent.replace(/alimento: "Pollo \(coscio\)"/g, 'alimento: "Pollo (coscia)"');
appContent = appContent.replace(/alimento: "Tacchino \(coscio\)"/g, 'alimento: "Tacchino (coscia)"');

// Salva il file aggiornato
fs.writeFileSync(appPath, appContent);

console.log('App.js aggiornato con successo!'); 