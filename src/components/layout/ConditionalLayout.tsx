'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import Footer from '@/components/Footer'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Hide header and footer on auth pages
  const isAuthPage = pathname?.startsWith('/auth/login') || pathname?.startsWith('/auth/register')
  
  return (
    <>
      {!isAuthPage && <Header />}
      <main className="flex-1">{children}</main>
      {!isAuthPage && <Footer />}
    </>
  )
}




