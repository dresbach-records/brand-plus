import React from 'react';
import { PageRoute } from '../../types';
import { COMPANY_VALUES } from '../../data/mockData';
import {
  Sparkles,
  Target,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  BookOpen,
} from 'lucide-react';

interface AboutValuesSectionProps {
  navigate: (route: PageRoute) => void;
}

export const AboutValuesSection: React.FC<AboutValuesSectionProps> = ({ navigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            Propósito & Identidade
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight">
            Nossa missão é impulsionar o varejo brasileiro.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Acreditamos que todo lojista tradicional merece ter acesso à mesma tecnologia, automação e inteligência de dados que os gigantes do mercado utilizam.
          </p>
        </div>

        {/* MISSION & VISION DUAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Nossa Missão</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Transformar negócios tradicionais em operações digitais sustentáveis, eficientes e altamente lucrativas, unindo tecnologia de ponta, simplicidade operacional e capacitação contínua.
            </p>
          </div>

          <div className="bg-slate-50 text-slate-900 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Nossa Visão</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ser a plataforma de referência absoluta em tecnologia, gestão integrada e inteligência empresarial para o varejo de pequeno e médio porte em todo o território nacional.
            </p>
          </div>
        </div>

        {/* 6 PILLARS / VALUES GRID */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">
              Nossos 6 Princípios Inegociáveis
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              O que guia o desenvolvimento de cada linha de código e atendimento na BRAND+
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 hover:bg-white hover:border-orange-500/40 hover:shadow-md transition-all space-y-2"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Princípio 0{idx + 1}
                </div>
                <h4 className="text-lg font-bold text-slate-900">{val.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/sobre')}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Conhecer a História da BRAND+</span>
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
