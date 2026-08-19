import { apiClient, setAccessToken } from './api';
import { Customer, Company, Subscription, Tenant } from '../types';

export interface RegisterDTO {
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  storeName?: string;
  cnpj?: string;
  segment?: string;
}

export interface AuthSession {
  token: string;
  customer: Customer;
  company?: Company;
  subscription?: Subscription;
  tenant?: Tenant;
}

class AuthService {
  async register(data: RegisterDTO): Promise<AuthSession> {
    const res = await apiClient.post<{ user: any; accessToken: string }>('/auth/register', {
      name: data.fullName,
      email: data.email,
      password: data.password || 'Senha@123',
      companyName: data.storeName || `${data.fullName} Empresa`,
      cnpj: data.cnpj || '00000000000191',
      phone: data.phone,
    });

    setAccessToken(res.accessToken);

    return {
      token: res.accessToken,
      customer: {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        phone: res.user.phone,
        role: res.user.role,
        createdAt: new Date().toISOString(),
      },
    };
  }

  async login(email: string, password?: string): Promise<AuthSession> {
    const res = await apiClient.post<{ user: any; accessToken: string }>('/auth/login', {
      email,
      password,
    });

    setAccessToken(res.accessToken);

    return {
      token: res.accessToken,
      customer: {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        phone: res.user.phone,
        role: res.user.role,
        createdAt: new Date().toISOString(),
      },
    };
  }

  async getMe(): Promise<AuthSession> {
    const data = await apiClient.get<any>('/auth/me');
    return {
      token: sessionStorage.getItem('bp_token') || '',
      customer: {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        createdAt: data.createdAt || new Date().toISOString(),
      },
      company: data.company,
      tenant: data.tenant,
    };
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore errors on logout
    } finally {
      setAccessToken(null);
    }
  }
}

export const authService = new AuthService();
