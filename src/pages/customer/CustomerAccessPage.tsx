import React from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { SAAS_APP_URL } from '../../config/env';
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
} from 'lucide-react';

interface CustomerAccessPageProps {
  navigate: (route: PageRoute) => void;
}

export const CustomerAccessPage: React.FC<CustomerAccessPageProps> = ({ navigate }) => {
  const { saasAccess, subscription, tenant, company } = useCustomer();

  const handleOpenSaaS = () => {
    if (!saasAccess.hasAccess) return;
    window.open(SAAS_APP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Acesso ao SaaS Operacional BRAND+
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Verificação de licença, ambiente na nuvem e autenticação Single Sign-On (SSO).
        </p>
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
              Clique no botão abaixo para ser redirecionado com segurança para a aplicação operacional (PDV, E-commerce, Gestão e Inteligência Artificial).
            </p>
          </div>

          <div className="shrink-0">
            {saasAccess.hasAccess ? (
              <button
                type="button"
                onClick={handleOpenSaaS}
                className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>ACESSAR MINHA BRAND+</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/cliente/cobrancas')}
                className="w-full sm:w-auto px-6 py-4 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Regularizar Pagamento</span>
              </button>
            )}
          </div>
        </div>

        {/* ACCESS SPECS */}
        <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1.5 mb-1">
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span>URL Operacional</span>
            </div>
            <div className="font-mono text-slate-200 truncate">{SAAS_APP_URL}</div>
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
            <div className="text-slate-200">OIDC Token Handshake</div>
          </div>
        </div>
      </div>

      {/* REQUIREMENTS BREAKDOWN */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">Checklist de Liberação de Acesso</h3>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">Assinatura Ativa e Válida</div>
                <div className="text-[11px] text-slate-500">Plano {subscription.planName} em dia</div>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              CONFIRMADO
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">Provisionamento do Ambiente em Nuvem</div>
                <div className="text-[11px] text-slate-500">Instância isolada de alta performance</div>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              PRONTO
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">Autenticação Unificada (Single Sign-On)</div>
                <div className="text-[11px] text-slate-500">Credenciais sincronizadas com o Portal do Cliente</div>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              ATIVO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
