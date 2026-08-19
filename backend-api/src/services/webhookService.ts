import { PaymentStatus, SubscriptionStatus } from '@prisma/client';
import { PaymentRepository } from '../repositories/paymentRepository';
import { SubscriptionRepository } from '../repositories/subscriptionRepository';
import { InvoiceRepository } from '../repositories/invoiceRepository';
import { AuditLogRepository } from '../repositories/auditLogRepository';
import { ProvisioningService } from './provisioningService';
import { NotFoundError, BadRequestError } from '../errors/AppError';

const paymentRepository = new PaymentRepository();
const subscriptionRepository = new SubscriptionRepository();
const invoiceRepository = new InvoiceRepository();
const auditLogRepository = new AuditLogRepository();
const provisioningService = new ProvisioningService();

export class WebhookService {
  async processPaymentWebhook(event: {
    eventType: string;
    transactionId: string;
    status: 'approved' | 'failed' | 'refunded';
    paidAt?: string;
  }) {
    if (!event.transactionId) {
      throw new BadRequestError('Id da transação não fornecido no webhook.');
    }

    const payment = await paymentRepository.findByTransactionId(event.transactionId);
    if (!payment) {
      throw new NotFoundError(`Pagamento não encontrado para transactionId: ${event.transactionId}`);
    }

    // Idempotency check: if payment is already processed with final status
    if (payment.status === PaymentStatus.approved && event.status === 'approved') {
      return { processed: true, idempotency: true, paymentId: payment.id };
    }

    const paidAtDate = event.paidAt ? new Date(event.paidAt) : new Date();

    if (event.status === 'approved') {
      await paymentRepository.updateStatus(payment.id, PaymentStatus.approved, paidAtDate);

      if (payment.subscriptionId) {
        await subscriptionRepository.updateStatus(payment.subscriptionId, SubscriptionStatus.active);
      }

      await auditLogRepository.create({
        tenantId: payment.tenantId,
        action: 'PAYMENT_APPROVED',
        entity: 'Payment',
        entityId: payment.id,
        details: `TransactionId ${event.transactionId} approved via webhook`,
      });

      // Trigger provisioning workflow
      await provisioningService.triggerProvisioning(payment.tenantId);
    } else if (event.status === 'failed') {
      await paymentRepository.updateStatus(payment.id, PaymentStatus.failed);

      if (payment.subscriptionId) {
        await subscriptionRepository.updateStatus(payment.subscriptionId, SubscriptionStatus.past_due);
      }

      await auditLogRepository.create({
        tenantId: payment.tenantId,
        action: 'PAYMENT_FAILED',
        entity: 'Payment',
        entityId: payment.id,
      });
    }

    return {
      processed: true,
      paymentId: payment.id,
      status: event.status,
    };
  }
}
