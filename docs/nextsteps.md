What the 5 passes mean PayPal happy-path flow works end-to-end in mock mode,
including internal order creation, capture endpoint invocation, and redirect to
a stable thank-you page that can be refreshed without re-processing payment.

Cancel and idempotency behaviors are wired correctly: cancellation returns to
checkout with a clear message and preserved cart, and replaying the return URL
or a capture attempt against an already-paid order hits terminal-state guards
instead of double-capturing.

Yaad’s notify and return routes now exist, respond with the right HTTP methods,
and handle missing/unknown orders by returning explicit checkout errors instead
of 404s, which matches the architecture you wanted for server-side confirmation
and error paths.

Next concrete step Swap the mock configuration for real test credentials and
rerun the same 5 flows against PayPal sandbox and Yaad’s test environment, in
exactly the same sequence and with the same expected behaviors, so you can prove
that the provider-backed flows behave identically to the mock ones.

Once those pass, you can move forward to the next roadmap items: order lifecycle
hardening in real environments, then Yaad production-grade validation, catalog
finalization, and finally the Hebrew/content and launch passes for Juliris.

Do you want a short, copy-paste checklist of the exact URLs and expected
responses for the 5 flows when you switch to real sandbox credentials?
7777777777777777 Here is the **finish-to-launch checklist** from now until
Juliris is live, starting where you are: dev/mock green, ready for real PayPal
sandbox and Yaad test credentials.
[perplexity](https://www.perplexity.ai/search/bd94668b-6c80-48e0-bffd-8ab559247bfd)

---

## 1. Switch to real sandbox/test credentials

1. Create/get credentials

- PayPal: sandbox REST app (client ID, secret), sandbox buyer/seller accounts.
  [docs.paypal](https://docs.paypal.ai/reference/api/rest/orders/create-order)
- Yaad: test terminal, API key, return/notify URLs pointing to your
  `/api/yaad/callback` and `/api/yaad/return` (or equivalent).

2. Configure `.env.local` (local only)

- `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_ENV=sandbox`.
- `YAAD_TERMINAL_NUMBER`, `YAAD_API_KEY`, `YAAD_ENV=test`, `YAAD_RETURN_URL`,
  `YAAD_NOTIFY_URL`.
  [perplexity](https://www.perplexity.ai/search/3d075acd-5bf8-48a0-8aa0-a28e2f443e70)

3. Restart dev server so Next.js picks up env changes.

---

## 2. Repeat the 5 tests against real PayPal sandbox

Use **real provider calls**, same flows as now.

1. PayPal success (sandbox)

- Flow: Checkout → PayPal approval → `/api/paypal/return` →
  `/api/paypal/capture-order` → `/thank-you`.
  [perplexity](https://www.perplexity.ai/search/d0fc7511-11d1-485f-a058-a0aafcc69280)
- Verify:
  - Internal order status becomes `paid`.
  - `providerRefs.orderId` = PayPal order ID, `captureId` populated.
    [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/fba13f3c-dbd3-42d0-bb97-2c17509d9658/LIBorder.ts.MD)
  - Captured amount/currency match internal totals (no AMOUNT_MISMATCH).

2. PayPal cancel / decline

- Trigger cancel at PayPal.
- Back at `/checkout?error=payment_cancelled` (or decline code).
- Cart contents preserved; order stays `pending_payment` or moves to
  `cancelled`/`failed` (never `paid`).

3. PayPal idempotency

- Refresh `/api/paypal/return` URL or re-POST to `/api/paypal/capture-order`
  with same `paypalOrderId`.
  [perplexity](https://www.perplexity.ai/search/d0fc7511-11d1-485f-a058-a0aafcc69280)
- Expect JSON `idempotent: true` and unchanged internal state, no second
  capture.
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/23fecf04-53b9-468e-b98f-3e1563fadc58/APPAPIPAYPALCAPTURE-ORDERROUTE.TS.txt)

4. PayPal error/retry path

- Force an error (e.g., tamper token or expire order).
- Ensure provider/API errors log payment events but **do not** mark the order
  failed as a customer error; UI shows “please try again” and allows retry.
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/fba13f3c-dbd3-42d0-bb97-2c17509d9658/LIBorder.ts.MD)

5. PayPal ORDER_ALREADY_CAPTURED recovery

- Capture once, then simulate a second capture where PayPal returns
  `ORDER_ALREADY_CAPTURED`.
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/23fecf04-53b9-468e-b98f-3e1563fadc58/APPAPIPAYPALCAPTURE-ORDERROUTE.TS.txt)
- Expect reconciliation, safe `paid` state, or `reconciliationRequired` JSON
  with no double-charge.

---

## 3. Run equivalent Yaad test flows

1. Yaad success (redirect + IPN)

- Checkout with Yaad, complete payment in Yaad test UI.
- Verify:
  - `POST /api/yaad/callback` (notify) hits and marks order `paid` after amount
    reconciliation.
    [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/39372668-779c-4a53-8ed6-0f565607f6d9/appapiyaadcallbackroute.ts.txt)
  - Redirect `GET /api/yaad/callback` sends to `/thank-you?orderId=...`.
  - Amount in agorot equals internal total (no AMOUNT_MISMATCH/MISSING_AMOUNT).
    [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/39372668-779c-4a53-8ed6-0f565607f6d9/appapiyaadcallbackroute.ts.txt)

2. Notify-first vs redirect-first

- Confirm that if IPN arrives before redirect, order is already `paid` when the
  user lands on thank-you, and vice versa.
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/39372668-779c-4a53-8ed6-0f565607f6d9/appapiyaadcallbackroute.ts.txt)
- Replaying IPN or redirect does not change a terminal `paid`/`refunded` order.
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/fba13f3c-dbd3-42d0-bb97-2c17509d9658/LIBorder.ts.MD)

