"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, Minus, Plus, ChevronDown, Leaf, Heart, Award, Recycle, Star, Check } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

const products: Record<string, {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice: number | null
  image: string
  sizes: string[]
  details: string
  howToUse: string
  ingredients: string
  delivery: string
}> = {
  "radiance-serum": {
    id: "radiance-serum",
    name: "שרשרת אלה",
    tagline: "שרשרת עדינה למראה אלגנטי יומיומי.",
    description: "שרשרת היפואלרגנית בקו נקי ונשי, שנועדה להשתלב בקלות במראה יומיומי ולהרגיש נוח לאורך שעות.",
    price: 68,
    originalPrice: null,
    image: "/images/products/serum.jpg",
    sizes: ["עדין", "קלאסי"],
    details: "שרשרת אלה משלבת מראה מינימליסטי עם נוכחות אלגנטית ושקטה. היא מתאימה למי שמחפשת פריט נשי ועדין שאפשר לענוד ביום יום או לשלב עם שכבות נוספות.",
    howToUse: "אפשר לענוד לבד למראה נקי או לשלב עם שרשראות נוספות ליצירת שכבות עדינות. מתאימה לשגרה היומיומית וגם ליציאה בערב.",
    ingredients: "חומר איכותי בגימור אלגנטי, עם דגש על נוחות יומיומית והתאמה טובה יותר לעור רגיש.",
    delivery: "משלוח לכל הארץ. הזמנות נשלחות בתוך כמה ימי עסקים, וניתן לפנות אלינו במקרה של שאלה או צורך בבדיקה נוספת לפני ההזמנה."
  },
  "hydra-cream": {
    id: "hydra-cream",
    name: "טבעת נועה",
    tagline: "טבעת עדינה עם נוכחות נקייה.",
    description: "טבעת אלגנטית במראה מינימליסטי שמוסיפה גימור עדין ונשי בלי להכביד על הלוק.",
    price: 54,
    originalPrice: null,
    image: "/images/products/moisturizer.jpg",
    sizes: ["קטן", "בינוני"],
    details: "טבעת נועה נועדה להשתלב בקלות עם פריטים נוספים או לבלוט בעדינות בפני עצמה. היא מתאימה לנשים שמחפשות איזון בין מראה אלגנטי לנוחות יומיומית.",
    howToUse: "ענדי אותה לבד למראה נקי או שלבי עם טבעות נוספות למראה שכבות אלגנטי ועדין.",
    ingredients: "חומר איכותי עם גימור נקי ונשי, שנבחר למראה מדויק ולתחושת ענידה נוחה יותר.",
    delivery: "משלוח לכל הארץ. הזמנות נארזות בקפידה ונשלחות בתוך כמה ימי עסקים."
  },
  "gentle-cleanser": {
    id: "gentle-cleanser",
    name: "עגילי תמר",
    tagline: "עגילים היפואלרגניים בקו נקי.",
    description: "עגילים עדינים למראה נשי ואלגנטי, עם דגש על תחושת ענידה נוחה יותר גם לאורך שעות.",
    price: 38,
    originalPrice: 48,
    image: "/images/products/cleanser.jpg",
    sizes: ["קטן", "קלאסי"],
    details: "עגילי תמר מציעים מראה מדויק, נקי ולא מתאמץ. הם מתאימים ליום יום, לעבודה, ולמי שמחפשת תכשיט עדין שלא מרגיש כבד.",
    howToUse: "ענדי אותם כפריט מרכזי ללוק עדין או שלבי עם שרשרת וטבעת למראה שלם ואלגנטי.",
    ingredients: "חומר איכותי בגימור עדין, עם דגש על התאמה טובה יותר לעור רגיש ונוחות לענידה יומיומית.",
    delivery: "משלוח לכל הארץ. ניתן ליצור קשר לפני ההזמנה לכל שאלה על התאמה, גודל או סגנון."
  },
  "renewal-oil": {
    id: "renewal-oil",
    name: "צמיד ליה",
    tagline: "צמיד קליל עם גימור אלגנטי.",
    description: "צמיד נשי ונוח לענידה, שמתאים ללוק יומיומי נקי וגם לשילוב עם פריטים נוספים.",
    price: 72,
    originalPrice: null,
    image: "/images/products/oil.jpg",
    sizes: ["עדין", "בינוני"],
    details: "צמיד ליה נבנה למראה אלגנטי ולא מתאמץ, עם נוכחות עדינה שמשתלבת בקלות בשגרה היומיומית.",
    howToUse: "ענדי אותו לבד למראה מינימליסטי או שלבי עם צמידים נוספים ליצירת מראה שכבות נשי.",
    ingredients: "חומר איכותי וגימור נקי עם דגש על תחושה נוחה, אלגנטיות יומיומית והתאמה טובה יותר לעור רגיש.",
    delivery: "משלוח לכל הארץ. ההזמנה נארזות בקפידה ונשלחות בתוך כמה ימי עסקים."
  }
}

const benefits = [
  { icon: Leaf, label: "מתאים לעור רגיש" },
  { icon: Heart, label: "נוח לענידה" },
  { icon: Recycle, label: "עיצוב אלגנטי" },
  { icon: Award, label: "אהוב על לקוחות" }
]

type AccordionSection = "details" | "howToUse" | "ingredients" | "delivery"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products[productId] || products["radiance-serum"]

  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<AccordionSection | null>("details")
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const accordionItems: { key: AccordionSection; title: string; content: string }[] = [
    { key: "details", title: "פרטים", content: product.details },
    { key: "howToUse", title: "איך לענוד", content: product.howToUse },
    { key: "ingredients", title: "חומר וגימור", content: product.ingredients },
    { key: "delivery", title: "משלוחים והחזרות", content: product.delivery }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground boty-transition mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            חזרה לחנות
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-card boty-shadow">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="mb-8">
                <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">
                  קולקציית Juliris
                </span>
                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground italic mb-4">
                  {product.tagline}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(128 חוות דעת)</span>
                </div>

                <p className="text-foreground/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl font-medium text-foreground">₪{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₪{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-3 block">בחירה</label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full text-sm boty-transition boty-shadow ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground hover:bg-card/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="text-sm font-medium text-foreground mb-3 block">כמות</label>
                <div className="inline-flex items-center gap-4 bg-card rounded-full px-2 py-2 boty-shadow">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
                    aria-label="הפחתת כמות"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
                    aria-label="הגדלת כמות"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm tracking-wide boty-transition boty-shadow ${
                    isAdded
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      נוסף לסל
                    </>
                  ) : (
                    "הוספה לסל"
                  )}
                </button>
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/5"
                >
                  קנייה מהירה
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.label}
                    className="flex flex-col items-center gap-2 p-4 boty-shadow bg-transparent shadow-none rounded-md"
                  >
                    <benefit.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground text-center">{benefit.label}</span>
                  </div>
                ))}
              </div>

              {/* Accordion */}
              <div className="border-t border-border/50">
                {accordionItems.map((item) => (
                  <div key={item.key} className="border-b border-border/50">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.key)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span className="font-medium text-foreground">{item.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground boty-transition ${
                          openAccordion === item.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden boty-transition ${
                        openAccordion === item.key ? "max-h-96 pb-5" : "max-h-0"
                      }`}
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
