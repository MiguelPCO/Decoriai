"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo — serif italic */}
        <Link
          href="/"
          className={cn(
            "font-serif italic text-xl font-bold tracking-tight transition-colors",
            scrolled ? "text-foreground" : "text-white",
          )}
        >
          Décoriai
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/login"
            className={cn(
              "text-sm px-4 py-2 transition-colors",
              scrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-white/70 hover:text-white",
            )}
          >
            Iniciar sesión
          </Link>
          {/* Square button — architectural precision */}
          <Button
            size="sm"
            asChild
            className={cn(
              "rounded-none px-5 h-9 text-xs tracking-wide uppercase",
              scrolled
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-white text-foreground hover:bg-white/90",
            )}
          >
            <Link href="/register">Empieza gratis</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
