'use client'

import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-purple-900 text-white py-24 mb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-800/90" />
          <Image
            src="/images/hero-fashion.jpg"
            alt="Fashion Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Luxeflow</h1>
            <p className="text-xl md:text-2xl text-purple-100">
              Crafting exceptional fashion experiences through innovation and style
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Our Story Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="flex-1 h-px bg-purple-200"></div>
              <h2 className="text-3xl font-bold text-gray-800 px-6">Our Story</h2>
              <div className="flex-1 h-px bg-purple-200"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="prose prose-purple max-w-none">
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  Welcome to Luxeflow, your premier destination for high-quality fashion and accessories.
                  Our journey began with a simple vision: to create an online shopping experience that combines
                  elegance with convenience, offering carefully curated collections for the modern shopper.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  What sets us apart is our commitment to quality, style, and customer satisfaction. Each product
                  in our collection is thoughtfully selected to ensure it meets our high standards of excellence,
                  from casual wear to luxury accessories.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="flex-1 h-px bg-purple-200"></div>
              <h2 className="text-3xl font-bold text-gray-800 px-6">Our Mission</h2>
              <div className="flex-1 h-px bg-purple-200"></div>
            </div>
            <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-lg p-12 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="quotes" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <text x="0" y="15" className="text-white" fontSize="20">"</text>
                  </pattern>
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#quotes)" />
                </svg>
              </div>
              <p className="text-white text-2xl md:text-3xl text-center italic leading-relaxed relative z-10">
                "To provide a seamless and enjoyable shopping experience while delivering
                premium quality products that enhance our customers' lifestyle."
              </p>
            </div>
          </div>

          {/* Technology Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="flex-1 h-px bg-purple-200"></div>
              <h2 className="text-3xl font-bold text-gray-800 px-6">Built with Modern Technology</h2>
              <div className="flex-1 h-px bg-purple-200"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Next.js', icon: '/icons/nextjs.svg' },
                { name: 'TypeScript', icon: '/icons/typescript.svg' },
                { name: 'MongoDB', icon: '/icons/mongodb.svg' },
                { name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      fill
                      sizes="80px"
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                  <p className="text-center font-medium text-gray-700">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div>
            <div className="flex items-center mb-8">
              <div className="flex-1 h-px bg-purple-200"></div>
              <h2 className="text-3xl font-bold text-gray-800 px-6">Connect With Us</h2>
              <div className="flex-1 h-px bg-purple-200"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <p className="text-gray-600 text-lg text-center mb-8">
                Follow us on social media to stay updated with the latest trends, collections,
                and exclusive offers. We'd love to hear from you!
              </p>
              <div className="flex justify-center space-x-10">
                {[
                  { name: 'Facebook', href: 'https://facebook.com', icon: '/icons/facebook.svg' },
                  { name: 'Twitter', href: 'https://twitter.com', icon: '/icons/twitter.svg' },
                  { name: 'Instagram', href: 'https://instagram.com', icon: '/icons/instagram.svg' },
                  { name: 'LinkedIn', href: 'https://linkedin.com', icon: '/icons/linkedin.svg' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="group relative"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="absolute inset-0 bg-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Image
                        src={social.icon}
                        alt={social.name}
                        fill
                        sizes="48px"
                        className="object-contain p-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    </div>
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 