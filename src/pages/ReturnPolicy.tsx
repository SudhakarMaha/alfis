import React from 'react'
import { motion } from 'framer-motion'

const ReturnPolicy: React.FC = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Return Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: January 15, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Return Window</h2>
              <p className="text-gray-600 mb-4">
                We offer a 7-day return policy from the date of delivery. Items must be returned within this timeframe to be eligible for a refund or exchange.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Eligible Items</h2>
              <p className="text-gray-600 mb-4">To be eligible for a return, items must be:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Unopened and unused</li>
                <li>In original packaging with all labels intact</li>
                <li>Accompanied by the original receipt or proof of purchase</li>
                <li>Free from any damage not caused by defect</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Non-Returnable Items</h2>
              <p className="text-gray-600 mb-4">The following items cannot be returned:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Opened or used skincare products (for hygiene reasons)</li>
                <li>Items damaged by misuse or normal wear</li>
                <li>Products purchased with special discounts or promotional offers</li>
                <li>Items returned after the 7-day return window</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Return Process</h2>
              <p className="text-gray-600 mb-4">To initiate a return:</p>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Contact our customer service team at support@alfisbeauty.com</li>
                <li>Provide your order number and reason for return</li>
                <li>Receive return authorization and shipping instructions</li>
                <li>Package items securely and ship to our return address</li>
                <li>Track your return shipment</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Refund Processing</h2>
              <p className="text-gray-600 mb-4">
                Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within 5-7 business days to your original payment method.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Exchanges</h2>
              <p className="text-gray-600 mb-4">
                We only replace items if they are defective or damaged. If you need to exchange an item, contact us at support@alfisbeauty.com and send your item to our return address.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Shipping Costs</h2>
              <p className="text-gray-600 mb-4">
                Return shipping costs are the responsibility of the customer unless the item was defective or we made an error. We recommend using a trackable shipping service for returns.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. 100% Cash Back Guarantee</h2>
              <p className="text-gray-600 mb-4">
                For our Alfis Instant Glowing Face Cream, we offer a special 7-day challenge with 100% cash back guarantee. If you don't see visible results within 7 days of use, we'll provide a full refund.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Information</h2>
              <div className="text-gray-600">
                <p>For any questions about returns, please contact us:</p>
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

export default ReturnPolicy