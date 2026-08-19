export interface SaaSAccessQueryInput {
  customerId?: string;
  tenantId?: string;
  email?: string;
}

export function validateSaaSAccessQuery(query: any): { isValid: boolean; errors: string[]; data: SaaSAccessQueryInput } {
  const errors: string[] = [];
  const customerId = typeof query?.customerId === 'string' ? query.customerId.trim() : undefined;
  const tenantId = typeof query?.tenantId === 'string' ? query.tenantId.trim() : undefined;
  const email = typeof query?.email === 'string' ? query.email.trim().toLowerCase() : undefined;

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      customerId,
      tenantId,
      email,
    },
  };
}
