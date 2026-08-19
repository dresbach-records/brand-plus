import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DEMONSTRATIVE_CASES } from '../data/mockData';
import { TrendingUp, Quote, ArrowRight, CheckCircle2, Store, Filter } from 'lucide-react';

interface CasesPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const CasesPage: React.FC<CasesPageProps> = ({
  navigate,
  openDemoModal,
}) => {
  const [selectedSegment, setSelectedSegment] = useState<string>('todos');

  const segments = [
    { id: 'todos', name: 'Todos os Segmentos' },
    { id: 'moda', name: 'Moda & Calçados' },
    { id: 'casa', name: 'Casa & Decoração' },
    { id: 'especializado', name: 'Varejo Especializado' },
  ];

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Cases & Histórias de Sucesso' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            Transformações Reais do Varejo
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Como lojistas estão escalando com a BRAND+.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Conheça as estratégias e jornadas de lojistas que transformaram operações tradicionais em negócios digitais lucrativos e organizados.
          </p>
        </div>

        {/* TRANSPARENCY BANNER */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 max-w-4xl mx-auto flex items-center gap-3">
          <span className="font-bold uppercase text-[10px] bg-amber-200 px-2 py-0.5 rounded">Nota de Transparência</span>
          <span>Os dados abaixo apresentam simulações e cases demonstrativos representativos de operações que utilizam o ecossistema integrado BRAND+.</span>
        </div>

        {/* CASES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEMONSTRATIVE_CASES.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs hover:shadow-xl hover:border-orange-500/40 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full">
                    Case Demonstrativo
                  </span>
                  <span className="text-xs text-slate-400">{item.cityState}</span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-xl">{item.companyName}</h3>
                  <div className="text-xs font-semibold text-orange-600">{item.segment}</div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  &ldquo;{item.headline}&rdquo;
                </p>

                {/* METRICS */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 bg-slate-50 p-2.5 rounded-xl text-center">
                  {item.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-base font-extrabold text-slate-900">{m.value}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* QUOTE */}
                <div className="text-xs text-slate-600 italic bg-slate-50 p-3.5 rounded-xl border-l-2 border-orange-500">
                  <p>&ldquo;{item.quote.text}&rdquo;</p>
                  <div className="text-[11px] font-bold text-slate-800 not-italic mt-2">
                    — {item.quote.author}, {item.quote.role}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Escreva o próximo case de sucesso com a BRAND+
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Comece hoje mesmo e tenha o suporte de quem entende de varejo físico e digital no Brasil.
          </p>
          <button
            onClick={() => navigate('/criar-conta')}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
          >
            <span>Iniciar Transformação Gratuita</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
