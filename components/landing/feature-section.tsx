import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const FEATURE_IMAGE =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85"

export function FeatureSection() {
  return (
    <section className="grid lg:grid-cols-[1fr_1fr] bg-background">
      {/* Imagen izquierda — a sangre */}
      <div className="relative min-h-[420px] lg:min-h-[580px]">
        <Image
          src={FEATURE_IMAGE}
          alt="Estilo moderno y atemporal"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Texto derecha */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-20 bg-white">
        {/* Eyebrow tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 bg-warm" />
          <span className="text-xs uppercase tracking-[0.2em] text-warm">
            Elegancia · Atemporalidad
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-serif italic text-4xl md:text-5xl font-bold leading-[1.05] text-foreground mb-6">
          Estilo moderno,
          <br />
          encanto atemporal.
        </h2>

        {/* Body */}
        <p className="text-muted-foreground leading-relaxed max-w-md mb-10">
          Décoriai combina la potencia de la inteligencia artificial con estilos
          cuidadosamente seleccionados por diseñadores. El resultado: espacios que
          no solo se ven bien, sino que se sienten como hogar.
        </p>

        <Button
          className="rounded-md w-fit px-8 h-11 text-sm tracking-wide"
          asChild
        >
          <Link href="/register">Descubre los estilos</Link>
        </Button>
      </div>
    </section>
  )
}
