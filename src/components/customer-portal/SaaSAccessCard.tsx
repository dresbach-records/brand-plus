import React from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { SAAS_APP_URL } from '../../config/env';
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
} from 'lucide-react';

interface SaaSAccessCardProps {
  navigate?: (route: PageRoute) => void;
  compact?: boolean;
}

export const SaaSAccessCard: React.FC<SaaSAccessCardProps> = ({ navigate, compact = false }) => {
  const { saasAccess, subscription, tenant } = useCustomer();

  const handleOpenSaaS = () => {
    if (!saasAccess.hasAccess) return;
    window.open(SAAS_APP_URL, '_blank', 'noopener,noreferrer');
  };

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
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-[11px] text-slate-400">
              {saasAccess.hasAccess ? 'Ambiente Ativo e Pronto' : saasAccess.reason}
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={!saasAccess.hasAccess}
          onClick={handleOpenSaaS}
          className="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>Acessar</span>
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
            {saasAccess.hasAccess ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800">
                <Clock className="w-3 h-3" />
                <span>BLOQUEADO</span>
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            Acesse o Sistema Operacional BRAND+
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Acesse o PDV de frente de caixa, loja virtual, catálogo de produtos, relatórios fiscais e o Copiloto de IA da sua loja.
          </p>
        </div>

        {/* ACCESS BUTTON */}
        <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
          {saasAccess.hasAccess ? (
            <button
              type="button"
              onClick={handleOpenSaaS}
              className="w-full sm:w-auto px-6 py-4 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>ACESSAR MINHA BRAND+</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate?.('/cliente/cobrancas')}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Regularizar Pagamento</span>
            </button>
          )}

          <div className="text-[11px] text-slate-400 font-mono">
            {saasAccess.hasAccess ? (
              <span>URL: {SAAS_APP_URL}</span>
            ) : (
              <span className="text-amber-400">{saasAccess.reason}</span>
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
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Plano Contratado:</span>
          <span className="font-semibold text-slate-200">{subscription.planName}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Protocolo de Autenticação:</span>
          <span className="font-semibold text-slate-200">SSO Corporativo (OIDC)</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Disponibilidade (SLA):</span>
          <span className="font-semibold text-emerald-400">99.9% Operacional</span>
        </div>
      </div>
    </div>
  );
};
