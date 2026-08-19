import prisma from '../database/prisma';
import { Prisma } from '@prisma/client';

export class CheckoutRepository {
  async findById(id: string) {
    return prisma.checkoutSession.findUnique({
      where: { id },
      include: { plan: true, tenant: true },
    });
  }

  async create(data: {
    tenantId: string;
    planId: string;
    billingCycle: string;
    amount: Prisma.Decimal;
    customerEmail: string;
    customerName: string;
    customerCnpjCpf?: string;
    expiresAt: Date;
  }) {
    return prisma.checkoutSession.create({
      data,
    });
  }

  async updateStatus(id: string, status: string) {
    return prisma.checkoutSession.update({
      where: { id },
      data: { status },
    });
  }
}

export class AuditLogRepository {
  async create(data: {
    tenantId?: string;
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    details?: string;
    ipAddress?: string;
  }) {
    return prisma.auditLog.create({
      data,
    });
  }
}

export class RefreshTokenRepository {
  async create(userId: string, token: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: { userId, token, expiresAt },
    });
  }

  async findByToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async revoke(token: string) {
    return prisma.refreshToken.update({
      where: { token },
      data: { revoked: true },
    });
  }
}
