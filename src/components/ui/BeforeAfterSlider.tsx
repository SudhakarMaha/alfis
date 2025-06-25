import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeftRight } from 'lucide-react'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  className?: string
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ 
  beforeImage, 
  afterImage, 
  className = '' 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg cursor-ew-resize select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="After"
        className="w-full h-full object-cover"
        draggable={false}
      />
      
      {/* Before Image (Overlay) */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
          style={{ width: `${(100 / sliderPosition) * 100}%` }}
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 h-full w-1 bg-white shadow-lg cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <ArrowLeftRight size={16} className="text-gray-600" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
        BEFORE
      </div>
      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
        AFTER
      </div>
    </div>
  )
}

export default BeforeAfterSlider