import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  console.error('[API Error Unhandled]:', err);

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ocorreu um erro interno no servidor.',
    },
  });
}
