import { apiClient } from './api';
import { Subscription, PlanTierId, BillingCycle, PaymentMethodType } from '../types';

export interface CreateSubscriptionDTO {
  planId: PlanTierId;
  billingCycle: BillingCycle;
  paymentMethodType?: PaymentMethodType;
}

class SubscriptionService {
  async getMySubscription(): Promise<Subscription | null> {
    const sub = await apiClient.get<any>('/subscriptions/me');
    if (!sub) return null;
    return {
      id: sub.id,
      customerId: sub.tenantId,
      companyId: sub.tenantId,
      planId: (sub.plan?.code?.toLowerCase() || 'start') as PlanTierId,
      planName: sub.planName,
      status: sub.status,
      billingCycle: sub.billingCycle,
      currentPrice: sub.priceMonthly,
      startDate: sub.currentPeriodStart,
      nextBillingDate: sub.currentPeriodEnd,
      paymentMethod: {
        type: 'pix',
        details: 'PIX / Gateway',
      },
    };
  }

  async createSubscription(dto: CreateSubscriptionDTO): Promise<Subscription> {
    const res = await apiClient.post<any>('/subscriptions', {
      planCode: dto.planId.toUpperCase(),
      billingCycle: dto.billingCycle === 'annual' ? 'yearly' : 'monthly',
    });

    return {
      id: res.id,
      customerId: res.tenantId,
      companyId: res.tenantId,
      planId: dto.planId,
      planName: res.planName,
      status: res.status,
      billingCycle: dto.billingCycle,
      currentPrice: 0,
      startDate: res.currentPeriodStart,
      nextBillingDate: res.currentPeriodEnd,
      paymentMethod: {
        type: dto.paymentMethodType || 'pix',
        details: 'Gateway de Pagamento',
      },
    };
  }

  async changePlan(subscriptionId: string, newPlanId: PlanTierId, billingCycle: BillingCycle): Promise<Subscription> {
    const res = await apiClient.post<any>(`/subscriptions/${subscriptionId}/change-plan`, {
      planCode: newPlanId.toUpperCase(),
      billingCycle: billingCycle === 'annual' ? 'yearly' : 'monthly',
    });

    return {
      id: res.id,
      customerId: '',
      companyId: '',
      planId: newPlanId,
      planName: res.planName,
      status: res.status,
      billingCycle,
      currentPrice: 0,
      startDate: new Date().toISOString(),
      nextBillingDate: new Date().toISOString(),
      paymentMethod: {
        type: 'pix',
        details: 'Gateway',
      },
    };
  }

  async cancelSubscription(subscriptionId: string): Promise<{ success: boolean; effectiveUntil: string }> {
    const res = await apiClient.post<any>(`/subscriptions/${subscriptionId}/cancel`);
    return {
      success: true,
      effectiveUntil: 'Fim do período vigente',
    };
  }
}

export const subscriptionService = new SubscriptionService();
