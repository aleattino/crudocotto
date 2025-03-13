const fs = require('fs');
const { exec } = require('child_process');

// Verifichiamo se è installato imagemagick
exec('which convert', (error, stdout) => {
  if (error) {
    console.log('ImageMagick non trovato. Installa la favicon manualmente.');
    console.log('Comando suggerito: convert -background none -resize 32x32 public/logo.svg public/favicon.ico');
    return;
  }
  
  // Generiamo le icone utilizzando ImageMagick
  console.log('Generazione favicon...');
  
  exec('convert -background none -resize 32x32 public/logo.svg public/favicon.ico', (err) => {
    if (err) {
      console.error('Errore nella generazione della favicon:', err);
      return;
    }
    console.log('favicon.ico generata con successo!');
  });
  
  exec('convert -background none -resize 192x192 public/logo.svg public/logo192.png', (err) => {
    if (err) {
      console.error('Errore nella generazione del logo 192px:', err);
      return;
    }
    console.log('logo192.png generato con successo!');
  });
  
  exec('convert -background none -resize 512x512 public/logo.svg public/logo512.png', (err) => {
    if (err) {
      console.error('Errore nella generazione del logo 512px:', err);
      return;
    }
    console.log('logo512.png generato con successo!');
  });
});
