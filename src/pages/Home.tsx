import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Star, Shield, Truck, Clock } from 'lucide-react'
import { RootState } from '../store/store'
import BannerCarousel from '../components/ui/BannerCarousel'
import VideoSection from '../components/ui/VideoSection'
import ProductCard from '../components/ui/ProductCard'
import MarqueeText from '../components/ui/MarqueeText'

const Home: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products)
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
  const featuredProducts = products.slice(0, 3)

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: '100% Natural',
      description: 'All products made with natural ingredients',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: '7 Days Guarantee',
      description: 'See visible results in just 7 days',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Free Delivery',
      description: 'Free shipping on orders above ₹500',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Customer support available round the clock',
    },
  ]

  return (
    <div className={`transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
    }`}>
      {/* Marquee Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-green-600 to-green-800 text-white py-2"
      >
        <MarqueeText text="🌟 7 Days Guarantee - Transform Your Skin or Get 100% Money Back! 🌟" />
      </motion.div>

      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`py-16 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Why Choose Alfis Beauty?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-800 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 300 }
                }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-r from-green-100 to-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 group-hover:shadow-lg"
                >
                  {feature.icon}
                </motion.div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {feature.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 7 Days Guarantee Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3"
      >
        <MarqueeText text="✨ 7 Days Guarantee ✨ 100% Cash Back ✨ Natural Ingredients ✨ Instant Results ✨" />
      </motion.div>

      {/* Video Section */}
      <VideoSection
        title="See the Science Behind Our Products"
        description="Discover how our natural ingredients work together to transform your skin in just 7 days"
        videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
      />

      {/* Another Guarantee Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gradient-to-r from-green-600 to-green-800 text-white py-3"
      >
        <MarqueeText text="🎯 7 Days Challenge 🎯 Visible Results Guaranteed 🎯 Premium Skincare 🎯 Transform Your Skin 🎯" />
      </motion.div>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`py-16 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Featured Products
            </h2>
            <p className={`max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover our premium skincare collection designed to give you instant glow and long-lasting results
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-800 mx-auto mt-4"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/products"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all inline-block transform hover:scale-105"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Final Guarantee Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3"
      >
        <MarqueeText text="🔥 Limited Time Offer 🔥 7 Days Guarantee 🔥 Free Shipping 🔥 Premium Quality 🔥" />
      </motion.div>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Transform Your Skin?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Join thousands of satisfied customers who have experienced the Alfis Beauty difference with our 7 Days Guarantee
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/products"
                className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/transformation"
                className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                See Transformations
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home