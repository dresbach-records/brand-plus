import { InvoiceRepository } from '../repositories/invoiceRepository';
import { NotFoundError } from '../errors/AppError';

const invoiceRepository = new InvoiceRepository();

export class BillingService {
  async getInvoices(tenantId: string) {
    const invoices = await invoiceRepository.findByTenant(tenantId);
    return invoices.map((inv: any) => ({
      id: inv.id,
      tenantId: inv.tenantId,
      companyName: inv.company?.legalName || inv.company?.tradeName || 'Empresa',
      amount: Number(inv.amount),
      currency: inv.currency,
      status: inv.status,
      paymentMethod: inv.paymentMethod,
      issueDate: inv.issueDate,
      dueDate: inv.dueDate,
      paidAt: inv.paidAt,
      pdfUrl: inv.pdfUrl || `https://api.brandplus.com.br/api/v1/billing/invoices/${inv.id}/download`,
    }));
  }

  async getInvoiceById(id: string, tenantId: string) {
    const inv = await invoiceRepository.findById(id, tenantId);
    if (!inv) {
      throw new NotFoundError('Fatura não encontrada.');
    }
    return {
      id: inv.id,
      tenantId: inv.tenantId,
      company: inv.company,
      subscription: inv.subscription,
      payment: inv.payment,
      amount: Number(inv.amount),
      currency: inv.currency,
      status: inv.status,
      paymentMethod: inv.paymentMethod,
      issueDate: inv.issueDate,
      dueDate: inv.dueDate,
      paidAt: inv.paidAt,
      pdfUrl: inv.pdfUrl || `https://api.brandplus.com.br/api/v1/billing/invoices/${inv.id}/download`,
    };
  }
}
