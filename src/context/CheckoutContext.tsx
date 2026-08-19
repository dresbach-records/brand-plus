import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  AccountFormData,
  CompanyFormData,
  PaymentFormData,
  PlanTierId,
  BillingCycle,
  CheckoutState,
  PaymentSessionResponse,
} from '../types';
import { getPlanById } from '../data/planCatalog';
import { authService } from '../services/authService';
import { apiClient } from '../services/api';

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
      // 1. Register account & tenant via API
      await authService.register({
        fullName: account.fullName,
        email: account.email,
        phone: account.phone,
        password: account.password,
        storeName: company.tradeName || company.corporateName,
        cnpj: company.cnpj,
      });

      // 2. Create Checkout Session via API (calculated server-side)
      const session = await apiClient.post<any>('/checkout/sessions', {
        planCode: planId.toUpperCase(),
        billingCycle: billingCycle === 'annual' ? 'yearly' : 'monthly',
      });

      // 3. Process payment via API
      const payRes = await apiClient.post<any>('/payments/process', {
        checkoutSessionId: session.id,
        paymentMethod: payment.method,
      });

      const response: PaymentSessionResponse = {
        paymentId: payRes.paymentId,
        subscriptionId: session.id,
        tenantId: session.tenantId,
        status: payRes.status === 'approved' ? 'paid' : 'pending',
        pixQrCode: payRes.pixQrCode,
        pixCopyPaste: payRes.pixCopyPaste,
        bankSlipUrl: payRes.boletoUrl,
        message: 'Pedido finalizado com sucesso.',
      };

      setPaymentResult(response);
      return response;
    } finally {
      setIsSubmitting(false);
    }
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
