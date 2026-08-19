export interface SaaSAccessModel {
  accessEnabled: boolean;
  accessUrl: string | null;
  tenantId: string;
  tenantSlug?: string;
  subscriptionStatus: string;
  provisioningStatus: string;
  message: string;
  companyId?: string;
  authProtocol: string;
}

export interface SaaSAccessLogModel {
  id: string;
  customerId: string;
  tenantId: string;
  accessGranted: boolean;
  accessUrl?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  reason?: string | null;
  createdAt: Date;
}
