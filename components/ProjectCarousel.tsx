"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "Classroom Clone",
    category: "FULL-STACK · WEB APP",
    description:
      "Role-based learning platform with assignment management, live comments, and dark mode — built and led with a 4-member team.",
    imageUrl: "/projects/placeholder-1.png",
    techStack: ["PHP", "MySQL", "Git"],
    repoUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Nyra",
    category: "AI · RAG CHATBOT",
    description:
      "Context-aware AI companion with persistent memory, powered by a semantic RAG pipeline and a glassmorphic interface.",
    imageUrl: "/projects/placeholder-2.png",
    techStack: ["FastAPI", "Qdrant", "Chainlit"],
    repoUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Mood-Sync",
    category: "AGENTIC AI · PRODUCTIVITY",
    description:
      "Task manager that reads your mood through interactive prompts and reprioritizes your workflow using agent-based logic.",
    imageUrl: "/projects/placeholder-3.png",
    techStack: ["Python", "FastAPI", "React"],
    repoUrl: "#",
  },
];

export interface ProjectCarouselProps {
  className?: string;
}

export function ProjectCarousel({ className }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % projects.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + projects.length) % projects.length
    );

  const currentProject = projects[currentIndex];

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      {/* Desktop layout */}
      <div className="hidden md:flex relative items-center">
        {/* Image */}
        <div className="w-[550px] h-[470px] rounded-3xl overflow-hidden flex-shrink-0 bg-black/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <img
                src={currentProject.imageUrl}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Glassmorphic Card */}
        <div className="rounded-3xl shadow-2xl p-8 ml-[-80px] z-10 max-w-xl flex-1"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Category */}
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "#ff6b9d" }}
              >
                {currentProject.category}
              </p>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-4">
                {currentProject.title}
              </h2>

              {/* Description */}
              <p className="text-white/80 text-base leading-relaxed mb-6">
                {currentProject.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      background: "rgba(255, 107, 157, 0.15)",
                      color: "#ff9ec6",
                      border: "1px solid rgba(255, 107, 157, 0.2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {currentProject.repoUrl && (
                  <Link
                    href={currentProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #ff2d78, #ff6b9d)",
                    }}
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </Link>
                )}
                {currentProject.liveUrl && (
                  <Link
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-all hover:scale-105"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden max-w-sm mx-auto text-center">
        {/* Image */}
        <div className="w-full aspect-square rounded-3xl overflow-hidden mb-6 bg-black/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <img
                src={currentProject.imageUrl}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card content */}
        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Category */}
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: "#ff6b9d" }}
              >
                {currentProject.category}
              </p>

              {/* Title */}
              <h2 className="text-xl font-bold text-white mb-3">
                {currentProject.title}
              </h2>

              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                {currentProject.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {currentProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      background: "rgba(255, 107, 157, 0.15)",
                      color: "#ff9ec6",
                      border: "1px solid rgba(255, 107, 157, 0.2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3">
                {currentProject.repoUrl && (
                  <Link
                    href={currentProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition-all"
                    style={{
                      background: "linear-gradient(135deg, #ff2d78, #ff6b9d)",
                    }}
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </Link>
                )}
                {currentProject.liveUrl && (
                  <Link
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition-all"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={handlePrevious}
          aria-label="Previous project"
          className="w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex gap-2">
          {projects.map((_, projectIndex) => (
            <button
              key={projectIndex}
              onClick={() => setCurrentIndex(projectIndex)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors cursor-pointer",
                projectIndex === currentIndex ? "bg-[#ff6b9d]" : "bg-white/30"
              )}
              aria-label={`Go to project ${projectIndex + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next project"
          className="w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
