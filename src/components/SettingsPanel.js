import React from 'react';
import {
  PALETTE,
  CARATTERI,
  DIMENSIONI,
  OMBRE,
  TEMI,
  PREDEFINITE,
} from '../settings';
import { IconaChiudi } from './Icons';

// Gruppo di pulsanti mutuamente esclusivi, in stile neobrutalista.
const Scelta = ({ etichetta, opzioni, valore, onChange }) => (
  <div className="nb-setting">
    <span className="nb-setting-label">{etichetta}</span>
    <div className="nb-segmented" role="group" aria-label={etichetta}>
      {Object.entries(opzioni).map(([chiave, opzione]) => (
        <button
          key={chiave}
          type="button"
          className={`nb-segment ${valore === chiave ? 'active' : ''}`}
          aria-pressed={valore === chiave}
          onClick={() => onChange(chiave)}
        >
          {opzione.nome}
        </button>
      ))}
    </div>
  </div>
);

const SettingsPanel = ({ impostazioni, onChange, onReset, onClose }) => {
  const aggiorna = (campo) => (valore) => onChange({ ...impostazioni, [campo]: valore });

  return (
    <div className="nb-modal-overlay" onClick={onClose}>
      <div
        className="nb-modal nb-modal-wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nb-settings-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="nb-modal-header">
          <h2 id="nb-settings-title" className="nb-modal-title">Impostazioni</h2>
          <button
            onClick={onClose}
            className="nb-close-btn"
            aria-label="Chiudi le impostazioni"
          >
            <IconaChiudi />
          </button>
        </div>

        <div className="nb-modal-body">
        <Scelta
          etichetta="Tema"
          opzioni={TEMI}
          valore={impostazioni.tema}
          onChange={aggiorna('tema')}
        />

        <div className="nb-setting">
          <span className="nb-setting-label">Colori</span>
          <div className="nb-palette-grid" role="group" aria-label="Colori">
            {Object.entries(PALETTE).map(([chiave, palette]) => (
              <button
                key={chiave}
                type="button"
                className={`nb-palette ${impostazioni.palette === chiave ? 'active' : ''}`}
                aria-pressed={impostazioni.palette === chiave}
                onClick={() => aggiorna('palette')(chiave)}
              >
                <span className="nb-palette-swatches" aria-hidden="true">
                  <span style={{ backgroundColor: palette.primary }} />
                  <span style={{ backgroundColor: palette.secondary }} />
                  <span style={{ backgroundColor: palette.accent }} />
                </span>
                <span className="nb-palette-nome">{palette.nome}</span>
              </button>
            ))}
          </div>
        </div>

        <Scelta
          etichetta="Dimensione"
          opzioni={DIMENSIONI}
          valore={impostazioni.dimensione}
          onChange={aggiorna('dimensione')}
        />

        <Scelta
          etichetta="Carattere"
          opzioni={CARATTERI}
          valore={impostazioni.carattere}
          onChange={aggiorna('carattere')}
        />

        <Scelta
          etichetta="Ombre"
          opzioni={OMBRE}
          valore={impostazioni.ombre}
          onChange={aggiorna('ombre')}
        />

        <button
          type="button"
          className="nb-reset-btn"
          onClick={onReset}
          disabled={Object.keys(PREDEFINITE).every(
            (campo) => impostazioni[campo] === PREDEFINITE[campo]
          )}
        >
          Ripristina i valori predefiniti
        </button>

        <div className="nb-about">
          <h3 className="nb-about-title">About</h3>
          <p className="nb-about-text">
            CrudoCotto converte i pesi degli alimenti da crudi a cotti e viceversa.
          </p>
          <p className="nb-about-text">
            Creato da <a href="https://github.com/aleattino" className="nb-link" target="_blank" rel="noopener noreferrer">Alessandro Attino</a>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
