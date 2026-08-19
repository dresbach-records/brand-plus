import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Customer,
  Company,
  Subscription,
  Tenant,
  Invoice,
  UserAccount,
  SecuritySettings,
  PlanTierId,
  BillingCycle,
  SaaSAccess,
} from '../types';
import { tenantService } from '../services/tenantService';
import { subscriptionService } from '../services/subscriptionService';
import { billingService } from '../services/billingService';
import { authService } from '../services/authService';
import { customerService } from '../services/customerService';
import { getAccessToken } from '../services/api';

interface CustomerContextType {
  customer: Customer | null;
  company: Company | null;
  subscription: Subscription | null;
  tenant: Tenant | null;
  invoices: Invoice[];
  users: UserAccount[];
  securitySettings: SecuritySettings;
  saasAccess: SaaSAccess | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  updateCompany: (data: Partial<Company>) => Promise<void>;
  changeSubscriptionPlan: (newPlanId: PlanTierId, cycle: BillingCycle) => Promise<void>;
  cancelSubscription: () => Promise<string>;
  refreshAll: () => Promise<void>;
  logout: () => Promise<void>;
}

const emptySecurity: SecuritySettings = {
  twoFactorEnabled: false,
  passwordLastChanged: 'Não alterada recentemente',
  activeSessions: [],
  auditLogs: [],
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [securitySettings] = useState<SecuritySettings>(emptySecurity);
  const [saasAccess, setSaaSAccess] = useState<SaaSAccess | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!customer && !!getAccessToken();

  const refreshAll = async () => {
    setIsLoading(true);
    try {
      if (!getAccessToken()) {
        setCustomer(null);
        setCompany(null);
        setSubscription(null);
        setTenant(null);
        setSaaSAccess(null);
        return;
      }

      const me = await authService.getMe();
      if (me?.customer) {
        setCustomer(me.customer);
        if (me.company) setCompany(me.company);
        if (me.tenant) setTenant(me.tenant);
      }

      // Fetch subscription from backend
      try {
        const sub = await subscriptionService.getMySubscription();
        setSubscription(sub);
      } catch {
        setSubscription(null);
      }

      // Fetch SaaS Access from backend
      try {
        const access = await tenantService.fetchSaaSAccess();
        setSaaSAccess(access);
      } catch {
        setSaaSAccess({
          accessEnabled: false,
          hasAccess: false,
          accessUrl: null,
          saasAppUrl: '',
          subscriptionStatus: 'inactive',
          provisioningStatus: 'pending',
          message: 'Não foi possível verificar a autorização do SaaS.',
          reason: 'Falha na requisição ao backend.',
        });
      }

      // Fetch invoices
      try {
        const invs = await billingService.getInvoices();
        setInvoices(invs);
      } catch {
        setInvoices([]);
      }

      // Fetch users
      try {
        const userList = await customerService.getUsers();
        setUsers(
          userList.map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            status: u.status,
            lastAccess: 'Recente',
          }))
        );
      } catch {
        setUsers([]);
      }
    } catch {
      setCustomer(null);
      setCompany(null);
      setSubscription(null);
      setTenant(null);
      setSaaSAccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const updateCompany = async (data: Partial<Company>) => {
    const updated = await customerService.updateCompany(company?.id || '', data);
    setCompany(updated);
  };

  const changeSubscriptionPlan = async (newPlanId: PlanTierId, cycle: BillingCycle) => {
    if (!subscription) return;
    setIsLoading(true);
    try {
      const updated = await subscriptionService.changePlan(subscription.id, newPlanId, cycle);
      setSubscription(updated);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = async () => {
    if (!subscription) return '';
    const result = await subscriptionService.cancelSubscription(subscription.id);
    setSubscription((prev) => (prev ? { ...prev, status: 'cancelled' } : null));
    return result.effectiveUntil;
  };

  const logout = async () => {
    await authService.logout();
    setCustomer(null);
    setCompany(null);
    setSubscription(null);
    setTenant(null);
    setSaaSAccess(null);
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
        isAuthenticated,
        updateCompany,
        changeSubscriptionPlan,
        cancelSubscription,
        refreshAll,
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
    throw new Error('useCustomer deve ser utilizado dentro de um CustomerProvider');
  }
  return context;
};
