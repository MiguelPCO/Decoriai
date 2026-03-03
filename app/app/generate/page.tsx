"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { uploadRoomPhoto } from "@/lib/storage"
import { ImageUploader } from "@/components/generate/ImageUploader"
import { StyleSelector } from "@/components/generate/StyleSelector"
import { GenerationResult } from "@/components/generate/GenerationResult"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { STYLES } from "@/lib/constants/styles"

type PageState = "idle" | "uploading" | "processing" | "done" | "error"

export default function GeneratePage() {
  const [pageState, setPageState] = useState<PageState>("idle")
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

  function reset() {
    handleClear()
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
    pollingRef.current = setInterval(async () => {
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
    if (!file || !selectedStyle || !userId) return

    setError(null)

    try {
      // Paso 1 — subir imagen
      setPageState("uploading")
      const uploaded = await uploadRoomPhoto(file, userId)
      setInputImageUrl(uploaded)

      // Paso 2 — crear predicción
      setPageState("processing")
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputImageUrl: uploaded,
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
  const canSubmit = !!file && !!selectedStyle && !isProcessing

  const selectedStyleName = STYLES.find((s) => s.id === selectedStyle)?.name ?? ""

  // ── Pantalla de resultado ──────────────────────────────────────────────────
  if (pageState === "done" && inputImageUrl && outputImageUrl) {
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

  // ── Formulario ─────────────────────────────────────────────────────────────
  return (
    <div className="p-6 md:p-10 max-w-2xl">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-warm mb-2 block">
          Rediseña tu espacio
        </span>
        <h1 className="font-serif italic text-4xl font-bold text-foreground leading-tight">
          Nueva generación.
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* ── Paso 1 — Foto ─────────────────────────────────────────────── */}
        <div className="space-y-3">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
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

        {/* ── Paso 2 — Estilo ───────────────────────────────────────────── */}
        <div className="space-y-3">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              02 — Estilo de diseño
            </span>
            <p className="font-serif italic text-xl font-semibold text-foreground mt-1">
              Elige un estilo
            </p>
          </div>
          <StyleSelector
            value={selectedStyle}
            onChange={setSelectedStyle}
            disabled={isProcessing}
          />
        </div>

        {/* ── Paso 3 — Prompt ───────────────────────────────────────────── */}
        <div className="space-y-3">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              03 — Instrucciones
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
            className="rounded-none bg-white resize-none focus-visible:ring-0 focus-visible:border-foreground"
          />
        </div>

        {/* ── Error ─────────────────────────────────────────────────────── */}
        {error && (
          <Alert variant="destructive" className="rounded-none">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* ── Indicador de progreso ─────────────────────────────────────── */}
        {isProcessing && (
          <div className="border border-border px-5 py-4 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full border-2 border-foreground border-t-transparent animate-spin shrink-0" />
              <span className="text-sm text-foreground">
                {pageState === "uploading"
                  ? "Subiendo foto..."
                  : "La IA está rediseñando tu espacio... (~30s)"}
              </span>
            </div>
          </div>
        )}

        {/* ── Botón submit ──────────────────────────────────────────────── */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full h-12 bg-foreground text-background text-sm uppercase tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Generando..." : "Generar diseño →"}
        </button>
      </form>
    </div>
  )
}
