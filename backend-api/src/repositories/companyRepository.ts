import prisma from '../database/prisma';

export class CompanyRepository {
  async findByTenantId(tenantId: string) {
    return prisma.company.findFirst({
      where: { tenantId },
    });
  }

  async findByCnpj(cnpj: string) {
    return prisma.company.findUnique({
      where: { cnpj },
    });
  }

  async create(data: {
    tenantId: string;
    legalName: string;
    tradeName: string;
    cnpj: string;
    ie?: string;
    segment?: string;
    annualTurnover?: string;
    taxRegime?: string;
    city?: string;
    state?: string;
  }) {
    return prisma.company.create({
      data,
    });
  }

  async update(id: string, tenantId: string, data: Partial<{
    legalName: string;
    tradeName: string;
    cnpj: string;
    ie: string;
    segment: string;
    annualTurnover: string;
    taxRegime: string;
    city: string;
    state: string;
  }>) {
    // Ensure strict tenant match
    const company = await prisma.company.findFirst({
      where: { id, tenantId },
    });
    if (!company) {
      return null;
    }
    return prisma.company.update({
      where: { id },
      data,
    });
  }
}
