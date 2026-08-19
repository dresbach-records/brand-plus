import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Customer,
  Company,
  Subscription,
  Tenant,
  Invoice,
  UserAccount,
  SecuritySettings,
  SubscriptionStatus,
  ProvisioningStatus,
  PlanTierId,
  BillingCycle,
  SaaSAccess,
} from '../types';
import { tenantService } from '../services/tenantService';
import { subscriptionService } from '../services/subscriptionService';
import { billingService } from '../services/billingService';
import { authService } from '../services/authService';

interface CustomerContextType {
  customer: Customer;
  company: Company;
  subscription: Subscription;
  tenant: Tenant;
  invoices: Invoice[];
  users: UserAccount[];
  securitySettings: SecuritySettings;
  saasAccess: SaaSAccess;
  isLoading: boolean;
  updateCompany: (data: Partial<Company>) => Promise<void>;
  changeSubscriptionPlan: (newPlanId: PlanTierId, cycle: BillingCycle) => Promise<void>;
  cancelSubscription: () => Promise<string>;
  setDemoStatus: (status: SubscriptionStatus, provStatus?: ProvisioningStatus) => void;
  refreshAll: () => Promise<void>;
  setSessionData: (data: {
    customer?: Customer;
    company?: Company;
    subscription?: Subscription;
    tenant?: Tenant;
    invoices?: Invoice[];
    users?: UserAccount[];
  }) => void;
  logout: () => void;
}

const defaultCustomer: Customer = {
  id: 'usr_carlos_991',
  name: 'Carlos Alberto Mendonça',
  email: 'carlos@calcadosrequinte.com.br',
  phone: '(11) 98452-1100',
  createdAt: '2026-03-10T10:00:00Z',
};

const defaultCompany: Company = {
  id: 'comp_requinte_001',
  corporateName: 'Requinte Calçados e Artigos de Couro Ltda',
  tradeName: 'Requinte Calçados',
  cnpj: '14.285.932/0001-84',
  phone: '(11) 3456-7890',
  email: 'financeiro@calcadosrequinte.com.br',
  address: {
    zipCode: '01310-200',
    street: 'Avenida Paulista',
    number: '1800',
    complement: 'Sala 402',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
  },
  segment: 'Moda & Calçados',
  storeCount: '2 lojas',
  estimatedProducts: '1.850 itens',
  hasEcommerce: true,
  hasERP: true,
};

const defaultSubscription: Subscription = {
  id: 'sub_active_889',
  customerId: 'usr_carlos_991',
  companyId: 'comp_requinte_001',
  planId: 'growth',
  planName: 'BRAND+ Growth',
  status: 'active',
  billingCycle: 'monthly',
  currentPrice: 329.0,
  startDate: '2026-03-10T10:00:00Z',
  nextBillingDate: '2026-09-10T10:00:00Z',
  paymentMethod: {
    type: 'pix',
    details: 'PIX Automático / QR Dinâmico',
  },
};

const defaultTenant: Tenant = {
  id: 'ten_requinte_01',
  slug: 'requinte-calcados',
  companyName: 'Requinte Calçados',
  ownerId: 'usr_carlos_991',
  subscriptionId: 'sub_active_889',
  status: 'active',
  provisioningStatus: 'ready',
  environment: 'production',
  createdAt: '2026-03-10T10:00:00Z',
};

const defaultUsers: UserAccount[] = [
  {
    id: 'u_1',
    name: 'Carlos Alberto Mendonça',
    email: 'carlos@calcadosrequinte.com.br',
    role: 'owner',
    status: 'active',
    lastAccess: 'Hoje às 10:14',
  },
  {
    id: 'u_2',
    name: 'Mariana Silveira (Gerente Operacional)',
    email: 'mariana@calcadosrequinte.com.br',
    role: 'manager',
    status: 'active',
    lastAccess: 'Ontem às 18:30',
  },
  {
    id: 'u_3',
    name: 'Roberto Dias (Contabilidade / Faturamento)',
    email: 'financeiro@calcadosrequinte.com.br',
    role: 'billing',
    status: 'active',
    lastAccess: '12 Ago 2026',
  },
];

