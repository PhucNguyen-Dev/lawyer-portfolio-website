'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Settings, Edit, Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import { cmsData, updateCMSData } from '../data/cms'
import { useState } from 'react'

export function CMSAdmin() {
  const [isVisible, setIsVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentData, setCurrentData] = useState(cmsData)

  if (!isVisible) {
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-50 glass-card p-4 rounded-full text-yellow-400 hover:bg-yellow-400/10 transition-all duration-300"
        title="Open CMS Admin"
      >
        <Settings className="w-6 h-6" />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-6 overflow-y-auto"
    >
      <Card className="glass-card max-w-6xl mx-auto border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <Settings className="w-8 h-8 text-yellow-400" />
            <div>
              <h2 className="text-2xl text-white">Content Management System</h2>
              <p className="text-gray-400">Edit website content easily</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setEditMode(!editMode)}
              variant={editMode ? "default" : "outline"}
              className={editMode ? "bg-yellow-500 text-black" : "border-yellow-500/50 text-yellow-400"}
            >
              {editMode ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {editMode ? 'Save Changes' : 'Edit Mode'}
            </Button>
            <Button
              onClick={() => setIsVisible(false)}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              {isVisible ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              Close
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="glass-card border-white/20 p-2">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="practice">Practice Areas</TabsTrigger>
              <TabsTrigger value="cases">Case Results</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card p-6 border-white/10">
                  <h3 className="text-white text-lg mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Name</label>
                      <Input
                        value={currentData.general.name}
                        readOnly={!editMode}
                        className="glass-card border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Title</label>
                      <Input
                        value={currentData.general.title}
                        readOnly={!editMode}
                        className="glass-card border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Tagline</label>
                      <Input
                        value={currentData.general.tagline}
                        readOnly={!editMode}
                        className="glass-card border-white/20 text-white"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="glass-card p-6 border-white/10">
                  <h3 className="text-white text-lg mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Phone</label>
                      <Input
                        value={currentData.general.phone}
                        readOnly={!editMode}
                        className="glass-card border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Email</label>
                      <Input
                        value={currentData.general.email}
                        readOnly={!editMode}
                        className="glass-card border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Location</label>
                      <Input
                        value={currentData.general.location}
                        readOnly={!editMode}
                        className="glass-card border-white/20 text-white"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Hero Section */}
            <TabsContent value="hero" className="space-y-6">
              <Card className="glass-card p-6 border-white/10">
                <h3 className="text-white text-lg mb-4">Hero Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Subtitle</label>
                    <Input
                      value={currentData.hero.subtitle}
                      readOnly={!editMode}
                      className="glass-card border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Main Title</label>
                    <Input
                      value={currentData.hero.mainTitle}
                      readOnly={!editMode}
                      className="glass-card border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Description</label>
                    <Textarea
                      value={currentData.hero.description}
                      readOnly={!editMode}
                      rows={4}
                      className="glass-card border-white/20 text-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">CTA Button Text</label>
                    <Input
                      value={currentData.hero.ctaText}
                      readOnly={!editMode}
                      className="glass-card border-white/20 text-white"
                    />
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6 border-white/10">
                <h3 className="text-white text-lg mb-4">Credentials</h3>
                <div className="space-y-2">
                  {currentData.hero.credentials.map((credential, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                        {credential}
                      </Badge>
                      {editMode && (
                        <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {editMode && (
                    <Button size="sm" variant="outline" className="border-green-500/50 text-green-400">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Credential
                    </Button>
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* About Section */}
            <TabsContent value="about" className="space-y-6">
              <Card className="glass-card p-6 border-white/10">
                <h3 className="text-white text-lg mb-4">About Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Title</label>
                    <Input
                      value={currentData.about.title}
                      readOnly={!editMode}
                      className="glass-card border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Subtitle</label>
                    <Input
                      value={currentData.about.subtitle}
                      readOnly={!editMode}
                      className="glass-card border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Description</label>
                    <Textarea
                      value={currentData.about.description}
                      readOnly={!editMode}
                      rows={4}
                      className="glass-card border-white/20 text-white resize-none"
                    />
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6 border-white/10">
                <h3 className="text-white text-lg mb-4">Statistics</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentData.about.stats.map((stat, index) => (
                    <div key={index} className="glass-card p-4 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 text-sm">{stat.label}</span>
                        {editMode && (
                          <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={stat.prefix || ''}
                          placeholder="Prefix"
                          readOnly={!editMode}
                          className="glass-card border-white/20 text-white w-16"
                        />
                        <Input
                          value={stat.number}
                          readOnly={!editMode}
                          className="glass-card border-white/20 text-white"
                        />
                        <Input
                          value={stat.suffix || ''}
                          placeholder="Suffix"
                          readOnly={!editMode}
                          className="glass-card border-white/20 text-white w-16"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {editMode && (
                  <Button className="mt-4 border-green-500/50 text-green-400" size="sm" variant="outline">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Statistic
                  </Button>
                )}
              </Card>
            </TabsContent>

            {/* Practice Areas */}
            <TabsContent value="practice" className="space-y-6">
              <Card className="glass-card p-6 border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg">Practice Areas</h3>
                  {editMode && (
                    <Button size="sm" variant="outline" className="border-green-500/50 text-green-400">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Area
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  {currentData.practiceAreas.areas.map((area, index) => (
                    <div key={index} className="glass-card p-4 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white">{area.title}</h4>
                        {editMode && (
                          <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-400 text-xs mb-1 block">Cases</label>
                          <Input
                            value={area.cases}
                            readOnly={!editMode}
                            className="glass-card border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 text-xs mb-1 block">Success Rate</label>
                          <Input
                            value={area.successRate}
                            readOnly={!editMode}
                            className="glass-card border-white/20 text-white"
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <label className="text-gray-400 text-xs mb-1 block">Description</label>
                        <Textarea
                          value={area.description}
                          readOnly={!editMode}
                          rows={2}
                          className="glass-card border-white/20 text-white resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Other tabs would follow similar patterns... */}
            <TabsContent value="cases">
              <Card className="glass-card p-6 border-white/10">
                <h3 className="text-white text-lg">Case Results Management</h3>
                <p className="text-gray-400 mt-2">Edit case studies, outcomes, and testimonials</p>
              </Card>
            </TabsContent>

            <TabsContent value="testimonials">
              <Card className="glass-card p-6 border-white/10">
                <h3 className="text-white text-lg">Testimonials Management</h3>
                <p className="text-gray-400 mt-2">Manage client reviews and testimonials</p>
              </Card>
            </TabsContent>

            <TabsContent value="blog">
              <Card className="glass-card p-6 border-white/10">
                <h3 className="text-white text-lg">Blog Management</h3>
                <p className="text-gray-400 mt-2">Create and edit blog posts and legal insights</p>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card className="glass-card p-6 border-white/10">
                <h3 className="text-white text-lg">FAQ Management</h3>
                <p className="text-gray-400 mt-2">Manage frequently asked questions</p>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card className="glass-card p-6 border-white/10">
                <h3 className="text-white text-lg">Contact Information</h3>
                <p className="text-gray-400 mt-2">Update contact details and office information</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </motion.div>
  )
}