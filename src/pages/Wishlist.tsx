import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import { RootState } from '../store/store'
import { removeFromWishlist } from '../store/slices/wishlistSlice'
import { addToCart } from '../store/slices/cartSlice'

const Wishlist: React.FC = () => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

  const handleRemoveFromWishlist = (id: string) => {
    dispatch(removeFromWishlist(id))
  }

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item))
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save your favorite products here</p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
          >
            Explore Products
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-gray-800 mb-2 hover:text-green-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-green-600 font-bold text-lg mb-4">₹{item.price}</p>
                </Link>
                
                <div className="space-y-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="w-full border border-red-500 text-red-500 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Heart size={16} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist