import { httpRequest } from '../http.js';

export class HeyGenConnector {
  constructor({ baseUrl }) {
    this.id = 'heygen';
    this.baseUrl = baseUrl;
  }

  getInfo() {
    return {
      id: this.id,
      name: 'HeyGen',
      brand: 'FLYFOX AI',
      auth: { type: 'apiKey', fields: ['apiKey'], header: 'X-Api-Key' },
      baseUrl: this.baseUrl,
      actions: [
        { id: 'video.generate', name: 'Generate Video (generic)' },
      ],
    };
  }

  async testConnection(credentials) {
    // No universal ping; attempt a lightweight account call if available.
    return httpRequest({
      url: `${this.baseUrl}/v1/account`,
      method: 'GET',
      headers: { 'X-Api-Key': credentials.apiKey },
    }).then(() => ({ ok: true })).catch(e => ({ ok: false, error: e.message, status: e.status, body: e.body }));
  }

  async runAction({ action, params, credentials }) {
    switch (action) {
      case 'video.generate':
        return httpRequest({
          url: `${this.baseUrl}/v1/video.generate`,
          method: 'POST',
          headers: { 'X-Api-Key': credentials.apiKey },
          json: params ?? {},
        });
      default:
        throw new Error(`Unsupported HeyGen action: ${action}`);
    }
  }
}

export default HeyGenConnector;
