export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode = 400, code = 'BAD_REQUEST') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Requisição inválida.') {
    super(message, 400, 'BAD_REQUEST');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Autenticação necessária.') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Acesso negado.') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso não encontrado.') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Recurso já existente.') {
    super(message, 409, 'CONFLICT');
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Dados inválidos fornecidos.') {
    super(message, 422, 'VALIDATION_ERROR');
  }
}
