import { httpRequest } from '../http.js';

/**
 * Microsoft connector (scaffold) with two primary integration surfaces:
 * - Azure OpenAI (OpenAI-compatible routes under the Azure endpoint)
 * - Microsoft Graph (generic GET/POST)
 *
 * Everything is branded and exposed through FLYFOX AI.
 */
export class MicrosoftConnector {
  constructor({ azureOpenAIEndpoint, azureOpenAIApiVersion, graphBaseUrl }) {
    this.id = 'microsoft';
    this.azureOpenAIEndpoint = azureOpenAIEndpoint;
    this.azureOpenAIApiVersion = azureOpenAIApiVersion;
    this.graphBaseUrl = graphBaseUrl;
  }

  getInfo() {
    return {
      id: this.id,
      name: 'Microsoft (Azure OpenAI + Graph)',
      brand: 'FLYFOX AI',
      auth: {
        type: 'mixed',
        fields: [
          // Azure OpenAI
          'azureOpenAIApiKey',
          'azureDeployment',
          // Microsoft Graph
          'graphAccessToken',
        ],
      },
      baseUrl: this.azureOpenAIEndpoint,
      actions: [
        { id: 'azureopenai.chat.completions', name: 'Azure OpenAI Chat Completions' },
        { id: 'azureopenai.embeddings', name: 'Azure OpenAI Embeddings' },
        { id: 'graph.get', name: 'Microsoft Graph GET (path)' },
        { id: 'graph.post', name: 'Microsoft Graph POST (path)' },
      ],
    };
  }

  async testConnection(credentials) {
    const results = {};
    if (credentials?.azureOpenAIApiKey && credentials?.azureDeployment && this.azureOpenAIEndpoint) {
      try {
        const out = await this.runAction({
          action: 'azureopenai.chat.completions',
          params: { message: 'ping' },
          credentials,
        });
        results.azureOpenAI = { ok: true, sample: out?.choices?.[0]?.message?.content ?? null };
      } catch (e) {
        results.azureOpenAI = { ok: false, error: e.message, status: e.status, body: e.body };
      }
    } else {
      results.azureOpenAI = { ok: false, error: 'Azure OpenAI not configured (endpoint/apiKey/deployment)' };
    }

    if (credentials?.graphAccessToken) {
      try {
        const out = await this.runAction({
          action: 'graph.get',
          params: { path: '/me' },
          credentials,
        });
        results.graph = { ok: true, user: out?.userPrincipalName ?? null };
      } catch (e) {
        results.graph = { ok: false, error: e.message, status: e.status, body: e.body };
      }
    } else {
      results.graph = { ok: false, error: 'Graph not configured (graphAccessToken)' };
    }

    return { ok: results.azureOpenAI.ok || results.graph.ok, results };
  }

  async getCatalog(_credentials) {
    return {
      brand: 'FLYFOX AI',
      provider: 'Microsoft',
      surfaces: [
        {
          id: 'azure-openai',
          name: 'Azure OpenAI',
          notes: 'Uses your Azure OpenAI deployment name (model catalog is deployment-specific).',
          supportedActions: ['azureopenai.chat.completions', 'azureopenai.embeddings'],
        },
        {
          id: 'graph',
          name: 'Microsoft Graph',
          notes: 'Generic Graph REST calls using OAuth access token.',
          supportedActions: ['graph.get', 'graph.post'],
        },
      ],
    };
  }

  async runAction({ action, params, credentials }) {
    switch (action) {
      case 'azureopenai.chat.completions': {
        if (!this.azureOpenAIEndpoint) throw new Error('AZURE_OPENAI_ENDPOINT not configured');
        const deployment = params?.deployment || credentials?.azureDeployment;
        if (!deployment) throw new Error('azureDeployment required');
        const apiKey = credentials?.azureOpenAIApiKey;
        if (!apiKey) throw new Error('azureOpenAIApiKey required');
        const messages = params?.messages || [{ role: 'user', content: params?.message || params?.prompt || 'Hello from FLYFOX AI.' }];
        const apiVersion = params?.apiVersion || this.azureOpenAIApiVersion;
        return httpRequest({
          url: `${this.azureOpenAIEndpoint}/openai/deployments/${encodeURIComponent(deployment)}/chat/completions?api-version=${encodeURIComponent(apiVersion)}`,
          method: 'POST',
          headers: { 'api-key': apiKey },
          json: { messages, temperature: params?.temperature ?? 0.2 },
        });
      }
      case 'azureopenai.embeddings': {
        if (!this.azureOpenAIEndpoint) throw new Error('AZURE_OPENAI_ENDPOINT not configured');
        const deployment = params?.deployment || credentials?.azureDeployment;
        if (!deployment) throw new Error('azureDeployment required');
        const apiKey = credentials?.azureOpenAIApiKey;
        if (!apiKey) throw new Error('azureOpenAIApiKey required');
        const input = params?.input;
        if (!input) throw new Error('input required');
        const apiVersion = params?.apiVersion || this.azureOpenAIApiVersion;
        return httpRequest({
          url: `${this.azureOpenAIEndpoint}/openai/deployments/${encodeURIComponent(deployment)}/embeddings?api-version=${encodeURIComponent(apiVersion)}`,
          method: 'POST',
          headers: { 'api-key': apiKey },
          json: { input },
        });
      }
      case 'graph.get': {
        const token = credentials?.graphAccessToken;
        if (!token) throw new Error('graphAccessToken required');
        const path = params?.path;
        if (!path) throw new Error('path required');
        return httpRequest({
          url: `${this.graphBaseUrl}${path}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      case 'graph.post': {
        const token = credentials?.graphAccessToken;
        if (!token) throw new Error('graphAccessToken required');
        const path = params?.path;
        if (!path) throw new Error('path required');
        return httpRequest({
          url: `${this.graphBaseUrl}${path}`,
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          json: params?.body ?? {},
        });
      }
      default:
        throw new Error(`Unsupported Microsoft action: ${action}`);
    }
  }
}

export default MicrosoftConnector;
