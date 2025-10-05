'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { Button } from './ui/button'
import { ArrowDown, Scale, Briefcase, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { Typewriter } from './ui/typewriter'
import { FloatingParticles } from './ui/floating-particles'
import { getHero, getGeneral } from '../data/cms'
import { useState } from 'react'

export function HeroSection() {
  const [showTypewriter, setShowTypewriter] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const heroData = getHero()
  const generalData = getGeneral()
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -300])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToCases = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="home" 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center relative overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        {/* Floating Particles */}
        <FloatingParticles count={heroData.backgroundElements.particles} />
        
        {/* Animated Legal Icons */}
        {[...Array(heroData.backgroundElements.legalIcons)].map((_, i) => (
          <motion.div
            key={`scale-${i}`}
            className="absolute text-yellow-400/5"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              rotate: [0, 360],
              y: [-20, 20, -20],
              x: [-10, 10, -10]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + i * 15}%`
            }}
          >
            <Scale className="w-16 h-16" />
          </motion.div>
        ))}

        {/* Additional floating elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`briefcase-${i}`}
            className="absolute text-blue-400/5"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0],
              rotate: [0, -360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              delay: i * 7,
              ease: "easeInOut"
            }}
            style={{
              right: `${15 + i * 25}%`,
              top: `${25 + i * 20}%`
            }}
          >
            <Briefcase className="w-12 h-12" />
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          {/* Main Glass Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="glass-card rounded-3xl p-12 max-w-5xl mx-auto backdrop-blur-xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-yellow-400 text-lg tracking-wider mb-4"
            >
              {heroData.subtitle}
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onAnimationComplete={() => setShowTypewriter(true)}
              className="text-5xl md:text-7xl text-white mb-6"
            >
              {generalData.name}
            </motion.h1>
            
            {/* Typewriter Effect for Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-2xl md:text-4xl text-gray-300 mb-8 min-h-[3rem]"
            >
              {showTypewriter && (
                <Typewriter
                  text="Experienced Corporate Attorney specializing in Business Law & Litigation"
                  speed={80}
                  delay={500}
                  onComplete={() => setShowCTA(true)}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-yellow-600"
                />
              )}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-gray-400 text-lg max-w-4xl mx-auto mb-8"
            >
              {heroData.description}
            </motion.p>
          </motion.div>
          
          {/* Enhanced Call-to-Action Buttons */}
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={scrollToContact}
                  className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-12 py-6 rounded-full transition-all duration-500 transform shadow-lg hover:shadow-yellow-500/30 overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    {heroData.ctaText}
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={scrollToCases}
                  variant="outline"
                  className="glass-card border-2 border-yellow-400/30 text-white hover:bg-yellow-400/10 hover:border-yellow-400/50 px-12 py-6 rounded-full transition-all duration-500"
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  View Case Results
                </Button>
              </motion.div>
            </motion.div>
          )}
          
          {/* Contact Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex items-center justify-center space-x-8"
          >
            {heroData.contactIcons.map(({ type, href, label }, index) => {
              const IconComponent = type === 'phone' ? Phone : type === 'email' ? Mail : MapPin
              
              return (
                <motion.a
                  key={index}
                  href={href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.1 }}
                  className="glass-card w-16 h-16 rounded-full flex items-center justify-center text-white hover:text-yellow-400 transition-all duration-500 hover:scale-110 group relative"
                  title={label}
                  whileHover={{ y: -5 }}
                >
                  <IconComponent className="w-6 h-6" />
                  <motion.div
                    className="absolute inset-0 bg-yellow-400/20 rounded-full opacity-0 group-hover:opacity-100"
                    initial={false}
                    whileHover={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.a>
              )
            })}
          </motion.div>
          
          {/* Professional Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="flex flex-wrap justify-center gap-6 mt-12 text-gray-400 text-sm"
          >
            {heroData.credentials.map((credential, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass-card px-6 py-3 rounded-full text-xs tracking-wide cursor-default"
              >
                {credential}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/60 cursor-pointer"
            onClick={() => {
              const element = document.getElementById('about')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <div className="flex flex-col items-center space-y-2">
              <ArrowDown className="w-6 h-6" />
              <div className="text-xs tracking-wider">SCROLL DOWN</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}