Yes — the best way to do this is to give Antigravity one strict master prompt
that forces it to read the real repo, inspect the
`HTML suggestion page and copy` folder, and then generate the two exact
deliverables you want. The live Juliris positioning already points to
hypoallergenic jewelry for sensitive skin, with earrings, rings, necklaces,
bracelets, sterling silver, and stainless steel, so that should become the
consistent brand baseline across the theme conversion.
[juliris](https://www.juliris.com)

## Master prompt

Paste this entire prompt into Antigravity AI:

```text
You are working on the GitHub repository:
https://github.com/Yatzzzzz/juliris

SOURCE OF TRUTH:
- The GitHub repo is the only source of truth.
- You must inspect the actual files in the repo before making any decision.
- Additional copy source to use and compare against:
  /HTML suggestion page and copy
- Do not guess filenames, component names, routes, or text.
- If something is missing, mark it as MISSING or NOT FOUND instead of inventing it.

PROJECT GOAL:
Convert the existing Next.js theme into a full Juliris jewelry store:
- Hebrew only
- Global RTL
- Israeli audience only
- Mobile first, but polished on desktop too
- Brand tailored specifically to hypoallergenic jewelry
- Hostinger deployment target
- Payment target: YaadPay Redirect
- Final result should be a clean Juliris storefront, not a generic imported theme

MANDATORY REQUIREMENTS:
1. Entire site must be Hebrew only.
2. Entire site must be RTL globally.
3. Audience is Israel only.
4. Categories must be exactly:
   - טבעות
   - עגילים
   - שרשראות
   - צמידים
   - סטיינלס סטיל
5. Keep only what is useful from the theme; identify what stays, what is replaced, and what must be rebuilt.
6. The repo is the source of truth for structure, routing, styling, and existing content.
7. Use the HTML suggestion folder as the source for replacement copy wherever applicable.
8. Produce two markdown documents:
   - juliris-theme-conversion-guide.md
   - juliris-nextjs-yaadpay-spec.md
9. Every visible text change must be documented file-by-file with:
   - exact file path
   - exact original text
   - exact replacement text
   - section/component name
   - change type: KEEP / REPLACE / REMOVE / REBUILD
10. If the current text is dynamic, document the source file and exact key/field/value that must change.
11. If a file contains no visible copy but needs RTL/layout changes, document the technical change anyway.
12. Do not stop at homepage content; inspect header, footer, menus, drawer, product grid, product page, cart, checkout, forms, SEO metadata, empty states, error states, trust badges, and any static data files.

BRAND POSITIONING TO ENFORCE:
Juliris is a Hebrew-first jewelry store for the Israeli market, focused on elegant hypoallergenic jewelry for sensitive skin.
Brand themes:
- hypoallergenic jewelry
- elegant everyday wear
- comfort without irritation
- stainless steel / quality materials
- feminine clean premium feel
Do not use generic “fashion store” wording.
Do not use English marketing copy.
Do not use global/international shipping language unless explicitly supported in code and business rules.

PRIMARY TASKS:

TASK A — REPO AUDIT
1. Scan the entire repository.
2. Build a file inventory grouped by:
   - app routes / pages
   - layout files
   - components
   - content/data/config files
   - styles
   - assets/images/icons
   - commerce/cart/checkout files
   - API routes
3. Detect whether this project uses App Router, Pages Router, or hybrid routing.
4. Identify all user-facing strings and where they come from.

TASK B — COPY AUDIT
1. Inspect the folder:
   /HTML suggestion page and copy
2. Extract every piece of usable Hebrew copy from it.
3. Map that copy to actual site sections in the Next.js repo.
4. For each section, determine:
   - what text currently exists
   - what exact replacement should be used
   - whether new content must be created because the theme lacks that section

TASK C — FILE-BY-FILE CONVERSION DOCUMENT
Create:
juliris-theme-conversion-guide.md

This file must include:

SECTION 1: Project summary
- goal
- constraints
- source of truth
- target stack
- non-goals

SECTION 2: File inventory
A table with:
- File path
- File type
- Purpose
- User-facing? yes/no
- Action: keep / edit / replace / rebuild

SECTION 3: Exact text replacement log
A table with these exact columns:
- File path
- Component / section
- Current text
- New text
- Language direction impact
- Notes

Rules:
- “Current text” must be copied exactly from the repo when found.
- “New text” must be the final Juliris Hebrew replacement.
- If text is not found, write NOT FOUND.
- If the text comes from an array/object/JSON/constants file, document the exact key.
- Include nav, hero, category cards, product cards, banners, trust copy, testimonials, footer, CTA labels, form placeholders, validation messages, cart/checkout labels, empty states, and SEO metadata.

SECTION 4: Image and visual replacement plan
For every section:
- file path
- current image usage
- recommended replacement image type
- alt text in Hebrew
- whether image should be retained, replaced, cropped, or removed

SECTION 5: RTL implementation plan
Must document exact file changes for:
- html dir="rtl"
- lang="he"
- root layout
- global CSS
- Tailwind config if needed
- logical spacing
- menu alignment
- icon direction
- drawer side
- breadcrumbs
- carousel arrows
- form labels and inputs
- table/list alignment
- toasts / modals / dropdowns

SECTION 6: What stays / what changes / what is rebuilt
Three grouped lists:
- Keep as-is
- Replace content only
- Rebuild technically

TASK D — EXACT CONTENT TRANSFORMATION RULES
Apply these content rules across the entire site:

Navigation:
- Home -> ראשי
- Shop -> חנות
- Collections -> קולקציות
- Categories -> קטגוריות
- Rings -> טבעות
- Earrings -> עגילים
- Necklaces -> שרשראות
- Bracelets -> צמידים
- Stainless Steel -> סטיינלס סטיל
- About -> אודות
- Contact -> יצירת קשר
- Cart -> סל
- Checkout -> לתשלום
- Account -> החשבון שלי
- Search -> חיפוש

Commerce CTA:
- Add to Cart -> הוספה לסל
- Buy Now -> קנייה מהירה
- View Product -> לצפייה במוצר
- Continue Shopping -> המשך קנייה
- Proceed to Checkout -> מעבר לתשלום
- Out of Stock -> אזל מהמלאי
- In Stock -> במלאי
- Sale -> מבצע
- New Arrival -> חדש באתר

Trust / brand messaging:
Replace generic jewelry/fashion copy with Hebrew copy focused on:
- hypoallergenic jewelry
- sensitive skin comfort
- elegant daily wear
- quality materials
- Israeli local audience

Preferred hero copy direction:
Headline:
תכשיטים היפואלרגניים לנשים עם עור רגיש

Subheadline:
עגילים, טבעות, שרשראות וצמידים בעיצוב אלגנטי, מחומרים איכותיים שנועדו להרגיש נוח לאורך כל היום.

Primary CTA:
לצפייה בקולקציה

Secondary CTA:
לסטיינלס סטיל

Short trust bullets:
- מתאים לעור רגיש
- עיצוב אלגנטי ליום יום
- חומרים איכותיים ונוחים
- משלוח לכל הארץ

About copy direction:
ב-Juliris אנחנו מאמינות שתכשיט יפה צריך להיות גם נעים לענידה. לכן אנחנו בוחרות עיצובים אלגנטיים מחומרים איכותיים, עם דגש על תכשיטים היפואלרגניים שמתאימים גם לעור רגיש.

You may refine this copy only if the HTML suggestion folder contains stronger approved text. If there is approved copy in that folder, use it instead.

TASK E — CATALOG STRUCTURE
Normalize the catalog structure around these categories only:
- טבעות
- עגילים
- שרשראות
- צמידים
- סטיינלס סטיל

For category cards, menus, filters, homepage sections, and collection banners:
- remove irrelevant theme categories
- replace imported/fashion categories
- ensure Hebrew naming consistency everywhere

If the project has mock products:
- rename them to Juliris-appropriate jewelry items
- update descriptions to hypoallergenic-sensitive-skin positioning
- preserve technical product fields where possible
- document every changed field file-by-file

TASK F — RTL TECHNICAL IMPLEMENTATION
You must inspect and update the real files that control:
- root layout
- body/html attributes
- fonts
- theme provider if exists
- global CSS
- utility classes
- drawer/navigation direction
- icon placement
- button icon order
- form alignment
- carousel and slider direction
- pagination alignment
- breadcrumbs
- footer columns
- cart panel opening side

Use logical CSS where possible:
- margin-inline-start/end
- padding-inline-start/end
- text-align: start/end
Avoid fragile one-off RTL hacks unless necessary.

TASK G — YAADPAY TECHNICAL SPEC
Create:
juliris-nextjs-yaadpay-spec.md

This file must include:

1. System overview
- Hostinger + Next.js
- YaadPay Redirect
- order lifecycle

2. Required routes
- /api/payments/yaad/create
- /api/payments/yaad/callback
- /checkout
- /checkout/success
- /checkout/cancel
- /thank-you/[orderId] if needed

3. Suggested database schema
Tables:
- orders
- order_items
- payments

For each table include:
- field name
- type
- required?
- description
- indexes
- status fields

4. Payment flow
Include a Mermaid flow diagram for:
product -> cart -> checkout -> create pending order -> redirect to YaadPay -> success return -> callback/webhook -> verify -> mark paid/failed -> thank you page

5. API contract
Document request/response structures for:
- create payment
- callback/webhook
- success page handling
- cancel page handling

6. Security
Include:
- SHA256 signature handling if applicable
- callback verification
- environment variable handling
- replay protection
- order amount verification
- mismatch/error handling

7. App Router boilerplate
Generate starter boilerplate for:
- app/api/payments/yaad/create/route.ts
- app/api/payments/yaad/callback/route.ts
- app/checkout/success/page.tsx
- app/checkout/cancel/page.tsx
- utilities/lib file for YaadPay signing + verification
Use placeholders where merchant credentials are required.

8. Environment variables
Document all required env vars, for example:
- YAADPAY_MASOF
- YAADPAY_API_KEY
- YAADPAY_PASSP
- NEXT_PUBLIC_SITE_URL
- YAADPAY_SUCCESS_URL
- YAADPAY_CANCEL_URL
- YAADPAY_CALLBACK_URL

9. Error cases
Document:
- payment approved but callback missing
- callback received but order missing
- amount mismatch
- duplicate callback
- user closes redirect page
- failed payment
- canceled payment

TASK H — DELIVERY FORMAT
You must produce the following in order:

1. Repo structure summary
2. File-by-file conversion inventory
3. Exact text replacement log
4. RTL implementation checklist
5. Image replacement checklist
6. Payment architecture spec
7. Boilerplate code
8. Final open issues list

CRITICAL QUALITY RULES:
- Do not give a generic summary.
- Do not say “update texts accordingly”.
- Do not group multiple files into one vague note.
- Every visible text change must have an exact file path and exact replacement.
- Every technical RTL change must point to the exact file that should be edited.
- If you cannot find a file, say NOT FOUND.
- If the repo structure differs from assumptions, adapt to the real structure.
- Prefer real file evidence over assumptions.
- Keep Hebrew copy natural, premium, and concise.
- Avoid overpromising claims like “100% allergy free”.
- Prefer “היפואלרגני”, “מתאים לעור רגיש”, “חומרים איכותיים”, “נוחות יומיומית”.

FINAL OBJECTIVE:
Deliver two production-ready markdown documents:
- juliris-theme-conversion-guide.md
- juliris-nextjs-yaadpay-spec.md

Then apply the changes in code, using the markdown files as the implementation plan.
```

## How to run it

Use this order so the model does not jump straight into blind edits:

1. Point Antigravity at the repo root and tell it to scan before editing.
2. Tell it that `/HTML suggestion page and copy` is the approved copy input for
   replacement text.
3. Require it to generate `juliris-theme-conversion-guide.md` first, before
   touching code.
4. Require it to generate `juliris-nextjs-yaadpay-spec.md` second, before
   touching payment code.
5. Only after both markdown files exist, let it apply code changes.
6. Force it to mark anything unknown as `NOT FOUND` instead of inventing missing
   text.
7. Require a final changed-files report grouped by: content, RTL, catalog,
   checkout, payment.
8. Ask it to stop after the docs if you want a review pass before code changes.

## Output rules

Tell Antigravity to use this exact structure for the file-by-file replacement
table:

| File path | Component/section | Current text | Replacement text | Action | Notes |
| --------- | ----------------- | ------------ | ---------------- | ------ | ----- |

And this exact structure for technical files:

| File path | Technical area | Current behavior | Required change | Priority |
| --------- | -------------- | ---------------- | --------------- | -------- |

This matters because you asked for exact filename, exact original text, and
exact replacement text, and loose summaries will not be usable.

## Replacement copy

Use this as the target Hebrew copy pack for generic theme strings that
Antigravity finds in the repo. This keeps the site aligned with the current
Juliris brand direction around sensitive-skin and hypoallergenic jewelry.
[juliris](https://www.juliris.com)

| Theme text found    | Replace with  |
| ------------------- | ------------- |
| Home                | ראשי          |
| Shop                | חנות          |
| Collections         | קולקציות      |
| Categories          | קטגוריות      |
| Rings               | טבעות         |
| Earrings            | עגילים        |
| Necklaces           | שרשראות       |
| Bracelets           | צמידים        |
| Stainless Steel     | סטיינלס סטיל  |
| About               | אודות         |
| Contact             | יצירת קשר     |
| Cart                | סל            |
| Checkout            | לתשלום        |
| Search              | חיפוש         |
| Account             | החשבון שלי    |
| Add to Cart         | הוספה לסל     |
| Buy Now             | קנייה מהירה   |
| View Product        | לצפייה במוצר  |
| Continue Shopping   | המשך קנייה    |
| Proceed to Checkout | מעבר לתשלום   |
| In Stock            | במלאי         |
| Out of Stock        | אזל מהמלאי    |
| Sale                | מבצע          |
| New Arrivals        | חדשים באתר    |
| Best Sellers        | הנמכרים ביותר |
| Learn More          | לפרטים נוספים |
| Read More           | קראי עוד      |

Use these section replacements where the theme has generic fashion copy:

- Hero title → `תכשיטים היפואלרגניים לנשים עם עור רגיש`
- Hero subtitle →
  `עגילים, טבעות, שרשראות וצמידים בעיצוב אלגנטי, מחומרים איכותיים שנועדו להרגיש נוח לאורך כל היום.`
- Primary hero CTA → `לצפייה בקולקציה`
- Secondary hero CTA → `לסטיינלס סטיל`
- Trust badge 1 → `מתאים לעור רגיש`
- Trust badge 2 → `עיצוב אלגנטי ליום יום`
- Trust badge 3 → `חומרים איכותיים ונוחים`
- Trust badge 4 → `משלוח לכל הארץ`
- About section title → `על Juliris`
- About section body →
  `ב-Juliris אנחנו מאמינות שתכשיט יפה צריך להיות גם נעים לענידה. לכן אנחנו בוחרות עיצובים אלגנטיים מחומרים איכותיים, עם דגש על תכשיטים היפואלרגניים שמתאימים גם לעור רגיש.`

If the HTML suggestion folder contains approved copy that is better than the
lines above, Antigravity should use that copy instead and document the source.

Would you like me to turn this into the two finished markdown files now, in the
exact content format you want Antigravity to generate?
