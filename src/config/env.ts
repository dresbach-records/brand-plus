/**
 * Centralized Application Configuration & Environment Variables
 */
export const SAAS_APP_URL: string =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SAAS_APP_URL) ||
  'https://app.brandplus.com.br';

export const API_BASE_URL: string =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
  '/api/v1';

export const IS_MOCK_PAYMENT_ENABLED: boolean = true; // Flag for sandbox/preview mock payment provider
