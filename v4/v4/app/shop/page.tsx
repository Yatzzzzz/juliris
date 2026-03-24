"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ShoppingBag, SlidersHorizontal, X, Search } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

const products = [
  // Serums
  {
    id: "radiance-serum",
    name: "Radiance Serum",
    description: "Vitamin C brightening formula",
    price: 68,
    originalPrice: null,
    image: "/images/products/serum-bottles-1.png",
    badge: "Bestseller",
    category: "serums"
  },
  {
    id: "hydrating-serum",
    name: "Hydrating Serum",
    description: "Hyaluronic acid moisture boost",
    price: 62,
    originalPrice: null,
    image: "/images/products/eye-serum-bottles.png",
    badge: null,
    category: "serums"
  },
  {
    id: "age-defense-serum",
    name: "Age Defense Serum",
    description: "Retinol & peptide complex",
    price: 78,
    originalPrice: null,
    image: "/images/products/amber-dropper-bottles.png",
    badge: "New",
    category: "serums"
  },
  {
    id: "glow-serum",
    name: "Glow Serum",
    description: "Niacinamide brightening boost",
    price: 58,
    originalPrice: 68,
    image: "/images/products/spray-bottles.png",
    badge: "Sale",
    category: "serums"
  },
  // Creams
  {
    id: "hydra-cream",
    name: "Hydra Cream",
    description: "Deep moisture with hyaluronic acid",
    price: 54,
    originalPrice: null,
    image: "/images/products/cream-jars-colored.png",
    badge: null,
    category: "moisturizers"
  },
  {
    id: "gentle-cleanser",
    name: "Gentle Cleanser",
    description: "Soothing botanical wash",
    price: 38,
    originalPrice: 48,
    image: "/images/products/tube-bottles.png",
    badge: "Sale",
    category: "cleansers"
  },
  {
    id: "night-cream",
    name: "Night Cream",
    description: "Restorative overnight treatment",
    price: 64,
    originalPrice: null,
    image: "/images/products/jars-wooden-lid.png",
    badge: "Bestseller",
    category: "moisturizers"
  },
  {
    id: "day-cream-spf",
    name: "Day Cream SPF 30",
    description: "Protection & hydration",
    price: 58,
    originalPrice: null,
    image: "/images/products/pump-bottles-lavender.png",
    badge: null,
    category: "moisturizers"
  },
  // Oils
  {
    id: "renewal-oil",
    name: "Renewal Oil",
    description: "Nourishing facial oil blend",
    price: 72,
    originalPrice: null,
    image: "/images/products/amber-dropper-bottles.png",
    badge: "New",
    category: "oils"
  },
  {
    id: "rosehip-oil",
    name: "Rosehip Oil",
    description: "Pure organic rosehip extract",
    price: 48,
    originalPrice: null,
    image: "/images/products/serum-bottles-1.png",
    badge: null,
    category: "oils"
  },
  {
    id: "jojoba-oil",
    name: "Jojoba Oil",
    description: "Balancing & lightweight",
    price: 42,
    originalPrice: null,
    image: "/images/products/spray-bottles.png",
    badge: null,
    category: "oils"
  },
  {
    id: "argan-oil",
    name: "Argan Oil",
    description: "Moroccan beauty elixir",
    price: 56,
    originalPrice: null,
    image: "/images/products/pump-bottles-cream.png",
    badge: "Bestseller",
    category: "oils"
  },
  // Masks & Toners (original products)
  {
    id: "glow-mask",
    name: "Glow Mask",
    description: "Weekly brightening treatment",
    price: 45,
    originalPrice: null,
    image: "/images/products/mask.jpg",
    badge: null,
    category: "masks"
  },
  {
    id: "balance-toner",
    name: "Balance Toner",
    description: "pH restoring mist",
    price: 32,
    originalPrice: null,
    image: "/images/products/toner.jpg",
    badge: "New",
    category: "toners"
  }
]

const categories = ["all", "serums", "moisturizers", "cleansers", "oils", "masks", "toners"]

export default function ShopPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") ?? ""

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [showFilters, setShowFilters] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  // Sync search param on navigation (e.g. from overlay)
  useEffect(() => {
    const s = searchParams.get("search") ?? ""
    setSearchQuery(s)
    if (s) setSelectedCategory("all")
  }, [searchParams])

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory
    const q = searchQuery.trim().toLowerCase()
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

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

  // Reset animation when category or search changes
  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [selectedCategory, searchQuery])

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Our Collection
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance">
              Shop All Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Discover our complete range of natural skincare essentials
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="flex items-center gap-3 bg-card rounded-full px-5 py-3 boty-shadow border border-border/50">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (e.target.value) setSelectedCategory("all")
                }}
                placeholder="Search products..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-muted-foreground hover:text-foreground boty-transition"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-center text-sm text-muted-foreground mt-3">
                {filteredProducts.length === 0
                  ? `No results for "${searchQuery}"`
                  : `${filteredProducts.length} result${filteredProducts.length === 1 ? "" : "s"} for "${searchQuery}"`}
              </p>
            )}
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/50">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center gap-2 text-sm text-foreground"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm capitalize boty-transition bg-popover ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground/70 hover:text-foreground boty-shadow"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-2xl text-foreground">Filters</h2>
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
                        setShowFilters(false)
                      }}
                      className={`w-full px-6 py-4 rounded-2xl text-left capitalize boty-transition ${
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
              />
            ))}
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-4 boty-shadow">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="font-serif text-2xl text-foreground mb-2">No products found</p>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                Try adjusting your search or browse all categories.
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(""); setSelectedCategory("all") }}
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm hover:bg-primary/90 boty-transition"
              >
                Clear Search
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
  isVisible 
}: { 
  product: typeof products[0]
  index: number
  isVisible: boolean
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link
      href={`/product/${product.id}`}
      className={`group transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-card rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          {/* Skeleton */}
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
                product.badge === "Sale"
                  ? "bg-destructive/10 text-destructive"
                  : product.badge === "New"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              {product.badge}
            </span>
          )}
          {/* Quick add button */}
          <button
            type="button"
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
            onClick={(e) => {
              e.preventDefault()
            }}
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="font-serif text-xl text-foreground mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-foreground">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
