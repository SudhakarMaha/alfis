import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'
import { RootState } from '../../store/store'

const Footer: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`transition-colors duration-300 ${
        isDarkMode ? 'bg-black text-white' : 'bg-gray-900 text-white'
      }`}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-xl font-bold">Alfis Beauty</span>
            </div>
            <p className="text-gray-400 mb-4">
              Premium skincare solutions for your natural beauty. Transform your skin in just 7 days.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Products', path: '/products' },
                { name: 'Transformation', path: '/transformation' },
                { name: 'Cart', path: '/cart' },
                { name: 'Wishlist', path: '/wishlist' }
              ].map((link, index) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              {[
                { name: 'Terms & Conditions', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Return Policy', path: '/returns' }
              ].map((link, index) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              {[
                { Icon: Phone, text: '+91 97918 26802' },
                { Icon: Mail, text: 'support@alfisbeauty.com' },
                { Icon: MapPin, text: 'Kinathukadavu - 642109' }
              ].map(({ Icon, text }, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2"
                >
                  <Icon size={16} />
                  <span className="text-gray-400">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`border-t mt-8 pt-8 text-center text-gray-400 ${
            isDarkMode ? 'border-gray-800' : 'border-gray-800'
          }`}
        >
          <p>&copy; 2025 Alfis Beauty. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer