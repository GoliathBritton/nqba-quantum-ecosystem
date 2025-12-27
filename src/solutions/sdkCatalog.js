/**
 * FLYFOX AI SDK Catalog
 *
 * This is an internal "capabilities map" describing what this platform can call.
 * For dynamic, account-specific catalogs (e.g., OpenAI model list), use:
 *   GET /api/integrations/:providerId/catalog  (requires credentials)
 */

export const flyfoxSdkCatalog = {
  brand: 'FLYFOX AI',
  foundations: ['dynex', 'openai', 'nvidia', 'microsoft'],
  sdks: [
    {
      id: 'dynex-sdk',
      name: 'Dynex SDK',
      language: ['python'],
      purpose: 'Neuromorphic compute + QUBO/Ising optimization on Dynex network',
      platformIntegration: {
        providerId: 'dynex',
        supportedActions: ['compute.submit'],
      },
      notes: [
        'Production Dynex execution typically runs via Dynex SDK in a worker environment.',
        'This FLYFOX AI server exposes a stable API abstraction for client apps.',
      ],
    },
    {
      id: 'openai-sdk',
      name: 'OpenAI API / SDK',
      language: ['javascript', 'python', 'rest'],
      purpose: 'Foundation AI: reasoning, chat, embeddings, images',
      platformIntegration: {
        providerId: 'openai',
        supportedActions: ['responses.create', 'chat.completions', 'embeddings.create', 'images.generate', 'models.list'],
      },
      notes: ['Model catalog is dynamic per account; use the provider catalog endpoint.'],
    },
    {
      id: 'nvidia-sdk',
      name: 'NVIDIA NIM / API',
      language: ['rest'],
      purpose: 'GPU-accelerated inference endpoints (OpenAI-compatible for many NIMs)',
      platformIntegration: {
        providerId: 'nvidia',
        supportedActions: ['chat.completions'],
      },
      notes: ['Model availability depends on the NIM endpoint you use.'],
    },
    {
      id: 'microsoft-sdk',
      name: 'Microsoft (Azure OpenAI + Graph)',
      language: ['rest'],
      purpose: 'Enterprise integration surface: Azure OpenAI deployments + Microsoft Graph automation',
      platformIntegration: {
        providerId: 'microsoft',
        supportedActions: ['azureopenai.chat.completions', 'azureopenai.embeddings', 'graph.get', 'graph.post'],
      },
      notes: [
        'Azure OpenAI is deployment-based; models are configured as deployments in your Azure resource.',
        'Graph calls require OAuth access token with appropriate scopes.',
      ],
    },
  ],
};

export default flyfoxSdkCatalog;
