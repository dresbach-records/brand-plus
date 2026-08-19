import React from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { PageRoute } from '../../types';
import {
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Clock,
  Sparkles,
  Server,
  Layers,
  Lock,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

interface SaaSAccessCardProps {
  navigate?: (route: PageRoute) => void;
  compact?: boolean;
}

export const SaaSAccessCard: React.FC<SaaSAccessCardProps> = ({ navigate, compact = false }) => {
  const { saasAccess, subscription, tenant } = useCustomer();

  const handleOpenSaaS = () => {
    if (!saasAccess.accessEnabled || !saasAccess.accessUrl) return;
    window.open(saasAccess.accessUrl, '_blank', 'noopener,noreferrer');
  };

  const getStatusDisplay = () => {
    if (saasAccess.accessEnabled) {
      return {
        badgeText: 'ONLINE & AUTORIZADO',
        badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800',
        dotColor: 'bg-emerald-400',
        message: 'Ambiente ativo, homologado e liberado pelo backend.',
      };
    }

    if (subscription.status === 'pending') {
      return {
        badgeText: 'PAGAMENTO PENDENTE',
        badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800',
        dotColor: 'bg-amber-400',
        message: 'Seu ambiente será liberado após a confirmação do pagamento.',
      };
    }

    if (tenant.provisioningStatus === 'provisioning' || tenant.provisioningStatus === 'pending') {
      return {
        badgeText: 'PREPARANDO AMBIENTE',
        badgeColor: 'text-blue-400 bg-blue-950/60 border-blue-800',
        dotColor: 'bg-blue-400',
        message: 'Estamos preparando seu ambiente BRAND+.',
      };
    }

    if (tenant.provisioningStatus === 'failed') {
      return {
        badgeText: 'FALHA DE ATIVAÇÃO',
        badgeColor: 'text-rose-400 bg-rose-950/60 border-rose-800',
        dotColor: 'bg-rose-400',
        message: 'Não foi possível preparar seu ambiente. Nossa equipe precisa verificar a ativação.',
      };
    }

    return {
      badgeText: 'ACESSO BLOQUEADO',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800',
      dotColor: 'bg-amber-400',
      message: saasAccess.message || 'Acesso restrito pelo backend de autorização.',
    };
  };

  const status = getStatusDisplay();

  if (compact) {
    return (
      <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>SaaS Operacional BRAND+</span>
              <span className={`w-2 h-2 rounded-full ${status.dotColor} animate-pulse`} />
            </div>
            <div className="text-[11px] text-slate-400">
              {saasAccess.accessEnabled ? 'Ambiente Liberado' : status.message}
            </div>
          </div>
        </div>

        <button
          type="button"
          id="btn-compact-saas-access"
          disabled={!saasAccess.accessEnabled}
          onClick={handleOpenSaaS}
          title={status.message}
          className="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
        >
          <span>ACESSAR BRAND+</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
              Ambiente Operacional Dedicado
            </span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${status.badgeColor}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor} animate-pulse`} />
              <span>{status.badgeText}</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            Acesse o Sistema Operacional BRAND+
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Acesse o PDV de frente de caixa, catálogo de produtos, relatórios fiscais, pedidos omnichannel e o Copiloto de IA da sua loja.
          </p>
        </div>

        {/* ACCESS BUTTON & BACKEND VERIFICATION INFO */}
        <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
          {saasAccess.accessEnabled ? (
            <button
              type="button"
              id="btn-access-brand-plus-primary"
              onClick={handleOpenSaaS}
              className="w-full sm:w-auto px-7 py-4 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>ACESSAR BRAND+</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          ) : (
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <button
                type="button"
                id="btn-access-brand-plus-disabled"
                disabled
                title={status.message}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-800/80 text-slate-400 font-extrabold text-xs rounded-xl border border-slate-700/80 transition-all flex items-center justify-center gap-2 cursor-not-allowed opacity-75"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>ACESSAR BRAND+ (BLOQUEADO)</span>
              </button>

              {subscription.status === 'pending' || subscription.status === 'past_due' ? (
                <button
                  type="button"
                  onClick={() => navigate?.('/cliente/cobrancas')}
                  className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Ver Fatura Pendente</span>
                </button>
              ) : null}
            </div>
          )}

          <div className="text-[11px] text-slate-400 max-w-sm text-left md:text-right">
            {saasAccess.accessEnabled ? (
              <span className="font-mono text-emerald-400 text-[10px]">
                URL autorizada: {saasAccess.accessUrl}
              </span>
            ) : (
              <span className="text-amber-300 font-medium text-[11px]">{status.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* METRICS / SPECS BAR */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Instância / Tenant:</span>
          <span className="font-semibold text-slate-200">{tenant.slug}.brandplus.com.br</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Status da Assinatura:</span>
          <span className="font-semibold text-slate-200 capitalize">{subscription.status}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Status de Provisionamento:</span>
          <span className="font-semibold text-slate-200 capitalize">{tenant.provisioningStatus}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Autorização Backend:</span>
          <span className={`font-semibold ${saasAccess.accessEnabled ? 'text-emerald-400' : 'text-amber-400'}`}>
            {saasAccess.accessEnabled ? 'Liberado (HTTP 200)' : 'Restrito'}
          </span>
        </div>
      </div>
    </div>
  );
};

