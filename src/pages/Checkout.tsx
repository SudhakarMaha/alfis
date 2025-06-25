import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Truck, Shield } from 'lucide-react'
import { RootState } from '../store/store'
import { clearCart } from '../store/slices/cartSlice'
import { addOrder } from '../store/slices/adminSlice'

const Checkout: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total } = useSelector((state: RootState) => state.cart)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'phonepe',
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const taxAmount = Math.round(total * 0.18)
  const finalTotal = total + taxAmount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const orderId = Date.now().toString()
      
      // Add order to admin store
      dispatch(addOrder({
        id: orderId,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        products: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: finalTotal,
        status: 'pending',
        paymentStatus: 'paid',
        createdAt: new Date().toISOString(),
      }))

      // Clear cart
      dispatch(clearCart())
      
      // Simulate success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1
      
      if (isSuccess) {
        navigate(`/payment-success?orderId=${orderId}`)
      } else {
        navigate('/payment-failure')
      }
    }, 3000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <Link
          to="/products"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="PIN Code"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="phonepe"
                      checked={formData.paymentMethod === 'phonepe'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <CreditCard className="mr-3 text-purple-600" size={20} />
                    <span className="font-medium">PhonePe</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <Truck className="mr-3 text-green-600" size={20} />
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                </div>
              </motion.div>
            </form>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 p-6 rounded-lg h-fit"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm">{item.name} × {item.quantity}</span>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
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
                <span>Tax (18%)</span>
                <span>₹{taxAmount}</span>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>
            </div>
            
            {/* Security Features */}
            <div className="space-y-2 mb-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-green-600" />
                <span>Secure encrypted payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck size={16} className="text-green-600" />
                <span>Free delivery on all orders</span>
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Pay ₹${finalTotal}`}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout