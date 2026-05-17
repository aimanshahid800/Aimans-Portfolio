import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import EducationSection from "@/components/education-section"
import CertificatesSection from "@/components/certificates-section"
import ContactSection from "@/components/contact-section"
import FloatingBlobs from "@/components/floating-blobs"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FloatingBlobs />
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <CertificatesSection />
      <ContactSection />
    </main>
  )
}
