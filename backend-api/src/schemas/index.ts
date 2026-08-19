import { z } from 'zod';

export const updateCompanySchema = z.object({
  legalName: z.string().min(2, 'Razão Social obrigatória').optional(),
  tradeName: z.string().min(2, 'Nome Fantasia obrigatório').optional(),
  cnpj: z.string().min(14, 'CNPJ inválido').optional(),
  ie: z.string().optional(),
  segment: z.string().optional(),
  annualTurnover: z.string().optional(),
  taxRegime: z.string().optional(),
  city: z.string().optional(),
  state: z.string().length(2, 'Estado deve ter 2 caracteres').optional(),
});

export const createCheckoutSessionSchema = z.object({
  planCode: z.string().min(1, 'Código do plano é obrigatório'),
  billingCycle: z.enum(['monthly', 'yearly']),
});

export const createSubscriptionSchema = z.object({
  planCode: z.string().min(1, 'Código do plano é obrigatório'),
  billingCycle: z.enum(['monthly', 'yearly']),
});

export const changePlanSchema = z.object({
  planCode: z.string().min(1, 'Código do plano é obrigatório'),
  billingCycle: z.enum(['monthly', 'yearly']).optional(),
});

export const processPaymentSchema = z.object({
  subscriptionId: z.string().optional(),
  checkoutSessionId: z.string().optional(),
  paymentMethod: z.enum(['pix', 'credit_card', 'boleto']),
});

export const createUserSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  role: z.enum(['owner', 'admin', 'manager', 'operator', 'accountant']),
  phone: z.string().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório').optional(),
  role: z.enum(['owner', 'admin', 'manager', 'operator', 'accountant']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  phone: z.string().optional(),
});
