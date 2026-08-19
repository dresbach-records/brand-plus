import { Response, NextFunction } from 'express';
import { SubscriptionService } from '../services/subscriptionService';
import { AuthRequest } from '../types';

const subscriptionService = new SubscriptionService();

export class SubscriptionController {
  async getMySubscription(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const sub = await subscriptionService.getMySubscription(req.tenantId!);
      return res.json({
        success: true,
        data: sub,
      });
    } catch (error) {
      next(error);
    }
  }

  async createSubscription(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const sub = await subscriptionService.createSubscription(req.tenantId!, req.body);
      return res.status(201).json({
        success: true,
        data: sub,
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelSubscription(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await subscriptionService.cancelSubscription(req.params.id, req.tenantId!);
      return res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePlan(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await subscriptionService.changePlan(req.params.id, req.tenantId!, req.body);
      return res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
