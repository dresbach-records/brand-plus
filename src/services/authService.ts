import { Customer } from '../types';

export interface RegisterDTO {
  fullName: string;
  email: string;
  phone: string;
  password?: string;
}

export interface AuthSession {
  token: string;
  customer: Customer;
  expiresAt: string;
}

/**
 * Service to handle customer authentication and registration.
 * Prepares the application for POST /api/v1/auth/register and /api/v1/auth/login.
 * Note: Never stores raw passwords in localStorage.
 */
class AuthService {
  async register(data: RegisterDTO): Promise<{ customer: Customer; token: string }> {
    // In production, this makes a fetch(POST /api/v1/auth/register)
    // For local development, simulate successful registration response
    await new Promise((resolve) => setTimeout(resolve, 600));

    const customer: Customer = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      createdAt: new Date().toISOString(),
    };

    return {
      customer,
      token: `jwt_${Math.random().toString(36).substring(2, 18)}`,
    };
  }

  async login(email: string): Promise<{ customer: Customer; token: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const customer: Customer = {
      id: 'usr_demo_8921',
      name: 'Carlos Alberto Mendonça',
      email: email || 'carlos@calcadosrequinte.com.br',
      phone: '(11) 98452-1100',
      createdAt: '2026-03-10T10:00:00Z',
    };

    return {
      customer,
      token: 'jwt_mock_token_active',
    };
  }

  async getCurrentSession(): Promise<Customer | null> {
    // Check session validity from backend token
    return null;
  }
}

export const authService = new AuthService();
