/**
 * Quantum Ecosystem Configuration
 * QHC + QDH + Dynex + SigmaEQ v4
 */

export const quantumConfig = {
  // Quantum Hardware Controller (QHC) Configuration
  qhc: {
    enabled: process.env.QHC_ENABLED === 'true',
    maxQubits: 128,
    coherenceTime: 100, // microseconds
    gateErrorRate: 0.001,
    topology: 'grid',
  },

  // Quantum Data Handler (QDH) Configuration
  qdh: {
    enabled: process.env.QDH_ENABLED === 'true',
    maxDataSize: 1024 * 1024, // 1MB
    compressionEnabled: true,
    encryptionLevel: 'quantum-safe',
  },

  // Dynex Neuromorphic Computing Configuration
  dynex: {
    enabled: process.env.DYNEX_ENABLED === 'true',
    neuromorphicChips: 4,
    neuronsPerChip: 1000000,
    synapsesPerNeuron: 1000,
    learningRate: 0.001,
  },

  // SigmaEQ v4 Quantum Error Correction
  sigmaeq: {
    version: parseInt(process.env.SIGMAEQ_VERSION || '4'),
    errorCorrectionCode: 'surface',
    logicalQubitsPerPhysical: 9,
    syndromeExtraction: 'stabilizer',
    decodingAlgorithm: 'minimum-weight-perfect-matching',
  },

  // System-wide settings
  system: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    maxConcurrentJobs: 10,
    timeout: 30000, // milliseconds
  },
};

export default quantumConfig;
