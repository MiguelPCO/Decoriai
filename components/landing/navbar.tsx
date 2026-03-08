"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [firstName, setFirstName] = useState<string | null>(null)
  const [entering, setEntering] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        if (data.user) {
          const name =
            ((data.user.user_metadata?.full_name as string | undefined) ?? "")
              .split(" ")[0]
              .trim() ||
            data.user.email?.split("@")[0] ||
            ""
          setFirstName(name)
        }
      })
  }, [])

  const handleEnter = useCallback(() => {
    setEntering(true)
    // Dejar que el fade-out complete antes de navegar
    setTimeout(() => router.push("/app"), 600)
  }, [router])

  return (
    <>
      {/* Overlay de transición — fade to dark al entrar a la app */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-[#1a1714] pointer-events-none transition-opacity duration-500",
          entering ? "opacity-100" : "opacity-0",
        )}
      />

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
            {firstName ? (
              /* Usuario con sesión activa */
              <button
                onClick={handleEnter}
                className={cn(
                  "inline-flex items-center gap-2 rounded-none px-5 h-9 text-xs tracking-wide uppercase transition-colors animate-in fade-in duration-500",
                  scrolled
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-white text-foreground hover:bg-white/90",
                )}
              >
                <span className="hidden sm:inline font-normal normal-case tracking-normal text-xs opacity-70 capitalize">
                  {firstName}
                </span>
                <span className="hidden sm:inline opacity-40">·</span>
                Tu espacio →
              </button>
            ) : (
              /* Sin sesión */
              <>
                <Link
                  href="/login"
                  className={cn(
                    "hidden sm:block text-sm px-4 py-2 transition-colors",
                    scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/70 hover:text-white",
                  )}
                >
                  Iniciar sesión
                </Link>
                <Button
                  size="sm"
                  asChild
                  className={cn(
                    "rounded-md px-5 h-9 text-xs tracking-wide uppercase",
                    scrolled
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-white text-foreground hover:bg-white/90",
                  )}
                >
                  <Link href="/register">Empieza gratis</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
