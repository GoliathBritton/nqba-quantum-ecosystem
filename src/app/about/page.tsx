"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  const team = [
    { role: "Quantum Computing", description: "Advanced quantum algorithm development and optimization" },
    { role: "AI Research", description: "Machine learning and neural network integration" },
    { role: "Blockchain", description: "Web3 and decentralized technology expertise" },
    { role: "Platform Engineering", description: "Scalable infrastructure and DevOps" },
  ];

  const values = [
    {
      title: "Innovation",
      description: "Pushing the boundaries of what's possible with quantum and AI technology",
    },
    {
      title: "Reliability",
      description: "Building production-ready solutions you can depend on",
    },
    {
      title: "Openness",
      description: "Contributing to open source and fostering community collaboration",
    },
    {
      title: "Excellence",
      description: "Maintaining the highest standards in everything we do",
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
              <Link href="/about" className="hover:underline font-bold">About</Link>
              <Link href="/explore" className="hover:underline">Explore</Link>
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
          <h1 className="text-5xl font-bold mb-4">About NQBA</h1>
          <p className="text-xl text-black/70">
            Building the future of quantum computing and AI integration
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-black/70 leading-relaxed max-w-4xl">
            NQBA (Next-Generation Quantum Business Applications) is dedicated to making quantum computing
            and advanced AI accessible to enterprises worldwide. We combine cutting-edge quantum algorithms
            with proven AI technologies to deliver production-ready solutions that solve real-world problems.
          </p>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="border border-black/10 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{member.role}</h3>
                <p className="text-black/70">{member.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="border border-black/10 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-black/70">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
