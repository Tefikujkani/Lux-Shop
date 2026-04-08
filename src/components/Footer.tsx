'use client';

import Link from 'next/link'
import Image from 'next/image'
import { FaEnvelope } from 'react-icons/fa'

const footerLinks = {
  shop: [
    { name: "Men's Collection", href: '/products?category=Men' },
    { name: "Women's Collection", href: '/products?category=Women' },
    { name: 'Accessories', href: '/products?category=Accessories' },
    { name: 'New Arrivals', href: '/products' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  support: [
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Size Guide', href: '/size-guide' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#1877f2] hover:text-[#0d65d9] transition-colors">
          <path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-white hover:text-gray-300 transition-colors">
          <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 instagram-icon transition-colors">
          <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    }
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600"></div>

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-12 pb-10 border-b border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Stay in the Loop
              </h2>
              <p className="text-gray-400 mb-6">
                Subscribe to our newsletter for exclusive offers and the latest updates.
              </p>
              <form className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <input
                    type="email"
                    id="email-subscription"
                    name="email"
                    className="w-full bg-gray-800/50 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    placeholder="Your email address"
                  />
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transform hover:translate-y-[-1px] transition-all duration-300 shadow-sm hover:shadow-purple-500/20 hover:shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Shop Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-purple-400">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 block transform hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-purple-400">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 block transform hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-purple-400">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 block transform hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-purple-400">Connect</h3>
            <div className="flex flex-col space-y-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300`}
                >
                  <span className={`
                    ${social.name === 'Facebook' ? 'text-[#1877f2] hover:text-[#0d65d9]' : ''}
                    ${social.name === 'Twitter' ? 'text-white hover:text-gray-300' : ''}
                    ${social.name === 'Instagram' ? 'text-pink-500 hover:text-pink-600' : ''}
                  `}>
                    {social.icon}
                  </span>
                  <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-200">Luxe</span>
              <span className="text-2xl font-light text-gray-400">flow</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Luxeflow. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              {['Privacy', 'Terms', 'Sitemap'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 