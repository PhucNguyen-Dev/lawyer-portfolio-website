'use client'

import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { useState, useEffect } from 'react'
import { ChevronRight, Home, User, Briefcase, FileText, MessageSquare, BookOpen, HelpCircle, Award, Mail } from 'lucide-react'
import { getNavigation, getGeneral } from '../data/cms'

export function SideNavigation() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  
  const { scrollY } = useScroll()
  const navData = getNavigation()
  const generalData = getGeneral()

  // Show side nav when scrolling down past hero section
  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldShow = latest > window.innerHeight * 0.8
    setIsVisible(shouldShow)
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
    const sections = ['home', 'about', 'skills', 'projects', 'testimonials', 'blog', 'contact']
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
    // Auto-collapse on mobile after clicking
    if (window.innerWidth < 768) {
      setIsExpanded(false)
    }
  }

  // Icon mapping for navigation items
  const getNavigationIcon = (key: string) => {
    const iconMap = {
      home: Home,
      about: User, 
      practice: Briefcase,
      skills: Briefcase,
      cases: FileText,
      projects: FileText,
      testimonials: MessageSquare,
      blog: BookOpen,
      faq: HelpCircle,
      awards: Award,
      contact: Mail
    }
    return iconMap[key as keyof typeof iconMap] || FileText
  }

  if (!isVisible) return null

  return (
    <>
      {/* Side Navigation */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          width: isExpanded ? 280 : 80
        }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 glass-nav rounded-2xl border border-white/20 overflow-hidden"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <motion.div
            className="flex items-center space-x-3"
            animate={{ justifyContent: isExpanded ? 'flex-start' : 'center' }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-black font-bold text-sm">
              {generalData.name.split(' ').map(n => n.charAt(0)).join('')}
            </div>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ 
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? 'auto' : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="text-white text-sm font-medium whitespace-nowrap">
                {generalData.name}
              </div>
              <div className="text-gray-400 text-xs whitespace-nowrap">
                {generalData.title}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation Items */}
        <div className="py-4">
          {navData.items.map((item, index) => {
            const sectionId = item.key === 'practice' ? 'skills' : 
                             item.key === 'cases' ? 'projects' : item.key
            const isActive = activeSection === sectionId
            const IconComponent = getNavigationIcon(item.key)
            
            return (
              <motion.button
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => scrollToSection(sectionId)}
                className={`w-full flex items-center space-x-4 px-4 py-3 transition-all duration-300 group relative ${
                  isActive 
                    ? 'text-yellow-400 bg-yellow-400/10' 
                    : 'text-gray-300 hover:text-yellow-400 hover:bg-white/5'
                }`}
              >
                {/* Active indicator */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.div>
                </div>
                
                {/* Label */}
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ 
                    opacity: isExpanded ? 1 : 0,
                    width: isExpanded ? 'auto' : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>

                {/* Hover arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: isExpanded ? 0 : (isActive ? 1 : 0),
                    x: isExpanded ? -10 : 0
                  }}
                  className="absolute right-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            )
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ delay: 0.2 }}
          className="border-t border-white/10 p-4 space-y-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('contact')}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
          >
            Schedule Consultation
          </motion.button>
          
          <div className="flex space-x-2">
            <motion.a
              href={`tel:${generalData.phone}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 glass-card p-2 rounded-lg flex items-center justify-center text-green-400 hover:bg-green-400/10 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
            </motion.a>
            
            <motion.a
              href={`mailto:${generalData.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 glass-card p-2 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-400/10 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* Expand/Collapse indicator for mobile */}
        <motion.div
          className="md:hidden absolute -right-3 top-1/2 transform -translate-y-1/2"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-6 h-6 glass-nav rounded-full flex items-center justify-center text-yellow-400 border border-white/20"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>

      {/* Mobile backdrop */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsExpanded(false)}
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
        />
      )}

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        className="fixed left-6 bottom-6 z-40"
      >
        <div className="glass-nav rounded-full p-3 border border-white/20">
          <div className="relative w-8 h-8">
            <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="100, 100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ 
                  strokeDashoffset: 100 - (scrollY.get() / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-yellow-400 transform rotate-90" />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}