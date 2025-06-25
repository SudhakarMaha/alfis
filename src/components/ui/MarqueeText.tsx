import React from 'react'
import { motion } from 'framer-motion'

interface MarqueeTextProps {
  text: string
  className?: string
  speed?: number
}

const MarqueeText: React.FC<MarqueeTextProps> = ({ 
  text, 
  className = '', 
  speed = 60 
}) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{
          x: ['100%', '-100%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span className="text-lg font-semibold px-8">{text}</span>
        <span className="text-lg font-semibold px-8">{text}</span>
        <span className="text-lg font-semibold px-8">{text}</span>
        <span className="text-lg font-semibold px-8">{text}</span>
        <span className="text-lg font-semibold px-8">{text}</span>
      </motion.div>
    </div>
  )
}

export default MarqueeText