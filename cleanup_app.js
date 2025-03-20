// Script per rimuovere duplicati in App.js
const fs = require('fs');
const path = require('path');

// Leggi il file App.js
const appPath = path.join(__dirname, 'src', 'App.js');
let appContent = fs.readFileSync(appPath, 'utf8');

// Trova l'intera sezione "Verdure e ortaggi"
const verdureRegex = /"Verdure e ortaggi":\s*\[([\s\S]*?)\]/;
const verdureMatch = appContent.match(verdureRegex);

if (verdureMatch) {
  const verdureSection = verdureMatch[0];
  const verdureItems = verdureMatch[1];
  
  // Estrai tutti gli elementi come array di oggetti stringhe
  const itemRegex = /\{\s*alimento:\s*"([^"]+)"[\s\S]*?\}/g;
  const items = [];
  let match;
  
  // Trova tutti gli oggetti alimento
  while ((match = itemRegex.exec(verdureItems)) !== null) {
    items.push({
      name: match[1],
      fullText: match[0]
    });
  }
  
  // Trova i nomi duplicati
  const uniqueNames = new Set();
  const duplicates = new Set();
  
  items.forEach(item => {
    if (uniqueNames.has(item.name)) {
      duplicates.add(item.name);
    } else {
      uniqueNames.add(item.name);
    }
  });
  
  console.log(`Trovati ${duplicates.size} duplicati: ${Array.from(duplicates).join(', ')}`);
  
  // Filtra per mantenere solo il primo elemento di ogni nome
  let newVerdureSection = verdureSection;
  
  duplicates.forEach(name => {
    // Trova tutte le occorrenze dell'alimento
    const nameRegex = new RegExp(`\\{\\s*alimento:\\s*"${name}"[\\s\\S]*?\\}\\s*,?`, 'g');
    const matches = [];
    let itemMatch;
    
    // Reset regex search
    while ((itemMatch = nameRegex.exec(newVerdureSection)) !== null) {
      matches.push({
        fullText: itemMatch[0],
        index: itemMatch.index
      });
    }
    
    // Rimuovi tutte le occorrenze dopo la prima
    for (let i = matches.length - 1; i > 0; i--) {
      const match = matches[i];
      newVerdureSection = newVerdureSection.substring(0, match.index) + 
                         newVerdureSection.substring(match.index + match.fullText.length);
    }
  });
  
  // Sostituisci la sezione nel contenuto originale
  appContent = appContent.replace(verdureSection, newVerdureSection);
  
  // Salva il file aggiornato
  fs.writeFileSync(appPath, appContent);
  console.log('App.js aggiornato rimuovendo i duplicati!');
} else {
  console.error('Impossibile trovare la sezione "Verdure e ortaggi"');
} 