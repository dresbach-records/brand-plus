import prisma from '../database/prisma';

export class PlanRepository {
  async findAllActive() {
    return prisma.plan.findMany({
      where: { active: true },
      orderBy: { priceMonthly: 'asc' },
    });
  }

  async findByCode(code: string) {
    return prisma.plan.findUnique({
      where: { code },
    });
  }

  async findById(id: string) {
    return prisma.plan.findUnique({
      where: { id },
    });
  }
}
