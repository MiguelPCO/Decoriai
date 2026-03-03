import Link from "next/link"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { STYLES } from "@/lib/constants/styles"

export default async function AppDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const firstName =
    ((user?.user_metadata?.full_name as string | undefined) ?? "")
      .split(" ")[0]
      .trim() || user?.email?.split("@")[0] || "ahí"

  // Tres queries en paralelo: total, completadas, últimas 3 imágenes
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
          className="shrink-0 inline-flex items-center gap-2 h-10 px-5 bg-foreground text-background text-xs uppercase tracking-wide hover:bg-foreground/90 transition-colors mb-1"
        >
          <Sparkles className="h-3 w-3" />
          Nueva generación
        </Link>
      </div>

      {/* Stats */}
      {hasGenerations && (
        <div className="flex items-center gap-8 mb-10 pb-10 border-b border-border">
          <div>
            <p className="font-serif italic text-3xl font-bold text-foreground">
              {totalCount}
            </p>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-0.5">
              {totalCount === 1 ? "Generación" : "Generaciones"}
            </p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="font-serif italic text-3xl font-bold text-foreground">
              {completedCount}
            </p>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-0.5">
              Completadas
            </p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="font-serif italic text-3xl font-bold text-foreground">
              6
            </p>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-0.5">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {recent.map((gen) => {
              const styleName =
                STYLES.find((s) => s.id === gen.style)?.name ??
                gen.style ??
                ""
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
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                  </div>
                  <p className="font-serif italic text-sm font-semibold text-foreground mt-2 leading-tight">
                    {styleName}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!hasGenerations && (
        <div className="border border-dashed border-border py-24 flex flex-col items-center justify-center text-center">
          <p className="font-serif italic text-2xl text-muted-foreground mb-2">
            Tu lienzo está en blanco.
          </p>
          <p className="text-sm text-muted-foreground mb-8 max-w-xs">
            Sube una foto de tu habitación y elige un estilo para empezar a
            transformarla.
          </p>
          <Link
            href="/app/generate"
            className="inline-flex items-center gap-2 h-11 px-8 bg-foreground text-background text-xs uppercase tracking-wide hover:bg-foreground/90 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Crear primera generación →
          </Link>
        </div>
      )}
    </div>
  )
}
