import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthRequest, AuthenticatedUser } from '../types';
import { UnauthorizedError } from '../errors/AppError';

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new UnauthorizedError('Token de acesso não fornecido.');
    }

    const payload = jwt.verify(token, config.jwtSecret) as AuthenticatedUser;

    req.user = payload;
    req.tenantId = payload.tenantId;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError('Token de acesso inválido ou expirado.'));
    }
    next(error);
  }
}
