'use client'

import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { getNavigation, getGeneral } from '../data/cms'
import { ScrollProgress } from './ui/scroll-progress'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  
  const { scrollY } = useScroll()
  const navData = getNavigation()
  const generalData = getGeneral()

  // Handle scroll direction and visibility
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
    
    if (latest > lastScrollY && latest > 100) {
      setIsVisible(false) // Hide when scrolling down
    } else {
      setIsVisible(true) // Show when scrolling up
    }
    setLastScrollY(latest)
  })

  // Track active section
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0% -80% 0%'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = ['home', 'about', 'practice', 'cases', 'testimonials', 'blog', 'contact']
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <ScrollProgress />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ 
          y: isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-xl font-medium"
                >
                  <span className="text-yellow-400">{generalData.name.split(' ')[0]}</span>{' '}
                  <span className="text-white">{generalData.name.split(' ')[1]}</span>
                </motion.div>
              </div>
              <div className="text-xs text-gray-300 tracking-wider">{generalData.title.toUpperCase()}</div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navData.items.map((item, index) => {
                const sectionId = item.key === 'practice' ? 'skills' : 
                                 item.key === 'cases' ? 'projects' : item.key
                const isActive = activeSection === sectionId
                
                return (
                  <motion.button
                    key={item.key}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => scrollToSection(sectionId)}
                    className="relative text-gray-300 hover:text-yellow-400 transition-all duration-300 group"
                  >
                    <span className={`${isActive ? 'text-yellow-400' : ''}`}>
                      {item.label}
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? '100%' : 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={toggleMobileMenu}
              className="md:hidden text-white p-2"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden glass-nav border-t border-white/10 overflow-hidden"
        >
          <div className="px-6 py-4 space-y-4">
            {navData.items.map((item, index) => {
              const sectionId = item.key === 'practice' ? 'skills' : 
                               item.key === 'cases' ? 'projects' : item.key
              const isActive = activeSection === sectionId

              return (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => scrollToSection(sectionId)}
                  className={`block w-full text-left py-2 px-4 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'text-yellow-400 bg-yellow-400/10' 
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
}