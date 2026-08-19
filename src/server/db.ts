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
 * Initialize all database tables and seed initial data if needed
 */
export async function initDb(): Promise<void> {
  console.log('[DB] Connecting to Neon PostgreSQL and initializing schema...');
  try {
    // 1. Create Tables
    await query(`
      CREATE TABLE IF NOT EXISTS customers (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(64),
        avatar_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

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
        role VARCHAR(64) NOT NULL DEFAULT 'manager',
        status VARCHAR(32) NOT NULL DEFAULT 'active',
        last_access VARCHAR(128),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

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

    console.log('[DB] PostgreSQL schema created successfully.');

    // 2. Check if default customer exists, if not, seed default demo data
    const existing = await query(`SELECT id FROM customers WHERE id = 'usr_carlos_991' LIMIT 1;`);
    if (existing.length === 0) {
      console.log('[DB] Seeding initial BRAND+ demo data...');

      await query(
        `INSERT INTO customers (id, name, email, phone, created_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO NOTHING;`,
        [
          'usr_carlos_991',
          'Carlos Alberto Mendonça',
          'carlos@calcadosrequinte.com.br',
          '(11) 98452-1100',
          '2026-03-10T10:00:00Z',
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
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
          '2026-03-10T10:00:00Z',
          '2026-09-10T10:00:00Z',
          JSON.stringify({
            type: 'pix',
            details: 'PIX Automático / QR Dinâmico',
          }),
          false,
        ]
      );

      await query(
        `INSERT INTO tenants (id, slug, company_name, owner_id, subscription_id, status, provisioning_status, environment, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
          '2026-03-10T10:00:00Z',
        ]
      );

      // Seed invoices
      const initialInvoices = [
        {
          id: 'inv_2026_08',
          num: 'FAT-2026-00981',
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
          amount: 329.0,
          status: 'paid',
          issueDate: '2026-06-10T10:00:00Z',
          dueDate: '2026-06-15T23:59:59Z',
          payDate: '2026-06-10T11:45:22Z',
          method: 'credit_card',
          planName: 'BRAND+ Growth (Mensal)',
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
            'sub_active_889',
            'comp_requinte_001',
            'usr_carlos_991',
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

      // Seed Users
      const initialUsers = [
        {
          id: 'u_1',
          name: 'Carlos Alberto Mendonça',
          email: 'carlos@calcadosrequinte.com.br',
          role: 'owner',
          status: 'active',
          lastAccess: 'Hoje às 10:14',
        },
        {
          id: 'u_2',
          name: 'Mariana Silveira (Gerente Operacional)',
          email: 'mariana@calcadosrequinte.com.br',
          role: 'manager',
          status: 'active',
          lastAccess: 'Ontem às 18:30',
        },
        {
          id: 'u_3',
          name: 'Roberto Dias (Contabilidade / Faturamento)',
          email: 'financeiro@calcadosrequinte.com.br',
          role: 'billing',
          status: 'active',
          lastAccess: '12 Ago 2026',
        },
      ];

      for (const u of initialUsers) {
        await query(
          `INSERT INTO user_accounts (id, company_id, name, email, role, status, last_access)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO NOTHING;`,
          [u.id, 'comp_requinte_001', u.name, u.email, u.role, u.status, u.lastAccess]
        );
      }

      // Seed Audit Logs
      await query(
        `INSERT INTO audit_logs (id, company_id, action, user_email, ip_address, timestamp)
         VALUES 
          ('log_1', 'comp_requinte_001', 'Acesso autorizado ao Portal do Cliente', 'carlos@calcadosrequinte.com.br', '177.136.88.12', NOW()),
          ('log_2', 'comp_requinte_001', 'Fatura FAT-2026-00981 quitada via PIX', 'sistema@brandplus.com.br', 'Gateway Asaas/PIX', NOW() - INTERVAL '1 day'),
          ('log_3', 'comp_requinte_001', 'Banco de dados Neon PostgreSQL conectado com sucesso', 'sistema@brandplus.com.br', 'Neon Pooler', NOW())
         ON CONFLICT (id) DO NOTHING;`
      );

      console.log('[DB] Initial demo data seeded into Neon PostgreSQL.');
    }
  } catch (error) {
    console.error('[DB] Error initializing Neon PostgreSQL database:', error);
  }
}
