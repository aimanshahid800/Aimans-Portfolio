"use client"

import { useState, useEffect } from "react"
import { Award, ExternalLink, X } from "lucide-react"

const certificatesData = [
  {
    id: 1,
    name: "Agentic AI Level 1 Developer",
    year: "2026",
    score: "88%",
    description: "Advanced concepts in autonomous AI agents and multi-agent systems.",
    type: "image",
    asset: "/certificates/agentic-ai-l1.png",
  },
  {
    id: 2,
    name: "Agentic AI Level 2 Developer",
    year: "2026",
    score: "77%",
    description: "Complex orchestration and practical implementation of AI agents.",
    type: "image",
    asset: "/certificates/agentai-l2.png",
  },
  {
    id: 3,
    name: "Prompt and Context Engineering Level 1",
    year: "2025",
    score: "80%",
    description: "Practical strategies for efficient model alignment and output control.",
    type: "pdf",
    asset: "/certificates/prompt-context-l1.pdf",
  },
  {
    id: 4,
    name: "Model Context Protocol Level 2 Developer",
    year: "2026",
    score: "70%",
    description: "Professional development in protocol implementation and integration.",
    type: "pdf",
    asset: "/certificates/mcp-l2.pdf",
  },
]

export default function CertificatesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [selectedCert, setSelectedCert] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = Number.parseInt(entry.target.getAttribute("data-card") || "0")
            setVisibleCards((prev) => [...new Set([...prev, cardId])])
          }
        })
      },
      { threshold: 0.3 },
    )

    const cardElements = document.querySelectorAll("[data-card]")
    cardElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="certificates" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {selectedCert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative max-w-4xl w-full bg-black/50 backdrop-blur-md border border-[#8B5CF6]/30 rounded-xl p-3 sm:p-6">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 bg-gradient-to-r from-[#EC4899] to-[#06B6D4] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 z-10"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            {certificatesData.find((c) => c.id === selectedCert)?.type === "image" ? (
              <img
                src={certificatesData.find((c) => c.id === selectedCert)?.asset}
                alt="Certificate"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            ) : (
              <iframe
                src={certificatesData.find((c) => c.id === selectedCert)?.asset}
                className="w-full h-[600px] sm:h-[700px] rounded-lg shadow-2xl"
                title="Certificate PDF"
              />
            )}
          </div>
        </div>
      )}

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#8B5CF6]/30 via-[#EC4899]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-[#06B6D4]/30 via-[#8B5CF6]/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4 text-white">
            Professional{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            Industry-recognized certificates and professional achievements in AI and software development
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {certificatesData.map((cert, index) => {
            const isVisible = visibleCards.includes(cert.id)

            return (
              <div
                key={cert.id}
                data-card={cert.id}
                className={`${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } transition-all duration-700 ease-out`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-black/30 backdrop-blur-sm border border-[#EC4899]/30 rounded-lg p-4 sm:p-6 hover:bg-black/50 hover:border-[#06B6D4]/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#06B6D4]/30 transition-all duration-300 shadow-xl shadow-[#EC4899]/20 group">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#EC4899] via-[#06B6D4] to-[#8B5CF6] p-1 shadow-lg shadow-[#EC4899]/50 group-hover:shadow-[#06B6D4]/70 transition-all duration-300">
                        <div className="w-full h-full rounded-lg bg-[#0a0a0a] flex items-center justify-center group-hover:bg-[#121212] transition-colors duration-300">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                        <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#EC4899] group-hover:to-[#06B6D4] transition-all duration-300 pr-2">
                          {cert.name}
                        </h4>
                        <span className="text-xs sm:text-sm text-white/60 mt-1 sm:mt-0 flex-shrink-0">
                          {cert.year}
                        </span>
                      </div>
                      {cert.score !== "N/A" && (
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[#06B6D4] font-semibold text-base sm:text-lg">
                            Score: {cert.score}
                          </span>
                        </div>
                      )}
                      <p className="text-sm text-white/70 leading-relaxed mb-4">{cert.description}</p>
                      <button
                        onClick={() => setSelectedCert(cert.id)}
                        className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white text-xs sm:text-sm font-medium rounded-lg hover:from-[#06B6D4] hover:to-[#8B5CF6] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#EC4899]/30 hover:shadow-[#06B6D4]/50"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        View Certificate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
