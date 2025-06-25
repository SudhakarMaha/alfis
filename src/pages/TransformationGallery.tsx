import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Star } from 'lucide-react'
import { RootState } from '../store/store'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'
import MarqueeText from '../components/ui/MarqueeText'

const defaultTransformations = [
  {
    id: 1,
    beforeImage: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg?auto=compress&cs=tinysrgb&w=400',
    customerName: 'Priya Sharma',
    product: 'Alfis Instant Glowing Face Cream',
    days: 7,
    testimonial: 'Amazing results in just 7 days! My skin looks so much brighter and healthier.',
  },
  {
    id: 2,
    beforeImage: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
    customerName: 'Anita Patel',
    product: 'Alfis Anti Acne Face Wash',
    days: 14,
    testimonial: 'The acne face wash completely cleared my skin. Highly recommend!',
  },
  {
    id: 3,
    beforeImage: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg?auto=compress&cs=tinysrgb&w=400',
    customerName: 'Kavya Nair',
    product: 'Alfis Red Wine Face Wash',
    days: 10,
    testimonial: 'The red wine face wash gave me the glow I always wanted!',
  },
  {
    id: 4,
    beforeImage: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
    customerName: 'Meera Singh',
    product: 'Alfis Instant Glowing Face Cream',
    days: 5,
    testimonial: 'Incredible transformation! My friends keep asking what I\'m using.',
  },
  {
    id: 5,
    beforeImage: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg?auto=compress&cs=tinysrgb&w=400',
    customerName: 'Riya Gupta',
    product: 'Alfis Anti Acne Face Wash',
    days: 12,
    testimonial: 'Finally found a product that works! My acne is completely gone.',
  },
  {
    id: 6,
    beforeImage: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
    customerName: 'Sneha Reddy',
    product: 'Alfis Red Wine Face Wash',
    days: 8,
    testimonial: 'The glow is real! I feel so confident now.',
  },
]

const TransformationGallery: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  return (
    <div className={`transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
    }`}>
      {/* Guarantee Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-green-600 to-green-800 text-white py-2"
      >
        <MarqueeText text="🌟 Real Results from Real Customers - 7 Days Guarantee - 100% Natural Products 🌟" />
      </motion.div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              See the Transformation
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Witness the incredible results our customers have achieved with Alfis Beauty products.
              Real customers, real results with our 7 Days Guarantee.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-800 mx-auto mt-4"></div>
          </motion.div>

          {/* Transformation Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {defaultTransformations.map((transformation, index) => (
              <motion.div
                key={transformation.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-lg shadow-lg overflow-hidden ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                {/* Before/After Slider */}
                <div className="relative h-64">
                  <BeforeAfterSlider
                    beforeImage={transformation.beforeImage}
                    afterImage={transformation.afterImage}
                    className="h-full"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className={`text-sm ml-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      5.0
                    </span>
                  </div>
                  
                  <h3 className={`font-semibold mb-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {transformation.customerName}
                  </h3>
                  <p className="text-sm text-green-600 mb-2">{transformation.product}</p>
                  <p className={`text-xs mb-3 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Results in {transformation.days} days
                  </p>
                  
                  <blockquote className={`text-sm italic ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    "{transformation.testimonial}"
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Another Guarantee Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 mt-12 rounded-lg"
          >
            <MarqueeText text="✨ 7 Days Guarantee ✨ Transform Your Skin ✨ 100% Cash Back ✨ Natural Ingredients ✨" />
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-lg p-6 mt-12 ${
              isDarkMode ? 'bg-gray-800' : 'bg-blue-50'
            }`}
          >
            <h3 className={`text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              How to Use the Before/After Slider
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {[
                'Hover over any transformation image above',
                'Click and drag the slider handle left or right',
                'See the amazing before and after results instantly!'
              ].map((instruction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-2"
                >
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {instruction}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <h2 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Ready for Your Transformation?
            </h2>
            <p className={`mb-8 max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of satisfied customers who have transformed their skin with Alfis Beauty products.
              Start your 7-day challenge today with our money-back guarantee!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
              >
                View Products
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TransformationGallery