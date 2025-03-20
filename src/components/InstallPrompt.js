import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Intercetta l'evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      // Previeni il comportamento predefinito del browser
      e.preventDefault();
      // Salva l'evento per usarlo più tardi
      setDeferredPrompt(e);
      // Mostra il prompt personalizzato
      setShowPrompt(true);
    };

    // Aggiungi l'event listener
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Pulisci event listener quando il componente viene smontato
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Funzione per gestire il click sul pulsante di installazione
  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    // Mostra il prompt di installazione nativo
    deferredPrompt.prompt();

    // Attendi che l'utente risponda al prompt
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
  };

  // Funzione per gestire la dismissione del prompt
  const handleDismissClick = () => {
    setShowPrompt(false);
    // Salva un flag in localStorage per non mostrare di nuovo il prompt per un po'
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  if (!showPrompt) return null;

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