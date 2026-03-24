"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Leaf, Recycle, Globe, Flower2, Heart, Award, Users, ArrowRight } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

const values = [
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "Every ingredient we use is plant-derived and free from synthetic chemicals, parabens, and artificial fragrances.",
  },
  {
    icon: Recycle,
    title: "Sustainably Packaged",
    description:
      "Our packaging is recyclable or biodegradable by design. We're working toward 100% plastic-free by 2026.",
  },
  {
    icon: Globe,
    title: "Ethically Sourced",
    description:
      "We partner only with fair-trade certified suppliers who share our commitment to people and the planet.",
  },
  {
    icon: Heart,
    title: "Cruelty-Free",
    description:
      "Never tested on animals — ever. Certified by Leaping Bunny and proudly vegan across our entire range.",
  },
  {
    icon: Award,
    title: "Dermatologist Tested",
    description:
      "Formulated with clinical guidance and tested on all skin types, including sensitive and reactive skin.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "1% of every sale is donated to reforestation initiatives and women-led farming cooperatives worldwide.",
  },
]

const team = [
  {
    name: "Alix Morin",
    role: "Founder & Formulator",
    bio: "A former cosmetic chemist turned clean beauty advocate. Alix spent 12 years in the industry before founding Boty to prove that efficacy and ethics aren't mutually exclusive.",
    image: "/images/hero-model.jpg",
  },
  {
    name: "Théo Durand",
    role: "Head of Sustainability",
    bio: "With a background in environmental science, Théo leads Boty's circular packaging program and ingredient sourcing audits across our global supplier network.",
    image: "/images/bento-skin-model.jpg",
  },
  {
    name: "Lena Voss",
    role: "Chief Skin Scientist",
    bio: "Lena holds a PhD in dermatology and oversees every new formulation, ensuring each product is clinically sound and skin-microbiome friendly.",
    image: "/images/skincare-ritual.jpg",
  },
]

const milestones = [
  { year: "2018", event: "Boty founded in Lyon, France, with a single face oil." },
  { year: "2020", event: "Launched into 12 countries. Joined the Leaping Bunny program." },
  { year: "2022", event: "Reformulated entire range with 100% biodegradable actives." },
  { year: "2023", event: "Reached 500,000 customers. Planted 1 million trees." },
  { year: "2025", event: "Carbon neutral across all operations and shipping." },
]

function useInView(threshold = 0.15) {
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

export default function AboutPage() {
  const valuesInView = useInView()
  const timelineInView = useInView()
  const teamInView = useInView()

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-36 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-blur-in">
              <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
                Our Story
              </span>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6 text-balance">
                Beauty rooted in nature.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Boty was born from a simple frustration: why should effective skincare
                come at the cost of the planet? We set out to prove it doesn't have to.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide hover:bg-primary/90 boty-transition boty-shadow"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative h-[520px] rounded-3xl overflow-hidden boty-shadow animate-scale-fade-in">
              <Image
                src="/images/skincare-ritual.jpg"
                alt="Boty skincare ritual"
                fill
                className="object-cover"
              />
              {/* Floating stat card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-5 boty-shadow">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="font-serif text-2xl text-foreground">500k+</p>
                    <p className="text-xs text-muted-foreground mt-1">Happy Customers</p>
                  </div>
                  <div className="text-center border-x border-border/50">
                    <p className="font-serif text-2xl text-foreground">1M+</p>
                    <p className="text-xs text-muted-foreground mt-1">Trees Planted</p>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-2xl text-foreground">100%</p>
                    <p className="text-xs text-muted-foreground mt-1">Natural</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Strip */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-foreground leading-relaxed text-balance max-w-3xl mx-auto">
            "We believe skincare should be a gentle ritual — not a complicated routine packed with things your skin doesn't need."
          </p>
          <p className="mt-4 text-sm tracking-[0.3em] uppercase text-primary-foreground/60">
            Alix Morin, Founder
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-3 block">
              What We Stand For
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
              Our commitments
            </h2>
          </div>
          <div
            ref={valuesInView.ref}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((value, i) => (
              <div
                key={value.title}
                className={`p-7 bg-card rounded-3xl boty-shadow boty-transition hover:scale-[1.02] transition-all duration-700 ease-out ${
                  valuesInView.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground text-base mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-3 block">
              Since 2018
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
              Our journey so far
            </h2>
          </div>
          <div
            ref={timelineInView.ref}
            className="relative max-w-2xl mx-auto"
          >
            {/* Vertical line */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-border/60 hidden sm:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-start gap-6 transition-all duration-700 ease-out ${
                    timelineInView.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="relative z-10 flex-shrink-0 w-[72px] flex justify-center">
                    <span className="font-serif text-lg text-primary bg-card px-1">{m.year}</span>
                  </div>
                  <div className="flex items-start gap-4 pb-8 border-b border-border/40 flex-1 last:border-0 last:pb-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <p className="text-foreground text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-3 block">
              The People Behind Boty
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
              Meet the team
            </h2>
          </div>
          <div
            ref={teamInView.ref}
            className="grid md:grid-cols-3 gap-8"
          >
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`group transition-all duration-700 ease-out ${
                  teamInView.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative h-80 rounded-3xl overflow-hidden boty-shadow mb-5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 boty-transition"
                  />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-0.5">{member.name}</h3>
                <p className="text-xs tracking-[0.2em] uppercase text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-balance">
            Ready to start your ritual?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Explore our collection of natural, science-backed formulas built for every skin type.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide hover:bg-primary/90 boty-transition boty-shadow"
            >
              Shop All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-border text-foreground px-8 py-4 rounded-full text-sm tracking-wide hover:bg-muted boty-transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
