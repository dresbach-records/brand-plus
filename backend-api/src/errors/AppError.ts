export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(message: string, statusCode = 500, isOperational = true, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso não encontrado', details?: any) {
    super(message, 404, true, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Não autorizado. Autenticação necessária.', details?: any) {
    super(message, 401, true, details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Acesso proibido. Permissões insuficientes.', details?: any) {
    super(message, 403, true, details);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Dados de requisição inválidos', details?: any) {
    super(message, 400, true, details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflito de estado ou registro já existente', details?: any) {
    super(message, 409, true, details);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Erro interno do servidor', details?: any) {
    super(message, 500, false, details);
  }
}
