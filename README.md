# CrudoCotto

Applicazione web per la conversione dei pesi degli alimenti da crudi a cotti e viceversa.

## Descrizione

CrudoCotto è un'applicazione web progressiva (PWA) che permette di convertire facilmente i pesi degli alimenti tra lo stato crudo e cotto. Ideale per cuochi, nutrizionisti e appassionati di cucina che necessitano di calcolare le quantità precise degli ingredienti.

### Caratteristiche principali

- Conversione bidirezionale tra alimenti crudi e cotti
- Database completo con diverse categorie di alimenti
- Informazioni nutrizionali e consigli di cottura per ogni alimento
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

## Categorie di alimenti

L'applicazione include fattori di conversione per le seguenti categorie:

- Cereali e derivati (pasta, riso, tortellini)
- Verdure e ortaggi
- Legumi freschi
- Legumi secchi
- Carne (bovino, pollo, tacchino)
- Pesce fresco
- Pesce surgelato

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

1. Seleziona la categoria dell'alimento
2. Scegli l'alimento specifico dalla lista
3. Seleziona la direzione di conversione (da crudo a cotto o viceversa)
4. Inserisci la quantità in grammi
5. Premi il pulsante "Calcola" per ottenere il risultato

Ogni alimento include informazioni dettagliate sul processo di cottura e consigli pratici accessibili tramite il pulsante informazioni.

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
│   ├── App.js          # Componente principale
│   ├── styles.css      # Stili CSS
│   └── index.js        # Entry point
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

## Crediti

I fattori di conversione sono basati su dati nutrizionali standardizzati e tabelle di composizione degli alimenti.
