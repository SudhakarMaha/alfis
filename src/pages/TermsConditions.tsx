import React from 'react'
import { motion } from 'framer-motion'

const TermsConditions: React.FC = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: January 15, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using the Alfis Beauty website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Product Information</h2>
              <p className="text-gray-600 mb-4">
                We strive to provide accurate product information on our website. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. All products are subject to availability, and we reserve the right to discontinue any product at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Orders and Payment</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>All orders are subject to our acceptance and product availability</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Payment must be completed before order processing</li>
                <li>We accept various payment methods including PhonePe and Cash on Delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Shipping and Delivery</h2>
              <p className="text-gray-600 mb-4">
                We offer free shipping on all orders above ₹500. Delivery times are estimates and may vary based on location and availability. We are not responsible for delays caused by weather, customs, or other factors beyond our control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Returns and Refunds</h2>
              <p className="text-gray-600 mb-4">
                We offer a 7-day return policy for unopened products. Products must be returned in their original condition and packaging. Please refer to our Return Policy for detailed information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                Alfis Beauty shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Information</h2>
              <div className="text-gray-600">
                <p>If you have any questions about these Terms & Conditions, please contact us:</p>
                <ul className="list-none mt-4 space-y-2">
                  <li>Email: support@alfisbeauty.com</li>
                  <li>Phone: +91 97918 26802</li>
                  <li>Address: Kinathukadavu - 642109</li>
                </ul>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsConditions