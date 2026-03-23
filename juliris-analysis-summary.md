# Juliris — Repository Analysis Summary

## Repository Overview

- **Location:** `/home/user/workspace/juliris-4ef4f243`
- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Current Brand:** "Boty — Natural Skincare" (English, LTR)
- **Target Brand:** "Juliris — תכשיטים" (Hebrew, RTL)
- **Branch:** `main` (single commit: `b611afd`)

## File Structure (Key Files)

```
app/
  layout.tsx          — Root Layout: lang="en", DM Sans + Playfair Display fonts, CartProvider
  page.tsx            — Homepage: assembles Hero, TrustBadges, ProductGrid, FeatureSection,
                        Testimonials, CTABanner, Newsletter, Footer
  globals.css         — Theme: warm earth palette (#F7F4EF cream, #4F5B3A olive, etc.),
                        animations (blur-in, scale-fade-in), custom shadows
  shop/page.tsx       — Shop page: 14 hardcoded skincare products, category filtering
  product/[id]/page.tsx — Product detail: 4 products with full INCI lists, sizes in ml

components/boty/
  header.tsx          — Glassmorphic fixed nav: "Boty" logo, Shop/About/Ingredients links, cart badge
  hero.tsx            — Full-screen video hero: "Glow gently. Naturally you.", Vercel Blob video
  product-grid.tsx    — 12 products in 3 categories (Cream/Oil/Serum), segmented control filter
  footer.tsx          — 3-column footer: Shop/About/Support links, social links → x.com/Kerroudjm
  feature-section.tsx — Bento grid: 3 Vercel Blob videos, "100% Plant-Based", feature cards
  testimonials.tsx    — 9 testimonials from US cities, 3-column auto-scroll
  cta-banner.tsx      — CTA banner: "100% Natural / 100% You"
  trust-badges.tsx    — 4 badges: Organic/Natural/Clean/Vegan (skincare-specific)
  newsletter.tsx      — Email form: "Join the ritual"
  cart-context.tsx    — React Context: addItem, removeItem, updateQuantity, clearCart
  cart-drawer.tsx     — Right-slide drawer (Vaul): item list, quantity controls, $0 shipping

components/ui/        — 57 shadcn/ui components (unchanged)
public/images/        — Skincare product images (PNG/JPG), hero model photo
```

## What Needs to Change

### Must Replace
- **All English text** → Hebrew (every component has hardcoded English strings)
- **All product data** → Jewelry products (names, descriptions, prices in ₪, categories)
- **Categories** → טבעות, עגילים, שרשראות, צמידים, סטיינלס סטיל
- **All images** → Jewelry photography (skincare bottles → rings, necklaces, etc.)
- **Fonts** → Hebrew-supporting fonts (DM Sans/Playfair → Heebo/Frank Ruhl Libre)
- **Currency** → $ → ₪
- **Trust badges** → Jewelry-relevant (shipping, warranty, gift wrap, secure payment)
- **Testimonials** → Israeli names + cities
- **4 Vercel Blob videos** → Jewelry visuals or static images

### Must Add (Not in Repo)
- `lang="he" dir="rtl"` on `<html>`
- RTL CSS rules and spacing fixes (mr→ms, left→right, etc.)
- Cart drawer direction change (right→left for RTL)
- Checkout page (doesn't exist)
- YaadPay integration (no payment code exists)
- Database (all data is hardcoded in components)
- `package.json`, `next.config.ts`, `tsconfig.json` (missing from repo)
- SEO: Open Graph, Hebrew keywords, locale

### Can Keep
- shadcn/ui components (57 primitives)
- Color palette (warm earth tones work for jewelry)
- Animation system (blur-in, scale-fade-in, IntersectionObserver)
- Cart Context API structure
- App Router architecture
- Component composition pattern

## Missing from Repo
| Missing | Impact |
|---------|--------|
| `package.json` | Cannot install dependencies or build |
| `next.config.ts` | No build configuration |
| `tsconfig.json` | No TypeScript config |
| Checkout page | No path from cart to payment |
| Payment integration | No YaadPay or any gateway |
| Database | All products hardcoded — need Prisma + MySQL |
| "HTML suggestion page and copy" folder | Referenced by user as `C:\juliris\...` — not in repo |

## Documents Produced

1. **`/home/user/workspace/juliris-theme-conversion-guide.md`** — File-by-file conversion guide in Hebrew covering all components, RTL instructions, Hebrew copy examples, brand voice direction, stable requirements, and implementation order.

2. **`/home/user/workspace/juliris-nextjs-yaadpay-spec.md`** — Full technical spec in Hebrew covering Hostinger architecture, routes plan, Prisma DB schema (products/orders/payments), YaadPay redirect flow with Mermaid diagram, TypeScript route handlers, SHA256 signature handling, callback validation, idempotency, error scenarios, and POC rollout order.
