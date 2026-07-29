"use client"

import { useState, useEffect } from "react"
import { Brain, Server, Palette, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "AI & Agentic",
    icon: Brain,
    color: "#ff2d78",
    skills: [
      { name: "Agentic AI", percentage: 85 },
      { name: "Multi-Agent Orchestration", percentage: 80 },
      { name: "Prompt Engineering", percentage: 82 },
      { name: "RAG Pipelines", percentage: 78 },
      { name: "OpenAI Agents SDK", percentage: 80 },
      { name: "MCP", percentage: 75 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "#ff6b9d",
    skills: [
      { name: "Python", percentage: 82 },
      { name: "FastAPI", percentage: 78 },
      { name: "PHP", percentage: 72 },
      { name: "MySQL", percentage: 75 },
      { name: "Qdrant", percentage: 45 },
    ],
  },
  {
    title: "Frontend",
    icon: Palette,
    color: "#ff9ec6",
    skills: [
      { name: "HTML/CSS", percentage: 85 },
      { name: "JavaScript", percentage: 78 },
      { name: "TypeScript", percentage: 72 },
      { name: "Tailwind CSS", percentage: 75 },
      { name: "Next.js", percentage: 65 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "#ffb3d1",
    skills: [
      { name: "GitHub", percentage: 80 },
      { name: "VS Code", percentage: 90 },
      { name: "Vercel", percentage: 88 },
      { name: "XAMPP", percentage: 72 },
      { name: "Chainlit", percentage: 70 },
      { name: "Claude AI", percentage: 90 },
    ],
  },
]

interface AnimatedBarProps {
  percentage: number
  isVisible: boolean
  color: string
}

const AnimatedProgressBar = ({ percentage, isVisible, color }: AnimatedBarProps) => {
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: isVisible ? `${percentage}%` : "0%",
          background: `linear-gradient(90deg, #ff2d78, ${color})`,
        }}
      />
    </div>
  )
}

export default function SkillsSection() {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = Number.parseInt(entry.target.getAttribute("data-category") || "0")
            setVisibleCategories((prev) => [...new Set([...prev, cardId])])
          }
        })
      },
      { threshold: 0.15 },
    )

    const cardElements = document.querySelectorAll("[data-category]")
    cardElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 text-white">
            Skills &{" "}
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            Specialized expertise in AI-powered applications, backend systems, and modern web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon
            const isVisible = visibleCategories.includes(categoryIndex)

            return (
              <div
                key={categoryIndex}
                data-category={categoryIndex}
                className={`${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } transition-all duration-700 ease-out`}
                style={{ transitionDelay: `${categoryIndex * 150}ms` }}
              >
                <div className="bg-black/30 backdrop-blur-sm border border-[#ff2d78]/15 rounded-2xl p-6 sm:p-8 hover:bg-black/50 hover:border-[#ff6b9d]/30 transition-all duration-300 group h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] p-1">
                      <div className="w-full h-full rounded-lg bg-[#0a0a0f] flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-[#ff6b9d] transition-all duration-300">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm sm:text-base font-medium text-white/90">
                            {skill.name}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#ff2d78] to-[#ff6b9d] bg-clip-text text-transparent">
                            {skill.percentage}%
                          </span>
                        </div>
                        <AnimatedProgressBar percentage={skill.percentage} isVisible={isVisible} color={category.color} />
                      </div>
                    ))}
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
