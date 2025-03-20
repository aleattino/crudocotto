// Script per creare la favicon.ico
// Richiede i pacchetti: npm install to-ico --save-dev

const fs = require('fs');
const path = require('path');
const toIco = require('to-ico');

async function createFavicon() {
  try {
    // Input file paths
    const iconPaths = [
      path.join(__dirname, 'public', 'logo16.png'),
      path.join(__dirname, 'public', 'logo32.png'),
      path.join(__dirname, 'public', 'logo64.png')
    ];

    // Verifica che i file esistano
    for (const iconPath of iconPaths) {
      if (!fs.existsSync(iconPath)) {
        console.error(`File non trovato: ${iconPath}`);
        console.error('Esegui prima node generate_icons.js');
        return;
      }
    }

    // Leggi i file PNG
    const pngBuffers = iconPaths.map(iconPath => fs.readFileSync(iconPath));

    // Crea il file ICO
    const icoBuffer = await toIco(pngBuffers);

    // Output file path
    const outputPath = path.join(__dirname, 'public', 'favicon.ico');

    // Scrivi il file ICO
    fs.writeFileSync(outputPath, icoBuffer);

    console.log(`Favicon creata in ${outputPath}`);
  } catch (error) {
    console.error('Errore durante la creazione della favicon:', error);
  }
}

createFavicon(); 