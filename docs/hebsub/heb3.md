Perfect — I checked the next homepage components, and the visible copy you still
need to localize now sits in `trust-badges`, `product-grid`, `feature-section`,
`testimonials`, `cta-banner`, `newsletter`, and `footer`. I’m keeping this
strictly **text-only**, with no design, spacing, layout, animation, or structure
changes. [juliris](https://www.juliris.com)

## Trust badges

`components/boty/trust-badges.tsx` is small and only contains four badge titles
and descriptions, so this one is safest as a full paste replacement with the
exact same structure and classes. [github](https://github.com/reijjo/jazz)

### Replace entire file: `components/boty/trust-badges.tsx`

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Droplets, Flower2, Leaf, Sparkles } from "lucide-react";

const badges = [
  {
    icon: Leaf,
    title: "מתאים לעור רגיש",
    description: "נבחר בקפידה לנוחות יומיומית",
  },
  {
    icon: Droplets,
    title: "חומרים איכותיים",
    description: "דגש על תחושה נעימה לאורך היום",
  },
  {
    icon: Sparkles,
    title: "עיצוב אלגנטי",
    description: "מראה נקי, נשי ועל-זמני",
  },
  {
    icon: Flower2,
    title: "קולקציה נשית",
    description: "תכשיטים עדינים לשגרה וליציאה",
  },
];

export function TrustBadges() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className={`bg-background p-6 lg:p-8 text-center rounded-xl border border-stone-200 transition-all duration-700 ease-out border-none ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <badge.icon
                className="text-primary mb-4 mx-auto size-12"
                strokeWidth={1}
              />
              <h3 className="font-serif text-foreground mb-2 text-2xl">
                {badge.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Product grid

`components/boty/product-grid.tsx` currently has three category pills, a
skincare section title, twelve skincare products, English badge text, a cart
aria-label, dollar-sign prices, and a “View All Products” CTA. I’m not changing
the 3-pill layout in this pass, only the displayed text inside it.
[github](https://github.com/Tomkinen/jatsi)

### Keep structure exactly as-is, and change these strings only

#### Section copy

- `Our Collection` → `הקולקציה שלנו`
- `Gentle essentials` → `פריטים נבחרים`
- `Thoughtfully crafted products for your daily skincare ritual` →
  `תכשיטים היפואלרגניים בעיצוב אלגנטי, שנבחרו לנוחות יומיומית ולעור רגיש.`
- `View All Products` → `לכל המוצרים`
- `aria-label="Add to cart"` → `aria-label="הוספה לסל"`

#### Category pill labels

Keep the internal values (`cream`, `oil`, `serum`) unchanged, but replace the
visible labels only: [github](https://github.com/Tomkinen/jatsi)

- `Cream` → `טבעות`
- `Oil` → `עגילים`
- `Serum` → `שרשראות`

#### Badge logic and badge text

Because the component styles badges by comparing the badge text itself, replace
both the product badge values and the comparison strings.
[github](https://github.com/reijjo/jazz)

- `Bestseller` → `נמכר ביותר`
- `New` → `חדש`
- `Sale` → `מבצע`

And also change:

- `product.badge === "Sale"` → `product.badge === "מבצע"`
- `product.badge === "New"` → `product.badge === "חדש"`

#### Price symbol

Change both visible `$` symbols to `₪`.
[github](https://github.com/Tomkinen/jatsi)

- `${product.price}` line → `₪{product.price}`
- `${product.originalPrice}` line → `₪{product.originalPrice}`

### Replace the product text data

Use these exact replacements inside the `products` array. Keep `id`, `image`,
`price`, `originalPrice`, and `category` keys in place unless explicitly changed
below. [github](https://github.com/reijjo/jazz)

#### Serum group → displayed as שרשראות

- `Radiance Serum` → `שרשרת אלה`
- `Vitamin C brightening formula` → `שרשרת עדינה במראה נקי ואלגנטי ליום יום.`
- `Bestseller` → `נמכר ביותר`

- `Hydrating Serum` → `שרשרת נעם`
- `Hyaluronic acid moisture boost` → `שרשרת נשית בקו מינימליסטי ונוח לענידה.`

- `Age Defense Serum` → `שרשרת יובל`
- `Retinol & peptide complex` → `שרשרת אלגנטית עם נוכחות עדינה ומעודנת.`
- `New` → `חדש`

- `Glow Serum` → `שרשרת דניאל`
- `Niacinamide brightening boost` → `שרשרת יומיומית שמשתלבת בקלות עם כל לוק.`
- `Sale` → `מבצע`

#### Cream group → displayed as טבעות

- `Hydra Cream` → `טבעת נועה`
- `Deep moisture with hyaluronic acid` →
  `טבעת עדינה במראה נקי שמתאימה לשימוש יומיומי.`

- `Gentle Cleanser` → `טבעת ליה`
- `Soothing botanical wash` → `טבעת אלגנטית עם גימור מעודן ונוכחות שקטה.`
- `Sale` → `מבצע`

- `Night Cream` → `טבעת יעל`
- `Restorative overnight treatment` →
  `טבעת נשית ועדינה שמשלימה מראה יומיומי אלגנטי.`
- `Bestseller` → `נמכר ביותר`

- `Day Cream SPF 30` → `טבעת מאיה`
- `Protection & hydration` → `טבעת מינימליסטית ונוחה לענידה לאורך היום.`

#### Oil group → displayed as עגילים

- `Renewal Oil` → `עגילי תמר`
- `Nourishing facial oil blend` → `עגילים היפואלרגניים בעיצוב אלגנטי ונוח.`
- `New` → `חדש`

- `Rosehip Oil` → `עגילי שירה`
- `Pure organic rosehip extract` → `עגילים עדינים שמתאימים למראה יומיומי נקי.`

- `Jojoba Oil` → `עגילי מאי`
- `Balancing & lightweight` → `עגילים קלילים עם מראה נשי ומעודן.`

- `Argan Oil` → `עגילי ליה`
- `Moroccan beauty elixir` → `עגילים אלגנטיים לנשים שמחפשות נוחות ועיצוב עדין.`
- `Bestseller` → `נמכר ביותר`

### One note for this file

The current component only has **three** visible category pills in its design,
so this pass keeps that exact UI and only localizes the labels; we’ll add
`צמידים` and `סטיינלס סטיל` later in a structure pass, not in this text-only
pass. [github](https://github.com/Tomkinen/jatsi)

## Feature section

`components/boty/feature-section.tsx` contains skincare claims across the bento
cards, the video overlay card, the large right image card, the lower-right mini
panel, and the “Why Boty” content block. All of that can be localized without
changing a single class or layout rule. [divmagic](https://divmagic.com)

### Change these exact strings

#### `features` array

- `Eco-Friendly Packaging` → `נוחות יומיומית`
- `Recyclable and biodegradable materials` →
  `תכשיטים שנועדו להרגיש טוב גם לאורך שעות.`

- `100% Natural` → `מתאים לעור רגיש`
- `No synthetic chemicals or parabens` →
  `בחירה מדויקת לנשים שמחפשות ענידה נעימה יותר.`

- `Plant-Based` → `עיצוב אלגנטי`
- `Botanical extracts and essential oils` →
  `קווים נשיים, נקיים ועל-זמניים ליום יום.`

- `Ethical Sourcing` → `משלוח בישראל`
- `Fair trade certified ingredients` → `חוויית קנייה בעברית, לקהל ישראלי בלבד.`

#### Left video overlay card

- `100% Plant-Based` → `היפואלרגני ועדין`
- `Formulated exclusively with botanical ingredients and natural plant extracts.`
  → `עיצובים אלגנטיים עם דגש על נוחות יומיומית והתאמה טובה יותר לעור רגיש.`

#### Top-right image card

- `alt="Natural ingredients"` → `alt="תכשיטי Juliris"`
- `100% Natural` → `עדין על העור`
- `100% You` → `מדויק בשבילך`
- `No Harsh Chemicals` → `מתאים לעור רגיש`
- `Plant-Based Goodness` → `עיצוב נקי ואלגנטי`
- `Ethically Sourced` → `חומרים איכותיים`

#### Bottom-right mini panel

- `Eco-Friendly` → `נוחות יומיומית`
- `Packaging` → `בעיצוב אלגנטי`

#### Bottom content block

- `Why Boty` → `למה Juliris`
- `Care that breathes.` → `תכשיטים שמרגישים נכון.`
- `We believe skincare should be a gentle ritual, not a complicated routine. Every product is crafted with intention and love for your skin.`
  →
  `ב-Juliris אנחנו מאמינות שתכשיט יפה צריך להיות גם נעים לענידה. לכן אנחנו בוחרות עיצובים אלגנטיים עם דגש על תחושה נוחה יותר לעור רגיש ושימוש יומיומי.`

## Testimonials

`components/boty/testimonials.tsx` currently has nine English skincare
testimonials, U.S. city names, skincare product tags, and section titles
`Kind Words` and `Loved by thousands`. The card layout and scrolling behavior
can stay exactly the same while all visible text is replaced.
[divmagic](https://divmagic.com)

### Section header changes

- `Kind Words` → `לקוחות מספרות`
- `Loved by thousands` → `אהוב על לקוחות Juliris`

### Replace the testimonial data

#### Testimonial 1

- `Sarah M.` → `נועה`
- `New York` → `תל אביב`
- `My skin has never felt so soft and nourished. The Radiance Serum is now a permanent part of my morning routine.`
  → `סוף סוף מצאתי תכשיט שנראה עדין ואלגנטי וגם מרגיש נוח לאורך כל היום.`
- `Radiance Serum` → `שרשרת אלה`

#### Testimonial 2

- `Emma L.` → `יעל`
- `Los Angeles` → `חיפה`
- `Finally, skincare that actually feels natural. No more harsh chemicals. My sensitive skin loves Boty products.`
  →
  `העגילים נראים מעולה והכי חשוב — הם לא הכבידו ולא הרגישו מציקים גם אחרי שעות.`
- `Gentle Cleanser` → `עגילי תמר`

#### Testimonial 3

- `Jessica R.` → `מיה`
- `Chicago` → `ירושלים`
- `The Hydra Cream is absolutely divine. It absorbs beautifully and keeps my skin hydrated all day long.`
  → `הטבעת עדינה, יושבת יפה, ומוסיפה בדיוק את הנגיעה האלגנטית שחיפשתי.`
- `Hydra Cream` → `טבעת נועה`

#### Testimonial 4

- `Maria K.` → `שירה`
- `Miami` → `רמת גן`
- `I've tried countless serums but nothing compares to the glow I get from Boty. Absolutely transformative.`
  → `השרשרת קיבלה המון מחמאות. היא נראית יוקרתית אבל עדיין מאוד יומיומית.`
- `Glow Serum` → `שרשרת דניאל`

#### Testimonial 5

- `Sophie T.` → `דניאל`
- `Seattle` → `נתניה`
- `The packaging is beautiful and sustainable. I feel good knowing I'm choosing eco-friendly skincare.`
  → `העיצוב עדין ומוקפד, וכל החוויה מרגישה נשית, נקייה ומדויקת.`
- `Night Cream` → `טבעת יעל`

#### Testimonial 6

- `Anna P.` → `ליאור`
- `Boston` → `ראשון לציון`
- `My acne-prone skin has cleared up since switching to Boty. Natural ingredients really make a difference.`
  → `חיפשתי פריטים שירגישו נוחים יותר לעור רגיש, וזו הייתה בחירה מעולה בשבילי.`
- `Gentle Cleanser` → `עגילי מאי`

#### Testimonial 7

- `Claire B.` → `רוני`
- `Austin` → `הרצליה`
- `The texture of the Renewal Oil is perfection. It absorbs quickly and leaves my skin glowing.`
  → `העגילים קלים, מחמיאים, ומשתלבים כמעט עם כל דבר שאני לובשת.`
- `Renewal Oil` → `עגילי ליה`

#### Testimonial 8

- `Lily W.` → `טל`
- `Portland` → `כפר סבא`
- `I love that Boty is cruelty-free and vegan. Great products that align with my values.`
  →
  `יש ב-Juliris איזון מדויק בין מראה אלגנטי לנוחות אמיתית, וזה בדיוק מה שחיפשתי.`
- `Hydra Cream` → `טבעת ליה`

#### Testimonial 9

- `Rachel D.` → `אור`
- `Denver` → `מודיעין`
- `The scent is so subtle and natural. No overpowering fragrances, just pure botanical goodness.`
  → `אני אוהבת את הקו הנקי ואת התחושה העדינה. זה נראה טוב ומרגיש נכון.`
- `Radiance Serum` → `שרשרת נעם`

## CTA, newsletter, footer

The remaining homepage copy lives in `cta-banner.tsx`, `newsletter.tsx`, and
`footer.tsx`, and all of it can be localized without touching the visual
treatment. In the footer specifically, several links still point to placeholder
URLs or old category query params, so in this pass I’m changing the **display
text only** and leaving the hrefs untouched.
[reddit](https://www.reddit.com/r/singularity/comments/1krb2y9/jules_free_and_available_right_now/)

### Replace entire file: `components/boty/cta-banner.tsx`

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Flower2, Globe, Leaf } from "lucide-react";

export function CTABanner() {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={bannerRef}
          className={`rounded-3xl p-12 md:p-16 flex flex-col justify-center relative overflow-hidden min-h-[400px] transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Image
            src="/images/bf965cf4-e728-4e72-ab1b-16b1cd8f1822.png"
            alt="תכשיטי Juliris"
            fill
            className="object-cover"
          />

          <div className="relative z-10 text-left max-w-2xl">
            <h3 className="text-4xl md:text-5xl text-white mb-4 lg:text-5xl">
              עדין על העור
            </h3>
            <h3 className="text-3xl md:text-4xl lg:text-5xl text-white/70 mb-8">
              אלגנטי בכל יום
            </h3>

            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3 text-white/90">
                <Leaf className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">מתאים לעור רגיש</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Flower2 className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">עיצוב עדין ונשי</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Globe className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">לקהל ישראלי בלבד</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Replace entire file: `components/boty/newsletter.tsx`

```tsx
"use client";

import React from "react";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl leading-tight text-primary-foreground mb-4 text-balance md:text-7xl">
            הישארי מעודכנת
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10">
            הרשמי לקבלת עדכונים על קולקציות חדשות, פריטים נבחרים והטבות מיוחדות.
          </p>

          {isSubscribed
            ? (
              <div className="inline-flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-8 py-4">
                <Check className="w-5 h-5 text-primary-foreground" />
                <span className="text-primary-foreground">
                  נרשמת בהצלחה לעדכונים של Juliris
                </span>
              </div>
            )
            : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="כתובת המייל שלך"
                  className="flex-1 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-6 py-4 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 boty-transition"
                  required
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary-foreground/90"
                >
                  הרשמה
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
                </button>
              </form>
            )}

          <p className="text-sm text-primary-foreground/60 mt-6">
            אפשר להסיר הרשמה בכל שלב.
          </p>
        </div>
      </div>
    </section>
  );
}
```

### Footer string replacements: `components/boty/footer.tsx`

#### Brand area

- `Boty` → `Juliris`
- `Natural skincare for those who believe beauty should feel as good as it looks.`
  →
  `תכשיטים היפואלרגניים לנשים שמחפשות עיצוב אלגנטי, נוחות יומיומית והתאמה טובה יותר לעור רגיש.`
  [github](http://github.com/lilgallon/Yahtzee/actions)

#### Social aria labels

- `Instagram` → `אינסטגרם`
- `Facebook` → `פייסבוק`
- `Twitter` → `X`

#### Section headers

- `Shop` → `חנות`
- `About` → `אודות`
- `Support` → `מידע`

#### Footer links: `shop`

- `All Products` → `כל המוצרים`
- `Serums` → `טבעות`
- `Moisturizers` → `עגילים`
- `Cleansers` → `שרשראות`
- `Gift Sets` → `צמידים`

#### Footer links: `about`

- `Our Story` → `על Juliris`
- `Ingredients` → `סטיינלס סטיל`
- `Sustainability` → `התאמה לעור רגיש`
- `Press` → `קולקציות חדשות`

#### Footer links: `support`

- `Contact Us` → `יצירת קשר`
- `FAQ` → `שאלות נפוצות`
- `Shipping` → `משלוחים`
- `Returns` → `החזרות`

#### Bottom bar

- `© {new Date().getFullYear()} Boty. All rights reserved.` →
  `© {new Date().getFullYear()} Juliris. כל הזכויות שמורות.`
- `Privacy Policy` → `מדיניות פרטיות`
- `Terms of Service` → `תנאי שימוש`

השלב הבא הכי נכון הוא `cart-drawer + cart-context + shop + product page`, כי משם
מתחילים להופיע טקסטי מסחר אמיתיים ולא רק טקסטי מותג.
[juliris](https://www.juliris.com)
