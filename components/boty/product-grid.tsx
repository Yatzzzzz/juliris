"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Heart } from "lucide-react"
import { useCart } from "./cart-context"
import { getProductsByCategory } from "@/lib/catalog"
import type { ProductListItem } from "@/types/catalog"
import { formatMoney } from "@/lib/pricing"

type CategorySlug = "rings" | "necklaces" | "earrings" | "bracelets"

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug>("rings")
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  // Reverted to 4 primary jewelry categories
  const categories: { value: CategorySlug; label: string }[] = [
    { value: "rings", label: "טבעות" },
    { value: "necklaces", label: "שרשראות" },
    { value: "earrings", label: "עגילים" },
    { value: "bracelets", label: "צמידים" },
  ]

  // Load products from catalog based on selected category
  const filteredProducts = useMemo(() => {
    return getProductsByCategory(selectedCategory).slice(0, 4)
  }, [selectedCategory])

  const handleCategoryChange = (category: CategorySlug) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedCategory(category)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 300)
    }
  }

  // Restored visibility logic (IntersectionObserver)
  useEffect(() => {
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) gridObserver.observe(gridRef.current)
    if (headerRef.current) headerObserver.observe(headerRef.current)

    return () => {
      if (gridRef.current) gridObserver.unobserve(gridRef.current)
      if (headerRef.current) headerObserver.unobserve(headerRef.current)
    }
  }, [])

  const handleAddToCart = (product: ProductListItem, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      variantId: `${product.id}-default`,
      name: product.name,
      description: product.description,
      unitPrice: product.price,
      image: product.image,
    })
  }

  const selectedIndex = categories.findIndex((c) => c.value === selectedCategory)

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16" dir="rtl">
          <span className={`font-sans-custom text-sm tracking-[0.3em] uppercase text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            הקולקציות שלנו
          </span>
          <h2 className={`font-serif-custom leading-tight text-foreground mb-4 text-balance text-6xl md:text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            עדינות וסטייל
          </h2>
          <p className={`font-sans-custom text-lg text-muted-foreground max-w-md mx-auto ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
            תכשיטים מעוצבים שנועדו להיות חלק מהיומיום שלך
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex justify-center mb-12" dir="rtl">
          <div className="inline-flex bg-background rounded-full p-1.5 gap-0 relative boty-shadow border border-primary/10 w-full max-w-[600px]">
            {/* Animated background slide - Proportional for 4 items (25% each) */}
            <div
              className="absolute top-1.5 bottom-1.5 bg-primary/10 rounded-full transition-all duration-300 ease-out"
              style={{
                right: `calc(${(selectedIndex / categories.length) * 100}% + 6px)`,
                width: `calc(${100 / categories.length}% - 12px)`,
              }}
            />
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategoryChange(category.value)}
                className={`relative z-10 flex-1 px-4 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-sans-custom font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category.value
                    ? "text-primary scale-105"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <Link
              key={`${selectedCategory}-${product.id}`}
              href={`/product/${product.slug}`}
              className={`group transition-all duration-500 ease-out ${
                isVisible && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: isTransitioning ? '0ms' : `${index * 80}ms` }}
            >
              <div className="bg-background rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
                {/* Image */}
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover boty-transition group-hover:scale-105"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide ${
                        product.badge === "Sale" || product.badge === "מבצע"
                          ? "bg-destructive/10 text-destructive"
                          : product.badge === "New" || product.badge === "חדש"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {product.badge === "Sale" ? "מבצע" : product.badge === "New" ? "חדש" : product.badge}
                    </span>
                  )}
                  {/* Interaction buttons */}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    {/* Quick add button */}
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-100 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
                      onClick={(e) => handleAddToCart(product, e)}
                      aria-label="הוספה לסל"
                    >
                      <ShoppingBag className="w-4 h-4 text-foreground" />
                    </button>
                    {/* Wishlist button */}
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-100 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // Wishlist logic would go here
                      }}
                      aria-label="הוספה למועדפים"
                    >
                      <Heart className="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 text-right" dir="rtl">
                  <h3 className="font-serif-custom text-lg text-foreground mb-1">{product.name}</h3>
                  <p className="font-sans-custom text-sm text-muted-foreground mb-3">{product.description}</p>
                  <div className="flex items-center gap-2 justify-start">
                    <span className="font-sans-custom font-medium text-foreground">{formatMoney(product.price)}</span>
                    {product.originalPrice && (
                      <span className="font-sans-custom text-sm text-muted-foreground line-through">
                        {formatMoney(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="font-sans-custom inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/5"
          >
            לכל התכשיטים
          </Link>
        </div>
      </div>
    </section>
  )
}
