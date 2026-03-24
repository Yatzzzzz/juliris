"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

const products = [
  // Serums
  {
    id: "radiance-serum",
    name: "שרשרת אלה",
    description: "שרשרת עדינה למראה אלגנטי יומיומי.",
    price: 68,
    originalPrice: null,
    image: "/images/products/serum-bottles-1.png",
    badge: "נמכר ביותר",
    category: "שרשראות"
  },
  {
    id: "hydrating-serum",
    name: "שרשרת נעם",
    description: "שרשרת נשית בקו מינימליסטי ונוח לענידה.",
    price: 62,
    originalPrice: null,
    image: "/images/products/eye-serum-bottles.png",
    badge: null,
    category: "שרשראות"
  },
  {
    id: "age-defense-serum",
    name: "שרשרת יובל",
    description: "שרשרת אלגנטית עם נוכחות עדינה ומעודנת.",
    price: 78,
    originalPrice: null,
    image: "/images/products/amber-dropper-bottles.png",
    badge: "חדש",
    category: "שרשראות"
  },
  {
    id: "glow-serum",
    name: "צמיד דניאל",
    description: "צמיד יומיומי בקו נקי ונשי.",
    price: 58,
    originalPrice: 68,
    image: "/images/products/spray-bottles.png",
    badge: "מבצע",
    category: "צמידים"
  },
  // Creams
  {
    id: "hydra-cream",
    name: "טבעת נועה",
    description: "טבעת עדינה במראה נקי שמתאימה לשימוש יומיומי.",
    price: 54,
    originalPrice: null,
    image: "/images/products/cream-jars-colored.png",
    badge: null,
    category: "טבעות"
  },
  {
    id: "gentle-cleanser",
    name: "עגילי תמר",
    description: "עגילים היפואלרגניים בעיצוב אלגנטי ונוח.",
    price: 38,
    originalPrice: 48,
    image: "/images/products/tube-bottles.png",
    badge: "מבצע",
    category: "עגילים"
  },
  {
    id: "night-cream",
    name: "טבעת יעל",
    description: "טבעת נשית ועדינה שמשלימה מראה יומיומי אלגנטי.",
    price: 64,
    originalPrice: null,
    image: "/images/products/jars-wooden-lid.png",
    badge: "נמכר ביותר",
    category: "טבעות"
  },
  {
    id: "day-cream-spf",
    name: "טבעת מאיה",
    description: "טבעת מינימליסטית ונוחה לענידה לאורך היום.",
    price: 58,
    originalPrice: null,
    image: "/images/products/pump-bottles-lavender.png",
    badge: null,
    category: "טבעות"
  },
  // Oils
  {
    id: "renewal-oil",
    name: "עגילי ליה",
    description: "עגילים עדינים עם נוכחות נשית וקלילה.",
    price: 72,
    originalPrice: null,
    image: "/images/products/amber-dropper-bottles.png",
    badge: "חדש",
    category: "עגילים"
  },
  {
    id: "rosehip-oil",
    name: "עגילי שירה",
    description: "עגילים יומיומיים בקווים נקיים ונעימים לענידה.",
    price: 48,
    originalPrice: null,
    image: "/images/products/serum-bottles-1.png",
    badge: null,
    category: "עגילים"
  },
  {
    id: "jojoba-oil",
    name: "צמיד מיה",
    description: "צמיד קליל ועדין למראה נשי ולא מתאמץ.",
    price: 42,
    originalPrice: null,
    image: "/images/products/spray-bottles.png",
    badge: null,
    category: "צמידים"
  },
  {
    id: "argan-oil",
    name: "צמיד רוני",
    description: "צמיד אלגנטי עם גימור נקי ונוחות יומיומית.",
    price: 56,
    originalPrice: null,
    image: "/images/products/pump-bottles-cream.png",
    badge: "נמכר ביותר",
    category: "צמידים"
  },
  // Masks & Toners (original products)
  {
    id: "glow-mask",
    name: "סטיינלס נועם",
    description: "פריט סטיינלס סטיל עמיד בעיצוב נקי ואלגנטי.",
    price: 45,
    originalPrice: null,
    image: "/images/products/mask.jpg",
    badge: null,
    category: "סטיינלס סטיל"
  },
  {
    id: "balance-toner",
    name: "סטיינלס עדן",
    description: "פריט סטיינלס סטיל יומיומי עם מראה מודרני ונוח.",
    price: 32,
    originalPrice: null,
    image: "/images/products/toner.jpg",
    badge: "חדש",
    category: "סטיינלס סטיל"
  }
]

const categories = ["הכול", "טבעות", "עגילים", "שרשראות", "צמידים", "סטיינלס סטיל"]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("הכול")
  const [showFilters, setShowFilters] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredProducts = selectedCategory === "הכול"
    ? products
    : products.filter(p => p.category === selectedCategory)

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

  // Reset animation when category changes
  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [selectedCategory])

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              הקולקציה שלנו
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance">
              כל המוצרים
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              גלי את קולקציית Juliris — תכשיטים היפואלרגניים בעיצוב אלגנטי, עם דגש על נוחות יומיומית ועור רגיש.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/50">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center gap-2 text-sm text-foreground"
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
              {filteredProducts.length} מוצרים
            </span>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-2xl text-foreground">סינון</h2>
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
                product.badge === "מבצע"
                  ? "bg-destructive/10 text-destructive"
                  : product.badge === "חדש"
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
            aria-label="הוספה לסל"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="font-serif text-xl text-foreground mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-foreground">₪{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₪{product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
