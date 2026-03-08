import Link from "next/link"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { STYLES, getStyleDisplayName } from "@/lib/constants/styles"

export default async function AppDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const firstName =
    ((user?.user_metadata?.full_name as string | undefined) ?? "")
      .split(" ")[0]
      .trim() || user?.email?.split("@")[0] || "ahí"

  const [{ count: totalCount }, { count: completedCount }, { data: recent }] =
    await Promise.all([
      supabase
        .from("generations")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id),
      supabase
        .from("generations")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .eq("status", "completed"),
      supabase
        .from("generations")
        .select("id, style, output_image_url, created_at")
        .eq("user_id", user!.id)
        .eq("status", "completed")
        .not("output_image_url", "is", null)
        .order("created_at", { ascending: false })
        .limit(3),
    ])

  const hasGenerations = (totalCount ?? 0) > 0
  const hasRecent = recent && recent.length > 0

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-warm mb-2 block">
            Tu espacio
          </span>
          <h1 className="font-serif italic text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Hola, {firstName}.
          </h1>
        </div>
        <Link
          href="/app/generate"
          className="shrink-0 inline-flex items-center gap-2 h-10 px-5 bg-foreground text-background text-xs uppercase tracking-wide hover:bg-foreground/90 transition-colors mb-1 rounded-md"
        >
          <Sparkles className="h-3 w-3" />
          Nueva generación
        </Link>
      </div>

      {/* Stats */}
      {hasGenerations && (
        <div className="flex items-start gap-10 mb-12 pb-10 border-b border-border">
          <div>
            <p className="font-serif italic text-5xl font-bold text-foreground leading-none">
              {totalCount}
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">
              {totalCount === 1 ? "Generación" : "Generaciones"}
            </p>
          </div>
          <div className="w-px h-14 bg-border/60 mt-1" />
          <div>
            <p className="font-serif italic text-5xl font-bold text-foreground leading-none">
              {completedCount}
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">
              Completadas
            </p>
          </div>
          <div className="w-px h-14 bg-border/60 mt-1" />
          <div>
            <p className="font-serif italic text-5xl font-bold text-foreground leading-none">
              {STYLES.length}
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">
              Estilos
            </p>
          </div>
        </div>
      )}

      {/* Últimas creaciones */}
      {hasRecent && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs uppercase tracking-[0.2em] text-warm">
              Últimas creaciones
            </span>
            <Link
              href="/app/history"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
            >
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recent.map((gen) => {
              const styleName = getStyleDisplayName(gen.style ?? "")
              return (
                <Link
                  key={gen.id}
                  href="/app/history"
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={gen.output_image_url!}
                      alt={styleName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                    {/* Gradient overlay — style name en hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="font-serif italic text-sm font-semibold text-white leading-tight">
                        {styleName}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* CTA card — rellena el espacio vacío */}
      {hasRecent && (
        <div className="mt-12 border border-border/60 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-warm mb-2 block">
              Sigue creando
            </span>
            <p className="font-serif italic text-2xl font-bold text-foreground">
              ¿Qué habitación transformamos hoy?
            </p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Cada espacio esconde un nuevo diseño esperando ser descubierto.
            </p>
          </div>
          <Link
            href="/app/generate"
            className="shrink-0 inline-flex items-center gap-2 h-11 px-8 bg-foreground text-background text-xs uppercase tracking-wide hover:bg-foreground/90 transition-colors rounded-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Nueva generación
          </Link>
        </div>
      )}

      {/* Empty state */}
      {!hasGenerations && (
        <div className="space-y-8">
          {/* Hero vacío con thumbnails de fondo */}
          <div className="relative overflow-hidden rounded-md border border-border/60 min-h-[280px] flex flex-col items-center justify-center text-center p-10">
            {/* Grid tenue de thumbnails al fondo */}
            <div className="absolute inset-0 grid grid-cols-4 opacity-[0.12] pointer-events-none">
              {STYLES.slice(0, 4).map((s) => (
                <div key={s.id} className="relative overflow-hidden">
                  <Image src={s.image} alt="" fill className="object-cover" sizes="20vw" />
                </div>
              ))}
            </div>
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/90" />
            {/* Contenido */}
            <div className="relative z-10">
              <p className="font-serif italic text-3xl font-bold text-foreground mb-2">
                Tu lienzo está en blanco.
              </p>
              <p className="text-sm text-muted-foreground mb-8 max-w-xs">
                Sube una foto de tu habitación y elige un estilo para empezar a transformarla.
              </p>
              <Link
                href="/app/generate"
                className="inline-flex items-center gap-2 h-11 px-8 bg-foreground text-background text-xs uppercase tracking-wide hover:bg-foreground/90 transition-colors rounded-md"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Crear primera generación →
              </Link>
            </div>
          </div>

          {/* Catálogo preview — 6 estilos en 2 filas de 3 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-warm">
                Catálogo de estilos
              </span>
              <Link href="/app/generate" className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide">
                Explorar →
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {STYLES.slice(0, 6).map((style) => (
                <Link key={style.id} href="/app/generate" className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-sm">
                    <Image
                      src={style.image}
                      alt={style.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      sizes="15vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <p className="absolute bottom-1.5 left-2 font-serif italic text-[10px] text-white leading-tight">
                      {style.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
