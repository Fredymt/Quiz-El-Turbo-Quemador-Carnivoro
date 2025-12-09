
import React from 'react';
import { Button } from '../components/Button';

interface FastResultsScreenProps {
  onNext: () => void;
}

export const FastResultsScreen: React.FC<FastResultsScreenProps> = ({ onNext }) => {
  const timelineEvents = [
    {
      icon: '⚡',
      text: 'Tu metabolismo comienza a acelerarse desde el Día 3'
    },
    {
      icon: '😋',
      text: 'Los antojos disminuyen notablemente alrededor del Día 9'
    },
    {
      icon: '👕',
      text: 'La ropa empieza a quedarte más suelta entre los Días 14–21'
    },
    {
      icon: '🌙',
      text: 'Notas mejoras en tu energía y sueño desde la primera semana'
    }
  ];

  return (
    <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
      {/* 2. Headline */}
      <div className="text-center mb-10 mt-4 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black leading-tight">
          Descubre qué tan rápido puedes transformar tu cuerpo con el método Turbo-Quemador.
        </h2>
      </div>

      {/* 3. Bloques de Beneficios (Timeline) */}
      <div className="w-full flex flex-col gap-5 mb-12 px-2">
        {timelineEvents.map((event, index) => (
          <div 
            key={index}
            className="bg-[#F9F9F9] p-6 rounded-xl flex items-center gap-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="text-3xl flex-shrink-0">
              {event.icon}
            </div>
            <p className="text-brand-black text-lg font-medium text-left leading-snug">
              {event.text}
            </p>
          </div>
        ))}
      </div>

      {/* 4. Botón Inferior */}
      <div className="w-full flex justify-center pb-8">
        <Button 
          onClick={onNext}
          className="w-full md:w-auto px-20 py-4 text-xl shadow-lg"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};
