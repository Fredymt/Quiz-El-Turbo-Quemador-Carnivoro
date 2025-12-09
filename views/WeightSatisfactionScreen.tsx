
import React from 'react';
import { OptionButton } from '../components/OptionButton';
import { WeightSatisfactionTime } from '../types';

interface WeightSatisfactionScreenProps {
  onSelect: (time: WeightSatisfactionTime) => void;
}

export const WeightSatisfactionScreen: React.FC<WeightSatisfactionScreenProps> = ({ onSelect }) => {
  const options: { label: string; value: WeightSatisfactionTime }[] = [
    { label: 'Hace menos de un año', value: 'less_than_year' },
    { label: 'Hace 1 – 3 años', value: 'one_to_three_years' },
    { label: 'Hace más de 3 años', value: 'more_than_three_years' },
    { label: 'Nunca', value: 'never' },
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
      {/* 2. Pregunta Principal */}
      <div className="text-center mb-4 mt-6">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-4 leading-tight">
          ¿Cuándo fue la última vez que estuviste satisfecho(a) con tu peso corporal?
        </h2>
      </div>

      {/* 3. Subtexto */}
      <div className="text-center mb-10 px-4">
        <p className="text-brand-gray text-base md:text-lg">
          Esto nos ayuda a entender desde cuándo tu peso dejó de sentirse cómodo para ti.
        </p>
      </div>

      {/* 4. Opciones de Selección */}
      <div className="w-full flex flex-col gap-4">
        {options.map((option) => (
          <OptionButton 
            key={option.value}
            label={option.label} 
            onClick={() => onSelect(option.value)} 
          />
        ))}
      </div>
    </div>
  );
};
