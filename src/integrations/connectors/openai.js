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
        { id: 'chat.completions', name: 'Chat Completions' },
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

  async runAction({ action, params, credentials }) {
    switch (action) {
      case 'models.list':
        return httpRequest({
          url: `${this.baseUrl}/models`,
          method: 'GET',
          headers: { Authorization: `Bearer ${credentials.apiKey}` },
        });
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
      default:
        throw new Error(`Unsupported OpenAI action: ${action}`);
    }
  }
}

export default OpenAIConnector;
