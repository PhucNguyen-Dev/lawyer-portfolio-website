import { Navigation } from './components/Navigation'
import { SideNavigation } from './components/SideNavigation'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { BlogSection } from './components/BlogSection'
import { FAQSection } from './components/FAQSection'
import { AwardsSection } from './components/AwardsSection'
import { ContactSection } from './components/ContactSection'
import { CMSAdmin } from './components/CMSAdmin'

export default function App() {
  return (
    <div className="dark min-h-screen bg-black text-white">
      <Navigation />
      <SideNavigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <BlogSection />
        <FAQSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <CMSAdmin />
    </div>
  )
}