"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Check, Package, Mail, ArrowRight, Leaf, Heart, Recycle, Award } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { getOrderById, getOrderByNumber } from "@/lib/orders"
import { formatMoney } from "@/lib/pricing"
import type { Order } from "@/types/order"

const steps = [
  { icon: Check, label: "Order Confirmed", sub: "We've received your order" },
  { icon: Package, label: "Being Prepared", sub: "Your order is being packaged" },
  { icon: Mail, label: "On Its Way", sub: "Your package is shipped" },
]

const whatsNext = [
  {
    icon: Mail,
    title: "Confirmation Email",
    description: "A confirmation email with your order details has been sent to your inbox.",
  },
  {
    icon: Package,
    title: "Shipping Update",
    description: "You'll receive a tracking number once your order has been dispatched.",
  },
  {
    icon: Leaf,
    title: "Eco Packaging",
    description: "Your order is carefully packed in our 100% recyclable, plastic-free materials.",
  },
]

const values = [
  { icon: Leaf, label: "Natural Ingredients" },
  { icon: Heart, label: "Cruelty Free" },
  { icon: Recycle, label: "Eco Packaging" },
  { icon: Award, label: "Expert Approved" },
]

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const [animate, setAnimate] = useState(false)
  const [order, setOrder] = useState<Order | null>(null)

  // Get order from query params or internal lookup
  const orderId = searchParams.get("orderId")
  const orderNumber = searchParams.get("orderNumber")

  useEffect(() => {
    // Try to load order details
    if (orderId) {
      const foundOrder = getOrderById(orderId)
      if (foundOrder) setOrder(foundOrder)
    } else if (orderNumber) {
      const foundOrder = getOrderByNumber(orderNumber)
      if (foundOrder) setOrder(foundOrder)
    }
  }, [orderId, orderNumber])

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Generate display order number
  const displayOrderNumber = useMemo(() => {
    if (order?.orderNumber) return order.orderNumber
    if (orderNumber) return orderNumber
    return `BOTY-${Math.floor(100000 + Math.random() * 900000)}`
  }, [order, orderNumber])

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">

          {/* Success Icon */}
          <div
            className={`transition-all duration-700 ease-out ${
              animate ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center boty-shadow">
                  <Check className="w-10 h-10 text-primary-foreground" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div
            className={`transition-all duration-700 delay-200 ease-out ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-3 block">
              Thank You
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance">
              Your order is confirmed
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-3">
              We're thrilled to be part of your skincare ritual. Your natural glow is on its way.
            </p>
            <p className="text-sm text-muted-foreground">
              Order{" "}
              <span className="font-medium text-foreground font-mono">{displayOrderNumber}</span>
            </p>
            {order?.email && (
              <p className="text-sm text-muted-foreground mt-1">
                Confirmation sent to{" "}
                <span className="font-medium text-foreground">{order.email}</span>
              </p>
            )}
          </div>

          {/* Order Summary (if available) */}
          {order && (
            <div
              className={`mt-8 transition-all duration-700 delay-250 ease-out ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="bg-card rounded-2xl p-6 boty-shadow text-left max-w-md mx-auto">
                <h3 className="font-medium text-foreground mb-4">Order Details</h3>
                <div className="space-y-3 text-sm">
                  {order.lines.map((line) => (
                    <div key={line.productId} className="flex justify-between">
                      <span className="text-muted-foreground">
                        {line.name} x {line.quantity}
                      </span>
                      <span className="text-foreground">{formatMoney(line.unitPrice * line.quantity)}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-border/50">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">{formatMoney(order.totals.subtotal.amount)}</span>
                    </div>
                    {order.totals.discount.amount > 0 && (
                      <div className="flex justify-between text-primary">
                        <span>Discount</span>
                        <span>-{formatMoney(order.totals.discount.amount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground">
                        {order.totals.shipping.amount === 0 ? "Free" : formatMoney(order.totals.shipping.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium pt-2">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">{formatMoney(order.totals.total.amount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Progress */}
          <div
            className={`mt-12 transition-all duration-700 delay-300 ease-out ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="bg-card rounded-3xl p-8 boty-shadow">
              <div className="flex items-start justify-between relative">
                {/* connecting line */}
                <div className="absolute top-5 left-[calc(16.66%)] right-[calc(16.66%)] h-px bg-border" aria-hidden="true" />
                {steps.map((step, i) => (
                  <div key={step.label} className="flex flex-col items-center gap-3 flex-1 relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center boty-transition boty-shadow ${
                        i === 0
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground"
                      }`}
                    >
                      <step.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          i === 0 ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div
            className={`mt-12 transition-all duration-700 delay-[400ms] ease-out ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="font-serif text-2xl text-foreground mb-6">What happens next?</h2>
            <div className="grid gap-4 text-left">
              {whatsNext.map((item, i) => (
                <div
                  key={item.title}
                  className={`flex gap-4 p-5 bg-card rounded-2xl boty-shadow transition-all duration-700 ease-out ${
                    animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${500 + i * 100}ms` }}
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Values */}
          <div
            className={`mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-700 delay-[700ms] ease-out ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {values.map((v) => (
              <div
                key={v.label}
                className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl boty-shadow"
              >
                <v.icon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">{v.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-[800ms] ease-out ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide hover:bg-primary/90 boty-transition boty-shadow"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-border text-foreground px-8 py-4 rounded-full text-sm tracking-wide hover:bg-muted boty-transition"
            >
              Back to Home
            </Link>
          </div>

          {/* Brand sign-off */}
          <div
            className={`mt-16 transition-all duration-700 delay-[900ms] ease-out ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="font-serif text-5xl text-foreground/10 select-none">Boty</p>
            <p className="text-sm text-muted-foreground mt-1">
              Questions? Contact us at{" "}
              <a href="mailto:hello@boty.com" className="underline hover:text-foreground boty-transition">
                hello@boty.com
              </a>
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
