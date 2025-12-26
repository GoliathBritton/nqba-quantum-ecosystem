/**
 * API Routes for Quantum Ecosystem
 */

export function setupRoutes(app, ecosystem) {
  // Health check
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // System status
  app.get('/api/status', (req, res) => {
    try {
      const status = ecosystem.getStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Execute quantum job
  app.post('/api/jobs/execute', async (req, res) => {
    try {
      const job = req.body;
      const result = await ecosystem.executeQuantumJob(job);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // QHC specific endpoints
  app.get('/api/qhc/status', (req, res) => {
    res.json(ecosystem.qhc.getStatus());
  });

  app.post('/api/qhc/circuit', async (req, res) => {
    try {
      const circuit = req.body;
      const result = await ecosystem.qhc.executeCircuit(circuit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // QDH specific endpoints
  app.get('/api/qdh/status', (req, res) => {
    res.json(ecosystem.qdh.getStatus());
  });

  app.post('/api/qdh/store', async (req, res) => {
    try {
      const { id, state } = req.body;
      await ecosystem.qdh.storeQuantumState(id, state);
      res.json({ success: true, id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/qdh/retrieve/:id', async (req, res) => {
    try {
      const state = await ecosystem.qdh.retrieveQuantumState(req.params.id);
      res.json(state);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  // Dynex specific endpoints
  app.get('/api/dynex/status', (req, res) => {
    res.json(ecosystem.dynex.getStatus());
  });

  app.post('/api/dynex/optimize', async (req, res) => {
    try {
      const task = {
        type: 'optimization',
        problem: req.body,
      };
      const result = await ecosystem.dynex.executeNeuromorphicTask(task);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // SigmaEQ specific endpoints
  app.get('/api/sigmaeq/status', (req, res) => {
    res.json(ecosystem.sigmaeq.getStatus());
  });

  app.get('/api/sigmaeq/errorlog', (req, res) => {
    const limit = parseInt(req.query.limit) || 100;
    res.json(ecosystem.sigmaeq.getErrorLog(limit));
  });

  app.post('/api/sigmaeq/correct', async (req, res) => {
    try {
      const { qubits } = req.body;
      const errors = await ecosystem.sigmaeq.detectErrors(qubits);
      const results = await ecosystem.sigmaeq.correctErrors(qubits, errors);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Catch-all 404
  app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
}

export default setupRoutes;
