
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { WaterIntake } from '../types';

interface WaterIntakeScreenProps {
  onSelect: (value: WaterIntake) => void;
}

export const WaterIntakeScreen: React.FC<WaterIntakeScreenProps> = ({ onSelect }) => {
  const options: { label: string; subtext?: string; value: WaterIntake }[] = [
    { label: 'Sólo café o té', value: 'coffee_tea' },
    { label: 'Menos de 16 oz', subtext: 'menos de 2 vasos', value: 'less_16oz' },
    { label: '16 onzas – 48 onzas', subtext: '2 – 6 vasos', value: '16_48oz' },
    { label: '56 onzas – 80 onzas', subtext: '7 – 10 vasos', value: '56_80oz' },
    { label: 'No cuentes', value: 'no_count' },
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
      {/* 2. Pregunta Principal */}
      <div className="text-center mb-4 mt-6">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 leading-tight">
          ¿Cuánta agua bebes diariamente?
        </h2>
      </div>

      {/* 3. Subtexto */}
      <div className="text-center mb-10 px-4">
        <p className="text-brand-gray text-base md:text-lg">
          Nos referimos a agua limpia, excluyendo café, té y otras bebidas. Mantenerte bien hidratado ayuda a que el Turbo-Quemador Carnívoro funcione mejor.
        </p>
      </div>

      {/* 4. Opciones de Selección */}
      <div className="w-full flex flex-col gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`
              w-full flex items-center justify-between
              bg-brand-light hover:bg-gray-200
              py-5 px-6 rounded-xl transition-all duration-200
              active:scale-[0.99] group
            `}
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-brand-black text-lg font-medium">
                {option.label}
              </span>
              {option.subtext && (
                <span className="text-brand-gray text-sm font-normal mt-1">
                  {option.subtext}
                </span>
              )}
            </div>
            <ChevronRight className="text-gray-400 group-hover:text-gray-600" size={24} />
          </button>
        ))}
      </div>
    </div>
  );
};
