import { config } from './index';

export const saasConfig = {
  entryUrl: config.saasEntryUrl,
  baseUrl: config.saasBaseUrl,
  allowedSubscriptionStatuses: ['active', 'trialing'],
  allowedTenantStatuses: ['active'],
  allowedProvisioningStatuses: ['ready'],
};
