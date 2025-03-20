import React, { useState, useEffect } from 'react';

// Stile per la notifica offline
const offlineNoticeStyle = {
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#333',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '90%',
  textAlign: 'center',
  fontSize: '14px',
  animationName: 'slideUp',
  animationDuration: '0.3s',
  animationFillMode: 'forwards',
};

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
    <div style={offlineNoticeStyle}>
      <span>📴 Modalità offline - I dati sono disponibili localmente</span>
    </div>
  );
};

export default OfflineNotice; 