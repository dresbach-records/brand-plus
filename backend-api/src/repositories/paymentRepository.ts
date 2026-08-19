import prisma from '../database/prisma';
import { PaymentStatus, Prisma } from '@prisma/client';

export class PaymentRepository {
  async findByTenant(tenantId: string) {
    return prisma.payment.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByTransactionId(transactionId: string) {
    return prisma.payment.findUnique({
      where: { transactionId },
    });
  }

  async create(data: {
    tenantId: string;
    subscriptionId?: string;
    checkoutSessionId?: string;
    amount: Prisma.Decimal;
    currency?: string;
    status: PaymentStatus;
    paymentMethod: string;
    gateway?: string;
    transactionId?: string;
    paidAt?: Date;
  }) {
    return prisma.payment.create({
      data,
    });
  }

  async updateStatus(id: string, status: PaymentStatus, paidAt?: Date) {
    return prisma.payment.update({
      where: { id },
      data: {
        status,
        ...(paidAt ? { paidAt } : {}),
      },
    });
  }
}
