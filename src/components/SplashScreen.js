import React, { useState, useEffect } from 'react';

const SplashScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Mostra la schermata di splash per 1.5 secondi
    const timer = setTimeout(() => {
      setShow(false);
    }, 1500);

    return () => clearTimeout(timer);
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