import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  type: string
  description: string
  ingredients: string[]
  benefits: string[]
  usage: string[]
  inStock: boolean
}

interface ProductsState {
  products: Product[]
  filters: {
    category: string
    type: string
    priceRange: [number, number]
  }
}

const initialState: ProductsState = {
  products: [
    {
      id: '1',
      name: 'Alfis Instant Glowing Face Cream',
      price: 899,
      originalPrice: 1299,
      images: [
        'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg',
        'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
        'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
        'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'
      ],
      category: 'face-cream',
      type: 'moisturizer',
      description: '7 Days Challenge - 100% Cash Back Guarantee. Targets pimples, dark circles, acne, and pigmentation.',
      ingredients: ['Natural Extracts', 'Vitamin E', 'Hyaluronic Acid', 'Collagen'],
      benefits: ['Instant Glow', 'Reduces Pimples', 'Lightens Dark Circles', 'Anti-Aging'],
      usage: ['Apply on clean face', 'Gently massage in circular motion', 'Use twice daily'],
      inStock: true,
    },
    {
      id: '2',
      name: 'Alfis Anti Acne Face Wash (Neem, Fenugreek)',
      price: 549,
      originalPrice: 699,
      images: [
        'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
        'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg',
        'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'
      ],
      category: 'face-wash',
      type: 'cleanser',
      description: 'Anti Acne Face Wash with Neem, Fenugreek, Lemon, Calendula & Manjistha. Controls oil, prevents acne, soothes skin.',
      ingredients: ['Neem Leaf Extract', 'Fenugreek Seed Extract', 'Lemon Fruit Extract', 'Calendula Flower Extract', 'Manjistha Root Extract'],
      benefits: ['Controls Oil', 'Prevents Acne', 'Soothes Skin', 'Natural Ingredients'],
      usage: ['Wet face with lukewarm water', 'Apply small amount to fingertips', 'Massage gently for 60 seconds', 'Rinse thoroughly with cool water'],
      inStock: true,
    },
    {
      id: '3',
      name: 'Alfis Red Wine Face Wash',
      price: 649,
      originalPrice: 799,
      images: [
        'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
        'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
        'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg'
      ],
      category: 'face-wash',
      type: 'cleanser',
      description: 'Instant Glowing Red Wine Face Wash. Enhances skin health, promotes anti-aging, hydrates and nourishes.',
      ingredients: ['Red Wine Extract', 'Resveratrol', 'Antioxidants', 'Natural Cleansing Agents'],
      benefits: ['Enhances Skin Health', 'Promotes Anti Aging', 'Hydrates and Nourishes', 'Instant Glow'],
      usage: ['Apply on damp skin', 'Massage gently', 'Rinse with water', 'Use morning and evening'],
      inStock: true,
    },
  ],
  filters: {
    category: 'all',
    type: 'all',
    priceRange: [0, 2000],
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})

export const { setFilters } = productsSlice.actions
export default productsSlice.reducer