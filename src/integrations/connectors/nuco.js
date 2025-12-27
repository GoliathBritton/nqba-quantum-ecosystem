import { httpRequest } from '../http.js';

export class NucoConnector {
  constructor({ baseUrl }) {
    this.id = 'nuco';
    this.baseUrl = baseUrl;
  }

  getInfo() {
    return {
      id: this.id,
      name: 'nuco.cloud',
      brand: 'FLYFOX AI',
      auth: { type: 'apiKey', fields: ['apiKey'] },
      baseUrl: this.baseUrl,
      actions: [
        { id: 'jobs.submit', name: 'Submit Compute Job (generic)' },
      ],
    };
  }

  async testConnection(credentials) {
    // API details can vary by nuco account/version; expose a generic call.
    return httpRequest({
      url: `${this.baseUrl}/health`,
      method: 'GET',
      headers: { Authorization: `Bearer ${credentials.apiKey}` },
    }).then(() => ({ ok: true })).catch(e => ({ ok: false, error: e.message, status: e.status, body: e.body }));
  }

  async runAction({ action, params, credentials }) {
    switch (action) {
      case 'jobs.submit':
        return httpRequest({
          url: `${this.baseUrl}/jobs`,
          method: 'POST',
          headers: { Authorization: `Bearer ${credentials.apiKey}` },
          json: params ?? {},
        });
      default:
        throw new Error(`Unsupported nuco.cloud action: ${action}`);
    }
  }
}

export default NucoConnector;
