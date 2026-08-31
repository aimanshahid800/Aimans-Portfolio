"use client"

import { useRef, useState } from "react"
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
    role: "Agentic AI Engineer",
    subtitle: "Building Intelligent Systems",
    description:
      "I build agentic AI systems — multi-agent orchestration and RAG pipelines — that solve real problems.",
    year: "NOW",
  },
]

const TILTS = [
  { rotate: -2, x: 0, y: 0 },
  { rotate: 4, x: 10, y: 6 },
  { rotate: -5, x: -8, y: 10 },
  { rotate: 3, x: 6, y: -8 },
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

        {/* Mobile: stacked swipeable cards */}
        <div className="sm:hidden">
          <MobileCardStack steps={timelineSteps} />
        </div>

        {/* Desktop Timeline */}
        <div ref={sectionRef} className="relative hidden sm:block">
          <div
            className="absolute left-1/2 top-0 h-full w-[4px] -translate-x-1/2 rounded-full"
            style={{ background: "rgba(255, 107, 157, 0.18)" }}
          />

          <motion.div
            className="absolute left-1/2 top-0 h-full w-[4px] -translate-x-1/2 origin-top pointer-events-none rounded-full"
            style={{
              scaleY: lineHeight,
              background: "linear-gradient(to bottom, #ff2d78, #ff6b9d, #ff9ec6)",
              boxShadow: "0 0 10px rgba(255, 45, 120, 0.8)",
            }}
          />

          <motion.div
            className="absolute left-1/2 top-0 h-full w-[12px] -translate-x-1/2 origin-top pointer-events-none rounded-full"
            style={{
              scaleY: lineHeight,
              background: "linear-gradient(to bottom, #ff2d78, #ff6b9d, #ff9ec6)",
              filter: "blur(8px)",
              opacity: 0.7,
            }}
          />

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
    <div className="grid grid-cols-[1fr_50px_1fr] items-center gap-8">
      <div className="text-right flex items-end justify-end gap-4 sm:gap-6">
        <div className="text-right">
          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold font-heading text-white leading-none">
            {step.role}
          </h3>
          <p className="text-sm sm:text-base mt-2" style={{ color: "#ff6b9d" }}>
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

      <div className="flex items-center justify-center">
        <motion.div className="relative" style={{ opacity: dotOpacity, scale: dotScale }}>
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
              background: isLatest ? "linear-gradient(135deg, #ff2d78, #ff6b9d)" : "#ff6b9d",
              boxShadow: isLatest
                ? "0 0 16px rgba(255, 107, 157, 0.8), 0 0 32px rgba(255, 107, 157, 0.4)"
                : "0 0 8px rgba(255, 107, 157, 0.5)",
            }}
          />
        </motion.div>
      </div>

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

function MobileCardStack({ steps }: { steps: typeof timelineSteps }) {
  const initialOrder = [...steps].reverse().map((s) => s.id)
  const [order, setOrder] = useState<number[]>(initialOrder)
  const [flying, setFlying] = useState<{ id: number; direction: number } | null>(null)
  const stepsById = Object.fromEntries(steps.map((s) => [s.id, s]))

  const handleSwipe = (id: number, direction: number) => {
    if (flying) return
    setFlying({ id, direction })
    setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]])
      setFlying(null)
    }, 220)
  }

  return (
    <div className="px-1">
      <div className="relative mx-auto max-w-[300px]">
        <div className="invisible" aria-hidden="true">
          <StackCardContent step={stepsById[order[0]]} />
        </div>

        {order.map((id, position) => {
          const step = stepsById[id]
          const isFront = position === 0
          const isFlying = flying?.id === id
          const tilt = TILTS[position] ?? TILTS[TILTS.length - 1]

          return (
            <motion.div
              key={id}
              className="absolute inset-0"
              style={{ zIndex: order.length - position }}
              animate={
                isFlying
                  ? { x: flying!.direction * 400, opacity: 0, rotate: flying!.direction * 20 }
                  : { x: tilt.x, y: tilt.y, rotate: tilt.rotate, opacity: 1 }
              }
              transition={
                isFlying
                  ? { duration: 0.2, ease: "easeIn" }
                  : { type: "spring", stiffness: 300, damping: 26 }
              }
              drag={isFront && !isFlying ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, info) => {
                if (isFront && (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500)) {
                  handleSwipe(id, info.offset.x > 0 ? 1 : -1)
                }
              }}
            >
              <StackCardContent step={step} />
            </motion.div>
          )
        })}
      </div>

      <p className="mt-18 text-center text-sm tracking-wide text-white/60">
        <span aria-hidden="true">←</span> swipe <span aria-hidden="true">→</span>
      </p>
    </div>
  )
}

function StackCardContent({ step }: { step: (typeof timelineSteps)[0] }) {
  const isLatest = step.year === "NOW"
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "rgba(18, 18, 22, 0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 107, 157, 0.15)",
      }}
    >
      <span
  className="block text-[2.75rem] font-black leading-none"
  style={{
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    color: isLatest ? "#ff6b9d" : "rgba(255, 255, 255, 0.85)",
    letterSpacing: "-0.04em",
    }}
    >
   {step.year}
      </span>
      <h3 className="mt-2 text-[1.5rem] font-black font-heading text-white leading-[0.95] tracking-[-0.05em]">
        {step.role}
      </h3>
      <p className="mt-1 text-[0.78rem] font-bold leading-tight" style={{ color: "#ff6b9d" }}>
        {step.subtitle}
      </p>
      <p className="mt-3 text-[0.88rem] leading-relaxed text-white/85">{step.description}</p>
    </div>
  )
}
