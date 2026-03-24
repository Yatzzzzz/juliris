/**
 * POST /api/paypal/capture-order
 * Captures an approved PayPal order and marks the internal order as paid.
 */

import { NextRequest, NextResponse } from "next/server"
import { getOrderById, markOrderPaid, markOrderFailed } from "@/lib/orders"

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_API_URL = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com"

interface CapturePayPalOrderRequest {
  paypalOrderId: string
  orderId: string
}

async function getPayPalAccessToken(): Promise<string> {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal credentials not configured")
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64")

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  if (!response.ok) {
    throw new Error("Failed to get PayPal access token")
  }

  const data = await response.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const body: CapturePayPalOrderRequest = await request.json()

    if (!body.paypalOrderId || !body.orderId) {
      return NextResponse.json(
        { error: "PayPal order ID and internal order ID are required" },
        { status: 400 }
      )
    }

    // Get the internal order
    const order = getOrderById(body.orderId)
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    // Verify the PayPal order ID matches
    if (order.paymentProviderId !== body.paypalOrderId) {
      return NextResponse.json(
        { error: "PayPal order ID mismatch" },
        { status: 400 }
      )
    }

    // Check if PayPal is configured
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      // Mock capture for development
      const updatedOrder = markOrderPaid(order.id)

      return NextResponse.json({
        success: true,
        order: {
          id: updatedOrder?.id,
          orderNumber: updatedOrder?.orderNumber,
          status: updatedOrder?.status,
        },
        mock: true,
      })
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken()

    // Capture the PayPal order
    const response = await fetch(
      `${PAYPAL_API_URL}/v2/checkout/orders/${body.paypalOrderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("PayPal capture error:", errorData)

      // Mark internal order as failed
      markOrderFailed(order.id)

      return NextResponse.json(
        { error: "Failed to capture PayPal payment" },
        { status: 400 }
      )
    }

    const captureData = await response.json()

    // Check capture status
    if (captureData.status === "COMPLETED") {
      // Mark internal order as paid
      const updatedOrder = markOrderPaid(order.id)

      return NextResponse.json({
        success: true,
        order: {
          id: updatedOrder?.id,
          orderNumber: updatedOrder?.orderNumber,
          status: updatedOrder?.status,
        },
        paypalStatus: captureData.status,
      })
    } else {
      // Payment not completed
      markOrderFailed(order.id)

      return NextResponse.json(
        { error: `Payment not completed. Status: ${captureData.status}` },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Error capturing PayPal order:", error)
    return NextResponse.json(
      { error: "Failed to capture PayPal order" },
      { status: 500 }
    )
  }
}
