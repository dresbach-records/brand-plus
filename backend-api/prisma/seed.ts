import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[Seed] Seeding production plans...');

  const plans = [
    {
      code: 'START',
      name: 'START',
      description: 'Ideal para pequenas empresas iniciando no varejo omnichannel.',
      priceMonthly: 199.00,
      priceYearly: 1990.00,
      features: JSON.stringify([
        'Até 2 usuários',
        'PDV Web Básico',
        'Gestão de Estoque Unificado',
        'Suporte por E-mail',
        'Relatórios Básicos'
      ]),
      active: true,
    },
    {
      code: 'GROWTH',
      name: 'GROWTH',
      description: 'Para empresas em expansão com múltiplas lojas e canais.',
      priceMonthly: 499.00,
      priceYearly: 4990.00,
      features: JSON.stringify([
        'Até 5 usuários',
        'PDV Web + E-commerce Integrado',
        'Gestão Financeira Completa',
        'Suporte Prioritário',
        'BI e Dashboards Avançados'
      ]),
      active: true,
    },
    {
      code: 'PRO',
      name: 'PRO',
      description: 'Plano completo com IA e automação avançada.',
      priceMonthly: 999.00,
      priceYearly: 9990.00,
      features: JSON.stringify([
        'Usuários Ilimitados',
        'IA de Previsão de Demanda',
        'Multi-Filiais e Franquias',
        'Gerente de Conta Dedicado',
        'API de Integração Aberta'
      ]),
      active: true,
    },
    {
      code: 'ENTERPRISE',
      name: 'ENTERPRISE',
      description: 'Solução sob medida para grandes redes com SLAs customizados.',
      priceMonthly: 2499.00,
      priceYearly: 24990.00,
      features: JSON.stringify([
        'Infraestrutura Dedicada',
        'SLA 99.9% Garantido',
        'Integração ERP Customizada',
        'Treinamento presencial/online',
        'Suporte 24/7'
      ]),
      active: true,
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { code: plan.code },
      update: {
        name: plan.name,
        description: plan.description,
        priceMonthly: plan.priceMonthly,
        priceYearly: plan.priceYearly,
        features: plan.features,
        active: plan.active,
      },
      create: {
        code: plan.code,
        name: plan.name,
        description: plan.description,
        priceMonthly: plan.priceMonthly,
        priceYearly: plan.priceYearly,
        features: plan.features,
        active: plan.active,
      },
    });
  }

  console.log('[Seed] Production plans seeded successfully.');
}

main()
  .catch((e) => {
    console.error('[Seed] Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
