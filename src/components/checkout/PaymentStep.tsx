import React, { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { PaymentMethodType, PageRoute } from '../../types';
import { CreditCard, QrCode, FileText, Lock, ShieldCheck, ArrowRight, ArrowLeft, Info } from 'lucide-react';

interface PaymentStepProps {
  navigate: (route: PageRoute) => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ navigate }) => {
  const { state, setPayment } = useCheckout();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(state.payment.method);
  const [cardData, setCardData] = useState({
    holderName: state.payment.creditCard?.holderName || '',
    number: '',
    expiry: '',
    cvv: '',
    installments: state.billingCycle === 'annual' ? 12 : 1,
  });

  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  const handleSelectMethod = (m: PaymentMethodType) => {
    setSelectedMethod(m);
    setPayment({ method: m });
  };

  const validateCard = () => {
    if (selectedMethod !== 'credit_card') return true;
    const errors: Record<string, string> = {};
    if (!cardData.holderName.trim()) errors.holderName = 'Nome impresso no cartão é obrigatório.';
    if (!cardData.number || cardData.number.replace(/\s/g, '').length < 16) {
      errors.number = 'Número do cartão inválido.';
    }
    if (!cardData.expiry || cardData.expiry.length < 5) {
      errors.expiry = 'Validade inválida (MM/AA).';
    }
    if (!cardData.cvv || cardData.cvv.length < 3) {
      errors.cvv = 'CVV inválido.';
    }
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod === 'credit_card' && !validateCard()) return;

    // Secure tokenization simulation - only masked number stored
    setPayment({
      method: selectedMethod,
      creditCard: {
        holderName: cardData.holderName,
        numberMasked: `•••• •••• •••• ${cardData.number.slice(-4) || '4821'}`,
        expiryDate: cardData.expiry,
        installments: cardData.installments,
        token: `tok_sec_${Math.random().toString(36).substring(2, 10)}`,
      },
    });

    navigate('/cliente/checkout/revisao');
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
          Etapa 04 de 05
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Forma de Pagamento
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Escolha como deseja realizar a cobrança da assinatura. Conexão protegida com criptografia ponta a ponta.
        </p>
      </div>

      <form onSubmit={handleProceed} className="space-y-6">
        {/* PAYMENT METHOD TABS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleSelectMethod('pix')}
            className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-3 ${
              selectedMethod === 'pix'
                ? 'border-orange-500 bg-orange-50/30 ring-2 ring-orange-200'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <QrCode className={`w-6 h-6 ${selectedMethod === 'pix' ? 'text-orange-600' : 'text-slate-500'}`} />
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Ativação Imediata
              </span>
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">PIX Instantâneo</div>
              <div className="text-[11px] text-slate-500">QR Code dinâmico + Copia e Cola</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMethod('credit_card')}
            className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-3 ${
              selectedMethod === 'credit_card'
                ? 'border-orange-500 bg-orange-50/30 ring-2 ring-orange-200'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <CreditCard className={`w-6 h-6 ${selectedMethod === 'credit_card' ? 'text-orange-600' : 'text-slate-500'}`} />
              <span className="text-[10px] font-bold text-slate-500">Até 12x</span>
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Cartão de Crédito</div>
              <div className="text-[11px] text-slate-500">Renovação automática</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMethod('bank_slip')}
            className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-3 ${
              selectedMethod === 'bank_slip'
                ? 'border-orange-500 bg-orange-50/30 ring-2 ring-orange-200'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <FileText className={`w-6 h-6 ${selectedMethod === 'bank_slip' ? 'text-orange-600' : 'text-slate-500'}`} />
              <span className="text-[10px] font-bold text-slate-500">Compensação 1-2 dias</span>
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Boleto Bancário</div>
              <div className="text-[11px] text-slate-500">Fatura com código de barras</div>
            </div>
          </button>
        </div>

        {/* DETAILS ACCORDING TO SELECTED METHOD */}
        {selectedMethod === 'pix' && (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-start gap-3">
              <QrCode className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Como funciona o pagamento com PIX?</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Na próxima etapa (Revisão), ao confirmar o pedido, o sistema gerará o QR Code dinâmico e o código Copia e Cola. O gateway bancário identifica o pagamento em segundos e seu ambiente SaaS é liberado automaticamente.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'credit_card' && (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 pb-2 border-b border-slate-200">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Dados do Cartão (Tokenização Segura Gateway)</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nome Impresso no Cartão *
              </label>
              <input
                type="text"
                placeholder="CARLOS A MENDONCA"
                value={cardData.holderName}
                onChange={(e) => setCardData({ ...cardData, holderName: e.target.value.toUpperCase() })}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
              />
              {cardErrors.holderName && (
                <p className="text-red-600 text-[11px] mt-1 font-medium">{cardErrors.holderName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Número do Cartão *
              </label>
              <input
                type="text"
                maxLength={19}
                placeholder="0000 0000 0000 0000"
                value={cardData.number}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                  setCardData({ ...cardData, number: val });
                }}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-mono"
              />
              {cardErrors.number && (
                <p className="text-red-600 text-[11px] mt-1 font-medium">{cardErrors.number}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Validade (MM/AA) *</label>
                <input
                  type="text"
                  maxLength={5}
                  placeholder="12/28"
                  value={cardData.expiry}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '');
                    if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
                    setCardData({ ...cardData, expiry: val });
                  }}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-mono"
                />
                {cardErrors.expiry && (
                  <p className="text-red-600 text-[11px] mt-1 font-medium">{cardErrors.expiry}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">CVV (3 dígitos) *</label>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-mono"
                />
                {cardErrors.cvv && (
                  <p className="text-red-600 text-[11px] mt-1 font-medium">{cardErrors.cvv}</p>
                )}
              </div>
            </div>

            {state.billingCycle === 'annual' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parcelamento</label>
                <select
                  value={cardData.installments}
                  onChange={(e) => setCardData({ ...cardData, installments: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                >
                  <option value={1}>1x de R$ {state.orderSummary.total.toFixed(2)} (à vista)</option>
                  <option value={3}>3x de R$ {(state.orderSummary.total / 3).toFixed(2)} sem juros</option>
                  <option value={6}>6x de R$ {(state.orderSummary.total / 6).toFixed(2)} sem juros</option>
                  <option value={12}>12x de R$ {(state.orderSummary.total / 12).toFixed(2)} sem juros</option>
                </select>
              </div>
            )}
          </div>
        )}

        {selectedMethod === 'bank_slip' && (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Prazo de Compensação Bancária</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  O boleto tem vencimento para 3 dias úteis. A liberação do ambiente SaaS ocorrerá após a compensação bancária automática (normalmente em até 24h úteis).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/cliente/checkout/plano')}
            className="py-3.5 px-6 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            type="submit"
            className="flex-1 py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Avançar para Revisão do Pedido</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
