"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Explore() {
  const agents = [
    {
      name: "Quantum Optimizer",
      category: "Quantum Computing",
      description: "Optimize complex problems using quantum annealing algorithms",
      pricing: "From $99/month",
      featured: true,
    },
    {
      name: "AI Content Generator",
      category: "AI/ML",
      description: "Generate high-quality content using advanced language models",
      pricing: "From $49/month",
      featured: true,
    },
    {
      name: "Voice Transcription",
      category: "Speech Processing",
      description: "Real-time audio transcription with Deepgram integration",
      pricing: "Pay as you go",
      featured: false,
    },
    {
      name: "Smart Contract Auditor",
      category: "Web3",
      description: "Automated security analysis for blockchain smart contracts",
      pricing: "From $199/month",
      featured: false,
    },
    {
      name: "Knowledge Base Search",
      category: "Data Management",
      description: "Semantic search across your enterprise knowledge base",
      pricing: "From $79/month",
      featured: false,
    },
    {
      name: "Predictive Analytics",
      category: "Analytics",
      description: "AI-powered forecasting and trend analysis",
      pricing: "From $149/month",
      featured: true,
    },
    {
      name: "Dynex Solver",
      category: "Optimization",
      description: "Neuromorphic computing for optimization problems",
      pricing: "Custom pricing",
      featured: false,
    },
    {
      name: "Data Synthesizer",
      category: "Data Science",
      description: "Generate synthetic data for testing and training",
      pricing: "From $59/month",
      featured: false,
    },
    {
      name: "Multi-Modal Analyzer",
      category: "AI/ML",
      description: "Analyze text, images, and audio simultaneously",
      pricing: "From $129/month",
      featured: false,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl">NQBA</Link>
            <div className="flex gap-6">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/solutions" className="hover:underline">Solutions</Link>
              <Link href="/resources" className="hover:underline">Resources</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/explore" className="hover:underline font-bold">Explore</Link>
              <Link href="/platform" className="hover:underline">Platform</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Agent Marketplace</h1>
          <p className="text-xl text-black/70">
            Discover and deploy AI agents for your business needs
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex gap-4"
        >
          <button className="px-4 py-2 border border-black rounded-lg bg-black text-white">
            All
          </button>
          <button className="px-4 py-2 border border-black/20 rounded-lg hover:bg-black/5">
            Featured
          </button>
          <button className="px-4 py-2 border border-black/20 rounded-lg hover:bg-black/5">
            AI/ML
          </button>
          <button className="px-4 py-2 border border-black/20 rounded-lg hover:bg-black/5">
            Quantum
          </button>
          <button className="px-4 py-2 border border-black/20 rounded-lg hover:bg-black/5">
            Web3
          </button>
        </motion.div>

        {/* Agent Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {agents.map((agent, index) => (
            <div
              key={index}
              className={`border ${
                agent.featured ? "border-black" : "border-black/10"
              } p-6 rounded-lg hover:shadow-lg transition-shadow`}
            >
              {agent.featured && (
                <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded mb-3">
                  FEATURED
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
              <p className="text-sm text-black/50 mb-3">{agent.category}</p>
              <p className="text-black/70 mb-4">{agent.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{agent.pricing}</span>
                <button className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-black/80 transition-colors">
                  Deploy
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
