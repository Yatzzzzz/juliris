"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  User,
  Package,
  MapPin,
  ChevronRight,
  Edit3,
  Plus,
  Star,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

type Tab = "profile" | "orders" | "addresses"

const orders = [
  {
    id: "BTY-2025-0042",
    date: "March 18, 2025",
    status: "delivered",
    total: 136,
    items: [
      { name: "Radiance Serum", qty: 1, price: 68, image: "/images/products/serum-bottles-1.png" },
      { name: "Night Cream", qty: 1, price: 64, image: "/images/products/jars-wooden-lid.png" },
    ],
  },
  {
    id: "BTY-2025-0031",
    date: "February 28, 2025",
    status: "shipped",
    total: 72,
    items: [
      { name: "Renewal Oil", qty: 1, price: 72, image: "/images/products/amber-dropper-bottles.png" },
    ],
  },
  {
    id: "BTY-2025-0018",
    date: "January 14, 2025",
    status: "delivered",
    total: 96,
    items: [
      { name: "Hydrating Serum", qty: 1, price: 62, image: "/images/products/eye-serum-bottles.png" },
      { name: "Balance Toner", qty: 1, price: 32, image: "/images/products/toner.jpg" },
    ],
  },
]

const addresses = [
  {
    id: 1,
    label: "Home",
    default: true,
    name: "Sophie Martin",
    line1: "14 Rue des Fleurs",
    line2: "Apt 3B",
    city: "Paris",
    postcode: "75006",
    country: "France",
  },
  {
    id: 2,
    label: "Work",
    default: false,
    name: "Sophie Martin",
    line1: "28 Avenue Montaigne",
    line2: "",
    city: "Paris",
    postcode: "75008",
    country: "France",
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  delivered: { label: "Delivered", color: "text-primary bg-primary/10", icon: CheckCircle2 },
  shipped: { label: "Shipped", color: "text-amber-700 bg-amber-50", icon: Truck },
  processing: { label: "Processing", color: "text-blue-700 bg-blue-50", icon: Clock },
}

function useInView(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => { if (ref.current) observer.unobserve(ref.current) }
  }, [threshold])
  return { ref, isVisible }
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const [editMode, setEditMode] = useState(false)
  const heroInView = useInView()

  const tabs: { value: Tab; label: string; icon: typeof User }[] = [
    { value: "profile", label: "Profile", icon: User },
    { value: "orders", label: "Orders", icon: Package },
    { value: "addresses", label: "Addresses", icon: MapPin },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="pt-36 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            ref={heroInView.ref}
            className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 transition-all duration-700 ${
              heroInView.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div>
              <span className="text-sm tracking-[0.3em] uppercase text-primary mb-3 block">
                My Account
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
                Welcome back, Sophie
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Member since January 2024
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <nav className="bg-card rounded-3xl p-3 boty-shadow">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveTab(tab.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium text-left boty-transition ${
                      activeTab === tab.value
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:text-foreground hover:bg-background"
                    }`}
                  >
                    <tab.icon className="w-4 h-4 flex-shrink-0" />
                    {tab.label}
                    {activeTab === tab.value && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                ))}

                <div className="mt-3 pt-3 border-t border-border/50">
                  <Link
                    href="/"
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm text-muted-foreground hover:text-foreground hover:bg-background boty-transition"
                  >
                    Sign Out
                  </Link>
                </div>
              </nav>

              {/* Loyalty card */}
              <div className="mt-4 bg-primary rounded-3xl p-5 boty-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-primary-foreground/80" />
                  <span className="text-xs tracking-[0.2em] uppercase text-primary-foreground/70">
                    Boty Rewards
                  </span>
                </div>
                <p className="font-serif text-3xl text-primary-foreground mb-1">420 pts</p>
                <p className="text-xs text-primary-foreground/60 mb-4">80 pts until next reward</p>
                <div className="h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-foreground rounded-full" style={{ width: "84%" }} />
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  {/* Avatar + name */}
                  <div className="bg-card rounded-3xl p-7 boty-shadow flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-muted boty-shadow">
                      <Image
                        src="/images/hero-model.jpg"
                        alt="Profile photo"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        className="absolute inset-0 bg-foreground/20 flex items-center justify-center opacity-0 hover:opacity-100 boty-transition"
                        aria-label="Change photo"
                      >
                        <Edit3 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-serif text-2xl text-foreground">Sophie Martin</h2>
                      <p className="text-sm text-muted-foreground">sophie.martin@example.com</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditMode(!editMode)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm boty-transition border ${
                        editMode
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      {editMode ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>

                  {/* Personal Info */}
                  <div className="bg-card rounded-3xl p-7 boty-shadow">
                    <h3 className="font-medium text-foreground mb-5">Personal Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: "First Name", value: "Sophie" },
                        { label: "Last Name", value: "Martin" },
                        { label: "Email Address", value: "sophie.martin@example.com" },
                        { label: "Phone", value: "+33 6 12 34 56 78" },
                        { label: "Date of Birth", value: "April 12, 1990" },
                        { label: "Skin Type", value: "Combination" },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
                            {field.label}
                          </label>
                          {editMode ? (
                            <input
                              type="text"
                              defaultValue={field.value}
                              className="w-full px-4 py-3 bg-background border border-border rounded-2xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring boty-transition"
                            />
                          ) : (
                            <p className="text-sm text-foreground py-3">{field.value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="bg-card rounded-3xl p-7 boty-shadow">
                    <h3 className="font-medium text-foreground mb-5">Communication Preferences</h3>
                    <div className="space-y-4">
                      {[
                        { label: "Order updates & tracking", sublabel: "Get notified about your deliveries", enabled: true },
                        { label: "New arrivals & launches", sublabel: "Be the first to know about new products", enabled: true },
                        { label: "Exclusive offers & sales", sublabel: "Personalised deals and member pricing", enabled: false },
                        { label: "Skincare tips & content", sublabel: "Monthly rituals and expert guides", enabled: false },
                      ].map((pref) => (
                        <div key={pref.label} className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-foreground">{pref.label}</p>
                            <p className="text-xs text-muted-foreground">{pref.sublabel}</p>
                          </div>
                          <button
                            type="button"
                            className={`w-11 h-6 rounded-full relative boty-transition flex-shrink-0 ${
                              pref.enabled ? "bg-primary" : "bg-border"
                            }`}
                            aria-label={`Toggle ${pref.label}`}
                          >
                            <span
                              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm boty-transition ${
                                pref.enabled ? "right-0.5" : "left-0.5"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security */}
                  <div className="bg-card rounded-3xl p-7 boty-shadow">
                    <h3 className="font-medium text-foreground mb-5">Security</h3>
                    <div className="space-y-3">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-3.5 bg-background rounded-2xl border border-border boty-transition hover:bg-muted"
                      >
                        <span className="text-sm text-foreground">Change Password</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-3.5 bg-background rounded-2xl border border-border boty-transition hover:bg-muted"
                      >
                        <span className="text-sm text-foreground">Two-Factor Authentication</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-serif text-2xl text-foreground">Order History</h2>
                    <span className="text-sm text-muted-foreground">{orders.length} orders</span>
                  </div>

                  {orders.map((order, i) => {
                    const status = statusConfig[order.status]
                    const StatusIcon = status.icon
                    return (
                      <div
                        key={order.id}
                        className={`bg-card rounded-3xl boty-shadow overflow-hidden transition-all duration-500 ease-out ${
                          i < 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: `${i * 80}ms` }}
                      >
                        {/* Order Header */}
                        <div className="px-6 py-4 border-b border-border/50 flex flex-wrap items-center gap-4 justify-between">
                          <div className="flex flex-wrap items-center gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground mb-0.5">Order</p>
                              <p className="text-sm font-medium text-foreground">{order.id}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                              <p className="text-sm text-foreground">{order.date}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-0.5">Total</p>
                              <p className="text-sm font-medium text-foreground">${order.total}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {status.label}
                          </span>
                        </div>

                        {/* Items */}
                        <div className="px-6 py-4 space-y-3">
                          {order.items.map((item) => (
                            <div key={item.name} className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-muted flex-shrink-0 boty-shadow">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={56}
                                  height={56}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                                <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                              </div>
                              <p className="text-sm font-medium text-foreground flex-shrink-0">${item.price}</p>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="px-6 py-4 border-t border-border/50 flex flex-wrap gap-3">
                          <Link
                            href="/shop"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs border border-border text-foreground hover:bg-muted boty-transition"
                          >
                            <Package className="w-3.5 h-3.5" />
                            View Details
                          </Link>
                          {order.status === "delivered" && (
                            <Link
                              href="/shop"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs bg-primary/10 text-primary hover:bg-primary/15 boty-transition"
                            >
                              Reorder
                            </Link>
                          )}
                          {order.status === "delivered" && (
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs border border-border text-foreground hover:bg-muted boty-transition"
                            >
                              <Star className="w-3.5 h-3.5" />
                              Leave Review
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}

                  <div className="text-center pt-4">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm tracking-wide hover:bg-primary/90 boty-transition boty-shadow"
                    >
                      Shop Again
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-serif text-2xl text-foreground">Saved Addresses</h2>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm bg-primary text-primary-foreground hover:bg-primary/90 boty-transition boty-shadow"
                    >
                      <Plus className="w-4 h-4" />
                      Add New
                    </button>
                  </div>

                  {addresses.map((addr, i) => (
                    <div
                      key={addr.id}
                      className={`bg-card rounded-3xl p-6 boty-shadow relative transition-all duration-500 ease-out ${
                        i < 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-foreground text-sm">{addr.label}</p>
                              {addr.default && (
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-foreground">{addr.name}</p>
                            <p className="text-sm text-muted-foreground">{addr.line1}</p>
                            {addr.line2 && (
                              <p className="text-sm text-muted-foreground">{addr.line2}</p>
                            )}
                            <p className="text-sm text-muted-foreground">
                              {addr.city}, {addr.postcode}
                            </p>
                            <p className="text-sm text-muted-foreground">{addr.country}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            type="button"
                            className="p-2 rounded-full border border-border text-foreground/70 hover:text-foreground hover:bg-background boty-transition"
                            aria-label="Edit address"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {!addr.default && (
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <button
                            type="button"
                            className="text-xs text-primary hover:text-primary/80 boty-transition"
                          >
                            Set as default address
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Empty state hint */}
                  <div className="bg-card rounded-3xl p-6 boty-shadow border-2 border-dashed border-border">
                    <button
                      type="button"
                      className="w-full flex flex-col items-center gap-3 py-4 text-muted-foreground hover:text-foreground boty-transition group"
                    >
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 boty-transition">
                        <Plus className="w-4 h-4 group-hover:text-primary boty-transition" />
                      </div>
                      <span className="text-sm">Add a new address</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
