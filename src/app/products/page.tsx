'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'
import { FaSearch, FaFilter, FaHeart, FaRegHeart } from 'react-icons/fa'

type Product = {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  badge?: string
}

type Category = {
  name: string
  count: number
}

// Sample products data
const sampleProducts: Product[] = [
  // Men's Products
  {
    _id: 'm1',
    name: 'Classic Casual Shirt',
    description: 'Premium cotton casual shirt for everyday style',
    price: 49.99,
    image: '/images/mens-casual-shirt-1.jpg',
    category: 'Men',
    stock: 15,
    badge: 'New'
  },
  {
    _id: 'm2',
    name: 'Leather Jacket',
    description: 'Classic leather jacket for a timeless look',
    price: 199.99,
    image: '/images/mens-jacket-1.jpg',
    category: 'Men',
    stock: 7,
    badge: 'Hot'
  },
  {
    _id: 'm3',
    name: 'Premium Watch',
    description: 'Elegant timepiece for the modern gentleman',
    price: 299.99,
    image: '/images/mens-watch-1.jpg',
    category: 'Men',
    stock: 5,
    badge: 'Premium'
  },
  {
    _id: 'm4',
    name: 'Running Shoes',
    description: 'High-performance running shoes for athletes',
    price: 89.99,
    image: '/images/mens-shoes-1.jpg',
    category: 'Men',
    stock: 20
  },
  {
    _id: 'm5',
    name: 'Business Suit',
    description: 'Tailored suit for professional occasions',
    price: 399.99,
    image: '/images/mens-suit-1.jpg',
    category: 'Men',
    stock: 8,
    badge: 'Premium'
  },
  {
    _id: 'm6',
    name: 'Denim Jeans',
    description: 'Classic fit denim jeans',
    price: 79.99,
    image: '/images/mens-jeans-1.jpg',
    category: 'Men',
    stock: 25
  },
  {
    _id: 'm7',
    name: 'Polo Shirt',
    description: 'Comfortable polo shirt for casual wear',
    price: 39.99,
    image: '/images/mens-polo-1.jpg',
    category: 'Men',
    stock: 30
  },
  {
    _id: 'm8',
    name: 'Winter Coat',
    description: 'Warm winter coat with modern design',
    price: 149.99,
    image: '/images/mens-jacket-2.jpg',
    category: 'Men',
    stock: 12,
    badge: 'New Season'
  },
  {
    _id: 'm9',
    name: 'Sports Jersey',
    description: 'Professional sports jersey',
    price: 69.99,
    image: '/images/mens-casual-shirt-2.jpg',
    category: 'Men',
    stock: 15
  },
  {
    _id: 'm10',
    name: 'Dress Shoes',
    description: 'Classic leather dress shoes',
    price: 129.99,
    image: '/images/mens-shoes-2.jpg',
    category: 'Men',
    stock: 10,
    badge: 'Premium'
  },
  {
    _id: 'm11',
    name: 'Casual Blazer',
    description: 'Versatile blazer for any occasion',
    price: 159.99,
    image: '/images/mens-jacket-3.jpg',
    category: 'Men',
    stock: 8
  },
  {
    _id: 'm12',
    name: 'Summer Shorts',
    description: 'Comfortable summer shorts',
    price: 34.99,
    image: '/images/mens-shorts-1.jpg',
    category: 'Men',
    stock: 20
  },
  {
    _id: 'm13',
    name: 'Wool Sweater',
    description: 'Warm wool sweater for winter',
    price: 89.99,
    image: '/images/mens-sweater-1.jpg',
    category: 'Men',
    stock: 15,
    badge: 'Warm'
  },
  {
    _id: 'm14',
    name: 'Track Pants',
    description: 'Athletic track pants for sports',
    price: 49.99,
    image: '/images/mens-track-pants-1.jpg',
    category: 'Men',
    stock: 25
  },
  {
    _id: 'm15',
    name: 'Formal Vest',
    description: 'Classic formal vest for suits',
    price: 79.99,
    image: '/images/mens-suit-2.jpg',
    category: 'Men',
    stock: 10
  },

  // Women's Products
  {
    _id: 'w1',
    name: 'Designer Dress',
    description: 'Elegant evening dress for special occasions',
    price: 159.99,
    image: '/images/womens-dress-1.jpg',
    category: 'Women',
    stock: 12,
    badge: 'New Arrival'
  },
  {
    _id: 'w2',
    name: 'Designer Handbag',
    description: 'Elegant leather handbag with modern design',
    price: 129.99,
    image: '/images/womens-bag-1.jpg',
    category: 'Women',
    stock: 8,
    badge: 'Best Seller'
  },
  {
    _id: 'w3',
    name: 'High Heels',
    description: 'Classic high heels for formal occasions',
    price: 89.99,
    image: '/images/womens-shoes-1.jpg',
    category: 'Women',
    stock: 15
  },
  {
    _id: 'w4',
    name: 'Summer Dress',
    description: 'Light and breezy summer dress',
    price: 79.99,
    image: '/images/womens-dress-2.jpg',
    category: 'Women',
    stock: 20,
    badge: 'Summer'
  },
  {
    _id: 'w5',
    name: 'Leather Boots',
    description: 'Stylish leather boots for winter',
    price: 149.99,
    image: '/images/womens-shoes-2.jpg',
    category: 'Women',
    stock: 10,
    badge: 'Winter'
  },
  {
    _id: 'w6',
    name: 'Casual Blouse',
    description: 'Comfortable blouse for everyday wear',
    price: 44.99,
    image: '/images/womens-blouse-1.jpg',
    category: 'Women',
    stock: 25
  },
  {
    _id: 'w7',
    name: 'Designer Skirt',
    description: 'Fashionable skirt with modern cut',
    price: 69.99,
    image: '/images/womens-skirt-1.jpg',
    category: 'Women',
    stock: 15,
    badge: 'Trending'
  },
  {
    _id: 'w8',
    name: 'Winter Coat',
    description: 'Warm and stylish winter coat',
    price: 199.99,
    image: '/images/womens-jacket-1.jpg',
    category: 'Women',
    stock: 8,
    badge: 'Premium'
  },
  {
    _id: 'w9',
    name: 'Yoga Pants',
    description: 'Comfortable yoga pants for exercise',
    price: 49.99,
    image: '/images/womens-yoga-pants-1.jpg',
    category: 'Women',
    stock: 30
  },
  {
    _id: 'w10',
    name: 'Casual Sneakers',
    description: 'Comfortable sneakers for daily use',
    price: 79.99,
    image: '/images/womens-shoes-3.jpg',
    category: 'Women',
    stock: 20
  },
  {
    _id: 'w11',
    name: 'Evening Gown',
    description: 'Elegant gown for formal events',
    price: 299.99,
    image: '/images/womens-dress-2.jpg',
    category: 'Women',
    stock: 5,
    badge: 'Luxury'
  },
  {
    _id: 'w12',
    name: 'Summer Hat',
    description: 'Stylish summer hat for beach days',
    price: 34.99,
    image: '/images/womens-hat-1.jpg',
    category: 'Women',
    stock: 25
  },
  {
    _id: 'w13',
    name: 'Denim Jacket',
    description: 'Classic denim jacket for any season',
    price: 89.99,
    image: '/images/womens-jacket-2.jpg',
    category: 'Women',
    stock: 15
  },
  {
    _id: 'w15',
    name: 'Business Suit',
    description: 'Professional women\'s business suit',
    price: 249.99,
    image: '/images/womens-suit-1.jpg',
    category: 'Women',
    stock: 10,
    badge: 'Professional'
  },

  // Accessories
  {
    _id: 'a1',
    name: 'Luxury Watch',
    description: 'Premium timepiece with sophisticated style',
    price: 299.99,
    image: '/images/watch-luxury-1.jpg',
    category: 'Accessories',
    stock: 5,
    badge: 'Premium'
  },
  {
    _id: 'a2',
    name: 'Designer Sunglasses',
    description: 'Premium sunglasses with UV protection',
    price: 89.99,
    image: '/images/sunglasses-1.jpg',
    category: 'Accessories',
    stock: 20
  },
  {
    _id: 'a3',
    name: 'Leather Belt',
    description: 'Premium leather belt with classic design',
    price: 39.99,
    image: '/images/belt-1.jpg',
    category: 'Accessories',
    stock: 25
  },
  {
    _id: 'a4',
    name: 'Diamond Necklace',
    description: 'Elegant diamond necklace',
    price: 499.99,
    image: '/images/jewelry-1.jpg',
    category: 'Accessories',
    stock: 5,
    badge: 'Luxury'
  },
  {
    _id: 'a5',
    name: 'Silk Tie',
    description: 'Classic silk tie for formal wear',
    price: 29.99,
    image: '/images/tie-1.jpg',
    category: 'Accessories',
    stock: 30
  },
  {
    _id: 'a6',
    name: 'Gold Bracelet',
    description: 'Elegant gold bracelet design',
    price: 199.99,
    image: '/images/jewelry-2.jpg',
    category: 'Accessories',
    stock: 8,
    badge: 'Premium'
  },
  {
    _id: 'a7',
    name: 'Leather Wallet',
    description: 'Classic leather wallet with card slots',
    price: 49.99,
    image: '/images/wallet-1.jpg',
    category: 'Accessories',
    stock: 25
  },
  {
    _id: 'a8',
    name: 'Pearl Earrings',
    description: 'Classic pearl earrings',
    price: 79.99,
    image: '/images/jewelry-3.jpg',
    category: 'Accessories',
    stock: 15
  },
  {
    _id: 'a10',
    name: 'Silver Ring',
    description: 'Sterling silver ring with design',
    price: 89.99,
    image: '/images/jewelry-4.jpg',
    category: 'Accessories',
    stock: 12
  },
  {
    _id: 'a11',
    name: 'Leather Gloves',
    description: 'Premium leather gloves for winter',
    price: 44.99,
    image: '/images/gloves-1.jpg',
    category: 'Accessories',
    stock: 15,
    badge: 'Winter'
  },
  {
    _id: 'a12',
    name: 'Designer Watch',
    description: 'Luxury designer watch collection',
    price: 399.99,
    image: '/images/watch-luxury-2.jpg',
    category: 'Accessories',
    stock: 5,
    badge: 'Luxury'
  },
  {
    _id: 'a13',
    name: 'Bow Tie',
    description: 'Classic bow tie for formal events',
    price: 24.99,
    image: '/images/tie-1.jpg',
    category: 'Accessories',
    stock: 30
  },
  {
    _id: 'a14',
    name: 'Diamond Ring',
    description: 'Elegant diamond ring design',
    price: 599.99,
    image: '/images/jewelry-2.jpg',
    category: 'Accessories',
    stock: 3,
    badge: 'Premium'
  },
  {
    _id: 'a15',
    name: 'Travel Bag',
    description: 'Stylish travel bag for accessories',
    price: 69.99,
    image: '/images/womens-bag-3.jpg',
    category: 'Accessories',
    stock: 15
  }
];

