import { httpRequest } from '../http.js';

export class GoHighLevelConnector {
  constructor({ baseUrl }) {
    this.id = 'gohighlevel';
    this.baseUrl = baseUrl;
  }

  getInfo() {
    return {
      id: this.id,
      name: 'GoHighLevel (LeadConnector)',
      brand: 'FLYFOX AI',
      auth: { type: 'bearer', fields: ['accessToken'] },
      baseUrl: this.baseUrl,
      actions: [
        { id: 'contacts.create', name: 'Create Contact' },
        { id: 'contacts.search', name: 'Search Contacts' },
      ],
    };
  }

  async testConnection(credentials) {
    // A safe check is to search contacts with an empty query.
    return this.runAction({ action: 'contacts.search', params: { query: '' }, credentials })
      .then(() => ({ ok: true }))
      .catch(e => ({ ok: false, error: e.message, status: e.status, body: e.body }));
  }

  async runAction({ action, params, credentials }) {
    switch (action) {
      case 'contacts.create': {
        const locationId = params?.locationId;
        if (!locationId) throw new Error('locationId required');
        return httpRequest({
          url: `${this.baseUrl}/contacts/`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${credentials.accessToken}`,
            Version: '2021-07-28',
          },
          json: { locationId, ...params?.contact },
        });
      }
      case 'contacts.search': {
        const locationId = params?.locationId;
        if (!locationId) throw new Error('locationId required');
        const query = encodeURIComponent(params?.query || '');
        return httpRequest({
          url: `${this.baseUrl}/contacts/search?locationId=${encodeURIComponent(locationId)}&query=${query}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${credentials.accessToken}`,
            Version: '2021-07-28',
          },
        });
      }
      default:
        throw new Error(`Unsupported GoHighLevel action: ${action}`);
    }
  }
}

export default GoHighLevelConnector;
