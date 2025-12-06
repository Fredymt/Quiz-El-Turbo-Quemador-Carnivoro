import React from 'react';
import { OptionButton } from '../components/OptionButton';
import { ActivityLevel } from '../types';

interface ActivityQuestionProps {
  onSelect: (level: ActivityLevel) => void;
}

export const ActivityQuestion: React.FC<ActivityQuestionProps> = ({ onSelect }) => {
  const options: { label: string; value: ActivityLevel }[] = [
    { label: 'Ninguno', value: 'none' },
    { label: 'Ejercicio ligero', value: 'light' },
    { label: '2–3 veces por semana', value: 'moderate' },
    { label: '4–5 veces por semana', value: 'active' },
    { label: 'Entrenamiento intenso', value: 'intense' },
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
      {/* 2. Bloque Central */}
      <div className="text-center mb-10 mt-6">
        {/* Título Principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
          ¿Cuánto ejercicio realizas actualmente?
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