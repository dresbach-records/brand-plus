import { Router } from 'express';
import { getSaaSAccess } from './saasAccessController';
import { SAAS_CONFIG } from './config';

export const backendApiRouter = Router();

/**
 * GET /api/v1/saas/access
 * Authoritative endpoint to verify and grant access to the operational SaaS
 */
backendApiRouter.get('/saas/access', getSaaSAccess);

export { SAAS_CONFIG, getSaaSAccess };
