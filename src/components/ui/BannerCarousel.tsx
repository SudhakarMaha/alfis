import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const banners = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg',
    title: '7 Days Challenge',
    subtitle: 'Transform Your Skin',
    description: 'Get instant glow with our premium face cream',
    cta: 'Shop Now',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
    title: 'Anti Acne Solution',
    subtitle: 'Natural Ingredients',
    description: 'Neem & Fenugreek face wash for clear skin',
    cta: 'Explore',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
    title: 'Red Wine Collection',
    subtitle: 'Anti-Aging Formula',
    description: 'Enhance skin health with antioxidants',
    cta: 'Discover',
  },
]

const BannerCarousel: React.FC = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-96 md:h-[500px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-white px-4"
                >
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h2>
                  <p className="text-xl md:text-2xl mb-2">{banner.subtitle}</p>
                  <p className="text-lg mb-8 max-w-md">{banner.description}</p>
                  <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all">
                    {banner.cta}
                  </button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BannerCarousel