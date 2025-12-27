import { v4 as uuidv4 } from 'uuid';

/**
 * Simple workflow engine:
 * - workflows are a list of sequential steps
 * - each step calls either a quantum job or an integration provider action
 */
export class WorkflowEngine {
  constructor({ store, integrationManager, ecosystem }) {
    this.store = store;
    this.integrationManager = integrationManager;
    this.ecosystem = ecosystem;
  }

  listWorkflows(tenantId) {
    const map = this.store.getTenantWorkflows(tenantId);
    return Object.values(map);
  }

  getWorkflow(tenantId, workflowId) {
    const map = this.store.getTenantWorkflows(tenantId);
    return map[workflowId] || null;
  }

  async createWorkflow(tenantId, { name, description, steps }) {
    if (!name) throw new Error('name required');
    if (!Array.isArray(steps) || steps.length === 0) throw new Error('steps required');

    const id = uuidv4();
    const workflow = {
      id,
      name,
      description: description || '',
      steps,
      createdAt: new Date().toISOString(),
    };

    await this.store.transact(data => {
      data.workflows[tenantId] = data.workflows[tenantId] || {};
      data.workflows[tenantId][id] = workflow;
    });
    return workflow;
  }

  async runWorkflow(tenantId, workflowId, input = {}) {
    const workflow = this.getWorkflow(tenantId, workflowId);
    if (!workflow) throw new Error('Workflow not found');

    const outputs = [];
    let ctx = { input };

    for (const step of workflow.steps) {
      const out = await this.runStep(tenantId, step, ctx);
      outputs.push({ stepId: step.id || null, type: step.type, out });
      ctx = { ...ctx, last: out };
    }

    await this.store.transact(data => {
      data.usage[tenantId] = data.usage[tenantId] || { workflowsRunThisMonth: 0 };
      data.usage[tenantId].workflowsRunThisMonth += 1;
    });

    return { workflowId, outputs };
  }

  async runStep(tenantId, step, ctx) {
    switch (step.type) {
      case 'integration': {
        const providerId = step.providerId;
        const action = step.action;
        const params = typeof step.params === 'function' ? step.params(ctx) : (step.params || {});
        return this.integrationManager.runAction({ tenantId, providerId, action, params });
      }
      case 'quantum': {
        const job = typeof step.job === 'function' ? step.job(ctx) : step.job;
        return this.ecosystem.executeQuantumJob(job);
      }
      default:
        throw new Error(`Unknown step type: ${step.type}`);
    }
  }
}

export default WorkflowEngine;
