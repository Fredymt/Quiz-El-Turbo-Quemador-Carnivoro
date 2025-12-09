
import React from 'react';
import { Button } from '../components/Button';
import { Star } from 'lucide-react';
import { FinalProjection } from '../types';

interface ResultsProjectionScreenProps {
  projection: FinalProjection;
  onContinue: () => void;
}

export const ResultsProjectionScreen: React.FC<ResultsProjectionScreenProps> = ({ projection, onContinue }) => {
  const { points } = projection;

  // Function to create a smooth Bezier curve from points
  const getSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i < points.length - 2 ? points[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  };

  const pathD = getSmoothPath(points);
  const lastPoint = points[points.length - 1];

  // Colors based on image reference (Reddish start -> Orange -> Greenish end)
  const getPointColor = (index: number) => {
    const total = points.length;
    if (index === 0) return '#E84A74'; // Pink/Red start
    if (index === total - 1) return '#00C853'; // Green goal
    if (index < total / 2) return '#FFA726'; // Orange
    return '#FFCA28'; // Yellow
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center animate-fade-in pb-10">
      
      {/* 2. Headline / Copy Principal */}
      <div className="text-center mb-10 px-4">
        <span className="block text-brand-black text-lg md:text-xl font-medium mb-1">
          {projection.headlineLine1}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black leading-tight">
          {projection.headlineLine2} <br/>
          <span className="text-[#00C853] text-2xl md:text-4xl font-extrabold block mt-2">
            {projection.headlineLine3}
          </span>
        </h2>
      </div>

      {/* 3. Gráfica de Progreso */}
      <div className="w-full max-w-2xl px-2 md:px-0 mb-12 relative">
        
        {/* Graph Container */}
        <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-white">
          <svg className="w-full h-full overflow-visible" viewBox="-5 -15 110 130" preserveAspectRatio="none">
            
            {/* Smooth Curve Shadow/Bg */}
            <path
              d={pathD}
              fill="none"
              stroke="#E0E0E0"
              strokeWidth="4"
              strokeLinecap="round"
            />
             {/* Gradient Overlay Line */}
             <defs>
              <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E84A74" />
                <stop offset="50%" stopColor="#FFA726" />
                <stop offset="100%" stopColor="#00C853" />
              </linearGradient>
            </defs>
            <path
              d={pathD}
              fill="none"
              stroke="url(#gradientLine)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Points */}
            {points.map((point, index) => {
              const isLast = index === points.length - 1;
              return (
                <g key={index}>
                  {/* Point */}
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r={isLast ? 6 : 4} 
                    fill={getPointColor(index)} 
                    stroke="white" 
                    strokeWidth="2" 
                  />
                  
                  {/* Weight Label above point */}
                  {!isLast && (
                    <text 
                      x={point.x} 
                      y={point.y - 12} 
                      fontSize="5" 
                      textAnchor="middle" 
                      fill={getPointColor(index)} 
                      fontWeight="bold"
                    >
                      {point.labelWeight}
                    </text>
                  )}

                  {/* X-Axis Label */}
                  <text 
                    x={point.x} 
                    y="110" 
                    fontSize="4" 
                    textAnchor="middle" 
                    fill="#9E9E9E" 
                    fontWeight="500"
                    style={{ textTransform: 'capitalize' }}
                  >
                     {point.labelX}
                  </text>
                  
                  {/* Vertical Dotted Line for X-axis reference */}
                   <line 
                    x1={point.x} y1={point.y + 5} 
                    x2={point.x} y2="105" 
                    stroke="#F5F5F5" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 2"
                  />
                </g>
              );
            })}

            {/* FORECAST BADGE on Last Point */}
            <foreignObject x={lastPoint.x - 14} y={lastPoint.y - 30} width="28" height="22" className="overflow-visible">
              <div className="flex flex-col items-center">
                 <div className="bg-[#00C853] text-white text-[5px] font-bold px-2 py-1.5 rounded shadow-md text-center leading-tight">
                    {/* El labelWeight del último punto ya trae "Goal X kg" */}
                    {lastPoint.labelWeight.replace(' ', '\n')}
                 </div>
                 {/* Triangle Arrow */}
                 <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-[#00C853] mt-[-1px]"></div>
              </div>
            </foreignObject>

          </svg>
        </div>
      </div>

      {/* 4. Testimonio */}
      <h3 className="text-xl font-bold text-brand-black mb-6">
        Lo que dice la gente
      </h3>

      <div className="w-full max-w-lg bg-[#F9FAFB] rounded-2xl p-6 md:p-8 mb-10 flex flex-col gap-3 text-left shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-bold text-brand-black">
            Alejandro, <span className="text-gray-500 font-normal">México</span>
          </h3>
        </div>
        <div className="flex gap-1 text-[#FFC107] mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} fill="#FFC107" strokeWidth={0} size={16} />
          ))}
        </div>
        <p className="text-sm md:text-base text-brand-black leading-relaxed">
          "Llevo un año intentando bajar de peso. He estado fluctuando desde que descubrí este servicio, ¡y he perdido 5 kilos en solo tres semanas! ¡Voy por buen camino, muchísimas gracias!"
        </p>
      </div>

      {/* 5. Botón Principal */}
      <div className="w-full flex justify-center mb-6">
        <Button 
          onClick={onContinue}
          className="w-full md:w-auto px-20 py-4 text-xl shadow-lg border-none rounded-full"
          style={{ backgroundColor: '#F05252' }} 
        >
          Continuar
        </Button>
      </div>

      {/* 6. Texto Legal */}
      <div className="w-full max-w-lg text-center px-4">
        <p className="text-xs text-gray-400 leading-relaxed">
          La predicción anterior se basa en los resultados de miembros como usted y no es una garantía.
        </p>
      </div>

    </div>
  );
};
