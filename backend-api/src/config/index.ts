import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  isProduction: process.env.NODE_ENV === 'production',
  
  database: {
    url: process.env.DATABASE_URL || 'postgresql://brandplus_user:secure_password@localhost:5432/brandplus_db?sslmode=require',
    poolMin: parseInt(process.env.DB_POOL_MIN || '2', 10),
    poolMax: parseInt(process.env.DB_POOL_MAX || '10', 10),
  },

  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'brand_plus_jwt_secret_production_ready_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  saas: {
    entryUrl: process.env.SAAS_ENTRY_URL || 'https://app.brandplus.com.br/login/brand+',
    baseUrl: process.env.SAAS_BASE_URL || 'https://app.brandplus.com.br',
    authProtocol: 'sso_oidc' as const,
  },
};
