import React from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { SaaSAccessCard } from '../../components/customer-portal/SaaSAccessCard';
import { SubscriptionStatusBadge } from '../../components/customer-portal/SubscriptionStatusBadge';
import { PageRoute, SubscriptionStatus } from '../../types';
import { getPlanById } from '../../data/planCatalog';
import {
  CreditCard,
  Layers,
  FileText,
  Users,
  Building,
  Headphones,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface CustomerDashboardPageProps {
  navigate: (route: PageRoute) => void;
}

export const CustomerDashboardPage: React.FC<CustomerDashboardPageProps> = ({ navigate }) => {
  const { customer, company, subscription, invoices, users, setDemoStatus } = useCustomer();
  const plan = getPlanById(subscription.planId);

  return (
    <div className="space-y-8">
      {/* GREETING & CONTEXT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Olá, {customer.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Painel comercial e administrativo de{' '}
            <strong className="text-slate-800 font-bold">{company.tradeName}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/cliente/plano')}
            className="py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" />
            <span>Fazer Upgrade de Plano</span>
          </button>
        </div>
      </div>

      {/* PRIMARY SAAS ACCESS BANNER */}
      <SaaSAccessCard navigate={navigate} />

      {/* METRIC / STATUS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: ASSINATURA */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Assinatura
            </span>
            <CreditCard className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <div className="my-1">
              <SubscriptionStatusBadge status={subscription.status} />
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Próxima renovação:{' '}
              <span className="font-semibold text-slate-800">
                {new Date(subscription.nextBillingDate).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>

        {/* CARD 2: PLANO */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Plano Atual
            </span>
            <Layers className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">{plan.name}</div>
            <div className="text-xs text-slate-500 mt-1">
              R$ {subscription.currentPrice.toFixed(2)}{' '}
              <span className="text-[10px]">
                ({subscription.billingCycle === 'annual' ? 'Anual' : 'Mensal'})
              </span>
            </div>
          </div>
        </div>

        {/* CARD 3: FATURAS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Última Cobrança
            </span>
            <FileText className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <div className="text-lg font-black text-emerald-600">Quitada</div>
            <div className="text-xs text-slate-500 mt-1">
              {invoices[0]?.invoiceNumber || 'FAT-2026-00981'} (PIX)
            </div>
          </div>
        </div>

        {/* CARD 4: USUÁRIOS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Acessos Autorizados
            </span>
            <Users className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">{users.length} Colaboradores</div>
            <div className="text-xs text-slate-500 mt-1">Limite do plano: {plan.limits.users}</div>
          </div>
        </div>
      </div>

      {/* QUICK SHORTCUTS & RECENT INVOICES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SHORTCUTS */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">Ações Rápidas</h3>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => navigate('/cliente/assinatura')}
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-orange-50/60 border border-slate-200 hover:border-orange-200 text-left transition-all flex items-center justify-between text-xs font-bold text-slate-800 group"
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-orange-600" />
                <span>Gerenciar Assinatura</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/cliente/faturas')}
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-orange-50/60 border border-slate-200 hover:border-orange-200 text-left transition-all flex items-center justify-between text-xs font-bold text-slate-800 group"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-orange-600" />
                <span>Visualizar Faturas e Recibos</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/cliente/empresa')}
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-orange-50/60 border border-slate-200 hover:border-orange-200 text-left transition-all flex items-center justify-between text-xs font-bold text-slate-800 group"
            >
              <div className="flex items-center gap-2.5">
                <Building className="w-4 h-4 text-orange-600" />
                <span>Dados Cadastrais da Empresa</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/cliente/suporte')}
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-orange-50/60 border border-slate-200 hover:border-orange-200 text-left transition-all flex items-center justify-between text-xs font-bold text-slate-800 group"
            >
              <div className="flex items-center gap-2.5">
                <Headphones className="w-4 h-4 text-orange-600" />
                <span>Abrir Chamado no Suporte B2B</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>

        {/* INVOICE HISTORY PREVIEW */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">Histórico Recente de Pagamentos</h3>
            <button
              type="button"
              onClick={() => navigate('/cliente/faturas')}
              className="text-xs font-bold text-orange-600 hover:underline"
            >
              Ver todas
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400">
                  <th className="pb-2">Fatura</th>
                  <th className="pb-2">Data</th>
                  <th className="pb-2">Valor</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Recibo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-semibold text-slate-900">{inv.invoiceNumber}</td>
                    <td className="py-3 text-slate-500">
                      {new Date(inv.issueDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 font-bold text-slate-900">R$ {inv.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Pago</span>
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() => navigate('/cliente/faturas')}
                        className="text-orange-600 font-bold hover:underline"
                      >
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DEV / DEMO STATE SIMULATOR */}
      <div className="p-5 bg-slate-100 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-slate-500" />
            <span>Simulador de Estados da Assinatura (Ambiente de Teste)</span>
          </div>
          <span className="text-[10px] text-slate-500">Altere o estado para validar as regras do SaaS</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['active', 'pending', 'past_due', 'suspended', 'cancelled'] as SubscriptionStatus[]).map(
            (status) => (
              <button
                key={status}
                type="button"
                onClick={() => setDemoStatus(status, status === 'active' ? 'ready' : 'pending')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  subscription.status === status
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Status: {status}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
