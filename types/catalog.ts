/**
 * Catalog type definitions for product, inventory, and category data.
 */

export type ProductStatus = "active" | "draft" | "archived"

export interface Money {
  amount: number
  currency: string
}

export interface ProductImage {
  id: string
  src: string
  alt: string
  position: number
}

export interface ProductVariant {
  id: string
  sku: string
  title: string          // e.g. "30ml", "50ml"
  price: Money
  compareAtPrice: Money | null
  inventory: InventoryRecord
  position: number
}

export interface InventoryRecord {
  available: number
  reserved: number
  incoming: number
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string | null
  parentId: string | null
  position: number
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  details: string
  howToUse: string
  ingredients: string
  delivery: string
  status: ProductStatus
  categoryId: string
  images: ProductImage[]
  variants: ProductVariant[]
  badge: string | null        // e.g. "Bestseller", "New", "Sale"
  rating: number              // 0–5
  reviewCount: number
  tags: string[]
  ijewelModelId?: string      // iJewel Drive 3D model File ID
  createdAt: string
  updatedAt: string
}

/**
 * Lightweight product record used for listing grids and search results.
 */
export interface ProductListItem {
  id: string
  slug: string
  name: string
  description: string
  price: number
  originalPrice: number | null
  image: string
  badge: string | null
  category: string
}
