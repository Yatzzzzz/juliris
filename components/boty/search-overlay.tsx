"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, X, ArrowRight } from "lucide-react"
import { searchProducts, getAllCategories } from "@/lib/catalog"
import { formatMoney } from "@/lib/pricing"

const popularSearches = ["serum", "moisturizer", "oil", "cleanser", "vitamin C"]

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Search against canonical catalog
  const results = useMemo(() => {
    if (query.trim().length === 0) return []
    return searchProducts(query).slice(0, 6)
  }, [query])

  const handleClose = useCallback(() => {
    setQuery("")
    onClose()
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`)
      handleClose()
    }
  }

  const handleProductClick = () => {
    handleClose()
  }

  const handlePopularClick = (term: string) => {
    router.push(`/shop?search=${encodeURIComponent(term)}`)
    handleClose()
  }

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    if (isOpen) window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, handleClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 bg-background mx-4 mt-24 md:mx-auto md:w-full md:max-w-2xl rounded-3xl boty-shadow overflow-hidden animate-scale-fade-in">
        {/* Search Input */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for serums, oils, creams..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base focus:outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 text-muted-foreground hover:text-foreground boty-transition"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-full bg-muted text-muted-foreground hover:text-foreground boty-transition ml-1"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-3">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground px-3 py-2">
                Products
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={handleProductClick}
                  className="flex items-center gap-4 px-3 py-3 rounded-2xl hover:bg-card boty-transition group"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover group-hover:scale-105 boty-transition"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-medium text-foreground">{formatMoney(product.price)}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 boty-transition" />
                  </div>
                </Link>
              ))}

              {/* View all results link */}
              <button
                type="button"
                onClick={() => {
                  router.push(`/shop?search=${encodeURIComponent(query.trim())}`)
                  handleClose()
                }}
                className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-2xl bg-card text-sm text-foreground hover:bg-muted boty-transition"
              >
                View all results for &ldquo;{query}&rdquo;
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : query.trim().length > 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-foreground font-medium mb-1">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-muted-foreground">Try a different term or browse all products</p>
              <Link
                href="/shop"
                onClick={handleClose}
                className="inline-flex items-center gap-1.5 mt-4 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm boty-transition hover:bg-primary/90"
              >
                Browse All Products
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="p-5">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handlePopularClick(term)}
                    className="px-4 py-2 rounded-full bg-card text-sm text-foreground hover:bg-primary hover:text-primary-foreground boty-transition boty-shadow capitalize"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
