'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Award, Medal, Star, Trophy, Calendar, Building } from 'lucide-react'
import { getAwards } from '../data/cms'

export function AwardsSection() {
  const awardsData = getAwards()

  return (
    <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating award symbols */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/5"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              rotate: [0, 360],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 8
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            {i % 4 === 0 ? <Award className="w-12 h-12" /> :
             i % 4 === 1 ? <Medal className="w-12 h-12" /> :
             i % 4 === 2 ? <Trophy className="w-12 h-12" /> :
             <Star className="w-12 h-12" />}
          </motion.div>
        ))}

        {/* Background patterns */}
        <div className="absolute top-20 right-20 w-40 h-40 border border-yellow-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border border-blue-400/10 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
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
            {awardsData.title}
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
            {awardsData.subtitle}
          </motion.p>
        </motion.div>

        {/* Awards Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 via-blue-500 to-yellow-400 hidden lg:block"></div>

          {/* Awards */}
          <div className="space-y-16">
            {awardsData.awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:space-x-8`}
              >
                {/* Award Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:mb-0 mb-8`}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="glass-card p-8 border-white/10 hover:border-yellow-500/50 transition-all duration-500">
                      <div className={`flex items-center ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'} justify-center mb-6`}>
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className="text-yellow-400 mr-4"
                        >
                          <Award className="w-10 h-10" />
                        </motion.div>
                        <div className="text-yellow-400 text-2xl font-bold">{award.year}</div>
                      </div>
                      
                      <h3 className="text-2xl text-white mb-4 group-hover:text-yellow-400 transition-colors duration-500">
                        {award.title}
                      </h3>
                      
                      <div className="flex items-center mb-4 text-blue-400">
                        <Building className="w-4 h-4 mr-2" />
                        <span>{award.organization}</span>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {award.description}
                      </p>
                    </Card>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="relative flex-shrink-0 lg:block hidden">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-6 h-6 bg-yellow-400 rounded-full border-4 border-gray-900 shadow-lg relative z-10"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 w-6 h-6 bg-yellow-400/30 rounded-full"
                  />
                </div>

                {/* Spacer for opposite side */}
                <div className="flex-1 lg:block hidden"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recognition Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl text-white text-center mb-12">Professional Recognition</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Super Lawyers", description: "Recognized for excellence in legal practice", color: "text-yellow-400" },
              { icon: Medal, title: "Client Choice", description: "Top-rated by client reviews and feedback", color: "text-blue-400" },
              { icon: Star, title: "Rising Star", description: "Outstanding young lawyer recognition", color: "text-green-400" },
              { icon: Trophy, title: "ABA Award", description: "American Bar Association honor", color: "text-purple-400" }
            ].map((recognition, index) => (
              <motion.div
                key={recognition.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="glass-card p-6 border-white/10 hover:border-yellow-500/30 transition-all duration-500 h-full text-center group">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`${recognition.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-500`}
                  >
                    <recognition.icon className="w-12 h-12" />
                  </motion.div>
                  <h4 className="text-white text-lg mb-3 group-hover:text-yellow-400 transition-colors duration-500">
                    {recognition.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {recognition.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-10 rounded-3xl max-w-4xl mx-auto">
            <h4 className="text-3xl text-white mb-8">Recognition by the Numbers</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "15+", label: "Awards Received", icon: Award },
                { number: "5", label: "Years Consecutive", icon: Star },
                { number: "3", label: "National Recognition", icon: Trophy },
                { number: "100%", label: "Client Satisfaction", icon: Medal }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="text-yellow-400 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300"
                  >
                    <stat.icon className="w-8 h-8" />
                  </motion.div>
                  <div className="text-3xl text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}