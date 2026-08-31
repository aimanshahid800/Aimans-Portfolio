"use client"

import { Github, Linkedin, Mail, FileText } from "lucide-react"
import { useEffect, useState } from "react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/aimanshahid800",
    icon: Github,
    hoverStyle: { color: "#ffffffff", backgroundColor: "rgba(0, 0, 0, 1)" },
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aiman-shahid-b49035320",
    icon: Linkedin,
    hoverStyle: { color: "#0A66C2", backgroundColor: "rgba(0, 0, 0, 1)" },
  },
  {
    name: "Email",
    href: "#contact",
    icon: Mail,
    hoverStyle: { color: "#ea4335", backgroundColor: "rgba(0, 0, 0, 1)" },
  },
  {
    name: "Resume",
    href: "/resume",
    icon: FileText,
    hoverStyle: { color: "#7d08eaff", backgroundColor: "rgba(0, 0, 0, 1)" },
  },
]

export default function SocialIcons() {
  const [visible, setVisible] = useState(true)
  const [hoveredName, setHoveredName] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("#home")
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        setVisible(rect.bottom > 100)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`social-icons ${visible ? "" : "social-icons-hidden"}`}>
      {socialLinks.map((link) => {
        const IconComponent = link.icon
        const isHovered = hoveredName === link.name
        return (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith("#") ? undefined : "_blank"}
            rel={link.href.startsWith("#") ? undefined : "noopener noreferrer"}
            className="social-icons-item"
            title={link.name}
            onMouseEnter={() => setHoveredName(link.name)}
            onMouseLeave={() => setHoveredName(null)}
            style={isHovered ? link.hoverStyle : undefined}
          >
            <IconComponent className="w-5 h-5 transition-colors duration-200" />
          </a>
        )
      })}
    </nav>
  )
}
