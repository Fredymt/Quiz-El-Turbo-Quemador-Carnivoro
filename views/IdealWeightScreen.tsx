
import React from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { DerivedStats, Gender } from '../types';

interface IdealWeightScreenProps {
  stats: DerivedStats;
  gender: Gender;
  onNext: () => void;
}

export const IdealWeightScreen: React.FC<IdealWeightScreenProps> = ({ stats, gender, onNext }) => {
  
  // Dynamic adjectives based on gender
  const adjectives = gender === 'female' 
    ? { light: 'ligera', safe: 'segura', full: 'llena' }
    : { light: 'ligero', safe: 'seguro', full: 'lleno' };

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <div className="text-center mb-8 mt-2">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black leading-tight">
          Peso ideal sugerido <br/>
          <span className="text-xl md:text-2xl font-semibold text-brand-gray mt-2 block">
            — Rango IMC saludable —
          </span>
        </h2>
      </div>

      <Card className="w-full max-w-lg text-center flex flex-col items-center gap-6 border-t-4 border-brand-red">
        
        {/* Subtítulo */}
        <p className="text-brand-gray text-lg">
          Siguiendo un IMC de <span className="font-semibold text-brand-black">18.5 – 24.9</span>:<br/>
          Para tu estatura, tu peso ideal se encuentra entre:
        </p>

        {/* Rango de Peso Ideal Destacado */}
        <div className="bg-brand-soft/30 w-full py-6 rounded-xl border border-brand-soft">
          <p className="text-3xl md:text-4xl font-extrabold text-brand-red">
            {stats.idealWeightMin} kg — {stats.idealWeightMax} kg
          </p>
        </div>

        {/* Texto Adicional Motivacional */}
        <p className="text-brand-black text-lg leading-relaxed px-2">
          Este rango es donde tu cuerpo funciona mejor, donde reduces riesgo de enfermedades y donde podrás sentirte más <strong>{adjectives.light}</strong>, <strong>{adjectives.safe}</strong> y <strong>{adjectives.full}</strong> de energía.
        </p>

      </Card>

      <div className="mt-10 w-full flex justify-center">
        <Button 
          onClick={onNext}
          className="w-full md:w-auto px-16 py-4 text-xl shadow-lg"
        >
          Continuar &rarr;
        </Button>
      </div>
    </div>
  );
};
