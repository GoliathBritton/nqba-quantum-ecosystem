import { httpRequest } from '../http.js';

export class NvidiaConnector {
  constructor({ baseUrl }) {
    this.id = 'nvidia';
    this.baseUrl = baseUrl;
  }

  getInfo() {
    return {
      id: this.id,
      name: 'NVIDIA AI / NIM',
      brand: 'FLYFOX AI',
      auth: { type: 'apiKey', fields: ['apiKey'] },
      baseUrl: this.baseUrl,
      actions: [
        { id: 'chat.completions', name: 'Chat Completions (OpenAI-compatible)' },
      ],
    };
  }

  async testConnection(credentials) {
    // Many NIM endpoints are OpenAI-compatible; test with a cheap chat call.
    const data = await this.runAction({
      action: 'chat.completions',
      params: { model: 'meta/llama-3.1-8b-instruct', messages: [{ role: 'user', content: 'ping' }] },
      credentials,
    });
    return { ok: true, sample: data?.choices?.[0]?.message?.content ?? null };
  }

  async runAction({ action, params, credentials }) {
    switch (action) {
      case 'chat.completions': {
        const model = params?.model || 'meta/llama-3.1-8b-instruct';
        const messages = params?.messages || [{ role: 'user', content: params?.prompt || 'Hello from FLYFOX AI.' }];
        return httpRequest({
          url: `${this.baseUrl}/chat/completions`,
          method: 'POST',
          headers: { Authorization: `Bearer ${credentials.apiKey}` },
          json: { model, messages, temperature: params?.temperature ?? 0.2 },
        });
      }
      default:
        throw new Error(`Unsupported NVIDIA action: ${action}`);
    }
  }
}

export default NvidiaConnector;
