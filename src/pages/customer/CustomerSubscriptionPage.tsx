import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { SubscriptionStatusBadge } from '../../components/customer-portal/SubscriptionStatusBadge';
import { getPlanById } from '../../data/planCatalog';
import { PageRoute } from '../../types';
import {
  CreditCard,
  Layers,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface CustomerSubscriptionPageProps {
  navigate: (route: PageRoute) => void;
}

export const CustomerSubscriptionPage: React.FC<CustomerSubscriptionPageProps> = ({ navigate }) => {
  const { subscription, cancelSubscription } = useCustomer();
  const plan = getPlanById(subscription.planId);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState('');

  const handleCancel = async () => {
    const until = await cancelSubscription();
    setShowCancelModal(false);
    setCancelSuccessMsg(`Assinatura cancelada com sucesso. Seu acesso permanecerá ativo até ${until}.`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Minha Assinatura
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Gerencie o plano, ciclo de cobrança e métodos de pagamento da sua empresa.
        </p>
      </div>

      {cancelSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{cancelSuccessMsg}</span>
        </div>
      )}

      {/* MAIN SUBSCRIPTION CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold text-slate-900">{plan.name}</h2>
              <SubscriptionStatusBadge status={subscription.status} />
            </div>
            <p className="text-xs text-slate-500">{plan.tagline}</p>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-2xl font-black text-slate-900">
              R$ {subscription.currentPrice.toFixed(2)}
              <span className="text-xs font-normal text-slate-500">
                /{subscription.billingCycle === 'annual' ? 'ano' : 'mês'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Ciclo: {subscription.billingCycle === 'annual' ? 'Anual com 20% de desconto' : 'Mensal recorrente'}
            </div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Data de Início
            </span>
            <div className="font-semibold text-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{new Date(subscription.startDate).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Próxima Cobrança
            </span>
            <div className="font-semibold text-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span>{new Date(subscription.nextBillingDate).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Forma de Cobrança
            </span>
            <div className="font-semibold text-slate-800 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-400" />
              <span>{subscription.paymentMethod.details}</span>
            </div>
          </div>
        </div>

        {/* LIMITS & CAPACITIES */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Limites Operacionais do Plano
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[11px] text-slate-500">Produtos Cadastrados</div>
              <div className="text-base font-bold text-slate-900 mt-1">1.850 / {plan.limits.products}</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-orange-600 h-full w-3/5 rounded-full" />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[11px] text-slate-500">Usuários da Equipe</div>
              <div className="text-base font-bold text-slate-900 mt-1">3 / {plan.limits.users}</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-orange-600 h-full w-3/5 rounded-full" />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[11px] text-slate-500">Lojas & Filiais</div>
              <div className="text-base font-bold text-slate-900 mt-1">2 / {plan.limits.stores}</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-orange-600 h-full w-full rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/cliente/plano')}
              className="py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Alterar ou Fazer Upgrade de Plano</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/cliente/cobrancas')}
              className="py-3 px-5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all"
            >
              Alterar Forma de Pagamento
            </button>
          </div>

          {subscription.status === 'active' && (
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
            >
              Cancelar Assinatura
            </button>
          )}
        </div>
      </div>

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Deseja cancelar sua assinatura?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ao cancelar, seu ambiente SaaS BRAND+ ficará ativo até o final do ciclo faturado atual. Após essa data, o acesso aos recursos do PDV e E-commerce será suspenso.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Manter Assinatura
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl"
              >
                Confirmar Cancelamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
