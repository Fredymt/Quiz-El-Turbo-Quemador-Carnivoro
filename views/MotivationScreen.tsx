
import React from 'react';
import { Button } from '../components/Button';
import { Star } from 'lucide-react';

interface MotivationScreenProps {
  onNext: () => void;
}

export const MotivationScreen: React.FC<MotivationScreenProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
      {/* 1. Encabezado Superior (Hábitos) */}
      <div className="mb-4">
        <span className="text-[#E84A74] font-semibold text-sm uppercase tracking-widest bg-[#FFE4E4] px-3 py-1 rounded-full">
          Hábitos
        </span>
      </div>

      {/* 2. Título Principal */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black leading-tight">
          La alimentación carnívora facilita la pérdida de peso
        </h2>
      </div>

      {/* 3. Tarjeta de Testimonio */}
      <div className="w-full max-w-lg bg-[#F5F5F5] rounded-2xl p-8 mb-12 flex flex-col gap-4 text-center items-center shadow-sm">
        
        {/* Estrellas */}
        <div className="flex gap-1 text-[#FFC107]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} fill="#FFC107" strokeWidth={0} size={24} />
          ))}
        </div>

        {/* Título del testimonio */}
        <h3 className="text-xl font-bold text-brand-black">
          Jair perdió 75 libras
        </h3>

        {/* Texto del testimonio */}
        <p className="text-lg text-brand-gray font-normal italic leading-relaxed">
          “El enfoque del Turbo-Quemador Carnívoro fue lo que más me motivó a seguir adelante. No tardé mucho en ver resultados. ¡He perdido 32 kilos en 4 meses!”
        </p>

        {/* Ubicación */}
        <span className="text-sm text-gray-500 font-medium">
          Medellín, Colombia
        </span>
      </div>

      {/* 4. Botón Inferior */}
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
