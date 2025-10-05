'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Calendar, Clock, ArrowRight, BookOpen, User } from 'lucide-react'
import { getBlog } from '../data/cms'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useState } from 'react'

export function BlogSection() {
  const blogData = getBlog()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [...new Set(blogData.posts.map(post => post.category))]
  
  const filteredPosts = selectedCategory === 'all' 
    ? blogData.posts 
    : blogData.posts.filter(post => post.category === selectedCategory)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section id="blog" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating book/document icons */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-400/5"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              rotate: [0, 180, 360],
              y: [0, -30, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <BookOpen className="w-8 h-8" />
          </motion.div>
        ))}

        {/* Background patterns */}
        <div className="absolute top-32 right-16 w-40 h-40 border border-yellow-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-16 w-32 h-32 border border-blue-400/10 rounded-full animate-pulse"></div>
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
            {blogData.title}
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
            {blogData.subtitle}
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
          <Button
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className={`rounded-full px-6 py-2 transition-all duration-300 ${
              selectedCategory === 'all' 
                ? 'bg-yellow-500 text-black hover:bg-yellow-600' 
                : 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10'
            }`}
          >
            All Articles
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-yellow-500 text-black hover:bg-yellow-600' 
                  : 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Featured Article */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-3xl text-white text-center mb-12">Featured Article</h3>
            <Card className="glass-card border-white/10 overflow-hidden hover:border-yellow-500/50 transition-all duration-700 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative overflow-hidden lg:order-1">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXd5ZXIlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTk2MjkwODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover min-h-[400px] transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent lg:from-transparent lg:to-black/50"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 glass-card px-4 py-2 rounded-full">
                    <span className="text-yellow-400 text-sm">{filteredPosts[0].category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-10 lg:p-12 flex flex-col justify-center lg:order-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-3xl text-white mb-6 leading-tight">
                      {filteredPosts[0].title}
                    </h4>
                    
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                      {filteredPosts[0].excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-400">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {filteredPosts[0].author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(filteredPosts[0].date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {filteredPosts[0].readTime} min read
                      </div>
                    </div>

                    {/* Read More Button */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center text-yellow-400 hover:text-yellow-300 cursor-pointer transition-colors duration-300"
                    >
                      <span className="mr-2">Read Full Article</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Recent Articles Grid */}
        {filteredPosts.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl text-white text-center mb-12">Recent Articles</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="cursor-pointer group"
                >
                  <Card className="glass-card border-white/10 hover:border-yellow-500/50 transition-all duration-500 h-full overflow-hidden">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXd5ZXIlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTk2MjkwODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 glass-card px-3 py-1 rounded-full">
                        <span className="text-yellow-400 text-xs">{post.category}</span>
                      </div>

                      {/* Read Time */}
                      <div className="absolute bottom-4 left-4 flex items-center text-white text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime} min
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h5 className="text-xl text-white mb-3 group-hover:text-yellow-400 transition-colors duration-500 leading-tight">
                        {post.title}
                      </h5>
                      
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(post.date)}
                        </div>
                      </div>

                      {/* Read More */}
                      <motion.div
                        className="flex items-center text-yellow-400 text-sm group-hover:text-yellow-300 transition-colors duration-300"
                        whileHover={{ x: 3 }}
                      >
                        <span className="mr-2">Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-10 rounded-3xl max-w-3xl mx-auto">
            <BookOpen className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h4 className="text-3xl text-white mb-6">Stay Informed</h4>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Subscribe to receive the latest legal insights, industry updates, and analysis directly to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 glass-card border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors duration-300"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-3 rounded-full transition-all duration-500">
                  Subscribe
                </Button>
              </motion.div>
            </div>
            
            <p className="text-gray-500 text-sm mt-4">
              No spam, unsubscribe at any time
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}