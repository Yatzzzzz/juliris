/**
 * Order and cart type definitions.
 */

import type { Money } from "./catalog"

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"

export type PaymentProvider = "stripe" | "paypal" | "apple_pay" | "yaad" | "card" | "manual"

export interface CartLine {
  productId: string
  variantId: string
  name: string
  description: string
  image: string
  unitPrice: number
  quantity: number
}

export interface Address {
  firstName: string
  lastName: string
  address1: string
  address2: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

export interface CheckoutInput {
  email: string
  shippingAddress: Address
  billingAddress: Address | null   // null = same as shipping
  shippingMethodId: string
  paymentProvider: PaymentProvider
  promoCode: string | null
  notes: string
}

export interface OrderTotals {
  subtotal: Money
  discount: Money
  shipping: Money
  tax: Money
  total: Money
}

export interface Order {
  id: string
  orderNumber: string
  email: string
  status: OrderStatus
  paymentProvider: PaymentProvider
  paymentProviderId: string | null   // e.g. Stripe PaymentIntent ID
  lines: CartLine[]
  shippingAddress: Address
  billingAddress: Address
  shippingMethodId: string
  promoCode: string | null
  totals: OrderTotals
  createdAt: string
  updatedAt: string
  paidAt: string | null
  shippedAt: string | null
  deliveredAt: string | null
}
