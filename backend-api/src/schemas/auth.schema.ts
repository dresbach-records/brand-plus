import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  companyName: z.string().min(2, 'Razão Social/Nome da empresa é obrigatório'),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  newPassword: z.string().min(8, 'A nova senha deve ter no mínimo 8 caracteres'),
});
