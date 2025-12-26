/**
 * FLYFOX AI Quantum Ecosystem v4.0
 * Main Entry Point
 * 
 * Integrates: QHC + QDH + Dynex + SigmaEQ v4
 */

import express from 'express';
import { config } from 'dotenv';
import { quantumConfig } from './config/quantum.config.js';
import { QuantumEcosystem } from './modules/QuantumEcosystem.js';
import { setupRoutes } from './api/routes.js';

// Load environment variables
config();

// Initialize Express app
const app = express();
app.use(express.json({ limit: '10mb' }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Initialize ecosystem
const ecosystem = new QuantumEcosystem(quantumConfig);

// Setup API routes
setupRoutes(app, ecosystem);

// Start server
async function startServer() {
  try {
    // Initialize the quantum ecosystem
    await ecosystem.initialize();

    const port = quantumConfig.system.port;
    
    app.listen(port, () => {
      console.log(`\n🚀 Quantum Ecosystem API running on port ${port}`);
      console.log(`   Health: http://localhost:${port}/health`);
      console.log(`   Status: http://localhost:${port}/api/status`);
      console.log('\nReady to accept quantum computation requests.\n');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\nReceived SIGINT, shutting down gracefully...');
      await ecosystem.shutdown();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\nReceived SIGTERM, shutting down gracefully...');
      await ecosystem.shutdown();
      process.exit(0);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export { app, ecosystem };
