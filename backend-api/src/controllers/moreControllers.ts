import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/paymentService';
import { WebhookService } from '../services/webhookService';
import { BillingService } from '../services/billingService';
import { ProvisioningService } from '../services/provisioningService';
import { SaaSAccessService } from '../services/saasAccessService';
import { AuthRequest } from '../types';

const paymentService = new PaymentService();
const webhookService = new WebhookService();
const billingService = new BillingService();
const provisioningService = new ProvisioningService();
const saasAccessService = new SaaSAccessService();

export class PaymentController {
  async processPayment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await paymentService.processPayment(req.tenantId!, req.body);
      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPayments(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const payments = await paymentService.getPayments(req.tenantId!);
      return res.json({
        success: true,
        data: payments,
      });
    } catch (error) {
      next(error);
    }
  }
}

export class WebhookController {
  async handlePaymentWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await webhookService.processPaymentWebhook(req.body);
      return res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export class BillingController {
  async getInvoices(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const invoices = await billingService.getInvoices(req.tenantId!);
      return res.json({
        success: true,
        data: invoices,
      });
    } catch (error) {
      next(error);
    }
  }

  async getInvoiceById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const invoice = await billingService.getInvoiceById(req.params.id, req.tenantId!);
      return res.json({
        success: true,
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }

  async downloadInvoice(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const invoice = await billingService.getInvoiceById(req.params.id, req.tenantId!);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="Fatura-${invoice.id}.pdf"`);
      return res.send(`PDF Content Placeholder for Invoice ${invoice.id}`);
    } catch (error) {
      next(error);
    }
  }
}

export class ProvisioningController {
  async getStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tenantId = req.params.tenantId || req.tenantId!;
      const status = await provisioningService.getStatus(tenantId);
      return res.json({
        success: true,
        data: status,
      });
    } catch (error) {
      next(error);
    }
  }

  async triggerProvisioning(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tenantId = req.params.tenantId || req.tenantId!;
      const result = await provisioningService.triggerProvisioning(tenantId);
      return res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export class SaaSAccessController {
  async getAccess(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await saasAccessService.evaluateAccess(
        req.user!.id,
        req.tenantId!,
        req.ip,
        req.headers['user-agent']
      );
      return res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
