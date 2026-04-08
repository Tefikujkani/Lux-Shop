import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import { ConditionalLayout } from '@/components/layout/ConditionalLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Luxeflow',
  description: 'Your premier destination for luxury fashion and accessories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  )
} 