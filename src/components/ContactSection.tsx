'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Calendar, Scale, Linkedin, Mail, MapPin, Phone, Clock, Shield, MessageSquare, Video, FileText, CheckCircle } from 'lucide-react'
import { getContact } from '../data/cms'
import { useState } from 'react'

export function ContactSection() {
  const contactData = getContact()
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    legalArea: '',
    message: '',
    urgency: 'normal',
    preferredContact: 'email'
  })

  const nextStep = () => setFormStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setFormStep(prev => Math.max(prev - 1, 1))

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Animated contact-related icons */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-400/5"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              rotate: [0, 360],
              scale: [1, 1.5, 1]
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
            {i % 4 === 0 ? <Mail className="w-8 h-8" /> :
             i % 4 === 1 ? <Phone className="w-8 h-8" /> :
             i % 4 === 2 ? <MessageSquare className="w-8 h-8" /> :
             <Calendar className="w-8 h-8" />}
          </motion.div>
        ))}

        {/* Background patterns */}
        <div className="absolute top-32 left-16 w-40 h-40 border border-yellow-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-56 h-56 border border-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-green-400/10 rounded-full animate-pulse"></div>
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
            {contactData.title}
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
            {contactData.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Enhanced Multi-step Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-10 border-white/10 rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl text-white">Request Consultation</h3>
                <div className="flex space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        step === formStep ? 'bg-yellow-400 scale-125' : 
                        step < formStep ? 'bg-green-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step Progress */}
              <div className="w-full bg-gray-700/50 rounded-full h-2 mb-8">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full"
                  initial={{ width: '33%' }}
                  animate={{ width: `${(formStep / 3) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <form className="space-y-6">
                {/* Step 1: Basic Information */}
                {formStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <p className="text-gray-300 mb-6">
                      Let's start with your basic information. All consultations are confidential.
                    </p>
                    
                    <div>
                      <label className="text-gray-300 mb-3 block">Full Name *</label>
                      <Input
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                        className="glass-card border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500 py-4"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-gray-300 mb-3 block">Email Address *</label>
                        <Input
                          type="email"
                          placeholder="your.email@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                          className="glass-card border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500 py-4"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 mb-3 block">Phone Number</label>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                          className="glass-card border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500 py-4"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-300 mb-3 block">Subject *</label>
                      <Input
                        placeholder="Brief subject of your legal matter"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({...prev, subject: e.target.value}))}
                        className="glass-card border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500 py-4"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Legal Matter Details */}
                {formStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <p className="text-gray-300 mb-6">
                      Help me understand your legal needs better.
                    </p>

                    <div>
                      <label className="text-gray-300 mb-3 block">Legal Area *</label>
                      <Select value={formData.legalArea} onValueChange={(value) => setFormData(prev => ({...prev, legalArea: value}))}>
                        <SelectTrigger className="glass-card border-white/20 text-white focus:border-yellow-500 py-4">
                          <SelectValue placeholder="Select legal area" />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-white/20">
                          {contactData.form.fields.find(f => f.name === 'legalArea')?.options?.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-gray-300 mb-3 block">Urgency Level</label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { value: 'low', label: 'Normal', desc: 'Within a week', color: 'bg-green-500/20 border-green-500/50' },
                          { value: 'medium', label: 'Urgent', desc: 'Within 24-48 hours', color: 'bg-yellow-500/20 border-yellow-500/50' },
                          { value: 'high', label: 'Emergency', desc: 'Immediate attention', color: 'bg-red-500/20 border-red-500/50' }
                        ].map((level) => (
                          <button
                            key={level.value}
                            type="button"
                            onClick={() => setFormData(prev => ({...prev, urgency: level.value}))}
                            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                              formData.urgency === level.value ? level.color : 'glass-card border-white/20'
                            }`}
                          >
                            <div className="text-white font-medium">{level.label}</div>
                            <div className="text-gray-400 text-sm">{level.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-300 mb-3 block">Preferred Contact Method</label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { value: 'email', label: 'Email', icon: Mail },
                          { value: 'phone', label: 'Phone Call', icon: Phone }
                        ].map((method) => (
                          <button
                            key={method.value}
                            type="button"
                            onClick={() => setFormData(prev => ({...prev, preferredContact: method.value}))}
                            className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                              formData.preferredContact === method.value 
                                ? 'bg-yellow-500/20 border-yellow-500/50' 
                                : 'glass-card border-white/20'
                            }`}
                          >
                            <method.icon className="w-5 h-5 text-yellow-400" />
                            <span className="text-white">{method.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Message */}
                {formStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <p className="text-gray-300 mb-6">
                      Please provide details about your legal matter.
                    </p>

                    <div>
                      <label className="text-gray-300 mb-3 block">Case Details *</label>
                      <Textarea
                        placeholder="Please describe your legal matter in detail. Include relevant dates, parties involved, any urgent deadlines, and specific outcomes you're seeking..."
                        rows={8}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                        className="glass-card border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500 resize-none"
                      />
                    </div>

                    {/* Consultation Options */}
                    <div className="glass-card p-6 rounded-xl border-blue-500/30">
                      <h4 className="text-white mb-4 flex items-center">
                        <Video className="w-5 h-5 mr-2 text-blue-400" />
                        {contactData.consultation.title}
                      </h4>
                      <p className="text-gray-300 text-sm mb-3">
                        {contactData.consultation.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Duration: {contactData.consultation.duration}</span>
                        <span className="text-green-400 font-medium">{contactData.consultation.price}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  {formStep > 1 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="border-gray-500 text-gray-300 hover:bg-gray-700"
                    >
                      Previous
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {formStep < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-4">
                          <Calendar className="w-5 h-5 mr-2" />
                          Schedule Consultation
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm text-center">
                  * Required fields. Response within 24 hours guaranteed.
                </p>
              </form>
            </Card>
          </motion.div>

          {/* Enhanced Contact Info & Office Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-3xl text-white mb-6">Direct Contact</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {contactData.office.phone} • {contactData.office.email}
              </p>
              
              {/* Quick Contact Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.a
                  href={`tel:${contactData.office.phone}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card p-4 rounded-xl flex items-center justify-center space-x-2 text-green-400 hover:bg-green-400/10 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </motion.a>
                <motion.a
                  href={`mailto:${contactData.office.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card p-4 rounded-xl flex items-center justify-center space-x-2 text-blue-400 hover:bg-blue-400/10 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </motion.a>
              </div>

              {/* Emergency notice */}
              <div className="glass-card border-yellow-500/30 p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 text-sm">Emergency Legal Matters: Call directly for immediate assistance</span>
                </div>
              </div>
            </div>

            {/* Office Information */}
            <div className="glass-card p-8 rounded-3xl">
              <h4 className="text-2xl text-white mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-yellow-400" />
                Office Location
              </h4>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Address</p>
                  <p className="text-white whitespace-pre-line">{contactData.office.address}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm mb-1">Office Hours</p>
                  <div className="space-y-1">
                    {contactData.office.hours.map((hour, index) => (
                      <p key={index} className="text-white text-sm">{hour}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="glass-card h-48 rounded-xl flex items-center justify-center text-gray-400 mb-4">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">Manhattan Financial District</p>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>

            {/* Professional Network */}
            <div className="glass-card p-8 rounded-3xl">
              <h4 className="text-white text-xl mb-6">Professional Network</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Scale, label: 'State Bar Profile', href: '#' },
                  { icon: Linkedin, label: 'LinkedIn', href: '#' },
                  { icon: FileText, label: 'Legal Directory', href: '#' },
                  { icon: Shield, label: 'Certifications', href: '#' }
                ].map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-card p-4 rounded-xl flex flex-col items-center text-center text-white hover:border-yellow-400/50 transition-all duration-500 group"
                  >
                    <link.icon className="w-8 h-8 mb-2 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-20 pt-12 text-center"
        >
          <div className="glass-card p-10 rounded-3xl max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Scale className="w-10 h-10 text-yellow-400 mr-4" />
              <div>
                <h3 className="text-3xl text-white">Sarah Mitchell, Esq.</h3>
                <p className="text-gray-400">Attorney at Law</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h5 className="text-white mb-3">Licensed In</h5>
                <p className="text-gray-300 text-sm">New York & New Jersey</p>
              </div>
              <div>
                <h5 className="text-white mb-3">Education</h5>
                <p className="text-gray-300 text-sm">Harvard Law School</p>
              </div>
              <div>
                <h5 className="text-white mb-3">Experience</h5>
                <p className="text-gray-300 text-sm">15+ Years</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-6">
              <span>Bar #: NY-987654</span>
              <span>•</span>
              <span>Bar #: NJ-123456</span>
              <span>•</span>
              <span>ABA Member</span>
              <span>•</span>
              <span>Pro Bono Society</span>
            </div>
            
            <p className="text-gray-400 text-sm">
              © 2025 Sarah Mitchell Law. All rights reserved. Attorney advertising. 
              Prior results do not guarantee a similar outcome.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}