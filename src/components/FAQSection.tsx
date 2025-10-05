'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Card } from './ui/card'
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react'
import { getFAQ } from '../data/cms'
import { useState } from 'react'

export function FAQSection() {
  const faqData = getFAQ()
  const [openItems, setOpenItems] = useState<number[]>([0]) // First item open by default
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [...new Set(faqData.questions.map(q => q.category))]
  
  const filteredQuestions = selectedCategory === 'all' 
    ? faqData.questions 
    : faqData.questions.filter(q => q.category === selectedCategory)

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  const isOpen = (index: number) => openItems.includes(index)

  return (
    <section className="py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Question mark symbols floating */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/5"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              delay: Math.random() * 6
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <HelpCircle className="w-10 h-10" />
          </motion.div>
        ))}

        {/* Background patterns */}
        <div className="absolute top-24 left-12 w-36 h-36 border border-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-24 right-12 w-44 h-44 border border-yellow-400/10 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
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
            {faqData.title}
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
            {faqData.subtitle}
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              selectedCategory === 'all' 
                ? 'bg-yellow-500 text-black' 
                : 'glass-card border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10'
            }`}
          >
            All Questions
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-yellow-500 text-black' 
                  : 'glass-card border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-6 mb-16"
        >
          {filteredQuestions.map((item, index) => (
            <motion.div
              key={`${selectedCategory}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="glass-card border-white/10 hover:border-yellow-500/30 transition-all duration-500 overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-8 text-left focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <motion.div
                        animate={{ rotate: isOpen(index) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-yellow-400 mt-1"
                      >
                        {isOpen(index) ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl text-white group-hover:text-yellow-400 transition-colors duration-300 mb-2">
                          {item.question}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="px-3 py-1 bg-gray-700/50 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8">
                        <div className="border-t border-white/10 pt-6">
                          <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="text-gray-300 leading-relaxed text-lg"
                          >
                            {item.answer}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact for More Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-10 rounded-3xl max-w-4xl mx-auto">
            <MessageCircle className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h4 className="text-3xl text-white mb-6">Still Have Questions?</h4>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              If you couldn't find the answer you were looking for, don't hesitate to reach out. 
              I'm here to provide personalized guidance for your specific legal situation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-10 py-4 rounded-full transition-all duration-500 shadow-lg"
              >
                Schedule a Consultation
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 px-10 py-4 rounded-full transition-all duration-500"
              >
                Send a Message
              </motion.button>
            </div>

            {/* Quick Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-yellow-400 text-sm mb-1">Response Time</div>
                <div className="text-white">Within 24 hours</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-sm mb-1">Consultation</div>
                <div className="text-white">Free 30-minute call</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-sm mb-1">Availability</div>
                <div className="text-white">Monday - Friday</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}