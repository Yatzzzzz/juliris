"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, User } from "lucide-react"
import { CartDrawer } from "./cart-drawer"
import { useCart } from "./cart-context"
import { SearchOverlay } from "./search-overlay"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { setIsOpen, itemCount } = useCart()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 transition-all duration-300">
      <nav 
        className={`max-w-7xl mx-auto px-6 rounded-[2rem] boty-transition border bg-white/70 backdrop-blur-xl ${
          scrolled 
            ? "py-2 bg-white/90 border-primary/10 boty-shadow" 
            : "py-1 bg-white/60 border-white/40"
        }`} 
        style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 10px 40px' }}
      >
        <div className="flex items-center justify-between h-[60px]">
          {/* Mobile menu button - On the Right for RTL */}
          <button
            type="button"
            className="lg:hidden p-2.5 text-foreground/80 hover:text-foreground boty-transition rounded-full hover:bg-black/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="hidden lg:flex items-center gap-8" dir="rtl">
            <Link
              href="/shop"
              className="font-sans-custom text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground boty-transition"
            >
              חנות
            </Link>
            <Link
              href="/shop?category=necklaces"
              className="font-sans-custom text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground boty-transition"
            >
              קולקציות
            </Link>
            <Link
              href="/#about"
              className="font-sans-custom text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground boty-transition"
            >
              אודות
            </Link>
            <Link
              href="/#faq"
              className="font-sans-custom text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground boty-transition"
            >
              שאלות נפוצות
            </Link>
          </div>

          {/* Logo - Centered */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif-custom text-2xl md:text-3xl tracking-wider text-foreground">Juliris</h1>
          </Link>

          {/* Right Actions - On the Left for RTL */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-foreground/70 hover:text-foreground boty-transition rounded-full hover:bg-black/5"
              aria-label="חיפוש"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 text-foreground/70 hover:text-foreground boty-transition rounded-full hover:bg-black/5 flex items-center gap-2"
              aria-label="סל"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full animate-in zoom-in duration-300">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="font-sans-custom text-sm hidden md:inline font-medium">סל</span>
            </button>
          </div>
        </div>

        <CartDrawer />

        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden boty-transition transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-[400px] opacity-100 pb-8 pt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-6 items-center text-center py-4" dir="rtl">
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="font-sans-custom text-lg font-medium text-foreground/80 hover:text-foreground boty-transition"
            >
              חנות
            </Link>
            <Link
              href="/shop?category=necklaces"
              onClick={() => setIsMenuOpen(false)}
              className="font-sans-custom text-lg font-medium text-foreground/80 hover:text-foreground boty-transition"
            >
              קולקציות
            </Link>
            <Link
              href="/#about"
              onClick={() => setIsMenuOpen(false)}
              className="font-sans-custom text-lg font-medium text-foreground/80 hover:text-foreground boty-transition"
            >
              אודות
            </Link>
            <Link
              href="/#faq"
              onClick={() => setIsMenuOpen(false)}
              className="font-sans-custom text-lg font-medium text-foreground/80 hover:text-foreground boty-transition"
            >
              שאלות נפוצות
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
