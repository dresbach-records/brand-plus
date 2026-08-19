import { Company, CompanyFormData } from '../types';

/**
 * Service to manage Company data and profile.
 * Prepares the application for POST /api/v1/companies and PUT /api/v1/companies/:id
 */
class CustomerService {
  async registerCompany(companyData: CompanyFormData, customerId: string): Promise<Company> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const company: Company = {
      id: `comp_${Math.random().toString(36).substring(2, 9)}`,
      corporateName: companyData.corporateName,
      tradeName: companyData.tradeName,
      cnpj: companyData.cnpj,
      phone: companyData.phone,
      email: companyData.commercialEmail,
      address: {
        zipCode: companyData.zipCode,
        street: companyData.street,
        number: companyData.number,
        complement: companyData.complement,
        neighborhood: companyData.neighborhood,
        city: companyData.city,
        state: companyData.state,
      },
      segment: companyData.segment,
      storeCount: companyData.storeCount,
      estimatedProducts: companyData.estimatedProducts,
      hasEcommerce: companyData.hasEcommerce,
      hasERP: companyData.hasERP,
    };

    return company;
  }

  async updateCompany(companyId: string, updates: Partial<Company>): Promise<Company> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return updates as Company;
  }
}

export const customerService = new CustomerService();
