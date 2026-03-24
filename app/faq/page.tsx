"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Minus, ArrowRight, Search } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

const categories = [
  { id: "orders", label: "Orders & Shipping" },
  { id: "products", label: "Products" },
  { id: "returns", label: "Returns & Refunds" },
  { id: "account", label: "Account & Loyalty" },
  { id: "ingredients", label: "Ingredients" },
]

const faqs: Record<string, { q: string; a: string }[]> = {
  orders: [
    {
      q: "How long does shipping take?",
      a: "Standard shipping takes 3–5 business days within the US and 7–14 business days internationally. Expedited shipping (1–2 days) is available at checkout for US orders.",
    },
    {
      q: "Do you offer free shipping?",
      a: "Yes! Orders over $50 qualify for free standard shipping within the US. International orders over $100 also receive a shipping discount at checkout.",
    },
    {
      q: "Can I change or cancel my order?",
      a: "Orders can be modified or cancelled within 2 hours of placement. After that, the order enters our fulfilment queue and changes may not be possible. Please contact us immediately at hello@boty.com.",
    },
    {
      q: "Do you ship internationally?",
      a: "We ship to over 40 countries worldwide. Duties and taxes may apply depending on your location and are the responsibility of the customer. Visit our Shipping page for the full list of countries.",
    },
    {
      q: "How do I track my order?",
      a: "Once your order ships, you'll receive a confirmation email with a tracking link. If you haven't received it within 48 hours, check your spam folder or contact our support team.",
    },
  ],
  products: [
    {
      q: "Are Boty products vegan?",
      a: "Yes — every product in our range is 100% vegan and certified cruelty-free by Leaping Bunny. We never use animal-derived ingredients or test on animals at any stage.",
    },
    {
      q: "Are your products suitable for sensitive skin?",
      a: "All Boty formulas are dermatologist-tested and free from synthetic fragrances, parabens, sulfates, and alcohol. They're designed to work well on sensitive and reactive skin types. As always, we recommend doing a 24-hour patch test before first use.",
    },
    {
      q: "How should I store my products?",
      a: "Store all products in a cool, dry place away from direct sunlight. Some serums and oils benefit from refrigeration, particularly after opening. Check each product's label for specific guidance.",
    },
    {
      q: "What is the shelf life of your products?",
      a: "Unopened products are best used within 24 months of manufacture. Once opened, most products are effective for 6–12 months, indicated by the Period After Opening (PAO) symbol on the packaging.",
    },
    {
      q: "Can I use Boty products during pregnancy?",
      a: "Most of our products are pregnancy-safe, however we recommend consulting your healthcare provider before introducing new skincare during pregnancy or breastfeeding. Our Vitamin C Serum and Retinol alternatives contain botanicals that are considered safe, but professional guidance is always advised.",
    },
  ],
  returns: [
    {
      q: "What is your return policy?",
      a: "We accept returns within 30 days of delivery, provided items are unused and in their original packaging. If a product causes a skin reaction, we'll accept it used — your skin's wellbeing is our priority.",
    },
    {
      q: "How do I start a return?",
      a: "Email hello@boty.com with your order number and reason for return. We'll send you a prepaid return label and process your refund or exchange within 3 business days of receiving the item.",
    },
    {
      q: "When will I receive my refund?",
      a: "Refunds are processed to your original payment method within 5–7 business days of us receiving the returned item. Depending on your bank, it may take an additional 3–5 days to appear in your account.",
    },
    {
      q: "Can I exchange a product instead of returning it?",
      a: "Absolutely. You can exchange for any product of equal or lesser value, or top up the difference for a higher-priced item. Just mention your preferred exchange in your return email.",
    },
  ],
  account: [
    {
      q: "Do you have a loyalty program?",
      a: "Yes! The Boty Ritual Club rewards you with points on every purchase. 1 point per $1 spent, redeemable for discounts, early access to new launches, and exclusive members-only bundles.",
    },
    {
      q: "How do I reset my password?",
      a: "Click 'Forgot Password' on the sign-in page and enter your email address. You'll receive a reset link within a few minutes. If it doesn't arrive, check your spam folder.",
    },
    {
      q: "Can I subscribe for regular deliveries?",
      a: "Yes — our Subscribe & Save program lets you set a delivery cadence (every 4, 6, or 8 weeks) and save 15% on every order. You can pause, skip, or cancel anytime from your account dashboard.",
    },
  ],
  ingredients: [
    {
      q: "Where do you source your ingredients?",
      a: "We source exclusively from certified fair-trade and organic suppliers across France, Morocco, New Zealand, and Japan. Each ingredient is traceable to its origin farm or cooperative.",
    },
    {
      q: "Are your products free from common irritants?",
      a: "Yes. All formulas are free from parabens, sulfates, synthetic fragrances, artificial dyes, mineral oils, silicones, and PEGs. We maintain a strict 'never list' of over 1,300 ingredients we refuse to use.",
    },
    {
      q: "Do any products contain essential oils?",
      a: "A small number of our products contain diluted essential oils at safe cosmetic concentrations. These are clearly labeled. If you have a known sensitivity, check the full ingredient list on each product page or contact us for guidance.",
    },
  ],
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left boty-transition hover:text-primary group"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-foreground group-hover:text-primary boty-transition leading-relaxed">
          {question}
        </span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
          {open ? (
            <Minus className="w-3 h-3 text-primary" />
          ) : (
            <Plus className="w-3 h-3 text-primary" />
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden boty-transition ${open ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-sm text-muted-foreground leading-relaxed pr-10">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("orders")
  const [search, setSearch] = useState("")

  const filtered = search.trim()
    ? Object.values(faqs)
        .flat()
        .filter(
          (faq) =>
            faq.q.toLowerCase().includes(search.toLowerCase()) ||
            faq.a.toLowerCase().includes(search.toLowerCase())
        )
    : faqs[activeCategory] || []

  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="pt-36 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block animate-blur-in">
              Help Center
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight text-balance animate-blur-in" style={{ animationDelay: "0.15s" }}>
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed animate-blur-in" style={{ animationDelay: "0.3s" }}>
              Can't find what you're looking for? Reach us at{" "}
              <a href="mailto:hello@boty.com" className="text-primary hover:underline">
                hello@boty.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="pb-6 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-11 pr-5 py-4 rounded-full bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring boty-transition boty-shadow"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[240px_1fr] gap-10 xl:gap-16">

            {/* Category Sidebar */}
            {!search && (
              <nav className="flex flex-row lg:flex-col gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-left px-4 py-3 rounded-full text-sm boty-transition ${
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground boty-shadow"
                        : "text-muted-foreground hover:text-foreground hover:bg-card"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Questions */}
            <div className={!search ? "" : "lg:col-span-2"}>
              {search && (
                <p className="text-sm text-muted-foreground mb-4">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
                </p>
              )}
              {filtered.length === 0 ? (
                <div className="py-16 text-center bg-card rounded-3xl boty-shadow">
                  <p className="text-muted-foreground mb-4">No results found.</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm hover:bg-primary/90 boty-transition"
                  >
                    Contact Support
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="bg-card rounded-3xl px-6 md:px-8 boty-shadow">
                  {filtered.map((faq) => (
                    <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              )}

              {/* Still need help */}
              {!search && (
                <div className="mt-8 p-6 rounded-3xl bg-primary/5 border border-primary/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground text-sm">Still have questions?</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Our team is here to help, Mon–Fri 9am–6pm CET.</p>
                  </div>
                  <Link
                    href="/contact"
                    className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm hover:bg-primary/90 boty-transition boty-shadow"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
