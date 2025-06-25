import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { XCircle, RefreshCw, ArrowLeft } from 'lucide-react'

const PaymentFailure: React.FC = () => {
  const navigate = useNavigate()

  const handleRetry = () => {
    navigate('/checkout')
  }

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
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <XCircle size={48} className="text-red-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Failed</h1>
          <p className="text-gray-600 text-lg mb-8">
            We encountered an issue processing your payment. Don't worry, your order hasn't been charged.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Common reasons for payment failure:</h3>
            <ul className="text-left space-y-2 text-gray-600 max-w-md mx-auto">
              <li>• Insufficient balance in your account</li>
              <li>• Network connectivity issues</li>
              <li>• Incorrect payment details</li>
              <li>• Card issuer declined the transaction</li>
              <li>• Payment gateway timeout</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={handleRetry}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <RefreshCw size={20} />
              <span>Retry Payment</span>
            </button>
            <Link
              to="/cart"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Back to Cart</span>
            </Link>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you continue to experience issues, please contact our support team.
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

export default PaymentFailure