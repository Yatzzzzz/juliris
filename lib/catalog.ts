/**
 * Catalog helpers for products and categories.
 */

import productsData from "@/data/products.json"
import categoriesData from "@/data/categories.json"
import type { Product, ProductListItem, Category } from "@/types/catalog"
import { expandQuery, scoreMatch } from "./search"

// Cast JSON imports to typed arrays
const products = productsData as Product[]
const categories = categoriesData as Category[]

/**
 * Get all active products.
 */
export function getAllProducts(): Product[] {
  return products.filter((p) => p.status === "active")
}

/**
 * Get all products as lightweight list items for grids.
 */
export function getProductListItems(): ProductListItem[] {
  return getAllProducts().map(productToListItem)
}

/**
 * Get featured products (those with badges like Bestseller or New).
 */
export function getFeaturedProducts(limit = 6): ProductListItem[] {
  return getAllProducts()
    .filter((p) => p.badge === "Bestseller" || p.badge === "New")
    .slice(0, limit)
    .map(productToListItem)
}

/**
 * Get a single product by slug/id.
 */
export function getProductBySlug(slug: string): Product | null {
  return products.find((p) => p.slug === slug && p.status === "active") ?? null
}

/**
 * Get products by category slug.
 */
export function getProductsByCategory(categorySlug: string): ProductListItem[] {
  if (categorySlug === "all") return getProductListItems()
  return getAllProducts()
    .filter((p) => p.categoryId === categorySlug)
    .map(productToListItem)
}

/**
 * Search products by query string.
 * Returns products sorted by relevance score.
 */
export function searchProducts(query: string): ProductListItem[] {
  const tokens = expandQuery(query)
  if (tokens.length === 0) return getProductListItems()

  const scored = getAllProducts()
    .map((p) => ({
      product: p,
      score: scoreMatch(p.name, p.description, p.categoryId, p.tags, tokens),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.map((item) => productToListItem(item.product))
}

/**
 * Get all categories sorted by position.
 */
export function getAllCategories(): Category[] {
  return [...categories].sort((a, b) => a.position - b.position)
}

/**
 * Get a single category by slug.
 */
export function getCategoryBySlug(slug: string): Category | null {
  return categories.find((c) => c.slug === slug) ?? null
}

/**
 * Get category slugs for navigation (includes "all").
 */
export function getCategorySlugs(): string[] {
  return ["all", ...getAllCategories().map((c) => c.slug)]
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert a full Product to a lightweight ProductListItem.
 */
function productToListItem(product: Product): ProductListItem {
  const defaultVariant = product.variants[0]
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.tagline || product.description.slice(0, 60),
    price: defaultVariant.price.amount,
    originalPrice: defaultVariant.compareAtPrice?.amount ?? null,
    image: product.images[0]?.src ?? "/placeholder.svg",
    badge: product.badge,
    category: product.categoryId,
  }
}
