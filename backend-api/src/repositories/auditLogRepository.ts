import prisma from '../database/prisma';

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
