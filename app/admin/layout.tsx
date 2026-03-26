import type { ReactNode } from "react"
import Link from "next/link"
import { Package, LayoutDashboard, ExternalLink } from "lucide-react"

export const metadata = { title: "Juliris Admin" }

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-56 shrink-0 bg-card border-r border-border flex flex-col fixed top-0 left-0 h-full z-10">
        <div className="p-5 border-b border-border">
          <span className="font-serif text-lg text-foreground">Juliris Admin</span>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Package className="w-4 h-4" />
            Products
          </Link>
        </nav>
        <div className="p-3 border-t border-border">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Store
          </Link>
        </div>
      </aside>
      <main className="ml-56 flex-1 overflow-auto">{children}</main>
    </div>
  )
}