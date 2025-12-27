import { encryptJson, decryptJson } from '../utils/crypto.js';

export class IntegrationManager {
  constructor({ store, registry, masterKey, defaultCredentials = {} }) {
    this.store = store;
    this.registry = registry;
    this.masterKey = masterKey;
    this.defaultCredentials = defaultCredentials;
  }

  listProviders() {
    return this.registry.list();
  }

  getProvider(providerId) {
    const provider = this.registry.get(providerId);
    if (!provider) throw new Error(`Unknown provider: ${providerId}`);
    return provider;
  }

  async upsertCredentials({ tenantId, providerId, credentials }) {
    this.getProvider(providerId);
    const encrypted = encryptJson(credentials, this.masterKey);
    await this.store.transact(data => {
      data.integrations[tenantId] = data.integrations[tenantId] || {};
      data.integrations[tenantId][providerId] = encrypted;
    });
    return { providerId, stored: true, encrypted: encrypted.__enc === true };
  }

  getCredentials({ tenantId, providerId }) {
    const providerMap = this.store.getTenantIntegrations(tenantId);
    const blob = providerMap[providerId];
    if (blob) return decryptJson(blob, this.masterKey);
    return this.defaultCredentials?.[providerId] || null;
  }

  async testConnection({ tenantId, providerId }) {
    const provider = this.getProvider(providerId);
    const creds = this.getCredentials({ tenantId, providerId });
    if (!creds) throw new Error('Credentials not configured for provider');
    return provider.testConnection(creds);
  }

  async runAction({ tenantId, providerId, action, params }) {
    const provider = this.getProvider(providerId);
    const creds = this.getCredentials({ tenantId, providerId });
    if (!creds) throw new Error('Credentials not configured for provider');
    return provider.runAction({ action, params, credentials: creds });
  }

  async getCatalog({ tenantId, providerId }) {
    const provider = this.getProvider(providerId);
    const creds = this.getCredentials({ tenantId, providerId });
    // Some providers can expose a catalog without creds; still allow if missing and provider supports it.
    if (provider.getCatalog) {
      return provider.getCatalog(creds);
    }
    return {
      brand: 'FLYFOX AI',
      providerId,
      note: 'No catalog available for this provider connector.',
      provider: provider.getInfo ? provider.getInfo() : null,
    };
  }
}

export default IntegrationManager;
