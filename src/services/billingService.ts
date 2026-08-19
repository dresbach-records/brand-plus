import { apiClient } from './api';
import { Invoice } from '../types';

class BillingService {
  async getInvoices(): Promise<Invoice[]> {
    const invoices = await apiClient.get<any[]>('/billing/invoices');
    return invoices.map((inv) => ({
      id: inv.id,
      invoiceNumber: `FAT-${inv.id.substring(0, 8).toUpperCase()}`,
      subscriptionId: inv.subscriptionId || '',
      amount: inv.amount,
      status: inv.status,
      issueDate: inv.issueDate,
      dueDate: inv.dueDate,
      paymentDate: inv.paidAt,
      paymentMethod: inv.paymentMethod,
      pdfUrl: inv.pdfUrl,
      receiptUrl: inv.pdfUrl,
      planName: 'Assinatura BRAND+',
    }));
  }

  async getInvoiceById(invoiceId: string): Promise<Invoice | null> {
    const inv = await apiClient.get<any>(`/billing/invoices/${invoiceId}`);
    if (!inv) return null;
    return {
      id: inv.id,
      invoiceNumber: `FAT-${inv.id.substring(0, 8).toUpperCase()}`,
      subscriptionId: inv.subscriptionId || '',
      amount: inv.amount,
      status: inv.status,
      issueDate: inv.issueDate,
      dueDate: inv.dueDate,
      paymentDate: inv.paidAt,
      paymentMethod: inv.paymentMethod,
      pdfUrl: inv.pdfUrl,
      receiptUrl: inv.pdfUrl,
      planName: 'Assinatura BRAND+',
    };
  }
}

export const billingService = new BillingService();
