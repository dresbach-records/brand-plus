import { apiClient } from './api';
import { PaymentMethodType, PaymentStatus, PaymentSessionResponse, BillingCycle, PlanTierId } from '../types';

export interface CreateCheckoutInput {
  planId: PlanTierId;
  billingCycle: BillingCycle;
  paymentMethod: PaymentMethodType;
  checkoutSessionId?: string;
  subscriptionId?: string;
}

export interface PaymentProvider {
  createCheckout(input: CreateCheckoutInput): Promise<PaymentSessionResponse>;
  getPaymentStatus(paymentId: string): Promise<{
    paymentId: string;
    status: PaymentStatus;
    paidAt?: string;
    subscriptionActive: boolean;
  }>;
}

export class RealPaymentProvider implements PaymentProvider {
  async createCheckout(input: CreateCheckoutInput): Promise<PaymentSessionResponse> {
    const res = await apiClient.post<any>('/payments/process', {
      subscriptionId: input.subscriptionId,
      checkoutSessionId: input.checkoutSessionId,
      paymentMethod: input.paymentMethod,
    });

    return {
      paymentId: res.paymentId,
      subscriptionId: res.paymentId,
      tenantId: '',
      status: res.status === 'approved' ? 'paid' : 'pending',
      pixQrCode: res.pixQrCode,
      pixCopyPaste: res.pixCopyPaste,
      bankSlipUrl: res.boletoUrl,
      message: 'Pagamento iniciado.',
    };
  }

  async getPaymentStatus(paymentId: string): Promise<{
    paymentId: string;
    status: PaymentStatus;
    paidAt?: string;
    subscriptionActive: boolean;
  }> {
    const payments = await apiClient.get<any[]>('/payments');
    const payment = payments.find((p) => p.id === paymentId);
    if (!payment) {
      return {
        paymentId,
        status: 'failed',
        subscriptionActive: false,
      };
    }
    return {
      paymentId: payment.id,
      status: payment.status === 'approved' ? 'paid' : payment.status,
      paidAt: payment.paidAt,
      subscriptionActive: payment.status === 'approved',
    };
  }
}

export const paymentService: PaymentProvider = new RealPaymentProvider();
