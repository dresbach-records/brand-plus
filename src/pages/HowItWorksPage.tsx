import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { EcosystemDiagramSection } from '../components/home/EcosystemDiagramSection';
import { JourneySection } from '../components/home/JourneySection';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

interface HowItWorksPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  navigate,
  openDemoModal,
}) => {
  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Como Funciona a BRAND+' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            Arquitetura & Fluxo
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Como a BRAND+ unifica e simplifica sua rotina.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Esqueça integrações complexas que quebram a todo momento. A BRAND+ foi construída do zero sobre uma base única de dados em tempo real.
          </p>
        </div>

        {/* ECOSYSTEM DIAGRAM EMBEDDED */}
        <EcosystemDiagramSection navigate={navigate} />

        {/* 3-STEP ONBOARDING PROCESS */}
        <div className="space-y-10 pt-8 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Da inscrição ao primeiro pedido em 3 passos simples
            </h2>
            <p className="text-sm text-slate-600">
              Sem necessidade de programadores, designers ou consultorias caras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Cadastre sua Loja & Produtos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Insira sua logomarca, cores da sua marca e importe sua lista de produtos via planilha Excel ou cadastro manual rápido pelo celular.
              </p>
              <div className="text-xs font-semibold text-orange-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tempo médio: 10 minutos</span>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Ative Pagamentos & Frete
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Habilite o PIX instantâneo com 1 clique e vincule sua tabela de frete dos Correios e transportadoras com etiquetas automáticas.
              </p>
              <div className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Aprovação bancária imediata</span>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Comece a Vender & Analisar
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Divulgue sua loja no WhatsApp e Instagram. Deixe o motor da BRAND+ cuidar do estoque, emitir as notas e sugerir estratégias de lucro.
              </p>
              <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copiloto de IA ativado</span>
              </div>
            </div>
          </div>
        </div>

        {/* JORNADA SECTION EMBEDDED */}
        <JourneySection navigate={navigate} />

        {/* BOTTOM CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Experimente o ecossistema na prática
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Crie sua conta em menos de 2 minutos e comece a transformar o seu varejo hoje mesmo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/criar-conta')}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span>Começar Grátis Agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={openDemoModal}
              className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
            >
              Falar com um Consultor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
