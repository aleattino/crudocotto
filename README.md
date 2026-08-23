# CrudoCotto

Applicazione web per la conversione dei pesi degli alimenti da crudi a cotti e viceversa.

## Descrizione

CrudoCotto è un'applicazione web progressiva (PWA) che permette di convertire facilmente i pesi degli alimenti tra lo stato crudo e cotto. Ideale per cuochi, nutrizionisti e appassionati di cucina che necessitano di calcolare le quantità precise degli ingredienti.

### Caratteristiche principali

- Conversione bidirezionale tra alimenti crudi e cotti
- Fattori distinti per metodo di cottura: bollitura, frittura, griglia, forno e microonde
- 84 alimenti per 114 combinazioni alimento-metodo
- Confronto immediato con gli altri metodi disponibili per lo stesso alimento
- Informazioni e consigli di cottura per gli alimenti che ne hanno
- Interfaccia utente in stile neobrutalista
- Aspetto personalizzabile: tema, colori, dimensione, carattere e ombre
- Alimenti usati di recente in cima al menu
- Funzionalità offline (PWA)
- Design responsive ottimizzato per dispositivi mobili
- Installabile come app nativa

### Personalizzazione

Il pulsante con l'ingranaggio nell'intestazione apre il pannello delle impostazioni:

- **Tema**: chiaro, scuro oppure allineato alla preferenza del sistema operativo
- **Colori**: quattro palette coordinate (corallo, oceano, bosco, neon)
- **Dimensione**: compatta, normale o grande, con l'intera interfaccia che scala in proporzione
- **Carattere**: Space Grotesk, Space Mono o Archivo, caricati solo quando vengono scelti
- **Ombre**: piatta, normale o marcata

Le preferenze vengono salvate nel browser e restano attive ai riavvii successivi.

## Il metodo di cottura conta

Lo stesso alimento rende in modo molto diverso secondo come lo si cuoce, e la
differenza non è trascurabile: il petto di pollo passa da 0,90 bollito a 0,67
in forno, il petto di tacchino da 0,98 a 0,69. Su una porzione da 150 grammi
sono quasi cinquanta grammi di scarto.

Per questo il metodo è una scelta esplicita e non un'assunzione implicita.
Le categorie disponibili cambiano di conseguenza: la frittura porta con sé
frattaglie e uova, il microonde copre le sole carni.

## Categorie di alimenti

- Cereali e derivati (pasta, riso, tortellini, gnocchi, polenta)
- Verdure e ortaggi
- Legumi freschi e legumi secchi
- Carne
- Frattaglie
- Pesce fresco e pesce surgelato
- Uova

## Installazione e utilizzo

### Prerequisiti

- Node.js (versione 14 o superiore)
- npm o yarn

### Installazione locale

```bash
# Clona il repository
git clone https://github.com/aleattino/crudocotto.git

# Entra nella directory del progetto
cd crudocotto

# Installa le dipendenze
npm install

# Avvia l'applicazione in modalità sviluppo
npm start
```

L'applicazione sarà disponibile all'indirizzo [http://localhost:3000](http://localhost:3000).

### Build per la produzione

```bash
# Crea una build ottimizzata per la produzione
npm run build
```

I file ottimizzati saranno generati nella cartella `build`.

## Tecnologie utilizzate

- React - libreria JavaScript per la costruzione dell'interfaccia utente
- CSS personalizzato con design neobrutalista
- Service Worker per funzionalità offline
- LocalStorage per la persistenza dei dati
- Progressive Web App (PWA)

## Come funziona

1. Scegli la direzione di conversione, da crudo a cotto o viceversa
2. Seleziona il metodo di cottura
3. Scegli categoria e alimento fra quelli che quel metodo copre
4. Inserisci la quantità in grammi e premi Invio, oppure il pulsante "Calcola"

Il risultato riporta il fattore applicato e, quando la fonte copre lo stesso
alimento con altri metodi, li elenca accanto per confronto. Dove disponibili,
il pulsante informazioni mostra il comportamento dell'alimento in cottura e un
consiglio pratico.

## Funzionalità PWA

L'applicazione può essere installata come app nativa su dispositivi mobili e desktop:

- Funzionamento offline completo
- Icone personalizzate per diverse piattaforme
- Notifiche di stato della connessione
- Prompt di installazione automatico

## Struttura del progetto

```
crudocotto/
├── public/              # File statici pubblici
├── src/
│   ├── components/      # Componenti React
│   ├── App.js           # Componente principale
│   ├── dati.js          # Fattori di conversione per metodo
│   ├── settings.js      # Preferenze di aspetto e persistenza
│   ├── styles.css       # Stili CSS
│   └── index.js         # Entry point
├── package.json         # Dipendenze del progetto
└── README.md           # Questo file
```

## Contribuire

I contributi sono benvenuti. Per favore:

1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/nuova-funzionalita`)
3. Committa le tue modifiche (`git commit -m 'Aggiunta nuova funzionalità'`)
4. Pusha sul branch (`git push origin feature/nuova-funzionalita`)
5. Apri una pull request

## Licenza

Questo progetto è distribuito sotto licenza MIT.

## Autore

**Alessandro Attino**

- GitHub: [@aleattino](https://github.com/aleattino)

## Fonte dei dati

I fattori provengono dalla tabella **"Variazioni in peso degli alimenti con la
cottura — peso cotto corrispondente a 100 g di alimento crudo, parte edibile"**
(ultimo aggiornamento 14 marzo 2011), di filiera INRAN/CREA, integrata per
alcune voci di cereali con la tabella grammature di un Servizio Igiene Alimenti
e della Nutrizione.

I 114 fattori sono stati trascritti dalla fonte e verificati uno per uno contro
il documento originale.

Restano medie indicative: la resa reale dipende da taglio, pezzatura, durata e
temperatura, e la fonte stessa li presenta come valori medi. L'applicazione
mostra due decimali perché così sono pubblicati, non perché la precisione
arrivi al centesimo.

Per approfondire, il riferimento istituzionale italiano è il CREA, con le
tabelle di composizione degli alimenti liberamente consultabili su
[alimentinutrizione.it](https://www.alimentinutrizione.it/sezioni/tabelle-nutrizionali).
