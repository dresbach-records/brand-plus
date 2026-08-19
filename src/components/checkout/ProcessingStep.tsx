import React, { useState, useEffect } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { useCustomer } from '../../context/CustomerContext';
import { PageRoute } from '../../types';
import {
  QrCode,
  Copy,
  Check,
  CreditCard,
  FileText,
  Loader2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface ProcessingStepProps {
  navigate: (route: PageRoute) => void;
}

export const ProcessingStep: React.FC<ProcessingStepProps> = ({ navigate }) => {
  const { paymentResult, confirmSimulatedPayment, state } = useCheckout();
  const { setDemoStatus } = useCustomer();
  const [copied, setCopied] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (paymentResult?.status === 'paid') {
      // Activate customer state
      setDemoStatus('active', 'ready');
      navigate('/cliente/checkout/sucesso');
    }
  }, [paymentResult?.status]);

  const handleCopyPix = () => {
    if (paymentResult?.pixCopyPaste) {
      navigator.clipboard.writeText(paymentResult.pixCopyPaste);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSimulatePayment = async () => {
    setIsConfirming(true);
    await confirmSimulatedPayment();
    setDemoStatus('active', 'ready');
    setIsConfirming(false);
    navigate('/cliente/checkout/sucesso');
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
          Aguardando Confirmação
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {state.payment.method === 'pix'
            ? 'Pague com PIX para ativar sua BRAND+'
            : state.payment.method === 'credit_card'
            ? 'Processando autorização do cartão'
            : 'Boleto Bancário Gerado com Sucesso'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Identificador da Cobrança:{' '}
          <span className="font-mono font-bold text-slate-800">
            {paymentResult?.paymentId || 'pay_proc_9182'}
          </span>
        </p>
      </div>

      {/* PIX VIEW */}
      {state.payment.method === 'pix' && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              {paymentResult?.pixQrCode ? (
                <img
                  src={paymentResult.pixQrCode}
                  alt="QR Code PIX"
                  className="w-48 h-48 object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-48 h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                  <QrCode className="w-20 h-20 text-slate-300" />
                </div>
              )}
            </div>

            <div className="text-center space-y-1">
              <div className="text-lg font-black text-slate-900">
                R$ {state.orderSummary.total.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>QR Code dinâmico válido por 30 minutos</span>
              </div>
            </div>

            {/* COPY & PASTE BUTTON */}
            <div className="w-full space-y-2">
              <label className="block text-[11px] font-bold text-slate-500 uppercase text-center">
                Ou utilize o Código Copia e Cola
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={
                    paymentResult?.pixCopyPaste ||
                    '00020101021226830014br.gov.bcb.pix2561pix.brandplus.com.br/qr/v2/pay_9182'
                  }
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-600 font-mono select-all focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREDIT CARD VIEW */}
      {state.payment.method === 'credit_card' && (
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Validando com a operadora de cartão...</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Estamos recebendo a confirmação do gateway bancário. Assim que aprovado, o ambiente será liberado.
          </p>
        </div>
      )}

      {/* BANK SLIP VIEW */}
      {state.payment.method === 'bank_slip' && (
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-orange-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Boleto Bancário Emitido</h4>
              <p className="text-xs text-slate-500">Vencimento em 3 dias úteis</p>
            </div>
          </div>
          <button
            type="button"
            className="w-full py-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-orange-600" />
            <span>Baixar Boleto em PDF (Exemplo)</span>
          </button>
        </div>
      )}

      {/* SIMULATE PAYMENT CONFIRMATION (DEV / PREVIEW MODE) */}
      <div className="p-5 bg-orange-50/80 border border-orange-200 rounded-2xl space-y-3">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-xs font-extrabold text-orange-950">
              Simulador de Confirmação do Gateway (Ambiente de Teste)
            </div>
            <p className="text-[11px] text-orange-800 leading-relaxed">
              No ambiente real, o webhook bancário notifica o backend automaticamente em milissegundos. Para testar o fluxo completo de ativação agora, clique no botão abaixo:
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={isConfirming}
          onClick={handleSimulatePayment}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isConfirming ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Confirmando ativação com o gateway...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Simular Pagamento Confirmado & Ativar SaaS</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
