'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/Button'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa'
import Image from 'next/image'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const contactInfo = [
  {
    icon: FaEnvelope,
    title: 'Email Us',
    content: 'contact@luxeflow.com',
    description: "We'll get back to you within 24 hours",
    link: 'mailto:contact@luxeflow.com'
  },
  {
    icon: FaPhone,
    title: 'Call Us',
    content: '+1 (555) 123-4567',
    description: 'Mon-Fri from 9am to 6pm',
    link: 'tel:+15551234567'
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Visit Us',
    content: '123 Main St, City, Country',
    description: 'Open Monday to Friday',
    link: 'https://maps.google.com/?q=123+Main+St'
  },
  {
    icon: FaClock,
    title: 'Business Hours',
    content: 'Mon - Fri: 9AM - 6PM',
    description: 'Weekend: Closed'
  }
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      toast.success('Message sent successfully!')
      reset()
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16 overflow-hidden">
        {/* Animated Floating Purple Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-purple-700/50" />
          
          {/* Floating circles */}
          <div className="absolute top-20 left-10 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          
          {/* Swimming animated blobs */}
          <div className="absolute top-10 left-1/3 w-48 h-48 bg-purple-400/30 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s', animationDirection: 'alternate' }}></div>
          <div className="absolute bottom-10 right-1/3 w-44 h-44 bg-purple-500/30 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '8s', animationDirection: 'alternate', animationDelay: '1s' }}></div>
          
          {/* Wave-like swimming effect */}
          <style jsx>{`
            @keyframes swim {
              0%, 100% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0.3;
              }
              25% {
                transform: translateY(-30px) translateX(20px) scale(1.1);
                opacity: 0.4;
              }
              50% {
                transform: translateY(-20px) translateX(-15px) scale(0.9);
                opacity: 0.35;
              }
              75% {
                transform: translateY(-40px) translateX(10px) scale(1.05);
                opacity: 0.4;
              }
            }
            .swimming-blob {
              animation: swim 8s ease-in-out infinite;
            }
            .swimming-blob-2 {
              animation: swim 10s ease-in-out infinite;
              animation-delay: 2s;
            }
            .swimming-blob-3 {
              animation: swim 12s ease-in-out infinite;
              animation-delay: 4s;
            }
          `}</style>
          
          <div className="swimming-blob absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/25 rounded-full blur-3xl"></div>
          <div className="swimming-blob-2 absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-400/25 rounded-full blur-3xl"></div>
          <div className="swimming-blob-3 absolute top-1/2 left-1/2 w-56 h-56 bg-purple-600/25 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight drop-shadow-lg text-purple-500">
              Get in Touch
            </h1>
            <p className="text-base md:text-lg text-purple-300 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Have questions about our products or services? We're here to help and answer any questions you might have.
            </p>
          </div>
        </div>

        {/* Animated Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <style jsx>{`
            @keyframes wave {
              0% {
                d: path("M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z");
              }
              50% {
                d: path("M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,144C672,128,768,128,864,144C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z");
              }
              100% {
                d: path("M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z");
              }
            }
            .wave-path {
              animation: wave 10s ease-in-out infinite;
            }
          `}</style>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path 
              className="wave-path" 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="bg-white rounded-xl shadow-lg p-4 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
            >
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl w-10 h-10 flex items-center justify-center mb-3 transform rotate-3">
                <info.icon className="text-white w-5 h-5 transform -rotate-3" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1.5">{info.title}</h3>
              {info.link ? (
                <a
                  href={info.link}
                  className="text-purple-600 hover:text-purple-700 font-medium block mb-1 hover:underline"
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-gray-700 font-medium mb-1">{info.content}</p>
              )}
              <p className="text-gray-500 text-sm">{info.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Left Section */}
              <div className="md:col-span-2 bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Let's Start a Conversation</h3>
                <p className="text-purple-100 mb-6 text-sm">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FaEnvelope className="text-purple-300 mt-1" />
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-purple-100 text-sm">contact@luxeflow.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaPhone className="text-purple-300 mt-1" />
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-purple-100 text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-purple-300 mt-1" />
                    <div>
                      <h4 className="font-semibold">Location</h4>
                      <p className="text-purple-100 text-sm">123 Main St, City, Country</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Form */}
              <div className="md:col-span-3 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Send us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject')}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                      placeholder="What is this about?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-sm"
                      placeholder="Your message..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
                    disabled={isSubmitting}
                  >
                    <FaPaperPlane className={`${isSubmitting ? 'animate-pulse' : ''}`} />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 