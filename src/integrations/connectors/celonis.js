import { httpRequest } from '../http.js';

export class CelonisConnector {
  constructor({ baseUrl }) {
    this.id = 'celonis';
    this.baseUrl = baseUrl; // e.g. https://<team>.<realm>.celonis.cloud
  }

  getInfo() {
    return {
      id: this.id,
      name: 'Celonis',
      brand: 'FLYFOX AI',
      auth: { type: 'bearer', fields: ['apiKey'] },
      baseUrl: this.baseUrl,
      actions: [
        { id: 'me', name: 'Get Current User (if available)' },
        { id: 'get', name: 'Generic GET (path)' },
      ],
    };
  }

  async testConnection(credentials) {
    if (!this.baseUrl) return { ok: true, note: 'No baseUrl set; configure to use Celonis APIs.' };
    // Celonis endpoints differ by realm + service; provide a light-weight generic check.
    return this.runAction({ action: 'get', params: { path: '/api/me' }, credentials })
      .then(() => ({ ok: true }))
      .catch(e => ({ ok: false, error: e.message, status: e.status, body: e.body }));
  }

  async runAction({ action, params, credentials }) {
    if (!this.baseUrl) throw new Error('Celonis baseUrl not configured');
    switch (action) {
      case 'me':
        return httpRequest({
          url: `${this.baseUrl}/api/me`,
          method: 'GET',
          headers: { Authorization: `Bearer ${credentials.apiKey}` },
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
        throw new Error(`Unsupported Celonis action: ${action}`);
    }
  }
}

export default CelonisConnector;
