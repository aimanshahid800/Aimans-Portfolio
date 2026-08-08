"use client"

import { useState } from "react"
import { ExternalLink, X } from "lucide-react"
import { motion } from "motion/react"

interface Certificate {
  id: number
  title: string
  date: string
  score: string | null
  body: string
  pdfUrl: string
}

const certificatesData: Certificate[] = [
  {
    id: 1,
    title: "Agentic AI Level 1 Developer",
    date: "2026",
    score: "88%",
    body: "Advanced concepts in autonomous AI agents and multi-agent systems.",
    pdfUrl: "/certificates/01/CERTIFICATE250000.pdf",
  },
  {
    id: 2,
    title: "Agentic AI Level 2 Developer",
    date: "2026",
    score: "77%",
    body: "Complex orchestration and practical implementation of AI agents.",
    pdfUrl: "/certificates/02/CERTIFICATE232000.pdf",
  },
  {
    id: 3,
    title: "Prompt and Context Engineering Level 1",
    date: "2025",
    score: "80%",
    body: "Techniques for structuring prompts and managing context effectively.",
    pdfUrl: "/certificates/03/CERTIFICATE169000.pdf",
  },
  {
    id: 4,
    title: "Model Context Protocol Level 2 Developer",
    date: "2026",
    score: "70%",
    body: "Professional development in protocol implementation and integration.",
    pdfUrl: "/certificates/04/CERTIFICATE007000.pdf",
  },
  {
    id: 5,
    title: "AI Fluency",
    date: "2026",
    score: "85%",
    body: "Comprehensive understanding of AI fundamentals and multi-modal application frameworks.",
    pdfUrl: "/certificates/05/certificate-ou7tftxxamrj-1783403898.pdf",
  },
  {
    id: 6,
    title: "Claude 101",
    date: "2026",
    score: "90%",
    body: "Core principles of prompt engineering and workflow automation with Claude.",
    pdfUrl: "/certificates/06/certificate-fazq6k8stuab-1783405909.pdf",
  },
]

export default function CertificatesSection() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)

  return (
    <section id="certificates" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white mb-2">
            Certificates
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#9a99a5] max-w-2xl mx-auto">
            Professional certifications and achievements in AI development
          </p>
        </div>

        {/* Alternating Zigzag List */}
        <div className="space-y-10 sm:space-y-14">
          {certificatesData.map((cert, index) => {
            const isPink = index % 2 === 0
            const isLeftNumber = index % 2 === 0
            const numberStr = String(index + 1).padStart(2, "0")

            // Colors setup
            const accentHex = isPink ? "#ff2d78" : "#a855f7"
            const borderClass = isPink
              ? "border-[#ff2d78]/30 hover:border-[#ff2d78]"
              : "border-[#a855f7]/30 hover:border-[#a855f7]"

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 ${
                  isLeftNumber ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Big Outlined & Glowy Thin Number */}
                <div className="w-full md:w-1/3 flex items-center justify-center py-2">
                  <span
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-thin tracking-tighter select-none transition-all duration-300 hover:scale-105"
                    style={{
                      WebkitTextStroke: `1.5px ${accentHex}`,
                      color: "transparent",
                      filter: `drop-shadow(0 0 12px ${accentHex})`,
                      fontFamily: "'Teko', 'Inter', sans-serif",
                    }}
                  >
                    {numberStr}
                  </span>
                </div>

                {/* Capsule-Shaped Card */}
                <div
                  className={`w-full md:w-2/3 bg-[#12121a]/90 backdrop-blur-md border-2 ${borderClass} rounded-[32px] sm:rounded-[50px] p-6 sm:p-8 sm:px-10 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,45,120,0.15)] flex flex-col justify-between`}
                >
                  <div>
                    {/* Top Row: Title + Year Badge */}
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-snug">
                        {cert.title}
                      </h3>
                      {cert.date && (
                        <span className="text-xs sm:text-sm px-3.5 py-1 rounded-full border border-white/20 text-white/70 whitespace-nowrap self-start">
                          {cert.date}
                        </span>
                      )}
                    </div>

                    {/* Score Line */}
                    {cert.score && (
                      <p
                        className="text-sm sm:text-base font-semibold mb-2"
                        style={{ color: accentHex }}
                      >
                        {cert.score} score
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#9a99a5] leading-relaxed mb-6">
                      {cert.body}
                    </p>
                  </div>

                  {/* View Certificate Button */}
                  <div>
                    <button
                      onClick={() => window.open(cert.pdfUrl, "_blank")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
                      style={{
                        background: isPink
                          ? "linear-gradient(135deg, #ff2d78, #ff6b9d)"
                          : "linear-gradient(135deg, #a855f7, #c084fc)",
                        color: "#ffffff",
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View certificate
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Certificate PDF Modal Preview fallback */}
        {selectedPdf && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPdf(null)}
          >
            <div
              className="relative max-w-4xl w-full h-[85vh] bg-[#12121a] border border-white/10 rounded-2xl p-4 overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPdf(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe
                src={selectedPdf}
                className="w-full h-full rounded-lg border-0"
                title="Certificate Viewer"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
