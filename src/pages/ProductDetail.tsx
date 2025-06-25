import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { RootState } from '../store/store'
import { addToCart } from '../store/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('description')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const product = useSelector((state: RootState) => 
    state.products.products.find(p => p.id === id)
  )
  
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const isInWishlist = wishlistItems.some(item => item.id === id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <button
          onClick={() => navigate('/products')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Back to Products
        </button>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    }))
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      }))
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/checkout')
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-green-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8/5 - 156 reviews)</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg">{product.description}</p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Truck size={16} className="text-green-600" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield size={16} className="text-green-600" />
                <span>100% Natural</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <RotateCcw size={16} className="text-green-600" />
                <span>Easy Returns</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={handleBuyNow}
                className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
              >
                Buy Now
              </button>
              
              <button
                onClick={handleWishlistToggle}
                className={`w-full border-2 py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  isInWishlist 
                    ? 'border-red-500 text-red-500 bg-red-50' 
                    : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                <span>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'ingredients', 'benefits', 'usage'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
              </div>
            )}
            
            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Ingredients</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'benefits' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'usage' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use</h3>
                <ol className="space-y-2">
                  {product.usage.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetail