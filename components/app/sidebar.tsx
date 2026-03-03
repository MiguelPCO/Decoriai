"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Sparkles, History, Home, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/app", icon: Home, label: "Inicio", exact: true },
  { href: "/app/generate", icon: Sparkles, label: "Generar", exact: false },
  { href: "/app/history", icon: History, label: "Historial", exact: false },
] as const

interface SidebarProps {
  email: string
  signOutAction: () => Promise<void>
}

export function Sidebar({ email, signOutAction }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  const navLinks = NAV_ITEMS.map(({ href, icon: Icon, label, exact }) => (
    <Link
      key={href}
      href={href}
      onClick={() => setMobileOpen(false)}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors border-l-2",
        isActive(href, exact)
          ? "border-foreground text-foreground bg-muted/50 font-medium"
          : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  ))

  const sidebarContent = (showClose = false) => (
    <>
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <Link
          href="/"
          className="font-serif italic text-xl font-bold tracking-tight"
          onClick={() => setMobileOpen(false)}
        >
          Décoriai
        </Link>
        {showClose && (
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-0.5">{navLinks}</nav>

      <div className="p-3 border-t border-border space-y-1">
        <p className="px-3 py-1 text-xs text-muted-foreground truncate">{email}</p>
        <form action={signOutAction}>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive rounded-none"
            type="submit"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </form>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar — estático en el flujo flex */}
      <aside className="hidden md:flex w-60 shrink-0 border-r border-border flex-col bg-white sticky top-0 h-screen">
        {sidebarContent(false)}
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white border-b border-border flex items-center justify-between px-4">
        <Link
          href="/app"
          className="font-serif italic text-lg font-bold tracking-tight"
        >
          Décoriai
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile drawer + backdrop */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="md:hidden fixed top-0 left-0 h-screen w-72 z-50 flex flex-col bg-white border-r border-border">
            {sidebarContent(true)}
          </aside>
        </>
      )}
    </>
  )
}
