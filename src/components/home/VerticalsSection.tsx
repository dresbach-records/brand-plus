import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { VERTICALS_DATA } from '../../data/mockData';
import {
  Shirt,
  Footprints,
  Sparkles,
  Home,
  Smartphone,
  Wrench,
  Trophy,
  Gift,
  Store,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface VerticalsSectionProps {
  navigate: (route: PageRoute) => void;
}

export const VerticalsSection: React.FC<VerticalsSectionProps> = ({ navigate }) => {
  const [selectedVertical, setSelectedVertical] = useState<string>('moda');

  const iconMap: Record<string, React.ReactNode> = {
    Shirt: <Shirt className="w-5 h-5" />,
    Footprints: <Footprints className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    Home: <Home className="w-5 h-5" />,
    Smartphone: <Smartphone className="w-5 h-5" />,
    Wrench: <Wrench className="w-5 h-5" />,
    Trophy: <Trophy className="w-5 h-5" />,
    Gift: <Gift className="w-5 h-5" />,
    Store: <Store className="w-5 h-5" />,
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            Segmentos Atendidos
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight">
            Feita para quem quer crescer.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A BRAND+ não é engessada. Desenvolvemos fluxos e atributos customizados para os principais segmentos do comércio físico e digital brasileiro.
          </p>
        </div>

        {/* 9 VERTICALS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERTICALS_DATA.map((vert) => (
            <div
              key={vert.id}
              onClick={() => setSelectedVertical(vert.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                selectedVertical === vert.id
                  ? 'bg-white border-orange-500 shadow-lg ring-2 ring-orange-500/20'
                  : 'bg-white/80 border-slate-200/90 hover:bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      selectedVertical === vert.id
                        ? 'bg-orange-600 text-white'
                        : 'bg-slate-100 text-slate-800 group-hover:bg-orange-100 group-hover:text-orange-600'
                    }`}
                  >
                    {iconMap[vert.icon]}
                  </div>

                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Varejo Especializado
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                  {vert.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {vert.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{vert.metric}</span>
              </div>
            </div>
          ))}
        </div>

        {/* VERTICAL CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/criar-conta')}
            className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Ver a BRAND+ no Meu Segmento</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
