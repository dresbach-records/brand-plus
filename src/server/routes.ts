import { Router, Request, Response } from 'express';
import { query, pool } from './db';

export const apiRouter = Router();

/**
 * Health check & DB connection diagnostics
 */
apiRouter.get('/health', async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const rows = await query(`SELECT NOW() as current_time, current_database() as db_name, version() as pg_version;`);
    const latencyMs = Date.now() - startTime;
    return res.json({
      status: 'ok',
      database: 'Neon PostgreSQL',
      connected: true,
      latencyMs,
      serverTime: rows[0]?.current_time,
      dbName: rows[0]?.db_name,
      pgVersion: rows[0]?.pg_version,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: 'error',
      database: 'Neon PostgreSQL',
      connected: false,
      error: err.message,
    });
  }
});

/**
 * GET /api/v1/customer/profile
 * Returns customer, company, subscription, tenant, and users data from PostgreSQL
 */
apiRouter.get('/customer/profile', async (req: Request, res: Response) => {
  try {
    const customerId = (req.query.customerId as string) || 'usr_carlos_991';

    // 1. Fetch customer
    const customers = await query(`SELECT * FROM customers WHERE id = $1 LIMIT 1;`, [customerId]);
    if (customers.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const rawCustomer = customers[0];
    const customer = {
      id: rawCustomer.id,
      name: rawCustomer.name,
      email: rawCustomer.email,
      phone: rawCustomer.phone,
      createdAt: rawCustomer.created_at,
      avatarUrl: rawCustomer.avatar_url,
    };

    // 2. Fetch company
    const companies = await query(`SELECT * FROM companies WHERE customer_id = $1 LIMIT 1;`, [customerId]);
    const rawComp = companies[0] || {};
    const company = {
      id: rawComp.id,
      corporateName: rawComp.corporate_name,
      tradeName: rawComp.trade_name,
      cnpj: rawComp.cnpj,
      phone: rawComp.phone,
      email: rawComp.email,
      address: typeof rawComp.address_json === 'string' ? JSON.parse(rawComp.address_json) : rawComp.address_json || {},
      segment: rawComp.segment,
      storeCount: rawComp.store_count,
      estimatedProducts: rawComp.estimated_products,
      hasEcommerce: rawComp.has_ecommerce,
      hasERP: rawComp.has_erp,
    };

    // 3. Fetch active subscription
    const subscriptions = await query(
      `SELECT * FROM subscriptions WHERE customer_id = $1 ORDER BY created_at DESC LIMIT 1;`,
      [customerId]
    );
    const rawSub = subscriptions[0] || {};
    const subscription = {
      id: rawSub.id,
      customerId: rawSub.customer_id,
      companyId: rawSub.company_id,
      planId: rawSub.plan_id,
      planName: rawSub.plan_name,
      status: rawSub.status,
      billingCycle: rawSub.billing_cycle,
      currentPrice: Number(rawSub.current_price || 0),
      startDate: rawSub.start_date,
      nextBillingDate: rawSub.next_billing_date,
      paymentMethod:
        typeof rawSub.payment_method_json === 'string'
          ? JSON.parse(rawSub.payment_method_json)
          : rawSub.payment_method_json || { type: 'pix', details: 'PIX Automático' },
      cancelAtPeriodEnd: rawSub.cancel_at_period_end,
    };

    // 4. Fetch Tenant
    const tenants = await query(`SELECT * FROM tenants WHERE owner_id = $1 LIMIT 1;`, [customerId]);
    const rawTenant = tenants[0] || {};
    const tenant = {
      id: rawTenant.id,
      slug: rawTenant.slug,
      companyName: rawTenant.company_name,
      ownerId: rawTenant.owner_id,
      subscriptionId: rawTenant.subscription_id,
      status: rawTenant.status,
      provisioningStatus: rawTenant.provisioning_status,
      environment: rawTenant.environment,
      createdAt: rawTenant.created_at,
    };

    return res.json({
      customer,
      company,
      subscription,
      tenant,
    });
  } catch (err: any) {
    console.error('Error fetching customer profile from DB:', err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /api/v1/companies/:id
 * Updates company profile
 */
apiRouter.put('/companies/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const addressJson = JSON.stringify(body.address || {});

    await query(
      `UPDATE companies 
       SET corporate_name = COALESCE($1, corporate_name),
           trade_name = COALESCE($2, trade_name),
           cnpj = COALESCE($3, cnpj),
           phone = COALESCE($4, phone),
           email = COALESCE($5, email),
           address_json = $6,
           segment = COALESCE($7, segment),
           store_count = COALESCE($8, store_count),
           estimated_products = COALESCE($9, estimated_products),
           has_ecommerce = COALESCE($10, has_ecommerce),
           has_erp = COALESCE($11, has_erp),
           updated_at = NOW()
       WHERE id = $12;`,
      [
        body.corporateName,
        body.tradeName,
        body.cnpj,
        body.phone,
        body.email,
        addressJson,
        body.segment,
        body.storeCount,
        body.estimatedProducts,
        body.hasEcommerce,
        body.hasERP,
        id,
      ]
    );

    // Audit log
    await query(
      `INSERT INTO audit_logs (id, company_id, action, user_email, ip_address, timestamp)
       VALUES ($1, $2, $3, $4, $5, NOW());`,
      [
        `log_${Date.now()}`,
        id,
        'Atualização dos dados cadastrais da empresa',
        body.email || 'usuario@brandplus.com.br',
        req.ip || '127.0.0.1',
      ]
    );

    return res.json({ success: true, message: 'Dados da empresa atualizados com sucesso no Neon PostgreSQL' });
  } catch (err: any) {
    console.error('Error updating company in DB:', err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/v1/invoices
 * Retrieves all invoices for a company
 */
apiRouter.get('/invoices', async (req: Request, res: Response) => {
  try {
    const companyId = (req.query.companyId as string) || 'comp_requinte_001';
    const rows = await query(
      `SELECT * FROM invoices WHERE company_id = $1 ORDER BY issue_date DESC;`,
      [companyId]
    );

    const invoices = rows.map((r) => ({
      id: r.id,
      invoiceNumber: r.invoice_number,
      subscriptionId: r.subscription_id,
      amount: Number(r.amount),
      status: r.status,
      issueDate: r.issue_date,
      dueDate: r.due_date,
      paymentDate: r.payment_date,
      paymentMethod: r.payment_method,
      pdfUrl: r.pdf_url,
      receiptUrl: r.receipt_url,
      planName: r.plan_name,
    }));

    return res.json(invoices);
  } catch (err: any) {
    console.error('Error fetching invoices:', err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/v1/checkout
 * Processes complete commercial checkout and creates all entities in Neon PostgreSQL
 */
apiRouter.post('/checkout', async (req: Request, res: Response) => {
  try {
    const { account, company, planId, billingCycle, payment, orderSummary } = req.body;

    const customerId = `usr_${Date.now()}`;
    const companyId = `comp_${Date.now()}`;
    const subscriptionId = `sub_${Date.now()}`;
    const tenantId = `ten_${Date.now()}`;
    const invoiceId = `inv_${Date.now()}`;
    const invoiceNum = `FAT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const slug = (company.tradeName || 'empresa')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // 1. Create or Update Customer
    await query(
      `INSERT INTO customers (id, name, email, phone)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE 
       SET name = EXCLUDED.name, phone = EXCLUDED.phone, updated_at = NOW()
       RETURNING id;`,
      [customerId, account.fullName, account.email, account.phone]
    );

    // 2. Create Company
    const addressJson = JSON.stringify({
      zipCode: company.zipCode,
      street: company.street,
      number: company.number,
      complement: company.complement,
      neighborhood: company.neighborhood,
      city: company.city,
      state: company.state,
    });

    await query(
      `INSERT INTO companies (id, customer_id, corporate_name, trade_name, cnpj, phone, email, address_json, segment, store_count, estimated_products, has_ecommerce, has_erp)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`,
      [
        companyId,
        customerId,
        company.corporateName || company.tradeName,
        company.tradeName,
        company.cnpj || '00.000.000/0001-00',
        company.phone || account.phone,
        company.commercialEmail || account.email,
        addressJson,
        company.segment || 'Varejo Geral',
        company.storeCount || '1 loja',
        company.estimatedProducts || '500 itens',
        company.hasEcommerce ?? true,
        company.hasERP ?? false,
      ]
    );

    // 3. Create Subscription
    const planName = `BRAND+ ${planId.toUpperCase()}`;
    const paymentMethodJson = JSON.stringify({
      type: payment.method,
      details:
        payment.method === 'pix'
          ? 'PIX Instantâneo'
          : payment.method === 'credit_card'
          ? `Cartão de Crédito (${payment.creditCard?.holderName || 'Titular'})`
          : 'Boleto Bancário',
    });

    const nextBilling = new Date();
    if (billingCycle === 'annual') {
      nextBilling.setFullYear(nextBilling.getFullYear() + 1);
    } else {
      nextBilling.setMonth(nextBilling.getMonth() + 1);
    }

    await query(
      `INSERT INTO subscriptions (id, customer_id, company_id, plan_id, plan_name, status, billing_cycle, current_price, next_billing_date, payment_method_json)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
      [
        subscriptionId,
        customerId,
        companyId,
        planId,
        planName,
        'active',
        billingCycle,
        orderSummary?.total || 199.0,
        nextBilling.toISOString(),
        paymentMethodJson,
      ]
    );

    // 4. Create Tenant
    await query(
      `INSERT INTO tenants (id, slug, company_name, owner_id, subscription_id, status, provisioning_status, environment)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
      [
        tenantId,
        `${slug}-${Math.floor(100 + Math.random() * 900)}`,
        company.tradeName,
        customerId,
        subscriptionId,
        'active',
        'ready',
        'production',
      ]
    );

    // 5. Create First Paid Invoice
    await query(
      `INSERT INTO invoices (id, invoice_number, subscription_id, company_id, customer_id, amount, status, due_date, payment_date, payment_method, pdf_url, receipt_url, plan_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), $8, $9, $10, $11);`,
      [
        invoiceId,
        invoiceNum,
        subscriptionId,
        companyId,
        customerId,
        orderSummary?.total || 199.0,
        'paid',
        payment.method,
        `#recibo-${invoiceNum}`,
        `#comprovante-${invoiceNum}`,
        `${planName} (${billingCycle === 'annual' ? 'Anual' : 'Mensal'})`,
      ]
    );

    // 6. Create Initial Owner User
    await query(
      `INSERT INTO user_accounts (id, company_id, name, email, role, status, last_access)
       VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [`u_${Date.now()}`, companyId, account.fullName, account.email, 'owner', 'active', 'Recém criado']
    );

    // 7. Audit log
    await query(
      `INSERT INTO audit_logs (id, company_id, action, user_email, ip_address, timestamp)
       VALUES ($1, $2, $3, $4, $5, NOW());`,
      [
        `log_${Date.now()}`,
        companyId,
        `Assinatura do plano ${planName} realizada com sucesso via Checkout`,
        account.email,
        req.ip || '127.0.0.1',
      ]
    );

    return res.json({
      success: true,
      customerId,
      companyId,
      subscriptionId,
      tenantId,
      invoiceNumber: invoiceNum,
      message: 'Checkout processado e persistido no Neon PostgreSQL com sucesso!',
    });
  } catch (err: any) {
    console.error('Error during checkout DB persistence:', err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/v1/users
 * Returns users list for company
 */
apiRouter.get('/users', async (req: Request, res: Response) => {
  try {
    const companyId = (req.query.companyId as string) || 'comp_requinte_001';
    const rows = await query(`SELECT * FROM user_accounts WHERE company_id = $1 ORDER BY created_at ASC;`, [
      companyId,
    ]);

    const users = rows.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      role: r.role,
      status: r.status,
      lastAccess: r.last_access || 'Não acessou ainda',
    }));

    return res.json(users);
  } catch (err: any) {
    console.error('Error fetching users:', err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/v1/users
 * Adds a new user / invites team member
 */
apiRouter.post('/users', async (req: Request, res: Response) => {
  try {
    const { companyId = 'comp_requinte_001', name, email, role } = req.body;
    const newId = `u_${Date.now()}`;

    await query(
      `INSERT INTO user_accounts (id, company_id, name, email, role, status, last_access)
       VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [newId, companyId, name, email, role || 'manager', 'invited', 'Convite enviado']
    );

    await query(
      `INSERT INTO audit_logs (id, company_id, action, user_email, ip_address, timestamp)
       VALUES ($1, $2, $3, $4, $5, NOW());`,
      [
        `log_${Date.now()}`,
        companyId,
        `Convite enviado para novo usuário ${name} (${email}) com cargo ${role}`,
        'admin@brandplus.com.br',
        req.ip || '127.0.0.1',
      ]
    );

    return res.json({
      id: newId,
      name,
      email,
      role,
      status: 'invited',
      lastAccess: 'Convite enviado',
    });
  } catch (err: any) {
    console.error('Error creating user:', err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/v1/subscriptions/change-plan
 */
apiRouter.post('/subscriptions/change-plan', async (req: Request, res: Response) => {
  try {
    const { subscriptionId, planId, billingCycle, price } = req.body;
    const planName = `BRAND+ ${planId.toUpperCase()}`;

    await query(
      `UPDATE subscriptions
       SET plan_id = $1,
           plan_name = $2,
           billing_cycle = $3,
           current_price = $4,
           updated_at = NOW()
       WHERE id = $5;`,
      [planId, planName, billingCycle, price, subscriptionId]
    );

    return res.json({ success: true, planId, planName, billingCycle, currentPrice: price });
  } catch (err: any) {
    console.error('Error changing subscription plan:', err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/v1/leads
 * Saves demo and contact form inquiries to Neon PostgreSQL
 */
apiRouter.post('/leads', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, storeType, interest, message } = req.body;

    const result = await query(
      `INSERT INTO leads (name, email, phone, company, store_type, interest, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, created_at;`,
      [name, email, phone, company, storeType, interest, message]
    );

    return res.json({
      success: true,
      leadId: result[0]?.id,
      message: 'Solicitação de demonstração registrada no banco de dados com sucesso!',
    });
  } catch (err: any) {
    console.error('Error saving lead:', err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/v1/newsletter
 * Saves newsletter subscriber
 */
apiRouter.post('/newsletter', async (req: Request, res: Response) => {
  try {
    const { email, source = 'footer' } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'E-mail é obrigatório' });
    }

    await query(
      `INSERT INTO newsletter_subscribers (email, source)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING;`,
      [email, source]
    );

    return res.json({
      success: true,
      message: 'Inscrição confirmada na newsletter BRAND+!',
    });
  } catch (err: any) {
    console.error('Error saving newsletter subscriber:', err);
    return res.status(500).json({ error: err.message });
  }
});
