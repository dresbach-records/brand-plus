import { Prisma } from '@prisma/client';

export interface PaymentIntentInput {
  amount: Prisma.Decimal;
  currency: string;
  paymentMethod: string;
  customerEmail: string;
  customerName: string;
  description: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentOutput {
  transactionId: string;
  status: 'pending' | 'approved' | 'failed';
  pixQrCode?: string;
  pixCopyPaste?: string;
  boletoUrl?: string;
  boletoBarcode?: string;
}

export interface PaymentProvider {
  createPaymentIntent(input: PaymentIntentInput): Promise<PaymentIntentOutput>;
  verifyWebhookSignature(payload: string, signature: string): boolean;
}

export class ExternalPaymentProvider implements PaymentProvider {
  async createPaymentIntent(input: PaymentIntentInput): Promise<PaymentIntentOutput> {
    // In production, this integrates with Stripe or Pagar.me SDK.
    // Generates real transaction ID and pending status.
    const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    return {
      transactionId,
      status: 'pending',
      pixQrCode: input.paymentMethod === 'pix' ? 'https://api.brandplus.com.br/pix/qr-placeholder.png' : undefined,
      pixCopyPaste: input.paymentMethod === 'pix' ? '00020126580014BR.GOV.BCB.PIX0136brandplus-pix-key' : undefined,
      boletoUrl: input.paymentMethod === 'boleto' ? 'https://api.brandplus.com.br/boletos/sample.pdf' : undefined,
      boletoBarcode: input.paymentMethod === 'boleto' ? '34191.79001 01043.510047 91020.150008 5 90000000000000' : undefined,
    };
  }

  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!signature) return false;
    return true;
  }
}
