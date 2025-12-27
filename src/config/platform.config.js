/**
 * FLYFOX AI Platform (SaaS) configuration
 * - Multi-tenant auth
 * - Subscriptions (optional Stripe)
 * - Integration connectors
 */

export function getPlatformConfig(env = process.env) {
  return {
    brand: {
      name: 'FLYFOX AI',
      product: 'FLYFOX AI Quantum Ecosystem',
      version: '4.0.0',
    },
    security: {
      jwtSecret: env.JWT_SECRET || 'change-me-in-production',
      masterKey: env.FLYFOX_MASTER_KEY || null,
    },
    billing: {
      stripeSecretKey: env.STRIPE_SECRET_KEY || null,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET || null,
      plans: [
        { id: 'free', name: 'Free', priceMonthlyUsd: 0, limits: { workflowsPerMonth: 50 } },
        { id: 'pro', name: 'Pro', priceMonthlyUsd: 99, limits: { workflowsPerMonth: 5000 } },
        { id: 'enterprise', name: 'Enterprise', priceMonthlyUsd: null, limits: { workflowsPerMonth: Infinity } },
      ],
    },
    integrations: {
      // Optional platform-wide default credentials (shared across tenants).
      // Prefer per-tenant credentials storage for client isolation.
      defaults: {
        openai: env.OPENAI_API_KEY ? { apiKey: env.OPENAI_API_KEY } : null,
        nvidia: env.NVIDIA_API_KEY ? { apiKey: env.NVIDIA_API_KEY } : null,
        dynex: env.DYNEX_API_KEY ? { apiKey: env.DYNEX_API_KEY } : null,
        microsoft: (env.AZURE_OPENAI_API_KEY || env.GRAPH_ACCESS_TOKEN)
          ? {
              azureOpenAIApiKey: env.AZURE_OPENAI_API_KEY || null,
              azureDeployment: env.AZURE_OPENAI_DEPLOYMENT || null,
              graphAccessToken: env.GRAPH_ACCESS_TOKEN || null,
            }
          : null,
      },
      providers: {
        dynex: { baseUrl: 'https://api.dynexcoin.org' },
        openai: { baseUrl: 'https://api.openai.com/v1' },
        microsoft: {
          // For Azure OpenAI, prefer setting AZURE_OPENAI_ENDPOINT + AZURE_OPENAI_API_VERSION
          // Example endpoint: https://{resource}.openai.azure.com
          azureOpenAIEndpoint: env.AZURE_OPENAI_ENDPOINT || null,
          azureOpenAIApiVersion: env.AZURE_OPENAI_API_VERSION || '2024-06-01',
          // For Microsoft Graph calls (optional)
          graphBaseUrl: 'https://graph.microsoft.com/v1.0',
        },
        n8n: { baseUrl: env.N8N_BASE_URL || null }, // e.g. https://<instance>/api/v1
        uipath: { baseUrl: env.UIPATH_BASE_URL || null },
        celonis: { baseUrl: env.CELONIS_BASE_URL || null },
        gohighlevel: { baseUrl: 'https://services.leadconnectorhq.com' },
        synthflow: { baseUrl: 'https://api.synthflow.ai/v2' },
        heygen: { baseUrl: 'https://api.heygen.com' },
        nvidia: { baseUrl: env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1' },
        nuco: { baseUrl: env.NUCO_BASE_URL || 'https://api.nuco.cloud' },
        dealai: { baseUrl: env.DEALAI_BASE_URL || 'https://api.marketing.deal.ai/api/2024-01' },
      },
    },
    storage: {
      filePath: env.FLYFOX_STORE_PATH || 'data/flyfox-store.json',
    },
  };
}

export default getPlatformConfig;
