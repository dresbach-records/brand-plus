import { Prisma, SubscriptionStatus } from '@prisma/client';
import { SubscriptionRepository } from '../repositories/subscriptionRepository';
import { PlanRepository } from '../repositories/planRepository';
import { NotFoundError, BadRequestError } from '../errors/AppError';

const subscriptionRepository = new SubscriptionRepository();
const planRepository = new PlanRepository();

export class SubscriptionService {
  async getMySubscription(tenantId: string) {
    const sub = await subscriptionRepository.findLatestByTenant(tenantId);
    if (!sub) {
      return null;
    }
    return {
      id: sub.id,
      tenantId: sub.tenantId,
      planId: sub.planId,
      planName: sub.planName,
      billingCycle: sub.billingCycle,
      priceMonthly: Number(sub.priceMonthly),
      priceYearly: Number(sub.priceYearly),
      status: sub.status,
      currentPeriodStart: sub.currentPeriodStart,
      currentPeriodEnd: sub.currentPeriodEnd,
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
      plan: sub.plan,
    };
  }

  async createSubscription(
    tenantId: string,
    data: { planCode: string; billingCycle: 'monthly' | 'yearly' }
  ) {
    const plan = await planRepository.findByCode(data.planCode);
    if (!plan) {
      throw new NotFoundError('Plano não encontrado.');
    }

    const now = new Date();
    const periodEnd = new Date();
    if (data.billingCycle === 'yearly') {
      periodEnd.setFullYear(now.getFullYear() + 1);
    } else {
      periodEnd.setMonth(now.getMonth() + 1);
    }

    const sub = await subscriptionRepository.create({
      tenantId,
      planId: plan.id,
      planName: plan.name,
      billingCycle: data.billingCycle,
      priceMonthly: plan.priceMonthly,
      priceYearly: plan.priceYearly,
      status: SubscriptionStatus.pending,
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
    });

    return {
      id: sub.id,
      tenantId: sub.tenantId,
      planName: sub.planName,
      status: sub.status,
      currentPeriodStart: sub.currentPeriodStart,
      currentPeriodEnd: sub.currentPeriodEnd,
    };
  }

  async cancelSubscription(id: string, tenantId: string) {
    const sub = await subscriptionRepository.findById(id);
    if (!sub || sub.tenantId !== tenantId) {
      throw new NotFoundError('Assinatura não encontrada.');
    }

    const updated = await subscriptionRepository.updateStatus(id, SubscriptionStatus.cancelled);
    return {
      id: updated.id,
      status: updated.status,
      cancelAtPeriodEnd: updated.cancelAtPeriodEnd,
    };
  }

  async changePlan(
    id: string,
    tenantId: string,
    data: { planCode: string; billingCycle?: 'monthly' | 'yearly' }
  ) {
    const sub = await subscriptionRepository.findById(id);
    if (!sub || sub.tenantId !== tenantId) {
      throw new NotFoundError('Assinatura não encontrada.');
    }

    const plan = await planRepository.findByCode(data.planCode);
    if (!plan) {
      throw new NotFoundError('Plano selecionado não encontrado.');
    }

    const updated = await subscriptionRepository.updatePlan(id, {
      planId: plan.id,
      planName: plan.name,
      priceMonthly: plan.priceMonthly,
      priceYearly: plan.priceYearly,
      billingCycle: data.billingCycle || sub.billingCycle,
    });

    return {
      id: updated.id,
      planName: updated.planName,
      status: updated.status,
      billingCycle: updated.billingCycle,
    };
  }
}
