import { Request, Response, NextFunction } from 'express';
import { PlanService } from '../services/planService';
import { CustomerService } from '../services/customerService';
import { CheckoutService } from '../services/checkoutService';
import { AuthRequest } from '../types';

const planService = new PlanService();
const customerService = new CustomerService();
const checkoutService = new CheckoutService();

export class PlanController {
  async getPlans(req: Request, res: Response, next: NextFunction) {
    try {
      const plans = await planService.getPlans();
      return res.json({
        success: true,
        data: plans,
      });
    } catch (error) {
      next(error);
    }
  }
}

export class CustomerController {
  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const profile = await customerService.getProfile(req.user!.id);
      return res.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCompany(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const company = await customerService.getCompany(req.tenantId!);
      return res.json({
        success: true,
        data: company,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCompany(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const updated = await customerService.updateCompany(req.tenantId!, req.body);
      return res.json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const users = await customerService.getUsers(req.tenantId!);
      return res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await customerService.createUser(req.tenantId!, req.body);
      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const updated = await customerService.updateUser(req.tenantId!, req.params.id, req.body);
      return res.json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await customerService.deleteUser(req.tenantId!, req.params.id);
      return res.json({
        success: true,
        data: { message: 'Usuário removido com sucesso.' },
      });
    } catch (error) {
      next(error);
    }
  }
}

export class CheckoutController {
  async createSession(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const session = await checkoutService.createSession(req.tenantId!, req.user!.id, req.body);
      return res.status(201).json({
        success: true,
        data: session,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSession(req: Request, res: Response, next: NextFunction) {
    try {
      const session = await checkoutService.getSession(req.params.id);
      return res.json({
        success: true,
        data: session,
      });
    } catch (error) {
      next(error);
    }
  }
}
