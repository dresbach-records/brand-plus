import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/authController';
import { PlanController, CustomerController, CheckoutController } from '../controllers/index';
import {
  PaymentController,
  WebhookController,
  BillingController,
  ProvisioningController,
  SaaSAccessController,
} from '../controllers/moreControllers';
import { SubscriptionController } from '../controllers/subscriptionController';
import { authenticate } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { authRateLimiter } from '../middlewares/rateLimiter';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../schemas/auth.schema';
import {
  updateCompanySchema,
  createCheckoutSessionSchema,
  createSubscriptionSchema,
  changePlanSchema,
  processPaymentSchema,
  createUserSchema,
  updateUserSchema,
} from '../schemas/index';
import { AuthRequest } from '../types';

const router = Router();

const authController = new AuthController();
const planController = new PlanController();
const customerController = new CustomerController();
const checkoutController = new CheckoutController();
const subscriptionController = new SubscriptionController();
const paymentController = new PaymentController();
const webhookController = new WebhookController();
const billingController = new BillingController();
const provisioningController = new ProvisioningController();
const saasAccessController = new SaaSAccessController();

// Health Check
router.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'BRAND+ Official Backend API',
      timestamp: new Date().toISOString(),
    },
  });
});

// Auth Routes
router.post('/auth/register', authRateLimiter, validate(registerSchema), (req: Request, res: Response, next: NextFunction) => authController.register(req, res, next));
router.post('/auth/login', authRateLimiter, validate(loginSchema), (req: Request, res: Response, next: NextFunction) => authController.login(req, res, next));
router.post('/auth/refresh', validate(refreshTokenSchema), (req: Request, res: Response, next: NextFunction) => authController.refresh(req, res, next));
router.post('/auth/logout', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => authController.logout(req, res, next));
router.get('/auth/me', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => authController.me(req, res, next));
router.post('/auth/forgot-password', authRateLimiter, validate(forgotPasswordSchema), (req: Request, res: Response, next: NextFunction) => authController.forgotPassword(req, res, next));
router.post('/auth/reset-password', authRateLimiter, validate(resetPasswordSchema), (req: Request, res: Response, next: NextFunction) => authController.resetPassword(req, res, next));

// Plans Routes
router.get('/plans', (req: Request, res: Response, next: NextFunction) => planController.getPlans(req, res, next));

// Customer Profile, Company & Users Routes
router.get('/customer/profile', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => customerController.getProfile(req, res, next));
router.get('/customer/company', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => customerController.getCompany(req, res, next));
router.put('/customer/company', authenticate, validate(updateCompanySchema), (req: AuthRequest, res: Response, next: NextFunction) => customerController.updateCompany(req, res, next));
router.get('/customer/users', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => customerController.getUsers(req, res, next));
router.post('/customer/users', authenticate, validate(createUserSchema), (req: AuthRequest, res: Response, next: NextFunction) => customerController.createUser(req, res, next));
router.patch('/customer/users/:id', authenticate, validate(updateUserSchema), (req: AuthRequest, res: Response, next: NextFunction) => customerController.updateUser(req, res, next));
router.delete('/customer/users/:id', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => customerController.deleteUser(req, res, next));
router.get('/customer/billing', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => billingController.getInvoices(req, res, next));
router.get('/customer/invoices', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => billingController.getInvoices(req, res, next));
router.get('/customer/payments', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => paymentController.getPayments(req, res, next));

// Checkout Routes
router.post('/checkout/sessions', authenticate, validate(createCheckoutSessionSchema), (req: AuthRequest, res: Response, next: NextFunction) => checkoutController.createSession(req, res, next));
router.get('/checkout/sessions/:id', (req: Request, res: Response, next: NextFunction) => checkoutController.getSession(req, res, next));

// Subscriptions Routes
router.get('/subscriptions/me', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => subscriptionController.getMySubscription(req, res, next));
router.post('/subscriptions', authenticate, validate(createSubscriptionSchema), (req: AuthRequest, res: Response, next: NextFunction) => subscriptionController.createSubscription(req, res, next));
router.post('/subscriptions/:id/cancel', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => subscriptionController.cancelSubscription(req, res, next));
router.post('/subscriptions/:id/change-plan', authenticate, validate(changePlanSchema), (req: AuthRequest, res: Response, next: NextFunction) => subscriptionController.changePlan(req, res, next));

// Payments Routes
router.post('/payments/process', authenticate, validate(processPaymentSchema), (req: AuthRequest, res: Response, next: NextFunction) => paymentController.processPayment(req, res, next));
router.get('/payments', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => paymentController.getPayments(req, res, next));

// Billing Routes
router.get('/billing/invoices', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => billingController.getInvoices(req, res, next));
router.get('/billing/invoices/:id', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => billingController.getInvoiceById(req, res, next));
router.get('/billing/invoices/:id/download', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => billingController.downloadInvoice(req, res, next));

// Webhook Routes
router.post('/webhooks/payment', (req: Request, res: Response, next: NextFunction) => webhookController.handlePaymentWebhook(req, res, next));

// Provisioning Routes
router.get('/provisioning/:tenantId', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => provisioningController.getStatus(req, res, next));
router.post('/provisioning/:tenantId', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => provisioningController.triggerProvisioning(req, res, next));

// SaaS Access Route
router.get('/saas/access', authenticate, (req: AuthRequest, res: Response, next: NextFunction) => saasAccessController.getAccess(req, res, next));

export { router as apiRoutes };
