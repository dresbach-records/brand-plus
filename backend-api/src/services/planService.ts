import { PlanRepository } from '../repositories/planRepository';

const planRepository = new PlanRepository();

export class PlanService {
  async getPlans() {
    const plans = await planRepository.findAllActive();
    return plans.map((plan: any) => ({
      id: plan.id,
      code: plan.code,
      name: plan.name,
      description: plan.description,
      priceMonthly: Number(plan.priceMonthly),
      priceYearly: Number(plan.priceYearly),
      features: JSON.parse(plan.features || '[]'),
    }));
  }
}
