import getQuantumConfig from '../config/quantum.config.js';
import getPlatformConfig from '../config/platform.config.js';

import { QuantumEcosystem } from '../modules/QuantumEcosystem.js';
import { FileStore } from '../storage/FileStore.js';
import { TenantService } from '../tenants/TenantService.js';
import { AuthService } from '../auth/AuthService.js';
import { BillingService } from '../billing/BillingService.js';
import { createIntegrationRegistry } from '../integrations/IntegrationRegistry.js';
import { IntegrationManager } from '../integrations/IntegrationManager.js';
import { WorkflowEngine } from '../workflows/WorkflowEngine.js';
import { flyfoxSolutionCatalog } from '../solutions/catalog.js';
import { flyfoxSdkCatalog } from '../solutions/sdkCatalog.js';

export class FlyfoxPlatform {
  constructor({ env = process.env } = {}) {
    this.quantumConfig = getQuantumConfig(env);
    this.platformConfig = getPlatformConfig(env);

    this.store = new FileStore({ filePath: this.platformConfig.storage.filePath });
    this.tenants = new TenantService({ store: this.store });
    this.auth = new AuthService({
      store: this.store,
      tenantService: this.tenants,
      jwtSecret: this.platformConfig.security.jwtSecret,
    });
    this.billing = new BillingService({
      store: this.store,
      plans: this.platformConfig.billing.plans,
      stripeSecretKey: this.platformConfig.billing.stripeSecretKey,
    });

    this.ecosystem = new QuantumEcosystem(this.quantumConfig);

    this.integrationRegistry = createIntegrationRegistry({ platformConfig: this.platformConfig });
    this.integrations = new IntegrationManager({
      store: this.store,
      registry: this.integrationRegistry,
      masterKey: this.platformConfig.security.masterKey,
      defaultCredentials: this.platformConfig.integrations.defaults,
    });

    this.workflows = new WorkflowEngine({
      store: this.store,
      integrationManager: this.integrations,
      ecosystem: this.ecosystem,
    });

    this.solutions = flyfoxSolutionCatalog;
    this.sdkCatalog = flyfoxSdkCatalog;
  }

  async initialize() {
    await this.store.initialize();
    await this.ecosystem.initialize();
    return true;
  }

  getPublicInfo() {
    return {
      brand: this.platformConfig.brand,
      quantum: {
        qhcEnabled: this.quantumConfig.qhc.enabled,
        qdhEnabled: this.quantumConfig.qdh.enabled,
        dynexEnabled: this.quantumConfig.dynex.enabled,
        sigmaeqVersion: this.quantumConfig.sigmaeq.version,
      },
    };
  }
}

export default FlyfoxPlatform;
