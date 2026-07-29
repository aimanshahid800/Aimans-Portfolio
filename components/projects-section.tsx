"use client"

import { motion } from "motion/react"
import { ProjectCarousel } from "./ProjectCarousel"

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4 text-white">
            My{" "}
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Showcasing innovative AI solutions and technical expertise
          </p>
        </motion.div>

        <ProjectCarousel />
      </div>
    </section>
  )
}
