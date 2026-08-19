import React from 'react';
import { PageRoute } from '../../types';
import {
  ShoppingBag,
  Layers,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { PILLARS_DATA } from '../../data/mockData';

interface ValuePillarsSectionProps {
  navigate: (route: PageRoute) => void;
}

export const ValuePillarsSection: React.FC<ValuePillarsSectionProps> = ({ navigate }) => {
  const iconMap: Record<string, React.ReactNode> = {
    ShoppingBag: <ShoppingBag className="w-6 h-6" />,
    Layers: <Layers className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    GraduationCap: <GraduationCap className="w-6 h-6" />,
  };

  return (
    <section className="py-20 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
            Proposta de Valor Completa
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tudo o que seu varejo precisa para crescer no digital.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Muito mais que um sistema isolado. Uma solução integrada dividida em 4 pilares fundamentais para levar sua empresa de ponta a ponta.
          </p>
        </div>

        {/* 4 VALUE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS_DATA.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group card-hover-effect"
            >
              <div className="space-y-4">
                {/* ICON & ACTION BADGE */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      pillar.id === 'commerce' || pillar.id === 'inteligencia'
                        ? 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white'
                        : 'bg-slate-100 text-slate-800 group-hover:bg-slate-900 group-hover:text-white'
                    }`}
                  >
                    {iconMap[pillar.icon]}
                  </div>

                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      pillar.id === 'inteligencia'
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {pillar.action}
                  </span>
                </div>

                {/* PILLAR TITLE & TAGLINE */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-semibold text-orange-600 mt-1">
                    &ldquo;{pillar.tagline}&rdquo;
                  </p>
                </div>

                {/* DESCRIPTION */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>

                {/* BULLET ITEMS */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Recursos Inclusos:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {pillar.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ACTION LINK */}
              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() => navigate(pillar.route)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 group-hover:bg-orange-50 text-slate-800 group-hover:text-orange-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explorar {pillar.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
