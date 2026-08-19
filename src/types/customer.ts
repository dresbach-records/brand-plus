export type SubscriptionStatus =
  | 'pending'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'suspended'
  | 'cancelled'
  | 'expired';

export type ProvisioningStatus = 'pending' | 'provisioning' | 'ready' | 'failed';

export type PaymentStatus = 'pending' | 'processing' | 'paid' | 'failed' | 'cancelled' | 'refunded';

export type PaymentMethodType = 'pix' | 'credit_card' | 'bank_slip';

export type BillingCycle = 'monthly' | 'annual';

export type UserRole = 'owner' | 'admin' | 'billing' | 'manager';

export type PlanTierId = 'start' | 'growth' | 'pro' | 'enterprise';

export interface SubscriptionPlan {
  id: PlanTierId;
  name: string;
  badge?: string;
  tagline: string;
  description: string;
  priceMonthly: number;
  priceAnnualMonthlyEquivalent: number; // e.g. 199/mo when billed annually
  annualBilledTotal: number;
  setupFee: number;
  isPopular?: boolean;
  limits: {
    products: string;
    users: string;
    stores: string;
    pageviews: string;
  };
  features: string[];
  ctaText: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface Company {
  id: string;
  corporateName: string; // Razão Social
  tradeName: string; // Nome Fantasia
  cnpj: string;
  phone: string;
  email: string;
  address: {
    zipCode: string; // CEP
    street: string;
    number: string;
    complement?: string;
    neighborhood: string; // Bairro
    city: string;
    state: string; // UF
  };
  segment?: string;
  storeCount?: string;
  estimatedProducts?: string;
  hasEcommerce?: boolean;
  hasERP?: boolean;
}

export interface Subscription {
  id: string;
  customerId: string;
  companyId: string;
  planId: PlanTierId;
  planName: string;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  currentPrice: number;
  startDate: string;
  nextBillingDate: string;
  paymentMethod: {
    type: PaymentMethodType;
    details: string; // e.g., 'Mastercard terminando em 4821' or 'PIX Automático'
  };
  cancelAtPeriodEnd?: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  subscriptionId: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'refunded' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paymentDate?: string;
  paymentMethod: PaymentMethodType;
  pdfUrl?: string;
  receiptUrl?: string;
  planName: string;
}

export interface Tenant {
  id: string;
  slug: string;
  companyName: string;
  ownerId: string;
  subscriptionId: string;
  status: 'active' | 'suspended' | 'provisioning';
  provisioningStatus: ProvisioningStatus;
  environment: 'production' | 'staging';
  createdAt: string;
}

export interface SaaSAccess {
  hasAccess: boolean;
  reason?: string;
  saasAppUrl: string;
  tenantSlug?: string;
  authProvider: 'sso_oidc';
  provisioningStatus: ProvisioningStatus;
  subscriptionStatus: SubscriptionStatus;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'invited' | 'disabled';
  lastAccess: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordLastChanged: string;
  activeSessions: {
    id: string;
    device: string;
    browser: string;
    location: string;
    ipAddress: string;
    lastActive: string;
    isCurrent: boolean;
  }[];
  auditLogs: {
    id: string;
    action: string;
    user: string;
    timestamp: string;
    ipAddress: string;
  }[];
}

// Checkout Types
export interface AccountFormData {
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  acceptedTerms: boolean;
}

export interface CompanyFormData {
  corporateName: string;
  tradeName: string;
  cnpj: string;
  phone: string;
  commercialEmail: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  segment?: string;
  storeCount?: string;
  estimatedProducts?: string;
  hasEcommerce?: boolean;
  hasERP?: boolean;
}

export interface PaymentFormData {
  method: PaymentMethodType;
  creditCard?: {
    holderName: string;
    numberMasked: string;
    expiryDate: string;
    installments: number;
    token?: string;
  };
  pix?: {
    qrCodeBase64?: string;
    copyPasteCode?: string;
    expiresAt?: string;
  };
  bankSlip?: {
    barcode?: string;
    digitableLine?: string;
    dueDate?: string;
  };
}

export interface CheckoutState {
  currentStep: 'account' | 'company' | 'plan' | 'payment' | 'review' | 'processing' | 'success';
  account: AccountFormData;
  company: CompanyFormData;
  planId: PlanTierId;
  billingCycle: BillingCycle;
  payment: PaymentFormData;
  acceptedContract: boolean;
  orderSummary: {
    subtotal: number;
    discount: number;
    total: number;
    annualSavings: number;
  };
}

export interface PaymentSessionResponse {
  paymentId: string;
  subscriptionId: string;
  tenantId?: string;
  status: PaymentStatus;
  pixQrCode?: string;
  pixCopyPaste?: string;
  bankSlipUrl?: string;
  message?: string;
}
