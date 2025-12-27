import { httpRequest } from '../http.js';

export class SynthflowConnector {
  constructor({ baseUrl }) {
    this.id = 'synthflow';
    this.baseUrl = baseUrl;
  }

  getInfo() {
    return {
      id: this.id,
      name: 'Synthflow',
      brand: 'FLYFOX AI',
      auth: { type: 'bearer', fields: ['apiKey'] },
      baseUrl: this.baseUrl,
      actions: [
        { id: 'calls.create', name: 'Create Call (generic)' },
        { id: 'get', name: 'Generic GET (path)' },
      ],
    };
  }

  async testConnection(credentials) {
    // Synthflow APIs vary by account; provide a generic endpoint caller.
    return this.runAction({ action: 'get', params: { path: '/health' }, credentials })
      .then(() => ({ ok: true }))
      .catch(e => ({ ok: false, error: e.message, status: e.status, body: e.body }));
  }

  async runAction({ action, params, credentials }) {
    switch (action) {
      case 'calls.create':
        return httpRequest({
          url: `${this.baseUrl}/calls`,
          method: 'POST',
          headers: { Authorization: `Bearer ${credentials.apiKey}` },
          json: params ?? {},
        });
      case 'get': {
        const path = params?.path;
        if (!path) throw new Error('path required');
        return httpRequest({
          url: `${this.baseUrl}${path}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${credentials.apiKey}` },
        });
      }
      default:
        throw new Error(`Unsupported Synthflow action: ${action}`);
    }
  }
}

export default SynthflowConnector;
