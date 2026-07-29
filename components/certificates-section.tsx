"use client"

import { useState, useRef } from "react"
import { ExternalLink, X } from "lucide-react"
import { motion, useInView } from "motion/react"

const certificatesData = [
  {
    id: 1,
    title: "Agentic AI Level 1 Developer",
    date: "2026",
    score: "88%",
    body: "Advanced concepts in autonomous AI agents and multi-agent systems.",
    imageUrl: "/certificates/agentic-ai-l1.png",
  },
  {
    id: 2,
    title: "Agentic AI Level 2 Developer",
    date: "2026",
    score: "77%",
    body: "Complex orchestration and practical implementation of AI agents.",
    imageUrl: "/certificates/agentic-ai-l2.png",
  },
  {
    id: 3,
    title: "Prompt and Context Engineering Level 1",
    date: "2025",
    score: "80%",
    body: "Practical strategies for efficient model alignment and output control.",
    imageUrl: "/certificates/prompt-context-l1.png",
  },
  {
    id: 4,
    title: "Model Context Protocol Level 2 Developer",
    date: "2026",
    score: "70%",
    body: "Professional development in protocol implementation and integration.",
    imageUrl: "/certificates/mcp-l2.png",
  },
  {
    id: 5,
    title: "AI Fluency",
    date: "[FILL IN]",
    score: null,
    body: "[FILL IN — placeholder description of the AI Fluency certification, e.g. covering the 4Ds framework]",
    imageUrl: "/certificates/ai-fluency.png",
  },
  {
    id: 6,
    title: "Claude 101",
    date: "[FILL IN]",
    score: null,
    body: "[FILL IN — placeholder description]",
    imageUrl: "/certificates/claude-101.png",
  },
]

function CertificateCard({ cert, index }: { cert: (typeof certificatesData)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="mb-6"
    >
      <div
        className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: "rgba(10, 10, 15, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(251, 207, 232, 0.15)",
          boxShadow: "0 8px 32px rgba(251, 207, 232, 0.08)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {cert.title}
            </h3>
            {cert.score && (
              <div className="mb-2">
                <span
                  className="text-lg font-bold"
                  style={{ color: "#f9a8d4" }}
                >
                  {cert.score}
                </span>
                <span className="text-white/50 text-sm ml-2">Score</span>
              </div>
            )}
          </div>
          <span
            className="text-sm font-semibold px-4 py-1.5 rounded-full whitespace-nowrap self-start"
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              background: "rgba(251, 207, 232, 0.1)",
              color: "#fbcfe8",
              border: "1px solid rgba(251, 207, 232, 0.2)",
            }}
          >
            {cert.date}
          </span>
        </div>

        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5">
          {cert.body}
        </p>

        <div>
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)",
              color: "#1a0a1a",
            }}
          >
            <ExternalLink className="w-4 h-4" />
            View Certificate
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">
            <span
              style={{
                background: "linear-gradient(135deg, #fbcfe8, #f9a8d4, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Certificates
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
            Professional certifications and achievements in AI development
          </p>
        </div>

        <div>
          {certificatesData.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
