'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Progress } from './ui/progress'
import { Briefcase, Scale, Building, Users, Eye, ArrowRight, CheckCircle } from 'lucide-react'
import { getPracticeAreas } from '../data/cms'
import { useState } from 'react'

export function SkillsSection() {
  const practiceData = getPracticeAreas()
  const [selectedArea, setSelectedArea] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const iconMap = {
    briefcase: Briefcase,
    scale: Scale,
    building: Building,
    users: Users
  }

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Briefcase
  }

  return (
    <section id="skills" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Animated background patterns */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [1, 2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        
        {/* Floating legal symbols */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-green-400/20 rounded-full animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-6xl text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {practiceData.title}
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-blue-400 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.p 
            className="text-gray-300 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {practiceData.subtitle}
          </motion.p>
        </motion.div>
        
        {/* Interactive Practice Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {practiceData.areas.map((area, index) => {
            const IconComponent = getIcon(area.icon)
            const isSelected = selectedArea === index
            
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.05 }}
                onClick={() => setSelectedArea(isSelected ? null : index)}
                className="cursor-pointer"
              >
                <Card className={`glass-card p-8 border-white/10 backdrop-blur-sm h-full transition-all duration-500 hover:border-yellow-500/50 ${
                  isSelected ? 'border-yellow-500/70 bg-yellow-500/10' : ''
                }`}>
                  {/* Icon with animation */}
                  <motion.div 
                    className="text-yellow-400 mb-6 flex justify-center"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="w-12 h-12" />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-2xl text-white mb-4 text-center">{area.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed text-center">
                    {area.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl text-yellow-400">{area.cases}</div>
                      <div className="text-xs text-gray-400">Cases</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-green-400">{area.successRate}%</div>
                      <div className="text-xs text-gray-400">Success</div>
                    </div>
                  </div>
                  
                  {/* View Details Button */}
                  <motion.div
                    className="flex items-center justify-center text-yellow-400 hover:text-yellow-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm mr-2">
                      {isSelected ? 'Hide Details' : 'View Details'}
                    </span>
                    <motion.div
                      animate={{ rotate: isSelected ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Detailed Skills View */}
        {selectedArea !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <div className="glass-card p-10 rounded-3xl">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Skills List */}
                <div>
                  <h4 className="text-2xl text-white mb-8">Core Competencies</h4>
                  <div className="space-y-6">
                    {practiceData.areas[selectedArea].skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="space-y-3"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className={`text-gray-200 transition-colors ${
                              hoveredSkill === skill ? 'text-white' : ''
                            }`}>
                              {skill}
                            </span>
                          </div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: hoveredSkill === skill ? 1 : 0,
                              scale: hoveredSkill === skill ? 1 : 0.8
                            }}
                            className="text-yellow-400 text-sm"
                          >
                            Expert Level
                          </motion.div>
                        </div>
                        
                        {/* Skill Progress Bar */}
                        <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${85 + Math.random() * 15}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 1.5 }}
                            className="h-full bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full relative"
                          >
                            <motion.div
                              animate={{ x: ['0%', '100%', '0%'] }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Area Overview */}
                <div>
                  <h4 className="text-2xl text-white mb-6">Practice Overview</h4>
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-xl">
                      <h5 className="text-lg text-yellow-400 mb-3">Experience</h5>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Over {Math.floor(Math.random() * 8) + 8} years of specialized experience in {practiceData.areas[selectedArea].title.toLowerCase()}, 
                        handling complex cases for Fortune 500 companies and emerging businesses.
                      </p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h5 className="text-lg text-yellow-400 mb-3">Approach</h5>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Strategic, results-oriented legal counsel combining deep technical expertise 
                        with practical business understanding to deliver optimal outcomes.
                      </p>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h5 className="text-lg text-yellow-400 mb-3">Success Metrics</h5>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-xl text-green-400">{practiceData.areas[selectedArea].cases}+</div>
                          <div className="text-xs text-gray-400">Cases Handled</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl text-blue-400">{practiceData.areas[selectedArea].successRate}%</div>
                          <div className="text-xs text-gray-400">Win Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Legal Certifications & Memberships */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl text-white mb-12">Certifications & Professional Memberships</h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              'New York State Bar', 'New Jersey Bar', 'American Bar Association', 
              'Harvard Law Review', 'Corporate Law Institute', 'Litigation Specialist',
              'GDPR Certified', 'Securities Law Expert', 'ADR Mediator', 'Pro Bono Society'
            ].map((credential, index) => (
              <motion.span
                key={credential}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 2, y: -5 }}
                className="glass-card px-6 py-3 text-gray-200 rounded-full border border-white/20 hover:border-yellow-400/50 transition-all duration-500 cursor-default"
              >
                {credential}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}