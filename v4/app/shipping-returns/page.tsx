import Link from "next/link"
import { Truck, RotateCcw, Globe, Clock, Package, ShieldCheck, ArrowRight } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

const shippingRates = [
  {
    region: "United States",
    methods: [
      { name: "Standard Shipping", time: "3–5 business days", cost: "$6.99", note: "Free on orders over $50" },
      { name: "Expedited Shipping", time: "1–2 business days", cost: "$14.99", note: "" },
      { name: "Express Overnight", time: "Next business day", cost: "$24.99", note: "Order by 12pm EST" },
    ],
  },
  {
    region: "Canada",
    methods: [
      { name: "Standard International", time: "7–12 business days", cost: "$12.99", note: "Free on orders over $100" },
      { name: "Expedited International", time: "3–5 business days", cost: "$24.99", note: "" },
    ],
  },
  {
    region: "Europe",
    methods: [
      { name: "Standard International", time: "5–10 business days", cost: "$9.99", note: "Free on orders over $100" },
      { name: "Expedited International", time: "2–4 business days", cost: "$19.99", note: "" },
    ],
  },
  {
    region: "Rest of World",
    methods: [
      { name: "Standard International", time: "10–21 business days", cost: "$15.99", note: "" },
      { name: "Expedited International", time: "5–10 business days", cost: "$29.99", note: "" },
    ],
  },
]

const returnSteps = [
  {
    step: "01",
    title: "Initiate Your Return",
    description:
      "Email hello@boty.com with your order number and reason for return. If you received a defective item or had a skin reaction, include a brief description.",
  },
  {
    step: "02",
    title: "Receive Your Label",
    description:
      "Within 24 hours we'll send you a prepaid return shipping label (US) or return instructions (international). Pack the item securely in its original packaging.",
  },
  {
    step: "03",
    title: "Ship It Back",
    description:
      "Drop your package at any post office or carrier location. For US returns, we cover the shipping cost. International return shipping costs are the customer's responsibility.",
  },
  {
    step: "04",
    title: "Get Your Refund",
    description:
      "Once we receive and inspect the returned item (1–2 business days), we process your refund or exchange. Refunds appear on your original payment method within 5–7 business days.",
  },
]

const policies = [
  {
    icon: RotateCcw,
    title: "30-Day Return Window",
    body: "Unused items in original packaging may be returned within 30 days of the delivery date.",
  },
  {
    icon: ShieldCheck,
    title: "Skin Reaction Guarantee",
    body: "If a product causes irritation, we'll accept it used. Your skin's wellbeing comes first — always.",
  },
  {
    icon: Package,
    title: "Defective Items",
    body: "Received something damaged or incorrect? Contact us within 7 days and we'll send a replacement at no cost.",
  },
  {
    icon: Globe,
    title: "International Returns",
    body: "We accept international returns, however return shipping costs are the responsibility of the customer unless the item is defective.",
  },
]

const excluded = [
  "Gift cards and digital products",
  "Products that have been opened (unless defective or caused a skin reaction)",
  "Items purchased from third-party retailers (please contact the retailer directly)",
  "Orders returned after the 30-day window without prior approval",
]

export default function ShippingReturnsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="pt-36 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Policies
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight text-balance">
              Shipping &amp; Returns
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Everything you need to know about how we get your products to you — and what
              to do if something isn't right.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Free Shipping", sub: "US orders over $50" },
              { icon: Clock, label: "Ships in 24h", sub: "Mon–Fri cutoff 12pm EST" },
              { icon: RotateCcw, label: "30-Day Returns", sub: "Hassle-free policy" },
              { icon: Globe, label: "40+ Countries", sub: "Worldwide delivery" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 p-6 bg-card rounded-3xl boty-shadow text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-3 block">
              Delivery
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
              Shipping rates &amp; timelines
            </h2>
          </div>

          <div className="space-y-6">
            {shippingRates.map((region) => (
              <div key={region.region} className="bg-background rounded-3xl overflow-hidden boty-shadow">
                <div className="px-6 py-4 bg-primary/5 border-b border-border/40">
                  <h3 className="font-medium text-foreground text-sm tracking-wide">{region.region}</h3>
                </div>
                <div className="divide-y divide-border/40">
                  {region.methods.map((method) => (
                    <div
                      key={method.name}
                      className="px-6 py-4 grid sm:grid-cols-[1fr_160px_140px] gap-2 sm:gap-4 items-center"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{method.name}</p>
                        {method.note && (
                          <p className="text-xs text-primary mt-0.5">{method.note}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        {method.time}
                      </div>
                      <div className="text-sm font-medium text-foreground sm:text-right">
                        {method.cost}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 bg-primary/5 border border-primary/15 rounded-2xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Please note: </span>
              Delivery times are estimates and begin once your order is dispatched, not at the time of placement.
              International orders may be subject to customs duties and taxes, which are the responsibility of the recipient.
              Boty is not liable for delays caused by customs processing.
            </p>
          </div>
        </div>
      </section>

      {/* Returns Policy Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-3 block">
              Our Guarantee
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
              Returns &amp; refunds
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {policies.map((p) => (
              <div key={p.title} className="p-6 bg-card rounded-3xl boty-shadow">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground text-sm mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-8">How to return an item</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnSteps.map((s) => (
                <div key={s.step} className="relative">
                  <span className="font-serif text-5xl text-primary/15 block mb-3 leading-none">
                    {s.step}
                  </span>
                  <h4 className="font-medium text-foreground text-sm mb-2">{s.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Returnable Items */}
          <div className="bg-card rounded-3xl p-6 md:p-8 boty-shadow">
            <h3 className="font-medium text-foreground mb-5">Items Not Eligible for Return</h3>
            <ul className="space-y-3">
              {excluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl text-primary-foreground text-balance">
              Questions about your order?
            </h2>
            <p className="text-primary-foreground/70 mt-2 text-sm">
              Our support team replies within 24 hours, Mon–Fri.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-full text-sm tracking-wide hover:bg-primary-foreground/90 boty-transition boty-shadow"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-full text-sm tracking-wide hover:bg-primary-foreground/10 boty-transition"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
