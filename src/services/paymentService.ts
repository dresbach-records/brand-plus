import { PaymentMethodType, PaymentStatus, PaymentSessionResponse, BillingCycle, PlanTierId } from '../types';
import { getPlanById } from '../data/planCatalog';

export interface CreateCheckoutInput {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyCnpj: string;
  companyName: string;
  planId: PlanTierId;
  billingCycle: BillingCycle;
  paymentMethod: PaymentMethodType;
  cardToken?: string;
}

export interface PaymentProvider {
  createCheckout(input: CreateCheckoutInput): Promise<PaymentSessionResponse>;
  getPaymentStatus(paymentId: string): Promise<{
    paymentId: string;
    status: PaymentStatus;
    paidAt?: string;
    subscriptionActive: boolean;
  }>;
  retryPayment(paymentId: string): Promise<PaymentSessionResponse>;
}

/**
 * MockPaymentProvider for local demo & development.
 * Explicitly provides realistic simulation without storing credentials.
 */
export class MockPaymentProvider implements PaymentProvider {
  async createCheckout(input: CreateCheckoutInput): Promise<PaymentSessionResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const plan = getPlanById(input.planId);
    const amount = input.billingCycle === 'annual' ? plan.annualBilledTotal : plan.priceMonthly;
    const paymentId = `pay_${Math.random().toString(36).substring(2, 9)}`;
    const subscriptionId = `sub_${Math.random().toString(36).substring(2, 9)}`;
    const tenantId = `tenant_${input.companyName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 12)}`;

    if (input.paymentMethod === 'pix') {
      const pixCopyPaste = `00020101021226830014br.gov.bcb.pix2561pix.brandplus.com.br/qr/v2/${paymentId}520400005303986540${amount.toFixed(2)}5802BR5915BRAND PLUS SAAS6009SAO PAULO62070503***6304${Math.floor(1000 + Math.random() * 9000)}`;

      return {
        paymentId,
        subscriptionId,
        tenantId,
        status: 'pending', // Starts as pending to simulate real gateway confirmation flow
        pixQrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(pixCopyPaste),
        pixCopyPaste,
        message: 'Aguardando pagamento via PIX.',
      };
    }

    if (input.paymentMethod === 'credit_card') {
      return {
        paymentId,
        subscriptionId,
        tenantId,
        status: 'processing', // Simulates asynchronous card authorization
        message: 'Autorizando transação com adquirente...',
      };
    }

    // Bank slip
    return {
      paymentId,
      subscriptionId,
      tenantId,
      status: 'pending',
      bankSlipUrl: `https://brandplus.com.br/faturas/boleto/${paymentId}.pdf`,
      message: 'Boleto bancário gerado com vencimento para 3 dias úteis.',
    };
  }

  async getPaymentStatus(paymentId: string): Promise<{
    paymentId: string;
    status: PaymentStatus;
    paidAt?: string;
    subscriptionActive: boolean;
  }> {
    // In demo environment, this can be queried to confirm
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      paymentId,
      status: 'paid',
      paidAt: new Date().toISOString(),
      subscriptionActive: true,
    };
  }

  async retryPayment(paymentId: string): Promise<PaymentSessionResponse> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      paymentId,
      subscriptionId: `sub_${paymentId}`,
      status: 'processing',
      message: 'Nova tentativa enviada para o gateway.',
    };
  }
}

/**
 * RealPaymentProvider
 * Prepared to connect to real backend payment orchestrator (e.g. Asaas, Pagar.me, Stripe).
 */
export class RealPaymentProvider implements PaymentProvider {
  private apiEndpoint = '/api/v1/checkout';

  async createCheckout(input: CreateCheckoutInput): Promise<PaymentSessionResponse> {
    const response = await fetch(`${this.apiEndpoint}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Payment gateway error: ${response.statusText}`);
    }

    return response.json();
  }

  async getPaymentStatus(paymentId: string) {
    const response = await fetch(`${this.apiEndpoint}/status/${paymentId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch payment status: ${response.statusText}`);
    }
    return response.json();
  }

  async retryPayment(paymentId: string) {
    const response = await fetch(`${this.apiEndpoint}/retry/${paymentId}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Failed to retry payment: ${response.statusText}`);
    }
    return response.json();
  }
}

// Export default payment service using provider pattern
export const paymentService: PaymentProvider = new MockPaymentProvider();
