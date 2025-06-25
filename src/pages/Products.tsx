import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import { RootState } from '../store/store'
import { setFilters } from '../store/slices/productsSlice'
import ProductCard from '../components/ui/ProductCard'
import MarqueeText from '../components/ui/MarqueeText'

const Products: React.FC = () => {
  const dispatch = useDispatch()
  const { products, filters } = useSelector((state: RootState) => state.products)
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'face-cream', label: 'Face Cream' },
    { value: 'face-wash', label: 'Face Wash' },
  ]

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'moisturizer', label: 'Moisturizer' },
    { value: 'cleanser', label: 'Cleanser' },
  ]

  const priceRanges = [
    { value: [0, 2000], label: 'All Prices' },
    { value: [0, 500], label: 'Under ₹500' },
    { value: [500, 1000], label: '₹500 - ₹1000' },
    { value: [1000, 2000], label: 'Above ₹1000' },
  ]

  const filteredProducts = products.filter(product => {
    const categoryMatch = filters.category === 'all' || product.category === filters.category
    const typeMatch = filters.type === 'all' || product.type === filters.type
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    return categoryMatch && typeMatch && priceMatch
  })

  return (
    <div className={`transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Guarantee Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-green-600 to-green-800 text-white py-2"
      >
        <MarqueeText 
          text="🌟 7 Days Guarantee - Premium Skincare Products - 100% Natural Ingredients 🌟" 
          speed={40}
        />
      </motion.div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>
            </div>

            {/* Filters Sidebar */}
            <div className={`
              fixed inset-0 z-50 lg:relative lg:w-64 lg:bg-transparent
              ${isFilterOpen ? 'block' : 'hidden lg:block'}
              ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
            `}>
              <div className="p-4 lg:p-0">
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h3 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Filters
                  </h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className={`p-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h4 className={`font-semibold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Category
                    </h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category.value} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value={category.value}
                            checked={filters.category === category.value}
                            onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
                            className="mr-2 text-green-600"
                          />
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {category.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <h4 className={`font-semibold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Type
                    </h4>
                    <div className="space-y-2">
                      {types.map(type => (
                        <label key={type.value} className="flex items-center">
                          <input
                            type="radio"
                            name="type"
                            value={type.value}
                            checked={filters.type === type.value}
                            onChange={(e) => dispatch(setFilters({ type: e.target.value }))}
                            className="mr-2 text-green-600"
                          />
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {type.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h4 className={`font-semibold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Price Range
                    </h4>
                    <div className="space-y-2">
                      {priceRanges.map((range, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="radio"
                            name="priceRange"
                            checked={
                              filters.priceRange[0] === range.value[0] &&
                              filters.priceRange[1] === range.value[1]
                            }
                            onChange={() => dispatch(setFilters({ priceRange: range.value as [number, number] }))}
                            className="mr-2 text-green-600"
                          />
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {range.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Products ({filteredProducts.length})
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className={`text-lg ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    No products found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  )
}

export default Products