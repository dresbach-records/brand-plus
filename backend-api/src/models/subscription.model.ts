export type SubscriptionStatus =
  | 'active'
  | 'pending'
  | 'trialing'
  | 'past_due'
  | 'suspended'
  | 'cancelled'
  | 'expired';

export type InvoiceStatus = 'paid' | 'pending' | 'past_due' | 'failed' | 'refunded';

export interface SubscriptionModel {
  id: string;
  customerId: string;
  planId: string;
  planName: string;
  billingCycle: 'monthly' | 'yearly';
  priceMonthly: number;
  priceYearly?: number | null;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceModel {
  id: string;
  subscriptionId?: string | null;
  companyId?: string | null;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  paymentMethod: string;
  issueDate: Date;
  dueDate: Date;
  paidAt?: Date | null;
  pdfUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
