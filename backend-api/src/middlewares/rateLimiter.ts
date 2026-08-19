import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // max 300 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Muitas requisições originadas deste IP. Tente novamente mais tarde.',
    },
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // max 30 requests per IP for sensitive auth routes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Muitas tentativas de autenticação. Tente novamente em alguns minutos.',
    },
  },
});
