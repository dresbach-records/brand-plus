/**
 * Central Backend Configuration for SaaS Entry Point & Operational Services
 * 
 * IMPORTANT: This is the single authoritative configuration for the BRAND+ SaaS access URL.
 * Never hardcode this URL across front-end components.
 */
export const SAAS_CONFIG = {
  // Operational SaaS login entry point
  ENTRY_URL: process.env.SAAS_ENTRY_URL || 'https://app.brandplus.com.br/login/brand+',
  
  // Base domain for the SaaS application
  BASE_URL: process.env.SAAS_BASE_URL || 'https://app.brandplus.com.br',
  
  // Identity and access management protocol
  AUTH_PROTOCOL: 'sso_oidc' as const,
  
  // System messages for access status
  MESSAGES: {
    PAYMENT_PENDING: 'Seu ambiente será liberado após a confirmação do pagamento.',
    PROVISIONING: 'Estamos preparando seu ambiente BRAND+.',
    PROVISIONING_FAILED: 'Não foi possível preparar seu ambiente. Nossa equipe precisa verificar a ativação.',
    SUBSCRIPTION_INACTIVE: 'Assinatura inativa, cancelada ou suspensa. Entre em contato com o suporte.',
    ACCESS_GRANTED: 'Acesso autorizado ao ambiente operacional BRAND+.',
    UNAUTHENTICATED: 'Acesso não autenticado. Faça login no Portal do Cliente.',
  },
};
