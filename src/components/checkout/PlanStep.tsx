import React from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { PLAN_CATALOG } from '../../data/planCatalog';
import { PlanTierId, PageRoute } from '../../types';
import { Check, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface PlanStepProps {
  navigate: (route: PageRoute) => void;
}

export const PlanStep: React.FC<PlanStepProps> = ({ navigate }) => {
  const { state, setPlan, setBillingCycle } = useCheckout();
  const availablePlans: PlanTierId[] = ['start', 'growth', 'pro'];

  const handleSelectAndProceed = (pId: PlanTierId) => {
    setPlan(pId);
    navigate('/cliente/checkout/pagamento');
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
          Etapa 03 de 05
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Confirme o Plano da sua Empresa
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Altere ou configure a periodicidade da sua assinatura. Você pode fazer upgrade ou downgrade a qualquer momento no Portal.
        </p>
      </div>

      {/* BILLING CYCLE SWITCHER */}
      <div className="flex justify-center">
        <div className="inline-flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              state.billingCycle === 'annual'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Faturamento Anual</span>
            <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-extrabold">
              Economize 20%
            </span>
          </button>

          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              state.billingCycle === 'monthly'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Faturamento Mensal
          </button>
        </div>
      </div>

      {/* PLAN CARDS */}
      <div className="grid grid-cols-1 gap-4">
        {availablePlans.map((pId) => {
          const plan = PLAN_CATALOG[pId];
          const isSelected = state.planId === pId;
          const isAnnual = state.billingCycle === 'annual';
          const price = isAnnual ? plan.priceAnnualMonthlyEquivalent : plan.priceMonthly;

          return (
            <div
              key={pId}
              onClick={() => setPlan(pId)}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-orange-500 bg-orange-50/20 shadow-md ring-2 ring-orange-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 right-6 bg-orange-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Recomendado</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-orange-600 bg-orange-600' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 ml-8">{plan.tagline}</p>
                </div>

                <div className="text-left sm:text-right ml-8 sm:ml-0">
                  <div className="flex items-baseline sm:justify-end gap-1">
                    <span className="text-xs font-semibold text-slate-500">R$</span>
                    <span className="text-2xl font-black text-slate-900">{price}</span>
                    <span className="text-xs text-slate-500">/mês</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {isAnnual
                      ? `Faturado anualmente: R$ ${plan.annualBilledTotal.toFixed(2)}`
                      : 'Cobrança mensal sem fidelidade'}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span className="truncate">{plan.limits.products}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span className="truncate">{plan.limits.users}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span className="truncate">{plan.limits.stores}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span className="truncate">Academy inclusa</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BUTTONS */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => navigate('/cliente/checkout/empresa')}
          className="py-3.5 px-6 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/cliente/checkout/pagamento')}
          className="flex-1 py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Avançar para Pagamento</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
