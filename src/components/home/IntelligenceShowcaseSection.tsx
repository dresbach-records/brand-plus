import React, { useState } from 'react';
import { PageRoute } from '../../types';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Send,
  Zap,
  HelpCircle,
  Bot,
  BrainCircuit,
  PieChart,
  Lightbulb,
} from 'lucide-react';

interface IntelligenceShowcaseSectionProps {
  navigate: (route: PageRoute) => void;
}

export const IntelligenceShowcaseSection: React.FC<IntelligenceShowcaseSectionProps> = ({
  navigate,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string>(
    'O que está prejudicando minha margem?'
  );

  const aiResponses: Record<
    string,
    {
      summary: string;
      metrics: { label: string; val: string; change: string; positive: boolean }[];
      culprits: { name: string; impact: string; action: string }[];
      recommendation: string;
    }
  > = {
    'O que está prejudicando minha margem?': {
      summary:
        'Seu faturamento cresceu 12%, mas sua margem caiu 3%. Identificamos que o aumento no frete rodoviário e a promoção no Combo Verão reduziram o lucro líquido em 3 produtos-chave.',
      metrics: [
        { label: 'Faturamento Geral', val: 'R$ 148.620', change: '+12%', positive: true },
        { label: 'Margem Líquida', val: '24.1%', change: '-3%', positive: false },
      ],
      culprits: [
        { name: 'Produto A: Vestido Midi Estampado', impact: '-R$ 1.420 no lucro', action: 'Markup abaixo do ideal (1.6x)' },
        { name: 'Produto B: Calça Jeans Tradicional', impact: '-R$ 980 no lucro', action: 'Fornecedor reajustou custo em 8%' },
        { name: 'Produto C: Sandália Rasteira', impact: '-R$ 640 no lucro', action: 'Frete grátis sem valor mínimo de pedido' },
      ],
      recommendation:
        'Revisar preço de venda do Produto A (+R$ 15), repassar reajuste do Produto B e instituir frete grátis apenas a partir de R$ 250.',
    },
    'Como está minha empresa?': {
      summary:
        'Sua operação está com saúde financeira excelente (Score 88/100). As vendas digitais superaram a meta mensal em 14% e a taxa de recompra de clientes fidelizados aumentou 22%.',
      metrics: [
        { label: 'Crescimento Mensal', val: '+18.4%', change: 'Acima da meta', positive: true },
        { label: 'Clientes Ativos', val: '1.420', change: '+142 novos', positive: true },
      ],
      culprits: [
        { name: 'Ponto Forte: Canal Digital', impact: '+34% em pedidos', action: 'Checkout PIX com 82% de preferência' },
        { name: 'Atenção: Balcão Físico', impact: 'Fluxo estável', action: 'Ativar campanhas de retirada na loja (Click & Collect)' },
      ],
      recommendation:
        'Mantenha o investimento nas campanhas digitais e utilize a base de clientes do WhatsApp para convidar para o balcão físico.',
    },
    'Quais produtos devo promover?': {
      summary:
        'Identificamos 4 SKUs com alta margem de contribuição (acima de 58%) e alto estoque disponível, ideais para campanhas de destaque com retorno financeiro imediato.',
      metrics: [
        { label: 'Margem Média dos SKUs', val: '59.2%', change: '+17.4% vs média', positive: true },
        { label: 'Estoque Disponível', val: '148 peças', change: 'Pronta entrega', positive: true },
      ],
      culprits: [
        { name: 'Conjunto Alfaiataria Chic', impact: 'Margem de 64%', action: 'Criar banner na vitrine principal' },
        { name: 'Bolsa Couro Tiracolo', impact: 'Margem de 61%', action: 'Oferta relâmpago de 48h com cupom VIP' },
        { name: 'Blazer Linho Oversized', impact: 'Margem de 58%', action: 'Enviar recomendação para compradoras antigas' },
      ],
      recommendation:
        'Dispare uma campanha de WhatsApp automatizada para clientes com ticket acima de R$ 300 nos últimos 6 meses.',
    },
    'Onde estou perdendo dinheiro?': {
      summary:
        'Detectamos 2 focos de vazamento de capital: R$ 4.200 em produtos com mais de 120 dias sem giro (estoque estagnado) e abandono de carrinho na etapa de frete para o Nordeste.',
      metrics: [
        { label: 'Capital Imobilizado', val: 'R$ 4.200', change: '120 dias sem giro', positive: false },
        { label: 'Perda no Frete Regional', val: '-18% conversão', change: 'Nordeste', positive: false },
      ],
      culprits: [
        { name: 'Estoque Parado (Inverno Passado)', impact: 'R$ 4.200 retidos', action: 'Liquidação inteligente na Academy' },
        { name: 'Frete Fixo Descalibrado', impact: '32 desistências/mês', action: 'Integrar transportadora regional econômica' },
      ],
      recommendation:
        'Ativar o módulo de liquidação de produtos parados na BRAND+ para liberar R$ 4.200 em fluxo de caixa imediato.',
    },
  };

  const currentData = aiResponses[selectedQuestion] || aiResponses['O que está prejudicando minha margem?'];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* GLOWS */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            BRAND+ Intelligence & IA • Crescer
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white tracking-tight">
            Não mostramos apenas números.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              Explicamos o que eles significam.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            O primeiro copiloto de inteligência artificial desenhado exclusivamente para a realidade e lucratividade do varejista brasileiro.
          </p>
        </div>

        {/* INTERACTIVE COPILOT INTERFACE */}
        <div className="max-w-5xl mx-auto bg-slate-900/90 rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-10 backdrop-blur-xl space-y-8">
          {/* QUESTION PROMPTS BAR */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Perguntas Rápidas ao Copiloto (Clique para simular):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                'O que está prejudicando minha margem?',
                'Como está minha empresa?',
                'Quais produtos devo promover?',
                'Onde estou perdendo dinheiro?',
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuestion(q)}
                  className={`p-3 rounded-2xl text-xs font-semibold text-left transition-all border ${
                    selectedQuestion === q
                      ? 'bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/20 scale-[1.02]'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className={`w-3.5 h-3.5 shrink-0 ${selectedQuestion === q ? 'text-white' : 'text-orange-400'}`} />
                    <span className="line-clamp-2">{q}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI COPILOT ANSWER CARD */}
          <div className="bg-slate-950/80 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            {/* COPILOT HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <span>BRAND+ Intelligence Copilot</span>
                    <span className="text-[10px] font-bold uppercase bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/30">
                      IA Preditiva
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Pergunta ativa: &ldquo;{selectedQuestion}&rdquo;
                  </div>
                </div>
              </div>

              {/* LIVE METRIC CHIPS */}
              <div className="flex items-center gap-3">
                {currentData.metrics.map((m, idx) => (
                  <div key={idx} className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                    <div className="text-[10px] text-slate-400">{m.label}</div>
                    <div className="font-bold text-white flex items-center gap-1">
                      <span>{m.val}</span>
                      <span className={`text-[10px] font-bold ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                        ({m.change})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI NATURAL LANGUAGE EXPLANATION */}
            <div className="space-y-3">
              <div className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border-l-4 border-orange-500">
                {currentData.summary}
              </div>
            </div>

            {/* CULPRITS / RESPONSIBLE FACTORS LIST */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Detalhamento dos Fatores Identificados:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentData.culprits.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="font-bold text-slate-200 text-xs truncate">{item.name}</div>
                    <div className="text-xs font-semibold text-orange-400">{item.impact}</div>
                    <div className="text-[11px] text-slate-400">{item.action}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI ACTION RECOMMENDATION BOX */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-950/60 via-slate-900 to-amber-950/60 border border-orange-500/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>Recomendação Prática da IA:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                {currentData.recommendation}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/produto/inteligencia')}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Aplicar Ajuste Sugerido</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-400">Ação simulada com segurança</span>
              </div>
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/produto/inteligencia')}
              className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg inline-flex items-center gap-2"
            >
              <span>Conhecer a BRAND+ Intelligence</span>
              <ArrowRight className="w-4 h-4 text-orange-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
