import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Menu, X, User, Moon, Sun } from 'lucide-react'
import { RootState } from '../../store/store'
import { toggleTheme } from '../../store/slices/themeSlice'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`shadow-lg sticky top-0 z-50 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Alfis Beauty
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Products', 'Transformation'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className={`transition-colors hover:text-green-600 ${
                    isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleThemeToggle}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'text-yellow-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="/wishlist"
                className={`relative p-2 transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'
                }`}
              >
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {wishlistItems.length}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="/cart"
                className={`relative p-2 transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'
                }`}
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/admin/login')}
              className={`p-2 transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              <User size={20} />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden py-4 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <nav className="flex flex-col space-y-4">
              {['Home', 'Products', 'Transformation'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className={`flex items-center justify-between pt-4 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleThemeToggle}
                    className={`p-2 rounded-full ${
                      isDarkMode ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <Link
                    to="/wishlist"
                    className={`flex items-center space-x-2 ${
                      isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart size={20} />
                    <span>Wishlist ({wishlistItems.length})</span>
                  </Link>
                  <Link
                    to="/cart"
                    className={`flex items-center space-x-2 ${
                      isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart size={20} />
                    <span>Cart ({cartItemCount})</span>
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header