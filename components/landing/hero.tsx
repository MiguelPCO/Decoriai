import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Luxury interior — full-bleed hero à la Poliform
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1618221941164-3f3d3b3e3f8f?auto=format&fit=crop&w=1800&q=90"

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image — sangre */}
      <Image
        src={HERO_IMAGE}
        alt="Habitación rediseñada con Décoriai"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Dark gradient — bottom-heavy para leer el texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

      {/* Contenido — anclado en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <p className="text-white/50 text-xs uppercase tracking-[0.25em] mb-5">
            Rediseño de interiores · Inteligencia Artificial
          </p>

          {/* Headline grande — serif italic à la Poliform */}
          <h1 className="font-serif italic text-white text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.92] tracking-tight mb-8 max-w-4xl">
            Tu espacio,
            <br />
            reinventado.
          </h1>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              className="rounded-none px-8 h-12 bg-white text-foreground hover:bg-white/90 text-sm tracking-wide"
              asChild
            >
              <Link href="/register">Empieza gratis</Link>
            </Button>
            <Link
              href="#como-funciona"
              className="text-white/60 text-sm hover:text-white transition-colors tracking-wide"
            >
              Cómo funciona ↓
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