3. Yaad failure & cancel

- Simulate failed and cancelled transactions (non-zero `CCode`, `Rone=999`).
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/39372668-779c-4a53-8ed6-0f565607f6d9/appapiyaadcallbackroute.ts.txt)
- Orders end in `failed` or `cancelled`; checkout shows error; retry is allowed
  from those states.
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/fba13f3c-dbd3-42d0-bb97-2c17509d9658/LIBorder.ts.MD)

4. Yaad amount mismatch

- Manually hit callback with success code and wrong `Amount`.
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/39372668-779c-4a53-8ed6-0f565607f6d9/appapiyaadcallbackroute.ts.txt)
- Order is marked failed with `AMOUNT_MISMATCH` and not `paid`.

---

## 4. Catalog and product workflow finalization

You already have a single-source catalog and order layer; now make product
management repeatable.
[perplexity](https://www.perplexity.ai/search/bd94668b-6c80-48e0-bffd-8ab559247bfd)

1. Normalize catalog data

- Ensure every product/variant lives only in `data/products.json` (or your
  chosen canonical store), not duplicated in individual components.
- Confirm all storefront consumers read from this source: home grid, `/shop`,
  `/product/[id]`, search, cart, checkout.
  [perplexity](https://www.perplexity.ai/search/bd94668b-6c80-48e0-bffd-8ab559247bfd)

2. Define “add a product” checklist

- Folder/image convention (e.g., `public/images/products/{slug}/...`).
- Required fields: slug, name, description, price, compare-at, stock, category,
  tags, images, SEO fields.
- Document in `README-catalog.md` or similar.

3. Dry run

- Add one brand-new product solely via the canonical source and confirm it
  appears correctly everywhere without extra code changes.

---

## 5. Inventory, coupons, and pricing rules

With payments stable, make totals and stock behavior consistent.
[perplexity](https://www.perplexity.ai/search/bd94668b-6c80-48e0-bffd-8ab559247bfd)

1. Inventory

- For each line: check stock before add-to-cart and at checkout.
- Disable purchase when stock is 0; show out-of-stock messaging.

2. Coupons

- Ensure all coupon logic is centralized in `lib/coupons.ts`, applied once in
  `createPendingOrder()` or pricing layer, not per-route.
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/fba13f3c-dbd3-42d0-bb97-2c17509d9658/LIBorder.ts.MD)
- Confirm coupon usage increments only on first transition to `paid`.
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/fba13f3c-dbd3-42d0-bb97-2c17509d9658/LIBorder.ts.MD)

3. Shipping & thresholds

- Implement free-shipping thresholds or flat rules in one place (pricing lib).
- Confirm totals match those rules on cart and checkout.

---

## 6. Post-purchase operations

1. Thank-you page

- Show order number, items, totals, payment method, and clear next steps (e.g.,
  “You’ll receive an email with details”).
- Safe on refresh, no duplicate capture.
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/23fecf04-53b9-468e-b98f-3e1563fadc58/APPAPIPAYPALCAPTURE-ORDERROUTE.TS.txt)

