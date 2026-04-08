'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface CardProps {
  title: string
  description: string
  image?: string
  link?: string
  footer?: React.ReactNode
  className?: string
}

export function Card({ title, description, image, link, footer, className = '' }: CardProps) {
  const [imageError, setImageError] = useState(false)

  const content = (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {image && (
        <div className="relative h-48 w-full bg-gray-200">
          {!imageError ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              <span>Image not available</span>
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  )

  if (link) {
    return (
      <Link href={link} className="block hover:shadow-lg transition-shadow duration-300">
        {content}
      </Link>
    )
  }

  return content
} 