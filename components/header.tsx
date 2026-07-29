"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150
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
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-2 sm:px-4">
      <nav className="bg-black/20 backdrop-blur-xl border border-[#ff2d78]/20 rounded-full px-3 sm:px-6 py-2 sm:py-3 shadow-2xl flex items-center justify-between">
        {/* Logo */}
        <div>
          <h1 className="text-lg sm:text-xl font-bold">
            <span className="text-white">aimi</span>
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] bg-clip-text text-transparent">
              TECH
            </span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <button
                key={item.name}
                onClick={() => handleClick(item.href)}
                className={`relative text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6]"
                    : "text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6]"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] rounded-full animate-pulse"></span>
                )}
              </button>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white hover:text-[#ff2d78] hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 bg-black/20 backdrop-blur-xl border border-[#ff2d78]/20 rounded-2xl px-4 py-4 space-y-2 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item.href)}
              className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#ff2d78] via-[#ff6b9d] to-[#ff9ec6] hover:bg-white/5 transition-all duration-200"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
