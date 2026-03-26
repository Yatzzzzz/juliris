You’re right to force this into a **text-only** pass. In the current repo,
`components/boty/header.tsx` and `components/boty/hero.tsx` are visually strong
already; the problem is that their copy is still Boty/skincare copy in English,
including `Shop`, `About`, `Ingredients`, `Boty`, `Natural Skincare`,
`Glow gently.`, `Naturally you.`, and `Shop Now`.
[juliris](https://www.juliris.com)

## Header changes

In `components/boty/header.tsx`, change only the text nodes and aria-label
strings below; do not touch classes, layout, spacing, icons, or structure.
[juliris](https://www.juliris.com)

| File                         | Find                                                            | Replace                    |
| ---------------------------- | --------------------------------------------------------------- | -------------------------- |
| `components/boty/header.tsx` | `aria-label="Toggle menu"` [juliris](https://www.juliris.com)   | `aria-label="פתיחת תפריט"` |
| `components/boty/header.tsx` | `Shop` [juliris](https://www.juliris.com)                       | `חנות`                     |
| `components/boty/header.tsx` | `About` [juliris](https://www.juliris.com)                      | `אודות`                    |
| `components/boty/header.tsx` | `Ingredients` [juliris](https://www.juliris.com)                | `קולקציות`                 |
| `components/boty/header.tsx` | `Boty` [juliris](https://www.juliris.com)                       | `Juliris`                  |
| `components/boty/header.tsx` | `aria-label="Search"` [juliris](https://www.juliris.com)        | `aria-label="חיפוש"`       |
| `components/boty/header.tsx` | `aria-label="Account"` [juliris](https://www.juliris.com)       | `aria-label="החשבון שלי"`  |
| `components/boty/header.tsx` | `aria-label="Cart"` [juliris](https://www.juliris.com)          | `aria-label="סל"`          |
| `components/boty/header.tsx` | `Shop` in mobile menu [juliris](https://www.juliris.com)        | `חנות`                     |
| `components/boty/header.tsx` | `About` in mobile menu [juliris](https://www.juliris.com)       | `אודות`                    |
| `components/boty/header.tsx` | `Ingredients` in mobile menu [juliris](https://www.juliris.com) | `קולקציות`                 |
| `components/boty/header.tsx` | `Account` in mobile menu [juliris](https://www.juliris.com)     | `החשבון שלי`               |

### Paste-ready header file

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { CartDrawer } from "./cart-drawer";
import { useCart } from "./cart-context";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { setIsOpen, itemCount } = useCart();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
            <nav
                className="max-w-7xl mx-auto px-6 lg:px-8 backdrop-blur-md rounded-lg py-0 my-0 animate-scale-fade-in bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.32)]"
                style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px" }}
            >
                <div className="flex items-center justify-between h-[68px]">
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="lg:hidden p-2 text-foreground/80 hover:text-foreground boty-transition"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="פתיחת תפריט"
                    >
                        {isMenuOpen
                            ? <X className="w-5 h-5" />
                            : <Menu className="w-5 h-5" />}
                    </button>

                    {/* Desktop Navigation - Left */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link
                            href="/shop"
                            className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                        >
                            חנות
                        </Link>
                        <Link
                            href="/"
                            className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                        >
                            אודות
                        </Link>
                        <Link
                            href="/"
                            className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                        >
                            קולקציות
                        </Link>
                    </div>

                    {/* Logo */}
                    <Link
                        href="/"
                        className="absolute left-1/2 -translate-x-1/2"
                    >
                        <h1 className="font-serif text-3xl tracking-wider text-foreground">
                            Juliris
                        </h1>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="p-2 text-foreground/70 hover:text-foreground boty-transition"
                            aria-label="חיפוש"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <Link
                            href="/account"
                            className="hidden sm:block p-2 text-foreground/70 hover:text-foreground boty-transition"
                            aria-label="החשבון שלי"
                        >
                            <User className="w-5 h-5" />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            className="relative p-2 text-foreground/70 hover:text-foreground boty-transition"
                            aria-label="סל"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-0 -right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <CartDrawer />

                {/* Mobile Navigation */}
                <div
                    className={`lg:hidden overflow-hidden boty-transition ${
                        isMenuOpen ? "max-h-64 pb-6" : "max-h-0"
                    }`}
                >
                    <div className="flex flex-col gap-4 pt-4 border-t border-border/50">
                        <Link
                            href="/shop"
                            className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                        >
                            חנות
                        </Link>
                        <Link
                            href="/"
                            className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                        >
                            אודות
                        </Link>
                        <Link
                            href="/"
                            className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                        >
                            קולקציות
                        </Link>
                        <Link
                            href="/"
                            className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                        >
                            החשבון שלי
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
```

## Hero changes

In `components/boty/hero.tsx`, the only copy that needs replacing is the label,
the two-line headline, the paragraph, the CTA text, and the scroll indicator
text. [juliris](https://www.juliris.com)

| File                       | Find                                                                                                                              | Replace                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `components/boty/hero.tsx` | `Natural Skincare` [juliris](https://www.juliris.com)                                                                             | `תכשיטים היפואלרגניים`                                                                   |
| `components/boty/hero.tsx` | `Glow gently.` [juliris](https://www.juliris.com)                                                                                 | `עדינה על העור.`                                                                         |
| `components/boty/hero.tsx` | `Naturally you.` [juliris](https://www.juliris.com)                                                                               | `אלגנטית בכל יום.`                                                                       |
| `components/boty/hero.tsx` | `Discover skincare that breathes with you. Pure ingredients, gentle rituals, radiant results.` [juliris](https://www.juliris.com) | `גלי תכשיטים היפואלרגניים לנשים עם עור רגיש, בעיצוב אלגנטי ונוח שמתאים לשגרה היומיומית.` |
| `components/boty/hero.tsx` | `Shop Now` [juliris](https://www.juliris.com)                                                                                     | `לצפייה בקולקציה`                                                                        |
| `components/boty/hero.tsx` | `Scroll` [juliris](https://www.juliris.com)                                                                                       | `גללי`                                                                                   |

### Paste-ready hero file

```tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{ backgroundColor: "#e3e1e2" }}
        >
            {/* Background Video */}
            <div
                className="border-b border-border/50 p-6 py-2"
                style={{ backgroundColor: "#e3e1e2" }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        minWidth: "100%",
                        minHeight: "100%",
                        width: "auto",
                        height: "auto",
                        objectFit: "cover",
                    }}
                >
                    <source
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f3d8cad2-8091-4809-aac0-eaac74b0be7c-Z4XUCz3CRR7qjaOsoq6rFmbJfIRdgs.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Bottom fade gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full pt-20 mr-14 lg:mr-0">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="w-full lg:max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                        <span
                            className="text-sm uppercase mb-6 block text-black animate-blur-in opacity-0 tracking-normal"
                            style={{
                                animationDelay: "0.2s",
                                animationFillMode: "forwards",
                            }}
                        >
                            תכשיטים היפואלרגניים
                        </span>
                        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-balance text-black">
                            <span
                                className="block animate-blur-in opacity-0 font-semibold"
                                style={{
                                    animationDelay: "0.4s",
                                    animationFillMode: "forwards",
                                }}
                            >
                                עדינה על העור.
                            </span>
                            <span
                                className="block animate-blur-in opacity-0 font-semibold xl:text-9xl text-7xl"
                                style={{
                                    animationDelay: "0.6s",
                                    animationFillMode: "forwards",
                                }}
                            >
                                אלגנטית בכל יום.
                            </span>
                        </h2>
                        <p
                            className="text-lg leading-relaxed mb-10 max-w-md mx-auto lg:mx-0 text-black animate-blur-in opacity-0"
                            style={{
                                animationDelay: "0.8s",
                                animationFillMode: "forwards",
                            }}
                        >
                            גלי תכשיטים היפואלרגניים לנשים עם עור רגיש, בעיצוב
                            אלגנטי ונוח שמתאים לשגרה היומיומית.
                        </p>
                        <div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-blur-in opacity-0"
                            style={{
                                animationDelay: "1s",
                                animationFillMode: "forwards",
                            }}
                        >
                            <Link
                                href="/shop"
                                className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90 boty-shadow"
                            >
                                לצפייה בקולקציה
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-black">
                <span className="text-xs tracking-widest uppercase font-bold">
                    גללי
                </span>
                <div className="w-px h-12 bg-foreground/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground/60 animate-pulse" />
                </div>
            </div>
        </section>
    );
}
```

## One caution

This pass keeps the design intact, but because the component still uses
left-aligned hero text on large screens and the centered logo uses `left-1/2`,
it will still be visually LTR in behavior until we do a separate RTL-only pass
later. [juliris](https://www.juliris.com)

If you want, next I’ll continue with the same **text-only, zero-design-change**
method for `trust-badges`, `product-grid`, and `footer`.
