"use client"

import { useState, useEffect } from "react"
import { Brain, Server, Palette, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "🤖 AI & Agentic",
    icon: Brain,
    color: "#8B5CF6",
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
    title: "⚙️ Backend",
    icon: Server,
    color: "#06B6D4",
    skills: [
      { name: "Python", percentage: 82 },
      { name: "FastAPI", percentage: 78 },
      { name: "PHP", percentage: 72 },
      { name: "MySQL", percentage: 75 },
      { name: "Qdrant", percentage: 45 },
    ],
  },
  {
    title: "🎨 Frontend",
    icon: Palette,
    color: "#EC4899",
    skills: [
      { name: "HTML/CSS", percentage: 85 },
      { name: "JavaScript", percentage: 78 },
      { name: "TypeScript", percentage: 72 },
      { name: "Tailwind CSS", percentage: 75 },
      { name: "Next.js", percentage: 65 },
    ],
  },
  {
    title: "🛠️ Tools & DevOps",
    icon: Wrench,
    color: "#14B8A6",
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
}

const AnimatedProgressBar = ({ percentage, isVisible }: AnimatedBarProps) => {
  return (
    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
      <div
        className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#06B6D4] rounded-full transition-all duration-1000 ease-out"
        style={{
          width: isVisible ? `${percentage}%` : "0%",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.6), 0 0 10px rgba(236, 72, 153, 0.4)",
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
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#8B5CF6]/30 via-[#EC4899]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-[#06B6D4]/30 via-[#8B5CF6]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-radial from-[#EC4899]/20 via-[#06B6D4]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 text-white">
            Skills &{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            Specialized expertise in AI-powered applications, backend systems, and modern web technologies. Combining
            innovation with practical implementation.
          </p>
        </div>

        {/* Skills Grid */}
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
                <div className="bg-black/40 backdrop-blur-md border border-[#8B5CF6]/20 rounded-2xl p-6 sm:p-8 hover:bg-black/60 hover:border-[#EC4899]/40 transition-all duration-300 shadow-xl shadow-[#8B5CF6]/10 hover:shadow-[#EC4899]/20 group h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5CF6] via-[#EC4899] to-[#06B6D4] p-1 shadow-lg shadow-[#8B5CF6]/50 group-hover:shadow-[#EC4899]/70 transition-all duration-300">
                      <div className="w-full h-full rounded-lg bg-[#0a0a0a] flex items-center justify-center group-hover:bg-[#121212] transition-colors duration-300">
                        <IconComponent className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:to-[#06B6D4] transition-all duration-300">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="space-y-2"
                        style={{
                          transitionDelay: `${isVisible ? categoryIndex * 150 + skillIndex * 100 : 0}ms`,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm sm:text-base font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                            {skill.name}
                          </span>
                          <span
                            className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent"
                            style={{
                              opacity: isVisible ? 1 : 0,
                              transition: `opacity 600ms ease-out ${categoryIndex * 150 + skillIndex * 100}ms`,
                            }}
                          >
                            {skill.percentage}%
                          </span>
                        </div>
                        <AnimatedProgressBar percentage={skill.percentage} isVisible={isVisible} />
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
