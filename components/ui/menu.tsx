"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const navItems = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "EDUCATION", href: "#education" },
  { name: "CERTIFICATES", href: "#certificates" },
  { name: "CONTACT", href: "#contact" },
] as const

export default function SterlingGateKineticNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMobile, setIsMobile] = useState(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const patternRefs = useRef<Array<HTMLDivElement | null>>([])
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])

  // Initialize viewport detection and ensure menu is always closed on mobile
  useEffect(() => {
    const updateViewport = () => {
      const isMobileNow = window.innerWidth < 768
      setIsMobile(isMobileNow)
      
      // Force menu closed when on mobile to prevent auto-open
      if (isMobileNow) {
        setIsOpen(false)
      }
    }

    updateViewport()
    window.addEventListener("resize", updateViewport)

    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
      navItems.forEach((item) => {
        const section = document.querySelector(item.href) as HTMLElement | null
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(item.href.substring(1))
          }
        }
      })
    }

    window.addEventListener("keydown", handleEscape)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("keydown", handleEscape)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!overlayRef.current || !menuRef.current) return

    const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[]
    const patterns = patternRefs.current.filter(Boolean) as HTMLDivElement[]

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, {
        autoAlpha: 0,
        pointerEvents: "none",
      })

      gsap.set(menuRef.current, {
        y: 18,
        autoAlpha: 0,
      })

      gsap.set(items, {
        y: 32,
        opacity: 0,
      })

      gsap.set(patterns, {
        y: 120,
        opacity: 0.4,
      })

      if (isOpen) {
        gsap.to(overlayRef.current, {
          autoAlpha: 1,
          duration: 0.26,
          ease: "power2.out",
          onStart: () => {
            overlayRef.current!.style.pointerEvents = "auto"
          },
        })

        gsap.to(menuRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          ease: "power3.out",
        })

        gsap.to(patterns, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power2.out",
        })

        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.1,
        })
      } else {
        gsap.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power2.inOut",
          onComplete: () => {
            overlayRef.current!.style.pointerEvents = "none"
          },
        })

        gsap.to(menuRef.current, {
          y: 14,
          autoAlpha: 0,
          duration: 0.18,
          ease: "power2.inOut",
        })

        gsap.to(items, {
          y: 24,
          opacity: 0,
          duration: 0.2,
          stagger: 0.02,
          ease: "power2.in",
        })
      }
    }, overlayRef)

    return () => ctx.revert()
  }, [isOpen])

  const handleNavigate = (href: string) => {
    const target = document.querySelector(href) as HTMLElement | null
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsOpen(false)
  }

  if (!isMobile) return null

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-kinetic-menu"
        onClick={() => setIsOpen((prev) => !prev)}
        className="md:hidden fixed right-4 top-4 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-200 hover:bg-[#ff4bb8] hover:text-black"
      >
        <span className="relative block h-4 w-5">
          <span
            className={[
              "absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200",
              isOpen ? "rotate-45" : "-translate-y-2",
            ].join(" ")}
          />
          <span
            className={[
              "absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200",
              isOpen ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />
          <span
            className={[
              "absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200",
              isOpen ? "-rotate-45" : "translate-y-2",
            ].join(" ")}
          />
        </span>
      </button>

      <div
  id="mobile-kinetic-menu"
  ref={overlayRef}
  className="md:hidden fixed inset-0 z-[60] overflow-hidden bg-[#0d0d12]/90 backdrop-blur-md"
  style={{ opacity: 0, visibility: "hidden", pointerEvents: "none" }}
>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(133,98,174,0.32),transparent_22%),radial-gradient(circle_at_60%_55%,rgba(138,109,255,0.18),transparent_18%),radial-gradient(circle_at_80%_80%,rgba(255,148,208,0.15),transparent_25%)]" />

        <div
          ref={(el) => {
            patternRefs.current[0] = el
          }}
          className="absolute -left-16 top-20 h-52 w-52 rounded-full bg-[#8b74ff]/40 blur-[18px]"
        />
        <div
          ref={(el) => {
            patternRefs.current[1] = el
          }}
          className="absolute left-1/2 top-[42%] h-48 w-48 -translate-x-1/2 rounded-full bg-[#8b74ff]/35 blur-[18px]"
        />
        <div
          ref={(el) => {
            patternRefs.current[2] = el
          }}
          className="absolute -right-10 bottom-8 h-48 w-48 rounded-full bg-[#d4a9d9]/35 blur-[20px]"
        />

        <div
          ref={menuRef}
          className="relative z-10 flex min-h-screen w-full flex-col px-4 pb-8 pt-12"
        >
          <div className="flex flex-1 flex-col justify-center gap-1.5 pt-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1)

              return (
                <button
                  key={item.name}
                  ref={(element) => {
                    itemRefs.current[index] = element
                  }}
                  type="button"
                  onClick={() => handleNavigate(item.href)}
                  className={[
                    "group flex w-full items-center justify-between border-none text-left leading-[0.9] tracking-[-0.08em] transition-all duration-200 ease-out",
                    isActive ? "bg-[#f655a5] px-3 py-1 text-black" : "text-white hover:bg-[#f655a5] hover:px-3 hover:py-1 hover:text-black",
                  ].join(" ")}
                  style={{
                    fontSize: "clamp(2.8rem, 8vw, 6.2rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.08em",
                  }}
                >
                  <span>{item.name}</span>
                  <span
                    className={[
                      "text-[0.7em] font-black leading-none transition-all duration-200",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    ].join(" ")}
                  >
                    →
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
