import { Subscription, SubscriptionStatus, PlanTierId, BillingCycle, PaymentMethodType } from '../types';
import { getPlanById } from '../data/planCatalog';

export interface CreateSubscriptionDTO {
  customerId: string;
  companyId: string;
  planId: PlanTierId;
  billingCycle: BillingCycle;
  paymentMethodType: PaymentMethodType;
}

class SubscriptionService {
  async createSubscription(dto: CreateSubscriptionDTO): Promise<Subscription> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const plan = getPlanById(dto.planId);
    const price =
      dto.billingCycle === 'annual'
        ? plan.annualBilledTotal
        : plan.priceMonthly;

    const nextBilling = new Date();
    if (dto.billingCycle === 'annual') {
      nextBilling.setFullYear(nextBilling.getFullYear() + 1);
    } else {
      nextBilling.setMonth(nextBilling.getMonth() + 1);
    }

    const subscription: Subscription = {
      id: `sub_${Math.random().toString(36).substring(2, 9)}`,
      customerId: dto.customerId,
      companyId: dto.companyId,
      planId: dto.planId,
      planName: plan.name,
      status: 'pending', // Starts as pending until payment confirmation!
      billingCycle: dto.billingCycle,
      currentPrice: price,
      startDate: new Date().toISOString(),
      nextBillingDate: nextBilling.toISOString(),
      paymentMethod: {
        type: dto.paymentMethodType,
        details:
          dto.paymentMethodType === 'pix'
            ? 'PIX Instantâneo'
            : dto.paymentMethodType === 'credit_card'
            ? 'Cartão de Crédito Corporativo'
            : 'Boleto Bancário',
      },
    };

    return subscription;
  }

  async activateSubscription(subscriptionId: string): Promise<Subscription> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    return {
      id: subscriptionId,
      customerId: 'usr_default',
      companyId: 'comp_default',
      planId: 'growth',
      planName: 'BRAND+ Growth',
      status: 'active',
      billingCycle: 'monthly',
      currentPrice: 329,
      startDate: new Date().toISOString(),
      nextBillingDate: nextMonth.toISOString(),
      paymentMethod: {
        type: 'pix',
        details: 'PIX Automático',
      },
    };
  }

  async changePlan(subscriptionId: string, newPlanId: PlanTierId, billingCycle: BillingCycle): Promise<Subscription> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const plan = getPlanById(newPlanId);
    const price = billingCycle === 'annual' ? plan.annualBilledTotal : plan.priceMonthly;

    const nextBilling = new Date();
    if (billingCycle === 'annual') {
      nextBilling.setFullYear(nextBilling.getFullYear() + 1);
    } else {
      nextBilling.setMonth(nextBilling.getMonth() + 1);
    }

    return {
      id: subscriptionId,
      customerId: 'usr_default',
      companyId: 'comp_default',
      planId: newPlanId,
      planName: plan.name,
      status: 'active',
      billingCycle,
      currentPrice: price,
      startDate: new Date().toISOString(),
      nextBillingDate: nextBilling.toISOString(),
      paymentMethod: {
        type: 'pix',
        details: 'PIX Automático',
      },
    };
  }

  async cancelSubscription(subscriptionId: string): Promise<{ success: boolean; effectiveUntil: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const effectiveDate = new Date();
    effectiveDate.setMonth(effectiveDate.getMonth() + 1);
    return {
      success: true,
      effectiveUntil: effectiveDate.toLocaleDateString('pt-BR'),
    };
  }
}

export const subscriptionService = new SubscriptionService();
