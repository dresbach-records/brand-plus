import React, { useState } from 'react';
import { PageRoute } from '../../types';
import {
  Megaphone,
  Users,
  TrendingUp,
  Percent,
  MessageCircle,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Send,
  Zap,
} from 'lucide-react';

interface MarketingShowcaseSectionProps {
  navigate: (route: PageRoute) => void;
}

export const MarketingShowcaseSection: React.FC<MarketingShowcaseSectionProps> = ({
  navigate,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            Automação de Vendas & CRM
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight">
            Transforme oportunidades em vendas.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Conecte seus produtos aos clientes certos no momento exato com segmentações automáticas de WhatsApp e E-mail baseadas no histórico real de compras.
          </p>
        </div>

        {/* CAMPAIGN VISUAL BUILDER SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: INTERACTIVE CAMPAIGN CARD EXAMPLE */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
              {/* TOP HEADER */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-orange-500 text-white">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                      Campanha Automatizada • Exemplo Demonstrativo
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      Liquidação de Produtos Parados (Desova com Lucro)
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  Ativa & Rodando
                </span>
              </div>

              {/* CAMPAIGN METRICS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-1">
                  <div className="text-[11px] text-slate-400 font-medium">Público Segmentado</div>
                  <div className="text-base font-bold text-white">Clientes de 90 dias</div>
                  <div className="text-[10px] text-orange-400">Compraram no último trimestre</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-1">
                  <div className="text-[11px] text-slate-400 font-medium">Canal de Envio</div>
                  <div className="text-base font-bold text-white flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp VIP</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Taxa de abertura: 94%</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-emerald-500/40 space-y-1">
                  <div className="text-[11px] text-slate-400 font-medium">Resultado Estimado</div>
                  <div className="text-lg font-extrabold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>+18% Conversão</span>
                  </div>
                  <div className="text-[10px] text-slate-400">*Exemplo visual de simulação</div>
                </div>
              </div>

              {/* VISUAL MESSAGE PREVIEW */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Prévia da Mensagem Personalizada:</span>
                </div>
                <div className="bg-emerald-950/40 border border-emerald-800/60 p-3.5 rounded-xl text-xs text-slate-200 leading-relaxed font-sans">
                  &quot;Olá <strong>[Nome do Cliente]</strong>! Como você adorou sua última compra de <strong>[Categoria Comprada]</strong> há 90 dias, separamos 3 peças exclusivas com <strong>15% OFF VIP</strong> e frete grátis para hoje: <em>[Link com Carrinho Pré-Montado]</em>&quot;
                </div>
              </div>

              {/* FOOTER OF CARD */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Disparo 100% automático via API Oficial</span>
                <span className="text-orange-400 font-medium">Gatilho: Inatividade &gt; 90 dias</span>
              </div>
            </div>
          </div>

          {/* RIGHT: 4 MARKETING CAPABILITIES */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Users className="w-4 h-4 text-orange-500" />
                <span>Segmentação RFM Inteligente</span>
              </div>
              <p className="text-xs text-slate-600">
                A BRAND+ categoriza automaticamente seus clientes em Clientes VIP, Frequentes, Novos e Em Risco de Inatividade.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Recuperação de Carrinho Abandonado</span>
              </div>
              <p className="text-xs text-slate-600">
                Envio automático de lembrete com link direto para o checkout com 1 clique de pagamento.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Percent className="w-4 h-4 text-orange-500" />
                <span>Cupons Estratégicos com Margem Travada</span>
              </div>
              <p className="text-xs text-slate-600">
                Crie cupons que nunca comprometem a margem mínima definida pela sua equipe financeira.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>Analytics de Retorno sobre Investimento</span>
              </div>
              <p className="text-xs text-slate-600">
                Saiba exatamente quantos reais em vendas cada mensagem disparada gerou para a sua empresa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
