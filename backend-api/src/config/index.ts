import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '8000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'fallback_jwt_secret_dev_only',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_dev_only',
  jwtExpiresIn: '15m',
  jwtRefreshExpiresIn: '7d',
  frontendUrl: process.env.FRONTEND_URL || 'https://brandplus.com.br',
  saasEntryUrl: process.env.SAAS_ENTRY_URL || 'https://app.brandplus.com.br/login/brand+',
  saasBaseUrl: process.env.SAAS_BASE_URL || 'https://app.brandplus.com.br',
  apiUrl: process.env.API_URL || 'https://api.brandplus.com.br',
  paymentProvider: process.env.PAYMENT_PROVIDER || 'stripe',
  paymentSecret: process.env.PAYMENT_SECRET || '',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
  },
};
