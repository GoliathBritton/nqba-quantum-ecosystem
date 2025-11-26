"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Platform() {
  const techStack = [
    {
      layer: "Frontend Layer",
      technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
      color: "bg-black/5",
    },
    {
      layer: "AI & ML Layer",
      technologies: ["OpenAI GPT", "Deepgram", "Custom Models", "Vector Search"],
      color: "bg-black/10",
    },
    {
      layer: "Quantum Layer",
      technologies: ["Dynex Integration", "Quantum Algorithms", "Optimization Engines"],
      color: "bg-black/15",
    },
    {
      layer: "Web3 Layer",
      technologies: ["wagmi", "thirdweb", "Smart Contracts", "DeFi"],
      color: "bg-black/20",
    },
    {
      layer: "Infrastructure Layer",
      technologies: ["Vercel", "Edge Computing", "CDN", "Serverless"],
      color: "bg-black/25",
    },
  ];

  const features = [
    {
      title: "Scalable Architecture",
      description: "Built on Next.js 15 with App Router for optimal performance and scalability",
    },
    {
      title: "Type Safety",
      description: "Full TypeScript support ensures reliability and maintainability",
    },
    {
      title: "Modern UI",
      description: "Beautiful, responsive design with Tailwind CSS and Framer Motion",
    },
    {
      title: "Edge Computing",
      description: "Deploy globally with Vercel's edge network for minimal latency",
    },
    {
      title: "API Integration",
      description: "Seamless integration with AI, quantum, and blockchain services",
    },
    {
      title: "Developer Experience",
      description: "Turbopack for fast builds and hot reloading during development",
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
              <Link href="/explore" className="hover:underline">Explore</Link>
              <Link href="/platform" className="hover:underline font-bold">Platform</Link>
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
          <h1 className="text-5xl font-bold mb-4">Platform Architecture</h1>
          <p className="text-xl text-black/70">
            A comprehensive view of our technology stack and infrastructure
          </p>
        </motion.div>

        {/* Tech Stack Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
          <div className="space-y-4">
            {techStack.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className={`${layer.color} p-6 rounded-lg border border-black/10`}
              >
                <h3 className="text-xl font-bold mb-3">{layer.layer}</h3>
                <div className="flex flex-wrap gap-2">
                  {layer.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-white border border-black/20 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platform Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border border-black/10 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-black/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Deployment Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 border border-black/10 p-8 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-4">Production Ready</h2>
          <p className="text-lg text-black/70 mb-6">
            Our platform is optimized for deployment on Vercel with automatic CI/CD,
            edge caching, and global distribution. Every component is production-tested
            and ready to scale.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition-colors"
            >
              Deploy on Vercel
            </Link>
            <Link
              href="/resources"
              className="px-6 py-3 border border-black rounded-lg hover:bg-black/5 transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
