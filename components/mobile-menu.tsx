"use client"

import { useState, useEffect } from "react"
import { Home, User, Code, Briefcase, GraduationCap, Award, Mail } from "lucide-react"

// ─── Nav items (mirrors sidebar-nav.tsx) ──────────────────────────────────────
const navItems = [
  { name: "Home",         href: "#home",         icon: Home },
  { name: "About",        href: "#about",        icon: User },
  { name: "Skills",       href: "#skills",       icon: Code },
  { name: "Projects",     href: "#projects",     icon: Briefcase },
  { name: "Education",    href: "#education",    icon: GraduationCap },
  { name: "Certificates", href: "#certificates", icon: Award },
  { name: "Contact",      href: "#contact",      icon: Mail },
]



export default function MobileMenu() {
  const [activeSection, setActiveSection] = useState("home")

  // ── Track active section on scroll ──────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
      navItems.forEach((item) => {
        const section = document.querySelector(item.href) as HTMLElement
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(item.href.substring(1))
          }
        }
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/*
       * ─── MOBILE TOP NAV BAR ────────────────────────────────────────────────
       * Visible only below md breakpoint (< 768 px).
       * Desktop sidebars (.sidebar-nav / .social-icons) have their own
       * display:none at max-width:768px — this bar is the mobile replacement.
       */}
      <nav
        aria-label="Mobile navigation"
        className="
          fixed top-0 left-0 right-0 z-50
          md:hidden
          flex flex-wrap items-center justify-center gap-1
          px-2 py-2
          bg-[#0a0a0f]/80 backdrop-blur-xl
          border-b border-white/10
          shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_20px_rgba(255,45,120,0.08)]
        "
      >
        {/* ── Nav section icons ── */}
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.href.substring(1)
          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              title={item.name}
              aria-label={item.name}
              style={isActive ? {
                background: "linear-gradient(135deg, #61112d, #ff6b9d)",
                color: "#ffffff",
                boxShadow: "0 4px 15px rgba(255,45,120,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
              } : undefined}
              className={`
                relative flex items-center justify-center
                w-11 h-11 rounded-xl
                transition-all duration-300 cursor-pointer
                ${isActive
                  ? ""
                  : "text-white/40 hover:text-[#f389ad] hover:bg-[rgba(255,45,120,0.08)] hover:scale-105"
                }
              `}
            >
              <Icon className="w-5 h-5" />
            </button>
          )
        })}

      </nav>

      {/*
       * ─── BODY OFFSET ───────────────────────────────────────────────────────
       * Push page content down by the top bar height on mobile so nothing
       * hides under the fixed bar. On md+ the bar is hidden so no offset needed.
       */}
      <div className="md:hidden h-[60px]" aria-hidden="true" />
    </>
  )
}