const sampleCategories: Category[] = [
  { name: 'All', count: sampleProducts.length },
  { name: 'Men', count: sampleProducts.filter(p => p.category === 'Men').length },
  { name: 'Women', count: sampleProducts.filter(p => p.category === 'Women').length },
  { name: 'Accessories', count: sampleProducts.filter(p => p.category === 'Accessories').length },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [categories] = useState<Category[]>(sampleCategories)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
  const { addItem } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize search state from URL parameters
  useEffect(() => {
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    setSearchQuery(query)
    setSelectedCategory(category)
    filterProducts(query, category)
  }, [searchParams])

  const filterProducts = (query: string, category: string) => {
    let filtered = [...sampleProducts]
    
    // Apply category filter
    if (category) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    // Apply search query filter
    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
      filtered = filtered.filter(product => {
        const searchableText = `${product.name} ${product.description} ${product.category}`.toLowerCase()
        return searchTerms.every(term => searchableText.includes(term))
      })
    }
    
    setProducts(filtered)
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    const trimmedQuery = searchQuery.trim()
    
    if (trimmedQuery) {
      params.set('q', trimmedQuery)
    } else {
      params.delete('q')
    }
    
    router.push(`/products?${params.toString()}`)
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setSearchQuery(newQuery)
    
    // Optional: Implement debounced live search
    // if (newQuery.trim() === '') {
    //   const params = new URLSearchParams(searchParams.toString())
    //   params.delete('q')
    //   router.push(`/products?${params.toString()}`)
    // }
  }

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'All') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    // Preserve search query when changing category
    const currentQuery = searchParams.get('q')
    if (currentQuery) {
      params.set('q', currentQuery)
    }
    router.push(`/products?${params.toString()}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="w-full md:w-64 space-y-6 md:sticky md:top-24">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <FaFilter className="mr-2 text-purple-600" /> Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    (category.name === 'All' ? !selectedCategory : selectedCategory.toLowerCase() === category.name.toLowerCase())
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                      {category.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Search bar */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 sticky top-24 z-10">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search by name, description, or category..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <FaSearch className="text-sm" />
                  <span>Search</span>
                </button>
              </div>
              {searchQuery && products.length === 0 && (
                <p className="text-sm text-gray-500">
                  No products found matching "{searchQuery}"{selectedCategory ? ` in ${selectedCategory}` : ''}
                </p>
              )}
            </form>
          </div>

          {/* Products grid */}
          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <div className="relative h-72 overflow-hidden bg-gray-200">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                      <button
                        onClick={() => toggleFavorite(product._id)}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-900 hover:text-purple-600 transition-colors"
                      >
                        {favorites.includes(product._id) ? (
                          <FaHeart className="text-purple-600" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Price</span>
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      </div>
                      <button
                        onClick={() => addItem({
                          id: product._id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity: 1
                        })}
                        disabled={product.stock === 0}
                        className={`${
                          product.stock === 0
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 transform hover:scale-105'
                        } text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2`}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 