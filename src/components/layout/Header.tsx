'use client';

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '@/context/CartContext'
import { FaShoppingCart, FaUser, FaTrash } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export function Header() {
  const { data: session } = useSession()
  const { items, removeItem } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCartPreview, setShowCartPreview] = useState(false)
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-purple-300 transition-all duration-300">
              Luxe
            </span>
            <span className="text-2xl font-light text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
              flow
            </span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { name: 'Products', href: '/products' },
              { name: 'About', href: '/about' },
              { name: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <div 
              className="relative"
              onMouseEnter={() => setShowCartPreview(true)}
              onMouseLeave={() => setShowCartPreview(false)}
            >
              <Link 
                href="/cart" 
                className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200 group"
              >
                <FaShoppingCart className="text-gray-600 group-hover:text-gray-900 transition-colors w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full transform group-hover:scale-110 transition-transform">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Cart Preview Dropdown */}
              {showCartPreview && items.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50 transform transition-all duration-200">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-3">Cart Items</h3>
                    <div className="space-y-3 max-h-60 overflow-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="rounded object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} × ${item.price}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-gray-900">Total</span>
                        <span className="text-sm font-semibold text-gray-900">
                          ${cartTotal.toFixed(2)}
                        </span>
                      </div>
                      <Link
                        href="/cart"
                        className="block w-full bg-purple-600 text-white text-center px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        View Cart
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu - Moved to the end */}
            <div className="border-l pl-6 border-gray-200">
              {session ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/profile" 
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                  >
                    <div className="relative w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <FaUser className="text-purple-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                      {session.user?.name}
                    </span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transform hover:translate-y-[-1px] transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transform hover:translate-y-[-1px] transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
} 