2. Order confirmation email

- Hook into `paid` transitions (or after capture route success) to send email:
  order summary, amount, status, contact info.
- Use a simple provider for now (e.g., transactional SMTP or a service).

3. Admin view (even minimal)

- A simple `/admin/orders` page or CLI-only approach that lists orders in
  reverse date, with status, payment provider, and key paymentEvents.

---

## 7. Business docs and legal

For a Hebrew-first Israeli jewelry store, this is required to be credible.

1. Policies

- Pages: privacy, terms, shipping, returns/exchanges, warranty, contact.
- Link them from footer, checkout, and order confirmation.

2. Tax and invoices

- Decide how you will issue tax invoices/קבלה (e.g., separate invoicing system).
- Clarify in email/thank-you that invoice will be sent separately if that’s the
  case.

3. Support flow

- Define support email/WhatsApp and expected response time.
- Add this to emails, thank-you page, and contact page.

---

## 8. Analytics and marketing hooks

1. Core events

- Page view, view item, add-to-cart, begin checkout, purchase.
- Fire purchase only once per paid order (e.g., from thank-you resolving the
  internal order).
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/23fecf04-53b9-468e-b98f-3e1563fadc58/APPAPIPAYPALCAPTURE-ORDERROUTE.TS.txt)

2. UTM and attribution

- Preserve UTM params through to checkout so you can attribute orders.
- Optionally store UTM/campaign on the order for later analysis.

3. Tools

- At minimum GA4; optionally Meta/TikTok pixels if you plan to run ads.

---

## 9. Hebrew and localization pass

Once flows are stable, do the full language pass.
[perplexity](https://www.perplexity.ai/search/bd94668b-6c80-48e0-bffd-8ab559247bfd)

1. Translate storefront

- Home, shop, product, cart, checkout, thank-you, account, policy pages into
  Hebrew (with appropriate English where desired).
- Ensure RTL layout and Hebrew date/number formatting are correct.

2. Payment and email text

- Translate error messages, success messages, and email templates.
- Confirm that PayPal/Yaad flows still look coherent for Hebrew-speaking
  customers, even if provider screens are partially English.

---

## 10. QA and launch hardening

1. Functional QA

- On a matrix of devices/browsers: mobile Safari/Chrome, desktop
  Chrome/Firefox/Edge.
- Test: empty cart, single item, multiple items, coupon, out-of-stock, failed
  payments, cancelled payments, slow network.

2. Edge cases

- Browser back button during checkout.
- User closes tab after paying (IPN must still mark order paid).
- Duplicate callbacks (already covered by your state machine and
  processedCaptures).
  [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/36066708/23fecf04-53b9-468e-b98f-3e1563fadc58/APPAPIPAYPALCAPTURE-ORDERROUTE.TS.txt)

3. Monitoring and logs

- Ensure server logs for PayPal/Yaad callbacks and errors are accessible in
  production.
- Add basic uptime/error monitoring for the app and API routes.

---

## 11. Production cutover

1. Configure production credentials

- Switch `PAYPAL_ENV=live`, set live client ID/secret and Yaad production
  terminal/API key in a secure prod config (not committed).
  [docs.paypal](https://docs.paypal.ai/payments/methods/paypal/api/one-time/orders-api-integration)
- Adjust `NEXT_PUBLIC_BASE_URL` to the real domain.

2. Smoke test

- Place a very cheap real order with PayPal and with Yaad.
- Confirm money arrives where expected and orders are `paid` with correct
  events.

3. Launch checklist

- DNS, HTTPS, favicons, social metadata, and robots/meta tags set.
- Confirm no test products/prices or mock modes remain reachable.

---

If you’d like, I can turn this into a 7–10 day calendar-style plan (what to do
each day) assuming a few focused hours per day.
