'use client'

import { motion } from 'motion/react'
import { useState, useEffect } from 'react'

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ 
  text, 
  delay = 0, 
  speed = 50, 
  className = '',
  onComplete 
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!isStarted) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, isStarted, onComplete])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-1em bg-current ml-1"
      />
    </span>
  )
}