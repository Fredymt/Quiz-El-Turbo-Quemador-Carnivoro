
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { WeightData } from '../types';

interface WeightQuestionProps {
  onNext: (data: WeightData) => void;
}

export const WeightQuestion: React.FC<WeightQuestionProps> = ({ onNext }) => {
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [value, setValue] = useState<string>('');

  const handleNext = () => {
    if (!value) return;
    
    onNext({
      unit,
      value: parseFloat(value),
    });
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
      {/* 2. Bloque Central */}
      <div className="text-center mb-8 mt-4">
        {/* Título Principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
          Introduce tu peso actual:
        </h2>

        {/* 3. Selector de Unidades */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setUnit('kg')}
            className={`
              px-8 py-2 rounded-full text-sm font-semibold transition-colors uppercase tracking-wider
              ${unit === 'kg' 
                ? 'bg-brand-red text-white shadow-md' 
                : 'bg-brand-light text-brand-gray hover:bg-gray-200'}
            `}
          >
            kg
          </button>
          <button
            onClick={() => setUnit('lb')}
            className={`
              px-8 py-2 rounded-full text-sm font-semibold transition-colors uppercase tracking-wider
              ${unit === 'lb' 
                ? 'bg-brand-red text-white shadow-md' 
                : 'bg-brand-light text-brand-gray hover:bg-gray-200'}
            `}
          >
            lb
          </button>
        </div>

        {/* 4. Campo Numérico */}
        <div className="flex flex-col items-center justify-center min-h-[120px]">
          <div className="relative w-full max-w-[240px]">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0"
              className="w-full bg-[#F5F5F5] rounded-xl py-6 pl-6 pr-16 text-center text-5xl font-bold text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all placeholder-gray-300"
              autoFocus
            />
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-brand-gray font-medium text-lg pointer-events-none">
              {unit === 'kg' ? 'kg' : 'lb'}
            </span>
          </div>
          
          <span className="text-brand-gray font-medium mt-4">
            {unit === 'kg' ? 'kilogramos' : 'libras'}
          </span>
        </div>
      </div>

      {/* 5. Botón Inferior */}
      <div className="mt-8 w-full flex justify-center">
        <Button 
          onClick={handleNext}
          className="w-full md:w-auto px-16 py-4 text-xl shadow-lg"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};
