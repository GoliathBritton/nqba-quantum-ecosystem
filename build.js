/**
 * Build script (non-deploy)
 * Performs lightweight sanity checks for local/dev builds.
 */

import fs from 'node:fs/promises';

const requiredFiles = [
  'package.json',
  'src/index.js',
  'src/api/routes.js',
  'src/modules/QuantumEcosystem.js',
];

async function main() {
  for (const file of requiredFiles) {
    try {
      await fs.access(file);
    } catch {
      console.error(`Missing required file: ${file}`);
      process.exit(1);
    }
  }

  console.log('Build OK: required files present.');
  console.log('Note: Deployment is intentionally not performed.');
}

main();
