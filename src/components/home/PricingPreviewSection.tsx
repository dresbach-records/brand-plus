import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { PLAN_TIERS } from '../../data/mockData';
import { CheckCircle2, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface PricingPreviewSectionProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const PricingPreviewSection: React.FC<PricingPreviewSectionProps> = ({
  navigate,
  openDemoModal,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            Planos & Investimento
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight">
            Planos transparentes para cada fase do seu negócio.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Sem pegadinhas ou custos ocultos. Escolha a solução que melhor se adapta à maturidade digital da sua empresa.
          </p>
        </div>

        {/* 4 PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PLAN_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? 'bg-slate-900 text-white shadow-2xl border-2 border-orange-500 ring-4 ring-orange-500/20'
                  : 'bg-white text-slate-900 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                  Mais Escolhido
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">{tier.name}</h3>
                  <p className={`text-xs font-semibold mt-0.5 ${tier.popular ? 'text-orange-400' : 'text-orange-600'}`}>
                    {tier.tagline}
                  </p>
                </div>

                <div className="pt-2 pb-2 border-y border-slate-100 dark:border-slate-800">
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {tier.monthlyEstimate}
                  </div>
                  <div className={`text-[11px] mt-1 ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                    Ideal para: {tier.idealFor}
                  </div>
                </div>

                <p className={`text-xs leading-relaxed ${tier.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                  {tier.description}
                </p>

                {/* FEATURES LIST */}
                <div className="space-y-2 pt-2">
                  <div className={`text-[11px] font-bold uppercase tracking-wider ${tier.popular ? 'text-slate-400' : 'text-slate-400'}`}>
                    Principais Recursos:
                  </div>
                  <ul className="space-y-2 text-xs">
                    {tier.primaryFeatures.slice(0, 5).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${tier.popular ? 'text-orange-400' : 'text-orange-600'}`} />
                        <span className={`leading-snug ${tier.popular ? 'text-slate-200' : 'text-slate-700'}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    if (tier.id === 'enterprise') {
                      navigate('/contato');
                    } else {
                      navigate('/criar-conta');
                    }
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    tier.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* COMPARATIVE MATRIX LINK */}
        <div className="text-center">
          <button
            onClick={() => navigate('/planos')}
            className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors inline-flex items-center gap-2"
          >
            <span>Ver Tabela Comparativa Completa de Recursos</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
          </button>
        </div>
      </div>
    </section>
  );
};
