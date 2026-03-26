"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, ChevronDown, Lock, CreditCard, AlertCircle } from "lucide-react"
import { Header } from "@/components/boty/header"
import { useCart } from "@/components/boty/cart-context"
import { formatMoney } from "@/lib/pricing"
import type { PaymentProvider, Address } from "@/types/order"

type PaymentMethod = "paypal" | "yaad"

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring boty-transition text-right"

export default function CheckoutPage() {
  const { items, subtotal, discount, shipping, total, clearCart, restoreCart, promoCode, discountLabel } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal")
  const [sameAddress, setSameAddress] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [email, setEmail] = useState("")
  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "IL",
    phone: "",
  })
  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "IL",
    phone: "",
  })

  // Check for error or cancellation in URL
  useEffect(() => {
    const errorParam = searchParams.get("error")
    const cancelledParam = searchParams.get("cancelled")
    const orderIdParam = searchParams.get("orderId")
    
    if (cancelledParam === "true") {
      setError("התשלום בוטל. הסל שלך נשמר.")
      if (orderIdParam && items.length === 0) {
        fetch(`/api/orders/${orderIdParam}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.order?.lines) restoreCart(data.order.lines)
          })
      }
    } else if (errorParam) {
      setError("אירעה שגיאה בתשלום. אנא נסו שוב.")
    }
  }, [searchParams])

  const steps = ["סל קניות", "קופה", "אישור"]

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const orderResponse = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
          email,
          shippingAddress,
          billingAddress: sameAddress ? null : billingAddress,
          shippingMethodId: "standard",
          paymentProvider: paymentMethod as PaymentProvider,
          promoCode,
        }),
      })

      const orderData = await orderResponse.json()
      if (!orderResponse.ok) throw new Error(orderData.error || "שגיאה ביצירת הזמנה")

      const orderId = orderData.order.id

      if (paymentMethod === "paypal") {
        const paypalResponse = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        })
        const paypalData = await paypalResponse.json()
        if (!paypalResponse.ok) throw new Error(paypalData.error || "שגיאה ב-PayPal")
        
        if (paypalData.mock || !paypalData.approvalUrl) {
          clearCart()
          router.push(`/thank-you?orderId=${orderId}&orderNumber=${orderData.order.orderNumber}`)
        } else {
          window.location.href = paypalData.approvalUrl
        }
      } else if (paymentMethod === "yaad") {
        const yaadResponse = await fetch("/api/yaad/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        })
        const yaadData = await yaadResponse.json()
        if (!yaadResponse.ok) throw new Error(yaadData.error || "שגיאה ב-Yaad Pay")
        
        if (yaadData.mock) {
          clearCart()
          router.push(`/thank-you?orderId=${orderId}&orderNumber=${orderData.order.orderNumber}`)
        } else {
          window.location.href = yaadData.redirectUrl
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "אירעה שגיאה")
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen" dir="rtl">
      <Header />

      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground boty-transition"
            >
              <ChevronRight className="w-4 h-4" />
              חזרה לסל
            </Link>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive font-sans-custom">{error}</p>
            </div>
          )}

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-10">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium boty-transition ${
                      i === 1
                        ? "bg-primary text-primary-foreground"
                        : i < 1
                        ? "bg-primary/30 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-sm font-sans-custom boty-transition ${
                      i === 1 ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-8 h-px bg-border" />
                )}
              </div>
            ))}
          </div>

          {/* Title */}
          <div className="mb-10 text-right">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block font-sans-custom">מאובטח</span>
            <h1 className="font-serif-custom text-4xl md:text-5xl text-foreground">קופה</h1>
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div className="grid lg:grid-cols-[1fr_400px] gap-12 xl:gap-20">

              {/* Left: Form */}
              <div className="space-y-10">

                {/* Contact */}
                <section className="text-right">
                  <h2 className="font-serif-custom text-2xl text-foreground mb-6">פרטי התקשרות</h2>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="כתובת אימייל"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative w-5 h-5">
                        <input type="checkbox" defaultChecked className="peer sr-only" />
                        <div className="w-5 h-5 rounded border border-border bg-background peer-checked:bg-primary peer-checked:border-primary boty-transition" />
                        <svg className="absolute inset-0 w-5 h-5 text-primary-foreground opacity-0 peer-checked:opacity-100 boty-transition pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-muted-foreground font-sans-custom">שלחו לי עדכונים ומבצעים במייל</span>
                    </label>
                  </div>
                </section>

                {/* Shipping Address */}
                <section className="text-right font-sans-custom">
                  <h2 className="font-serif-custom text-2xl text-foreground mb-6">כתובת למשלוח</h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="שם פרטי"
                        required
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="שם משפחה"
                        required
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="כתובת"
                      required
                      value={shippingAddress.address1}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address1: e.target.value })}
                      className={inputClass}
                    />
                    <input
                      type="text"
                      placeholder="דירה, קומה וכו׳ (אופציונלי)"
                      value={shippingAddress.address2}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address2: e.target.value })}
                      className={inputClass}
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="עיר"
                        required
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="מיקוד"
                        required
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="relative">
                      <select disabled value="IL" className={`${inputClass} appearance-none bg-muted/50 cursor-not-allowed`}>
                        <option value="IL">ישראל</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      placeholder="טלפון"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </section>

                {/* Shipping Method */}
                <section className="text-right font-sans-custom">
                  <h2 className="font-serif-custom text-2xl text-foreground mb-6">שיטת משלוח</h2>
                  <div className="p-4 rounded-2xl bg-card border-2 border-primary boty-shadow flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="radio" checked readOnly className="accent-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">משלוח עד הבית</p>
                        <p className="text-xs text-muted-foreground">3-5 ימי עסקים</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-foreground">₪39</span>
                  </div>
                </section>

                {/* Payment */}
                <section className="text-right font-sans-custom">
                  <h2 className="font-serif-custom text-2xl text-foreground mb-6">תשלום</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">כל העסקאות מאובטחות ומוצפנות</span>
                  </div>

                  <div className="flex gap-2 mb-5">
                    <button
                      key="yaad"
                      type="button"
                      onClick={() => setPaymentMethod("yaad")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm boty-transition border-2 ${
                        paymentMethod === "yaad" ? "border-primary bg-primary/5 text-foreground" : "border-border bg-card text-muted-foreground"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>כרטיס אשראי</span>
                    </button>
                    <button
                      key="paypal"
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm boty-transition border-2 ${
                        paymentMethod === "paypal" ? "border-primary bg-primary/5 text-foreground" : "border-border bg-card text-muted-foreground"
                      }`}
                    >
                      <span>PayPal</span>
                    </button>
                  </div>

                  <div className="p-6 bg-card rounded-2xl text-center text-sm text-muted-foreground boty-shadow">
                    {paymentMethod === "paypal" 
                      ? "תועברו ל-PayPal להשלמת הרכישה בצורה מאובטחת."
                      : "תועברו לעמוד התשלום המאובטח של Yaad Pay."}
                  </div>
                </section>

                {/* Billing Address */}
                <section className="text-right font-sans-custom">
                  <h2 className="font-serif-custom text-2xl text-foreground mb-6">כתובת לחיוב</h2>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative w-5 h-5">
                      <input type="checkbox" checked={sameAddress} onChange={(e) => setSameAddress(e.target.checked)} className="peer sr-only" />
                      <div className="w-5 h-5 rounded border border-border bg-background peer-checked:bg-primary peer-checked:border-primary boty-transition" />
                      <svg className="absolute inset-0 w-5 h-5 text-primary-foreground opacity-0 peer-checked:opacity-100 boty-transition pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-muted-foreground">זהה לכתובת המשלוח</span>
                  </label>

                  {!sameAddress && (
                    <div className="space-y-4 mt-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="שם פרטי"
                          required
                          value={billingAddress.firstName}
                          onChange={(e) => setBillingAddress({ ...billingAddress, firstName: e.target.value })}
                          className={inputClass}
                        />
                        <input
                          type="text"
                          placeholder="שם משפחה"
                          required
                          value={billingAddress.lastName}
                          onChange={(e) => setBillingAddress({ ...billingAddress, lastName: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="כתובת"
                        required
                        value={billingAddress.address1}
                        onChange={(e) => setBillingAddress({ ...billingAddress, address1: e.target.value })}
                        className={inputClass}
                      />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="עיר"
                          required
                          value={billingAddress.city}
                          onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                          className={inputClass}
                        />
                        <input
                          type="text"
                          placeholder="מיקוד"
                          required
                          value={billingAddress.postalCode}
                          onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}
                </section>

              </div>

              {/* Right: Order Summary */}
              <div className="text-right font-sans-custom">
                <div className="bg-card rounded-3xl p-6 boty-shadow sticky top-28">
                  <h2 className="font-serif-custom text-2xl text-foreground mb-6">סיכום הזמנה</h2>

                  <div className="space-y-4 pb-6 border-b border-border/50">
                    {items.length === 0 ? (
                      <p className="text-sm text-muted-foreground">הסל שלך ריק.</p>
                    ) : (
                      items.map((item) => (
                        <div key={item.productId} className="flex gap-3 items-center">
                          <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <p className="text-sm font-medium text-foreground">{formatMoney(item.unitPrice * item.quantity)}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="space-y-3 pt-4 pb-5 border-b border-border/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">סכום ביניים</span>
                      <span>{formatMoney(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-primary">
                        <span>{discountLabel || "הנחה"}</span>
                        <span>-{formatMoney(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">משלוח</span>
                      <span>{shipping === 0 ? "חינם" : formatMoney(shipping)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-5 mb-6">
                    <span className="font-medium">סה״כ</span>
                    <span className="font-serif-custom text-2xl">{formatMoney(total)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-full text-sm font-medium hover:bg-primary/90 disabled:opacity-60 boty-transition boty-shadow"
                  >
                    {isSubmitting ? "מעבד..." : "בצע הזמנה"}
                  </button>

                  <p className="text-[10px] text-muted-foreground text-center mt-4">
                    בלחיצה על בצע הזמנה, אתם מסכימים ל
                    <Link href="/" className="underline">תנאי השימוש</Link> ו
                    <Link href="/" className="underline">מדיניות הפרטיות</Link>.
                  </p>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
