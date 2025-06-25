import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Eye, 
  Edit,
  LogOut,
  Calendar,
  User,
  Package,
  CreditCard
} from 'lucide-react'
import { RootState } from '../../store/store'
import { updateOrderStatus, logout } from '../../store/slices/adminSlice'

const AdminOrders: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, orders } = useSelector((state: RootState) => state.admin)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/admin/login')
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    dispatch(updateOrderStatus({ 
      orderId, 
      status: newStatus as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    }))
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-orange-100 text-orange-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by customer name or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{order.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CreditCard size={14} />
                        <span>₹{order.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Order Details */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Customer Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Name:</span> {order.customerName}</p>
                      <p><span className="font-medium">Email:</span> {order.customerEmail}</p>
                      <p><span className="font-medium">Phone:</span> {order.customerPhone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {order.products.map((product, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Package size={14} className="text-gray-400" />
                            <span>{product.name}</span>
                          </div>
                          <span className="text-gray-600">
                            {product.quantity} × ₹{product.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                      order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-green-600 hover:text-green-800 transition-colors">
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrders