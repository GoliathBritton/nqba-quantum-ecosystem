import crypto from 'node:crypto';

function asKey(masterKey) {
  if (!masterKey) return null;
  // Accept base64 (preferred) or raw string; normalize to 32 bytes.
  const maybeBuf = /^[A-Za-z0-9+/=]+$/.test(masterKey) ? Buffer.from(masterKey, 'base64') : Buffer.from(masterKey, 'utf8');
  if (maybeBuf.length === 32) return maybeBuf;
  // Derive a 32-byte key from arbitrary input.
  return crypto.createHash('sha256').update(maybeBuf).digest();
}

export function encryptJson(value, masterKey) {
  const key = asKey(masterKey);
  if (!key) {
    return { __enc: false, value };
  }
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const plaintext = Buffer.from(JSON.stringify(value), 'utf8');
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    __enc: true,
    alg: 'aes-256-gcm',
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    data: ciphertext.toString('base64'),
  };
}

export function decryptJson(blob, masterKey) {
  if (!blob || blob.__enc !== true) return blob?.value ?? blob;
  const key = asKey(masterKey);
  if (!key) {
    throw new Error('Cannot decrypt: FLYFOX_MASTER_KEY not set');
  }
  const iv = Buffer.from(blob.iv, 'base64');
  const tag = Buffer.from(blob.tag, 'base64');
  const data = Buffer.from(blob.data, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([decipher.update(data), decipher.final()]);
  return JSON.parse(plaintext.toString('utf8'));
}
