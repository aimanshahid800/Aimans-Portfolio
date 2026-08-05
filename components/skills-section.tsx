"use client"

import { Brain, Server, Palette, Wrench } from "lucide-react"
import LogoLoop from "./LogoLoop"

const logoCategories = [
  {
    title: "AI & Agentic",
    icon: Brain,
    color: "#ff2d78",
    folder: "ai-agentic",
    direction: "left" as const,
  },
  {
    title: "Backend",
    icon: Server,
    color: "#ff6b9d",
    folder: "Backend",
    direction: "right" as const,
  },
  {
    title: "Frontend",
    icon: Palette,
    color: "#ff9ec6",
    folder: "Frontend",
    direction: "left" as const,
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "#ffb3d1",
    folder: "Tools",
    direction: "right" as const,
  },
]

// Helper function to get logos from a folder
const getLogosFromFolder = (folderName: string) => {
  // These are the actual logo files found in each folder
  const logoFiles: Record<string, string[]> = {
    "ai-agentic": [
      "/logos/ai-agentic/AwqCmewjdS8905bp.png",
      "/logos/ai-agentic/mcp.png",
      "/logos/ai-agentic/rag.png",
      "/logos/ai-agentic/images.png",
    ],
    "Backend": [
      "/logos/Backend/supabase_icon-logo_brandlogos.net_nmv8t-512x521.png",
      "/logos/Backend/1_du7p50wS_fIsaC_lR18qsg.png",
      "/logos/Backend/R.png",
      "/logos/Backend/rag.png",
      "/logos/Backend/images.png",
    ],
    "Frontend": [
      "/logos/Frontend/react-1-logo-png-transparent.png",
      "/logos/Frontend/png-transparent-next-js-hd-logo.png",
      "/logos/Frontend/tailwind-css-logo-png_seeklogo-354675.png",
      "/logos/Frontend/html5-logo-vector-free-download-11574222422da5narngo7.png",
      "/logos/Frontend/JavaScript-Logo.png",
      "/logos/Frontend/CSS-Logo-2011.png",
    ],
    "Tools": [
      "/logos/Tools/Github-Logo.png",
      "/logos/Tools/visual-studio-code-logo-1c79.png",
      "/logos/Tools/images.png",
      "/logos/Tools/google_antigravity-logo_brandlogos.net_qu4jc.png",
    ],
  }

  const files = logoFiles[folderName] || []
  return files.map((src) => ({
    src,
    alt: src.split("/").pop()?.replace(/\.png$/i, "") || "logo",
  }))
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 text-white">
            Skills &{" "}
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            Specialized expertise in AI-powered applications, backend systems, and modern web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {logoCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon
            const logos = getLogosFromFolder(category.folder)

            return (
              <div
                key={categoryIndex}
                className="opacity-100 translate-y-0 transition-all duration-700 ease-out"
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

                  <div className="h-[120px] overflow-hidden">
                    <LogoLoop
                      logos={logos}
                      speed={80}
                      direction={category.direction}
                      logoHeight={40}
                      gap={32}
                      fadeOut={true}
                      fadeOutColor="#0a0a0f"
                      scaleOnHover={true}
                      ariaLabel={`${category.title} logos`}
                    />
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
