import Link from "next/link"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

const sections = [
  {
    id: "information",
    title: "1. Information We Collect",
    content: [
      {
        heading: "Information You Provide",
        body: "When you create an account, place an order, subscribe to our newsletter, or contact us, we collect personal information such as your name, email address, shipping address, phone number, and payment information. Payment data is processed securely by our payment provider and is never stored on our servers.",
      },
      {
        heading: "Information Collected Automatically",
        body: "When you browse our website, we automatically collect certain technical information including your IP address, browser type, device identifiers, pages visited, referring URLs, and the date and time of your visit. This information is collected through cookies and similar tracking technologies.",
      },
    ],
  },
  {
    id: "use",
    title: "2. How We Use Your Information",
    content: [
      {
        heading: "To Fulfil Your Orders",
        body: "We use your personal information to process and ship your orders, send order confirmations and tracking updates, and handle returns and refunds.",
      },
      {
        heading: "To Communicate With You",
        body: "With your consent, we send you promotional emails about new products, special offers, and other updates. You can opt out at any time by clicking the unsubscribe link in any email or contacting us directly.",
      },
      {
        heading: "To Improve Our Services",
        body: "Aggregated and anonymised data helps us understand how customers interact with our website, allowing us to improve our product offerings, website experience, and customer service.",
      },
    ],
  },
  {
    id: "sharing",
    title: "3. Sharing Your Information",
    content: [
      {
        heading: "We Do Not Sell Your Data",
        body: "Boty does not sell, trade, or rent your personal information to third parties. Full stop.",
      },
      {
        heading: "Service Providers",
        body: "We share your information only with trusted third-party service providers who assist us in operating our website and fulfilling orders — including shipping carriers, payment processors, and email service providers. These partners are contractually obligated to keep your data secure and to use it only for the specific services they provide to us.",
      },
      {
        heading: "Legal Requirements",
        body: "We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).",
      },
    ],
  },
  {
    id: "cookies",
    title: "4. Cookies & Tracking",
    content: [
      {
        heading: "What Are Cookies?",
        body: "Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, keep you signed in, and understand how you use our site.",
      },
      {
        heading: "Types of Cookies We Use",
        body: "Essential cookies are required for the website to function (e.g., shopping cart). Analytics cookies help us understand website usage patterns. Marketing cookies allow us to show you relevant advertising on other platforms. You can control cookie preferences through your browser settings or our cookie consent banner.",
      },
    ],
  },
  {
    id: "rights",
    title: "5. Your Rights",
    content: [
      {
        heading: "Access, Correction & Deletion",
        body: "You have the right to access the personal information we hold about you, request corrections, and request deletion of your data (subject to certain legal exceptions). To exercise these rights, contact us at privacy@boty.com.",
      },
      {
        heading: "Data Portability",
        body: "You have the right to request a copy of your personal data in a structured, machine-readable format.",
      },
      {
        heading: "Withdrawing Consent",
        body: "Where we rely on your consent to process your data, you may withdraw it at any time. This will not affect the lawfulness of processing before your withdrawal.",
      },
    ],
  },
  {
    id: "security",
    title: "6. Data Security",
    content: [
      {
        heading: "How We Protect Your Data",
        body: "We implement industry-standard security measures including SSL/TLS encryption for all data transmissions, encrypted storage for sensitive information, regular security audits, and restricted access controls. No method of transmission over the internet is 100% secure, but we are committed to using commercially reasonable means to protect your data.",
      },
    ],
  },
  {
    id: "retention",
    title: "7. Data Retention",
    content: [
      {
        heading: "How Long We Keep Your Data",
        body: "We retain personal information for as long as necessary to fulfil the purposes for which it was collected, including legal, accounting, or reporting requirements. For customers, this is typically 7 years from the date of your last transaction, in line with financial record-keeping obligations. You may request earlier deletion of non-essential data at any time.",
      },
    ],
  },
  {
    id: "international",
    title: "8. International Transfers",
    content: [
      {
        heading: "Cross-Border Data Transfers",
        body: "Boty is based in France and primarily processes data within the European Economic Area (EEA). If data is transferred outside the EEA, we ensure appropriate safeguards are in place in compliance with GDPR, including Standard Contractual Clauses (SCCs) approved by the European Commission.",
      },
    ],
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: [
      {
        heading: "Policy Updates",
        body: "We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email or by displaying a prominent notice on our website before the changes become effective. We encourage you to review this policy periodically.",
      },
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: [
      {
        heading: "Data Controller",
        body: "Boty SAS is the data controller responsible for your personal information. If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at privacy@boty.com or write to us at: Boty SAS, 12 Rue des Fleurs, Lyon 69001, France.",
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="pt-36 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Legal
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground leading-tight text-balance">
              Privacy Policy
            </h1>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Last updated: March 24, 2026. This policy describes how Boty SAS collects, uses,
              and protects your personal information when you use our website and services.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 xl:gap-20">

            {/* Sticky Table of Contents */}
            <nav className="hidden lg:block">
              <div className="sticky top-28 bg-card rounded-3xl p-5 boty-shadow">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Contents
                </p>
                <ul className="space-y-1">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-xs text-muted-foreground hover:text-primary boty-transition py-1.5 px-2 rounded-lg hover:bg-background"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Policy Body */}
            <div className="space-y-12">
              {/* Intro */}
              <div className="p-6 bg-primary/5 border border-primary/15 rounded-3xl">
                <p className="text-sm text-foreground leading-relaxed">
                  At Boty, your privacy matters to us as much as the quality of our products. This
                  policy is written in plain language — no legalese. We want you to know exactly
                  what we do with your data and why. If something is unclear, please{" "}
                  <Link href="/contact" className="text-primary underline underline-offset-2">
                    reach out
                  </Link>
                  .
                </p>
              </div>

              {sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="font-serif text-2xl text-foreground mb-6 pb-3 border-b border-border/50">
                    {section.title}
                  </h2>
                  <div className="space-y-5">
                    {section.content.map((item) => (
                      <div key={item.heading}>
                        <h3 className="text-sm font-semibold text-foreground mb-2">
                          {item.heading}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Related Links */}
              <div className="pt-6 border-t border-border/50 flex flex-wrap gap-4">
                <Link
                  href="/shipping-returns"
                  className="text-sm text-primary hover:underline underline-offset-2"
                >
                  Shipping & Returns Policy
                </Link>
                <span className="text-border">|</span>
                <Link
                  href="/contact"
                  className="text-sm text-primary hover:underline underline-offset-2"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
