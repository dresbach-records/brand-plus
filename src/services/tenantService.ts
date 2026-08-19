import { Tenant, ProvisioningStatus, SaaSAccess, SubscriptionStatus } from '../types';
import { SAAS_APP_URL } from '../config/env';

class TenantService {
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
   * Evaluates if customer is allowed to access the external operational SaaS.
   * STRICT RULE: Access is only granted when:
   * subscription === 'active' (or 'trialing') AND provisioning === 'ready'.
   */
  checkSaaSAccess(
    subscriptionStatus: SubscriptionStatus,
    provisioningStatus: ProvisioningStatus,
    tenantSlug?: string
  ): SaaSAccess {
    if (subscriptionStatus === 'pending') {
      return {
        hasAccess: false,
        reason: 'Acesso será liberado após a confirmação do pagamento.',
        saasAppUrl: SAAS_APP_URL,
        tenantSlug,
        authProvider: 'sso_oidc',
        provisioningStatus,
        subscriptionStatus,
      };
    }

    if (subscriptionStatus === 'past_due') {
      return {
        hasAccess: false,
        reason: 'Assinatura com pagamento pendente. Regularize sua fatura para reativar o acesso.',
        saasAppUrl: SAAS_APP_URL,
        tenantSlug,
        authProvider: 'sso_oidc',
        provisioningStatus,
        subscriptionStatus,
      };
    }

    if (subscriptionStatus === 'suspended' || subscriptionStatus === 'cancelled' || subscriptionStatus === 'expired') {
      return {
        hasAccess: false,
        reason: 'Assinatura inativa ou cancelada. Contrate um novo plano para reativar seu ambiente.',
        saasAppUrl: SAAS_APP_URL,
        tenantSlug,
        authProvider: 'sso_oidc',
        provisioningStatus,
        subscriptionStatus,
      };
    }

    if (provisioningStatus !== 'ready') {
      return {
        hasAccess: false,
        reason: 'Seu ambiente BRAND+ está sendo provisionado pela infraestrutura. Aguarde alguns instantes.',
        saasAppUrl: SAAS_APP_URL,
        tenantSlug,
        authProvider: 'sso_oidc',
        provisioningStatus,
        subscriptionStatus,
      };
    }

    // Access Granted
    return {
      hasAccess: true,
      saasAppUrl: tenantSlug ? `${SAAS_APP_URL}` : SAAS_APP_URL,
      tenantSlug,
      authProvider: 'sso_oidc',
      provisioningStatus: 'ready',
      subscriptionStatus: 'active',
    };
  }

  /**
   * Generates secure SSO / OIDC authentication redirection.
   * Strictly avoids putting raw passwords or unencrypted tokens in URL queries.
   */
  async requestSaaSLoginSession(tenantSlug: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    // In production, this requests an ephemeral SSO token/handshake exchange from POST /api/v1/auth/sso/session
    return `${SAAS_APP_URL}`;
  }
}

export const tenantService = new TenantService();
