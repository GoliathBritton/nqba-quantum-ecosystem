"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Solutions() {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [timeHorizon, setTimeHorizon] = useState(12);

  const calculateROI = () => {
    const baseROI = 0.15; // 15% base return
    const timeMultiplier = 1 + (timeHorizon / 12) * 0.1;
    const estimatedReturn = investmentAmount * baseROI * timeMultiplier;
    return estimatedReturn;
  };

  const solutions = [
    {
      title: "Quantum Computing Solutions",
      description: "Enterprise-grade quantum computing infrastructure for complex problem-solving",
      features: ["Hybrid quantum-classical algorithms", "Scalable quantum circuits", "Error mitigation"],
    },
    {
      title: "AI Integration Platform",
      description: "Seamlessly integrate AI models with quantum computing capabilities",
      features: ["GPT integration", "Voice processing", "Custom model training"],
    },
    {
      title: "Dynex Integration",
      description: "Leverage Dynex neuromorphic computing for optimization problems",
      features: ["Real-time processing", "Energy efficient", "High-performance"],
    },
    {
      title: "Web3 Solutions",
      description: "Blockchain and decentralized application development",
      features: ["Smart contracts", "DeFi integration", "NFT support"],
    },
    {
      title: "Knowledge Base Systems",
      description: "Intelligent knowledge management and retrieval systems",
      features: ["Vector search", "Semantic analysis", "Multi-modal support"],
    },
    {
      title: "Enterprise Support",
      description: "Dedicated support and consulting for enterprise deployments",
      features: ["24/7 support", "Custom development", "Training programs"],
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
              <Link href="/solutions" className="hover:underline font-bold">Solutions</Link>
              <Link href="/resources" className="hover:underline">Resources</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/explore" className="hover:underline">Explore</Link>
              <Link href="/platform" className="hover:underline">Platform</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Solutions</h1>
          <p className="text-xl text-black/70">
            Comprehensive quantum and AI solutions for your business needs
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="border border-black/10 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
              <p className="text-black/70 mb-4">{solution.description}</p>
              <ul className="space-y-2">
                {solution.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="text-sm text-black/60">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border border-black/10 p-8 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-6">ROI Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Investment Amount ($)
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                  min="0"
                  step="1000"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Time Horizon (months)
                </label>
                <input
                  type="number"
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                  min="1"
                  max="60"
                />
              </div>
            </div>
            <div className="flex items-center justify-center bg-black/5 rounded-lg p-8">
              <div className="text-center">
                <p className="text-sm text-black/60 mb-2">Estimated Return</p>
                <p className="text-4xl font-bold">
                  ${calculateROI().toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <p className="text-sm text-black/60 mt-2">
                  ROI: {((calculateROI() / investmentAmount) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-black/50">
            * This is an estimate based on typical industry returns. Actual results may vary.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
