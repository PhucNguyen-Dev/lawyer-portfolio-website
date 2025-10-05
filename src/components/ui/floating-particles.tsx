'use client'

import { motion } from 'motion/react'
import { useMemo } from 'react'

interface FloatingParticlesProps {
  count?: number
  className?: string
  color?: string
}

export function FloatingParticles({ 
  count = 30, 
  className = '',
  color = 'bg-yellow-400/10'
}: FloatingParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1
    }))
  }, [count])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${color}`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, particle.opacity, 0],
            scale: [0, 1.5, 0],
            y: [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}