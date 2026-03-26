"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ProductForm } from "@/components/admin/product-form"
import type { AdminProduct } from "@/types/admin"
import { DEFAULT_PRODUCT } from "@/types/admin"

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>()
  const isNew = id === "new"

  const [product, setProduct] = useState<AdminProduct | null>(
    isNew
      ? ({
          ...DEFAULT_PRODUCT,
          id: "new",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as AdminProduct)
      : null
  )
  const [loading, setLoading] = useState(!isNew)

  useEffect(() => {
    if (isNew) return
    fetch(`/api/admin/products/${id}`)
      .then((r) => r.json())
      .then((d) => { setProduct(d.product ?? null); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id, isNew])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground text-sm">Loading product…</p>
      </div>
    )
  }
  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive text-sm">Product not found.</p>
      </div>
    )
  }

  return <ProductForm initialProduct={product} isNew={isNew} />
}