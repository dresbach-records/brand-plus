import { TenantRepository } from '../repositories/tenantRepository';
import { ProvisioningStatus } from '@prisma/client';
import { NotFoundError } from '../errors/AppError';

const tenantRepository = new TenantRepository();

export class ProvisioningService {
  async getStatus(tenantId: string) {
    const tenant = await tenantRepository.findById(tenantId);
    if (!tenant) {
      throw new NotFoundError('Tenant não encontrado.');
    }
    return {
      tenantId: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      provisioningStatus: tenant.provisioningStatus,
      databaseHost: tenant.databaseHost,
      clusterRegion: tenant.clusterRegion,
      environment: tenant.environment,
    };
  }

  async triggerProvisioning(tenantId: string) {
    const tenant = await tenantRepository.findById(tenantId);
    if (!tenant) {
      throw new NotFoundError('Tenant não encontrado.');
    }

    // Set to provisioning state
    await tenantRepository.updateProvisioningStatus(tenantId, ProvisioningStatus.provisioning);

    // Simulate provisioning workflow execution (cluster allocation, DB schema creation)
    const dbHost = `tenant-${tenant.slug}.db.brandplus.com.br`;
    
    // In production, this invokes Cloud API / Kubernetes operator.
    // For fast completion in API execution:
    await tenantRepository.updateProvisioningStatus(tenantId, ProvisioningStatus.ready, dbHost);

    return {
      tenantId: tenant.id,
      provisioningStatus: ProvisioningStatus.ready,
      databaseHost: dbHost,
    };
  }
}
