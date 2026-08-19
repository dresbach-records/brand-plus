import React from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { getPlanById } from '../../data/planCatalog';
import { ShieldCheck, Check, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { PageRoute } from '../../types';

interface OrderSummaryProps {
  navigate?: (route: PageRoute) => void;
  showChangePlanLink?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  navigate,
  showChangePlanLink = true,
}) => {
  const { state, setBillingCycle } = useCheckout();
  const plan = getPlanById(state.planId);
  const isAnnual = state.billingCycle === 'annual';

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800 sticky top-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400">
            Resumo da Assinatura
          </span>
          <h3 className="text-xl font-black text-white">{plan.name}</h3>
        </div>
        {showChangePlanLink && navigate && (
          <button
            type="button"
            onClick={() => navigate('/cliente/checkout/plano')}
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 underline"
          >
            Alterar plano
          </button>
        )}
      </div>

      {/* Cycle switcher in summary */}
      <div className="bg-slate-800/80 p-1.5 rounded-2xl flex items-center border border-slate-700">
        <button
          type="button"
          onClick={() => setBillingCycle('annual')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            isAnnual
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Anual</span>
          <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-md font-extrabold">
            -20%
          </span>
        </button>
        <button
          type="button"
          onClick={() => setBillingCycle('monthly')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            !isAnnual
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Mensal
        </button>
      </div>

      {/* Values breakdown */}
      <div className="space-y-3 text-xs">
        <div className="flex justify-between text-slate-300">
          <span>Mensalidade base ({plan.name}):</span>
          <span>R$ {plan.priceMonthly.toFixed(2)} /mês</span>
        </div>

        {isAnnual ? (
          <>
            <div className="flex justify-between text-slate-300">
              <span>Valor anual regular (12x):</span>
              <span className="line-through text-slate-500">
                R$ {(plan.priceMonthly * 12).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-emerald-400 font-bold">
              <span>Economia no plano Anual (-20%):</span>
              <span>- R$ {state.orderSummary.discount.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <div>
                <div className="text-sm font-bold text-white">Total Faturado Anual</div>
                <div className="text-[11px] text-slate-400">
                  Equivalente a R$ {plan.priceAnnualMonthlyEquivalent.toFixed(2)} /mês
                </div>
              </div>
              <div className="text-2xl font-black text-orange-400">
                R$ {state.orderSummary.total.toFixed(2)}
              </div>
            </div>
          </>
        ) : (
          <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
            <div>
              <div className="text-sm font-bold text-white">Total Mensal</div>
              <div className="text-[11px] text-slate-400">Sem fidelidade anual</div>
            </div>
            <div className="text-2xl font-black text-orange-400">
              R$ {state.orderSummary.total.toFixed(2)}
              <span className="text-xs font-normal text-slate-400">/mês</span>
            </div>
          </div>
        )}
      </div>

      {/* Features included */}
      <div className="space-y-2 pt-4 border-t border-slate-800">
        <div className="text-[11px] font-bold text-slate-300">Incluso no seu plano:</div>
        <ul className="space-y-1.5 text-xs text-slate-400">
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>{plan.limits.products}</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>{plan.limits.users}</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>{plan.limits.stores}</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>Zero comissão sobre suas vendas</span>
          </li>
        </ul>
      </div>

      {/* Trust Badges */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Checkout Criptografado SSL 256-bit</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Ativação do SaaS instantânea pós-pagamento</span>
        </div>
      </div>
    </div>
  );
};
