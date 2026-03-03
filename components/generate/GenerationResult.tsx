"use client"

import Link from "next/link"
import { Download } from "lucide-react"
import { BeforeAfterSlider } from "@/components/ui/before-after-slider"
import { Button } from "@/components/ui/button"

interface GenerationResultProps {
  inputImageUrl: string
  outputImageUrl: string
  styleName: string
  onReset: () => void
}

export function GenerationResult({
  inputImageUrl,
  outputImageUrl,
  styleName,
  onReset,
}: GenerationResultProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-warm mb-2 block">
          Resultado
        </span>
        <h2 className="font-serif italic text-3xl font-bold text-foreground leading-tight">
          Estilo {styleName}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Arrastra el deslizador para comparar tu habitación original.
        </p>
      </div>

      {/* Before / After slider */}
      <BeforeAfterSlider
        before={inputImageUrl}
        after={outputImageUrl}
        className="aspect-[4/3] w-full"
      />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
        <a
          href={outputImageUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-11 px-6 bg-foreground text-background text-xs uppercase tracking-wide hover:bg-foreground/90 transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Descargar
        </a>

        <Button
          variant="outline"
          className="rounded-none h-11 px-6 text-xs uppercase tracking-wide"
          onClick={onReset}
        >
          Nueva generación
        </Button>

        <Link
          href="/app/history"
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors sm:ml-auto"
        >
          Ver historial →
        </Link>
      </div>
    </div>
  )
}
