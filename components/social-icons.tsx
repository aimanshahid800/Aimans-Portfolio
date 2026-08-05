"use client"

import { Github, Linkedin, Mail, FileText } from "lucide-react"
import { useEffect, useState } from "react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/aimanshahid800",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aiman-shahid-b49035320",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:aimanshahid800@gmail.com",
    icon: Mail,
  },
  {
    name: "Resume",
    href: "/resume",
    icon: FileText,
  },
]

export default function SocialIcons() {
  const [visible, setVisible] = useState(true)

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
        return (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="social-icons-item"
            title={link.name}
          >
            <IconComponent className="w-5 h-5" />
          </a>
        )
      })}
    </nav>
  )
}
