import { v4 as uuidv4 } from 'uuid';

export class TenantService {
  constructor({ store }) {
    this.store = store;
  }

  async createTenant({ name, ownerUserId }) {
    const tenantId = uuidv4();
    const tenant = {
      id: tenantId,
      name: name || 'My FLYFOX AI Workspace',
      ownerUserId,
      createdAt: new Date().toISOString(),
      status: 'active',
      planId: 'free',
    };
    await this.store.transact(data => {
      data.tenants[tenantId] = tenant;
      data.integrations[tenantId] = data.integrations[tenantId] || {};
      data.workflows[tenantId] = data.workflows[tenantId] || {};
      data.usage[tenantId] = data.usage[tenantId] || { workflowsRunThisMonth: 0 };
    });
    return tenant;
  }

  async setPlan({ tenantId, planId }) {
    await this.store.transact(data => {
      const tenant = data.tenants[tenantId];
      if (!tenant) throw new Error('Tenant not found');
      tenant.planId = planId;
      tenant.planUpdatedAt = new Date().toISOString();
    });
    return this.store.getTenant(tenantId);
  }
}

export default TenantService;
