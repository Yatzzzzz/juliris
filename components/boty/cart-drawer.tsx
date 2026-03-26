"use client"

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useCart } from "./cart-context"
import { formatMoney } from "@/lib/pricing"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, isOpen, setIsOpen, itemCount, subtotal, shipping, total } = useCart()

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerContent className="h-full w-full sm:max-w-[440px]">
        <DrawerHeader className="border-b border-border/50 p-6 py-2.5" dir="rtl">
          <DrawerTitle className="font-serif-custom text-2xl">הסל שלך</DrawerTitle>
          <DrawerDescription className="font-sans-custom">{itemCount} מוצרים</DrawerDescription>
        </DrawerHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center" dir="rtl">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="font-sans-custom text-muted-foreground">הסל שלך עדיין ריק</p>
              <DrawerClose asChild>
                <button
                  type="button"
                  className="font-sans-custom mt-4 text-primary hover:underline text-sm"
                >
                  המשך קנייה
                </button>
              </DrawerClose>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0" dir="rtl">
                    <h3 className="font-serif-custom text-base text-foreground mb-1 font-semibold">{item.name}</h3>
                    <p className="font-sans-custom text-muted-foreground mb-3 text-sm">{item.description}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border rounded-full">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1.5 hover:bg-muted boty-transition rounded-l-full"
                          aria-label="הפחתת כמות"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1.5 hover:bg-muted boty-transition rounded-r-full"
                          aria-label="הגדלת כמות"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="p-1.5 text-muted-foreground hover:text-destructive boty-transition"
                        aria-label="הסרת מוצר"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-left font-sans-custom font-medium text-foreground">
                    <p>{formatMoney(item.unitPrice * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <DrawerFooter className="border-t border-border/50 p-6 gap-4" dir="rtl">
            {/* Summary */}
            <div className="space-y-2 text-sm font-sans-custom">
              <div className="flex justify-between text-muted-foreground">
                <span>סכום ביניים</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>משלוח</span>
                <span>{shipping === 0 ? "חינם" : formatMoney(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-medium text-foreground pt-2 border-t border-border/50">
                <span>סה״כ</span>
                <span>{formatMoney(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <DrawerClose asChild>
              <Link
                href="/checkout"
                className="font-sans-custom w-full inline-flex items-center justify-center bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 boty-transition"
              >
                מעבר לתשלום
              </Link>
            </DrawerClose>

            <DrawerClose asChild>
              <button
                type="button"
                className="font-sans-custom w-full border border-border text-foreground py-4 rounded-full font-medium hover:bg-muted boty-transition"
              >
                המשך קנייה
              </button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
