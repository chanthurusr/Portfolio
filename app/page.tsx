"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative light-grid">
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <footer className="py-8 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          Designed & Built by <span className="font-semibold text-teal">Chanthuru S R</span>
        </p>
      </footer>
    </div>
  )
}
