import React, { useState } from 'react';
import { PageRoute, PlanTierId } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { FAQ_ITEMS } from '../data/mockData';
import { PLAN_CATALOG } from '../data/planCatalog';
import { useCheckout } from '../context/CheckoutContext';
import { CheckCircle2, ArrowRight, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface PlansPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const PlansPage: React.FC<PlansPageProps> = ({
  navigate,
  openDemoModal,
}) => {
  const { setPlan, setBillingCycle, state } = useCheckout();
  const [billingPeriod, setBillingPeriod] = useState<'annual' | 'monthly'>('annual');

  const planIds: PlanTierId[] = ['start', 'growth', 'pro', 'enterprise'];

  const handleSelectPlan = (id: PlanTierId) => {
    if (id === 'enterprise') {
      navigate('/contato');
      return;
    }
    setPlan(id);
    setBillingCycle(billingPeriod);
    navigate('/cliente/checkout/conta');
  };

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
            Sem fidelidade abusiva, sem comissões ocultas sobre suas vendas e com ativação automática instantânea.
          </p>

          {/* BILLING TOGGLE */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setBillingPeriod('annual')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  billingPeriod === 'annual'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Faturamento Anual</span>
                <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-extrabold">
                  -20% OFF
                </span>
              </button>

              <button
                type="button"
                onClick={() => setBillingPeriod('monthly')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Faturamento Mensal
              </button>
            </div>
          </div>
        </div>

        {/* 4 PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {planIds.map((id) => {
            const plan = PLAN_CATALOG[id];
            const isPopular = plan.isPopular;
            const isAnnual = billingPeriod === 'annual';
            const price = isAnnual ? plan.priceAnnualMonthlyEquivalent : plan.priceMonthly;

            return (
              <div
                key={id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  isPopular
                    ? 'bg-slate-900 text-white shadow-2xl border-2 border-orange-500 ring-4 ring-orange-500/20'
                    : 'bg-white text-slate-900 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    Mais Escolhido
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight">{plan.name}</h3>
                    <p className={`text-xs font-semibold mt-0.5 ${isPopular ? 'text-orange-400' : 'text-orange-600'}`}>
                      {plan.tagline}
                    </p>
                  </div>

                  <div className={`pt-2 pb-2 border-y ${isPopular ? 'border-slate-800' : 'border-slate-100'}`}>
                    {id === 'enterprise' ? (
                      <div className="text-2xl font-extrabold tracking-tight py-1">Sob Consulta</div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-xs font-bold ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>R$</span>
                          <span className="text-3xl font-extrabold tracking-tight">{price}</span>
                          <span className={`text-xs ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>/mês</span>
                        </div>
                        <div className={`text-[11px] mt-1 ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                          {isAnnual ? `Total anual: R$ ${plan.annualBilledTotal.toFixed(2)}` : 'Sem fidelidade'}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className={`text-xs leading-relaxed ${isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>

                  {/* FEATURES LIST */}
                  <div className="space-y-2 pt-2">
                    <div className={`text-[11px] font-bold uppercase tracking-wider ${isPopular ? 'text-slate-400' : 'text-slate-400'}`}>
                      Recursos Inclusos:
                    </div>
                    <ul className="space-y-2 text-xs">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isPopular ? 'text-orange-400' : 'text-orange-600'}`} />
                          <span className={`leading-snug ${isPopular ? 'text-slate-200' : 'text-slate-700'}`}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <div className={`pt-6 mt-6 border-t ${isPopular ? 'border-slate-800' : 'border-slate-100'}`}>
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(id)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isPopular
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
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
                  <td className="p-4 text-center">Até 500 SKUs</td>
                  <td className="p-4 text-center font-bold text-orange-600 bg-orange-50/50">Até 3.000 SKUs</td>
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
                  <td className="p-4 text-center">Até 2 Usuários</td>
                  <td className="p-4 text-center font-bold text-orange-600 bg-orange-50/50">Até 5 Usuários</td>
                  <td className="p-4 text-center">Até 15 Usuários</td>
                  <td className="p-4 text-center">Ilimitados</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Suporte Técnico B2B</td>
                  <td className="p-4 text-center">Chamados</td>
                  <td className="p-4 text-center font-bold text-orange-600 bg-orange-50/50">Prioritário (SLA 4h)</td>
                  <td className="p-4 text-center">Gerente de Contas</td>
                  <td className="p-4 text-center">Engenharia Dedicada 24/7</td>
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
            className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all whitespace-nowrap shadow-md cursor-pointer"
          >
            Falar com Vendas Enterprise
          </button>
        </div>
      </div>
    </div>
  );
};

