import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, Clock } from 'lucide-react'

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    // You could track analytics here
    console.log('Payment successful for order:', orderId)
  }, [orderId])

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle size={48} className="text-green-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 text-lg mb-2">Thank you for your order</p>
          {orderId && (
            <p className="text-sm text-gray-500 mb-8">Order ID: #{orderId}</p>
          )}

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What happens next?</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package size={16} className="text-blue-600" />
                </div>
                <span className="text-gray-700">Order confirmation sent to your email</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock size={16} className="text-yellow-600" />
                </div>
                <span className="text-gray-700">Processing your order (1-2 business days)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck size={16} className="text-green-600" />
                </div>
                <span className="text-gray-700">Shipped and delivered (3-5 business days)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about your order, please contact our support team.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Email: support@alfisbeauty.com</p>
              <p>Phone: +91 97918 26802</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentSuccess