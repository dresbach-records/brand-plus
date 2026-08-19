import React, { useEffect } from 'react';
import { PageRoute } from '../../types';
import { useCheckout } from '../../context/CheckoutContext';
import { CheckoutLayout } from '../../components/checkout/CheckoutLayout';
import { AccountStep } from '../../components/checkout/AccountStep';
import { CompanyStep } from '../../components/checkout/CompanyStep';
import { PlanStep } from '../../components/checkout/PlanStep';
import { PaymentStep } from '../../components/checkout/PaymentStep';
import { ReviewStep } from '../../components/checkout/ReviewStep';
import { ProcessingStep } from '../../components/checkout/ProcessingStep';
import { SuccessStep } from '../../components/checkout/SuccessStep';

interface CustomerCheckoutPageProps {
  currentRoute: PageRoute;
  navigate: (route: PageRoute) => void;
}

export const CustomerCheckoutPage: React.FC<CustomerCheckoutPageProps> = ({
  currentRoute,
  navigate,
}) => {
  const { state } = useCheckout();

  // Determine current step from route
  const getStepFromRoute = (): 'conta' | 'empresa' | 'plano' | 'pagamento' | 'revisao' | 'processando' | 'sucesso' => {
    switch (currentRoute) {
      case '/cliente/checkout/empresa':
        return 'empresa';
      case '/cliente/checkout/plano':
        return 'plano';
      case '/cliente/checkout/pagamento':
        return 'pagamento';
      case '/cliente/checkout/revisao':
        return 'revisao';
      case '/cliente/checkout/processando':
        return 'processando';
      case '/cliente/checkout/sucesso':
        return 'sucesso';
      case '/cliente/checkout/conta':
      case '/cliente/checkout':
      default:
        return 'conta';
    }
  };

  const currentStep = getStepFromRoute();
  const showSidebar = currentStep !== 'sucesso' && currentStep !== 'processando';

  return (
    <CheckoutLayout currentStep={currentStep} navigate={navigate} showSidebar={showSidebar}>
      {currentStep === 'conta' && <AccountStep navigate={navigate} />}
      {currentStep === 'empresa' && <CompanyStep navigate={navigate} />}
      {currentStep === 'plano' && <PlanStep navigate={navigate} />}
      {currentStep === 'pagamento' && <PaymentStep navigate={navigate} />}
      {currentStep === 'revisao' && <ReviewStep navigate={navigate} />}
      {currentStep === 'processando' && <ProcessingStep navigate={navigate} />}
      {currentStep === 'sucesso' && <SuccessStep navigate={navigate} />}
    </CheckoutLayout>
  );
};
