import { SubscriptionPlan } from '../types';

export const PLAN_CATALOG: Record<string, SubscriptionPlan> = {
  start: {
    id: 'start',
    name: 'BRAND+ Start',
    badge: 'Para Pequenos Comércios',
    tagline: 'O essencial para iniciar no digital e organizar a operação',
    description: 'Ideal para lojas de bairro e negócios que faturam até R$ 50 mil/mês e buscam digitalização rápida.',
    priceMonthly: 149,
    priceAnnualMonthlyEquivalent: 119, // 20% savings on annual
    annualBilledTotal: 1428,
    setupFee: 0,
    limits: {
      products: 'Até 500 produtos',
      users: 'Até 2 usuários',
      stores: '1 loja física ou virtual',
      pageviews: 'Ilimitado',
    },
    features: [
      'Loja virtual de alta conversão',
      'Checkout com PIX e Cartão integrado',
      'Controle de estoque unificado',
      'Frente de Caixa (PDV) para balcão',
      'Emissão de NFC-e e NF-e automática',
      'Acesso aos cursos fundamentais da Academy',
      'Suporte técnico via chamados',
    ],
    ctaText: 'Escolher plano Start',
  },
  growth: {
    id: 'growth',
    name: 'BRAND+ Growth',
    badge: 'Mais Escolhido por Lojistas',
    tagline: 'Aceleração de vendas com IA e automação multicanal',
    description: 'Para comércios consolidados que faturam de R$ 50 mil a R$ 250 mil/mês e precisam de escala sem aumentar equipe.',
    priceMonthly: 329,
    priceAnnualMonthlyEquivalent: 259, // ~21% savings on annual
    annualBilledTotal: 3108,
    setupFee: 0,
    isPopular: true,
    limits: {
      products: 'Até 3.000 produtos',
      users: 'Até 5 usuários',
      stores: 'Até 2 filiais / pontos de venda',
      pageviews: 'Ilimitado',
    },
    features: [
      'Tudo incluído no plano Start',
      'Copiloto de Inteligência Artificial para diagnóstico de estoque',
      'Sugestão automática de precificação por margem de contribuição',
      'Conciliação bancária e DRE gerencial em tempo real',
      'CRM de clientes com segmentação por frequência e ticket',
      'Trilhas completas com certificação na Academy',
      'Suporte prioritário com SLA de até 4 horas',
    ],
    ctaText: 'Escolher plano Growth',
  },
  pro: {
    id: 'pro',
    name: 'BRAND+ Pro',
    badge: 'Operações em Alta Escala',
    tagline: 'Potência máxima de ERP, inteligência preditiva e multiloja',
    description: 'Para operações que faturam acima de R$ 250 mil/mês com múltiplas filiais, estoques distribuídos e alta volumetria.',
    priceMonthly: 649,
    priceAnnualMonthlyEquivalent: 519, // ~20% savings on annual
    annualBilledTotal: 6228,
    setupFee: 0,
    limits: {
      products: 'Produtos ilimitados',
      users: 'Até 15 usuários',
      stores: 'Até 5 filiais integradas',
      pageviews: 'Ilimitado com CDN dedicada',
    },
    features: [
      'Tudo incluído no plano Growth',
      'Múltiplos centros de distribuição e transferência entre lojas',
      'IA preditiva avançada com alertas diários de recompra',
      'Auditoria fiscal detalhada e relatórios contábeis automatizados',
      'API aberta para integrações proprietárias',
      'Treinamento ao vivo para a equipe com especialistas da Academy',
      'Gerente de contas dedicado',
    ],
    ctaText: 'Escolher plano Pro',
  },
  enterprise: {
    id: 'enterprise',
    name: 'BRAND+ Enterprise',
    badge: 'Redes & Franquias',
    tagline: 'Arquitetura customizada para grandes marcas e indústrias',
    description: 'Para redes de franquias, grandes atacadistas e indústrias que exigem SLA corporativo e infraestrutura dedicada.',
    priceMonthly: 0, // Sob consulta
    priceAnnualMonthlyEquivalent: 0,
    annualBilledTotal: 0,
    setupFee: 0,
    limits: {
      products: 'Ilimitado',
      users: 'Usuários ilimitados',
      stores: 'Redes e franquias ilimitadas',
      pageviews: 'Cluster dedicado',
    },
    features: [
      'Infraestrutura em nuvem isolada de alta disponibilidade',
      'Single Sign-On (SSO / SAML / OIDC corporativo)',
      'Customização de fluxos de checkout e relatórios gerenciais',
      'SLA de 99.95% com suporte 24/7 de engenharia',
      'Consultoria estratégica e onboarding presencial',
    ],
    ctaText: 'Falar com especialista',
  },
};

export const getPlanById = (id: string): SubscriptionPlan => {
  return PLAN_CATALOG[id] || PLAN_CATALOG.growth;
};
