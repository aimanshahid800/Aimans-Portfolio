"use client"

import { motion } from "motion/react"
import { GraduationCap, Award } from "lucide-react"

interface EducationItem {
  id: string
  title: string
  institution: string
  status: "in_progress" | "completed"
  statusBadgeText: string
  yearInfo?: string
  progressPercentage?: number
  description?: string
  iconType: "degree" | "certificate"
}

const educationList: EducationItem[] = [
  {
    id: "degree",
    title: "Bachelor of Computer Science",
    institution: "Lahore College for Women University",
    status: "in_progress",
    statusBadgeText: "In progress",
    yearInfo: "Year 4 of 4 · 2023 – 2027",
    progressPercentage: 75,
    iconType: "degree",
  },
  {
    id: "pieic",
    title: "Agentic and Robotic AI Engineering",
    institution: "PIAIC",
    status: "completed",
    statusBadgeText: "Completed 2026",
    yearInfo: "Completed 2026",
    progressPercentage: 100,
    description:
      "Intensive program in multi-agent AI systems, robotics, and practical applications of autonomous AI agents.",
    iconType: "certificate",
  },
]

export default function EducationSection() {
  return (
    <section id="education" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white mb-2">
            Education
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#9a99a5] max-w-2xl mx-auto">
            Academic journey and professional development
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-10 sm:pl-14">
          {/* Vertical Glowing Line matching About Me section */}
          <div className="absolute left-[16px] sm:left-[24px] top-4 bottom-6 w-[4px] bg-gradient-to-b from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] shadow-[0_0_12px_rgba(255,45,120,0.6)] rounded-full" />

          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-10">
            {educationList.map((item, index) => {
              const isDegree = item.iconType === "degree"
              const Icon = isDegree ? GraduationCap : Award
              const isInProgress = item.status === "in_progress"

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline Circle Marker - Center-aligned over line */}
                  <div className="absolute -left-[40px] sm:-left-[46px] top-6 z-10 transform -translate-y-1/2">
                    {isInProgress ? (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff2d78] to-[#ff6b9d] flex items-center justify-center shadow-[0_0_16px_rgba(255,45,120,0.8)] ring-4 ring-[#ff2d78]/20">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center shadow-[0_0_16px_rgba(16,185,129,0.8)] ring-4 ring-[#10b981]/20">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Card Container */}
                  <div className="bg-[#12121a]/80 backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-8 transition-all duration-300 hover:border-[#ff6b9d]/40 hover:shadow-[0_8px_30px_rgba(255,45,120,0.12)] w-full">
                    {/* Top Row: Title + Status Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-[#ff6b9d] mt-1">
                          {item.institution}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap self-start sm:self-center border ${
                          isInProgress
                            ? "bg-[#ff2d78]/15 text-[#ff6b9d] border-[#ff2d78]/30"
                            : "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30"
                        }`}
                      >
                        {item.statusBadgeText}
                      </span>
                    </div>

                    {item.description && (
                      <p className="text-sm sm:text-base text-[#9a99a5] leading-relaxed mt-4">
                        {item.description}
                      </p>
                    )}

                    {/* Progress Bar (Pink for in_progress, Green for completed) */}
                    <div className="mt-5 pt-1">
                      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            isInProgress
                              ? "bg-gradient-to-r from-[#ff2d78] to-[#ff6b9d]"
                              : "bg-[#10b981]"
                          }`}
                          style={{ width: `${item.progressPercentage || 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-xs sm:text-sm text-[#9a99a5] font-medium">
                        <span>{item.yearInfo}</span>
                        <span className={isInProgress ? "text-[#ff6b9d]" : "text-[#10b981]"}>
                          {item.progressPercentage || 100}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
