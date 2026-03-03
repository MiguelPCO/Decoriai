import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_auto] items-end gap-10">
          {/* Left — text */}
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-background/40 mb-6 block">
              Empieza hoy
            </span>
            <h2 className="font-serif italic text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-background mb-8 max-w-xl">
              ¿Lista para
              <br />
              transformar tu
              <br />
              espacio?
            </h2>
            <p className="text-background/50 text-sm leading-relaxed max-w-sm">
              Completamente gratis. Sin tarjeta de crédito.
              Solo sube una foto y deja que la IA haga el resto.
            </p>
          </div>

          {/* Right — CTA */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <Button
              variant="secondary"
              className="rounded-none bg-background text-foreground hover:bg-background/90 h-12 px-8 text-sm tracking-wide uppercase"
              asChild
            >
              <Link href="/register">Empieza gratis →</Link>
            </Button>
            <Link
              href="/login"
              className="text-background/40 text-xs hover:text-background/70 transition-colors tracking-wide"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </div>

        {/* Divider + footer note */}
        <div className="border-t border-background/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif italic text-background/60 text-lg">Décoriai</span>
          <p className="text-background/25 text-xs tracking-wide">
            © {new Date().getFullYear()} Décoriai · Proyecto de portfolio
          </p>
        </div>
      </div>
    </section>
  )
}
