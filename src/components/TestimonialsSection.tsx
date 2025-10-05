'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { getTestimonials } from '../data/cms'
import { useState, useEffect } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function TestimonialsSection() {
  const testimonialData = getTestimonials()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialData.reviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonialData.reviews.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialData.reviews.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialData.reviews.length) % testimonialData.reviews.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating quote symbols */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/5"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              rotate: [0, 360],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <Quote className="w-12 h-12" />
          </motion.div>
        ))}

        {/* Animated background patterns */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 border border-yellow-400/10 rounded-full animate-pulse"></div>
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
            {testimonialData.title}
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
            {testimonialData.subtitle}
          </motion.p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <div className="relative overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialData.reviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="glass-card p-12 border-white/10 max-w-4xl mx-auto text-center">
                    {/* Quote Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-yellow-400 mb-8 flex justify-center"
                    >
                      <Quote className="w-16 h-16" />
                    </motion.div>

                    {/* Quote Text */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-2xl md:text-3xl text-white leading-relaxed mb-8 italic"
                    >
                      "{review.quote}"
                    </motion.p>

                    {/* Rating Stars */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      className="flex justify-center mb-8"
                    >
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, rotate: -180 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                        >
                          <Star className="w-6 h-6 text-yellow-400 fill-current mx-1" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Author Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                      {/* Avatar */}
                      <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center text-yellow-400 text-2xl">
                        {review.author.charAt(0)}
                      </div>
                      
                      {/* Author Details */}
                      <div className="text-center sm:text-left">
                        <div className="text-xl text-white font-medium">{review.author}</div>
                        <div className="text-yellow-400">{review.position}</div>
                        <div className="text-gray-400">{review.company}</div>
                      </div>
                    </motion.div>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-card p-3 rounded-full text-white hover:text-yellow-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-card p-3 rounded-full text-white hover:text-yellow-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Testimonial Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-3 mb-16"
        >
          {testimonialData.reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl text-white text-center mb-12">Client Reviews</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialData.reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="glass-card p-6 border-white/10 hover:border-yellow-500/50 transition-all duration-500 h-full">
                  {/* Mini Quote */}
                  <Quote className="w-8 h-8 text-yellow-400 mb-4" />
                  
                  {/* Review Text */}
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                    "{review.quote}"
                  </p>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-yellow-400">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{review.author}</div>
                      <div className="text-gray-400 text-xs">{review.position}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass-card p-8 rounded-3xl max-w-4xl mx-auto">
            <h4 className="text-2xl text-white mb-6">Trusted by Leading Organizations</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {[
                'Fortune 500 Companies',
                'Emerging Startups',
                'Non-Profit Organizations',
                'Individual Clients'
              ].map((client, index) => (
                <motion.div
                  key={client}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-gray-300 text-sm"
                >
                  {client}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}