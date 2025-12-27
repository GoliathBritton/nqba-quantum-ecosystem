import Stripe from 'stripe';

export class BillingService {
  constructor({ store, plans, stripeSecretKey }) {
    this.store = store;
    this.plans = plans;
    this.stripeSecretKey = stripeSecretKey;
    this.stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;
  }

  listPlans() {
    return this.plans;
  }

  getTenantPlan(tenantId) {
    const tenant = this.store.getTenant(tenantId);
    if (!tenant) throw new Error('Tenant not found');
    return this.plans.find(p => p.id === tenant.planId) || this.plans[0];
  }

  /**
   * Dev-friendly: activate a plan without Stripe.
   * (Real billing should be done via Stripe checkout + webhooks.)
   */
  async activatePlan({ tenantId, planId }) {
    const plan = this.plans.find(p => p.id === planId);
    if (!plan) throw new Error('Unknown plan');
    await this.store.transact(data => {
      const tenant = data.tenants[tenantId];
      if (!tenant) throw new Error('Tenant not found');
      tenant.planId = planId;
      tenant.billing = { provider: 'manual', updatedAt: new Date().toISOString() };
    });
    return this.getTenantPlan(tenantId);
  }

  async createCheckoutSession(_args) {
    if (!this.stripe) {
      throw new Error('Stripe not configured. Set STRIPE_SECRET_KEY or use manual plan activation.');
    }
    throw new Error('Stripe checkout session not implemented in this scaffold.');
  }
}

export default BillingService;
