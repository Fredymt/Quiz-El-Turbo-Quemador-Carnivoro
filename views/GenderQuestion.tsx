import React from 'react';
import { OptionButton } from '../components/OptionButton';
import { Gender } from '../types';

interface GenderQuestionProps {
  onSelect: (gender: Gender) => void;
}

export const GenderQuestion: React.FC<GenderQuestionProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
      {/* 2. Bloque Central */}
      <div className="text-center mb-10">
        {/* Título Principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
          ¿Cuál es tu sexo?
        </h2>
      </div>

      {/* 3. Opciones de Respuesta */}
      <div className="w-full flex flex-col gap-5">
        <OptionButton 
          label="Hombre" 
          onClick={() => onSelect('male')} 
        />
        <OptionButton 
          label="Mujer" 
          onClick={() => onSelect('female')} 
        />
      </div>

      {/* 4. Botón Inferior - NO APLICA en esta pantalla (Auto-avance) */}
    </div>
  );
};