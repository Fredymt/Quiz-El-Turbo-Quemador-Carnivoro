import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

interface WeightHealthInfoProps {
  onContinue: () => void;
}

export const WeightHealthInfo: React.FC<WeightHealthInfoProps> = ({ onContinue }) => {
  return (
    <div className="w-full flex flex-col items-center animate-fade-in gap-8">
      {/* 2. Tarjeta Central Informativa */}
      <Card className="w-full max-w-2xl flex flex-col px-6 py-8 md:p-12">
        
        {/* A) Título Principal */}
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black text-center mb-6 leading-tight">
          Tu peso actual puede estar afectando tu salud.
        </h2>

        {/* B) Subtítulo / Introducción */}
        <p className="text-brand-gray text-lg text-center mb-8 font-normal">
          Las personas con sobrepeso u obesidad suelen experimentar:
        </p>

        {/* C) Lista de riesgos */}
        <ul className="text-left w-full space-y-4 mb-8 pl-2 md:pl-8">
          {[
            "Presión arterial elevada",
            "Riesgo aumentado de diabetes tipo 2",
            "Mayor posibilidad de dolor de espalda y articulaciones",
            "Bajos niveles de energía"
          ].map((item, index) => (
            <li key={index} className="flex items-start text-brand-gray text-lg">
              <span className="mr-3 text-brand-black font-bold">•</span>
              {item}
            </li>
          ))}
        </ul>

        {/* D) Frase final destacada */}
        <p className="text-brand-black text-center text-lg md:text-xl font-medium mt-2 leading-relaxed">
          Con el método Turbo-Quemador Carnívoro, estos factores pueden comenzar a mejorar desde la primera semana.
        </p>
      </Card>

      {/* 4. Botón Inferior - Externo a la tarjeta */}
      <Button 
        onClick={onContinue} 
        className="w-full md:w-auto text-xl py-4 px-16 shadow-xl hover:shadow-2xl"
      >
        Continuar &rarr;
      </Button>
    </div>
  );
};
