
import React from 'react';
import { OptionButton } from '../components/OptionButton';
import { SleepHours } from '../types';

interface SleepQuestionProps {
  onSelect: (hours: SleepHours) => void;
}

export const SleepQuestion: React.FC<SleepQuestionProps> = ({ onSelect }) => {
  const options: { label: string; value: SleepHours }[] = [
    { label: 'Menos de 5 horas', value: 'less_than_5' },
    { label: '5–6 horas', value: '5_6' },
    { label: '7–8 horas', value: '7_8' },
    { label: 'Más de 8 horas', value: 'more_than_8' },
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
      {/* 2. Pregunta Principal */}
      <div className="text-center mb-4 mt-6">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 leading-tight">
          ¿Cuánto duermes habitualmente?
        </h2>
      </div>

      {/* 3. Subtexto */}
      <div className="text-center mb-10 px-4">
        <p className="text-brand-gray text-base md:text-lg">
          Tu descanso influye en tus hormonas del hambre y en la velocidad con la que puedes perder peso.
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
