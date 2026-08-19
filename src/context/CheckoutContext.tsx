import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  AccountFormData,
  CompanyFormData,
  PaymentFormData,
  PlanTierId,
  BillingCycle,
  CheckoutState,
  PaymentSessionResponse,
  PageRoute,
} from '../types';
import { PLAN_CATALOG, getPlanById } from '../data/planCatalog';
import { authService } from '../services/authService';
import { customerService } from '../services/customerService';
import { subscriptionService } from '../services/subscriptionService';
import { paymentService } from '../services/paymentService';

interface CheckoutContextType {
  state: CheckoutState;
  setAccount: (account: Partial<AccountFormData>) => void;
  setCompany: (company: Partial<CompanyFormData>) => void;
  setPlan: (planId: PlanTierId) => void;
  setBillingCycle: (cycle: BillingCycle) => void;
  setPayment: (payment: Partial<PaymentFormData>) => void;
  setAcceptedContract: (accepted: boolean) => void;
  submitOrder: () => Promise<PaymentSessionResponse>;
  isSubmitting: boolean;
  paymentResult: PaymentSessionResponse | null;
  confirmSimulatedPayment: () => Promise<void>;
  resetCheckout: () => void;
}

const initialAccount: AccountFormData = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
};

const initialCompany: CompanyFormData = {
  corporateName: '',
  tradeName: '',
  cnpj: '',
  phone: '',
  commercialEmail: '',
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  segment: 'Moda & Calçados',
  storeCount: '1 loja',
  estimatedProducts: 'Até 500 produtos',
  hasEcommerce: false,
  hasERP: false,
};

const initialPayment: PaymentFormData = {
  method: 'pix',
  creditCard: {
    holderName: '',
    numberMasked: '',
    expiryDate: '',
    installments: 1,
  },
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccountState] = useState<AccountFormData>(() => {
    // Only non-sensitive profile info can be cached in session if present
    try {
      const saved = sessionStorage.getItem('brandplus_checkout_account');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialAccount, ...parsed, password: '', confirmPassword: '' };
      }
    } catch {}
    return initialAccount;
  });

  const [company, setCompanyState] = useState<CompanyFormData>(() => {
    try {
      const saved = sessionStorage.getItem('brandplus_checkout_company');
      if (saved) return { ...initialCompany, ...JSON.parse(saved) };
    } catch {}
    return initialCompany;
  });

  const [planId, setPlanId] = useState<PlanTierId>('growth');
  const [billingCycle, setBillingCycleState] = useState<BillingCycle>('annual');
  const [payment, setPaymentState] = useState<PaymentFormData>(initialPayment);
  const [acceptedContract, setAcceptedContract] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentSessionResponse | null>(null);

  // Sync non-sensitive drafts safely to sessionStorage (never passwords!)
  useEffect(() => {
    const { password, confirmPassword, ...safeAccount } = account;
    try {
      sessionStorage.setItem('brandplus_checkout_account', JSON.stringify(safeAccount));
    } catch {}
  }, [account]);

  useEffect(() => {
    try {
      sessionStorage.setItem('brandplus_checkout_company', JSON.stringify(company));
    } catch {}
  }, [company]);

  const setAccount = (patch: Partial<AccountFormData>) => {
    setAccountState((prev) => ({ ...prev, ...patch }));
  };

  const setCompany = (patch: Partial<CompanyFormData>) => {
    setCompanyState((prev) => ({ ...prev, ...patch }));
  };

  const setPlan = (id: PlanTierId) => {
    setPlanId(id);
  };

  const setBillingCycle = (cycle: BillingCycle) => {
    setBillingCycleState(cycle);
  };

  const setPayment = (patch: Partial<PaymentFormData>) => {
    setPaymentState((prev) => ({ ...prev, ...patch }));
  };

  // Live order calculations
  const orderSummary = useMemo(() => {
    const selectedPlan = getPlanById(planId);
    if (billingCycle === 'annual') {
      const monthlyRegular = selectedPlan.priceMonthly * 12;
      const total = selectedPlan.annualBilledTotal;
      const annualSavings = monthlyRegular - total;
      return {
        subtotal: monthlyRegular,
        discount: annualSavings,
        total: total,
        annualSavings: annualSavings,
      };
    } else {
      return {
        subtotal: selectedPlan.priceMonthly,
        discount: 0,
        total: selectedPlan.priceMonthly,
        annualSavings: (selectedPlan.priceMonthly - selectedPlan.priceAnnualMonthlyEquivalent) * 12,
      };
    }
  }, [planId, billingCycle]);

  const submitOrder = async (): Promise<PaymentSessionResponse> => {
    setIsSubmitting(true);
    try {
      // Try posting to Neon PostgreSQL backend API
      try {
        const dbRes = await fetch('/api/v1/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            account,
            company,
            planId,
            billingCycle,
            payment,
            orderSummary,
          }),
        });

        if (dbRes.ok) {
          const dbData = await dbRes.json();
          console.log('[Checkout] Saved to Neon PostgreSQL:', dbData);
        }
      } catch (dbErr) {
        console.warn('[Checkout] Failed to reach /api/v1/checkout, fallback to provider:', dbErr);
      }

      // 1. Create account locally/services
      const authRes = await authService.register({
        fullName: account.fullName,
        email: account.email,
        phone: account.phone,
        password: account.password,
      });

      // 2. Register company
      const compRes = await customerService.registerCompany(company, authRes.customer.id);

      // 3. Create initial pending subscription
      await subscriptionService.createSubscription({
        customerId: authRes.customer.id,
        companyId: compRes.id,
        planId: planId,
        billingCycle: billingCycle,
        paymentMethodType: payment.method,
      });

      // 4. Request payment session
      const payRes = await paymentService.createCheckout({
        customerId: authRes.customer.id,
        customerName: account.fullName,
        customerEmail: account.email,
        customerPhone: account.phone,
        companyCnpj: company.cnpj,
        companyName: company.tradeName || company.corporateName,
        planId: planId,
        billingCycle: billingCycle,
        paymentMethod: payment.method,
        cardToken: payment.creditCard?.token,
      });

      setPaymentResult(payRes);
      return payRes;
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmSimulatedPayment = async () => {
    if (!paymentResult) return;
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPaymentResult((prev) => (prev ? { ...prev, status: 'paid' } : null));
  };

  const resetCheckout = () => {
    setAccountState(initialAccount);
    setCompanyState(initialCompany);
    setPlanId('growth');
    setBillingCycleState('annual');
    setPaymentState(initialPayment);
    setAcceptedContract(false);
    setPaymentResult(null);
    try {
      sessionStorage.removeItem('brandplus_checkout_account');
      sessionStorage.removeItem('brandplus_checkout_company');
    } catch {}
  };

  const state: CheckoutState = {
    currentStep: 'account',
    account,
    company,
    planId,
    billingCycle,
    payment,
    acceptedContract,
    orderSummary,
  };

  return (
    <CheckoutContext.Provider
      value={{
        state,
        setAccount,
        setCompany,
        setPlan,
        setBillingCycle,
        setPayment,
        setAcceptedContract,
        submitOrder,
        isSubmitting,
        paymentResult,
        confirmSimulatedPayment,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
