"use client"

import { useState, useEffect } from "react"
import { Brain, Server, Palette, Wrench } from "lucide-react"
import LogoLoop, { LogoItem } from "./LogoLoop"

interface SkillCategory {
  id: string
  title: string
  icon: typeof Brain
  direction: "left" | "right"
  defaultLogos: LogoItem[]
}

const INITIAL_LOGOS: Record<string, LogoItem[]> = {
  "ai-agentic": [
    { src: "/logos/ai-agentic/mcp.png", alt: "MCP", title: "MCP" },
    { src: "/logos/ai-agentic/rag.png", alt: "RAG", title: "RAG" },
    { src: "/logos/ai-agentic/images.png", alt: "AI Tools", title: "AI Tools" },
    { src: "/logos/ai-agentic/AwqCmewjdS8905bp.png", alt: "AI Agent", title: "AI Agent" },
    { src: "/logos/ai-agentic/Screenshot 2026-08-03 141950.png", alt: "OpenAI Agents", title: "OpenAI" },
    { src: "/logos/ai-agentic/Screenshot 2026-08-03 143453.png", alt: "LangChain", title: "LangChain" },
    { src: "/logos/ai-agentic/Screenshot 2026-08-03 145322.png", alt: "LlamaIndex", title: "LlamaIndex" },
  ],
  backend: [
    { src: "/logos/Backend/supabase_icon-logo_brandlogos.net_nmv8t-512x521.png", alt: "Supabase", title: "Supabase" },
    { src: "/logos/Backend/1_du7p50wS_fIsaC_lR18qsg.png", alt: "Python", title: "Python" },
    { src: "/logos/Backend/R (1).png", alt: "FastAPI", title: "FastAPI" },
    { src: "/logos/Backend/R.png", alt: "Node.js", title: "Node.js" },
    { src: "/logos/Backend/images.png", alt: "MySQL", title: "MySQL" },
    { src: "/logos/Backend/rag.png", alt: "Vector DB", title: "Vector DB" },
    { src: "/logos/Backend/Screenshot 2026-08-03 142033.png", alt: "PostgreSQL", title: "PostgreSQL" },
  ],
  frontend: [
    { src: "/logos/Frontend/react-1-logo-png-transparent.png", alt: "React", title: "React" },
    { src: "/logos/Frontend/png-transparent-next-js-hd-logo.png", alt: "Next.js", title: "Next.js" },
    { src: "/logos/Frontend/tailwind-css-logo-png_seeklogo-354675.png", alt: "Tailwind CSS", title: "Tailwind CSS" },
    { src: "/logos/Frontend/JavaScript-Logo.png", alt: "JavaScript", title: "JavaScript" },
    { src: "/logos/Frontend/CSS-Logo-2011.png", alt: "CSS3", title: "CSS3" },
    { src: "/logos/Frontend/html5-logo-vector-free-download-11574222422da5narngo7.png", alt: "HTML5", title: "HTML5" },
    { src: "/logos/Frontend/Screenshot 2026-08-03 142402.png", alt: "TypeScript", title: "TypeScript" },
    { src: "/logos/Frontend/Screenshot 2026-08-03 142540.png", alt: "Redux", title: "Redux" },
  ],
  tools: [
    { src: "/logos/Tools/Github-Logo.png", alt: "GitHub", title: "GitHub" },
    { src: "/logos/Tools/visual-studio-code-logo-1c79.png", alt: "VS Code", title: "VS Code" },
    { src: "/logos/Tools/google_antigravity-logo_brandlogos.net_qu4jc.png", alt: "Antigravity", title: "Antigravity" },
    { src: "/logos/Tools/a5961132c3c4791c5c2b6a38aeff177bd7282c08-1200x675.png", alt: "Vercel", title: "Vercel" },
    { src: "/logos/Tools/images.png", alt: "Docker", title: "Docker" },
    { src: "/logos/Tools/Screenshot 2026-08-03 141950.png", alt: "Git", title: "Git" },
    { src: "/logos/Tools/Screenshot 2026-08-03 142523.png", alt: "Postman", title: "Postman" },
    { src: "/logos/Tools/Screenshot 2026-08-03 143453.png", alt: "Figma", title: "Figma" },
  ],
}

const categories: SkillCategory[] = [
  {
    id: "ai-agentic",
    title: "AI & Agentic",
    icon: Brain,
    direction: "left",
    defaultLogos: INITIAL_LOGOS["ai-agentic"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    direction: "right",
    defaultLogos: INITIAL_LOGOS["backend"],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: Palette,
    direction: "left",
    defaultLogos: INITIAL_LOGOS["frontend"],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    icon: Wrench,
    direction: "right",
    defaultLogos: INITIAL_LOGOS["tools"],
  },
]

export default function SkillsSection() {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([])
  const [categoryLogos, setCategoryLogos] = useState<Record<string, LogoItem[]>>(INITIAL_LOGOS)

  useEffect(() => {
    // Intersection Observer for scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = Number.parseInt(entry.target.getAttribute("data-category") || "0")
            setVisibleCategories((prev) => [...new Set([...prev, cardId])])
          }
        })
      },
      { threshold: 0.15 }
    )

    const cardElements = document.querySelectorAll("[data-category]")
    cardElements.forEach((el) => observer.observe(el))

    // Dynamically fetch logos from public folders via API route
    fetch("/api/logos")
      .then((res) => res.json())
      .then((data: Record<string, LogoItem[]>) => {
        if (data && typeof data === "object") {
          setCategoryLogos((prev) => {
            const updated = { ...prev }
            Object.keys(data).forEach((catKey) => {
              if (data[catKey] && data[catKey].length > 0) {
                updated[catKey] = data[catKey]
              }
            })
            return updated
          })
        }
      })
      .catch(() => {
        // Silently keep using initial static logos if API fails or in static export
      })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-3 text-white">
            Skills &{" "}
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            Specialized expertise in AI-powered applications, backend systems, and modern web technologies.
          </p>
        </div>

        <div className="flex flex-col gap-10 sm:gap-12">
          {categories.map((category, categoryIndex) => {
            const IconComponent = category.icon
            const isVisible = visibleCategories.includes(categoryIndex)
            const logosForCategory = categoryLogos[category.id] || category.defaultLogos

            return (
              <div
                key={category.id}
                data-category={categoryIndex}
                className={`${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } transition-all duration-700 ease-out w-full`}
                style={{ transitionDelay: `${categoryIndex * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] p-0.5 flex-shrink-0">
                    <div className="w-full h-full rounded-[6px] bg-[#0a0a0f] flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-normal font-heading text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="w-full py-3 relative overflow-hidden flex items-center min-h-[90px]">
                  <LogoLoop
                    logos={logosForCategory}
                    speed={80}
                    direction={category.direction}
                    logoHeight={66}
                    gap={40}
                    fadeOut={true}
                    fadeOutColor="#0a0a0f"
                    scaleOnHover={true}
                    ariaLabel={`${category.title} tech stack logos`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
