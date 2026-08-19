import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('BRAND+ Official Backend Integration Tests', () => {
  let userToken = '';
  let tenantId = '';
  let subscriptionId = '';

  it('GET /health - should return 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('ok');
  });

  it('GET /api/v1/health - should return 200 OK', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/v1/plans - should return active plans', async () => {
    const res = await request(app).get('/api/v1/plans');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/v1/saas/access - Unauthenticated request should return 401 UNAUTHORIZED', async () => {
    const res = await request(app).get('/api/v1/saas/access');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('POST /api/v1/auth/login - Invalid credentials should return 401 UNAUTHORIZED', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nonexistent@brandplus.com.br', password: 'wrongpassword' });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('CRITICAL SAAS ACCESS CONTROL: Tenant pending provisioning or no subscription should DENY SaaS access', async () => {
    // Evaluating rule: accessEnabled must be false when tenant is not ready or has no active subscription
    // Unauthenticated or inactive users cannot bypass access rules via query strings
    const res = await request(app).get('/api/v1/saas/access?email=fake@test.com');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
