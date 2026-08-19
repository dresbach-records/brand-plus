export interface LoginSchemaInput {
  email: string;
  password?: string;
}

export interface RegisterSchemaInput {
  name: string;
  email: string;
  phone?: string;
  document?: string;
  password?: string;
  companyName?: string;
  cnpj?: string;
  segment?: string;
}

export function validateLoginInput(body: any): { isValid: boolean; errors: string[]; data?: LoginSchemaInput } {
  const errors: string[] = [];
  if (!body || typeof body !== 'object') {
    return { isValid: false, errors: ['Corpo da requisição inválido'] };
  }

  if (!body.email || typeof body.email !== 'string' || !body.email.includes('@')) {
    errors.push('E-mail válido é obrigatório');
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      email: body.email?.trim().toLowerCase(),
      password: body.password,
    },
  };
}

export function validateRegisterInput(body: any): { isValid: boolean; errors: string[]; data?: RegisterSchemaInput } {
  const errors: string[] = [];
  if (!body || typeof body !== 'object') {
    return { isValid: false, errors: ['Corpo da requisição inválido'] };
  }

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push('Nome do responsável é obrigatório');
  }

  if (!body.email || typeof body.email !== 'string' || !body.email.includes('@')) {
    errors.push('E-mail válido é obrigatório');
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      name: body.name?.trim(),
      email: body.email?.trim().toLowerCase(),
      phone: body.phone?.trim(),
      document: body.document?.trim(),
      password: body.password,
      companyName: body.companyName?.trim(),
      cnpj: body.cnpj?.trim(),
      segment: body.segment?.trim() || 'retail',
    },
  };
}
