/**
 * Coupon validation and management.
 */

export interface Coupon {
  code: string
  discountPercent: number  // 0–1, e.g. 0.10 for 10%
  minOrderAmount: number
  maxUses: number | null   // null = unlimited
  usedCount: number
  expiresAt: Date | null   // null = no expiration
  active: boolean
}

/**
 * In-memory coupon store.
 * In production, this would come from a database.
 */
const COUPONS: Record<string, Coupon> = {
  BOTY10: {
    code: "BOTY10",
    discountPercent: 0.10,
    minOrderAmount: 0,
    maxUses: null,
    usedCount: 0,
    expiresAt: null,
    active: true,
  },
  BOTY20: {
    code: "BOTY20",
    discountPercent: 0.20,
    minOrderAmount: 100,
    maxUses: 100,
    usedCount: 45,
    expiresAt: new Date("2026-12-31"),
    active: true,
  },
  WELCOME15: {
    code: "WELCOME15",
    discountPercent: 0.15,
    minOrderAmount: 50,
    maxUses: null,
    usedCount: 0,
    expiresAt: null,
    active: true,
  },
}

export interface CouponValidationResult {
  valid: boolean
  coupon: Coupon | null
  error: string | null
}

/**
 * Validate a coupon code against an order subtotal.
 */
export function validateCoupon(
  code: string,
  subtotal: number
): CouponValidationResult {
  const normalized = code.trim().toUpperCase()
  const coupon = COUPONS[normalized]

  if (!coupon) {
    return { valid: false, coupon: null, error: "Invalid promo code" }
  }

  if (!coupon.active) {
    return { valid: false, coupon: null, error: "This promo code is no longer active" }
  }

  if (coupon.expiresAt && new Date() > coupon.expiresAt) {
    return { valid: false, coupon: null, error: "This promo code has expired" }
  }

  if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
    return { valid: false, coupon: null, error: "This promo code has reached its usage limit" }
  }

  if (subtotal < coupon.minOrderAmount) {
    return {
      valid: false,
      coupon: null,
      error: `Minimum order of $${coupon.minOrderAmount.toFixed(2)} required`,
    }
  }

  return { valid: true, coupon, error: null }
}

/**
 * Get the discount percentage for a valid coupon.
 */
export function getCouponDiscount(code: string, subtotal: number): number {
  const result = validateCoupon(code, subtotal)
  return result.valid && result.coupon ? result.coupon.discountPercent : 0
}

/**
 * Format discount percentage for display.
 */
export function formatDiscountPercent(percent: number): string {
  return `${Math.round(percent * 100)}%`
}

/**
 * Increment coupon usage count (call after successful order).
 * In production, this would update the database.
 */
export function incrementCouponUsage(code: string): void {
  const normalized = code.trim().toUpperCase()
  const coupon = COUPONS[normalized]
  if (coupon) {
    coupon.usedCount += 1
  }
}
