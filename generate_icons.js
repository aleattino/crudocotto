// Script per generare le icone dell'app
// Per utilizzare questo script, è necessario avere installato sharp:
// npm install sharp

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Verifica se esiste un'icona di base
const sourcePath = path.join(__dirname, 'src', 'assets', 'icon.png');
const destinationDir = path.join(__dirname, 'public');

// Dimensioni per le icone
const sizes = [16, 32, 64, 192, 512];

async function generateIcons() {
  if (!fs.existsSync(sourcePath)) {
    console.log('File icon.png non trovato in src/assets');
    console.log('Per favore, crea un\'icona quadrata di dimensioni 512x512 e salvala come src/assets/icon.png');
    return;
  }

  // Crea favicon.ico (multi-size)
  const faviconSizes = [16, 32, 64];
  const faviconPath = path.join(destinationDir, 'favicon.ico');
  
  console.log('Generazione icone in corso...');
  
  // Genera icone PWA
  for (const size of sizes) {
    const outputPath = path.join(destinationDir, `logo${size}.png`);
    
    await sharp(sourcePath)
      .resize(size, size)
      .png()
      .toFile(outputPath);
      
    console.log(`Creata icona ${size}x${size} in ${outputPath}`);
  }
  
  console.log('Generazione completata!');
  console.log('Nota: favicon.ico deve essere creato manualmente o con uno strumento dedicato.');
}

generateIcons().catch(err => {
  console.error('Errore durante la generazione delle icone:', err);
}); 