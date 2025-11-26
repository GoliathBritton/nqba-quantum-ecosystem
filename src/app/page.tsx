"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { QuantumParticles } from "@/components/QuantumParticles";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <QuantumParticles />
      
      {/* Navigation */}
      <nav className="relative z-10 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl">NQBA</div>
            <div className="flex gap-6">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/solutions" className="hover:underline">Solutions</Link>
              <Link href="/resources" className="hover:underline">Resources</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/explore" className="hover:underline">Explore</Link>
              <Link href="/platform" className="hover:underline">Platform</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6">
            FLYFOX AI Quantum Ecosystem
          </h1>
          <p className="text-2xl mb-8 text-black/70">
            QHC + QDH + Dynex + SigmaEQ v4
          </p>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-black/60">
            Experience the next generation of quantum computing and AI integration.
            Build scalable, production-ready quantum applications with our comprehensive ecosystem.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/explore"
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/platform"
              className="px-8 py-3 border border-black rounded-lg hover:bg-black/5 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="border border-black/10 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-3">Quantum Computing</h3>
            <p className="text-black/70">
              Harness the power of quantum algorithms for complex problem-solving.
            </p>
          </div>
          <div className="border border-black/10 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-3">AI Integration</h3>
            <p className="text-black/70">
              Seamlessly integrate AI models with quantum computing capabilities.
            </p>
          </div>
          <div className="border border-black/10 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-3">Web3 Ready</h3>
            <p className="text-black/70">
              Built-in support for blockchain and decentralized applications.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
