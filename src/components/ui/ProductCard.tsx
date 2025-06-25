import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import { Product } from '../../store/slices/productsSlice'
import { addToCart } from '../../store/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice'
import { RootState } from '../../store/store'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
  const isInWishlist = wishlistItems.some(item => item.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    }))
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
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

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-lg shadow-lg overflow-hidden group transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
              isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className={`font-semibold mb-2 line-clamp-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {product.name}
          </h3>
          <p className={`text-sm mb-3 line-clamp-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-green-600">₹{product.price}</span>
              {product.originalPrice && (
                <span className={`text-sm line-through ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4 space-y-2">
        <button
          onClick={handleAddToCart}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </button>
        <Link
          to={`/product/${product.id}`}
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center"
        >
          Buy Now
        </Link>
      </div>
    </motion.div>
  )
}

export default ProductCard