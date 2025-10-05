'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { FileText, DollarSign, Building, Users, X, Calendar, MapPin, Quote, Star } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { getCaseResults } from '../data/cms'
import { useState } from 'react'

export function ProjectsSection() {
  const caseData = getCaseResults()
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const featuredCases = caseData.cases.filter(c => c.amount && parseFloat(c.amount.replace(/[\$M]/g, '')) > 5)
  const otherCases = caseData.cases.filter(c => !featuredCases.includes(c))

  const allAreas = [...new Set(caseData.cases.map(c => c.area))]

  const filteredCases = filter === 'all' 
    ? caseData.cases 
    : caseData.cases.filter(c => c.area === filter)

  const openModal = (index: number) => {
    setSelectedCase(index)
  }

  const closeModal = () => {
    setSelectedCase(null)
  }

  return (
    <section id="projects" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Animated particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [1, 3, 1],
              y: [0, -50, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        
        {/* Background shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 border border-yellow-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-48 h-48 border border-blue-400/10 rounded-full animate-pulse"></div>
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
            {caseData.title}
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
            {caseData.subtitle}
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={`rounded-full px-6 py-2 transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-yellow-500 text-black hover:bg-yellow-600' 
                : 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10'
            }`}
          >
            All Cases
          </Button>
          {allAreas.map((area) => (
            <Button
              key={area}
              onClick={() => setFilter(area)}
              variant={filter === area ? 'default' : 'outline'}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                filter === area 
                  ? 'bg-yellow-500 text-black hover:bg-yellow-600' 
                  : 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10'
              }`}
            >
              {area}
            </Button>
          ))}
        </motion.div>

        {/* Featured Cases Grid */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {featuredCases.filter(c => filter === 'all' || c.area === filter).map((legalCase, index) => (
            <motion.div
              key={legalCase.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => openModal(caseData.cases.indexOf(legalCase))}
            >
              <Card className="group glass-card border-white/10 overflow-hidden hover:border-yellow-500/50 transition-all duration-700 h-full">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1642522029686-5485ea7e6042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBtZWV0aW5nfGVufDF8fHx8MTc1OTYwMDY2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt={legalCase.title}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Enhanced badges */}
                  {legalCase.amount && (
                    <div className="absolute top-4 right-4 glass-card px-4 py-2 rounded-full">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-yellow-400" />
                        <span className="text-white text-sm">{legalCase.amount}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 glass-card px-4 py-2 rounded-full">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-green-400" />
                      <span className="text-white text-sm">{legalCase.outcome}</span>
                    </div>
                  </div>

                  {/* Click indicator */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="glass-card p-4 rounded-full">
                      <FileText className="w-8 h-8 text-yellow-400" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl text-white group-hover:text-yellow-400 transition-colors duration-500">
                      {legalCase.title}
                    </h3>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {legalCase.year}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {legalCase.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                      {legalCase.area}
                    </span>
                    <motion.div
                      className="text-yellow-400 text-sm opacity-0 group-hover:opacity-100"
                      whileHover={{ x: 5 }}
                    >
                      Click for details →
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Other Cases */}
        {otherCases.filter(c => filter === 'all' || c.area === filter).length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-3xl text-white text-center mb-4">Additional Case Highlights</h3>
              <p className="text-gray-400 text-center max-w-2xl mx-auto">
                A broader view of successful legal outcomes across diverse practice areas
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {otherCases.filter(c => filter === 'all' || c.area === filter).map((legalCase, index) => (
                <motion.div
                  key={legalCase.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => openModal(caseData.cases.indexOf(legalCase))}
                >
                  <Card className="group glass-card border-white/10 hover:border-yellow-400/50 transition-all duration-500 h-full">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMGRlYWx8ZW58MXx8fHwxNzU5NTU3MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt={legalCase.title}
                        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      
                      <div className="absolute top-3 right-3 glass-card px-3 py-1 rounded-full">
                        <span className="text-yellow-400 text-xs">{legalCase.year}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-lg text-white mb-3 group-hover:text-yellow-400 transition-colors duration-500">
                        {legalCase.title}
                      </h4>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {legalCase.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-green-400 text-sm">{legalCase.outcome}</span>
                        </div>
                        <span className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs">
                          {legalCase.area}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-10 rounded-3xl max-w-3xl mx-auto">
            <h4 className="text-3xl text-white mb-6">Ready to Discuss Your Case?</h4>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Every legal challenge is unique. Let's discuss how my experience can help you achieve the best possible outcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-10 py-4 rounded-full transition-all duration-500 shadow-lg"
                  onClick={() => {
                    const element = document.getElementById('contact')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 px-10 py-4 rounded-full transition-all duration-500"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  View All Cases
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Case Detail Modal */}
      <AnimatePresence>
        {selectedCase !== null && (
          <Dialog open={selectedCase !== null} onOpenChange={closeModal}>
            <DialogContent className="glass-card border-white/20 max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-white mb-4">
                  {caseData.cases[selectedCase]?.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Case Image */}
                <div className="relative overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1642522029686-5485ea7e6042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBtZWV0aW5nfGVufDF8fHx8MTc1OTYwMDY2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt={caseData.cases[selectedCase]?.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Case Details */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg text-yellow-400 mb-3">Case Overview</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {caseData.cases[selectedCase]?.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                        <span className="text-gray-400">Practice Area:</span>
                        <span className="text-white">{caseData.cases[selectedCase]?.area}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                        <span className="text-gray-400">Year:</span>
                        <span className="text-white">{caseData.cases[selectedCase]?.year}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                        <span className="text-gray-400">Outcome:</span>
                        <span className="text-green-400">{caseData.cases[selectedCase]?.outcome}</span>
                      </div>
                      {caseData.cases[selectedCase]?.amount && (
                        <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                          <span className="text-gray-400">Value:</span>
                          <span className="text-yellow-400">{caseData.cases[selectedCase]?.amount}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Testimonial */}
                  {caseData.cases[selectedCase]?.testimonial && (
                    <div>
                      <h4 className="text-lg text-yellow-400 mb-3">Client Testimonial</h4>
                      <div className="glass-card p-6 rounded-lg">
                        <Quote className="w-8 h-8 text-yellow-400 mb-4" />
                        <p className="text-gray-300 italic mb-4 leading-relaxed">
                          "{caseData.cases[selectedCase]?.testimonial?.quote}"
                        </p>
                        <div className="flex items-center">
                          <div>
                            <div className="text-white font-medium">
                              {caseData.cases[selectedCase]?.testimonial?.client}
                            </div>
                            {caseData.cases[selectedCase]?.testimonial?.position && (
                              <div className="text-gray-400 text-sm">
                                {caseData.cases[selectedCase]?.testimonial?.position}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center mt-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}