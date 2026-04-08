'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import dynamic from 'next/dynamic'

const SplineViewer = dynamic(() => import('@/components/SplineViewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/20 rounded-xl animate-pulse" />
})

const featuredProducts = [
  {
    id: '1',
    name: 'Classic Casual Shirt',
    price: 49.99,
    image: '/images/mens-casual-shirt-1.jpg',
    description: 'Premium cotton casual shirt for everyday style',
    badge: 'New Arrival',
    category: 'Men'
  },
  {
    id: '2',
    name: 'Designer Handbag',
    price: 129.99,
    image: '/images/womens-bag-1.jpg',
    description: 'Elegant leather handbag with modern design',
    badge: 'Best Seller',
    category: 'Women'
  },
  {
    id: '3',
    name: 'Luxury Watch',
    price: 299.99,
    image: '/images/watch-luxury-1.jpg',
    description: 'Premium timepiece with sophisticated style',
    badge: 'Premium',
    category: 'Accessories'
  },
  {
    id: '4',
    name: 'Designer Dress',
    price: 159.99,
    image: '/images/womens-dress-1.jpg',
    description: 'Elegant evening dress for special occasions',
    badge: 'Featured',
    category: 'Women'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[90vh] mb-16 overflow-hidden bg-black">
        {/* Update gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>

        {/* Content */}
        <div className="absolute inset-0 container mx-auto px-4 flex items-center pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-4"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
              >
                New Collection 2024
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white"
              >
                Elevate Your Style
                <span className="block mt-2 text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300">
                  With Luxeflow
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-xl mb-6 text-gray-200 max-w-xl"
              >
                Discover our curated collection of premium fashion pieces designed for those who appreciate sophisticated style and exceptional quality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex gap-4 items-center mb-6"
              >
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 hover:shadow-lg text-lg font-semibold"
                >
                  Shop Collection
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors text-lg font-semibold"
                >
                  Learn More
                  <FaArrowRight className="text-sm" />
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="grid grid-cols-3 gap-8 mt-8 max-w-lg"
              >
                {[
                  { number: '2K+', label: 'Products' },
                  { number: '8K+', label: 'Customers' },
                  { number: '4.9', label: 'Rating' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-purple-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Spline Viewer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="hidden lg:block h-[600px] relative bg-black/40 rounded-xl backdrop-blur-sm"
            >
              <SplineViewer />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Featured Products</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
        </div>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={item}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <div className="relative h-80 overflow-hidden bg-gray-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    className="transform group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">Image not available</div>'
                      }
                    }}
                  />
                </div>
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  {product.badge && (
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge}
                    </span>
                  )}
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Price</span>
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  </div>
                  <button
                    onClick={() => addItem({ ...product, quantity: 1 })}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Shop by Category</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Men', image: '/images/category-men.jpg', description: 'Timeless pieces for the modern man' },
            { name: 'Women', image: '/images/category-women.jpg', description: 'Curated styles for every occasion' },
            { name: 'Accessories', image: '/images/category-accessories.jpg', description: 'Complete your look' },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.name.toLowerCase()}`}
              className="group relative h-[400px] rounded-xl overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="transform group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">Image not available</div>'
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-3xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                  <span className="inline-block text-purple-400 border-b-2 border-purple-400 pb-1">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-24 mb-24">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Stay in Touch</h2>
          <p className="text-xl mb-8 text-purple-100">Subscribe to receive updates about new products and special offers</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button className="bg-black text-white px-8 py-4 rounded-r-lg hover:bg-gray-900 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 