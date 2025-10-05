'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { AnimatedCounter } from './ui/animated-counter'
import { Scale, Shield, Trophy, Heart, Award, Medal, Star, Calendar, MapPin, GraduationCap, Building, Users } from 'lucide-react'
import { getAbout } from '../data/cms'
import { unsplash_tool } from '../tools/unsplash'

export function AboutSection() {
  const aboutData = getAbout()

  const iconMap = {
    scale: Scale,
    shield: Shield,
    trophy: Trophy,
    heart: Heart,
    award: Award,
    medal: Medal,
    star: Star,
    calendar: Calendar,
    'map-pin': MapPin,
    'graduation-cap': GraduationCap,
    building: Building,
    users: Users
  }

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Award
  }

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        {/* Animated background elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
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
            {aboutData.title}
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {aboutData.subtitle}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-20">
          {/* Left Column - Biography and Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card p-10 rounded-3xl">
              <h3 className="text-3xl text-white mb-6">
                Passionate about protecting your legal interests
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {aboutData.description}
              </p>
              
              {/* Animated Stats */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                {aboutData.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center glass-card p-6 rounded-xl hover:scale-105 transition-transform duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-3xl text-yellow-400 mb-2">
                      <AnimatedCounter
                        value={stat.number}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievement Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl"
            >
              <h4 className="text-2xl text-white mb-6">Professional Achievements</h4>
              <div className="space-y-4">
                {aboutData.achievements.map((achievement, index) => {
                  const IconComponent = getIcon(achievement.icon)
                  return (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20 hover:bg-yellow-400/10 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <div className="text-yellow-400">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{achievement.title}</div>
                        <div className="text-gray-400 text-sm">{achievement.description}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl"
          >
            <h4 className="text-2xl text-white mb-8">Professional Timeline</h4>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-yellow-400 to-blue-500"></div>
              
              {aboutData.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative flex items-start space-x-6 mb-8 last:mb-0"
                  whileHover={{ x: 5 }}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="flex-shrink-0 w-4 h-4 bg-yellow-400 rounded-full border-4 border-gray-900 shadow-lg"
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Content */}
                  <div className="flex-grow">
                    <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-yellow-400 font-semibold">{item.year}</div>
                        <div className="text-xs text-gray-500 px-2 py-1 bg-white/5 rounded">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {item.year}
                        </div>
                      </div>
                      <h5 className="text-white font-medium mb-1">{item.title}</h5>
                      <div className="text-blue-400 text-sm mb-2">{item.organization}</div>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl text-white text-center mb-12">Core Values & Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Scale, title: 'Justice', description: 'Committed to achieving fair and equitable outcomes' },
              { icon: Shield, title: 'Integrity', description: 'Upholding the highest ethical standards' },
              { icon: Trophy, title: 'Excellence', description: 'Delivering superior legal services' },
              { icon: Heart, title: 'Compassion', description: 'Treating each client with empathy and respect' }
            ].map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="glass-card p-8 border-white/10 hover:border-yellow-500/50 transition-all duration-500 group h-full text-center">
                  <motion.div 
                    className="text-yellow-400 mb-6 group-hover:scale-110 transition-transform duration-500 flex justify-center"
                    whileHover={{ rotate: 10 }}
                  >
                    <principle.icon className="w-12 h-12" />
                  </motion.div>
                  <h4 className="text-white text-xl mb-4">{principle.title}</h4>
                  <p className="text-gray-300 leading-relaxed text-sm">{principle.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}