
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { HeightData } from '../types';

interface HeightQuestionProps {
  onNext: (data: HeightData) => void;
}

export const HeightQuestion: React.FC<HeightQuestionProps> = ({ onNext }) => {
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const [cm, setCm] = useState<string>('');
  const [ft, setFt] = useState<string>('');
  const [inches, setInches] = useState<string>('');

  const handleNext = () => {
    // Basic validation
    if (unit === 'cm' && !cm) return;
    if (unit === 'ft' && (!ft || !inches)) return;

    onNext({
      unit,
      valueCm: unit === 'cm' ? parseInt(cm) : undefined,
      valueFt: unit === 'ft' ? parseInt(ft) : undefined,
      valueIn: unit === 'ft' ? parseInt(inches) : undefined,
    });
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
      {/* 2. Bloque Central */}
      <div className="text-center mb-8 mt-4">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
          Selecciona tu estatura:
        </h2>

        {/* 3. Selector de Unidades */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setUnit('cm')}
            className={`
              px-8 py-2 rounded-full text-sm font-semibold transition-colors uppercase tracking-wider
              ${unit === 'cm' 
                ? 'bg-brand-red text-white shadow-md' 
                : 'bg-brand-light text-brand-gray hover:bg-gray-200'}
            `}
          >
            cm
          </button>
          <button
            onClick={() => setUnit('ft')}
            className={`
              px-8 py-2 rounded-full text-sm font-semibold transition-colors uppercase tracking-wider
              ${unit === 'ft' 
                ? 'bg-brand-red text-white shadow-md' 
                : 'bg-brand-light text-brand-gray hover:bg-gray-200'}
            `}
          >
            pulgadas
          </button>
        </div>

        {/* 4. Campos Numéricos */}
        <div className="flex justify-center items-end gap-4 min-h-[120px]">
          {unit === 'cm' ? (
            <div className="flex flex-col items-center w-full max-w-[200px]">
              <input
                type="number"
                value={cm}
                onChange={(e) => setCm(e.target.value)}
                placeholder="0"
                className="w-full bg-brand-light rounded-xl py-6 text-center text-5xl font-bold text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all placeholder-gray-300"
                autoFocus
              />
              <span className="text-brand-gray font-medium mt-3">cm</span>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center w-32">
                <input
                  type="number"
                  value={ft}
                  onChange={(e) => setFt(e.target.value)}
                  placeholder="0"
                  className="w-full bg-brand-light rounded-xl py-6 text-center text-5xl font-bold text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all placeholder-gray-300"
                />
                <span className="text-brand-gray font-medium mt-3">pies</span>
              </div>
              <div className="flex flex-col items-center w-32">
                <input
                  type="number"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  placeholder="0"
                  className="w-full bg-brand-light rounded-xl py-6 text-center text-5xl font-bold text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all placeholder-gray-300"
                />
                <span className="text-brand-gray font-medium mt-3">pulgadas</span>
              </div>
            </>
          )}
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
