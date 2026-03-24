/**
 * Order management utilities.
 */

import type { Order, OrderStatus, CartLine, CheckoutInput, PaymentProvider } from "@/types/order"
import { calculatePricing } from "./pricing"
import { getCouponDiscount, incrementCouponUsage } from "./coupons"

/**
 * In-memory order store (would be a database in production).
 */
const orders: Map<string, Order> = new Map()

/**
 * Generate a unique order number.
 */
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `BOTY-${timestamp}-${random}`
}

/**
 * Generate a unique order ID.
 */
function generateOrderId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Create a pending order from cart lines and checkout input.
 */
export function createPendingOrder(
  lines: CartLine[],
  input: CheckoutInput
): Order {
  const discountPercent = input.promoCode
    ? getCouponDiscount(input.promoCode, lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0))
    : 0

  const pricing = calculatePricing(lines, discountPercent)

  const now = new Date().toISOString()

  const order: Order = {
    id: generateOrderId(),
    orderNumber: generateOrderNumber(),
    email: input.email,
    status: "pending",
    paymentProvider: input.paymentProvider,
    paymentProviderId: null,
    lines: [...lines],
    shippingAddress: input.shippingAddress,
    billingAddress: input.billingAddress ?? input.shippingAddress,
    shippingMethodId: input.shippingMethodId,
    promoCode: input.promoCode,
    totals: {
      subtotal: { amount: pricing.subtotal, currency: "USD" },
      discount: { amount: pricing.discount, currency: "USD" },
      shipping: { amount: pricing.shipping, currency: "USD" },
      tax: { amount: pricing.tax, currency: "USD" },
      total: { amount: pricing.total, currency: "USD" },
    },
    createdAt: now,
    updatedAt: now,
    paidAt: null,
    shippedAt: null,
    deliveredAt: null,
  }

  orders.set(order.id, order)
  return order
}

/**
 * Attach a payment provider ID to an order (e.g., Stripe PaymentIntent ID).
 */
export function attachPaymentProviderId(orderId: string, providerId: string): Order | null {
  const order = orders.get(orderId)
  if (!order) return null

  order.paymentProviderId = providerId
  order.updatedAt = new Date().toISOString()
  return order
}

/**
 * Mark an order as paid.
 */
export function markOrderPaid(orderId: string): Order | null {
  const order = orders.get(orderId)
  if (!order) return null

  order.status = "confirmed"
  order.paidAt = new Date().toISOString()
  order.updatedAt = order.paidAt

  // Increment coupon usage if applicable
  if (order.promoCode) {
    incrementCouponUsage(order.promoCode)
  }

  return order
}

/**
 * Mark an order as failed.
 */
export function markOrderFailed(orderId: string): Order | null {
  const order = orders.get(orderId)
  if (!order) return null

  order.status = "cancelled"
  order.updatedAt = new Date().toISOString()
  return order
}

/**
 * Mark an order as refunded.
 */
export function markOrderRefunded(orderId: string): Order | null {
  const order = orders.get(orderId)
  if (!order) return null

  order.status = "refunded"
  order.updatedAt = new Date().toISOString()
  return order
}

/**
 * Update order status.
 */
export function updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
  const order = orders.get(orderId)
  if (!order) return null

  order.status = status
  order.updatedAt = new Date().toISOString()

  if (status === "shipped") {
    order.shippedAt = order.updatedAt
  } else if (status === "delivered") {
    order.deliveredAt = order.updatedAt
  }

  return order
}

/**
 * Get an order by ID.
 */
export function getOrderById(orderId: string): Order | null {
  return orders.get(orderId) ?? null
}

/**
 * Get an order by order number.
 */
export function getOrderByNumber(orderNumber: string): Order | null {
  for (const order of orders.values()) {
    if (order.orderNumber === orderNumber) return order
  }
  return null
}

/**
 * Get orders by email.
 */
export function getOrdersByEmail(email: string): Order[] {
  const result: Order[] = []
  for (const order of orders.values()) {
    if (order.email.toLowerCase() === email.toLowerCase()) {
      result.push(order)
    }
  }
  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}
