import React from 'react';
import { PageRoute } from '../../types';
import { BrandLogo } from '../brand/Logo';
import { CheckoutStepper } from './CheckoutStepper';
import { OrderSummary } from './OrderSummary';
import { ShieldCheck, Lock, ArrowLeft, Headphones } from 'lucide-react';

interface CheckoutLayoutProps {
  children: React.ReactNode;
  currentStep: 'conta' | 'empresa' | 'plano' | 'pagamento' | 'revisao' | 'processando' | 'sucesso';
  navigate: (route: PageRoute) => void;
  showSidebar?: boolean;
}

export const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  children,
  currentStep,
  navigate,
  showSidebar = true,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* CHECKOUT HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <BrandLogo size="sm" />
            </button>
            <div className="hidden sm:block h-5 w-px bg-slate-200" />
            <span className="hidden sm:inline-block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Assinatura & Onboarding Comercial
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Lock className="w-3.5 h-3.5" />
              <span className="font-semibold text-[11px]">Ambiente Seguro</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/planos')}
              className="hidden md:flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver todos os planos</span>
            </button>
          </div>
        </div>
      </header>

      {/* STEPPER PROGRESS */}
      {currentStep !== 'sucesso' && currentStep !== 'processando' && (
        <CheckoutStepper currentStep={currentStep} navigate={navigate} />
      )}

      {/* MAIN CHECKOUT BODY */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className={`${showSidebar ? 'lg:col-span-7' : 'lg:col-span-12 max-w-3xl mx-auto w-full'}`}>
            {children}
          </div>

          {showSidebar && (
            <div className="lg:col-span-5">
              <OrderSummary navigate={navigate} />
            </div>
          )}
        </div>
      </main>

      {/* MINIMAL CHECKOUT FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 font-medium">
            <button onClick={() => navigate('/termos')} className="hover:underline">
              Termos de Uso
            </button>
            <span>•</span>
            <button onClick={() => navigate('/privacidade')} className="hover:underline">
              Política de Privacidade & LGPD
            </button>
            <span>•</span>
            <button onClick={() => navigate('/ajuda')} className="hover:underline">
              Central de Ajuda
            </button>
          </div>
          <p className="text-[10px] text-slate-400">
            BRAND+ Tecnologia e Serviços SaaS para o Varejo Ltda. CNPJ: 14.285.932/0001-84
          </p>
        </div>
      </footer>
    </div>
  );
};
