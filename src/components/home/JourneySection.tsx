import React from 'react';
import { PageRoute } from '../../types';
import { JOURNEY_STEPS } from '../../data/mockData';
import { ArrowRight, CheckCircle2, Sparkles, Zap } from 'lucide-react';

interface JourneySectionProps {
  navigate: (route: PageRoute) => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ navigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            Jornada do Varejista
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight">
            Comece onde você está. Cresça no seu ritmo.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A transformação do seu varejo não precisa acontecer de forma traumática da noite para o dia. A BRAND+ acompanha cada etapa da sua maturação digital.
          </p>
        </div>

        {/* 5-STEP TIMELINE GRID */}
        <div className="relative">
          {/* CONNECTING LINE (DESKTOP) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-600 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {JOURNEY_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-xl hover:border-orange-500 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* STEP NUMBER & BADGE */}
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center group-hover:bg-orange-600 transition-colors shadow-sm">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                      {step.phase}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM MOTIVATIONAL NOTE */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Não importa se você vende R$ 10 mil ou R$ 1 milhão por mês
          </div>
          <p className="text-xs text-slate-600">
            A BRAND+ adapta suas ferramentas para o tamanho da sua operação atual e desbloqueia novos recursos à medida que seu negócio expande.
          </p>
        </div>
      </div>
    </section>
  );
};
