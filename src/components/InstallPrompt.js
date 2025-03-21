import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Funzione per verificare se è un dispositivo mobile
  const checkMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(userAgent);
  };

  useEffect(() => {
    // Setta lo stato mobile all'avvio
    setIsMobile(checkMobile());
    
    // Intercetta l'evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt event fired');
      // Previeni il comportamento predefinito del browser
      e.preventDefault();
      // Salva l'evento per usarlo più tardi
      setDeferredPrompt(e);
      // Mostra il prompt personalizzato
      setShowPrompt(true);
    };

    // Aggiungi l'event listener
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Se siamo su iOS, mostriamo un prompt manuale dopo 3 secondi
    if (checkMobile() && /iPhone|iPad|iPod/i.test(navigator.userAgent) && !localStorage.getItem('pwaPromptDismissed')) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    // Pulisci event listener quando il componente viene smontato
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Funzione per gestire il click sul pulsante di installazione
  const handleInstallClick = () => {
    // Se abbiamo l'evento prompt, lo mostriamo
    if (deferredPrompt) {
      deferredPrompt.prompt();
      
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Utente ha accettato il prompt di installazione');
        } else {
          console.log('Utente ha rifiutato il prompt di installazione');
        }
        // Resetta la variabile deferredPrompt - può essere usata solo una volta
        setDeferredPrompt(null);
        setShowPrompt(false);
      });
    } 
    // Per iOS, mostra un alert con istruzioni
    else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      alert('Per installare questa app:\n1. Tocca il pulsante "Condividi" nella barra in basso\n2. Scorri verso il basso e seleziona "Aggiungi alla schermata Home"');
      setShowPrompt(false);
    }
  };

  // Funzione per gestire la dismissione del prompt
  const handleDismissClick = () => {
    setShowPrompt(false);
    // Salva un flag in localStorage per non mostrare di nuovo il prompt per un po'
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  // Non mostrare se non è mobile o se non deve essere mostrato
  if (!isMobile || !showPrompt) return null;

  return (
    <div className="pwa-install-prompt">
      <div>
        Aggiungi CrudoCotto alla schermata Home per un accesso rapido e offline!
      </div>
      <div>
        <button className="dismiss" onClick={handleDismissClick}>
          Non ora
        </button>
        <button onClick={handleInstallClick}>
          Installa
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt; 