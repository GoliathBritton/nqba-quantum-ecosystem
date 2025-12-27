import { httpRequest } from '../http.js';

export class OpenAIConnector {
  constructor({ baseUrl }) {
    this.id = 'openai';
    this.baseUrl = baseUrl;
  }

  getInfo() {
    return {
      id: this.id,
      name: 'OpenAI',
      brand: 'FLYFOX AI',
      auth: { type: 'apiKey', fields: ['apiKey'] },
      baseUrl: this.baseUrl,
      actions: [
        { id: 'responses.create', name: 'Responses API (foundation)' },
        { id: 'chat.completions', name: 'Chat Completions' },
        { id: 'embeddings.create', name: 'Embeddings' },
        { id: 'images.generate', name: 'Images Generate' },
        { id: 'models.list', name: 'List Models' },
      ],
    };
  }

  async testConnection(credentials) {
    const data = await httpRequest({
      url: `${this.baseUrl}/models`,
      method: 'GET',
      headers: { Authorization: `Bearer ${credentials.apiKey}` },
    });
    return { ok: true, models: Array.isArray(data?.data) ? data.data.length : null };
  }

  async getCatalog(credentials) {
    // Dynamic model catalog from OpenAI
    if (!credentials?.apiKey) {
      return {
        brand: 'FLYFOX AI',
        provider: 'OpenAI',
        note: 'Provide apiKey to list models dynamically.',
        actions: this.getInfo().actions,
      };
    }
    const models = await this.runAction({ action: 'models.list', params: {}, credentials });
    return {
      brand: 'FLYFOX AI',
      provider: 'OpenAI',
      models: models?.data || [],
      actions: this.getInfo().actions,
    };
  }

  async runAction({ action, params, credentials }) {
    switch (action) {
      case 'models.list':
        return httpRequest({
          url: `${this.baseUrl}/models`,
          method: 'GET',
          headers: { Authorization: `Bearer ${credentials.apiKey}` },
        });
      case 'responses.create': {
        // https://platform.openai.com/docs/api-reference/responses
        const model = params?.model || 'gpt-4o-mini';
        const input =
          params?.input ||
          params?.messages ||
          params?.prompt ||
          [{ role: 'user', content: [{ type: 'text', text: 'Hello from FLYFOX AI.' }] }];
        return httpRequest({
          url: `${this.baseUrl}/responses`,
          method: 'POST',
          headers: { Authorization: `Bearer ${credentials.apiKey}` },
          json: {
            model,
            input,
            temperature: params?.temperature ?? 0.2,
          },
        });
      }
      case 'chat.completions': {
        const model = params?.model || 'gpt-4o-mini';
        const messages = params?.messages || [{ role: 'user', content: params?.prompt || 'Hello from FLYFOX AI.' }];
        return httpRequest({
          url: `${this.baseUrl}/chat/completions`,
          method: 'POST',
          headers: { Authorization: `Bearer ${credentials.apiKey}` },
          json: { model, messages, temperature: params?.temperature ?? 0.2 },
        });
      }
      case 'embeddings.create': {
        const model = params?.model || 'text-embedding-3-small';
        const input = params?.input;
        if (!input) throw new Error('input required');
        return httpRequest({
          url: `${this.baseUrl}/embeddings`,
          method: 'POST',
          headers: { Authorization: `Bearer ${credentials.apiKey}` },
          json: { model, input },
        });
      }
      case 'images.generate': {
        const model = params?.model || 'gpt-image-1';
        const prompt = params?.prompt;
        if (!prompt) throw new Error('prompt required');
        return httpRequest({
          url: `${this.baseUrl}/images`,
          method: 'POST',
          headers: { Authorization: `Bearer ${credentials.apiKey}` },
          json: {
            model,
            prompt,
            size: params?.size || '1024x1024',
          },
        });
      }
      default:
        throw new Error(`Unsupported OpenAI action: ${action}`);
    }
  }
}

export default OpenAIConnector;
