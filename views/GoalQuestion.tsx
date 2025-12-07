import React from 'react';
import { OptionButton } from '../components/OptionButton';
import { Goal } from '../types';

interface GoalQuestionProps {
  onSelect: (goal: Goal) => void;
}

export const GoalQuestion: React.FC<GoalQuestionProps> = ({ onSelect }) => {
  const options: { label: string; value: Goal }[] = [
    { label: 'Perder peso rápidamente', value: 'lose_weight' },
    { label: 'Ganar energía', value: 'gain_energy' },
    { label: 'Mejorar salud en general', value: 'improve_health' },
    { label: 'Transformación completa', value: 'transformation' },
    { label: 'Sentirme más seguro(a) con mi cuerpo', value: 'confidence' },
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
      {/* 2. Bloque Central */}
      <div className="text-center mb-10 mt-6">
        {/* Título Principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 leading-tight">
          ¿Cuál es tu objetivo principal?
        </h2>
      </div>

      {/* 3. Opciones de Respuesta */}
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