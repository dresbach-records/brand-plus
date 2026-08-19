import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { PLAN_CATALOG } from '../../data/planCatalog';
import { PlanTierId, BillingCycle, PageRoute } from '../../types';
import { Check, Sparkles, Layers, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CustomerPlanPageProps {
  navigate: (route: PageRoute) => void;
}

export const CustomerPlanPage: React.FC<CustomerPlanPageProps> = ({ navigate }) => {
  const { subscription, changeSubscriptionPlan, isLoading } = useCustomer();
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>(subscription.billingCycle);
  const [successToast, setSuccessToast] = useState('');

  const plans: PlanTierId[] = ['start', 'growth', 'pro', 'enterprise'];

  const handlePlanChange = async (planId: PlanTierId) => {
    if (planId === 'enterprise') {
      navigate('/contato');
      return;
    }
    if (planId === subscription.planId && selectedCycle === subscription.billingCycle) {
      return;
    }

    await changeSubscriptionPlan(planId, selectedCycle);
    setSuccessToast(`Plano alterado para ${PLAN_CATALOG[planId].name} com sucesso!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Meu Plano & Upgrade
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Alterne entre planos conforme a escala do seu negócio. A mudança de recursos é instantânea.
          </p>
        </div>

        {/* CYCLE SWITCHER */}
        <div className="inline-flex items-center p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/60">
          <button
            type="button"
            onClick={() => setSelectedCycle('annual')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCycle === 'annual'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <span>Anual</span>
            <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-md font-extrabold">
              -20%
            </span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCycle('monthly')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              selectedCycle === 'monthly'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Mensal
          </button>
        </div>
      </div>

      {successToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* PLANS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
        {plans.map((pId) => {
          const plan = PLAN_CATALOG[pId];
          const isCurrent = subscription.planId === pId && subscription.billingCycle === selectedCycle;
          const isAnnual = selectedCycle === 'annual';
          const price = isAnnual ? plan.priceAnnualMonthlyEquivalent : plan.priceMonthly;

          return (
            <div
              key={pId}
              className={`bg-white rounded-3xl p-6 border-2 flex flex-col justify-between transition-all ${
                isCurrent
                  ? 'border-orange-500 ring-4 ring-orange-100 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                    {plan.badge || 'Plano'}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-black uppercase text-white bg-slate-900 px-2.5 py-1 rounded-full">
                      Plano Atual
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{plan.tagline}</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  {pId === 'enterprise' ? (
                    <div className="text-2xl font-black text-slate-900 py-1">Sob Consulta</div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-slate-400">R$</span>
                        <span className="text-3xl font-black text-slate-900">{price}</span>
                        <span className="text-xs text-slate-500">/mês</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {isAnnual
                          ? `Faturado anualmente: R$ ${plan.annualBilledTotal.toFixed(2)}`
                          : 'Cobrança mensal'}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="font-bold text-slate-800 text-[11px] uppercase">Recursos inclusos:</div>
                  <ul className="space-y-2">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isCurrent || isLoading}
                  onClick={() => handlePlanChange(pId)}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    isCurrent
                      ? 'bg-slate-100 text-slate-400 cursor-default'
                      : pId === 'enterprise'
                      ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                      : 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs cursor-pointer'
                  }`}
                >
                  {isCurrent ? (
                    <span>Plano Ativo</span>
                  ) : (
                    <>
                      <span>{pId === 'enterprise' ? 'Falar com Consultor' : 'Mudar para este plano'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
