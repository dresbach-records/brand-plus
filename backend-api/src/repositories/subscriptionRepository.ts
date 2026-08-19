import prisma from '../database/prisma';
import { SubscriptionStatus, Prisma } from '@prisma/client';

export class SubscriptionRepository {
  async findActiveByTenant(tenantId: string) {
    return prisma.subscription.findFirst({
      where: {
        tenantId,
        status: { in: [SubscriptionStatus.active, SubscriptionStatus.trialing] },
      },
      include: { plan: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findLatestByTenant(tenantId: string) {
    return prisma.subscription.findFirst({
      where: { tenantId },
      include: { plan: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.subscription.findUnique({
      where: { id },
      include: { plan: true, tenant: true },
    });
  }

  async create(data: {
    tenantId: string;
    planId: string;
    planName: string;
    billingCycle: string;
    priceMonthly: Prisma.Decimal;
    priceYearly: Prisma.Decimal;
    status: SubscriptionStatus;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
  }) {
    return prisma.subscription.create({
      data,
      include: { plan: true, tenant: true },
    });
  }

  async updateStatus(id: string, status: SubscriptionStatus) {
    return prisma.subscription.update({
      where: { id },
      data: { status },
    });
  }

  async updatePlan(id: string, data: { planId: string; planName: string; priceMonthly: Prisma.Decimal; priceYearly: Prisma.Decimal; billingCycle?: string }) {
    return prisma.subscription.update({
      where: { id },
      data,
    });
  }
}
