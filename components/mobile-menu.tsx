"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home, User, Code, Briefcase, GraduationCap, Award, Mail } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Certificates", href: "#certificates", icon: Award },
  { name: "Contact", href: "#contact", icon: Mail },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

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
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="lg:hidden">
      {/* Floating Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-[#ff2d78] to-[#ff6b9d] rounded-full flex items-center justify-center shadow-lg shadow-[#ff2d78]/30 hover:shadow-[#ff6b9d]/50 transition-all duration-300 hover:scale-110"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-24 right-6 bg-[#0a0a0f]/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/30">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const IconComponent = item.icon
                const isActive = activeSection === item.href.substring(1)
                return (
                  <button
                    key={item.name}
                    onClick={() => handleClick(item.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#ff2d78]/20 to-[#ff6b9d]/20 text-[#ff6b9d] border border-[#ff2d78]/20"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
