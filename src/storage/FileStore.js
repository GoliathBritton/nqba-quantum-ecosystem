import fs from 'node:fs/promises';
import path from 'node:path';

export class FileStore {
  constructor({ filePath }) {
    this.filePath = filePath;
    this.data = null;
    this._writeLock = Promise.resolve();
  }

  async initialize() {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    try {
      const raw = await fs.readFile(this.filePath, 'utf8');
      this.data = JSON.parse(raw);
    } catch {
      this.data = this.defaultData();
      await this._write();
    }
    return true;
  }

  defaultData() {
    return {
      schemaVersion: 1,
      users: {}, // id -> user
      tenants: {}, // id -> tenant
      integrations: {}, // tenantId -> { providerId -> encryptedCredentialsBlob }
      workflows: {}, // tenantId -> { workflowId -> workflowDef }
      usage: {}, // tenantId -> usage counters
    };
  }

  snapshot() {
    return JSON.parse(JSON.stringify(this.data));
  }

  async _write() {
    this._writeLock = this._writeLock.then(async () => {
      await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
    });
    return this._writeLock;
  }

  async transact(mutator) {
    mutator(this.data);
    await this._write();
  }

  getUserByEmail(email) {
    const users = Object.values(this.data.users);
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  getUser(userId) {
    return this.data.users[userId] || null;
  }

  getTenant(tenantId) {
    return this.data.tenants[tenantId] || null;
  }

  getTenantIntegrations(tenantId) {
    return this.data.integrations[tenantId] || {};
  }

  getTenantWorkflows(tenantId) {
    return this.data.workflows[tenantId] || {};
  }
}

export default FileStore;
