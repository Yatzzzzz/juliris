Yes — the next surgical pass should be `cart-drawer`, then `shop`, then
`product`, because those files still carry the storefront’s English commerce
copy and skincare product language. [juliris](https://www.juliris.com)

## Cart context

`components/boty/cart-context.tsx` has no real customer-facing copy, and the
only string inside it is the developer error
`useCart must be used within a CartProvider`, so you can leave this file alone
for now. [juliris](https://www.juliris.com) If you want to localize even that
internal error, change
`throw new Error("useCart must be used within a CartProvider")` to
`throw new Error("יש להשתמש ב-useCart בתוך CartProvider")`.
[juliris](https://www.juliris.com)

## Cart drawer

`components/boty/cart-drawer.tsx` is small and all its visible strings are
concentrated in one place, so the cleanest move is to replace the full file
while keeping the exact same classes, layout, spacing, drawer direction, and
structure. [juliris](https://www.juliris.com)

### Replace entire file: `components/boty/cart-drawer.tsx`

```tsx
"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useCart } from "./cart-context";

export function CartDrawer() {
    const {
        items,
        removeItem,
        updateQuantity,
        isOpen,
        setIsOpen,
        itemCount,
        subtotal,
    } = useCart();

    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
            <DrawerContent className="h-full w-full sm:max-w-[440px]">
                <DrawerHeader className="border-b border-border/50 p-6 py-2.5">
                    <DrawerTitle className="font-serif text-2xl">
                        הסל שלך
                    </DrawerTitle>
                    <DrawerDescription>{itemCount} מוצרים</DrawerDescription>
                </DrawerHeader>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0
                        ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <ShoppingBag className="w-12 h-12 text-muted-foreground/50 mb-4" />
                                <p className="text-muted-foreground">
                                    הסל שלך עדיין ריק
                                </p>
                                <DrawerClose asChild>
                                    <button
                                        type="button"
                                        className="mt-4 text-primary hover:underline text-sm"
                                    >
                                        המשך קנייה
                                    </button>
                                </DrawerClose>
                            </div>
                        )
                        : (
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                                            <Image
                                                src={item.image ||
                                                    "/placeholder.svg"}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-serif text-base text-foreground mb-1 font-semibold">
                                                {item.name}
                                            </h3>
                                            <p className="text-muted-foreground mb-3 text-sm">
                                                {item.description}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border border-border rounded-full">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity -
                                                                    1,
                                                            )}
                                                        className="p-1.5 hover:bg-muted boty-transition rounded-l-full"
                                                        aria-label="הפחתת כמות"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="px-3 text-sm font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1,
                                                            )}
                                                        className="p-1.5 hover:bg-muted boty-transition rounded-r-full"
                                                        aria-label="הגדלת כמות"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(item.id)}
                                                    className="p-1.5 text-muted-foreground hover:text-destructive boty-transition"
                                                    aria-label="הסרת מוצר"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right">
                                            <p className="font-medium text-foreground">
                                                ₪{item.price * item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                </div>

                {items.length > 0 && (
                    <DrawerFooter className="border-t border-border/50 p-6 gap-4">
                        {/* Summary */}
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                                <span>סכום ביניים</span>
                                <span>₪{subtotal}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>משלוח</span>
                                <span>
                                    {shipping === 0 ? "חינם" : `₪${shipping}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-base font-medium text-foreground pt-2 border-t border-border/50">
                                <span>סה״כ</span>
                                <span>₪{total}</span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button
                            type="button"
                            className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 boty-transition"
                        >
                            מעבר לתשלום
                        </button>

                        <DrawerClose asChild>
                            <button
                                type="button"
                                className="w-full border border-border text-foreground py-4 rounded-full font-medium hover:bg-muted boty-transition"
                            >
                                המשך קנייה
                            </button>
                        </DrawerClose>
                    </DrawerFooter>
                )}
            </DrawerContent>
        </Drawer>
    );
}
```

## Shop page

`app/shop/page.tsx` still contains the main shop title, filter UI labels, count
label, add-to-cart aria label, dollar pricing, seven skincare categories, and
fourteen skincare products, so this file needs a pure text/data rewrite without
touching the structure or classes. [github](https://github.com/Tomkinen/jatsi)

### Header and UI text replacements

- `Our Collection` → `הקולקציה שלנו`. [github](https://github.com/reijjo/jazz)
- `Shop All Products` → `כל המוצרים`.
  [github](https://github.com/Tomkinen/jatsi)
- `Discover our complete range of natural skincare essentials` →
  `גלי את קולקציית Juliris — תכשיטים היפואלרגניים בעיצוב אלגנטי, עם דגש על נוחות יומיומית ועור רגיש.`
  [github](https://github.com/reijjo/jazz)
- `Filters` → `סינון`. [github](https://github.com/Tomkinen/jatsi)
- `{filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}`
  → `{filteredProducts.length} מוצרים`.
  [github](https://github.com/Tomkinen/jatsi)
- `aria-label="Add to cart"` → `aria-label="הוספה לסל"`.
  [github](https://github.com/reijjo/jazz)
- `${product.price}` → `₪{product.price}`.
  [github](https://github.com/Tomkinen/jatsi)
- `${product.originalPrice}` → `₪{product.originalPrice}`.
  [github](https://github.com/Tomkinen/jatsi)

### Category array replacement

Replace this line exactly: [github](https://github.com/Tomkinen/jatsi)

```tsx
const categories = [
    "all",
    "serums",
    "moisturizers",
    "cleansers",
    "oils",
    "masks",
    "toners",
];
```

with this: [github](https://github.com/Tomkinen/jatsi)

```tsx
const categories = [
    "הכול",
    "טבעות",
    "עגילים",
    "שרשראות",
    "צמידים",
    "סטיינלס סטיל",
];
```

Also replace this line exactly: [github](https://github.com/Tomkinen/jatsi)

```tsx
const [selectedCategory, setSelectedCategory] = useState("all");
```

with this: [github](https://github.com/Tomkinen/jatsi)

```tsx
const [selectedCategory, setSelectedCategory] = useState("הכול");
```

And replace this condition exactly: [github](https://github.com/Tomkinen/jatsi)

```tsx
const filteredProducts = selectedCategory === "all";
```

with this: [github](https://github.com/Tomkinen/jatsi)

```tsx
const filteredProducts = selectedCategory === "הכול";
```

### Badge comparison replacements

Because the badge styles depend on the badge text itself, you must replace both
the data values and the comparison strings.
[github](https://github.com/Tomkinen/jatsi)

- `product.badge === "Sale"` → `product.badge === "מבצע"`.
  [github](https://github.com/Tomkinen/jatsi)
- `product.badge === "New"` → `product.badge === "חדש"`.
  [github](https://github.com/Tomkinen/jatsi)

### Product data replacements

Replace the text values in the `products` array like this, while keeping the
same object structure, image paths, and prices unless noted otherwise.
[github](https://github.com/reijjo/jazz)

- `Radiance Serum` → `שרשרת אלה`, `Vitamin C brightening formula` →
  `שרשרת עדינה למראה אלגנטי יומיומי.`, `Bestseller` → `נמכר ביותר`,
  `category: "serums"` → `category: "שרשראות"`.
  [github](https://github.com/reijjo/jazz)
- `Hydrating Serum` → `שרשרת נעם`, `Hyaluronic acid moisture boost` →
  `שרשרת נשית בקו מינימליסטי ונוח לענידה.`, `category: "serums"` →
  `category: "שרשראות"`. [github](https://github.com/reijjo/jazz)
- `Age Defense Serum` → `שרשרת יובל`, `Retinol & peptide complex` →
  `שרשרת אלגנטית עם נוכחות עדינה ומעודנת.`, `New` → `חדש`, `category: "serums"`
  → `category: "שרשראות"`. [github](https://github.com/reijjo/jazz)
- `Glow Serum` → `צמיד דניאל`, `Niacinamide brightening boost` →
  `צמיד יומיומי בקו נקי ונשי.`, `Sale` → `מבצע`, `category: "serums"` →
  `category: "צמידים"`. [github](https://github.com/reijjo/jazz)

- `Hydra Cream` → `טבעת נועה`, `Deep moisture with hyaluronic acid` →
  `טבעת עדינה במראה נקי שמתאימה לשימוש יומיומי.`, `category: "moisturizers"` →
  `category: "טבעות"`. [github](https://github.com/reijjo/jazz)
- `Gentle Cleanser` → `עגילי תמר`, `Soothing botanical wash` →
  `עגילים היפואלרגניים בעיצוב אלגנטי ונוח.`, `Sale` → `מבצע`,
  `category: "cleansers"` → `category: "עגילים"`.
  [github](https://github.com/reijjo/jazz)
- `Night Cream` → `טבעת יעל`, `Restorative overnight treatment` →
  `טבעת נשית ועדינה שמשלימה מראה יומיומי אלגנטי.`, `Bestseller` → `נמכר ביותר`,
  `category: "moisturizers"` → `category: "טבעות"`.
  [github](https://github.com/reijjo/jazz)
- `Day Cream SPF 30` → `טבעת מאיה`, `Protection & hydration` →
  `טבעת מינימליסטית ונוחה לענידה לאורך היום.`, `category: "moisturizers"` →
  `category: "טבעות"`. [github](https://github.com/reijjo/jazz)

- `Renewal Oil` → `עגילי ליה`, `Nourishing facial oil blend` →
  `עגילים עדינים עם נוכחות נשית וקלילה.`, `New` → `חדש`, `category: "oils"` →
  `category: "עגילים"`. [github](https://github.com/reijjo/jazz)
- `Rosehip Oil` → `עגילי שירה`, `Pure organic rosehip extract` →
  `עגילים יומיומיים בקווים נקיים ונעימים לענידה.`, `category: "oils"` →
  `category: "עגילים"`. [github](https://github.com/reijjo/jazz)
- `Jojoba Oil` → `צמיד מיה`, `Balancing & lightweight` →
  `צמיד קליל ועדין למראה נשי ולא מתאמץ.`, `category: "oils"` →
  `category: "צמידים"`. [github](https://github.com/reijjo/jazz)
- `Argan Oil` → `צמיד רוני`, `Moroccan beauty elixir` →
  `צמיד אלגנטי עם גימור נקי ונוחות יומיומית.`, `Bestseller` → `נמכר ביותר`,
  `category: "oils"` → `category: "צמידים"`.
  [github](https://github.com/Tomkinen/jatsi)

- `Glow Mask` → `סטיינלס נועם`, `Weekly brightening treatment` →
  `פריט סטיינלס סטיל עמיד בעיצוב נקי ואלגנטי.`, `category: "masks"` →
  `category: "סטיינלס סטיל"`. [github](https://github.com/reijjo/jazz)
- `Balance Toner` → `סטיינלס עדן`, `pH restoring mist` →
  `פריט סטיינלס סטיל יומיומי עם מראה מודרני ונוח.`, `New` → `חדש`,
  `category: "toners"` → `category: "סטיינלס סטיל"`.
  [github](https://github.com/Tomkinen/jatsi)

## Product page

`app/product/[id]/page.tsx` currently defines only four detailed products, and
all four are still full skincare entries with skincare taglines, descriptions,
usage instructions, ingredients, delivery copy, benefit labels, accordion
titles, review text, size/quantity labels, and CTA buttons in English.
[juliris](https://www.juliris.com)

### Important note before you edit

The product detail page only contains four actual product objects —
`radiance-serum`, `hydra-cream`, `gentle-cleanser`, and `renewal-oil` — so any
other shop card ID still falls back to the first product until you expand this
file later. [juliris](https://www.juliris.com)

### Global text replacements in `app/product/[id]/page.tsx`

- `Back to Shop` → `חזרה לחנות`. [github](https://github.com/reijjo/jazz)
- `Boty Essentials` → `קולקציית Juliris`.
  [github](https://github.com/reijjo/jazz)
- `(128 reviews)` → `(128 חוות דעת)`. [github](https://github.com/reijjo/jazz)
- `Size` → `בחירה`. [github](https://github.com/reijjo/jazz)
- `Quantity` → `כמות`. [github](https://github.com/reijjo/jazz)
- `aria-label="Decrease quantity"` → `aria-label="הפחתת כמות"`.
  [github](https://github.com/reijjo/jazz)
- `aria-label="Increase quantity"` → `aria-label="הגדלת כמות"`.
  [github](https://github.com/reijjo/jazz)
- `Added to Cart` → `נוסף לסל`. [github](https://github.com/reijjo/jazz)
- `Add to Cart` → `הוספה לסל`. [github](https://github.com/reijjo/jazz)
- `Buy Now` → `קנייה מהירה`. [github](https://github.com/reijjo/jazz)
- `Details` → `פרטים`. [github](https://github.com/reijjo/jazz)
- `How to Use` → `איך לענוד`. [github](https://github.com/reijjo/jazz)
- `Ingredients` → `חומר וגימור`. [github](https://github.com/reijjo/jazz)
- `Delivery & Returns` → `משלוחים והחזרות`.
  [github](https://github.com/reijjo/jazz)
- `100% Natural` → `מתאים לעור רגיש`. [github](https://github.com/reijjo/jazz)
- `Cruelty-Free` → `נוח לענידה`. [github](https://github.com/reijjo/jazz)
- `Eco-Friendly` → `עיצוב אלגנטי`. [github](https://github.com/reijjo/jazz)
- `Expert Approved` → `אהוב על לקוחות`. [github](https://github.com/reijjo/jazz)
- `${product.price}` → `₪{product.price}`.
  [github](https://github.com/reijjo/jazz)
- `${product.originalPrice}` → `₪{product.originalPrice}`.
  [github](https://github.com/reijjo/jazz)

### Replace the four product objects

Keep the same IDs and image paths for now, and replace only the text fields
below. [github](https://github.com/reijjo/jazz)

#### `radiance-serum`

- `name` → `שרשרת אלה`. [github](https://github.com/reijjo/jazz)
- `tagline` → `שרשרת עדינה למראה אלגנטי יומיומי`.
  [github](https://github.com/reijjo/jazz)
- `description` →
  `שרשרת היפואלרגנית בקו נקי ונשי, שנועדה להשתלב בקלות במראה יומיומי ולהרגיש נוח לאורך שעות.`
  [github](https://github.com/reijjo/jazz)
- `sizes` → `["עדין", "קלאסי"]`. [github](https://github.com/reijjo/jazz)
- `details` →
  `שרשרת אלה משלבת מראה מינימליסטי עם נוכחות אלגנטית ושקטה. היא מתאימה למי שמחפשת פריט נשי ועדין שאפשר לענוד ביום יום או לשלב עם שכבות נוספות.`
  [github](https://github.com/reijjo/jazz)
- `howToUse` →
  `אפשר לענוד לבד למראה נקי או לשלב עם שרשראות נוספות ליצירת שכבות עדינות. מתאימה לשגרה היומיומית וגם ליציאה בערב.`
  [github](https://github.com/reijjo/jazz)
- `ingredients` →
  `חומר איכותי בגימור אלגנטי, עם דגש על נוחות יומיומית והתאמה טובה יותר לעור רגיש.`
  [github](https://github.com/reijjo/jazz)
- `delivery` →
  `משלוח לכל הארץ. הזמנות נשלחות בתוך כמה ימי עסקים, וניתן לפנות אלינו במקרה של שאלה או צורך בבדיקה נוספת לפני ההזמנה.`
  [github](https://github.com/reijjo/jazz)

#### `hydra-cream`

- `name` → `טבעת נועה`. [github](https://github.com/reijjo/jazz)
- `tagline` → `טבעת עדינה עם נוכחות נקייה`.
  [github](https://github.com/reijjo/jazz)
- `description` →
  `טבעת אלגנטית במראה מינימליסטי שמוסיפה גימור עדין ונשי בלי להכביד על הלוק.`
  [github](https://github.com/reijjo/jazz)
- `sizes` → `["קטן", "בינוני"]`. [github](https://github.com/reijjo/jazz)
- `details` →
  `טבעת נועה נועדה להשתלב בקלות עם פריטים נוספים או לבלוט בעדינות בפני עצמה. היא מתאימה לנשים שמחפשות איזון בין מראה אלגנטי לנוחות יומיומית.`
  [github](https://github.com/reijjo/jazz)
- `howToUse` →
  `ענדי אותה לבד למראה נקי או שלבי עם טבעות נוספות למראה שכבות אלגנטי ועדין.`
  [github](https://github.com/reijjo/jazz)
- `ingredients` →
  `חומר איכותי עם גימור נקי ונשי, שנבחר למראה מדויק ולתחושת ענידה נוחה יותר.`
  [github](https://github.com/reijjo/jazz)
- `delivery` →
  `משלוח לכל הארץ. הזמנות נארזות בקפידה ונשלחות בתוך כמה ימי עסקים.`
  [github](https://github.com/reijjo/jazz)

#### `gentle-cleanser`

- `name` → `עגילי תמר`. [github](https://github.com/reijjo/jazz)
- `tagline` → `עגילים היפואלרגניים בקו נקי`.
  [github](https://github.com/reijjo/jazz)
- `description` →
  `עגילים עדינים למראה נשי ואלגנטי, עם דגש על תחושת ענידה נוחה יותר גם לאורך שעות.`
  [github](https://github.com/reijjo/jazz)
- `sizes` → `["קטן", "קלאסי"]`. [github](https://github.com/reijjo/jazz)
- `details` →
  `עגילי תמר מציעים מראה מדויק, נקי ולא מתאמץ. הם מתאימים ליום יום, לעבודה, ולמי שמחפשת תכשיט עדין שלא מרגיש כבד.`
  [github](https://github.com/reijjo/jazz)
- `howToUse` →
  `ענדי אותם כפריט מרכזי ללוק עדין או שלבי עם שרשרת וטבעת למראה שלם ואלגנטי.`
  [github](https://github.com/reijjo/jazz)
- `ingredients` →
  `חומר איכותי בגימור עדין, עם דגש על התאמה טובה יותר לעור רגיש ונוחות לענידה יומיומית.`
  [github](https://github.com/reijjo/jazz)
- `delivery` →
  `משלוח לכל הארץ. ניתן ליצור קשר לפני ההזמנה לכל שאלה על התאמה, גודל או סגנון.`
  [github](https://github.com/reijjo/jazz)

#### `renewal-oil`

- `name` → `צמיד ליה`. [github](https://github.com/reijjo/jazz)
- `tagline` → `צמיד קליל עם גימור אלגנטי`.
  [github](https://github.com/reijjo/jazz)
- `description` →
  `צמיד נשי ונוח לענידה, שמתאים ללוק יומיומי נקי וגם לשילוב עם פריטים נוספים.`
  [github](https://github.com/reijjo/jazz)
- `sizes` → `["עדין", "בינוני"]`. [github](https://github.com/reijjo/jazz)
- `details` →
  `צמיד ליה נבנה למראה אלגנטי ולא מתאמץ, עם נוכחות עדינה שמשתלבת בקלות בשגרה היומיומית.`
  [github](https://github.com/reijjo/jazz)
- `howToUse` →
  `ענדי אותו לבד למראה מינימליסטי או שלבי עם צמידים נוספים ליצירת מראה שכבות נשי.`
  [github](https://github.com/reijjo/jazz)
- `ingredients` →
  `חומר איכותי וגימור נקי עם דגש על תחושה נוחה, אלגנטיות יומיומית והתאמה טובה יותר לעור רגיש.`
  [github](https://github.com/reijjo/jazz)
- `delivery` → `משלוח לכל הארץ. ההזמנה נארזת בקפידה ונשלחת בתוך כמה ימי עסקים.`
  [github](https://github.com/reijjo/jazz)

### Optional polish inside the same file

If you want the size selector to feel less generic across jewelry types, replace
the four current `sizes` arrays with short jewelry-friendly options like
`["עדין", "קלאסי"]`, `["קטן", "בינוני"]`, or `["קצר", "בינוני"]`, which works
better than `30ml`, `50ml`, `100ml`, `150ml`, and `250ml`.
[github](https://github.com/reijjo/jazz)

The next clean step after this is
`footer link targets + shop/product data sync`, because your shop page already
shows many product IDs that do not yet exist as full product records in
`app/product/[id]/page.tsx`. [github](https://github.com/Tomkinen/jatsi)
