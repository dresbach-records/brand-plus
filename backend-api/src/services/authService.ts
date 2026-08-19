import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserRepository } from '../repositories/userRepository';
import { TenantRepository } from '../repositories/tenantRepository';
import { CompanyRepository } from '../repositories/companyRepository';
import { RefreshTokenRepository } from '../repositories/refreshTokenRepository';
import { AuditLogRepository } from '../repositories/auditLogRepository';
import { ConflictError, NotFoundError, UnauthorizedError } from '../errors/AppError';
import { AuthenticatedUser } from '../types';

const userRepository = new UserRepository();
const tenantRepository = new TenantRepository();
const companyRepository = new CompanyRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const auditLogRepository = new AuditLogRepository();

export class AuthService {
  async register(data: {
    name: string;
    email: string;
    password: string;
    companyName: string;
    cnpj: string;
    phone?: string;
  }) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError('E-mail já cadastrado.');
    }

    const existingCompany = await companyRepository.findByCnpj(data.cnpj);
    if (existingCompany) {
      throw new ConflictError('CNPJ já cadastrado.');
    }

    // Generate unique slug for tenant
    const slugBase = data.companyName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const slug = `${slugBase}-${Date.now().toString(36)}`;

    // Create Tenant
    const tenant = await tenantRepository.create({
      name: data.companyName,
      slug,
    });

    // Create Company
    await companyRepository.create({
      tenantId: tenant.id,
      legalName: data.companyName,
      tradeName: data.companyName,
      cnpj: data.cnpj,
    });

    // Hash Password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Create User
    const user = await userRepository.create({
      tenantId: tenant.id,
      email: data.email,
      name: data.name,
      passwordHash,
      role: 'owner',
      phone: data.phone,
    });

    // Log Audit
    await auditLogRepository.create({
      tenantId: tenant.id,
      userId: user.id,
      action: 'REGISTER',
      entity: 'User',
      entityId: user.id,
    });

    // Generate Tokens
    const tokens = this.generateTokens({
      id: user.id,
      tenantId: tenant.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await refreshTokenRepository.create(user.id, tokens.refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

    return {
      user: {
        id: user.id,
        tenantId: tenant.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      tokens,
    };
  }

  async login(data: { email: string; password: string }, ipAddress?: string) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      await auditLogRepository.create({
        action: 'LOGIN_FAILED',
        entity: 'User',
        details: `Failed email: ${data.email}`,
        ipAddress,
      });
      throw new UnauthorizedError('Credenciais inválidas.');
    }

    const passwordValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!passwordValid) {
      await auditLogRepository.create({
        tenantId: user.tenantId,
        userId: user.id,
        action: 'LOGIN_FAILED',
        entity: 'User',
        entityId: user.id,
        ipAddress,
      });
      throw new UnauthorizedError('Credenciais inválidas.');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedError('Conta inativa ou suspensa.');
    }

    await auditLogRepository.create({
      tenantId: user.tenantId,
      userId: user.id,
      action: 'LOGIN',
      entity: 'User',
      entityId: user.id,
      ipAddress,
    });

    const tokens = this.generateTokens({
      id: user.id,
      tenantId: user.tenantId,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await refreshTokenRepository.create(user.id, tokens.refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

    return {
      user: {
        id: user.id,
        tenantId: user.tenantId,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      tokens,
    };
  }

  async refresh(refreshTokenStr: string) {
    const tokenDoc = await refreshTokenRepository.findByToken(refreshTokenStr);
    if (!tokenDoc || tokenDoc.revoked || new Date() > tokenDoc.expiresAt) {
      throw new UnauthorizedError('Refresh token inválido ou expirado.');
    }

    const user = tokenDoc.user;
    if (user.status !== 'active') {
      throw new UnauthorizedError('Conta inativa.');
    }

    // Revoke current token
    await refreshTokenRepository.revoke(refreshTokenStr);

    const tokens = this.generateTokens({
      id: user.id,
      tenantId: user.tenantId,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await refreshTokenRepository.create(user.id, tokens.refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

    return tokens;
  }

  async logout(userId: string, refreshTokenStr?: string, ipAddress?: string) {
    if (refreshTokenStr) {
      await refreshTokenRepository.revoke(refreshTokenStr);
    }
    await auditLogRepository.create({
      userId,
      action: 'LOGOUT',
      entity: 'User',
      entityId: userId,
      ipAddress,
    });
  }

  async getMe(userId: string) {
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

  private generateTokens(user: AuthenticatedUser) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        tenantId: user.tenantId,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn } as any
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        tenantId: user.tenantId,
      },
      config.jwtRefreshSecret,
      { expiresIn: config.jwtRefreshExpiresIn } as any
    );

    return { accessToken, refreshToken };
  }
}
