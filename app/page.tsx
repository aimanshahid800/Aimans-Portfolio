"use client"
import SidebarNav from "@/components/sidebar-nav"
import SocialIcons from "@/components/social-icons"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import EducationSection from "@/components/education-section"
import CertificatesSection from "@/components/certificates-section"
import ContactSection from "@/components/contact-section"
import SoftAurora from "@/components/SoftAurora"
import SterlingGateKineticNavigation from "@/components/ui/sterling-gate-kinetic-navigation"

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-[#0a0a0f] relative">
        {/* SoftAurora Background */}
        <div className="fixed inset-0 z-0">
          <SoftAurora
            speed={0.6}
            scale={1.5}
            brightness={0.55}
            color1="#f7f7f7"
            color2="#e100ff"
            noiseFrequency={2.5}
            noiseAmplitude={1}
            bandHeight={0.5}
            bandSpread={1}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1}
            enableMouseInteraction
            mouseInfluence={0.25}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <SidebarNav />
          <SocialIcons />
          <SterlingGateKineticNavigation />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <CertificatesSection />
          <ContactSection />
        </div>
      </main>
    </>
  )
}
