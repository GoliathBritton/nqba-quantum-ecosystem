import { DynexConnector } from './connectors/dynex.js';
import { OpenAIConnector } from './connectors/openai.js';
import { N8nConnector } from './connectors/n8n.js';
import { UiPathConnector } from './connectors/uipath.js';
import { CelonisConnector } from './connectors/celonis.js';
import { GoHighLevelConnector } from './connectors/gohighlevel.js';
import { SynthflowConnector } from './connectors/synthflow.js';
import { HeyGenConnector } from './connectors/heygen.js';
import { NvidiaConnector } from './connectors/nvidia.js';
import { MicrosoftConnector } from './connectors/microsoft.js';
import { NucoConnector } from './connectors/nuco.js';
import { DealAIConnector } from './connectors/dealai.js';

export function createIntegrationRegistry({ platformConfig }) {
  const instances = [
    new DynexConnector(platformConfig.integrations.providers.dynex),
    new OpenAIConnector(platformConfig.integrations.providers.openai),
    new N8nConnector(platformConfig.integrations.providers.n8n),
    new UiPathConnector(platformConfig.integrations.providers.uipath),
    new CelonisConnector(platformConfig.integrations.providers.celonis),
    new GoHighLevelConnector(platformConfig.integrations.providers.gohighlevel),
    new SynthflowConnector(platformConfig.integrations.providers.synthflow),
    new HeyGenConnector(platformConfig.integrations.providers.heygen),
    new NvidiaConnector(platformConfig.integrations.providers.nvidia),
    new MicrosoftConnector(platformConfig.integrations.providers.microsoft),
    new NucoConnector(platformConfig.integrations.providers.nuco),
    new DealAIConnector(platformConfig.integrations.providers.dealai),
  ];

  /** @type {Record<string, any>} */
  const byId = {};
  for (const c of instances) byId[c.id] = c;

  return {
    list: () => instances.map(c => c.getInfo()),
    get: (id) => byId[id] || null,
  };
}

export default createIntegrationRegistry;
