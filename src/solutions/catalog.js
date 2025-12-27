export const flyfoxSolutionCatalog = {
  brand: 'FLYFOX AI',
  updatedAt: new Date().toISOString(),
  foundations: [
    { providerId: 'dynex', name: 'Dynex', role: 'Neuromorphic / optimization foundation (via Dynex SDK + cloud)' },
    { providerId: 'openai', name: 'OpenAI', role: 'Foundation AI models + SDK for agents, reasoning, content' },
    { providerId: 'nvidia', name: 'NVIDIA', role: 'Accelerated inference + NIM endpoints for enterprise workloads' },
    { providerId: 'microsoft', name: 'Microsoft', role: 'Enterprise surfaces: Azure OpenAI + Microsoft Graph automation' },
  ],
  industries: [
    {
      id: 'cross-industry',
      name: 'Cross-Industry',
      solutions: [
        { id: 'ai-agents', name: 'AI Agents + Assistants', providers: ['openai', 'nvidia', 'microsoft'] },
        { id: 'workflow-automation', name: 'Workflow Automation', providers: ['n8n', 'uipath'] },
        { id: 'process-mining', name: 'Process Mining + Execution', providers: ['celonis'] },
        { id: 'crm-revops', name: 'CRM + RevOps Automation', providers: ['gohighlevel', 'dealai'] },
        { id: 'voice-ai', name: 'Voice AI', providers: ['synthflow'] },
        { id: 'video-ai', name: 'Video Generation', providers: ['heygen'] },
        { id: 'cloud-compute', name: 'Cloud Compute Orchestration', providers: ['nuco', 'nvidia', 'microsoft'] },
        { id: 'quantum-optimization', name: 'Neuromorphic Optimization (Dynex)', providers: ['dynex'] },
        { id: 'quantum-circuits', name: 'Quantum Circuit Simulation (QHC + SigmaEQ)', providers: ['dynex'] },
      ],
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      solutions: [
        { id: 'patient-engagement', name: 'Patient Engagement Automation', providers: ['gohighlevel', 'n8n', 'openai'] },
        { id: 'claims-automation', name: 'Claims + RPA', providers: ['uipath'] },
      ],
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      solutions: [
        { id: 'process-excellence', name: 'Process Excellence', providers: ['celonis'] },
        { id: 'supply-optimization', name: 'Supply Chain Optimization', providers: ['dynex', 'nvidia'] },
      ],
    },
    {
      id: 'financial-services',
      name: 'Financial Services',
      solutions: [
        { id: 'fraud', name: 'Fraud + Risk', providers: ['openai', 'nvidia'] },
        { id: 'ops-automation', name: 'Ops Automation', providers: ['uipath', 'n8n'] },
      ],
    },
    {
      id: 'sales-marketing',
      name: 'Sales & Marketing',
      solutions: [
        { id: 'lead-gen', name: 'Lead Gen + Outreach', providers: ['dealai', 'gohighlevel'] },
        { id: 'ai-content', name: 'AI Content Factory', providers: ['openai', 'heygen'] },
      ],
    },
  ],
};

export default flyfoxSolutionCatalog;
