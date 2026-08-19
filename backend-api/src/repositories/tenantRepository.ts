import prisma from '../database/prisma';
import { ProvisioningStatus } from '@prisma/client';

export class TenantRepository {
  async findById(id: string) {
    return prisma.tenant.findUnique({
      where: { id },
      include: {
        companies: true,
        subscriptions: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.tenant.findUnique({
      where: { slug },
    });
  }

  async create(data: { name: string; slug: string; environment?: string }) {
    return prisma.tenant.create({
      data: {
        name: data.name,
        slug: data.slug,
        environment: data.environment || 'production',
        provisioningStatus: ProvisioningStatus.pending,
      },
    });
  }

  async updateProvisioningStatus(id: string, status: ProvisioningStatus, databaseHost?: string) {
    return prisma.tenant.update({
      where: { id },
      data: {
        provisioningStatus: status,
        ...(databaseHost ? { databaseHost } : {}),
      },
    });
  }
}
