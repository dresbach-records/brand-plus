import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { PageRoute, PaymentMethodType } from '../../types';
import {
  CreditCard,
  QrCode,
  FileText,
  Lock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ShieldCheck,
} from 'lucide-react';

interface CustomerBillingPageProps {
  navigate: (route: PageRoute) => void;
}

export const CustomerBillingPage: React.FC<CustomerBillingPageProps> = ({ navigate }) => {
  const { subscription } = useCustomer();
  const [activeMethod, setActiveMethod] = useState<PaymentMethodType>(subscription.paymentMethod.type);
  const [toast, setToast] = useState('');

  const handleSaveMethod = (type: PaymentMethodType) => {
    setActiveMethod(type);
    setToast('Forma padrão de cobrança atualizada com sucesso!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Cobranças & Métodos de Pagamento
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Gerencie o meio de pagamento utilizado nas renovações automáticas da sua assinatura.
        </p>
      </div>

      {toast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* ACTIVE METHOD CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-extrabold text-slate-900">Método Principal Cadastrado</h3>

        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              {activeMethod === 'pix' ? (
                <QrCode className="w-5 h-5" />
              ) : activeMethod === 'credit_card' ? (
                <CreditCard className="w-5 h-5" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {activeMethod === 'pix'
                  ? 'PIX Instantâneo Automático'
                  : activeMethod === 'credit_card'
                  ? 'Cartão de Crédito Corporativo (•••• •••• •••• 4821)'
                  : 'Boleto Bancário'}
              </div>
              <div className="text-[11px] text-slate-500">
                Cobrança padrão das faturas mensais e renovações
              </div>
            </div>
          </div>

          <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full shrink-0 border border-emerald-200">
            PADRÃO
          </span>
        </div>

        {/* ALTERNATIVES */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Selecione uma Forma de Cobrança:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleSaveMethod('pix')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                activeMethod === 'pix'
                  ? 'border-orange-500 bg-orange-50/40'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <QrCode className="w-5 h-5 text-orange-600 mb-2" />
              <div className="font-bold text-slate-900 text-xs">PIX Instantâneo</div>
              <div className="text-[10px] text-slate-500">QR Code gerado na fatura</div>
            </button>

            <button
              type="button"
              onClick={() => handleSaveMethod('credit_card')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                activeMethod === 'credit_card'
                  ? 'border-orange-500 bg-orange-50/40'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <CreditCard className="w-5 h-5 text-orange-600 mb-2" />
              <div className="font-bold text-slate-900 text-xs">Cartão de Crédito</div>
              <div className="text-[10px] text-slate-500">Débito automático mensal</div>
            </button>

            <button
              type="button"
              onClick={() => handleSaveMethod('bank_slip')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                activeMethod === 'bank_slip'
                  ? 'border-orange-500 bg-orange-50/40'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <FileText className="w-5 h-5 text-orange-600 mb-2" />
              <div className="font-bold text-slate-900 text-xs">Boleto Bancário</div>
              <div className="text-[10px] text-slate-500">Envio para o financeiro</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
