/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // Add any other image hosts you're using in the same format
    ],
  },
  // Enable static exports for better performance
  output: 'standalone',
}

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
}
