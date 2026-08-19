import { apiClient } from './api';
import { Tenant, ProvisioningStatus, SaaSAccess } from '../types';

class TenantService {
  /**
   * Fetches authoritative SaaS access authorization directly from backend:
   * GET /api/v1/saas/access
   */
  async fetchSaaSAccess(): Promise<SaaSAccess> {
    const data = await apiClient.get<any>('/saas/access');

    return {
      accessEnabled: !!data.accessEnabled,
      hasAccess: !!data.accessEnabled,
      accessUrl: data.accessUrl || null,
      saasAppUrl: data.accessUrl || '',
      tenantId: data.tenantId,
      tenantSlug: data.tenantSlug,
      subscriptionStatus: data.subscriptionStatus || 'inactive',
      provisioningStatus: data.provisioningStatus || 'pending',
      message: data.reason || (data.accessEnabled ? 'Acesso liberado' : 'Acesso indisponível'),
      reason: data.reason,
      authProvider: 'sso_oidc',
    };
  }

  async getProvisioningStatus(tenantId: string): Promise<ProvisioningStatus> {
    const data = await apiClient.get<any>(`/provisioning/${tenantId}`);
    return data.provisioningStatus || 'pending';
  }

  async requestSaaSLoginSession(): Promise<string> {
    const access = await this.fetchSaaSAccess();
    if (!access.accessEnabled || !access.accessUrl) {
      throw new Error(access.message || 'Acesso indisponível no momento.');
    }
    return access.accessUrl;
  }
}

export const tenantService = new TenantService();
