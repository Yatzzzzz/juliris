"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Save, Eye, EyeOff, Upload, Plus, X, Lock,
  AlertCircle, CheckCircle, ChevronLeft, ChevronDown, Star, Info,
} from "lucide-react"
import type { AdminProduct, VariantType } from "@/types/admin"
import { VARIANT_TYPE_LABELS } from "@/types/admin"

// ─── helpers ───────────────────────────────────────────────────────────────

function centsToDisplay(cents: number): string {
  return (cents / 100).toFixed(2)
}
function displayToCents(v: string): number {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""))
  return isNaN(n) ? 0 : Math.round(n * 100)
}
function slugify(t: string): string {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

// ─── primitives ────────────────────────────────────────────────────────────

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-card rounded-2xl border border-border p-6">
      {children}
    </section>
  )
}

function SectionHeader({ label, locked }: { label: string; locked?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <h2 className="font-semibold text-base text-foreground tracking-tight">{label}</h2>
      {locked && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
          <Lock className="w-3 h-3" /> Read-only
        </span>
      )}
    </div>
  )
}

function FieldLabel({ label, required, hint }: { label: string; required?: boolean; hint?: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {hint && (
        <span className="group relative cursor-default">
          <Info className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="absolute left-5 top-0 z-20 hidden group-hover:block bg-foreground text-background text-xs px-2.5 py-1.5 rounded-lg w-52 leading-relaxed shadow-lg whitespace-normal">
            {hint}
          </span>
        </span>
      )}
    </div>
  )
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"

const textareaCls =
  "w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"

// ─── main component ────────────────────────────────────────────────────────

interface Props {
  initialProduct: AdminProduct
  isNew: boolean
}

export function ProductForm({ initialProduct, isNew }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<AdminProduct>({ ...initialProduct })
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle")
  const [variantInput, setVariantInput] = useState("")
  const imageInputRef = useRef<HTMLInputElement>(null)

  const set = useCallback(<K extends keyof AdminProduct>(key: K, value: AdminProduct[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === "name" && (isNew || !prev.slug || prev.slug === slugify(prev.name))) {
        next.slug = slugify(value as string)
      }
      return next
    })
  }, [isNew])

  const addVariant = () => {
    const v = variantInput.trim()
    if (!v || form.variantOptions.includes(v)) return
    set("variantOptions", [...form.variantOptions, v])
    setVariantInput("")
  }

  const removeVariant = (opt: string) =>
    set("variantOptions", form.variantOptions.filter((o) => o !== opt))

  const handleImageFile = (file: File) => {
    set("imageUrl", URL.createObjectURL(file))
    if (!form.imageAlt) set("imageAlt", form.name || file.name)
  }

  const save = async (status: "draft" | "published") => {
    setSaving(true)
    setSaveStatus("idle")
    const payload: AdminProduct = { ...form, status }
    try {
      const res = isNew
        ? await fetch("/api/admin/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch(`/api/admin/products/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })

      if (!res.ok) throw new Error()
      const data = await res.json()
      setSaveStatus("saved")
      if (isNew) router.push(`/admin/products/${data.product.id}`)
      else setForm(data.product)
    } catch {
      setSaveStatus("error")
    } finally {
      setSaving(false)
    }
  }

  const hasSale = form.salePrice !== null && form.salePrice > 0

  // ─── render ──────────────────────────────────────────────────────────────

  return (
    <div className="p-8 max-w-3xl mx-auto pb-24">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/products")}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-2xl text-foreground">
              {isNew ? "New Product" : form.name || "Edit Product"}
            </h1>
            {!isNew && (
              <p className="text-xs text-muted-foreground mt-0.5">ID: {form.id}</p>
            )}
          </div>
        </div>
        <SaveButtons saving={saving} saveStatus={saveStatus} onSave={save} />
      </div>

      <div className="space-y-6">

        {/* ── A. Identity ── */}
        <SectionCard>
          <SectionHeader label="A — Identity" />
          <div className="space-y-4">
            <div>
              <FieldLabel label="Collection Label" hint="Shown above product name in small caps on the storefront" />
              <input className={inputCls} placeholder="Juliris Collection"
                value={form.collectionLabel}
                onChange={(e) => set("collectionLabel", e.target.value)} />
            </div>
            <div>
              <FieldLabel label="Product Name" required />
              <input className={inputCls} placeholder="e.g. 18k Gold Solitaire Ring"
                value={form.name}
                onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <FieldLabel label="Subtitle" hint="Optional italic tagline directly below product name" />
              <input className={inputCls} placeholder="e.g. Timeless elegance, handcrafted"
                value={form.subtitle}
                onChange={(e) => set("subtitle", e.target.value)} />
            </div>
            <div>
              <FieldLabel label="Slug" hint="URL identifier, auto-generated from product name" />
              <input className={inputCls} placeholder="18k-gold-solitaire-ring"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)} />
            </div>
            <div>
              <FieldLabel label="iJewel 3D Model ID" hint="File ID from iJewel Drive dashboard (e.g. Ep9bWZIlTSG6_8DH7QDc1w). Leave empty if no 3D model." />
              <input className={inputCls} placeholder="e.g. Ep9bWZIlTSG6_8DH7QDc1w"
                value={form.ijewelModelId}
                onChange={(e) => set("ijewelModelId", e.target.value)} />
            </div>
          </div>
        </SectionCard>

        {/* ── B. Social Proof ── */}
        <SectionCard>
          <SectionHeader label="B — Social Proof" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FieldLabel label="Show Reviews" hint="When OFF, the entire reviews row is hidden on the product page" />
              <Toggle value={form.showReviews} onChange={(v) => set("showReviews", v)} />
            </div>
            {form.showReviews && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel label="Star Rating" hint="0–5, in 0.5 steps" />
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <input className={inputCls + " pl-10"} type="number" min="0" max="5" step="0.5"
                      value={form.starRating}
                      onChange={(e) => set("starRating", parseFloat(e.target.value) || 0)} />
                  </div>
                </div>
                <div>
                  <FieldLabel label="Review Count" />
                  <input className={inputCls} type="number" min="0"
                    value={form.reviewCount}
                    onChange={(e) => set("reviewCount", parseInt(e.target.value, 10) || 0)} />
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        {/* ── C. Description ── */}
        <SectionCard>
          <SectionHeader label="C — Description" />
          <div>
            <FieldLabel label="Short Description" hint="Visible on the product page directly below the review stars" />
            <textarea className={textareaCls} rows={3} placeholder="Write a short product description…"
              value={form.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value)} />
          </div>
        </SectionCard>

        {/* ── D. Pricing ── */}
        <SectionCard>
          <SectionHeader label="D — Pricing" />
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel label="Regular Price" required hint="Stored in cents internally" />
                <input className={inputCls} type="text" placeholder="0.00"
                  value={centsToDisplay(form.regularPrice)}
                  onChange={(e) => set("regularPrice", displayToCents(e.target.value))} />
              </div>
              <div>
                <FieldLabel label="Sale Price" hint="Leave empty for no sale" />
                <input className={inputCls} type="text"
                  placeholder={hasSale ? centsToDisplay(form.salePrice!) : "No sale"}
                  value={hasSale ? centsToDisplay(form.salePrice!) : ""}
                  onChange={(e) => {
                    const v = e.target.value.trim()
                    set("salePrice", v === "" ? null : displayToCents(v))
                  }} />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── E. Variants ── */}
        <SectionCard>
          <SectionHeader label="E — Variants" />
          <div className="space-y-4">
            <div>
              <FieldLabel label="Variant Type" />
              <select className={inputCls}
                value={form.variantType}
                onChange={(e) => set("variantType", e.target.value as VariantType)}>
                {Object.entries(VARIANT_TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            {form.variantType === "custom" && (
              <div>
                <FieldLabel label="Custom Label" hint="Label shown above variant selector" />
                <input className={inputCls} placeholder="e.g. Material"
                  value={form.variantCustomLabel}
                  onChange={(e) => set("variantCustomLabel", e.target.value)} />
              </div>
            )}
            {form.variantType !== "none" && (
              <div>
                <FieldLabel label="Options" hint="First option is selected by default" />
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.variantOptions.map((opt) => (
                    <span key={opt} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-sm text-foreground">
                      {opt}
                      <button type="button" onClick={() => removeVariant(opt)} className="hover:text-destructive" aria-label={`Remove ${opt}`}>
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input className={inputCls} placeholder="Add option…"
                    value={variantInput}
                    onChange={(e) => setVariantInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addVariant() } }} />
                  <button type="button" onClick={addVariant}
                    className="shrink-0 p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        {/* ── G. Accordion Content ── */}
        <SectionCard>
          <SectionHeader label="G — Accordion Content" />
          <div className="space-y-4">
            <div>
              <FieldLabel label="Details" />
              <textarea className={textareaCls} rows={4} placeholder="Product details…"
                value={form.details}
                onChange={(e) => set("details", e.target.value)} />
            </div>
            <div>
              <FieldLabel label="How to Use" />
              <textarea className={textareaCls} rows={4} placeholder="Usage instructions…"
                value={form.howToUse}
                onChange={(e) => set("howToUse", e.target.value)} />
            </div>
            <div>
              <FieldLabel label="Ingredients" />
              <textarea className={textareaCls} rows={4} placeholder="List ingredients…"
                value={form.ingredients}
                onChange={(e) => set("ingredients", e.target.value)} />
            </div>
          </div>
        </SectionCard>

        {/* ── H. Image ── */}
        <SectionCard>
          <SectionHeader label="H — Image" />
          <div className="space-y-4">
            {form.imageUrl && (
              <div className="relative w-full aspect-square max-w-xs rounded-2xl overflow-hidden border border-border">
                <Image src={form.imageUrl} alt={form.imageAlt || form.name} fill className="object-cover" />
              </div>
            )}
            <div>
              <FieldLabel label="Image URL" hint="Direct URL or upload a file below" />
              <input className={inputCls} placeholder="https://…"
                value={form.imageUrl}
                onChange={(e) => set("imageUrl", e.target.value)} />
            </div>
            <div>
              <FieldLabel label="Alt Text" hint="Describes the image for accessibility and SEO" />
              <input className={inputCls} placeholder="e.g. 18k gold solitaire ring on velvet"
                value={form.imageAlt}
                onChange={(e) => set("imageAlt", e.target.value)} />
            </div>
            <div>
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) handleImageFile(e.target.files[0]) }} />
              <button type="button"
                onClick={() => imageInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm text-foreground hover:bg-muted transition-colors">
                <Upload className="w-4 h-4" /> Upload Image
              </button>
            </div>
          </div>
        </SectionCard>

      </div>
    </div>
  )
}

// ─── sub-components ─────────────────────────────────────────────────────────

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${value ? "bg-primary" : "bg-muted"}`}>
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition-transform ${value ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  )
}

function SaveButtons({ saving, saveStatus, onSave }: { saving: boolean; saveStatus: "idle" | "saved" | "error"; onSave: (s: "draft" | "published") => void }) {
  return (
    <div className="flex items-center gap-3">
      {saveStatus === "saved" && (
        <span className="inline-flex items-center gap-1 text-sm text-primary">
          <CheckCircle className="w-4 h-4" /> Saved
        </span>
      )}
      {saveStatus === "error" && (
        <span className="inline-flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" /> Error
        </span>
      )}
      <button type="button" onClick={() => onSave("draft")} disabled={saving}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-foreground hover:bg-muted transition-colors disabled:opacity-50">
        <EyeOff className="w-4 h-4" /> Save Draft
      </button>
      <button type="button" onClick={() => onSave("published")} disabled={saving}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
        <Save className="w-4 h-4" /> {saving ? "Saving…" : "Publish"}
      </button>
    </div>
  )
}