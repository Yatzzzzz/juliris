"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, MapPin, Clock, Instagram, Facebook, Twitter, Send, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@boty.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Our Studio",
    value: "12 Rue des Fleurs, Lyon",
    sub: "France, 69001",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon–Fri, 9am–6pm",
    sub: "CET (Central European Time)",
  },
]

const topics = [
  "General Inquiry",
  "Order Support",
  "Product Question",
  "Wholesale / Press",
  "Partnership",
  "Other",
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    "w-full px-5 py-4 rounded-full bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring boty-transition"

  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="pt-36 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block animate-blur-in">
              Say Hello
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight text-balance animate-blur-in" style={{ animationDelay: "0.15s" }}>
              We'd love to hear from you.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed animate-blur-in" style={{ animationDelay: "0.3s" }}>
              Questions about an order, a product, or just want to say hi?
              Drop us a message and we'll get back to you shortly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20">

            {/* Contact Form */}
            <div className="bg-card rounded-3xl p-8 md:p-10 boty-shadow">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-blur-in">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-serif text-3xl text-foreground mb-3">Message sent!</h2>
                  <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
                    Thank you for reaching out. A member of our team will be in touch within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", topic: "", message: "" }) }}
                    className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-full text-sm hover:bg-muted boty-transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-2xl text-foreground mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs tracking-wide uppercase text-muted-foreground mb-2 block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="text-xs tracking-wide uppercase text-muted-foreground mb-2 block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs tracking-wide uppercase text-muted-foreground mb-2 block">
                        Topic
                      </label>
                      <select
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        required
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select a topic</option>
                        {topics.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs tracking-wide uppercase text-muted-foreground mb-2 block">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        required
                        rows={5}
                        className="w-full px-5 py-4 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring boty-transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-full text-sm tracking-wide hover:bg-primary/90 boty-transition boty-shadow"
                    >
                      Send Message
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="flex flex-col gap-6">

              {/* Contact Info Cards */}
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-6 bg-card rounded-3xl boty-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="p-6 bg-card rounded-3xl boty-shadow">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, label: "Instagram" },
                    { icon: Facebook, label: "Facebook" },
                    { icon: Twitter, label: "Twitter" },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="https://x.com/Kerroudjm"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition boty-shadow"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 bg-card rounded-3xl boty-shadow">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Quick Help
                </p>
                <ul className="space-y-3">
                  {[
                    { label: "View our FAQ", href: "/faq" },
                    { label: "Shipping & Returns policy", href: "/shipping-returns" },
                    { label: "Track your order", href: "/contact" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-foreground hover:text-primary boty-transition flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
