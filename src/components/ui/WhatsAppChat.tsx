import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const WhatsAppChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  const handleSendMessage = () => {
    if (message.trim()) {
      const whatsappUrl = `https://wa.me/919791826802?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
      setMessage('')
      setIsOpen(false)
    }
  }

  const quickMessages = [
    "Hi! I'm interested in your products",
    "Can you tell me about the 7 days guarantee?",
    "I need help with my order",
    "What's the best product for acne?"
  ]

  return (
    <>
      {/* WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
        >
          <MessageCircle size={24} />
        </motion.button>
      </motion.div>

      {/* Chat Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: 400, y: 100 }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: 400, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-80 h-96 rounded-lg shadow-2xl overflow-hidden ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {/* Header */}
              <div className="bg-green-500 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-green-500 font-bold">A</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Alfis Beauty</h3>
                    <p className="text-xs opacity-90">Typically replies instantly</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-green-600 p-1 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Content */}
              <div className="p-4 h-64 overflow-y-auto">
                <div className="space-y-3">
                  {/* Welcome Message */}
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <div className={`p-3 rounded-lg max-w-xs ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <p className="text-sm">
                        Hi! 👋 Welcome to Alfis Beauty! How can I help you today?
                      </p>
                    </div>
                  </div>

                  {/* Quick Messages */}
                  <div className="space-y-2">
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Quick messages:
                    </p>
                    {quickMessages.map((msg, index) => (
                      <button
                        key={index}
                        onClick={() => setMessage(msg)}
                        className={`block w-full text-left p-2 rounded border text-sm transition-colors ${
                          isDarkMode 
                            ? 'border-gray-600 hover:bg-gray-700' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {msg}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className={`p-4 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className={`flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                    }`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default WhatsAppChat