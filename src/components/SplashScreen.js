import React, { useState, useEffect } from 'react';

const SplashScreen = () => {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verifica se è un dispositivo mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const mobile = mobileRegex.test(userAgent);
      setIsMobile(mobile);
      // Mostra lo splash screen solo se è un dispositivo mobile
      setShow(mobile);
    };

    checkMobile();

    // Se è mobile, mostra lo splash screen per 1.5 secondi
    let timer;
    if (isMobile) {
      timer = setTimeout(() => {
        setShow(false);
      }, 1500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isMobile]);

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