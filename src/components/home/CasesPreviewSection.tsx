import React from 'react';
import { PageRoute } from '../../types';
import { DEMONSTRATIVE_CASES } from '../../data/mockData';
import { TrendingUp, TrendingDown, Quote, ArrowRight, CheckCircle2, Store } from 'lucide-react';

interface CasesPreviewSectionProps {
  navigate: (route: PageRoute) => void;
}

export const CasesPreviewSection: React.FC<CasesPreviewSectionProps> = ({ navigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            Histórias de Transformação
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight">
            Resultados que inspiram o comércio brasileiro.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Veja como empresas tradicionais de diferentes segmentos estão usando a BRAND+ para transformar sua realidade operacional e financeira.
          </p>
        </div>

        {/* 3 DEMONSTRATIVE CASES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {DEMONSTRATIVE_CASES.map((caseItem) => (
            <div
              key={caseItem.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-orange-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* CASE IDENTIFIER BADGE */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full border border-orange-200">
                    Case Demonstrativo
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {caseItem.cityState}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-orange-600 transition-colors">
                    {caseItem.companyName}
                  </h3>
                  <div className="text-xs font-semibold text-orange-600">
                    {caseItem.segment}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  &ldquo;{caseItem.headline}&rdquo;
                </p>

                {/* METRICS ROW */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 bg-slate-50/50 p-2 rounded-xl text-center">
                  {caseItem.metrics.map((m, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="text-sm font-extrabold text-slate-900">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-500 line-clamp-1 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* QUOTE */}
                <div className="space-y-2 text-xs text-slate-600 italic bg-slate-50 p-3.5 rounded-xl border-l-2 border-orange-500">
                  <p>&ldquo;{caseItem.quote.text}&rdquo;</p>
                  <div className="text-[11px] font-bold text-slate-800 not-italic">
                    — {caseItem.quote.author}, {caseItem.quote.role}
                  </div>
                </div>
              </div>

              {/* TAGS */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {caseItem.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM DISCLAIMER & CTA */}
        <div className="text-center space-y-3">
          <div className="text-xs text-slate-400 max-w-xl mx-auto">
            *Os dados acima representam simulações e métricas demonstrativas inspiradas em transformações reais do varejo digital brasileiro.
          </div>
          <button
            onClick={() => navigate('/cases')}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Ver Todos os Cases e Histórias</span>
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
