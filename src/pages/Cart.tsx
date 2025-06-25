import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { RootState } from '../store/store'
import { updateQuantity, removeFromCart } from '../store/slices/cartSlice'
import MarqueeText from '../components/ui/MarqueeText'

const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total } = useSelector((state: RootState) => state.cart)
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  if (items.length === 0) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <ShoppingBag size={64} className={`mx-auto mb-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <h2 className={`text-2xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Your cart is empty
            </h2>
            <p className={`mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Add some products to get started
            </p>
            <Link
              to="/products"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Guarantee Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2"
      >
        <MarqueeText 
          text="✨ 7 Days Guarantee ✨ Free Shipping ✨ Secure Checkout ✨ 100% Natural ✨" 
          speed={45}
        />
      </motion.div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          <h1 className={`text-3xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Shopping Cart
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border rounded-lg p-6 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {item.name}
                      </h3>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {item.category}
                      </p>
                      <p className="text-green-600 font-bold text-lg">₹{item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className={`p-1 rounded-full border transition-colors ${
                          isDarkMode 
                            ? 'border-gray-600 hover:bg-gray-700' 
                            : 'border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className={`p-1 rounded-full border transition-colors ${
                          isDarkMode 
                            ? 'border-gray-600 hover:bg-gray-700' 
                            : 'border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors mt-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-lg h-fit transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
              }`}
            >
              <h3 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{Math.round(total * 0.18)}</span>
                </div>
                <div className={`border-t pt-3 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-300'
                }`}>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{Math.round(total + (total * 0.18))}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Proceed to Checkout
              </button>
              
              <Link
                to="/products"
                className="block text-center text-green-600 hover:text-green-700 transition-colors mt-4"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart