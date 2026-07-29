"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

const timelineSteps = [
  {
    id: 1,
    role: "BSCS Student",
    subtitle: "Lahore College for Women University",
    description:
      "Began BSCS at LCWU, now in my 7th semester, with a deep passion for Artificial Intelligence and future-ready technologies.",
    year: "2023",
  },
  {
    id: 2,
    role: "AI Developer",
    subtitle: "PIAIC Batch 57",
    description:
      "Diving into Agentic AI and multi-agent systems, driven by the challenge of turning complex ideas into impactful solutions.",
    year: "2024",
  },
  {
    id: 3,
    role: "Agentic AI Builder",
    subtitle: "University & PIAIC",
    description:
      "Focused on core university coursework alongside the PIAIC Agentic AI specialization, deepening hands-on skills in agent architecture.",
    year: "2025",
  },
  {
    id: 4,
    role: "Future Engineer",
    subtitle: "Building Intelligent Systems",
    description:
      "Aiming to grow into a software engineering role, building intelligent agentic systems that shape the future.",
    year: "NOW",
  },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4 text-white">
            About{" "}
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
            My journey in computer science and AI development
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={sectionRef} className="relative">
          {/* Glowing line track */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full"
            style={{ background: "rgba(255, 107, 157, 0.08)" }}
          />

          {/* Animated glowing line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-[2px] origin-top"
            style={{
              height: "100%",
              top: 0,
              scaleY: lineHeight,
              background: "linear-gradient(to bottom, #ff2d78, #ff6b9d, #ff9ec6)",
            }}
          />

          {/* Glow duplicate layer */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-[6px] origin-top pointer-events-none"
            style={{
              height: "100%",
              top: 0,
              scaleY: lineHeight,
              background: "linear-gradient(to bottom, #ff2d78, #ff6b9d, #ff9ec6)",
              filter: "blur(6px)",
              opacity: 0.5,
            }}
          />

          {/* Timeline entries */}
          <div className="space-y-20 sm:space-y-28">
            {timelineSteps.map((step, index) => (
              <TimelineEntry
                key={step.id}
                step={step}
                index={index}
                total={timelineSteps.length}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineEntry({
  step,
  index,
  total,
  scrollProgress,
}: {
  step: (typeof timelineSteps)[0]
  index: number
  total: number
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const isLatest = index === total - 1
  const entryThreshold = index / (total - 1)

  const dotOpacity = useTransform(scrollProgress, [entryThreshold - 0.05, entryThreshold + 0.05], [0.3, 1])
  const dotScale = useTransform(scrollProgress, [entryThreshold - 0.05, entryThreshold + 0.05], [0.8, 1])
  const glowOpacity = useTransform(scrollProgress, [entryThreshold - 0.05, entryThreshold + 0.05], [0, isLatest ? 1 : 0.6])

  return (
    <div className="grid grid-cols-[1fr_40px_1fr] sm:grid-cols-[1fr_50px_1fr] items-center gap-4 sm:gap-8">
      {/* Left side - Role + Subtitle + Year on same line */}
      <div className="text-right flex items-end justify-end gap-4 sm:gap-6">
        <div className="text-right">
          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold font-heading text-white leading-none">
            {step.role}
          </h3>
          <p
            className="text-sm sm:text-base mt-2"
            style={{ color: "#ff6b9d" }}
          >
            {step.subtitle}
          </p>
        </div>
        <span
          className="text-3xl sm:text-4xl md:text-5xl font-bold whitespace-nowrap leading-none"
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            color: isLatest ? "#ff6b9d" : "rgba(255, 255, 255, 0.85)",
            letterSpacing: "-0.03em",
            textShadow: isLatest ? "0 0 20px rgba(255, 107, 157, 0.5)" : "none",
          }}
        >
          {step.year}
        </span>
      </div>

      {/* Center - Glowing dot only */}
      <div className="flex items-center justify-center">
        <motion.div
          className="relative"
          style={{ opacity: dotOpacity, scale: dotScale }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{
              background: "#ff6b9d",
              filter: "blur(12px)",
              opacity: glowOpacity,
              width: 32,
              height: 32,
              top: -10,
              left: -10,
            }}
          />
          <div
            className="relative w-3 h-3 rounded-full"
            style={{
              background: isLatest
                ? "linear-gradient(135deg, #ff2d78, #ff6b9d)"
                : "#ff6b9d",
              boxShadow: isLatest
                ? "0 0 16px rgba(255, 107, 157, 0.8), 0 0 32px rgba(255, 107, 157, 0.4)"
                : "0 0 8px rgba(255, 107, 157, 0.5)",
            }}
          />
        </motion.div>
      </div>

      {/* Right side - Description (Glassmorphic container) */}
      <div
        className="rounded-xl p-4 sm:p-6"
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 107, 157, 0.1)",
        }}
      >
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#ffffff" }}>
          {step.description}
        </p>
      </div>
    </div>
  )
}
