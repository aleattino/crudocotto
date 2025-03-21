import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  // Funzione per verificare se è un dispositivo mobile
  const checkMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(userAgent);
  };

  // Funzione per verificare se l'app è già in modalità standalone (installata)
  const checkStandalone = () => {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone || // Per iOS
      document.referrer.includes('android-app://') ||
      localStorage.getItem('appInstalled') === 'true'
    );
  };

  useEffect(() => {
    // Setta gli stati all'avvio
    setIsMobile(checkMobile());
    setIsStandalone(checkStandalone());

    // Variabile per tenere traccia del mediaQuery (accessibile anche nella cleanup function)
    let mediaQuery = null;

    // Aggiungi listener per rilevare i cambiamenti nella modalità di visualizzazione
    const handleDisplayModeChange = (evt) => {
      if (evt.matches) {
        // L'app è stata aperta in modalità standalone
        setIsStandalone(true);
        localStorage.setItem('appInstalled', 'true');
      }
    };

    try {
      // Listener per il matchMedia
      mediaQuery = window.matchMedia('(display-mode: standalone)');
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleDisplayModeChange);
      } else {
        // Compatibilità con versioni precedenti
        mediaQuery.addListener(handleDisplayModeChange);
      }

      // Se l'app è già installata, imposta il flag
      if (checkStandalone()) {
        localStorage.setItem('appInstalled', 'true');
      }
    } catch (e) {
      console.error('Error setting up display mode listener:', e);
    }
    
    // Intercetta l'evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt event fired');
      // Previeni il comportamento predefinito del browser
      e.preventDefault();
      // Salva l'evento per usarlo più tardi
      setDeferredPrompt(e);
      // Mostra il prompt solo se non è già in modalità standalone
      if (!checkStandalone()) {
        setShowPrompt(true);
      }
    };

    // Aggiungi l'event listener
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Se siamo su iOS, non in standalone e non è stato dismesso
    const shouldShowIOSPrompt = 
      checkMobile() && 
      /iPhone|iPad|iPod/i.test(navigator.userAgent) && 
      !checkStandalone() && 
      !localStorage.getItem('pwaPromptDismissed');
      
    if (shouldShowIOSPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    // Pulisci event listener quando il componente viene smontato
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      
      try {
        if (mediaQuery) {
          if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener('change', handleDisplayModeChange);
          } else {
            // Compatibilità con versioni precedenti
            mediaQuery.removeListener(handleDisplayModeChange);
          }
        }
      } catch (e) {
        console.error('Error removing display mode listener:', e);
      }
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
          // Imposta il flag che l'app è stata installata
          localStorage.setItem('appInstalled', 'true');
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
      // Imposta un flag per non mostrare più il prompt
      localStorage.setItem('pwaPromptDismissed', Date.now().toString());
      setShowPrompt(false);
    }
  };

  // Funzione per gestire la dismissione del prompt
  const handleDismissClick = () => {
    setShowPrompt(false);
    // Salva un flag in localStorage per non mostrare di nuovo il prompt per un po'
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  // Non mostrare se non è mobile, è già installata come app, o se non deve essere mostrato
  if (!isMobile || isStandalone || !showPrompt) return null;

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