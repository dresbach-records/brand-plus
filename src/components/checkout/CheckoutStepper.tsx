import React from 'react';
import { Check, User, Building, Layers, CreditCard, ClipboardCheck } from 'lucide-react';
import { PageRoute } from '../../types';

interface CheckoutStepperProps {
  currentStep: 'conta' | 'empresa' | 'plano' | 'pagamento' | 'revisao' | 'processando' | 'sucesso';
  navigate: (route: PageRoute) => void;
}

export const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ currentStep, navigate }) => {
  const steps = [
    { id: 'conta', label: '01 Conta', route: '/cliente/checkout/conta' as PageRoute, icon: User },
    { id: 'empresa', label: '02 Empresa', route: '/cliente/checkout/empresa' as PageRoute, icon: Building },
    { id: 'plano', label: '03 Plano', route: '/cliente/checkout/plano' as PageRoute, icon: Layers },
    { id: 'pagamento', label: '04 Pagamento', route: '/cliente/checkout/pagamento' as PageRoute, icon: CreditCard },
    { id: 'revisao', label: '05 Revisão', route: '/cliente/checkout/revisao' as PageRoute, icon: ClipboardCheck },
  ];

  const stepOrder = ['conta', 'empresa', 'plano', 'pagamento', 'revisao', 'processando', 'sucesso'];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="w-full bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-1">
            {steps.map((step, idx) => {
              const isCompleted = currentIndex > idx;
              const isCurrent = currentStep === step.id;
              const StepIcon = step.icon;

              return (
                <li key={step.id} className="flex-1 min-w-[120px] sm:min-w-0">
                  <button
                    type="button"
                    disabled={idx > currentIndex && currentStep !== 'sucesso'}
                    onClick={() => navigate(step.route)}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-all text-left ${
                      isCurrent
                        ? 'bg-orange-50/80 border border-orange-200'
                        : isCompleted
                        ? 'hover:bg-slate-50'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : isCurrent
                          ? 'bg-orange-600 text-white shadow-xs ring-2 ring-orange-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div className="min-w-0 truncate">
                      <div
                        className={`text-[11px] font-extrabold uppercase tracking-wider truncate ${
                          isCurrent
                            ? 'text-orange-950'
                            : isCompleted
                            ? 'text-slate-800'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label.replace(/^\d+\s/, '')}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {isCompleted ? 'Preenchido' : isCurrent ? 'Em andamento' : 'Etapa ' + (idx + 1)}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
