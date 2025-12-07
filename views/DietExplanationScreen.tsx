
import React from 'react';
import { Button } from '../components/Button';

interface DietExplanationScreenProps {
  onNext: () => void;
}

export const DietExplanationScreen: React.FC<DietExplanationScreenProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
      {/* 1. Encabezado Superior (Hábitos) */}
      <div className="mb-4">
        <span className="text-[#E84A74] font-semibold text-sm uppercase tracking-widest bg-[#FFE4E4] px-3 py-1 rounded-full">
          Hábitos
        </span>
      </div>

      {/* 2. Headline */}
      <div className="text-center mb-4 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black leading-tight">
          El Turbo-Quemador Carnívoro es una alimentación rica en proteínas y grasas saludables basada principalmente en carne para bajar de peso.
        </h2>
      </div>

      {/* 3. Subheadline */}
      <div className="text-center mb-10 px-4 md:px-10">
        <p className="text-brand-gray text-lg font-normal leading-relaxed">
          Cambia de comidas procesadas y llenas de azúcar a un plan carnívoro guiado y puedes perder entre 1 y 2 kg por semana, mientras aceleras tu metabolismo.
        </p>
      </div>

      {/* 4. Gráfico 70/30 (Imagen Reemplazada) */}
      <div className="w-full max-w-md mb-12 flex justify-center px-4">
         <img 
          src="https://i.imgur.com/iDJ0F34.png" 
          alt="Gráfico de dieta 70% grasas 30% proteínas" 
          className="w-full h-auto object-contain drop-shadow-lg"
        />
      </div>

      {/* 5. Botón Inferior */}
      <div className="w-full flex justify-center">
        <Button 
          onClick={onNext}
          className="w-full md:w-auto px-16 py-4 text-xl shadow-lg border-none"
          style={{ backgroundColor: '#E84A74' }} // Color rosa específico
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
