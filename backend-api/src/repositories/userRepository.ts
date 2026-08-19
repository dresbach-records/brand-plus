import prisma from '../database/prisma';
import { UserRole } from '@prisma/client';

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { tenant: true },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { tenant: true },
    });
  }

  async findByTenant(tenantId: string) {
    return prisma.user.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        phone: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(data: {
    tenantId: string;
    email: string;
    name: string;
    passwordHash: string;
    role?: UserRole;
    phone?: string;
  }) {
    return prisma.user.create({
      data: {
        tenantId: data.tenantId,
        email: data.email,
        name: data.name,
        passwordHash: data.passwordHash,
        role: data.role || 'owner',
        phone: data.phone,
      },
    });
  }

  async update(id: string, data: { name?: string; role?: UserRole; status?: string; phone?: string }) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
