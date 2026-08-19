import { apiClient } from './api';
import { Company, CompanyFormData } from '../types';

class CustomerService {
  async getCompany(): Promise<Company> {
    return apiClient.get<Company>('/customer/company');
  }

  async registerCompany(companyData: CompanyFormData): Promise<Company> {
    return apiClient.put<Company>('/customer/company', {
      legalName: companyData.corporateName,
      tradeName: companyData.tradeName,
      cnpj: companyData.cnpj,
      segment: companyData.segment,
    });
  }

  async updateCompany(companyId: string, updates: Partial<Company>): Promise<Company> {
    return apiClient.put<Company>('/customer/company', updates);
  }

  async getUsers(): Promise<any[]> {
    return apiClient.get<any[]>('/customer/users');
  }

  async createUser(userData: any): Promise<any> {
    return apiClient.post<any>('/customer/users', userData);
  }

  async updateUser(userId: string, updates: any): Promise<any> {
    return apiClient.patch<any>(`/customer/users/${userId}`, updates);
  }

  async deleteUser(userId: string): Promise<any> {
    return apiClient.delete<any>(`/customer/users/${userId}`);
  }
}

export const customerService = new CustomerService();
