"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Resources() {
  const resources = [
    {
      category: "Documentation",
      items: [
        { title: "Getting Started Guide", description: "Learn the basics of the NQBA ecosystem" },
        { title: "API Reference", description: "Complete API documentation" },
        { title: "Best Practices", description: "Guidelines for production deployments" },
      ],
    },
    {
      category: "Tutorials",
      items: [
        { title: "Building Your First Quantum App", description: "Step-by-step tutorial" },
        { title: "AI Integration Guide", description: "Integrate AI models effectively" },
        { title: "Web3 Development", description: "Build decentralized applications" },
      ],
    },
    {
      category: "Tools & SDKs",
      items: [
        { title: "Dynex SDK", description: "Software development kit for Dynex integration" },
        { title: "OpenAI Toolkit", description: "Helper functions for OpenAI APIs" },
        { title: "Web3 Libraries", description: "wagmi and thirdweb integration" },
      ],
    },
    {
      category: "Community",
      items: [
        { title: "Discussion Forum", description: "Connect with other developers" },
        { title: "GitHub Repository", description: "Contribute to open source" },
        { title: "Support Channel", description: "Get help from the community" },
      ],
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
              <Link href="/resources" className="hover:underline font-bold">Resources</Link>
              <Link href="/about" className="hover:underline">About</Link>
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
          <h1 className="text-5xl font-bold mb-4">Resources</h1>
          <p className="text-xl text-black/70">
            Everything you need to build with the NQBA ecosystem
          </p>
        </motion.div>

        <div className="space-y-12">
          {resources.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * sectionIndex }}
            >
              <h2 className="text-3xl font-bold mb-6">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="border border-black/10 p-6 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-black/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
