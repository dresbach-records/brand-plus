import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/userRepository';
import { CompanyRepository } from '../repositories/companyRepository';
import { TenantRepository } from '../repositories/tenantRepository';
import { UserRole } from '@prisma/client';
import { ConflictError, NotFoundError, ForbiddenError } from '../errors/AppError';

const userRepository = new UserRepository();
const companyRepository = new CompanyRepository();
const tenantRepository = new TenantRepository();

export class CustomerService {
  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    const company = await companyRepository.findByTenantId(user.tenantId);
    return {
      id: user.id,
      tenantId: user.tenantId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      role: user.role,
      status: user.status,
      tenant: user.tenant,
      company,
    };
  }

  async getCompany(tenantId: string) {
    const company = await companyRepository.findByTenantId(tenantId);
    if (!company) {
      throw new NotFoundError('Empresa não cadastrada para este tenant.');
    }
    return company;
  }

  async updateCompany(
    tenantId: string,
    data: {
      legalName?: string;
      tradeName?: string;
      cnpj?: string;
      ie?: string;
      segment?: string;
      annualTurnover?: string;
      taxRegime?: string;
      city?: string;
      state?: string;
    }
  ) {
    const company = await companyRepository.findByTenantId(tenantId);
    if (!company) {
      throw new NotFoundError('Empresa não encontrada.');
    }

    const updated = await companyRepository.update(company.id, tenantId, data);
    return updated;
  }

  async getUsers(tenantId: string) {
    return userRepository.findByTenant(tenantId);
  }

  async createUser(
    tenantId: string,
    data: {
      name: string;
      email: string;
      password: string;
      role: UserRole;
      phone?: string;
    }
  ) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new ConflictError('E-mail já está em uso.');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const newUser = await userRepository.create({
      tenantId,
      email: data.email,
      name: data.name,
      passwordHash,
      role: data.role,
      phone: data.phone,
    });

    return {
      id: newUser.id,
      tenantId: newUser.tenantId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
    };
  }

  async updateUser(
    tenantId: string,
    userIdToUpdate: string,
    data: { name?: string; role?: UserRole; status?: string; phone?: string }
  ) {
    const targetUser = await userRepository.findById(userIdToUpdate);
    if (!targetUser || targetUser.tenantId !== tenantId) {
      throw new ForbiddenError('Não é permitido alterar usuários de outro tenant.');
    }

    const updated = await userRepository.update(userIdToUpdate, data);
    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      status: updated.status,
    };
  }

  async deleteUser(tenantId: string, userIdToDelete: string) {
    const targetUser = await userRepository.findById(userIdToDelete);
    if (!targetUser || targetUser.tenantId !== tenantId) {
      throw new ForbiddenError('Não é permitido remover usuários de outro tenant.');
    }
    await userRepository.delete(userIdToDelete);
    return { success: true };
  }
}
