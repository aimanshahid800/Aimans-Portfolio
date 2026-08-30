"use client"

import { useEffect, useState } from "react"
import BlurText from "./BlurText"
import RotatingSubtitle from "./rotating-subtitle"
import StarButton from "./StarButton"
import RidgeButton from "./RidgeButton"
import { Magnetic } from "./Magnetic"
import { Github, Linkedin, Mail, FileText } from "lucide-react"

// Social links for the mobile-only row below the profile picture
const socialLinks = [
  { name: "GitHub",   href: "https://github.com/aimanshahid800",                  icon: Github,   external: true  },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/aiman-shahid-b49035320", icon: Linkedin, external: true  },
  { name: "Email",    href: "mailto:aimanshahid800@gmail.com",                    icon: Mail,     external: false },
  { name: "Resume",   href: "/resume",                                             icon: FileText, external: false },
]

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Trigger image animation after names appear
    const timer = setTimeout(() => setImageLoaded(true), 1500)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-between relative overflow-hidden pt-16 pb-24"
    >
      {/* Content */}
      <div
        className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-between"
        style={{
          transform: `translateY(${-scrollY * 0.1}px)`,
          opacity: Math.max(0, 1 - scrollY * 0.002),
        }}
      >
        {/* Name + Profile Image */}
        <div className="relative" style={{ minHeight: 'clamp(250px, 40vw, 500px)' }}>
          <h1 className="font-bold font-heading" style={{ lineHeight: '0.9', position: 'relative', zIndex: 1 }}>
            <span className="block uppercase" style={{ fontSize: 'clamp(3rem, 14vw, 14rem)', color: '#FF6B9D', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent)', maskImage: 'linear-gradient(to bottom, black 40%, transparent)', transform: 'scaleY(1.3)', overflow: 'visible', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
              <BlurText
                text="Aiman"
                delay={800}
                animateBy="words"
                direction="top"
                stepDuration={0.6}
                className="justify-center"
              />
            </span>
            <span className="block uppercase" style={{ fontSize: 'clamp(3rem, 14vw, 14rem)', color: '#FF6B9D', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent)', maskImage: 'linear-gradient(to bottom, black 40%, transparent)', transform: 'scaleY(1.3)', overflow: 'visible', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
              <BlurText
                text="Shahid"
                delay={0}
                animateBy="words"
                direction="top"
                stepDuration={0.6}
                className="justify-center"
              />
            </span>
          </h1>

          {/* Profile Image - Overlapping both names */}
          <div
            style={{
              position: 'absolute',
              top: '80%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          >
            <Magnetic intensity={0.4} range={150}>
              <div
                style={{
                  width: 'clamp(150px, 22vw, 280px)',
                  height: 'clamp(150px, 22vw, 280px)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: 'none',
                  boxShadow: '0 0 30px rgba(255, 107, 157, 0.4), 0 0 60px rgba(255, 107, 157, 0.2)',
                  transform: imageLoaded ? 'scale(1)' : 'scale(0.5)',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease-out',
                  cursor: 'pointer',
                }}
              >
                <img
                  src="/profile.png"
                  alt="Aiman Shahid"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </Magnetic>
          </div>
        </div>

        {/* ── Mobile-only social icons row ─────────────────────────────────────
            Visible below md (< 768 px) only — desktop right sidebar handles
            these icons on md and above. Placed between profile image and subtitle.
        */}
        <div className="md:hidden flex items-center justify-center gap-3 mt-12 mb-1">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.href}
                title={link.name}
                aria-label={link.name}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="
                  flex items-center justify-center
                  w-11 h-11 rounded-xl
                  text-black bg-[#fd5f94]
                  transition-all duration-300
                  hover:brightness-110 hover:scale-105 active:scale-95
                  shadow-[0_4px_14px_rgba(255,45,120,0.35)]
                "
              >
                <Icon className="w-5 h-5" />
              </a>
            )
          })}
        </div>

        {/* Subtitle and Buttons */}
        <div className="mt-16">
          <p className="text-lg sm:text-xl text-white/60 font-medium mb-8 text-center w-full">
            <RotatingSubtitle
              phrases={["BSCS Student", "AI Developer", "Creative Designer"]}
              className="animate-none"
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StarButton onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}>
              View My Work
            </StarButton>
            <RidgeButton onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
              Hire Me
            </RidgeButton>
          </div>
        </div>
      </div>
    </section>
  )
}
