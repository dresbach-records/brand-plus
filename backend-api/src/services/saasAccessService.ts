import { saasConfig } from '../config/saas.config';
import { TenantRepository } from '../repositories/tenantRepository';
import { SubscriptionRepository } from '../repositories/subscriptionRepository';
import prisma from '../database/prisma';

const tenantRepository = new TenantRepository();
const subscriptionRepository = new SubscriptionRepository();

export class SaaSAccessService {
  async evaluateAccess(userId: string, tenantId: string, ipAddress?: string, userAgent?: string) {
    const tenant = await tenantRepository.findById(tenantId);
    const subscription = await subscriptionRepository.findActiveByTenant(tenantId);

    let accessGranted = false;
    let reason = 'Acesso liberado com sucesso.';

    if (!tenant) {
      accessGranted = false;
      reason = 'Tenant não encontrado.';
    } else if (!saasConfig.allowedTenantStatuses.includes(tenant.status)) {
      accessGranted = false;
      reason = `Tenant com status inválido: ${tenant.status}`;
    } else if (!saasConfig.allowedProvisioningStatuses.includes(tenant.provisioningStatus)) {
      accessGranted = false;
      reason = `Provisionamento do tenant pendente ou em andamento (${tenant.provisioningStatus}).`;
    } else if (!subscription || !saasConfig.allowedSubscriptionStatuses.includes(subscription.status)) {
      accessGranted = false;
      reason = `Assinatura inativa ou com pagamento pendente (${subscription?.status || 'sem assinatura'}).`;
    } else {
      accessGranted = true;
    }

    const accessUrl = accessGranted ? saasConfig.entryUrl : null;

    // Log SaaS access audit
    await prisma.saaSAccessLog.create({
      data: {
        tenantId,
        userId,
        accessGranted,
        accessUrl: accessUrl || undefined,
        ipAddress,
        userAgent,
        reason,
      },
    });

    return {
      accessEnabled: accessGranted,
      accessUrl,
      tenantId,
      subscriptionStatus: subscription?.status || 'inactive',
      provisioningStatus: tenant?.provisioningStatus || 'pending',
      reason: accessGranted ? undefined : reason,
    };
  }
}
