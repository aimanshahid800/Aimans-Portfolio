"use client"

import { useState, useEffect } from "react"
import { Home, User, Code, Briefcase, GraduationCap, Award, Mail } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Certificates", href: "#certificates", icon: Award },
  { name: "Contact", href: "#contact", icon: Mail },
]

export default function SidebarNav() {
  const [activeSection, setActiveSection] = useState("home")
  const [isHovered, setIsHovered] = useState(false)

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
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className="sidebar-nav"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {navItems.map((item) => {
        const IconComponent = item.icon
        const isActive = activeSection === item.href.substring(1)
        return (
          <button
            key={item.name}
            onClick={() => handleClick(item.href)}
            className={`sidebar-nav-item ${isActive ? "active" : ""}`}
            title={item.name}
          >
            <IconComponent className="w-5 h-5" />
          </button>
        )
      })}
    </nav>
  )
}
