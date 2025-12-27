/**
 * Quantum Ecosystem Configuration
 * QHC + QDH + Dynex + SigmaEQ v4
 */

export function getQuantumConfig(env = process.env) {
  return {
    // Quantum Hardware Controller (QHC) Configuration
    qhc: {
      enabled: env.QHC_ENABLED !== 'false',
      maxQubits: 128,
      coherenceTime: 100, // microseconds
      gateErrorRate: 0.001,
      topology: 'grid',
    },

    // Quantum Data Handler (QDH) Configuration
    qdh: {
      enabled: env.QDH_ENABLED !== 'false',
      maxDataSize: 1024 * 1024, // 1MB
      compressionEnabled: true,
      encryptionLevel: 'quantum-safe',
    },

    // Dynex Neuromorphic Computing Configuration
    dynex: {
      enabled: env.DYNEX_ENABLED !== 'false',
      neuromorphicChips: 4,
      neuronsPerChip: 1000000,
      synapsesPerNeuron: 1000,
      learningRate: 0.001,
    },

    // SigmaEQ v4 Quantum Error Correction
    sigmaeq: {
      version: parseInt(env.SIGMAEQ_VERSION || '4', 10),
      errorCorrectionCode: 'surface',
      logicalQubitsPerPhysical: 9,
      syndromeExtraction: 'stabilizer',
      decodingAlgorithm: 'minimum-weight-perfect-matching',
    },

    // System-wide settings
    system: {
      port: Number(env.PORT || 3000),
      nodeEnv: env.NODE_ENV || 'development',
      maxConcurrentJobs: 10,
      timeout: 30000, // milliseconds
    },
  };
}

export default getQuantumConfig;
