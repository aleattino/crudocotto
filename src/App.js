import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

// Versione semplificata del componente per il debug
const NeoBrutalismCrudoCotto = () => {
  // Dati delle tabelle di conversione mantenuti
  const conversionData = {
    "Cereali e derivati": [
      { 
        alimento: "Pasta di semola corta", 
        fattore: 2.00,
        info: "Durante la cottura, l'amido della pasta assorbe acqua, aumentando il suo peso di circa il doppio. Questo processo, chiamato gelatinizzazione dell'amido, è responsabile della consistenza morbida della pasta cotta.",
        tip: "Per una cottura ottimale, cuoci in abbondante acqua salata (10g di sale per litro). La pasta al dente trattiene meglio i condimenti e ha un indice glicemico più basso."
      },
      { 
        alimento: "Pasta di semola lunga", 
        fattore: 2.40,
        info: "La pasta lunga, come spaghetti e linguine, tende ad assorbire più acqua rispetto alla pasta corta a causa della maggiore superficie esposta. L'amido presente assorbe l'acqua durante la cottura, aumentando il peso di circa 2,4 volte.",
        tip: "Per evitare che si attacchi, immergi la pasta lunga in acqua bollente e mescola nei primi 30 secondi. Non spezzarla: si cuocerà uniformemente piegandosi naturalmente nel liquido."
      },
      { 
        alimento: "Pasta all'uovo secca", 
        fattore: 3.00,
        info: "La pasta all'uovo contiene proteine aggiuntive che, insieme all'amido, assorbono una quantità maggiore di acqua durante la cottura, triplicando il peso originale.",
        tip: "La pasta all'uovo richiede tempi di cottura più brevi rispetto alla pasta di semola. Controlla la consistenza 1-2 minuti prima del tempo indicato sulla confezione."
      },
      { 
        alimento: "Riso", 
        fattore: 2.50,
        info: "Il riso assorbe significativamente l'acqua durante la cottura. I granelli si espandono quando l'amido assorbe l'umidità, aumentando il peso di circa 2,5 volte rispetto al crudo.",
        tip: "Per un riso perfettamente cotto, rispetta il rapporto 1:2 (una parte di riso, due di acqua). Dopo l'ebollizione, cuoci a fuoco lento con coperchio senza mescolare per ottenere chicchi separati."
      },
      { 
        alimento: "Tortellini ravioli freschi", 
        fattore: 2.00,
        info: "La pasta ripiena fresca contiene già umidità, quindi l'aumento di peso durante la cottura è minore rispetto alla pasta secca. L'incremento è dovuto principalmente all'assorbimento di acqua nell'involucro di pasta.",
        tip: "I tortellini sono cotti quando risalgono in superficie. Scolali entro 20-30 secondi da questo momento per evitare che il ripieno perda sapore e la pasta si sfalsi."
      }
    ],
    "Verdure e ortaggi": [
      { 
        alimento: "Agretti", 
        fattore: 0.80,
        info: "Gli agretti perdono parte dell'acqua contenuta durante la cottura, riducendo il loro peso all'80% del valore iniziale. Questo è dovuto alla rottura delle cellule vegetali che rilasciano acqua.",
        tip: "Per preservare il sapore caratteristico, cuoci gli agretti in poca acqua salata per soli 3-4 minuti. Completare la cottura in padella conserva meglio nutrienti e consistenza."
      },
      { 
        alimento: "Asparagi", 
        fattore: 0.90,
        info: "La struttura fibrosa degli asparagi trattiene buona parte dell'acqua durante la cottura, con una perdita limitata di peso, circa il 10% del peso originale.",
        tip: "Cuoci gli asparagi in posizione verticale con le punte fuori dall'acqua per una cottura uniforme. Le punte cuociono più velocemente dei gambi e vanno protette dall'eccessivo calore."
      }
    ],
    "Carne": [
      { 
        alimento: "Bovino adulto magro", 
        fattore: 0.65,
        info: "Durante la cottura, la carne bovina perde circa il 35% del suo peso a causa dell'evaporazione dell'acqua e della contrazione delle fibre muscolari dovuta alla denaturazione delle proteine. La perdita di peso è influenzata dal contenuto di grasso e dal metodo di cottura.",
        tip: "Per mantenere la succulenza della carne bovina, lasciarla riposare per 5-10 minuti dopo la cottura. Questo permette ai succhi di ridistribuirsi nelle fibre muscolari invece di fuoriuscire al taglio."
      }
    ]
  };

  // Versione altamente semplificata per il debug
  return (
    <div className="neobrutal-app light">
      <header className="nb-header">
        <div className="nb-logo">
          <h1>CrudoCotto</h1>
        </div>
      </header>
      
      <main className="nb-main">
        <p>
          Applicazione temporaneamente semplificata per il debug. 
          Le categorie disponibili sono:
        </p>
        <ul>
          {Object.keys(conversionData).map(cat => (
            <li key={cat}>{cat}</li>
          ))}
        </ul>
      </main>
      
      <footer className="nb-footer">
        CrudoCotto &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default NeoBrutalismCrudoCotto;
