import React, { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { getPlanById } from '../../data/planCatalog';
import { PageRoute } from '../../types';
import {
  CheckCircle2,
  Building,
  User,
  Layers,
  CreditCard,
  QrCode,
  FileText,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Edit2,
} from 'lucide-react';

interface ReviewStepProps {
  navigate: (route: PageRoute) => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ navigate }) => {
  const { state, submitOrder, isSubmitting } = useCheckout();
  const [contractAccepted, setContractAccepted] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const plan = getPlanById(state.planId);

  const handleConfirmOrder = async () => {
    if (!contractAccepted) {
      setErrorMsg('Você precisa aceitar os termos contratuais para finalizar.');
      return;
    }
    setErrorMsg('');

    try {
      // Navigate to processing step and trigger checkout session creation
      navigate('/cliente/checkout/processando');
      await submitOrder();
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao processar o pedido. Tente novamente.');
    }
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
          Etapa 05 de 05
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Revisão Final da Assinatura
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Confira todos os dados antes de confirmar a contratação da plataforma BRAND+.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 font-medium">
          {errorMsg}
        </div>
      )}

      {/* SUMMARY SECTIONS */}
      <div className="space-y-4">
        {/* 01 CONTA */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <User className="w-4 h-4 text-orange-600" />
              <span>01. Administrador da Conta</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/cliente/checkout/conta')}
              className="text-[11px] text-orange-600 font-bold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              <span>Editar</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Nome:</span>
              <span className="font-semibold text-slate-800">{state.account.fullName || 'Não informado'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">E-mail:</span>
              <span className="font-semibold text-slate-800">{state.account.email || 'Não informado'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Telefone:</span>
              <span className="font-semibold text-slate-800">{state.account.phone || 'Não informado'}</span>
            </div>
          </div>
        </div>

        {/* 02 EMPRESA */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Building className="w-4 h-4 text-orange-600" />
              <span>02. Empresa Contratante</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/cliente/checkout/empresa')}
              className="text-[11px] text-orange-600 font-bold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              <span>Editar</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Nome Fantasia:</span>
              <span className="font-semibold text-slate-800">{state.company.tradeName || 'Não informado'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">CNPJ:</span>
              <span className="font-semibold text-slate-800 font-mono">{state.company.cnpj || 'Não informado'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Cidade/UF:</span>
              <span className="font-semibold text-slate-800">
                {state.company.city ? `${state.company.city}/${state.company.state}` : 'Não informado'}
              </span>
            </div>
          </div>
        </div>

        {/* 03 PLANO */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Layers className="w-4 h-4 text-orange-600" />
              <span>03. Plano & Faturamento</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/cliente/checkout/plano')}
              className="text-[11px] text-orange-600 font-bold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              <span>Editar</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Plano Escolhido:</span>
              <span className="font-bold text-slate-900">{plan.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Ciclo:</span>
              <span className="font-semibold text-slate-800">
                {state.billingCycle === 'annual' ? 'Anual (-20% de desconto)' : 'Mensal recorrente'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total a Cobrar:</span>
              <span className="font-bold text-orange-600">R$ {state.orderSummary.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* 04 FORMA DE PAGAMENTO */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              {state.payment.method === 'pix' ? (
                <QrCode className="w-4 h-4 text-orange-600" />
              ) : state.payment.method === 'credit_card' ? (
                <CreditCard className="w-4 h-4 text-orange-600" />
              ) : (
                <FileText className="w-4 h-4 text-orange-600" />
              )}
              <span>04. Método de Cobrança</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/cliente/checkout/pagamento')}
              className="text-[11px] text-orange-600 font-bold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              <span>Editar</span>
            </button>
          </div>
          <div className="text-xs">
            {state.payment.method === 'pix' && (
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>PIX Instantâneo (QR Code & Copia e Cola gerados na próxima tela)</span>
              </div>
            )}
            {state.payment.method === 'credit_card' && (
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>
                  Cartão de Crédito ({state.payment.creditCard?.numberMasked || '•••• •••• •••• 4821'}) em{' '}
                  {state.payment.creditCard?.installments || 1}x
                </span>
              </div>
            )}
            {state.payment.method === 'bank_slip' && (
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Boleto Bancário (Compensação em 1 a 2 dias úteis)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTRACT ACCEPTANCE */}
      <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-200/60">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={contractAccepted}
            onChange={(e) => setContractAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
          />
          <span className="text-xs text-slate-700 leading-relaxed">
            Confirmo que as informações acima são verdadeiras e estou ciente de que o acesso ao SaaS operacional BRAND+
            será liberado automaticamente assim que o pagamento for confirmado pelo gateway bancário.
          </span>
        </label>
      </div>

      {/* BUTTONS */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => navigate('/cliente/checkout/pagamento')}
          className="py-3.5 px-6 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleConfirmOrder}
          className="flex-1 py-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Gerando cobrança no gateway...</span>
            </>
          ) : (
            <>
              <span>Confirmar e Finalizar Assinatura</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
