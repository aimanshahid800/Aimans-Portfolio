"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "motion/react"

const educationData = [
  {
    title: "Bachelor of Computer Science",
    subtitle: "Lahore College for Women University (LCWU)",
    date: "2023–2027",
    body: "Focused on Software Engineering and Artificial Intelligence, building a strong foundation for modern computing solutions.",
  },
  {
    title: "Agentic and Robotic AI Engineering",
    subtitle: "PIAIC",
    date: "2024",
    body: "Intensive program in multi-agent AI systems, robotics, and practical applications of autonomous AI agents.",
  },
]

function EducationCard({ edu, index }: { edu: (typeof educationData)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
      className="mb-8"
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
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {edu.title}
            </h3>
            <p
              className="text-sm sm:text-base font-medium"
              style={{ color: "#f9a8d4" }}
            >
              {edu.subtitle}
            </p>
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
            {edu.date}
          </span>
        </div>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed">
          {edu.body}
        </p>
      </div>
    </motion.div>
  )
}

export default function EducationSection() {
  return (
    <section id="education" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
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
              Education
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
            Academic journey and professional development
          </p>
        </div>

        <div>
          {educationData.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
