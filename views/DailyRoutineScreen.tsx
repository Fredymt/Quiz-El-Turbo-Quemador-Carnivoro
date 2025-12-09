
import React from 'react';
import { OptionButton } from '../components/OptionButton';
import { DailyRoutine } from '../types';

interface DailyRoutineScreenProps {
  onSelect: (routine: DailyRoutine) => void;
}

export const DailyRoutineScreen: React.FC<DailyRoutineScreenProps> = ({ onSelect }) => {
  const options: { label: string; value: DailyRoutine }[] = [
    { label: 'Trabajo de escritorio', value: 'desk_job' },
    { label: 'Moverse mucho', value: 'active_move' },
    { label: 'Siempre haciendo ejercicio', value: 'always_exercise' },
    { label: 'Pasar tiempo en casa', value: 'home' },
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
      {/* 2. Pregunta Principal */}
      <div className="text-center mb-4 mt-6">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 leading-tight">
          ¿Cómo es tu día a día?
        </h2>
      </div>

      {/* 3. Subtexto */}
      <div className="text-center mb-10 px-4">
        <p className="text-brand-gray text-base md:text-lg">
          Selecciona la opción que mejor se adapte a tu rutina. Esto nos ayuda a ajustar las porciones y calorías de tu plan.
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
