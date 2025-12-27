import { httpRequest } from '../http.js';

export class UiPathConnector {
  constructor({ baseUrl }) {
    this.id = 'uipath';
    this.baseUrl = baseUrl; // e.g. https://cloud.uipath.com/{org}/{tenant}/orchestrator_
  }

  getInfo() {
    return {
      id: this.id,
      name: 'UiPath Orchestrator',
      brand: 'FLYFOX AI',
      auth: { type: 'bearer', fields: ['accessToken'] },
      baseUrl: this.baseUrl,
      actions: [
        { id: 'folders.list', name: 'List Folders' },
        { id: 'jobs.start', name: 'Start Job' },
      ],
    };
  }

  async testConnection(credentials) {
    if (!this.baseUrl) return { ok: true, note: 'No baseUrl set; configure for Orchestrator calls.' };
    const data = await httpRequest({
      url: `${this.baseUrl}/odata/Folders`,
      method: 'GET',
      headers: { Authorization: `Bearer ${credentials.accessToken}` },
    });
    return { ok: true, folders: Array.isArray(data?.value) ? data.value.length : null };
  }

  async runAction({ action, params, credentials }) {
    if (!this.baseUrl) throw new Error('UiPath baseUrl not configured');
    switch (action) {
      case 'folders.list':
        return httpRequest({
          url: `${this.baseUrl}/odata/Folders`,
          method: 'GET',
          headers: { Authorization: `Bearer ${credentials.accessToken}` },
        });
      case 'jobs.start': {
        const releaseKey = params?.releaseKey;
        if (!releaseKey) throw new Error('releaseKey required');
        return httpRequest({
          url: `${this.baseUrl}/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs`,
          method: 'POST',
          headers: { Authorization: `Bearer ${credentials.accessToken}` },
          json: {
            startInfo: {
              ReleaseKey: releaseKey,
              Strategy: params?.strategy || 'ModernJobsCount',
              JobsCount: params?.jobsCount || 1,
              InputArguments: params?.inputArguments ? JSON.stringify(params.inputArguments) : undefined,
            },
          },
        });
      }
      default:
        throw new Error(`Unsupported UiPath action: ${action}`);
    }
  }
}

export default UiPathConnector;
