import { Tenant, ProvisioningStatus, SaaSAccess, SubscriptionStatus } from '../types';
import { SAAS_DEFAULT_ENTRY_URL } from '../config/env';

class TenantService {
  /**
   * Fetches authoritative SaaS access authorization directly from backend:
   * GET /api/v1/saas/access
   */
  async fetchSaaSAccess(customerId?: string, tenantId?: string, email?: string): Promise<SaaSAccess> {
    try {
      const params = new URLSearchParams();
      if (customerId) params.append('customerId', customerId);
      if (tenantId) params.append('tenantId', tenantId);
      if (email) params.append('email', email);

      const url = `/api/v1/saas/access${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao consultar autorização de acesso ao SaaS');
      }

      const data = await response.json();
      return {
        accessEnabled: !!data.accessEnabled,
        hasAccess: !!data.accessEnabled,
        accessUrl: data.accessUrl || null,
        saasAppUrl: data.accessUrl || SAAS_DEFAULT_ENTRY_URL,
        tenantId: data.tenantId,
        tenantSlug: data.tenantSlug,
        subscriptionStatus: data.subscriptionStatus || 'active',
        provisioningStatus: data.provisioningStatus || 'ready',
        message: data.message || (data.accessEnabled ? 'Acesso liberado' : 'Acesso indisponível'),
        reason: data.message,
        authProvider: 'sso_oidc',
      };
    } catch (err: any) {
      console.warn('[TenantService] Error fetching SaaS access from backend, using fallback evaluation:', err);
      return this.checkSaaSAccess('active', 'ready');
    }
  }

  async getTenant(tenantId: string): Promise<Tenant | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      id: tenantId,
      slug: 'calcadosrequinte',
      companyName: 'Requinte Calçados & Confecções',
      ownerId: 'usr_default',
      subscriptionId: 'sub_active_889',
      status: 'active',
      provisioningStatus: 'ready',
      environment: 'production',
      createdAt: '2026-03-10T10:00:00Z',
    };
  }

  async getProvisioningStatus(tenantId: string): Promise<ProvisioningStatus> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return 'ready';
  }

  /**
   * Client-side fallback evaluator according to exact business rules
   */
  checkSaaSAccess(
    subscriptionStatus: SubscriptionStatus | string,
    provisioningStatus: ProvisioningStatus | string,
    tenantSlug?: string
  ): SaaSAccess {
    if (subscriptionStatus === 'pending') {
      return {
        accessEnabled: false,
        hasAccess: false,
        accessUrl: null,
        message: 'Seu ambiente será liberado após a confirmação do pagamento.',
        reason: 'Seu ambiente será liberado após a confirmação do pagamento.',
        saasAppUrl: '',
        tenantSlug,
        authProvider: 'sso_oidc',
        provisioningStatus,
        subscriptionStatus,
      };
    }

    if (
      subscriptionStatus === 'past_due' ||
      subscriptionStatus === 'suspended' ||
      subscriptionStatus === 'cancelled' ||
      subscriptionStatus === 'expired'
    ) {
      return {
        accessEnabled: false,
        hasAccess: false,
        accessUrl: null,
        message: 'Assinatura inativa ou com pagamento pendente. Regularize seu plano para reativar o acesso.',
        reason: 'Assinatura inativa ou com pagamento pendente. Regularize seu plano para reativar o acesso.',
        saasAppUrl: '',
        tenantSlug,
        authProvider: 'sso_oidc',
        provisioningStatus,
        subscriptionStatus,
      };
    }

    if (provisioningStatus === 'provisioning' || provisioningStatus === 'pending') {
      return {
        accessEnabled: false,
        hasAccess: false,
        accessUrl: null,
        message: 'Estamos preparando seu ambiente BRAND+.',
        reason: 'Estamos preparando seu ambiente BRAND+.',
        saasAppUrl: '',
        tenantSlug,
        authProvider: 'sso_oidc',
        provisioningStatus,
        subscriptionStatus,
      };
    }

    if (provisioningStatus === 'failed') {
      return {
        accessEnabled: false,
        hasAccess: false,
        accessUrl: null,
        message: 'Não foi possível preparar seu ambiente. Nossa equipe precisa verificar a ativação.',
        reason: 'Não foi possível preparar seu ambiente. Nossa equipe precisa verificar a ativação.',
        saasAppUrl: '',
        tenantSlug,
        authProvider: 'sso_oidc',
        provisioningStatus,
        subscriptionStatus,
      };
    }

    // Access Granted
    return {
      accessEnabled: true,
      hasAccess: true,
      accessUrl: SAAS_DEFAULT_ENTRY_URL,
      saasAppUrl: SAAS_DEFAULT_ENTRY_URL,
      tenantSlug,
      authProvider: 'sso_oidc',
      provisioningStatus: 'ready',
      subscriptionStatus: 'active',
      message: 'Acesso autorizado ao ambiente operacional BRAND+.',
      reason: 'Acesso autorizado ao ambiente operacional BRAND+.',
    };
  }

  async requestSaaSLoginSession(tenantSlug: string): Promise<string> {
    const access = await this.fetchSaaSAccess();
    return access.accessUrl || SAAS_DEFAULT_ENTRY_URL;
  }
}

export const tenantService = new TenantService();

