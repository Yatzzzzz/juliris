/**
 * POST /api/checkout/create-order
 * Receives cart lines + shipping/customer data, reloads prices from catalog,
 * validates totals, and creates an internal pending order.
 */

import { NextRequest, NextResponse } from "next/server"
import type { CartLine, CheckoutInput, PaymentProvider } from "@/types/order"
import { getProductBySlug } from "@/lib/catalog"
import { createPendingOrder } from "@/lib/orders"
import { validateCoupon } from "@/lib/coupons"
import { calculatePricing } from "@/lib/pricing"

interface CreateOrderRequest {
  lines: {
    productId: string
    variantId: string
    quantity: number
  }[]
  email: string
  shippingAddress: CheckoutInput["shippingAddress"]
  billingAddress: CheckoutInput["billingAddress"]
  shippingMethodId: string
  paymentProvider: PaymentProvider
  promoCode: string | null
  notes?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json()

    // Validate required fields
    if (!body.lines || body.lines.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      )
    }

    if (!body.email || !body.shippingAddress) {
      return NextResponse.json(
        { error: "Email and shipping address are required" },
        { status: 400 }
      )
    }

    // Reload prices from catalog to prevent price manipulation
    const reloadedLines: CartLine[] = []
    for (const line of body.lines) {
      const product = getProductBySlug(line.productId)
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${line.productId}` },
          { status: 400 }
        )
      }

      // Find the variant
      const variant = product.variants.find((v) => v.id === line.variantId)
      if (!variant) {
        // Default to first variant if not specified
        const defaultVariant = product.variants[0]
        reloadedLines.push({
          productId: product.id,
          variantId: defaultVariant.id,
          name: product.name,
          description: product.tagline || product.description.slice(0, 60),
          image: product.images[0]?.src ?? "/placeholder.svg",
          unitPrice: defaultVariant.price.amount,
          quantity: line.quantity,
        })
      } else {
        reloadedLines.push({
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          description: product.tagline || product.description.slice(0, 60),
          image: product.images[0]?.src ?? "/placeholder.svg",
          unitPrice: variant.price.amount,
          quantity: line.quantity,
        })
      }
    }

    // Validate promo code if provided
    let discountPercent = 0
    if (body.promoCode) {
      const subtotal = reloadedLines.reduce(
        (sum, line) => sum + line.unitPrice * line.quantity,
        0
      )
      const couponResult = validateCoupon(body.promoCode, subtotal)
      if (!couponResult.valid) {
        return NextResponse.json(
          { error: couponResult.error || "Invalid promo code" },
          { status: 400 }
        )
      }
      discountPercent = couponResult.coupon?.discountPercent ?? 0
    }

    // Calculate final pricing
    const pricing = calculatePricing(reloadedLines, discountPercent)

    // Create the checkout input
    const checkoutInput: CheckoutInput = {
      email: body.email,
      shippingAddress: body.shippingAddress,
      billingAddress: body.billingAddress,
      shippingMethodId: body.shippingMethodId || "standard",
      paymentProvider: body.paymentProvider,
      promoCode: body.promoCode,
      notes: body.notes || "",
    }

    // Create pending order
    const order = createPendingOrder(reloadedLines, checkoutInput)

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        totals: order.totals,
        status: order.status,
      },
      pricing,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}
