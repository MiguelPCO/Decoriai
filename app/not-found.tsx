import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <span className="text-xs uppercase tracking-[0.2em] text-warm mb-4 block">
        Error 404
      </span>
      <h1 className="font-serif italic text-7xl md:text-9xl font-bold text-foreground leading-none mb-6">
        Perdido.
      </h1>
      <p className="text-muted-foreground text-sm max-w-xs text-center mb-10">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="inline-flex items-center h-11 px-8 bg-foreground text-background text-xs uppercase tracking-wide hover:bg-foreground/90 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
