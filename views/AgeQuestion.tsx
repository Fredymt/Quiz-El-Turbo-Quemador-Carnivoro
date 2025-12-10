
import React from 'react';
import { ImageOption } from '../components/ImageOption';
import { AgeRange, Gender } from '../types';

interface AgeQuestionProps {
  onSelect: (age: AgeRange) => void;
  gender?: Gender;
}

export const AgeQuestion: React.FC<AgeQuestionProps> = ({ onSelect, gender = 'male' }) => {
  
  // Opciones para Hombres (URLs reales)
  const maleOptions: { label: AgeRange; imageSrc: string }[] = [
    { label: '18-29', imageSrc: 'https://i.imgur.com/Hp9Wk8t.png' },
    { label: '30-39', imageSrc: 'https://i.imgur.com/AlSImVa.png' },
    { label: '40-49', imageSrc: 'https://i.imgur.com/WsVzveZ.png' },
    { label: '50+', imageSrc: 'https://i.imgur.com/Tfey5BS.png' },
  ];

  // Opciones para Mujeres (URLs reales proporcionadas)
  const femaleOptions: { label: AgeRange; imageSrc: string }[] = [
    { label: '18-29', imageSrc: 'https://i.imgur.com/XkPuAhm.png' },
    { label: '30-39', imageSrc: 'https://i.imgur.com/0kvlUc4.png' },
    { label: '40-49', imageSrc: 'https://i.imgur.com/LzVpRBy.png' },
    { label: '50+', imageSrc: 'https://i.imgur.com/pEjpbwg.png' },
  ];

  const currentOptions = gender === 'female' ? femaleOptions : maleOptions;

  return (
    <div className="w-full max-w-4xl flex flex-col items-center animate-fade-in">
      {/* 2. Bloque Central */}
      <div className="text-center mb-12">
        {/* Título Principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
          ¿Cuál es tu rango de edad?
        </h2>
      </div>

      {/* 3. Opciones con Imágenes */}
      {/* Layout Grid/Flex que soporta la jerarquía visual solicitada */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {currentOptions.map((option) => (
          <ImageOption
            key={option.label}
            label={option.label}
            imageSrc={option.imageSrc}
            onClick={() => onSelect(option.label)}
            className="w-[45%] md:w-auto" // 2 por fila en móvil, auto en escritorio
          />
        ))}
      </div>
    </div>
  );
};
