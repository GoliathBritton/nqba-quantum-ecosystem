import { httpRequest } from '../http.js';

export class N8nConnector {
  constructor({ baseUrl }) {
    this.id = 'n8n';
    this.baseUrl = baseUrl; // optional (for REST API). Webhooks can be absolute URLs.
  }

  getInfo() {
    return {
      id: this.id,
      name: 'n8n',
      brand: 'FLYFOX AI',
      auth: { type: 'apiKey', fields: ['apiKey'], header: 'X-N8N-API-KEY' },
      baseUrl: this.baseUrl,
      actions: [
        { id: 'webhook.trigger', name: 'Trigger Webhook URL' },
        { id: 'executions.list', name: 'List Executions (needs baseUrl)' },
      ],
    };
  }

  async testConnection(credentials) {
    if (!this.baseUrl) return { ok: true, note: 'No baseUrl set; webhook mode available.' };
    const data = await httpRequest({
      url: `${this.baseUrl}/executions`,
      method: 'GET',
      headers: { 'X-N8N-API-KEY': credentials.apiKey },
    });
    return { ok: true, sampleCount: Array.isArray(data?.data) ? data.data.length : null };
  }

  async runAction({ action, params, credentials }) {
    switch (action) {
      case 'webhook.trigger': {
        const webhookUrl = params?.webhookUrl;
        if (!webhookUrl) throw new Error('webhookUrl required');
        return httpRequest({
          url: webhookUrl,
          method: 'POST',
          json: params?.payload ?? {},
          headers: params?.headers ?? {},
        });
      }
      case 'executions.list': {
        if (!this.baseUrl) throw new Error('n8n baseUrl not configured');
        return httpRequest({
          url: `${this.baseUrl}/executions`,
          method: 'GET',
          headers: { 'X-N8N-API-KEY': credentials.apiKey },
        });
      }
      default:
        throw new Error(`Unsupported n8n action: ${action}`);
    }
  }
}

export default N8nConnector;
