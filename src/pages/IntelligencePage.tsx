import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { IntelligenceShowcaseSection } from '../components/home/IntelligenceShowcaseSection';
import {
  Sparkles,
  BrainCircuit,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PieChart,
} from 'lucide-react';

interface IntelligencePageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const IntelligencePage: React.FC<IntelligencePageProps> = ({
  navigate,
  openDemoModal,
}) => {
  return (
    <div className="py-10 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Produtos', route: '/produto' },
            { label: 'BRAND+ Intelligence' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inteligência Artificial & Copiloto Empresarial</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              A inteligência que transforma dados brutos em lucro real.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              O BRAND+ Intelligence não gera gráficos vazios ou dashboards confusos. Nosso motor de IA analisa diariamente suas vendas, custos, fornecedores e estoques para dizer com precisão cirúrgica o que fazer para aumentar o lucro da sua empresa.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate('/criar-conta')}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <span>Ativar Inteligência no Meu Varejo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={openDemoModal}
                className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 transition-colors"
              >
                Agendar Demonstração da IA
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-orange-500/40 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Copiloto Ativo 24 Horas</div>
                  <div className="text-[11px] text-slate-400">Monitorando margens e estoque</div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-orange-400 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Alerta de Margem Baixa</span>
                  </div>
                  <div className="text-slate-300">
                    3 produtos estão com margem de contribuição 4% abaixo do custo operacional.
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Oportunidade de Recompra</span>
                  </div>
                  <div className="text-slate-300">
                    84 clientes de Moda Feminina completam 60 dias sem pedidos esta semana.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EMBEDDED INTERACTIVE SHOWCASE */}
        <div className="pt-8">
          <IntelligenceShowcaseSection navigate={navigate} />
        </div>

        {/* 4 CORE ADVANTAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {[
            {
              title: 'Diagnóstico em Linguagem Natural',
              desc: 'Respostas em bom português brasileiro, sem termos técnicos indecifráveis ou jargões financeiros confusos.',
            },
            {
              title: 'Detecção de Dinheiro Parado',
              desc: 'Identificação instantânea de mercadorias encalhadas com cálculo do custo de oportunidade do capital parado.',
            },
            {
              title: 'Previsão de Demanda & Reposição',
              desc: 'A IA calcula quantos dias faltam para o esgotamento dos seus produtos mais vendidos com base no ritmo recente de pedidos.',
            },
            {
              title: 'Sugestão de Preços & Markup',
              desc: 'Recomendações automáticas de reajuste de preço para proteger a lucratividade mesmo com flutuações de custos de fornecedor.',
            },
          ].map((adv, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-orange-500/50 transition-colors"
            >
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                Recurso 0{idx + 1}
              </div>
              <h3 className="font-bold text-white text-base">{adv.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
