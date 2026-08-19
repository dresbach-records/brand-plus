import React, { useEffect } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { useCustomer } from '../../context/CustomerContext';
import { SAAS_APP_URL } from '../../config/env';
import { PageRoute } from '../../types';
import { getPlanById } from '../../data/planCatalog';
import {
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  User,
  Building,
  Layers,
  ArrowRight,
  LayoutDashboard,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SuccessStepProps {
  navigate: (route: PageRoute) => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ navigate }) => {
  const { state } = useCheckout();
  const { customer, company, tenant } = useCustomer();
  const plan = getPlanById(state.planId);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#f97316', '#10b981', '#0f172a'],
      });
    } catch {}
  }, []);

  const handleOpenSaaS = () => {
    window.open(SAAS_APP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 max-w-3xl mx-auto">
      {/* HEADER WITH BADGE */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Assinatura Ativada com Sucesso</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Bem-vindo à BRAND+!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Sua conta foi criada, o pagamento foi confirmado e o seu ambiente operacional está 100% pronto para uso.
        </p>
      </div>

      {/* 6-POINT ACTIVATION CHECKLIST */}
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200">
          Status de Ativação do Ambiente
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>01. Conta de Administrador criada</span>
          </div>
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>02. Empresa vinculada e homologada</span>
          </div>
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>03. Plano {plan.name} ativado</span>
          </div>
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>04. Pagamento aprovado no gateway</span>
          </div>
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>05. Assinatura ATIVA no portal</span>
          </div>
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>06. Ambiente SaaS provisionado</span>
          </div>
        </div>
      </div>

      {/* PRIMARY ACTION: ACCESS OPERATIONAL SAAS */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 space-y-4 shadow-xl text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400">
          Acesso ao Sistema Operacional
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Acesse agora seu PDV, E-commerce e IA
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Você será direcionado para o SaaS operacional isolado da BRAND+.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleOpenSaaS}
            className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>ACESSAR MINHA BRAND+</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="text-[11px] text-slate-400 font-mono pt-2">
          Endereço do SaaS:{' '}
          <span className="text-orange-400">{SAAS_APP_URL}</span>
        </div>
      </div>

      {/* SECONDARY ACTIONS: PORTAL NAVIGATION */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          type="button"
          onClick={() => navigate('/cliente')}
          className="w-full sm:w-auto py-3 px-6 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <LayoutDashboard className="w-4 h-4 text-slate-600" />
          <span>Ir para o Portal do Cliente</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/cliente/assinatura')}
          className="w-full sm:w-auto py-3 px-6 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Layers className="w-4 h-4 text-slate-600" />
          <span>Gerenciar Assinatura & Faturas</span>
        </button>
      </div>
    </div>
  );
};
