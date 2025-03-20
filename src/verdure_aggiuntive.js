const verdureAggiuntive = [
  { 
    alimento: "Carote", 
    fattore: 0.85,
    info: "Le carote perdono circa il 15% del loro peso durante la cottura. Il calore rompe le pareti cellulari, causando la fuoriuscita di acqua.",
    tip: "La cottura al vapore delle carote preserva meglio le vitamine rispetto alla bollitura. Per massimizzare l'assorbimento del betacarotene, consumale con un po' di olio."
  },
  { 
    alimento: "Cavolfiore", 
    fattore: 0.90,
    info: "Il cavolfiore mantiene il 90% del suo peso durante la cottura. La sua struttura compatta aiuta a trattenere l'umidità interna.",
    tip: "Per preservare il colore bianco, aggiungi un cucchiaino di latte o succo di limone all'acqua di cottura. La cottura al vapore per 5-6 minuti mantiene la consistenza croccante."
  },
  { 
    alimento: "Cavoli di Bruxelles", 
    fattore: 0.90,
    info: "I cavoli di Bruxelles perdono circa il 10% del loro peso durante la cottura grazie alla loro struttura compatta che trattiene bene l'umidità.",
    tip: "Per ridurre l'amarezza, fai un taglio a croce alla base. La tostatura in forno a 200°C con un filo d'olio esalta la dolcezza naturale dei cavoli di Bruxelles."
  },
  { 
    alimento: "Cavolo broccolo verde ramoso", 
    fattore: 0.60,
    info: "Il cavolo broccolo verde ramoso perde circa il 40% del suo peso durante la cottura a causa della sua struttura porosa che rilascia molta acqua.",
    tip: "Per mantenere il colore brillante del cavolo broccolo, immergilo in acqua ghiacciata subito dopo la cottura. La sbollentatura per soli 2-3 minuti preserva i nutrienti."
  },
  { 
    alimento: "Cavolo cappuccio verde", 
    fattore: 1.00,
    info: "Il cavolo cappuccio verde mantiene praticamente invariato il suo peso durante la cottura grazie alla struttura densa e compatta.",
    tip: "Per una cottura veloce, tagliare il cavolo cappuccio a listarelle sottili. L'aggiunta di un cucchiaino di aceto di mele durante la cottura ne mantiene il colore e riduce l'odore."
  },
  { 
    alimento: "Cavolo verza", 
    fattore: 1.00,
    info: "Il cavolo verza mantiene il suo peso durante la cottura. La struttura delle foglie, più delicate rispetto al cappuccio, compensa l'acqua persa.",
    tip: "Le foglie esterne più dure richiedono tempi di cottura più lunghi rispetto a quelle interne più tenere. Separale e aggiungi prima quelle esterne per una cottura uniforme."
  },
  { 
    alimento: "Cicoria di campo", 
    fattore: 1.00,
    info: "La cicoria di campo non subisce variazioni significative di peso durante la cottura, mantenendo la sua consistenza.",
    tip: "La cottura rapida della cicoria di campo preserva il suo caratteristico sapore leggermente amarognolo. Completa con olio a crudo per esaltarne il gusto."
  },
  { 
    alimento: "Cicoria di taglio coltivata", 
    fattore: 0.80,
    info: "La cicoria di taglio coltivata perde circa il 20% del suo peso durante la cottura per via della fuoriuscita di acqua dalle foglie.",
    tip: "Saltare la cicoria rapidamente in padella con aglio e peperoncino ne esalta il sapore e mantiene la consistenza croccante. Le foglie più giovani possono essere consumate anche crude."
  },
  { 
    alimento: "Cipolle", 
    fattore: 0.70,
    info: "Le cipolle perdono circa il 30% del loro peso durante la cottura. Il calore rompe le cellule vegetali, liberando l'acqua contenuta e gli zuccheri naturali.",
    tip: "La cottura lenta a bassa temperatura caramellizza gli zuccheri della cipolla, creando un sapore dolce e ricco. Per evitare lacrimazione durante il taglio, raffredda prima le cipolle."
  },
  { 
    alimento: "Finocchi", 
    fattore: 0.85,
    info: "I finocchi perdono circa il 15% del loro peso in cottura. La struttura stratificata delle foglie aiuta a trattenere parte dell'umidità.",
    tip: "Per un finocchio tenero, rimuovi la parte esterna più fibrosa e cuoci solo il cuore. La cottura al forno con un filo d'olio esalta la dolcezza naturale."
  },
  { 
    alimento: "Funghi", 
    fattore: 0.60,
    info: "I funghi perdono circa il 40% del loro peso durante la cottura a causa dell'alto contenuto di acqua che viene rilasciata rapidamente.",
    tip: "Per ottenere funghi dorati, cuoci a fuoco alto in padella senza sovraffollare e senza aggiungere sale fino a fine cottura. Il sale estrattrebbe l'acqua troppo rapidamente."
  },
  { 
    alimento: "Patata con buccia", 
    fattore: 1.00,
    info: "La patata con buccia mantiene il suo peso durante la cottura. La buccia agisce come barriera, trattenendo l'umidità interna.",
    tip: "La cottura con buccia preserva i nutrienti e riduce l'assorbimento di acqua. Cuoci a vapore o in forno per ottenere un sapore più intenso rispetto alla bollitura."
  },
  { 
    alimento: "Patata pelata", 
    fattore: 0.85,
    info: "La patata pelata perde circa il 15% del suo peso durante la cottura. Senza la protezione della buccia, parte dell'amido e dell'acqua viene persa.",
    tip: "Per patate lesse che non si sfaldano, inizia la cottura con acqua fredda. Per purè soffice, usa patate farinose e schiacciale quando sono ancora calde."
  },
  { 
    alimento: "Porri", 
    fattore: 1.00,
    info: "I porri mantengono il loro peso durante la cottura. La loro struttura stratificata permette di trattenere l'umidità interna bilanciando le perdite.",
    tip: "Per pulire efficacemente i porri, taglia la base e la parte verde più dura, quindi incidi longitudinalmente e risciacqua sotto acqua corrente per eliminare residui di terra."
  },
  { 
    alimento: "Rape", 
    fattore: 0.90,
    info: "Le rape perdono circa il 10% del loro peso durante la cottura. La loro polpa densa e compatta trattiene bene l'umidità.",
    tip: "Le rape giovani hanno un sapore più delicato e richiedono tempi di cottura più brevi. Per ridurre l'amarezza, sbollentale brevemente prima della cottura finale."
  },
  { 
    alimento: "Spinaci", 
    fattore: 0.80,
    info: "Gli spinaci perdono circa il 20% del loro peso durante la cottura, rilasciando parte dell'acqua contenuta nelle foglie.",
    tip: "Gli spinaci riducono drasticamente il volume durante la cottura. Per preservare vitamine e minerali, saltali in padella per pochi secondi anziché bollirli."
  },
  { 
    alimento: "Topinabur", 
    fattore: 1.00,
    info: "Il topinabur mantiene il suo peso originale durante la cottura. La sua polpa compatta trattiene efficacemente l'umidità.",
    tip: "Il topinabur può essere cucinato come le patate. Per ridurre l'effetto flatulento, aggiungi semi di finocchio o cumino durante la cottura."
  },
  { 
    alimento: "Zucchine e zucca", 
    fattore: 0.90,
    info: "Le zucchine e la zucca perdono circa il 10% del loro peso durante la cottura. La loro polpa porosa rilascia parte dell'acqua contenuta.",
    tip: "Per zucchine non acquose, cuocile rapidamente a fuoco alto. La zucca si presta a cotture lunghe che ne caramellizzano gli zuccheri, esaltandone il sapore dolce."
  }
];

module.exports = verdureAggiuntive; 