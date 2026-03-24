/**
 * GET /api/yaad/callback
 * Success/notify callback route that validates Yaad response and updates order state.
 */

import { NextRequest, NextResponse } from "next/server"
import { getOrderById, markOrderPaid, markOrderFailed } from "@/lib/orders"

const YAAD_API_KEY = process.env.YAAD_API_KEY

function verifyYaadSignature(params: URLSearchParams, apiKey: string): boolean {
  // Get the signature from params
  const receivedSignature = params.get("Sign") || params.get("signature")
  if (!receivedSignature) return false

  // Remove signature from params for verification
  const verifyParams = new URLSearchParams(params)
  verifyParams.delete("Sign")
  verifyParams.delete("signature")

  // Sort and concatenate params
  const sortedKeys = Array.from(verifyParams.keys()).sort()
  const signatureString = sortedKeys.map((key) => `${key}=${verifyParams.get(key)}`).join("&")

  // Calculate expected signature
  const crypto = require("crypto")
  const expectedSignature = crypto.createHmac("sha256", apiKey).update(signatureString).digest("hex")

  return receivedSignature.toLowerCase() === expectedSignature.toLowerCase()
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // 'success' or 'error'
    const orderId = searchParams.get("tmp") || searchParams.get("orderId")
    const yaadTransactionId = searchParams.get("Id") || searchParams.get("trans_id")
    const status = searchParams.get("CCode") || searchParams.get("status")

    // For mock mode (development)
    if (searchParams.get("yaadMock") === "true" && orderId) {
      const order = getOrderById(orderId)
      if (order) {
        markOrderPaid(order.id)
      }
      return NextResponse.redirect(
        new URL(`/thank-you?orderId=${orderId}`, request.url)
      )
    }

    if (!orderId) {
      console.error("Yaad callback: Missing order ID")
      return NextResponse.redirect(
        new URL("/checkout?error=missing_order", request.url)
      )
    }

    // Get the internal order
    const order = getOrderById(orderId)
    if (!order) {
      console.error("Yaad callback: Order not found", orderId)
      return NextResponse.redirect(
        new URL("/checkout?error=order_not_found", request.url)
      )
    }

    // Verify signature if API key is configured
    if (YAAD_API_KEY) {
      const isValid = verifyYaadSignature(searchParams, YAAD_API_KEY)
      if (!isValid) {
        console.error("Yaad callback: Invalid signature")
        markOrderFailed(order.id)
        return NextResponse.redirect(
          new URL("/checkout?error=invalid_signature", request.url)
        )
      }
    }

    // Handle callback type
    if (type === "success" || status === "0") {
      // Payment successful
      markOrderPaid(order.id)

      // Redirect to thank you page
      return NextResponse.redirect(
        new URL(`/thank-you?orderId=${order.id}&orderNumber=${order.orderNumber}`, request.url)
      )
    } else if (type === "error" || (status && status !== "0")) {
      // Payment failed
      markOrderFailed(order.id)

      const errorCode = searchParams.get("Rone") || searchParams.get("error_code") || "unknown"
      return NextResponse.redirect(
        new URL(`/checkout?error=payment_failed&code=${errorCode}`, request.url)
      )
    }

    // Unknown callback type - redirect to checkout
    return NextResponse.redirect(
      new URL("/checkout?error=unknown_callback", request.url)
    )
  } catch (error) {
    console.error("Error processing Yaad callback:", error)
    return NextResponse.redirect(
      new URL("/checkout?error=callback_error", request.url)
    )
  }
}

/**
 * POST /api/yaad/callback
 * Handle Yaad server-to-server notifications (IPN).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const params = new URLSearchParams(body)

    const orderId = params.get("tmp") || params.get("orderId")
    const status = params.get("CCode") || params.get("status")
    const transactionId = params.get("Id") || params.get("trans_id")

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing order ID" },
        { status: 400 }
      )
    }

    const order = getOrderById(orderId)
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    // Verify signature
    if (YAAD_API_KEY) {
      const isValid = verifyYaadSignature(params, YAAD_API_KEY)
      if (!isValid) {
        console.error("Yaad IPN: Invalid signature")
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 400 }
        )
      }
    }

    // Update order based on status
    if (status === "0") {
      markOrderPaid(order.id)
      return NextResponse.json({ success: true, status: "paid" })
    } else {
      markOrderFailed(order.id)
      return NextResponse.json({ success: true, status: "failed" })
    }
  } catch (error) {
    console.error("Error processing Yaad IPN:", error)
    return NextResponse.json(
      { error: "Failed to process notification" },
      { status: 500 }
    )
  }
}
