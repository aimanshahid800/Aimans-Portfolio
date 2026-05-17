"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useRef } from "react"
import TypingText from "./typing-text"
import RotatingSubtitle from "./rotating-subtitle" // add rotating subtitle

export default function HeroSection() {
  useEffect(() => {
    // Add advanced blob animations
    if (!document.getElementById("blob-animations")) {
      const style = document.createElement("style")
      style.id = "blob-animations"
      style.textContent = `
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes blob-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.08); }
        }
        
        @keyframes blob-morph {
          0% { border-radius: 58% 42% 48% 52% / 38% 58% 42% 62%; }
          15% { border-radius: 42% 58% 55% 45% / 55% 38% 62% 45%; }
          30% { border-radius: 65% 35% 42% 58% / 48% 55% 45% 52%; }
          45% { border-radius: 48% 52% 58% 42% / 62% 42% 58% 38%; }
          60% { border-radius: 55% 45% 52% 48% / 45% 62% 38% 55%; }
          75% { border-radius: 45% 55% 48% 52% / 52% 48% 55% 45%; }
          90% { border-radius: 52% 48% 45% 55% / 42% 52% 48% 58%; }
          100% { border-radius: 58% 42% 48% 52% / 38% 58% 42% 62%; }
        }
        
        @keyframes blob-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.7; }
        }
        
        @keyframes blob-glow {
          0%, 100% { box-shadow: 0 0 60px rgba(139, 92, 246, 0.4), 0 0 100px rgba(236, 72, 153, 0.2), 0 0 140px rgba(6, 182, 212, 0.15); }
          50% { box-shadow: 0 0 80px rgba(139, 92, 246, 0.5), 0 0 120px rgba(236, 72, 153, 0.3), 0 0 160px rgba(6, 182, 212, 0.2); }
        }
      `
      document.head.appendChild(style)
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

          {/* Right Column - Advanced Animated Blob */}
          <div className="flex justify-center items-center mt-8 lg:mt-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Primary morphing blob with enhanced glow */}
              <div 
                className="absolute inset-1/4 bg-gradient-to-br from-[#8B5CF6] via-[#EC4899] to-[#06B6D4] blur-xl"
                style={{ 
                  animation: "blob-morph 12s ease-in-out infinite, blob-float 5s ease-in-out infinite, blob-glow 4s ease-in-out infinite",
                  borderRadius: "58% 42% 48% 52% / 38% 58% 42% 62%",
                  opacity: 0.6,
                }}
              />
              
              {/* Secondary blob layer for depth */}
              <div 
                className="absolute inset-1/3 bg-gradient-to-tr from-[#06B6D4] via-[#EC4899] to-[#8B5CF6] blur-3xl"
                style={{ 
                  animation: "blob-morph 15s ease-in-out infinite reverse, blob-float 6s ease-in-out infinite reverse",
                  borderRadius: "45% 55% 60% 40% / 55% 45% 40% 60%",
                  opacity: 0.4,
                }}
              />
              
              {/* Core bright glow */}
              <div className="absolute inset-2/5 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#06B6D4] blur-3xl opacity-50 animate-pulse"></div>
              
              {/* Orbit paths with neon lines */}
              {/* Light Blue line - inner orbit */}
              <svg className="absolute inset-0 w-full h-full" style={{ animation: "rotate 20s linear infinite" }}>
                <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#4CC9F0" strokeWidth="2.5" opacity="0.8" style={{ filter: "drop-shadow(0 0 15px #4CC9F0) drop-shadow(0 0 8px #4CC9F0)" }} />
                <circle cx="50%" cy="15%" r="4" fill="#4CC9F0" style={{ filter: "drop-shadow(0 0 12px #4CC9F0)" }} opacity="1" />
              </svg>
              
              {/* Pink line - middle orbit */}
              <svg className="absolute inset-0 w-full h-full" style={{ animation: "rotate 25s linear infinite reverse" }}>
                <circle cx="50%" cy="50%" r="50%" fill="none" stroke="#EC4899" strokeWidth="2.5" opacity="0.8" style={{ filter: "drop-shadow(0 0 15px #EC4899) drop-shadow(0 0 8px #EC4899)" }} />
                <circle cx="50%" cy="0%" r="4" fill="#EC4899" style={{ filter: "drop-shadow(0 0 12px #EC4899)" }} opacity="1" />
              </svg>
              
              {/* Purple line - outer orbit */}
              <svg className="absolute inset-0 w-full h-full" style={{ animation: "rotate 30s linear infinite" }}>
                <circle cx="50%" cy="50%" r="65%" fill="none" stroke="#A66CFF" strokeWidth="2.5" opacity="0.8" style={{ filter: "drop-shadow(0 0 15px #A66CFF) drop-shadow(0 0 8px #A66CFF)" }} />
                <circle cx="50%" cy="-15%" r="4" fill="#A66CFF" style={{ filter: "drop-shadow(0 0 12px #A66CFF)" }} opacity="1" />
              </svg>
              
              {/* Outer radial gradient glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#8B5CF6]/5 via-transparent to-[#06B6D4]/5 blur-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
