import { neon, neonConfig } from '@neondatabase/serverless';
import { Pool } from 'pg';

// Neon Serverless Configuration
neonConfig.fetchConnectionCache = true;

// Neon PostgreSQL connection string (configured via env with fallback)
export const DEFAULT_DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_FideY7Phjvw6@ep-weathered-mud-awhqu98p-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require';

// Serverless Neon SQL client
export const sql = neon(DEFAULT_DATABASE_URL);

// Pool instance for standard parameterized queries
export const pool = new Pool({
  connectionString: DEFAULT_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

/**
 * Execute parameterized query using the pool with robust execution
 */
export async function query<T = any>(text: string, params: any[] = []): Promise<T[]> {
  try {
    const res = await pool.query(text, params);
    return res.rows as T[];
  } catch (poolErr) {
    console.error('[DB] Query execution error:', poolErr);
    throw poolErr;
  }
}

/**
 * Initialize all database tables and seed complete data
 */
export async function initDb(): Promise<void> {
  console.log('[DB] Connecting to Neon PostgreSQL and initializing schema & seed data...');
  try {
    // 1. Create Tables
    await query(`
      CREATE TABLE IF NOT EXISTS customers (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        phone VARCHAR(64),
        role VARCHAR(64) DEFAULT 'owner',
        avatar_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Ensure password column exists if table was previously created
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='customers' AND column_name='password') THEN
          ALTER TABLE customers ADD COLUMN password VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='customers' AND column_name='role') THEN
          ALTER TABLE customers ADD COLUMN role VARCHAR(64) DEFAULT 'owner';
        END IF;
      END $$;

      CREATE TABLE IF NOT EXISTS companies (
        id VARCHAR(64) PRIMARY KEY,
        customer_id VARCHAR(64) REFERENCES customers(id) ON DELETE CASCADE,
        corporate_name VARCHAR(255) NOT NULL,
        trade_name VARCHAR(255) NOT NULL,
        cnpj VARCHAR(32) NOT NULL,
        phone VARCHAR(64),
        email VARCHAR(255),
        address_json JSONB,
        segment VARCHAR(128),
        store_count VARCHAR(64),
        estimated_products VARCHAR(64),
        has_ecommerce BOOLEAN DEFAULT true,
        has_erp BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS subscriptions (
        id VARCHAR(64) PRIMARY KEY,
        customer_id VARCHAR(64) REFERENCES customers(id) ON DELETE CASCADE,
        company_id VARCHAR(64) REFERENCES companies(id) ON DELETE CASCADE,
        plan_id VARCHAR(64) NOT NULL,
        plan_name VARCHAR(128) NOT NULL,
        status VARCHAR(64) NOT NULL DEFAULT 'active',
        billing_cycle VARCHAR(32) NOT NULL DEFAULT 'monthly',
        current_price NUMERIC(10, 2) NOT NULL,
        start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        next_billing_date TIMESTAMP WITH TIME ZONE,
        payment_method_json JSONB,
        cancel_at_period_end BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS invoices (
        id VARCHAR(64) PRIMARY KEY,
        invoice_number VARCHAR(64) NOT NULL,
        subscription_id VARCHAR(64) REFERENCES subscriptions(id) ON DELETE SET NULL,
        company_id VARCHAR(64) REFERENCES companies(id) ON DELETE CASCADE,
        customer_id VARCHAR(64) REFERENCES customers(id) ON DELETE CASCADE,
        amount NUMERIC(10, 2) NOT NULL,
        status VARCHAR(32) NOT NULL DEFAULT 'paid',
        issue_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        due_date TIMESTAMP WITH TIME ZONE,
        payment_date TIMESTAMP WITH TIME ZONE,
        payment_method VARCHAR(64),
        pdf_url TEXT,
        receipt_url TEXT,
        plan_name VARCHAR(128),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tenants (
        id VARCHAR(64) PRIMARY KEY,
        slug VARCHAR(128) UNIQUE NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        owner_id VARCHAR(64) REFERENCES customers(id) ON DELETE CASCADE,
        subscription_id VARCHAR(64) REFERENCES subscriptions(id) ON DELETE SET NULL,
        status VARCHAR(32) NOT NULL DEFAULT 'active',
        provisioning_status VARCHAR(32) NOT NULL DEFAULT 'ready',
        environment VARCHAR(32) NOT NULL DEFAULT 'production',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_accounts (
        id VARCHAR(64) PRIMARY KEY,
        company_id VARCHAR(64) REFERENCES companies(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255),
        role VARCHAR(64) NOT NULL DEFAULT 'manager',
        status VARCHAR(32) NOT NULL DEFAULT 'active',
        last_access VARCHAR(128),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Ensure password column in user_accounts
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_accounts' AND column_name='password') THEN
          ALTER TABLE user_accounts ADD COLUMN password VARCHAR(255);
        END IF;
      END $$;

      CREATE TABLE IF NOT EXISTS security_settings (
        customer_id VARCHAR(64) PRIMARY KEY REFERENCES customers(id) ON DELETE CASCADE,
        two_factor_enabled BOOLEAN DEFAULT true,
        password_last_changed VARCHAR(128) DEFAULT '15 de Julho de 2026',
        active_sessions_json JSONB,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS audit_logs (
        id VARCHAR(64) PRIMARY KEY,
        company_id VARCHAR(64),
        action VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        ip_address VARCHAR(64),
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(64),
        company VARCHAR(255),
        store_type VARCHAR(128),
        interest VARCHAR(128),
        message TEXT,
        status VARCHAR(32) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        source VARCHAR(128) DEFAULT 'footer',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('[DB] PostgreSQL schema ready.');

    // 2. SEED ADMIN USER: admin@brand-plus-nine.vercel.app / Ma596220@
    await query(
      `INSERT INTO customers (id, name, email, password, phone, role, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (email) DO UPDATE 
       SET password = EXCLUDED.password, role = EXCLUDED.role, name = EXCLUDED.name;`,
      [
        'usr_admin_brandplus',
        'Administrador Geral BRAND+',
        'admin@brand-plus-nine.vercel.app',
        'Ma596220@',
        '(11) 99880-1000',
        'superadmin',
      ]
    );

    // Seed Admin Company
    await query(
      `INSERT INTO companies (id, customer_id, corporate_name, trade_name, cnpj, phone, email, address_json, segment, store_count, estimated_products, has_ecommerce, has_erp)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       ON CONFLICT (id) DO UPDATE
       SET trade_name = EXCLUDED.trade_name, corporate_name = EXCLUDED.corporate_name;`,
      [
        'comp_admin_hub',
        'usr_admin_brandplus',
        'BRAND+ Omnichannel Technologies S.A.',
        'BRAND+ Enterprise Operations',
        '38.924.112/0001-90',
        '(11) 4004-9090',
        'admin@brand-plus-nine.vercel.app',
        JSON.stringify({
          zipCode: '01452-000',
          street: 'Avenida Brigadeiro Faria Lima',
          number: '3477',
          complement: '14º Andar - Torre Sul',
          neighborhood: 'Itaim Bibi',
          city: 'São Paulo',
          state: 'SP',
        }),
        'Tecnologia & Varejo Multicanal',
        '15 lojas conectadas',
        '25.000 itens',
        true,
        true,
      ]
    );

    // Seed Admin Subscription (Enterprise Ultra)
    await query(
      `INSERT INTO subscriptions (id, customer_id, company_id, plan_id, plan_name, status, billing_cycle, current_price, start_date, next_billing_date, payment_method_json, cancel_at_period_end)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW() - INTERVAL '6 months', NOW() + INTERVAL '6 months', $9, false)
       ON CONFLICT (id) DO UPDATE
       SET status = EXCLUDED.status, plan_name = EXCLUDED.plan_name;`,
      [
        'sub_admin_enterprise_01',
        'usr_admin_brandplus',
        'comp_admin_hub',
        'enterprise',
        'BRAND+ Enterprise Ultra',
        'active',
        'annual',
        1299.0,
        JSON.stringify({
          type: 'credit_card',
          details: 'Mastercard Black Final 8820 (Corporativo)',
          cardBrand: 'Mastercard',
          lastDigits: '8820',
          expiryDate: '12/2029',
        }),
      ]
    );

    // Seed Admin Tenant
    await query(
      `INSERT INTO tenants (id, slug, company_name, owner_id, subscription_id, status, provisioning_status, environment, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW() - INTERVAL '6 months')
       ON CONFLICT (id) DO NOTHING;`,
      [
        'ten_admin_hub_01',
        'brand-plus-enterprise',
        'BRAND+ Enterprise Operations',
        'usr_admin_brandplus',
        'sub_admin_enterprise_01',
        'active',
        'ready',
        'production',
      ]
    );

    // Seed Admin Users
    await query(
      `INSERT INTO user_accounts (id, company_id, name, email, password, role, status, last_access)
       VALUES 
        ('u_admin_master', 'comp_admin_hub', 'Administrador Geral BRAND+', 'admin@brand-plus-nine.vercel.app', 'Ma596220@', 'superadmin', 'active', 'Ativo agora'),
        ('u_admin_tech', 'comp_admin_hub', 'Engenharia de Plataforma', 'tech@brandplus.com.br', 'Tech@2026', 'manager', 'active', 'Hoje às 11:20'),
        ('u_admin_billing', 'comp_admin_hub', 'Controladoria Financeira', 'financeiro-global@brandplus.com.br', 'Fin@2026', 'billing', 'active', 'Ontem às 16:45')
       ON CONFLICT (id) DO UPDATE
       SET password = EXCLUDED.password, role = EXCLUDED.role;`
    );

    // 3. SEED CLIENT: Carlos Alberto Mendonça (Requinte Calçados)
    await query(
      `INSERT INTO customers (id, name, email, password, phone, role, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, '2026-03-10T10:00:00Z')
       ON CONFLICT (email) DO UPDATE
       SET password = EXCLUDED.password, name = EXCLUDED.name;`,
      [
        'usr_carlos_991',
        'Carlos Alberto Mendonça',
        'carlos@calcadosrequinte.com.br',
        'Carlos@2026',
        '(11) 98452-1100',
        'owner',
      ]
    );

    await query(
      `INSERT INTO companies (id, customer_id, corporate_name, trade_name, cnpj, phone, email, address_json, segment, store_count, estimated_products, has_ecommerce, has_erp)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       ON CONFLICT (id) DO NOTHING;`,
      [
        'comp_requinte_001',
        'usr_carlos_991',
        'Requinte Calçados e Artigos de Couro Ltda',
        'Requinte Calçados',
        '14.285.932/0001-84',
        '(11) 3456-7890',
        'financeiro@calcadosrequinte.com.br',
        JSON.stringify({
          zipCode: '01310-200',
          street: 'Avenida Paulista',
          number: '1800',
          complement: 'Sala 402',
          neighborhood: 'Bela Vista',
          city: 'São Paulo',
          state: 'SP',
        }),
        'Moda & Calçados',
        '2 lojas',
        '1.850 itens',
        true,
        true,
      ]
    );

    await query(
      `INSERT INTO subscriptions (id, customer_id, company_id, plan_id, plan_name, status, billing_cycle, current_price, start_date, next_billing_date, payment_method_json, cancel_at_period_end)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, '2026-03-10T10:00:00Z', NOW() + INTERVAL '22 days', $9, false)
       ON CONFLICT (id) DO NOTHING;`,
      [
        'sub_active_889',
        'usr_carlos_991',
        'comp_requinte_001',
        'growth',
        'BRAND+ Growth',
        'active',
        'monthly',
        329.0,
        JSON.stringify({
          type: 'pix',
          details: 'PIX Automático / QR Dinâmico',
        }),
      ]
    );

    await query(
      `INSERT INTO tenants (id, slug, company_name, owner_id, subscription_id, status, provisioning_status, environment, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, '2026-03-10T10:00:00Z')
       ON CONFLICT (id) DO NOTHING;`,
      [
        'ten_requinte_01',
        'requinte-calcados',
        'Requinte Calçados',
        'usr_carlos_991',
        'sub_active_889',
        'active',
        'ready',
        'production',
      ]
    );

    // Seed Carlos users
    await query(
      `INSERT INTO user_accounts (id, company_id, name, email, password, role, status, last_access)
       VALUES 
        ('u_1', 'comp_requinte_001', 'Carlos Alberto Mendonça', 'carlos@calcadosrequinte.com.br', 'Carlos@2026', 'owner', 'active', 'Hoje às 10:14'),
        ('u_2', 'comp_requinte_001', 'Mariana Silveira (Gerente Operacional)', 'mariana@calcadosrequinte.com.br', 'Mari@2026', 'manager', 'active', 'Ontem às 18:30'),
        ('u_3', 'comp_requinte_001', 'Roberto Dias (Contabilidade / Faturamento)', 'financeiro@calcadosrequinte.com.br', 'Rob@2026', 'billing', 'active', '12 Ago 2026')
       ON CONFLICT (id) DO NOTHING;`
    );

    // 4. SEED ADDITIONAL RETAIL COMPANIES (Ótica Visão Real, Donna Bella, Rede Estrela, Drogaria Vida)
    const extraCompanies = [
      {
        custId: 'usr_fernanda_772',
        name: 'Dra. Fernanda Peixoto',
        email: 'fernanda@visaoreal.com.br',
        phone: '(21) 98765-4321',
        compId: 'comp_otica_002',
        corpName: 'Óptica e Consultoria Visão Real Eireli',
        tradeName: 'Ótica Visão Real',
        cnpj: '28.114.908/0001-33',
        segment: 'Óticas & Saúde Visual',
        stores: '3 lojas',
        products: '3.400 itens',
        planId: 'growth',
        planName: 'BRAND+ Growth',
        price: 329.0,
        subId: 'sub_otica_002',
        tenantId: 'ten_otica_002',
        slug: 'otica-visao-real',
      },
      {
        custId: 'usr_camila_331',
        name: 'Camila Arantes Vasconcelos',
        email: 'camila@donnabella.com.br',
        phone: '(31) 99123-8877',
        compId: 'comp_boutique_003',
        corpName: 'Donna Bella Alta Moda & Acessórios Ltda',
        tradeName: 'Donna Bella Boutique',
        cnpj: '31.455.678/0001-22',
        segment: 'Vestuário & Alta Costura',
        stores: '1 flagship store',
        products: '890 itens',
        planId: 'starter',
        planName: 'BRAND+ Starter',
        price: 199.0,
        subId: 'sub_donnabella_003',
        tenantId: 'ten_donnabella_003',
        slug: 'donna-bella-boutique',
      },
      {
        custId: 'usr_marcos_554',
        name: 'Marcos Vinicius Ribeiro',
        email: 'marcos@superestrela.com.br',
        phone: '(41) 98844-2211',
        compId: 'comp_supermercado_004',
        corpName: 'Rede Estrela Distribuição e Alimentos S.A.',
        tradeName: 'Rede Estrela Supermercados',
        cnpj: '07.399.120/0001-50',
        segment: 'Supermercados & Mercearia',
        stores: '6 filiais',
        products: '14.500 itens',
        planId: 'enterprise',
        planName: 'BRAND+ Enterprise',
        price: 799.0,
        subId: 'sub_estrela_004',
        tenantId: 'ten_estrela_004',
        slug: 'rede-estrela-supermercados',
      },
      {
        custId: 'usr_luciana_882',
        name: 'Dra. Luciana Prado Rocha',
        email: 'luciana@farmaciavida.com.br',
        phone: '(51) 99770-3344',
        compId: 'comp_drogaria_005',
        corpName: 'Farmácia & Laboratório de Manipulação Vida Ltda',
        tradeName: 'Drogaria & Manipulação Vida',
        cnpj: '19.822.441/0001-95',
        segment: 'Farmácias & Cosméticos',
        stores: '4 unidades',
        products: '6.200 itens',
        planId: 'growth',
        planName: 'BRAND+ Growth',
        price: 329.0,
        subId: 'sub_drogaria_005',
        tenantId: 'ten_drogaria_005',
        slug: 'drogaria-manipulacao-vida',
      },
    ];

    for (const ec of extraCompanies) {
      await query(
        `INSERT INTO customers (id, name, email, password, phone, role)
         VALUES ($1, $2, $3, $4, $5, 'owner')
         ON CONFLICT (email) DO NOTHING;`,
        [ec.custId, ec.name, ec.email, 'Cliente@2026', ec.phone]
      );

      await query(
        `INSERT INTO companies (id, customer_id, corporate_name, trade_name, cnpj, phone, email, segment, store_count, estimated_products, has_ecommerce, has_erp)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true, true)
         ON CONFLICT (id) DO NOTHING;`,
        [ec.compId, ec.custId, ec.corpName, ec.tradeName, ec.cnpj, ec.phone, ec.email, ec.segment, ec.stores, ec.products]
      );

      await query(
        `INSERT INTO subscriptions (id, customer_id, company_id, plan_id, plan_name, status, billing_cycle, current_price, start_date, next_billing_date, payment_method_json)
         VALUES ($1, $2, $3, $4, $5, 'active', 'monthly', $6, NOW() - INTERVAL '2 months', NOW() + INTERVAL '1 month', $7)
         ON CONFLICT (id) DO NOTHING;`,
        [ec.subId, ec.custId, ec.compId, ec.planId, ec.planName, ec.price, JSON.stringify({ type: 'credit_card', details: 'Cartão de Crédito Corporativo' })]
      );

      await query(
        `INSERT INTO tenants (id, slug, company_name, owner_id, subscription_id, status, provisioning_status, environment)
         VALUES ($1, $2, $3, $4, $5, 'active', 'ready', 'production')
         ON CONFLICT (id) DO NOTHING;`,
        [ec.tenantId, ec.slug, ec.tradeName, ec.custId, ec.subId]
      );

      await query(
        `INSERT INTO user_accounts (id, company_id, name, email, password, role, status, last_access)
         VALUES ($1, $2, $3, $4, 'Senha@123', 'owner', 'active', 'Ontem')
         ON CONFLICT (id) DO NOTHING;`,
        [`u_${ec.custId}`, ec.compId, ec.name, ec.email]
      );
    }

    // 5. SEED INVOICES (Admin & Client invoices)
    const initialInvoices = [
      {
        id: 'inv_adm_2026_08',
        num: 'FAT-2026-01100',
        subId: 'sub_admin_enterprise_01',
        compId: 'comp_admin_hub',
        custId: 'usr_admin_brandplus',
        amount: 1299.0,
        status: 'paid',
        issueDate: '2026-08-01T10:00:00Z',
        dueDate: '2026-08-05T23:59:59Z',
        payDate: '2026-08-01T10:05:00Z',
        method: 'credit_card',
        planName: 'BRAND+ Enterprise Ultra (Anual)',
      },
      {
        id: 'inv_2026_08',
        num: 'FAT-2026-00981',
        subId: 'sub_active_889',
        compId: 'comp_requinte_001',
        custId: 'usr_carlos_991',
        amount: 329.0,
        status: 'paid',
        issueDate: '2026-08-10T10:00:00Z',
        dueDate: '2026-08-15T23:59:59Z',
        payDate: '2026-08-10T14:32:10Z',
        method: 'pix',
        planName: 'BRAND+ Growth (Mensal)',
      },
      {
        id: 'inv_2026_07',
        num: 'FAT-2026-00844',
        subId: 'sub_active_889',
        compId: 'comp_requinte_001',
        custId: 'usr_carlos_991',
        amount: 329.0,
        status: 'paid',
        issueDate: '2026-07-10T10:00:00Z',
        dueDate: '2026-07-15T23:59:59Z',
        payDate: '2026-07-11T09:15:00Z',
        method: 'credit_card',
        planName: 'BRAND+ Growth (Mensal)',
      },
      {
        id: 'inv_2026_06',
        num: 'FAT-2026-00712',
        subId: 'sub_active_889',
        compId: 'comp_requinte_001',
        custId: 'usr_carlos_991',
        amount: 329.0,
        status: 'paid',
        issueDate: '2026-06-10T10:00:00Z',
        dueDate: '2026-06-15T23:59:59Z',
        payDate: '2026-06-10T11:45:22Z',
        method: 'credit_card',
        planName: 'BRAND+ Growth (Mensal)',
      },
      {
        id: 'inv_otica_08',
        num: 'FAT-2026-00995',
        subId: 'sub_otica_002',
        compId: 'comp_otica_002',
        custId: 'usr_fernanda_772',
        amount: 329.0,
        status: 'paid',
        issueDate: '2026-08-05T10:00:00Z',
        dueDate: '2026-08-10T23:59:59Z',
        payDate: '2026-08-05T12:00:00Z',
        method: 'credit_card',
        planName: 'BRAND+ Growth (Mensal)',
      },
      {
        id: 'inv_estrela_08',
        num: 'FAT-2026-01004',
        subId: 'sub_estrela_004',
        compId: 'comp_supermercado_004',
        custId: 'usr_marcos_554',
        amount: 799.0,
        status: 'paid',
        issueDate: '2026-08-02T10:00:00Z',
        dueDate: '2026-08-07T23:59:59Z',
        payDate: '2026-08-02T15:20:00Z',
        method: 'pix',
        planName: 'BRAND+ Enterprise (Mensal)',
      },
    ];

    for (const inv of initialInvoices) {
      await query(
        `INSERT INTO invoices (id, invoice_number, subscription_id, company_id, customer_id, amount, status, issue_date, due_date, payment_date, payment_method, pdf_url, receipt_url, plan_name)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
         ON CONFLICT (id) DO NOTHING;`,
        [
          inv.id,
          inv.num,
          inv.subId,
          inv.compId,
          inv.custId,
          inv.amount,
          inv.status,
          inv.issueDate,
          inv.dueDate,
          inv.payDate,
          inv.method,
          `#recibo-${inv.num}`,
          `#comprovante-${inv.num}`,
          inv.planName,
        ]
      );
    }

    // 6. SEED AUDIT LOGS
    await query(
      `INSERT INTO audit_logs (id, company_id, action, user_email, ip_address, timestamp)
       VALUES 
        ('log_admin_01', 'comp_admin_hub', 'Acesso administrativo autorizado ao Painel Geral BRAND+', 'admin@brand-plus-nine.vercel.app', '187.54.12.90', NOW()),
        ('log_admin_02', 'comp_admin_hub', 'Banco de dados Neon PostgreSQL sincronizado com sucesso', 'admin@brand-plus-nine.vercel.app', 'Neon Pooler Serverless', NOW() - INTERVAL '10 minutes'),
        ('log_carlos_01', 'comp_requinte_001', 'Acesso autorizado ao Portal do Cliente', 'carlos@calcadosrequinte.com.br', '177.136.88.12', NOW() - INTERVAL '2 hours'),
        ('log_carlos_02', 'comp_requinte_001', 'Fatura FAT-2026-00981 quitada via PIX', 'sistema@brandplus.com.br', 'Gateway Asaas/PIX', NOW() - INTERVAL '1 day'),
        ('log_otica_01', 'comp_otica_002', 'Sincronização de catálogo multicanal realizada', 'fernanda@visaoreal.com.br', '201.88.14.33', NOW() - INTERVAL '3 hours')
       ON CONFLICT (id) DO NOTHING;`
    );

    // 7. SEED INBOUND LEADS
    await query(
      `INSERT INTO leads (name, email, phone, company, store_type, interest, message, status)
       VALUES 
        ('Rodrigo Albuquerque', 'rodrigo@lojaskadosh.com.br', '(11) 98765-1122', 'Lojas Kadosh Modas', 'Moda & Calçados', 'Omnichannel e Unificação de Estoque', 'Possuímos 4 lojas físicas e precisamos integrar com o e-commerce urgente.', 'in_progress'),
        ('Beatriz Sampaio', 'beatriz@farmaciasantabarbara.com.br', '(31) 99882-3344', 'Rede Santa Bárbara', 'Farmácia & Drogaria', 'ERP e Pedidos Online', 'Gostaria de agendar uma demonstração do módulo de gestão fiscal e estoque.', 'new'),
        ('Gustavo Henke', 'gustavo@henkesport.com.br', '(47) 99112-7788', 'Henke Sports & Outdoor', 'Artigos Esportivos', 'Migração de Plataforma', 'Estamos saindo de um sistema legado e precisamos de alta performance.', 'contacted')
       ON CONFLICT DO NOTHING;`
    );

    // 8. SEED NEWSLETTER SUBSCRIBERS
    await query(
      `INSERT INTO newsletter_subscribers (email, source)
       VALUES 
        ('varejodigital@lojista.com.br', 'home_hero'),
        ('contato@modasp.com.br', 'blog_footer'),
        ('diretoria@calcadosbrasil.com.br', 'planos_cta')
       ON CONFLICT (email) DO NOTHING;`
    );

    console.log('[DB] Complete BRAND+ PostgreSQL database successfully populated with admin and retail ecosystem!');
  } catch (error) {
    console.error('[DB] Error initializing Neon PostgreSQL database:', error);
  }
}
