/**
 * Dynex connector
 *
 * Note: Dynex computation is commonly performed via the Dynex SDK rather than a simple REST API.
 * This connector provides a client-facing abstraction that can be swapped to a real Dynex backend.
 */

export class DynexConnector {
  constructor({ baseUrl }) {
    this.id = 'dynex';
    this.baseUrl = baseUrl;
  }

  getInfo() {
    return {
      id: this.id,
      name: 'Dynex',
      brand: 'FLYFOX AI',
      auth: { type: 'apiKey', fields: ['apiKey'], optional: true },
      baseUrl: this.baseUrl,
      actions: [
        { id: 'compute.submit', name: 'Submit Compute Task (scaffold)' },
      ],
    };
  }

  async testConnection(_credentials) {
    return { ok: true, note: 'Dynex integration scaffold is enabled. Use Dynex SDK for production execution.' };
  }

  async runAction({ action, params }) {
    switch (action) {
      case 'compute.submit':
        return {
          ok: true,
          provider: 'dynex',
          note: 'Scaffold response. Wire Dynex SDK / worker backend for real execution.',
          task: params ?? {},
          submittedAt: new Date().toISOString(),
        };
      default:
        throw new Error(`Unsupported Dynex action: ${action}`);
    }
  }
}

export default DynexConnector;
