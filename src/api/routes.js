/**
 * API Routes for Quantum Ecosystem
 */

import { authRequired } from '../auth/authMiddleware.js';

export function setupRoutes(app, platform) {
  const ecosystem = platform.ecosystem;
  const requireAuth = authRequired(platform);

  // Health check
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Public platform info
  app.get('/api/public/info', (req, res) => {
    res.json(platform.getPublicInfo());
  });

  // Public solution catalog (high-level, no secrets)
  app.get('/api/public/solutions/catalog', (req, res) => {
    res.json(platform.solutions);
  });

  // Public SDK catalog (what this platform can call)
  app.get('/api/public/solutions/sdk-catalog', (req, res) => {
    res.json(platform.sdkCatalog);
  });

  // Auth (tenant/user creation)
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, tenantName } = req.body || {};
      const result = await platform.auth.register({ email, password, tenantName });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body || {};
      const result = await platform.auth.login({ email, password });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // System status
  app.get('/api/status', requireAuth, (req, res) => {
    try {
      const status = ecosystem.getStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Current user/tenant
  app.get('/api/me', requireAuth, (req, res) => {
    try {
      const plan = platform.billing.getTenantPlan(req.tenant.id);
      res.json({ user: req.user, tenant: req.tenant, plan });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Billing
  app.get('/api/billing/plans', requireAuth, (req, res) => {
    res.json({ plans: platform.billing.listPlans() });
  });

  // Manual plan activation (dev scaffold)
  app.post('/api/billing/activate', requireAuth, async (req, res) => {
    try {
      if (req.user.role !== 'owner') return res.status(403).json({ error: 'owner role required' });
      const { planId } = req.body || {};
      const plan = await platform.billing.activatePlan({ tenantId: req.tenant.id, planId });
      await platform.tenants.setPlan({ tenantId: req.tenant.id, planId: plan.id });
      res.json({ ok: true, plan });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Integrations: list providers
  app.get('/api/integrations/providers', requireAuth, (req, res) => {
    res.json({ providers: platform.integrations.listProviders() });
  });

  // Integrations: store credentials per tenant (encrypted if FLYFOX_MASTER_KEY set)
  app.put('/api/integrations/:providerId/credentials', requireAuth, async (req, res) => {
    try {
      if (req.user.role !== 'owner') return res.status(403).json({ error: 'owner role required' });
      const { providerId } = req.params;
      const { credentials } = req.body || {};
      const result = await platform.integrations.upsertCredentials({
        tenantId: req.tenant.id,
        providerId,
        credentials,
      });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Integrations: test
  app.post('/api/integrations/:providerId/test', requireAuth, async (req, res) => {
    try {
      const { providerId } = req.params;
      const result = await platform.integrations.testConnection({ tenantId: req.tenant.id, providerId });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message, status: error.status, body: error.body });
    }
  });

  // Integrations: run action
  app.post('/api/integrations/:providerId/run', requireAuth, async (req, res) => {
    try {
      const { providerId } = req.params;
      const { action, params } = req.body || {};
      const result = await platform.integrations.runAction({
        tenantId: req.tenant.id,
        providerId,
        action,
        params,
      });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message, status: error.status, body: error.body });
    }
  });

  // Integrations: catalog (dynamic if provider supports it)
  app.get('/api/integrations/:providerId/catalog', requireAuth, async (req, res) => {
    try {
      const { providerId } = req.params;
      const result = await platform.integrations.getCatalog({ tenantId: req.tenant.id, providerId });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message, status: error.status, body: error.body });
    }
  });

  // Workflows
  app.get('/api/workflows', requireAuth, (req, res) => {
    res.json({ workflows: platform.workflows.listWorkflows(req.tenant.id) });
  });

  app.post('/api/workflows', requireAuth, async (req, res) => {
    try {
      if (req.user.role !== 'owner') return res.status(403).json({ error: 'owner role required' });
      const { name, description, steps } = req.body || {};
      const workflow = await platform.workflows.createWorkflow(req.tenant.id, { name, description, steps });
      res.json({ workflow });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/workflows/:workflowId/run', requireAuth, async (req, res) => {
    try {
      const { workflowId } = req.params;
      const result = await platform.workflows.runWorkflow(req.tenant.id, workflowId, req.body?.input || {});
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message, status: error.status, body: error.body });
    }
  });

  // Execute quantum job
  app.post('/api/jobs/execute', requireAuth, async (req, res) => {
    try {
      const job = req.body;
      const result = await ecosystem.executeQuantumJob(job);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // QHC specific endpoints
  app.get('/api/qhc/status', requireAuth, (req, res) => {
    res.json(ecosystem.qhc.getStatus());
  });

  app.post('/api/qhc/circuit', requireAuth, async (req, res) => {
    try {
      const circuit = req.body;
      const result = await ecosystem.qhc.executeCircuit(circuit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // QDH specific endpoints
  app.get('/api/qdh/status', requireAuth, (req, res) => {
    res.json(ecosystem.qdh.getStatus());
  });

  app.post('/api/qdh/store', requireAuth, async (req, res) => {
    try {
      const { id, state } = req.body;
      await ecosystem.qdh.storeQuantumState(id, state);
      res.json({ success: true, id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/qdh/retrieve/:id', requireAuth, async (req, res) => {
    try {
      const state = await ecosystem.qdh.retrieveQuantumState(req.params.id);
      res.json(state);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  // Dynex specific endpoints
  app.get('/api/dynex/status', requireAuth, (req, res) => {
    res.json(ecosystem.dynex.getStatus());
  });

  app.post('/api/dynex/optimize', requireAuth, async (req, res) => {
    try {
      const task = {
        type: 'optimization',
        problem: req.body,
      };
      const result = await ecosystem.dynex.executeNeuromorphicTask(task);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // SigmaEQ specific endpoints
  app.get('/api/sigmaeq/status', requireAuth, (req, res) => {
    res.json(ecosystem.sigmaeq.getStatus());
  });

  app.get('/api/sigmaeq/errorlog', requireAuth, (req, res) => {
    const limit = parseInt(req.query.limit) || 100;
    res.json(ecosystem.sigmaeq.getErrorLog(limit));
  });

  app.post('/api/sigmaeq/correct', requireAuth, async (req, res) => {
    try {
      const { qubits } = req.body;
      const errors = await ecosystem.sigmaeq.detectErrors(qubits);
      const results = await ecosystem.sigmaeq.correctErrors(qubits, errors);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Catch-all 404
  app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
}

export default setupRoutes;
