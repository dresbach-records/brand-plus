import { PaymentStatus, SubscriptionStatus } from '@prisma/client';
import { PaymentRepository } from '../repositories/paymentRepository';
import { SubscriptionRepository } from '../repositories/subscriptionRepository';
import { InvoiceRepository } from '../repositories/invoiceRepository';
import { CheckoutRepository } from '../repositories/checkoutRepository';
import { CompanyRepository } from '../repositories/companyRepository';
import { ProvisioningService } from './provisioningService';
import { ExternalPaymentProvider } from './paymentProvider';
import { NotFoundError } from '../errors/AppError';

const paymentRepository = new PaymentRepository();
const subscriptionRepository = new SubscriptionRepository();
const invoiceRepository = new InvoiceRepository();
const checkoutRepository = new CheckoutRepository();
const companyRepository = new CompanyRepository();
const paymentProvider = new ExternalPaymentProvider();

export class PaymentService {
  async processPayment(
    tenantId: string,
    data: {
      subscriptionId?: string;
      checkoutSessionId?: string;
      paymentMethod: 'pix' | 'credit_card' | 'boleto';
    }
  ) {
    let sub = data.subscriptionId ? await subscriptionRepository.findById(data.subscriptionId) : null;
    let checkout = data.checkoutSessionId ? await checkoutRepository.findById(data.checkoutSessionId) : null;

    if (!sub && checkout) {
      const now = new Date();
      const periodEnd = new Date();
      if (checkout.billingCycle === 'yearly') {
        periodEnd.setFullYear(now.getFullYear() + 1);
      } else {
        periodEnd.setMonth(now.getMonth() + 1);
      }

      sub = await subscriptionRepository.create({
        tenantId,
        planId: checkout.planId,
        planName: checkout.plan.name,
        billingCycle: checkout.billingCycle,
        priceMonthly: checkout.plan.priceMonthly,
        priceYearly: checkout.plan.priceYearly,
        status: SubscriptionStatus.pending,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
      });
    }

    if (!sub) {
      throw new NotFoundError('Assinatura ou sessão de checkout não encontrada para processar o pagamento.');
    }

    const amount = sub.billingCycle === 'yearly' ? sub.priceYearly : sub.priceMonthly;

    const providerResult = await paymentProvider.createPaymentIntent({
      amount,
      currency: 'BRL',
      paymentMethod: data.paymentMethod,
      customerEmail: checkout?.customerEmail || 'cliente@brandplus.com.br',
      customerName: checkout?.customerName || 'Cliente BRAND+',
      description: `Assinatura Plano ${sub.planName} (${sub.billingCycle})`,
    });

    const payment = await paymentRepository.create({
      tenantId,
      subscriptionId: sub.id,
      checkoutSessionId: checkout?.id,
      amount,
      currency: 'BRL',
      status: PaymentStatus.pending,
      paymentMethod: data.paymentMethod,
      gateway: 'external_gateway',
      transactionId: providerResult.transactionId,
    });

    const company = await companyRepository.findByTenantId(tenantId);
    const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const invoice = await invoiceRepository.create({
      tenantId,
      companyId: company?.id,
      subscriptionId: sub.id,
      paymentId: payment.id,
      amount,
      currency: 'BRL',
      status: 'pending',
      paymentMethod: data.paymentMethod,
      dueDate,
    });

    return {
      paymentId: payment.id,
      invoiceId: invoice.id,
      transactionId: payment.transactionId,
      status: payment.status,
      amount: Number(payment.amount),
      currency: payment.currency,
      paymentMethod: payment.paymentMethod,
      pixQrCode: providerResult.pixQrCode,
      pixCopyPaste: providerResult.pixCopyPaste,
      boletoUrl: providerResult.boletoUrl,
      boletoBarcode: providerResult.boletoBarcode,
    };
  }

  async getPayments(tenantId: string) {
    const payments = await paymentRepository.findByTenant(tenantId);
    return payments.map((p: any) => ({
      id: p.id,
      amount: Number(p.amount),
      currency: p.currency,
      status: p.status,
      paymentMethod: p.paymentMethod,
      transactionId: p.transactionId,
      paidAt: p.paidAt,
      createdAt: p.createdAt,
    }));
  }
}
