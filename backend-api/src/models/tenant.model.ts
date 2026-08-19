export type ProvisioningStatus = 'pending' | 'provisioning' | 'ready' | 'failed';

export interface TenantModel {
  id: string;
  ownerId: string;
  companyId?: string | null;
  slug: string;
  clusterRegion: string;
  databaseHost?: string | null;
  environment: string;
  status: string;
  provisioningStatus: ProvisioningStatus;
  createdAt: Date;
  updatedAt: Date;
}
