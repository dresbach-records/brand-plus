export const SAAS_CONFIG = {
  ENTRY_URL: process.env.SAAS_ENTRY_URL || 'https://app.brandplus.com.br/login/brand+',
  BASE_URL: process.env.SAAS_BASE_URL || 'https://app.brandplus.com.br',
  AUTH_PROTOCOL: 'sso_oidc' as const,
  MESSAGES: {
    PAYMENT_PENDING: 'Seu ambiente será liberado após a confirmação do pagamento.',
    PROVISIONING: 'Estamos preparando seu ambiente BRAND+.',
    PROVISIONING_FAILED: 'Não foi possível preparar seu ambiente. Nossa equipe precisa verificar a ativação.',
    SUBSCRIPTION_INACTIVE: 'Assinatura inativa, cancelada ou suspensa. Entre em contato com o suporte.',
    ACCESS_GRANTED: 'Acesso autorizado ao ambiente operacional BRAND+.',
    UNAUTHENTICATED: 'Acesso não autenticado. Faça login no Portal do Cliente.',
  },
};
