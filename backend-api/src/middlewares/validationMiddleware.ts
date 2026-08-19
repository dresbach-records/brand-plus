import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../errors/AppError';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const message = error.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ');
        return next(new ValidationError(message));
      }
      next(error);
    }
  };
}
