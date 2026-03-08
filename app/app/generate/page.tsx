"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { uploadRoomPhoto } from "@/lib/storage"
import { ImageUploader } from "@/components/generate/ImageUploader"
import { StyleSelector } from "@/components/generate/StyleSelector"
import { StylePreview } from "@/components/generate/StylePreview"
import { GenerationResult } from "@/components/generate/GenerationResult"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { getStyleDisplayName } from "@/lib/constants/styles"
import { cn } from "@/lib/utils"

type PageState = "idle" | "uploading" | "processing" | "done" | "error"
type GenerationMode = "con-referencia" | "sin-referencia"

export default function GeneratePage() {
  const [pageState, setPageState] = useState<PageState>("idle")
  const [mode, setMode] = useState<GenerationMode>("con-referencia")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const [inputImageUrl, setInputImageUrl] = useState<string | null>(null)
  const [outputImageUrl, setOutputImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const previewUrlRef = useRef<string | null>(null)
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Obtener userId en el montaje
  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setUserId(data.user?.id ?? null))
  }, [])

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [])

  function handleFile(f: File) {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    const url = URL.createObjectURL(f)
    previewUrlRef.current = url
    setFile(f)
    setPreview(url)
  }

  function handleClear() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }
    setFile(null)
    setPreview(null)
  }

  function handleModeChange(newMode: GenerationMode) {
    setMode(newMode)
    handleClear()
    setSelectedStyle(null)
    setPrompt("")
    setError(null)
  }

  function reset() {
    handleClear()
    setMode("con-referencia")
    setSelectedStyle(null)
    setPrompt("")
    setInputImageUrl(null)
    setOutputImageUrl(null)
    setError(null)
    setPageState("idle")
    if (pollingRef.current) {
      clearInterval(pollingRef.current)
      pollingRef.current = null
    }
  }

  function startPolling(generationId: string) {
    const MAX_POLLS = 40 // 40 × 3s = 2 minutos máximo
    let polls = 0

    pollingRef.current = setInterval(async () => {
      polls++
      if (polls > MAX_POLLS) {
        clearInterval(pollingRef.current!)
        pollingRef.current = null
        setError("La generación tardó demasiado. Inténtalo de nuevo.")
        setPageState("error")
        toast.error("Tiempo de espera agotado.")
        return
      }

      try {
        const res = await fetch(`/api/generate/${generationId}`)
        const data = (await res.json()) as {
          status: string
          outputImageUrl?: string
        }

        if (data.status === "completed" && data.outputImageUrl) {
          clearInterval(pollingRef.current!)
          pollingRef.current = null
          setOutputImageUrl(data.outputImageUrl)
          setPageState("done")
          toast.success("¡Tu diseño está listo!")
        } else if (data.status === "failed") {
          clearInterval(pollingRef.current!)
          pollingRef.current = null
          setError("No se pudo generar el diseño. Inténtalo de nuevo.")
          setPageState("error")
          toast.error("Error en la generación.")
        }
      } catch {
        clearInterval(pollingRef.current!)
        pollingRef.current = null
        setError("Error de conexión. Inténtalo de nuevo.")
        setPageState("error")
      }
    }, 3000)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!userId) return
    if (mode === "con-referencia" && !file) return
    if (!selectedStyle && !prompt.trim()) return

    setError(null)

    try {
      let uploadedUrl: string | null = null

      if (mode === "con-referencia" && file) {
        // Paso 1 — subir imagen de referencia
        setPageState("uploading")
        uploadedUrl = await uploadRoomPhoto(file, userId)
        setInputImageUrl(uploadedUrl)
      }

      // Paso 2 — crear predicción
      setPageState("processing")
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputImageUrl: uploadedUrl ?? null,
          style: selectedStyle,
          prompt: prompt.trim() || undefined,
        }),
      })

      if (!res.ok) {
        const body = (await res.json()) as { error?: string }
        throw new Error(body.error ?? "Error al iniciar la generación.")
      }

      const { generationId } = (await res.json()) as { generationId: string }

      // Paso 3 — polling hasta que Replicate complete
      startPolling(generationId)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.")
      setPageState("error")
    }
  }

  const isProcessing = pageState === "uploading" || pageState === "processing"
  const canSubmit =
    (mode === "con-referencia" ? !!file : true) &&
    (!!selectedStyle || !!prompt.trim()) &&
    !isProcessing

  function handleSuggestion(text: string) {
    setPrompt((prev) => {
      if (!prev.trim()) return text
      return `${prev.trim()}, ${text}`
    })
  }

  const selectedStyleName = selectedStyle ? getStyleDisplayName(selectedStyle) : ""

  // ── Pantalla de resultado ──────────────────────────────────────────────────
  if (pageState === "done" && outputImageUrl) {
    return (
      <div className="p-6 md:p-10 max-w-2xl">
        <GenerationResult
          inputImageUrl={inputImageUrl}
          outputImageUrl={outputImageUrl}
          styleName={selectedStyleName}
          onReset={reset}
        />
      </div>
    )
  }

  // ── Formulario (split-screen en lg+) ───────────────────────────────────────
  return (
    <div className="flex flex-col lg:flex-row min-h-dvh">
      {/* Panel izquierdo — formulario scrollable */}
      <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0 lg:border-r border-border p-6 md:p-10 lg:overflow-y-auto lg:h-dvh">
        {/* Header */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-warm mb-2 block">
          Rediseña tu espacio
        </span>
        <h1 className="font-serif italic text-4xl font-bold text-foreground leading-tight">
          Nueva generación.
        </h1>
      </div>

      {/* Toggle de modo */}
      <div className="flex border border-border mb-10 rounded-md overflow-hidden">
        <button
          type="button"
          onClick={() => handleModeChange("con-referencia")}
          className={cn(
            "flex-1 h-10 text-xs uppercase tracking-wide transition-colors",
            mode === "con-referencia"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Con referencia
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("sin-referencia")}
          className={cn(
            "flex-1 h-10 text-xs uppercase tracking-wide transition-colors border-l border-border",
            mode === "sin-referencia"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Sin referencia
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* ── Paso 1 — Foto (solo en modo con referencia) ───────────────── */}
        {mode === "con-referencia" && (
          <div className="space-y-3">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-warm/80 font-medium">
                01 — Tu habitación
              </span>
              <p className="font-serif italic text-xl font-semibold text-foreground mt-1">
                Sube una foto
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Una foto clara de la habitación que quieres transformar.
              </p>
            </div>
            <ImageUploader
              onFile={handleFile}
              preview={preview}
              onClear={handleClear}
              disabled={isProcessing}
            />
          </div>
        )}

        {/* ── Paso 2 — Estilo ───────────────────────────────────────────── */}
        <div className="space-y-3">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-warm/80 font-medium">
              {mode === "con-referencia" ? "02" : "01"} — Estilo de diseño
            </span>
            <p className="font-serif italic text-xl font-semibold text-foreground mt-1">
              Elige un estilo{" "}
              <span className="text-base font-normal text-muted-foreground not-italic">
                (opcional)
              </span>
            </p>
          </div>
          <StyleSelector
            value={selectedStyle}
            onChange={setSelectedStyle}
            disabled={isProcessing}
            onSuggestion={handleSuggestion}
          />
        </div>

        {/* ── Paso 3 — Prompt ───────────────────────────────────────────── */}
        <div className="space-y-3">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-warm/80 font-medium">
              {mode === "con-referencia" ? "03" : "02"} — Instrucciones
            </span>
            <p className="font-serif italic text-xl font-semibold text-foreground mt-1">
              Detalles adicionales{" "}
              <span className="text-base font-normal text-muted-foreground not-italic">
                (opcional)
              </span>
            </p>
          </div>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            disabled={isProcessing}
            placeholder="Ej: añade plantas, mantén el parquet, luz cálida..."
            className="rounded-none bg-background/60 resize-none focus-visible:ring-0 focus-visible:border-foreground"
          />
          {!selectedStyle && !prompt.trim() && (
            <p className="text-xs text-muted-foreground">
              Selecciona un estilo o escribe instrucciones para continuar.
            </p>
          )}
        </div>

        {/* ── Error ─────────────────────────────────────────────────────── */}
        {error && (
          <Alert variant="destructive" className="rounded-none">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* ── Indicador de progreso ─────────────────────────────────────── */}
        {isProcessing && (
          <div className="border border-border px-5 py-4 bg-warm/5">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full border-2 border-foreground border-t-transparent animate-spin shrink-0" />
              <span className="text-sm text-foreground">
                {pageState === "uploading"
                  ? "Subiendo foto..."
                  : "La IA está generando tu diseño... (~30s)"}
              </span>
            </div>
          </div>
        )}

        {/* ── Botón submit ──────────────────────────────────────────────── */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full h-12 bg-foreground text-background text-sm uppercase tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded-md"
        >
          {isProcessing ? "Generando..." : "Generar diseño →"}
        </button>
      </form>
      </div>{/* fin panel izquierdo */}

      {/* Panel derecho — Style Preview (solo lg+) */}
      <div className="hidden lg:flex flex-1 sticky top-0 h-dvh overflow-hidden">
        <StylePreview
          selectedStyleId={selectedStyle}
          isProcessing={isProcessing}
        />
      </div>

    </div>
  )
}
