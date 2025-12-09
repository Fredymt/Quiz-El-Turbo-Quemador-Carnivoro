
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Check, Star, CheckCircle2 } from 'lucide-react';
import { UserAnswers } from '../types';

interface FinalOfferScreenProps {
  userAnswers: UserAnswers;
  onPurchase: () => void;
}

export const FinalOfferScreen: React.FC<FinalOfferScreenProps> = ({ userAnswers, onPurchase }) => {
  // Timer for "Reservado para: 11:35" logic
  const [timeLeft, setTimeLeft] = useState(695); // 11 minutes 35 seconds approx
  const [selectedPlan, setSelectedPlan] = useState<'4week' | '12week'>('4week');

  // --- TIMER LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // --- PERSONALIZATION LOGIC ---
  const gender = userAnswers.gender || 'male';
  const age = userAnswers.ageRange || '30-39';
  const familiarity = userAnswers.dietFamiliarity || 'beginner';
  const activity = userAnswers.activityLevel || 'moderate';
  const userEmail = userAnswers.email || 'tu-email@ejemplo.com';
  
  const genderText = gender === 'male' ? 'hombres' : 'mujeres';
  const ageText = `de ${age} años`;
  const genderImageColor = gender === 'male' ? 'bg-blue-100' : 'bg-pink-100';

  const familiarityText = familiarity === 'beginner' 
    ? 'carnívoros principiantes' 
    : 'carnívoros competentes';
    
  const activityText = (activity === 'none' || activity === 'light') 
    ? 'sedentario' 
    : 'ligeramente activo';

  // --- PRICING LOGIC ---
  const prices = {
    '4week': { original: 31.99, current: 14.49, name: 'Plan de 4 semanas' },
    '12week': { original: 62.99, current: 29.99, name: 'Plan de 12 semanas' }
  };

  const currentPrice = prices[selectedPlan].current;
  const originalPrice = prices[selectedPlan].original;

  return (
    <div className="w-full flex flex-col items-center bg-white animate-fade-in -mt-20">
      
      {/* --- CUSTOM HEADER (Replaces Default) --- */}
      {/* 1. Red Bar */}
      <div className="w-screen bg-[#B71C1C] text-white py-3 flex justify-center items-center text-center font-bold sticky top-0 z-[60] shadow-sm text-sm md:text-base">
        <span>Más del 50 % de descuento está reservado para: {formatTime(timeLeft)}</span>
      </div>
      
      {/* 2. Logo Bar (White) */}
      <div className="w-full bg-white shadow-sm py-2 px-4 md:px-8 flex justify-between items-center z-50 border-b border-gray-100">
         <div className="h-10 md:h-12">
            <img 
              src="https://i.imgur.com/Omo9Crv.png" 
              alt="Turbo-Quemador Logo" 
              className="h-full w-auto object-contain"
            />
         </div>
         <button 
           onClick={onPurchase} 
           className="bg-[#FFE4E4] text-[#B71C1C] font-bold text-xs md:text-sm px-4 py-2 rounded-full hover:bg-[#FFD4D4] transition-colors"
         >
           Obtenga su plan
         </button>
      </div>

      <div className="w-full max-w-3xl px-4 md:px-0 flex flex-col items-center pt-6">

        {/* --- HERO: VISUAL COMPARISON (Mobile Side-by-Side) --- */}
        <div className="w-full bg-white rounded-2xl md:p-8 mb-8 flex flex-row gap-2 md:gap-12 items-start justify-center">
          
          {/* Card 1: Ahora */}
          <div className="flex flex-col items-center w-[45%] md:w-auto md:max-w-xs">
            <span className="bg-[#FFE4E4] text-[#B71C1C] px-3 py-1 rounded-full font-bold text-sm mb-3">Ahora</span>
            <div className={`w-full aspect-[3/4] md:w-48 md:h-64 ${genderImageColor} rounded-xl overflow-hidden mb-3 relative`}>
              <img 
                src="https://i.imgur.com/UAAji0y.png" 
                alt="Antes" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="w-full space-y-3 text-left">
              <div>
                <span className="block text-xs md:text-sm font-bold text-gray-900">Grasa corporal</span>
                <span className="block text-xs text-gray-500 mb-1">Medio</span>
                <div className="flex gap-1">
                   <div className="h-1.5 flex-1 bg-[#B71C1C] rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-[#B71C1C] rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div>
                <span className="block text-xs md:text-sm font-bold text-gray-900">Nivel de condición física</span>
                {/* Changed to Bajo and 1 bar */}
                <span className="block text-xs text-gray-500 mb-1">Bajo</span>
                <div className="flex gap-1">
                   <div className="h-1.5 flex-1 bg-[#B71C1C] rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-gray-200 rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="self-center pt-8 md:pt-20 opacity-30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-12 md:h-12 text-brand-red">
               <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#B71C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M2 12L8 6M8 18L2 12" stroke="#B71C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(-10,0)"/>
            </svg>
          </div>

          {/* Card 2: Meta */}
          <div className="flex flex-col items-center w-[45%] md:w-auto md:max-w-xs">
            <span className="bg-[#B71C1C] text-white px-3 py-1 rounded-full font-bold text-sm mb-3">Meta</span>
            <div className={`w-full aspect-[3/4] md:w-48 md:h-64 ${genderImageColor} rounded-xl overflow-hidden mb-3 relative`}>
               <img 
                src="https://i.imgur.com/mm1f0So.png" 
                alt="Tu meta" 
                className="w-full h-full object-cover"
              />
            </div>
            
             <div className="w-full space-y-3 text-left">
              <div>
                <span className="block text-xs md:text-sm font-bold text-gray-900">Grasa corporal</span>
                <span className="block text-xs text-gray-500 mb-1">Bajo</span>
                {/* Changed to 1 bar filled */}
                <div className="flex gap-1">
                   <div className="h-1.5 flex-1 bg-[#B71C1C] rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-gray-200 rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div>
                 <span className="block text-xs md:text-sm font-bold text-gray-900">Nivel de condición física</span>
                <span className="block text-xs text-gray-500 mb-1">Avanzado</span>
                <div className="flex gap-1">
                   <div className="h-1.5 flex-1 bg-[#B71C1C] rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-[#B71C1C] rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-[#B71C1C] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- PURPLE PERSONALIZATION BOX --- */}
        <div className="w-full bg-[#8B5CF6] text-white rounded-xl p-6 md:p-10 text-center mb-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-xs font-medium mb-4">
              {userEmail}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
              Tu plan de pérdida de peso personalizado está listo
            </h2>

            <div className="flex flex-col gap-3 items-start max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 size={16} /></div>
                <span className="font-medium text-left">Perfecto para {genderText} {ageText}.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 size={16} /></div>
                <span className="font-medium text-left">Para {familiarityText}.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 size={16} /></div>
                <span className="font-medium text-left">Para un estilo de vida {activityText}.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 size={16} /></div>
                <span className="font-medium text-left">Sin restricciones dietéticas.</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- HEADLINE --- */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          ¡Obtén resultados visibles en 4 semanas!
        </h2>

        {/* --- PRICING SELECTOR --- */}
        <div className="w-full flex flex-col gap-4 mb-8">
          
          {/* Plan 4 Semanas */}
          <div 
            onClick={() => setSelectedPlan('4week')}
            className={`
              w-full p-6 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all relative
              ${selectedPlan === '4week' ? 'bg-white border-brand-red shadow-lg transform scale-[1.02]' : 'bg-gray-50 border-transparent hover:bg-gray-100'}
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === '4week' ? 'border-brand-red' : 'border-gray-300'}`}>
                {selectedPlan === '4week' && <div className="w-3 h-3 bg-brand-red rounded-full"></div>}
              </div>
              <span className="font-bold text-xl text-gray-900">Plan de 4 semanas</span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 line-through text-sm block">${prices['4week'].original}</span>
              <span className="text-brand-black font-bold text-xl">${prices['4week'].current}</span>
            </div>
          </div>

          {/* Plan 12 Semanas */}
          <div 
            onClick={() => setSelectedPlan('12week')}
            className={`
              w-full p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all relative
              ${selectedPlan === '12week' ? 'bg-[#FFF5F5] border-brand-red' : 'bg-gray-50 border-transparent hover:bg-gray-100'}
            `}
          >
             <div className="absolute -top-3 left-6 bg-[#FF9800] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                LOS MÁS POPULARES
             </div>
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === '12week' ? 'border-brand-red' : 'border-gray-300'}`}>
                {selectedPlan === '12week' && <div className="w-3 h-3 bg-brand-red rounded-full"></div>}
              </div>
              <span className="font-bold text-lg text-gray-800">Plan de 12 semanas</span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 line-through text-sm block">${prices['12week'].original}</span>
              <span className="text-brand-black font-bold">${prices['12week'].current}</span>
            </div>
          </div>

        </div>

        {/* --- GREEN CTA BUTTON --- */}
        <Button 
          onClick={onPurchase}
          fullWidth
          className="py-4 text-xl shadow-xl mb-12 rounded-full border-none"
          style={{ backgroundColor: '#00C853' }} // Vibrant Green
        >
          Obtener mi plan
        </Button>

        {/* --- SUCCESS STORY (LUCY) --- */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 px-4 leading-tight">
          ¡Nuestros clientes están perdiendo peso con éxito!
        </h2>
        
        <div className="w-full bg-[#F5F5F5] rounded-2xl p-6 md:p-8 mb-8">
           <div className="mb-2">
             {/* Name changed to Lucy */}
             <span className="font-bold text-gray-900">Lucy</span>, <span className="text-gray-500 text-sm">Reino Unido</span>
           </div>
           <div className="flex gap-1 text-[#FFC107] mb-4">
             {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#FFC107" strokeWidth={0} />)}
           </div>
           <p className="text-sm text-gray-700 leading-relaxed mb-6 font-medium">
             A mi esposo y a mí nos encanta esta aplicación. Nos ayuda a ambos a ser responsables. Hemos perdido 11 kilos. He logrado mi objetivo de pérdida de peso. Recibí respuestas a mis preguntas en una hora.
           </p>
           {/* Image Placeholder for Testimonial */}
           <div className="w-full h-64 bg-gray-300 rounded-xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Transformación" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                Resultados verificados
              </div>
           </div>
        </div>

        {/* --- SECOND GREEN CTA --- */}
        <Button 
          onClick={onPurchase}
          fullWidth
          className="py-4 text-xl shadow-xl mb-16 rounded-full border-none"
          style={{ backgroundColor: '#00C853' }} // Vibrant Green
        >
          Obtener mi plan
        </Button>

        {/* --- CUSTOMER REVIEWS LIST --- */}
        <div className="w-full bg-gray-50 rounded-2xl p-6 md:p-8 mb-12">
          <h3 className="font-bold text-gray-500 mb-6">Opiniones de clientes</h3>
          
          <div className="flex flex-col gap-6">
            
            {/* Review 1 - Changed to Oscar */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                   <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Oscar" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-blue-600">Oscar</span>
                  <span className="text-[10px] text-gray-400">recomienda el método Turbo-Quemador Carnívoro</span>
                </div>
              </div>
              <p className="text-xs text-gray-700">
                ¡Pérdida de peso! ¡Medidas perdidas! ¡Creo que nunca entenderás la sensación que tienes cuando por fin tienes el control! ¡Y te sientes saludable!
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                   <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Julio" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-blue-600">Julio</span>
                  <span className="text-[10px] text-gray-400">recomienda el método Turbo-Quemador Carnívoro</span>
                </div>
              </div>
              <p className="text-xs text-gray-700">
                De verdad que disfruto comiendo como como, ya no tengo hambre todo el tiempo, no estoy deprimida ni tan ansiosa, tengo muchísima energía y he bajado 7 kilos en el primer mes. He encontrado tantos productos sin carbohidratos o bajos en carbohidratos que no me imagino comiendo como antes... nunca.
              </p>
            </div>

            {/* Review 3 */}
             <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                   <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Irene" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-blue-600">Irene Cruz</span>
                  <span className="text-[10px] text-gray-400">recomienda el método Turbo-Quemador Carnívoro</span>
                </div>
              </div>
              <p className="text-xs text-gray-700">
                Perdí 28 libras y espero seguir alcanzando mi objetivo de 130 libras.
              </p>
            </div>

          </div>
        </div>

        {/* --- SUMMARY FEATURES --- */}
        <h2 className="text-xl font-bold text-center text-gray-900 mb-8">
          ¡Obtén resultados visibles en 4 semanas!
        </h2>
        
        <div className="w-full grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
           <div className="flex gap-3 items-start">
             <div className="bg-[#00C853] rounded-full p-0.5 mt-1 flex-shrink-0"><Check size={12} color="white" strokeWidth={4} /></div>
             <div className="flex flex-col">
               <span className="text-[10px] text-gray-500">Perfecto para</span>
               <span className="text-xs font-bold text-gray-800">Hombres de todas las edades</span>
             </div>
           </div>
           <div className="flex gap-3 items-start">
             <div className="bg-[#00C853] rounded-full p-0.5 mt-1 flex-shrink-0"><Check size={12} color="white" strokeWidth={4} /></div>
             <div className="flex flex-col">
               <span className="text-[10px] text-gray-500">Estilo de vida</span>
               <span className="text-xs font-bold text-gray-800">Ligeramente activo</span>
             </div>
           </div>
           <div className="flex gap-3 items-start">
             <div className="bg-[#00C853] rounded-full p-0.5 mt-1 flex-shrink-0"><Check size={12} color="white" strokeWidth={4} /></div>
             <div className="flex flex-col">
               <span className="text-[10px] text-gray-500">Meta</span>
               <span className="text-xs font-bold text-gray-800">Perder peso</span>
             </div>
           </div>
           <div className="flex gap-3 items-start">
             <div className="bg-[#00C853] rounded-full p-0.5 mt-1 flex-shrink-0"><Check size={12} color="white" strokeWidth={4} /></div>
             <div className="flex flex-col">
               <span className="text-[10px] text-gray-500">Dieta</span>
               <span className="text-xs font-bold text-gray-800">Sin restricciones dietéticas</span>
             </div>
           </div>
        </div>

        {/* --- CHECKOUT SUMMARY --- */}
        <div className="w-full border-t border-b border-gray-200 py-6 mb-8">
           <h3 className="font-bold text-lg mb-4 text-gray-900">Verificar</h3>
           <div className="flex justify-between text-sm mb-2 text-gray-900">
             <span>Tu plan personalizado de {prices[selectedPlan].name.replace('Plan de ', '')}</span>
             <span className="font-bold">${prices[selectedPlan].original}</span>
           </div>
           <div className="flex justify-between text-sm mb-4">
             <span className="text-gray-900">42% de descuento en oferta de lanzamiento</span>
             <span className="font-bold text-[#00C853]">-${(prices[selectedPlan].original - prices[selectedPlan].current).toFixed(2)}</span>
           </div>
           <div className="flex justify-between text-lg font-bold border-t border-gray-100 pt-4 text-gray-900">
             <span>Total</span>
             <span>${prices[selectedPlan].current}</span>
           </div>
        </div>

        {/* Removed subscription auto-renewal text */}

        {/* --- GUARANTEE (7 Days) --- */}
        <div className="w-full bg-gray-100 rounded-xl p-6 flex gap-4 items-start mb-12">
           <div className="flex-1">
             <h4 className="font-bold text-sm mb-2 text-gray-900">Garantía de devolución del 100% del dinero</h4>
             <p className="text-xs text-gray-500 leading-relaxed mb-4">
               Confiamos en la calidad de nuestro servicio y en los resultados que ofrece. Si no obtiene resultados visibles en los primeros 7 días, puede solicitar un reembolso.
             </p>
             <p className="text-xs text-gray-500">
               ¡Permítanos ayudarle a alcanzar sus objetivos de salud hoy!
             </p>
           </div>
           <div className="w-16 h-16 rounded-full border-2 border-[#B71C1C] flex items-center justify-center text-[#B71C1C] font-bold text-[8px] text-center p-1 leading-tight transform rotate-[-15deg]">
             100% MONEY BACK GUARANTEE
           </div>
        </div>

        {/* --- NO MORE SECTIONS AFTER GUARANTEE --- */}

      </div>
    </div>
  );
};