const defaultSecurity: SecuritySettings = {
  twoFactorEnabled: true,
  passwordLastChanged: '15 de Julho de 2026',
  activeSessions: [
    {
      id: 'sess_1',
      device: 'MacBook Pro (macOS 15.4)',
      browser: 'Chrome 128.0',
      location: 'São Paulo, SP',
      ipAddress: '177.136.88.12',
      lastActive: 'Sessão atual ativa',
      isCurrent: true,
    },
    {
      id: 'sess_2',
      device: 'iPhone 15 Pro (iOS 19.1)',
      browser: 'Safari Mobile',
      location: 'São Paulo, SP',
      ipAddress: '177.136.88.12',
      lastActive: 'Hoje às 08:22',
      isCurrent: false,
    },
  ],
  auditLogs: [
    {
      id: 'log_1',
      action: 'Acesso autorizado ao Portal do Cliente',
      user: 'Carlos Alberto Mendonça',
      timestamp: 'Hoje, 10:14',
      ipAddress: '177.136.88.12',
    },
    {
      id: 'log_2',
      action: 'Fatura FAT-2026-00981 quitada via PIX',
      user: 'Sistema Automático de Conciliação',
      timestamp: 'Ontem, 14:00',
      ipAddress: 'Gateway Asaas/PIX',
    },
    {
      id: 'log_3',
      action: 'Alteração de dados cadastrais da empresa',
      user: 'Carlos Alberto Mendonça',
      timestamp: '10 Ago 2026',
      ipAddress: '177.136.88.12',
    },
  ],
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer>(defaultCustomer);
  const [company, setCompany] = useState<Company>(defaultCompany);
  const [subscription, setSubscription] = useState<Subscription>(defaultSubscription);
  const [tenant, setTenant] = useState<Tenant>(defaultTenant);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [users, setUsers] = useState<UserAccount[]>(defaultUsers);
  const [securitySettings] = useState<SecuritySettings>(defaultSecurity);
  const [isLoading, setIsLoading] = useState(false);
  const [saasAccess, setSaaSAccess] = useState<SaaSAccess>(() =>
    tenantService.checkSaaSAccess(defaultSubscription.status, defaultTenant.provisioningStatus, defaultTenant.slug)
  );

  const refreshSaaSAccess = async (customerId?: string, tenantId?: string, email?: string) => {
    try {
      const access = await tenantService.fetchSaaSAccess(customerId, tenantId, email);
      setSaaSAccess(access);
    } catch (e) {
      console.warn('[CustomerContext] Error checking live SaaS access:', e);
    }
  };

  const refreshAll = async () => {
    setIsLoading(true);
    try {
      // 1. Check local stored session
      const stored = authService.getCurrentSession();
      let queryParam = '';
      const cId = stored?.customer?.id || customer?.id;
      const cEmail = stored?.customer?.email || customer?.email;

      if (cId) {
        queryParam = `?customerId=${encodeURIComponent(cId)}`;
      } else if (cEmail) {
        queryParam = `?email=${encodeURIComponent(cEmail)}`;
      }

      // 2. Fetch live customer profile from Neon PostgreSQL API
      try {
        const profileRes = await fetch(`/api/v1/customer/profile${queryParam}`);
        if (profileRes.ok) {
          const data = await profileRes.json();
          if (data.customer) setCustomer(data.customer);
          if (data.company) setCompany(data.company);
          if (data.subscription) setSubscription(data.subscription);
          if (data.tenant) setTenant(data.tenant);
        }
      } catch (profileErr) {
        console.warn('[CustomerContext] Live profile fetch fallback:', profileErr);
      }

      // 3. Fetch authoritative SaaS access from backend (GET /api/v1/saas/access)
      await refreshSaaSAccess(cId, tenant?.id, cEmail);

      // 4. Fetch invoices
      const currentCompId = company?.id || 'comp_requinte_001';
      const invs = await billingService.getInvoices(currentCompId);
      setInvoices(invs);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Hydrate immediately from stored session if present
    const stored = authService.getCurrentSession();
    if (stored) {
      if (stored.customer) setCustomer(stored.customer);
      if (stored.company) setCompany(stored.company);
      if (stored.subscription) setSubscription(stored.subscription);
      if (stored.tenant) setTenant(stored.tenant);
      if (stored.invoices) setInvoices(stored.invoices);
      if (stored.users) setUsers(stored.users);
    }
    refreshAll();
  }, []);

  const updateCompany = async (data: Partial<Company>) => {
    setCompany((prev) => ({ ...prev, ...data }));
  };

  const changeSubscriptionPlan = async (newPlanId: PlanTierId, cycle: BillingCycle) => {
    setIsLoading(true);
    try {
      const updated = await subscriptionService.changePlan(subscription.id, newPlanId, cycle);
      setSubscription(updated);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = async () => {
    const result = await subscriptionService.cancelSubscription(subscription.id);
    setSubscription((prev) => ({ ...prev, status: 'cancelled' }));
    return result.effectiveUntil;
  };

  const setDemoStatus = (status: SubscriptionStatus, provStatus?: ProvisioningStatus) => {
    const newProv = provStatus || tenant.provisioningStatus;
    setSubscription((prev) => ({ ...prev, status }));
    if (provStatus) {
      setTenant((prev) => ({ ...prev, provisioningStatus: provStatus }));
    }
    setSaaSAccess(tenantService.checkSaaSAccess(status, newProv, tenant.slug));
  };

  const setSessionData = (data: {
    customer?: Customer;
    company?: Company;
    subscription?: Subscription;
    tenant?: Tenant;
    invoices?: Invoice[];
    users?: UserAccount[];
  }) => {
    if (data.customer) setCustomer(data.customer);
    if (data.company) setCompany(data.company);
    if (data.subscription) setSubscription(data.subscription);
    if (data.tenant) setTenant(data.tenant);
    if (data.invoices) setInvoices(data.invoices);
    if (data.users) setUsers(data.users);

    const existing = authService.getCurrentSession() || {
      token: `jwt_${Date.now()}`,
      customer: data.customer || defaultCustomer,
    };
    authService.saveSession({
      ...existing,
      customer: data.customer || existing.customer,
      company: data.company || existing.company,
      subscription: data.subscription || existing.subscription,
      tenant: data.tenant || existing.tenant,
      invoices: data.invoices || existing.invoices,
      users: data.users || existing.users,
    });
  };

  const logout = () => {
    authService.logout();
    setCustomer(defaultCustomer);
    setCompany(defaultCompany);
    setSubscription(defaultSubscription);
    setTenant(defaultTenant);
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        company,
        subscription,
        tenant,
        invoices,
        users,
        securitySettings,
        saasAccess,
        isLoading,
        updateCompany,
        changeSubscriptionPlan,
        cancelSubscription,
        setDemoStatus,
        refreshAll,
        setSessionData,
        logout,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
