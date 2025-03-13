import React, { useState, useEffect } from 'react';

const CrudoCottoApp = () => {
  // Dati delle tabelle di conversione
  const conversionData = {
    "Cereali e derivati": [
      { alimento: "Pasta di semola corta", fattore: 2.00 },
      { alimento: "Pasta di semola lunga", fattore: 2.40 },
      { alimento: "Pasta all'uovo secca", fattore: 3.00 },
      { alimento: "Riso", fattore: 2.50 },
      { alimento: "Tortellini ravioli freschi", fattore: 2.00 }
    ],
    "Verdure e ortaggi": [
      { alimento: "Agretti", fattore: 0.80 },
      { alimento: "Asparagi", fattore: 0.90 },
      { alimento: "Bieta", fattore: 0.80 },
      { alimento: "Broccoletti a testa", fattore: 0.90 },
      { alimento: "Broccoletti di rapa", fattore: 0.90 },
      { alimento: "Carciofi", fattore: 0.75 },
      { alimento: "Cardi", fattore: 0.60 },
      { alimento: "Carote", fattore: 0.85 },
      { alimento: "Cavolfiore", fattore: 0.90 },
      { alimento: "Cavoli di Bruxelles", fattore: 0.90 },
      { alimento: "Cavolo broccolo verde ramoso", fattore: 0.60 },
      { alimento: "Cavolo cappuccio verde", fattore: 1.00 },
      { alimento: "Cavolo verza", fattore: 1.00 },
      { alimento: "Cicoria di campo", fattore: 1.00 },
      { alimento: "Cicoria di taglio coltivata", fattore: 0.80 },
      { alimento: "Cipolle", fattore: 0.70 },
      { alimento: "Finocchi", fattore: 0.85 },
      { alimento: "Funghi", fattore: 0.60 },
      { alimento: "Patata con buccia", fattore: 1.00 },
      { alimento: "Patata pelata", fattore: 0.85 },
      { alimento: "Porri", fattore: 1.00 },
      { alimento: "Rape", fattore: 0.90 },
      { alimento: "Spinaci", fattore: 0.80 },
      { alimento: "Topinabur", fattore: 1.00 },
      { alimento: "Zucchine e zucca", fattore: 0.90 }
    ],
    "Legumi freschi": [
      { alimento: "Fagiolini", fattore: 0.95 },
      { alimento: "Fave", fattore: 0.80 },
      { alimento: "Piselli", fattore: 0.87 }
    ],
    "Legumi secchi": [
      { alimento: "Ceci", fattore: 3.00 },
      { alimento: "Fagioli", fattore: 2.50 },
      { alimento: "Lenticchie", fattore: 2.50 }
    ]
  };

  // Stati per l'applicazione
  const [categoria, setCategoria] = useState(Object.keys(conversionData)[0]);
  const [alimento, setAlimento] = useState(conversionData[Object.keys(conversionData)[0]][0].alimento);
  const [quantita, setQuantita] = useState('');
  const [direzione, setDirezione] = useState('crudoCotto'); // 'crudoCotto' o 'cottoCrudo'
  const [risultato, setRisultato] = useState(null);
  const [fattore, setFattore] = useState(conversionData[Object.keys(conversionData)[0]][0].fattore);

  // Aggiorna il fattore di conversione quando l'alimento cambia
  useEffect(() => {
    const alimentoScelto = conversionData[categoria].find(item => item.alimento === alimento);
    if (alimentoScelto) {
      setFattore(alimentoScelto.fattore);
    }
  }, [alimento, categoria]);

  // Gestisce il cambio di categoria
  const handleCategoriaChange = (e) => {
    const nuovaCategoria = e.target.value;
    setCategoria(nuovaCategoria);
    setAlimento(conversionData[nuovaCategoria][0].alimento);
  };

  // Gestisce il cambio di alimento
  const handleAlimentoChange = (e) => {
    setAlimento(e.target.value);
  };

  // Gestisce il cambio di quantità
  const handleQuantitaChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setQuantita(val);
    }
  };

  // Gestisce il cambio di direzione (crudo->cotto o cotto->crudo)
  const handleDirezioneChange = (dir) => {
    setDirezione(dir);
  };

  // Calcola il risultato della conversione
  const calcolaRisultato = () => {
    if (!quantita) return;

    const q = parseFloat(quantita);
    let result;

    if (direzione === 'crudoCotto') {
      result = q * fattore;
    } else {
      result = q / fattore;
    }

    setRisultato(result.toFixed(1));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl border border-white border-opacity-25">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">CrudoCotto</h1>
        <p className="text-center text-gray-600 mb-8">Converti i pesi degli alimenti da crudi a cotti e viceversa</p>
        
        {/* Selezione categoria */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Categoria</label>
          <select 
            value={categoria} 
            onChange={handleCategoriaChange}
            className="w-full p-3 bg-white bg-opacity-70 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(conversionData).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        {/* Selezione alimento */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Alimento</label>
          <select 
            value={alimento} 
            onChange={handleAlimentoChange}
            className="w-full p-3 bg-white bg-opacity-70 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {conversionData[categoria].map((item) => (
              <option key={item.alimento} value={item.alimento}>{item.alimento}</option>
            ))}
          </select>
        </div>
        
        {/* Direzione della conversione */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Conversione</label>
          <div className="flex bg-white bg-opacity-70 rounded-xl overflow-hidden border border-gray-300">
            <button 
              className={`flex-1 py-3 px-4 text-center ${direzione === 'crudoCotto' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
              onClick={() => handleDirezioneChange('crudoCotto')}
            >
              Da crudo a cotto
            </button>
            <button 
              className={`flex-1 py-3 px-4 text-center ${direzione === 'cottoCrudo' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
              onClick={() => handleDirezioneChange('cottoCrudo')}
            >
              Da cotto a crudo
            </button>
          </div>
        </div>
        
        {/* Inserimento quantità */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Quantità in grammi ({direzione === 'crudoCotto' ? 'crudo' : 'cotto'})
          </label>
          <input 
            type="text" 
            value={quantita} 
            onChange={handleQuantitaChange}
            placeholder="Inserisci la quantità in grammi" 
            className="w-full p-3 bg-white bg-opacity-70 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Pulsante calcola */}
        <button 
          onClick={calcolaRisultato}
          disabled={!quantita}
          className={`w-full py-3 px-4 rounded-xl font-medium text-white ${!quantita ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition-colors shadow-md mb-6`}
        >
          Calcola
        </button>
        
        {/* Risultato */}
        {risultato && (
          <div className="bg-white bg-opacity-70 p-6 rounded-xl border border-gray-200 text-center">
            <p className="text-gray-500 text-sm">Risultato della conversione</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="text-xl font-bold text-gray-800">{risultato} g</div>
              <div className="text-sm text-gray-600">
                {direzione === 'crudoCotto' ? 'cotto' : 'crudo'}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Fattore di conversione: {fattore}
            </p>
          </div>
        )}
        
        <div className="mt-8 text-center text-gray-500 text-xs">
          CrudoCotto &copy; {new Date().getFullYear()} | 
          <a href="https://github.com/aleattino" className="ml-1 text-blue-500 hover:underline">
            aleattino
          </a>
        </div>
      </div>
    </div>
  );
};

export default CrudoCottoApp;
