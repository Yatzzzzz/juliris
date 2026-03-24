/**
 * Pricing calculators for cart, checkout, and order totals.
 */

import type { CartLine } from "@/types/order"

export interface PricingConfig {
  freeShippingThreshold: number
  standardShippingRate: number
  taxRate: number // e.g. 0.08 for 8%
}

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  freeShippingThreshold: 50,
  standardShippingRate: 6.99,
  taxRate: 0, // No tax by default; adjust per region
}

/**
 * Calculate the subtotal (sum of line prices).
 */
export function calculateSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
}

/**
 * Calculate discount amount from a percentage (0–1).
 */
export function calculateDiscount(subtotal: number, discountPercent: number): number {
  if (discountPercent <= 0 || discountPercent > 1) return 0
  return Math.round(subtotal * discountPercent * 100) / 100
}

/**
 * Calculate shipping cost.
 */
export function calculateShipping(
  subtotal: number,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): number {
  if (subtotal <= 0) return 0
  return subtotal >= config.freeShippingThreshold ? 0 : config.standardShippingRate
}

/**
 * Calculate tax amount.
 */
export function calculateTax(
  subtotalAfterDiscount: number,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): number {
  if (config.taxRate <= 0) return 0
  return Math.round(subtotalAfterDiscount * config.taxRate * 100) / 100
}

/**
 * Calculate the final total.
 */
export function calculateTotal(
  subtotal: number,
  discount: number,
  shipping: number,
  tax: number
): number {
  return Math.round((subtotal - discount + shipping + tax) * 100) / 100
}

/**
 * All-in-one pricing breakdown.
 */
export interface PricingBreakdown {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
}

export function calculatePricing(
  lines: CartLine[],
  discountPercent = 0,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): PricingBreakdown {
  const subtotal = calculateSubtotal(lines)
  const discount = calculateDiscount(subtotal, discountPercent)
  const shipping = calculateShipping(subtotal, config)
  const tax = calculateTax(subtotal - discount, config)
  const total = calculateTotal(subtotal, discount, shipping, tax)

  return { subtotal, discount, shipping, tax, total }
}

/**
 * Format a number as USD currency string.
 */
export function formatMoney(amount: number): string {
  return `$${amount.toFixed(2)}`
}

/**
 * Get shipping threshold message.
 */
export function getShippingMessage(
  subtotal: number,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): string | null {
  if (subtotal <= 0) return null
  if (subtotal >= config.freeShippingThreshold) return null
  const remaining = config.freeShippingThreshold - subtotal
  return `Add ${formatMoney(remaining)} more for free shipping`
}
