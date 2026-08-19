import React from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { PageRoute } from '../../types';
import {
  Server,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Cpu,
  Globe,
  Database,
  RefreshCw,
  XCircle,
  Clock,
} from 'lucide-react';

interface CustomerAccessPageProps {
  navigate: (route: PageRoute) => void;
}

export const CustomerAccessPage: React.FC<CustomerAccessPageProps> = ({ navigate }) => {
  const { saasAccess, subscription, tenant, company, refreshAll, isLoading } = useCustomer();

  const handleOpenSaaS = () => {
    if (!saasAccess.accessEnabled || !saasAccess.accessUrl) return;
    window.open(saasAccess.accessUrl, '_blank', 'noopener,noreferrer');
  };

  const isSubActive = subscription.status === 'active' || subscription.status === 'trialing';
  const isProvReady = tenant.provisioningStatus === 'ready';

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Acesso ao SaaS Operacional BRAND+
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Acesso verificado e autorizado dinamicamente pelo backend da BRAND+.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refreshAll()}
          disabled={isLoading}
          className="self-start sm:self-auto px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Revalidar Acesso</span>
        </button>
      </div>

      {/* ACCESS HERO CARD */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
              <Server className="w-3.5 h-3.5" />
              <span>Ambiente Dedicado em Produção</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {company.tradeName || 'Sua Loja'} na BRAND+
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              O acesso operacional (PDV, Catálogo, Estoque e IA) é liberado exclusivamente após a autorização do backend.
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-start sm:items-end gap-2">
            {saasAccess.accessEnabled ? (
              <button
                type="button"
                id="btn-access-brand-plus-page"
                onClick={handleOpenSaaS}
                className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>ACESSAR BRAND+</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            ) : (
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  id="btn-access-brand-plus-disabled-page"
                  disabled
                  className="w-full sm:w-auto px-6 py-4 bg-slate-800 text-slate-400 font-extrabold text-sm rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-not-allowed opacity-75"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>ACESSAR BRAND+ (BLOQUEADO)</span>
                </button>

                {subscription.status === 'pending' || subscription.status === 'past_due' ? (
                  <button
                    type="button"
                    onClick={() => navigate('/cliente/cobrancas')}
                    className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Regularizar Pagamento</span>
                  </button>
                ) : null}
              </div>
            )}

            <div className="text-[11px] max-w-xs text-left sm:text-right">
              {saasAccess.accessEnabled ? (
                <span className="text-emerald-400 font-mono text-[10px]">
                  Liberado: {saasAccess.accessUrl}
                </span>
              ) : (
                <span className="text-amber-300 font-medium">{saasAccess.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* ACCESS SPECS */}
        <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1.5 mb-1">
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span>URL Operacional</span>
            </div>
            <div className="font-mono text-slate-200 truncate">
              {saasAccess.accessUrl || 'Autorização pendente'}
            </div>
          </div>

          <div className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1.5 mb-1">
              <Database className="w-3.5 h-3.5 text-orange-400" />
              <span>Tenant Identificador</span>
            </div>
            <div className="font-mono text-slate-200">{tenant.slug}</div>
          </div>

          <div className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1.5 mb-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Segurança SSO</span>
            </div>
            <div className="text-slate-200">OIDC Ready (Sistemas Separados)</div>
          </div>
        </div>
      </div>

      {/* REQUIREMENTS BREAKDOWN */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">
          Critérios de Autorização do Backend (GET /api/v1/saas/access)
        </h3>

        <div className="space-y-3 text-xs">
          {/* CRITERION 1: SUBSCRIPTION */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {isSubActive ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              )}
              <div>
                <div className="font-bold text-slate-900">1. Assinatura Ativa (subscriptionStatus = active)</div>
                <div className="text-[11px] text-slate-500">
                  Status atual: <span className="font-semibold capitalize">{subscription.status}</span> (Plano {subscription.planName})
                </div>
              </div>
            </div>
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                isSubActive
                  ? 'text-emerald-700 bg-emerald-100'
                  : 'text-amber-700 bg-amber-100'
              }`}
            >
              {isSubActive ? 'CONFIRMADO' : 'PENDENTE'}
            </span>
          </div>

          {/* CRITERION 2: PROVISIONING */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {isProvReady ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : tenant.provisioningStatus === 'failed' ? (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
              )}
              <div>
                <div className="font-bold text-slate-900">2. Provisionamento do Tenant (provisioningStatus = ready)</div>
                <div className="text-[11px] text-slate-500">
                  Instância em nuvem ({tenant.environment}): <span className="font-semibold capitalize">{tenant.provisioningStatus}</span>
                </div>
              </div>
            </div>
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                isProvReady
                  ? 'text-emerald-700 bg-emerald-100'
                  : tenant.provisioningStatus === 'failed'
                  ? 'text-rose-700 bg-rose-100'
                  : 'text-blue-700 bg-blue-100'
              }`}
            >
              {isProvReady ? 'PRONTO' : tenant.provisioningStatus === 'failed' ? 'FALHA' : 'PREPARANDO'}
            </span>
          </div>

          {/* CRITERION 3: BACKEND ACCESS AUTHORIZATION */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {saasAccess.accessEnabled ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Lock className="w-4 h-4 text-amber-500 shrink-0" />
              )}
              <div>
                <div className="font-bold text-slate-900">3. Autorização de Acesso (accessEnabled = true)</div>
                <div className="text-[11px] text-slate-500">
                  Validação de segurança realizada pelo backend
                </div>
              </div>
            </div>
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                saasAccess.accessEnabled
                  ? 'text-emerald-700 bg-emerald-100'
                  : 'text-amber-700 bg-amber-100'
              }`}
            >
              {saasAccess.accessEnabled ? 'LIBERADO' : 'BLOQUEADO'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

