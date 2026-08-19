import { Invoice } from '../types';

class BillingService {
  async getInvoices(companyId?: string): Promise<Invoice[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    const twoMonthsAgo = new Date(today);
    twoMonthsAgo.setMonth(today.getMonth() - 2);

    return [
      {
        id: 'inv_0981',
        invoiceNumber: 'FAT-2026-00981',
        subscriptionId: 'sub_active_889',
        amount: 329.0,
        status: 'paid',
        issueDate: today.toISOString(),
        dueDate: today.toISOString(),
        paymentDate: today.toISOString(),
        paymentMethod: 'pix',
        pdfUrl: '#',
        receiptUrl: '#',
        planName: 'BRAND+ Growth (Mensal)',
      },
      {
        id: 'inv_0912',
        invoiceNumber: 'FAT-2026-00912',
        subscriptionId: 'sub_active_889',
        amount: 329.0,
        status: 'paid',
        issueDate: lastMonth.toISOString(),
        dueDate: lastMonth.toISOString(),
        paymentDate: lastMonth.toISOString(),
        paymentMethod: 'pix',
        pdfUrl: '#',
        receiptUrl: '#',
        planName: 'BRAND+ Growth (Mensal)',
      },
      {
        id: 'inv_0843',
        invoiceNumber: 'FAT-2026-00843',
        subscriptionId: 'sub_active_889',
        amount: 329.0,
        status: 'paid',
        issueDate: twoMonthsAgo.toISOString(),
        dueDate: twoMonthsAgo.toISOString(),
        paymentDate: twoMonthsAgo.toISOString(),
        paymentMethod: 'pix',
        pdfUrl: '#',
        receiptUrl: '#',
        planName: 'BRAND+ Growth (Mensal)',
      },
    ];
  }

  async getInvoiceById(invoiceId: string): Promise<Invoice | null> {
    const list = await this.getInvoices();
    return list.find((i) => i.id === invoiceId) || null;
  }
}

export const billingService = new BillingService();
