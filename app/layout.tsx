import React from "react"
import type { Metadata, Viewport } from 'next'
import { heebo, libreFranklin, montserrat } from "./fonts"
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/boty/cart-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Juliris — תכשיטים היפואלרגניים',
  description: 'תכשיטים היפואלרגניים לנשים עם עור רגיש. עגילים, טבעות, שרשראות וצמידים בעיצוב אלגנטי.',
  generator: 'Next.js',
  keywords: ['תכשיטים', 'היפואלרגני', 'עגילים', 'טבעות', 'שרשראות', 'צמידים', 'סטיינלס סטיל', 'עור רגיש', 'Juliris'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F4EF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} ${libreFranklin.variable} ${montserrat.variable} font-sans antialiased text-right`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
