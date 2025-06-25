import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Package, 
  LogOut,
  BarChart3,
  ShoppingCart,
  FileText
} from 'lucide-react'
import { RootState } from '../../store/store'
import { logout } from '../../store/slices/adminSlice'

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, orders, totalSales, totalRevenue, monthlyRevenue } = useSelector(
    (state: RootState) => state.admin
  )
  const products = useSelector((state: RootState) => state.products.products)

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  const stats = [
    {
      title: 'Total Sales',
      value: totalSales.toString(),
      icon: <ShoppingBag size={24} />,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <DollarSign size={24} />,
      color: 'bg-green-500',
    },
    {
      title: 'Products',
      value: products.length.toString(),
      icon: <Package size={24} />,
      color: 'bg-purple-500',
    },
    {
      title: 'Customers',
      value: '1,234',
      icon: <Users size={24} />,
      color: 'bg-orange-500',
    },
  ]

  const quickActions = [
    {
      title: 'Manage Orders',
      description: 'View and update order status',
      icon: <ShoppingCart size={24} />,
      link: '/admin/orders',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Products',
      description: 'Add, edit, or remove products',
      icon: <Package size={24} />,
      link: '/admin/products',
      color: 'bg-green-500'
    },
    {
      title: 'Analytics',
      description: 'View detailed reports',
      icon: <BarChart3 size={24} />,
      link: '#',
      color: 'bg-purple-500'
    },
    {
      title: 'Reports',
      description: 'Generate sales reports',
      icon: <FileText size={24} />,
      link: '#',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link
                  to={action.link}
                  className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className={`${action.color} p-3 rounded-lg text-white w-fit mb-4`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h3>
            <div className="space-y-3">
              {monthlyRevenue.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-gray-600">{month.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(month.revenue / 60000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">₹{month.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
              <Link
                to="/admin/orders"
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">#{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard