import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PLAN_TIERS, FAQ_ITEMS } from '../data/mockData';
import { CheckCircle2, X, ArrowRight, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface PlansPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const PlansPage: React.FC<PlansPageProps> = ({
  navigate,
  openDemoModal,
}) => {
  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Planos & Preços' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            Investimento Transparente
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Planos sob medida para cada etapa de crescimento.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Sem fidelidade abusiva, sem comissões ocultas sobre suas vendas e com suporte humanizado em todos os planos.
          </p>
        </div>

        {/* 4 PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    Recursos Inclusos:
                  </div>
                  <ul className="space-y-2 text-xs">
                    {tier.primaryFeatures.map((feat, idx) => (
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
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    tier.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DETAILED COMPARATIVE MATRIX */}
        <div className="space-y-6 pt-8 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Comparativo Detalhado de Recursos
            </h2>
            <p className="text-xs text-slate-500">
              Veja lado a lado as capacidades de cada plano da BRAND+
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="p-4">Recurso / Módulo</th>
                  <th className="p-4 text-center">START</th>
                  <th className="p-4 text-center bg-orange-600">GROWTH (Popular)</th>
                  <th className="p-4 text-center">PRO</th>
                  <th className="p-4 text-center">ENTERPRISE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Loja Virtual com Domínio Próprio</td>
                  <td className="p-4 text-center">Incluso</td>
                  <td className="p-4 text-center font-bold text-orange-600 bg-orange-50/50">Incluso</td>
                  <td className="p-4 text-center">Incluso</td>
                  <td className="p-4 text-center">Múltiplas Lojas</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Limite de Produtos Cadastrados</td>
                  <td className="p-4 text-center">Até 100 SKUs</td>
                  <td className="p-4 text-center font-bold text-orange-600 bg-orange-50/50">Até 1.000 SKUs</td>
                  <td className="p-4 text-center">Ilimitado</td>
                  <td className="p-4 text-center">Ilimitado</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Estoque Físico & Digital Unificado</td>
                  <td className="p-4 text-center">Básico</td>
                  <td className="p-4 text-center font-bold text-orange-600 bg-orange-50/50">Completo</td>
                  <td className="p-4 text-center">Multi-filial</td>
                  <td className="p-4 text-center">Multi-filial + WMS</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Copiloto BRAND+ Intelligence (IA)</td>
                  <td className="p-4 text-center">Alertas Essenciais</td>
                  <td className="p-4 text-center font-bold text-orange-600 bg-orange-50/50">IA Completa</td>
                  <td className="p-4 text-center">IA Preditiva Avançada</td>
                  <td className="p-4 text-center">Modelos Customizados</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Acesso à BRAND+ Academy</td>
                  <td className="p-4 text-center">Trilhas Básicas</td>
                  <td className="p-4 text-center font-bold text-orange-600 bg-orange-50/50">Acesso Total</td>
                  <td className="p-4 text-center">Acesso Total + Mentoria</td>
                  <td className="p-4 text-center">Treinamento In-company</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Usuários no Painel</td>
                  <td className="p-4 text-center">1 Usuário</td>
                  <td className="p-4 text-center font-bold text-orange-600 bg-orange-50/50">Até 3 Usuários</td>
                  <td className="p-4 text-center">Até 10 Usuários</td>
                  <td className="p-4 text-center">Ilimitados</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Suporte Técnico</td>
                  <td className="p-4 text-center">E-mail & Chat</td>
                  <td className="p-4 text-center font-bold text-orange-600 bg-orange-50/50">WhatsApp Prioritário</td>
                  <td className="p-4 text-center">WhatsApp + Especialista</td>
                  <td className="p-4 text-center">Gerente Dedicado 24/7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FREQUENT QUESTIONS ACCORDION / LIST */}
        <div className="space-y-6 pt-8 border-t border-slate-100 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Dúvidas Frequentes sobre os Planos
            </h2>
            <p className="text-xs text-slate-500">
              Tudo o que você precisa saber antes de assinar.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.slice(0, 4).map((faq) => (
              <div key={faq.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm">{faq.question}</div>
                <div className="text-xs text-slate-600 leading-relaxed">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ENTERPRISE CONTACT PROMPT */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">Precisa de um plano para rede ou franquia?</h3>
            <p className="text-xs text-slate-300">Nossa equipe executiva monta uma proposta customizada para sua operação.</p>
          </div>
          <button
            onClick={() => navigate('/contato')}
            className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all whitespace-nowrap shadow-md"
          >
            Falar com Vendas Enterprise
          </button>
        </div>
      </div>
    </div>
  );
};
