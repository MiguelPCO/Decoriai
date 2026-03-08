import Image from "next/image"
import Link from "next/link"
import { STYLES } from "@/lib/constants/styles"

interface StyleCardProps {
  id: string
  name: string
  description: string
  image: string
  className?: string
}

function StyleCard({ name, description, image, className = "" }: StyleCardProps) {
  return (
    <div
      className={`group relative overflow-hidden bg-muted cursor-default ${className}`}
    >
      <Image
        src={image}
        alt={`Estilo ${name}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

      {/* Label — bottom left, floating, Poliform style */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <span className="inline-block bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 mb-2 tracking-wide uppercase">
          {name}
        </span>
        <p className="text-white/65 text-xs leading-relaxed hidden md:block max-w-[180px]">
          {description}
        </p>
      </div>

      {/* Arrow corner */}
      <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-sm">↗</span>
      </div>
    </div>
  )
}

export function StylesGrid() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-warm mb-3 block">
              Estilos disponibles
            </span>
            <h2 className="font-serif italic text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Explora nuestra
              <br />
              colección de estilos
            </h2>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border px-4 py-2 self-start sm:self-auto"
          >
            Ver más →
          </Link>
        </div>

        {/* Mobile — grid 2 columnas uniforme */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {STYLES.slice(0, 18).map((style) => (
            <StyleCard key={style.id} {...style} className="aspect-[4/3]" />
          ))}
        </div>

        {/* Desktop — bento asimétrico à la Poliform */}
        <div className="hidden md:grid grid-cols-3 auto-rows-[260px] gap-3">
          {/* Minimalista — tall left (row-span-2) */}
          <StyleCard {...STYLES[0]} className="row-span-2" />

          {/* Nórdico — wide top right (col-span-2) */}
          <StyleCard {...STYLES[1]} className="col-span-2" />

          {/* Industrial — mid right 1 */}
          <StyleCard {...STYLES[2]} />

          {/* Mediterráneo — mid right 2 */}
          <StyleCard {...STYLES[3]} />

          {/* Japandi — wide bottom left (col-span-2) */}
          <StyleCard {...STYLES[4]} className="col-span-2" />

          {/* Clásico — bottom right */}
          <StyleCard {...STYLES[5]} />
        </div>
      </div>
    </section>
  )
}
