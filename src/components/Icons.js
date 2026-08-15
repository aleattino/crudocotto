import React from 'react';

// Icone disegnate a tratto, in currentColor: niente emoji, che verrebbero
// rese in modo diverso da ogni sistema operativo e stonerebbero con lo stile.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export const IconaSole = () => (
  <svg className="nb-icon" {...base}>
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="1.5" x2="12" y2="3.5" />
    <line x1="12" y1="20.5" x2="12" y2="22.5" />
    <line x1="1.5" y1="12" x2="3.5" y2="12" />
    <line x1="20.5" y1="12" x2="22.5" y2="12" />
    <line x1="4.6" y1="4.6" x2="6" y2="6" />
    <line x1="18" y1="18" x2="19.4" y2="19.4" />
    <line x1="4.6" y1="19.4" x2="6" y2="18" />
    <line x1="18" y1="6" x2="19.4" y2="4.6" />
  </svg>
);

export const IconaLuna = () => (
  <svg className="nb-icon" {...base}>
    <path d="M20.5 14.3A8.5 8.5 0 1 1 10.7 3.5a6.6 6.6 0 0 0 9.8 10.8z" />
  </svg>
);

export const IconaFreccia = () => (
  <svg className="nb-icon nb-icon-sm" {...base}>
    <polyline points="5,9 12,16 19,9" />
  </svg>
);

export const IconaChiudi = () => (
  <svg className="nb-icon nb-icon-sm" {...base}>
    <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
    <line x1="18.5" y1="5.5" x2="5.5" y2="18.5" />
  </svg>
);

export const IconaImpostazioni = () => (
  <svg className="nb-icon" {...base}>
    <line x1="3.5" y1="7" x2="20.5" y2="7" />
    <line x1="3.5" y1="12" x2="20.5" y2="12" />
    <line x1="3.5" y1="17" x2="20.5" y2="17" />
    <circle cx="9" cy="7" r="2.4" fill="currentColor" />
    <circle cx="15.5" cy="12" r="2.4" fill="currentColor" />
    <circle cx="8" cy="17" r="2.4" fill="currentColor" />
  </svg>
);
