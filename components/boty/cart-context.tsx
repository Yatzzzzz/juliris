"use client"

import { createContext, useContext, useState, useMemo, type ReactNode } from "react"
import type { CartLine } from "@/types/order"
import {
  calculatePricing,
  formatMoney,
  getShippingMessage,
  type PricingBreakdown,
} from "@/lib/pricing"
import { validateCoupon, getCouponDiscount, formatDiscountPercent } from "@/lib/coupons"

// Re-export CartLine type for consumers
export type { CartLine }

// Legacy CartItem alias for backwards compatibility
export type CartItem = CartLine

interface CartContextType {
  // Cart state
  items: CartLine[]
  itemCount: number

  // Cart actions
  addItem: (item: Omit<CartLine, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void

  // Drawer state
  isOpen: boolean
  setIsOpen: (open: boolean) => void

  // Promo code
  promoCode: string | null
  promoError: string | null
  applyPromoCode: (code: string) => boolean
  clearPromoCode: () => void

  // Pricing (computed from shared helpers)
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  pricing: PricingBreakdown
  shippingMessage: string | null
  discountLabel: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [promoCode, setPromoCode] = useState<string | null>(null)
  const [promoError, setPromoError] = useState<string | null>(null)

  // ─────────────────────────────────────────────────────────────────────────
  // Cart actions
  // ─────────────────────────────────────────────────────────────────────────

  const addItem = (newItem: Omit<CartLine, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === newItem.productId)
      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === newItem.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...currentItems, { ...newItem, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.productId !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setPromoCode(null)
    setPromoError(null)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Promo code actions
  // ─────────────────────────────────────────────────────────────────────────

  const applyPromoCode = (code: string): boolean => {
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const result = validateCoupon(code, subtotal)

    if (result.valid) {
      setPromoCode(code.trim().toUpperCase())
      setPromoError(null)
      return true
    } else {
      setPromoCode(null)
      setPromoError(result.error)
      return false
    }
  }

  const clearPromoCode = () => {
    setPromoCode(null)
    setPromoError(null)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Computed values (using shared pricing helpers)
  // ─────────────────────────────────────────────────────────────────────────

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const discountPercent = useMemo(() => {
    if (!promoCode) return 0
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    return getCouponDiscount(promoCode, subtotal)
  }, [items, promoCode])

  const pricing = useMemo(
    () => calculatePricing(items, discountPercent),
    [items, discountPercent]
  )

  const shippingMessage = useMemo(
    () => getShippingMessage(pricing.subtotal),
    [pricing.subtotal]
  )

  const discountLabel = useMemo(
    () => (discountPercent > 0 ? `Discount (${formatDiscountPercent(discountPercent)})` : null),
    [discountPercent]
  )

  // ─────────────────────────────────────────────────────────────────────────
  // Context value
  // ─────────────────────────────────────────────────────────────────────────

  const value: CartContextType = {
    items,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isOpen,
    setIsOpen,
    promoCode,
    promoError,
    applyPromoCode,
    clearPromoCode,
    subtotal: pricing.subtotal,
    discount: pricing.discount,
    shipping: pricing.shipping,
    tax: pricing.tax,
    total: pricing.total,
    pricing,
    shippingMessage,
    discountLabel,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
