/**
 * Centralized Application Configuration & Environment Variables
 * 
 * IMPORTANT: The operational SaaS URL is authorized and returned by the backend (GET /api/v1/saas/access).
 * Frontend components must never navigate to hardcoded SaaS targets without backend authorization.
 */
export const SAAS_DEFAULT_ENTRY_URL: string =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SAAS_ENTRY_URL) ||
  'https://app.brandplus.com.br/login/brand+';

export const SAAS_APP_URL: string =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SAAS_APP_URL) ||
  'https://app.brandplus.com.br';

export const API_BASE_URL: string =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
  'https://api.brandplus.com.br/api/v1';

export const IS_MOCK_PAYMENT_ENABLED: boolean = false; // Disable mock payment in production

