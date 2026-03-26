"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ShoppingBag, SlidersHorizontal, X, Search } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"
import { getProductListItems, getProductsByCategory, searchProducts, getCategorySlugs, getAllCategories } from "@/lib/catalog"
import { formatMoney } from "@/lib/pricing"
import type { ProductListItem } from "@/types/catalog"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") ?? ""
  
  // Use Hebrew default category as per heb4.md
  const [selectedCategory, setSelectedCategory] = useState("הכול")
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [showFilters, setShowFilters] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  // Custom categories per heb4.md
  const categories = [
    "הכול",
    "טבעות",
    "עגילים",
    "שרשראות",
    "צמידים",
    "סטיינלס סטיל",
  ]

  // Filter products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim()
    if (q) {
      return searchProducts(q)
    }
    
    // Map Hebrew categories back to slugs if necessary, 
    // or if getProductsByCategory handles "הכול"
    if (selectedCategory === "הכול") {
      return getProductListItems()
    }
    
    // Map Hebrew to Slug for the backend query
    const categoryMap: Record<string, string> = {
      "טבעות": "rings",
      "עגילים": "earrings",
      "שרשראות": "necklaces",
      "צמידים": "bracelets",
      "סטיינלס סטיל": "modern-look"
    }
    
    return getProductsByCategory(categoryMap[selectedCategory] || selectedCategory)
  }, [selectedCategory, searchQuery])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [selectedCategory, searchQuery])

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

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12" dir="rtl">
            <span className="font-sans-custom text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              הקולקציה שלנו
            </span>
            <h1 className="font-serif-custom text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance">
              כל המוצרים
            </h1>
            <p className="font-sans-custom text-lg text-muted-foreground max-w-2xl mx-auto">
              גלי את קולקציית Juliris — תכשיטים היפואלרגניים בעיצוב אלגנטי, עם דגש על נוחות יומיומית ועור רגיש.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-lg mx-auto mb-8" dir="rtl">
            <div className="flex items-center gap-3 bg-card rounded-full px-5 py-3 boty-shadow border border-border/50">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (e.target.value) setSelectedCategory("הכול")
                }}
                placeholder="חיפוש מוצרים..."
                className="font-sans-custom flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-muted-foreground hover:text-foreground boty-transition"
                  aria-label="נקה חיפוש"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-center text-sm text-muted-foreground mt-3 font-sans-custom">
                {filteredProducts.length === 0
                  ? `לא נמצאו תוצאות עבור "${searchQuery}"`
                  : `נמצאו ${filteredProducts.length} מוצרים עבור "${searchQuery}"`}
              </p>
            )}
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/50" dir="rtl">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center gap-2 text-sm text-foreground font-sans-custom"
            >
              <SlidersHorizontal className="w-4 h-4" />
              סינון
            </button>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category)
                    setSearchQuery("")
                  }}
                  className={`font-sans-custom px-4 py-2 rounded-full text-sm boty-transition ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground/70 hover:text-foreground boty-shadow"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <span className="font-sans-custom text-sm text-muted-foreground">
              {filteredProducts.length} מוצרים
            </span>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background" dir="rtl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif-custom text-2xl text-foreground">סינון</h2>
                  <button
                    type="button"
                    onClick={() => setShowFilters(false)}
                    className="p-2 text-foreground/70 hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category)
                        setSearchQuery("")
                        setShowFilters(false)
                      }}
                      className={`font-sans-custom w-full px-6 py-4 rounded-2xl text-right boty-transition ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground boty-shadow"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
          <div 
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                index={index}
                isVisible={isVisible}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center" dir="rtl">
              <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-4 boty-shadow">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="font-serif-custom text-2xl text-foreground mb-2">לא נמצאו מוצרים</p>
              <p className="font-sans-custom text-sm text-muted-foreground mb-6 max-w-xs">
                נסי לשנות את החיפוש או לעבור בין הקטגוריות השונות.
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(""); setSelectedCategory("הכול") }}
                className="font-sans-custom px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm hover:bg-primary/90 boty-transition"
              >
                נקה הכל
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

function ProductCard({ 
  product, 
  index, 
  isVisible,
  onAddToCart
}: { 
  product: ProductListItem
  index: number
  isVisible: boolean
  onAddToCart: (product: ProductListItem, e: React.MouseEvent) => void
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-card rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted animate-pulse transition-opacity duration-500 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={`object-cover boty-transition group-hover:scale-105 transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide ${
                product.badge === "מבצע" || product.badge === "Sale"
                  ? "bg-destructive/10 text-destructive"
                  : product.badge === "חדש" || product.badge === "New"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              {product.badge === "Sale" ? "מבצע" : product.badge === "New" ? "חדש" : product.badge}
            </span>
          )}
          {/* Quick add button */}
          <button
            type="button"
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
            onClick={(e) => onAddToCart(product, e)}
            aria-label="הוספה לסל"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6 text-right" dir="rtl">
          <h3 className="font-serif-custom text-xl text-foreground mb-1">{product.name}</h3>
          <p className="font-sans-custom text-sm text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center gap-2 justify-start">
            <span className="font-sans-custom text-lg font-medium text-foreground">{formatMoney(product.price)}</span>
            {product.originalPrice && (
              <span className="font-sans-custom text-sm text-muted-foreground line-through">
                {formatMoney(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
