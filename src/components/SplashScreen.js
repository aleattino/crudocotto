import React, { useState, useEffect } from 'react';

const SplashScreen = () => {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Verifica se è un dispositivo mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      return mobileRegex.test(userAgent);
    };

    // Verifica se l'app è in modalità standalone (installata)
    const checkStandalone = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone || // Per iOS
        document.referrer.includes('android-app://') ||
        localStorage.getItem('appInstalled') === 'true'
      );
    };

    // Verifica se è la prima visita dell'utente in questa sessione
    const checkFirstVisit = () => {
      const visitedFlag = sessionStorage.getItem('hasVisited');
      if (!visitedFlag) {
        sessionStorage.setItem('hasVisited', 'true');
        return true;
      }
      return false;
    };

    const isMobileDevice = checkMobile();
    const isAppInstalled = checkStandalone();
    const isFirstVisitInSession = checkFirstVisit();
    
    setIsMobile(isMobileDevice);
    setIsFirstVisit(isFirstVisitInSession);

    // Mostra lo splash screen solo se è un dispositivo mobile,
    // e o è la prima visita della sessione o l'app non è ancora installata
    if (isMobileDevice && (isFirstVisitInSession || !isAppInstalled)) {
      setShow(true);
      
      // Nascondi lo splash dopo 1.5 secondi
      const timer = setTimeout(() => {
        setShow(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="pwa-splash-screen">
      <img src="/logo192.png" alt="CrudoCotto Logo" />
      <h1>CrudoCotto</h1>
      <p>Conversione pesi alimenti crudi/cotti</p>
    </div>
  );
};

export default SplashScreen; 