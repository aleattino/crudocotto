import React, { useState, useEffect } from 'react';

const OfflineNotice = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Funzione per aggiornare lo stato online/offline
    const handleOnlineStatusChange = () => {
      setIsOffline(!navigator.onLine);
    };

    // Aggiungi gli event listener
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    // Rimuovi gli event listener al cleanup
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  // Se siamo online, non mostrare nulla
  if (!isOffline) {
    return null;
  }

  return (
    <div className="pwa-offline-notice" role="status">
      Modalità offline &mdash; i dati sono disponibili localmente
    </div>
  );
};

export default OfflineNotice; 