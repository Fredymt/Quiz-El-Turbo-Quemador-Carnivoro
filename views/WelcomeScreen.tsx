import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="w-full flex flex-col items-center gap-10 animate-fade-in">
      {/* 2. Tarjeta Central */}
      <Card className="w-full flex flex-col items-center text-center gap-6">
        
        {/* A) Nombre del Quiz */}
        <span className="text-brand-black font-semibold text-lg uppercase tracking-wide opacity-80">
          Evaluación de Transformación
        </span>

        {/* B) Headline */}
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black leading-tight">
          ¿Que tan rápido puedes transformar tu cuerpo con el <span className="text-brand-red">Turbo-Quemador Carnívoro</span>?
        </h1>

        <div className="w-16 h-1 bg-brand-light rounded-full my-2"></div>

        {/* C) Subheadline */}
        <p className="text-brand-gray text-lg md:text-xl font-normal leading-relaxed">
          Descubre tu plan Carnívoro Personalizado para perder peso en días y alcanzar tu peso ideal.
        </p>

        {/* D) Subheadline Secundaria */}
        <p className="text-brand-gray text-base md:text-lg font-normal leading-relaxed">
          Basado en tu cuerpo, tu estilo de vida y tu nivel actual de energía.<br className="hidden md:block"/>
          Obtén tu diagnóstico en menos de 60 segundos.
        </p>
      </Card>

      {/* 3. Botón Principal (Fuera de la tarjeta para espaciado amplio) */}
      <Button onClick={onStart} className="w-full md:w-auto text-xl py-5 px-12 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
        Comenzar Test &rarr;
      </Button>
    </div>
  );
};