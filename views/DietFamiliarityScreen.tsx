
import React from 'react';

interface DietFamiliarityScreenProps {
  onSelect: (familiarity: 'beginner' | 'basic' | 'advanced') => void;
}

export const DietFamiliarityScreen: React.FC<DietFamiliarityScreenProps> = ({ onSelect }) => {
  const options = [
    { label: 'Considérame un principiante', emoji: '🥩', value: 'beginner' as const },
    { label: 'Tengo algunos conocimientos básicos', emoji: '😎', value: 'basic' as const },
    { label: 'Tengo mucha experiencia', emoji: '🤯', value: 'advanced' as const },
  ];

  return (
    <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
      {/* 1. Etiqueta Superior de Sección */}
      <div className="mb-4">
        <span className="text-brand-red font-semibold text-sm uppercase tracking-widest bg-brand-soft/50 px-3 py-1 rounded-full">
          Hábitos
        </span>
      </div>

      {/* 2. Pregunta Principal */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black leading-tight">
          ¿Qué tan familiarizado esta usted con la Dieta Carnivora?
        </h2>
      </div>

      {/* 3. Opciones con Emojis */}
      <div className="w-full flex flex-col gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`
              w-full flex items-center p-6 rounded-xl transition-all duration-200
              bg-[#F2F2F2] hover:bg-white hover:shadow-lg hover:ring-2 hover:ring-brand-soft
              text-left group
            `}
          >
            <span className="text-4xl mr-6 group-hover:scale-110 transition-transform duration-200">
              {option.emoji}
            </span>
            <span className="text-lg md:text-xl font-medium text-brand-black">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};