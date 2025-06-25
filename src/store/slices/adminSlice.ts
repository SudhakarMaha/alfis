import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  products: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed'
  createdAt: string
}

interface AdminState {
  isAuthenticated: boolean
  orders: Order[]
  totalSales: number
  totalRevenue: number
  monthlyRevenue: Array<{
    month: string
    revenue: number
  }>
}

const initialState: AdminState = {
  isAuthenticated: false,
  orders: [
    {
      id: '1001',
      customerName: 'Priya Sharma',
      customerEmail: 'priya@example.com',
      customerPhone: '+91 98765 43210',
      products: [
        { id: '1', name: 'Alfis Instant Glowing Face Cream', quantity: 2, price: 899 }
      ],
      total: 1798,
      status: 'pending',
      paymentStatus: 'paid',
      createdAt: '2025-01-15T10:30:00Z'
    },
    {
      id: '1002',
      customerName: 'Anita Patel',
      customerEmail: 'anita@example.com',
      customerPhone: '+91 87654 32109',
      products: [
        { id: '2', name: 'Alfis Anti Acne Face Wash', quantity: 1, price: 549 }
      ],
      total: 549,
      status: 'processing',
      paymentStatus: 'paid',
      createdAt: '2025-01-14T15:45:00Z'
    },
    {
      id: '1003',
      customerName: 'Kavya Nair',
      customerEmail: 'kavya@example.com',
      customerPhone: '+91 76543 21098',
      products: [
        { id: '3', name: 'Alfis Red Wine Face Wash', quantity: 1, price: 649 }
      ],
      total: 649,
      status: 'delivered',
      paymentStatus: 'paid',
      createdAt: '2025-01-13T09:20:00Z'
    }
  ],
  totalSales: 3,
  totalRevenue: 2996,
  monthlyRevenue: [
    { month: 'Jan', revenue: 25000 },
    { month: 'Feb', revenue: 32000 },
    { month: 'Mar', revenue: 28000 },
    { month: 'Apr', revenue: 45000 },
    { month: 'May', revenue: 38000 },
    { month: 'Jun', revenue: 52000 },
  ],
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      if (action.payload.username === 'admin' && action.payload.password === 'alfis123') {
        state.isAuthenticated = true
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload)
      state.totalSales += 1
      state.totalRevenue += action.payload.total
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
      const order = state.orders.find(order => order.id === action.payload.orderId)
      if (order) {
        order.status = action.payload.status
      }
    },
  },
})

export const { login, logout, addOrder, updateOrderStatus } = adminSlice.actions
export default adminSlice.reducer