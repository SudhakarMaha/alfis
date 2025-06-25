import React from 'react'
import { motion } from 'framer-motion'

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bol text-gray-800 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: January 15, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Personal information (name, email, phone number)</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Order history and preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Provide customer support</li>
                <li>Improve our products and services</li>
                <li>Send promotional emails (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Payment processors for transaction processing</li>
                <li>Shipping companies for order delivery</li>
                <li>Legal requirements or to protect our rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookies</h2>
              <p className="text-gray-600 mb-4">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can choose to disable cookies through your browser settings, but this may affect site functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
              <div className="text-gray-600">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul className="list-none mt-4 space-y-2">
                  <li>Email: privacy@alfisbeauty.com</li>
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

export default PrivacyPolicy