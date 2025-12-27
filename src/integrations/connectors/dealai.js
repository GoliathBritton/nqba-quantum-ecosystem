import { httpRequest } from '../http.js';

export class DealAIConnector {
  constructor({ baseUrl }) {
    this.id = 'dealai';
    this.baseUrl = baseUrl;
  }

  getInfo() {
    return {
      id: this.id,
      name: 'deal.ai',
      brand: 'FLYFOX AI',
      auth: { type: 'apiKey', fields: ['apiKey'], header: 'Deal-AI-API-Key' },
      baseUrl: this.baseUrl,
      actions: [
        { id: 'get', name: 'Generic GET (path)' },
        { id: 'post', name: 'Generic POST (path)' },
      ],
    };
  }

  async testConnection(credentials) {
    return this.runAction({ action: 'get', params: { path: '/health' }, credentials })
      .then(() => ({ ok: true }))
      .catch(e => ({ ok: false, error: e.message, status: e.status, body: e.body }));
  }

  async runAction({ action, params, credentials }) {
    const path = params?.path;
    if (!path) throw new Error('path required');
    switch (action) {
      case 'get':
        return httpRequest({
          url: `${this.baseUrl}${path}`,
          method: 'GET',
          headers: { 'Deal-AI-API-Key': credentials.apiKey },
        });
      case 'post':
        return httpRequest({
          url: `${this.baseUrl}${path}`,
          method: 'POST',
          headers: { 'Deal-AI-API-Key': credentials.apiKey },
          json: params?.body ?? {},
        });
      default:
        throw new Error(`Unsupported deal.ai action: ${action}`);
    }
  }
}

export default DealAIConnector;
