import { Request } from 'express';
import { UserRole } from '@prisma/client';

export interface AuthenticatedUser {
  id: string;
  tenantId: string;
  email: string;
  name: string;
  role: UserRole;
}

export type AuthRequest = Request & {
  user?: AuthenticatedUser;
  tenantId?: string;
};
