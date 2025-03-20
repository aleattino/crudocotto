import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
import './styles-pwa.css';
import NeoBrutalismCrudoCotto from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NeoBrutalismCrudoCotto />
  </React.StrictMode>
);

// Se hai già registrato il service worker in index.html, questa parte è opzionale
// ma aggiunge funzionalità come il controllo dello stato della connessione

// Funzione per controllare se il browser è online
function updateOnlineStatus() {
  const condition = navigator.onLine ? 'online' : 'offline';
  console.log(`App è ${condition}`);
  
  // Qui puoi aggiungere logica per notificare l'utente quando va offline/online
  if (condition === 'offline') {
    // Mostra notifica o banner "Modalità offline"
  }
}

// Aggiungi event listener per il cambio di stato della connessione
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Esegui il controllo iniziale
updateOnlineStatus();
