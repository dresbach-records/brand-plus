export interface CustomerModel {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  document?: string | null;
  avatarUrl?: string | null;
  passwordHash?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyModel {
  id: string;
  customerId: string;
  legalName: string;
  tradeName: string;
  cnpj: string;
  ie?: string | null;
  segment: string;
  annualTurnover?: string | null;
  taxRegime: string;
  city?: string | null;
  state?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'owner' | 'admin' | 'manager' | 'operator' | 'accountant';

export interface UserAccountModel {
  id: string;
  customerId: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
