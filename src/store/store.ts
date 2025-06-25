import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import wishlistReducer from './slices/wishlistSlice'
import productsReducer from './slices/productsSlice'
import adminReducer from './slices/adminSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productsReducer,
    admin: adminReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch