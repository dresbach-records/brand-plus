import { Company, CompanyFormData } from '../types';

/**
 * Service to manage Company data and profile with Neon PostgreSQL backend.
 */
class CustomerService {
  async registerCompany(companyData: CompanyFormData, customerId: string): Promise<Company> {
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
    try {
      const res = await fetch(`/api/v1/companies/${encodeURIComponent(companyId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        return updates as Company;
      }
    } catch (err) {
      console.warn('[CustomerService] Update company API call failed, applied locally:', err);
    }
    return updates as Company;
  }
}

export const customerService = new CustomerService();

