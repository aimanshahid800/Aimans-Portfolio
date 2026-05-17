"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useRef } from "react"
import TypingText from "./typing-text"
import RotatingSubtitle from "./rotating-subtitle" // add rotating subtitle

// Simple 3D globe using Three.js-like approach with Canvas
function createGlobe(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) / 2 - 20

  let rotation = 0

  function drawGlobe() {
    ctx.clearRect(0, 0, width, height)

    // Create gradient for sphere
    const gradient = ctx.createRadialGradient(
      centerX - radius * 0.3,
      centerY - radius * 0.3,
      0,
      centerX,
      centerY,
      radius
    )
    gradient.addColorStop(0, "rgba(139, 92, 246, 0.8)")
    gradient.addColorStop(0.5, "rgba(236, 72, 153, 0.6)")
    gradient.addColorStop(1, "rgba(6, 182, 212, 0.4)")

    // Draw main sphere
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()

    // Draw grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const y = centerY - (lat / 90) * (radius * 0.8)
      const width = Math.cos((lat * Math.PI) / 180) * radius * 0.8
      ctx.beginPath()
      ctx.ellipse(centerX, y, width, width * 0.2, 0, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      const angle = ((lon + rotation) * Math.PI) / 180
      ctx.beginPath()
      ctx.moveTo(
        centerX + Math.cos(angle) * radius * 0.8,
        centerY - radius * 0.8
      )
      ctx.lineTo(
        centerX + Math.cos(angle) * radius * 0.8,
        centerY + radius * 0.8
      )
      ctx.stroke()
    }

    // Draw glow
    const glowGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      radius * 0.8,
      centerX,
      centerY,
      radius + 30
    )
    glowGradient.addColorStop(0, "rgba(139, 92, 246, 0.4)")
    glowGradient.addColorStop(1, "rgba(236, 72, 153, 0)")

    ctx.fillStyle = glowGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius + 30, 0, Math.PI * 2)
    ctx.fill()

    rotation += 0.5
    requestAnimationFrame(drawGlobe)
  }

  drawGlobe()
}

export default function HeroSection() {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (blobRef.current && blobRef.current instanceof HTMLCanvasElement) {
      blobRef.current.width = blobRef.current.offsetWidth * window.devicePixelRatio
      blobRef.current.height = blobRef.current.offsetHeight * window.devicePixelRatio
      const ctx = blobRef.current.getContext("2d")
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }
      createGlobe(blobRef.current)
    }
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 sm:pt-32"
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-radial from-[#8B5CF6]/30 via-[#EC4899]/15 to-transparent rounded-full blur-[100px] animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-radial from-[#06B6D4]/25 via-[#8B5CF6]/15 to-transparent rounded-full blur-[80px] animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-[#EC4899]/20 via-[#06B6D4]/10 to-transparent rounded-full blur-[60px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Additional smaller glows for depth */}
        <div
          className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-gradient-radial from-[#8B5CF6]/15 to-transparent rounded-full blur-[40px] animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-[250px] h-[250px] bg-gradient-radial from-[#EC4899]/15 to-transparent rounded-full blur-[50px] animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#8B5CF6]/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent animate-pulse shadow-lg shadow-[#8B5CF6]/50"></div>
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EC4899] to-transparent animate-pulse shadow-lg shadow-[#EC4899]/50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#06B6D4] to-transparent animate-pulse shadow-lg shadow-[#06B6D4]/50"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#8B5CF6] to-transparent animate-pulse shadow-lg shadow-[#8B5CF6]/50"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight">
                <span className="text-white">{"Hi, I'm"}</span>
                <br />
                <TypingText
                  pre={""}
                  highlight={"Aiman Shahid"}
                  classNamePre="text-white"
                  classNameHighlight="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent"
                  minSpeedMs={60}
                  maxSpeedMs={120}
                  pauseMs={1200}
                />
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-white/70 font-medium">
                <RotatingSubtitle
                  phrases={["BSCS Student", "Aspiring AI Developer", "Designer"]}
                  className="animate-none" // keep position/size same, animation handled internally
                />
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#06B6D4] hover:from-[#8B5CF6]/90 hover:via-[#EC4899]/90 hover:to-[#06B6D4]/90 text-white font-semibold px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#8B5CF6]/50 text-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] font-semibold px-6 sm:px-8 py-3 rounded-full bg-transparent transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Hire Me
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start space-x-6 pt-4">
              <a
                href="https://github.com/aimanshahid800"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#8B5CF6] transition-all duration-300 hover:scale-110 transform group"
              >
                <Github className="h-6 w-6 sm:h-7 sm:w-7 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              </a>
              <a
                href="https://www.linkedin.com/in/aiman-shahid-b49035320"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#EC4899] transition-all duration-300 hover:scale-110 transform group"
              >
                <Linkedin className="h-6 w-6 sm:h-7 sm:w-7 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
              </a>
              <a
                href="mailto:aimanshahid800@gmail.com"
                className="text-white/60 hover:text-[#06B6D4] transition-all duration-300 hover:scale-110 transform group"
              >
                <Mail className="h-6 w-6 sm:h-7 sm:w-7 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              </a>
            </div>
          </div>

          {/* Right Column - 3D Globe */}
          <div className="flex justify-center items-center mt-8 lg:mt-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <canvas 
                ref={blobRef}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
