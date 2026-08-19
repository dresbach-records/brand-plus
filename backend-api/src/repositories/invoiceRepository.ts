import prisma from '../database/prisma';
import { InvoiceStatus, Prisma } from '@prisma/client';

export class InvoiceRepository {
  async findByTenant(tenantId: string) {
    return prisma.invoice.findMany({
      where: { tenantId },
      include: { company: true },
      orderBy: { issueDate: 'desc' },
    });
  }

  async findById(id: string, tenantId: string) {
    return prisma.invoice.findFirst({
      where: { id, tenantId },
      include: { company: true, subscription: true, payment: true },
    });
  }

  async create(data: {
    tenantId: string;
    companyId?: string;
    subscriptionId?: string;
    paymentId?: string;
    amount: Prisma.Decimal;
    currency?: string;
    status: InvoiceStatus;
    paymentMethod?: string;
    issueDate?: Date;
    dueDate: Date;
    paidAt?: Date;
    pdfUrl?: string;
  }) {
    return prisma.invoice.create({
      data,
    });
  }
}
