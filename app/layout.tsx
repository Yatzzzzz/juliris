import React from "react"
import type { Metadata, Viewport } from "next"
import { Heebo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/components/boty/cart-context"
import "./globals.css"

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  weight: ["300", "400", "500", "700", "800"],
})

export const metadata: Metadata = {
  title: "Juliris | תכשיטים היפואלרגניים לעור רגיש",
  description:
    "Juliris היא חנות תכשיטים בעברית בלבד לקהל ישראלי, עם טבעות, עגילים, שרשראות, צמידים וסטיינלס סטיל בעיצוב אלגנטי ובדגש על נוחות לעור רגיש.",
  keywords: [
    "Juliris",
    "תכשיטים היפואלרגניים",
    "תכשיטים לעור רגיש",
    "עגילים",
    "טבעות",
    "שרשראות",
    "צמידים",
    "סטיינלס סטיל",
    "תכשיטים בישראל",
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#F7F4EF",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans antialiased bg-background text-foreground`}>
        <CartProvider>{children}</CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
