import { Prisma } from '@prisma/client';
import { PlanRepository } from '../repositories/planRepository';
import { CheckoutRepository } from '../repositories/checkoutRepository';
import { UserRepository } from '../repositories/userRepository';
import { CompanyRepository } from '../repositories/companyRepository';
import { NotFoundError } from '../errors/AppError';

const planRepository = new PlanRepository();
const checkoutRepository = new CheckoutRepository();
const userRepository = new UserRepository();
const companyRepository = new CompanyRepository();

export class CheckoutService {
  async createSession(
    tenantId: string,
    userId: string,
    data: { planCode: string; billingCycle: 'monthly' | 'yearly' }
  ) {
    const plan = await planRepository.findByCode(data.planCode);
    if (!plan || !plan.active) {
      throw new NotFoundError('Plano selecionado não encontrado ou inativo.');
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    const company = await companyRepository.findByTenantId(tenantId);

    // Calculate price on the server based on plan source of truth
    const amount: Prisma.Decimal =
      data.billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h expiration

    const session = await checkoutRepository.create({
      tenantId,
      planId: plan.id,
      billingCycle: data.billingCycle,
      amount,
      customerEmail: user.email,
      customerName: user.name,
      customerCnpjCpf: company?.cnpj,
      expiresAt,
    });

    return {
      id: session.id,
      tenantId: session.tenantId,
      plan: {
        id: plan.id,
        code: plan.code,
        name: plan.name,
      },
      billingCycle: session.billingCycle,
      amount: Number(session.amount),
      currency: session.currency,
      status: session.status,
      customerEmail: session.customerEmail,
      expiresAt: session.expiresAt,
    };
  }

  async getSession(sessionId: string) {
    const session = await checkoutRepository.findById(sessionId);
    if (!session) {
      throw new NotFoundError('Sessão de checkout não encontrada.');
    }

    return {
      id: session.id,
      tenantId: session.tenantId,
      plan: session.plan,
      billingCycle: session.billingCycle,
      amount: Number(session.amount),
      currency: session.currency,
      status: session.status,
      customerEmail: session.customerEmail,
      customerName: session.customerName,
      customerCnpjCpf: session.customerCnpjCpf,
      expiresAt: session.expiresAt,
    };
  }
}
