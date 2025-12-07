import React from 'react';
import { OptionButton } from '../components/OptionButton';
import { FishConsumption } from '../types';

interface FishConsumptionScreenProps {
  onSelect: (value: FishConsumption) => void;
}

export const FishConsumptionScreen: React.FC<FishConsumptionScreenProps> = ({ onSelect }) => {
  const options: { label: string; value: FishConsumption }[] = [
    { label: 'Sí', value: 'yes' },
    { label: 'A veces', value: 'sometimes' },
    { label: 'No', value: 'no' },
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
      {/* 2. Pregunta Principal */}
      <div className="text-center mb-2 mt-6">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
          ¿Comes pescado?
        </h2>
      </div>

      {/* 3. Subtexto */}
      <div className="text-center mb-10 px-4">
        <p className="text-brand-gray text-base md:text-lg">
          Esto nos ayuda a ajustar las grasas y proteínas de tu plan carnívoro.
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