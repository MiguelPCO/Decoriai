"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { STYLES, parseMixValue } from "@/lib/constants/styles"
import { cn } from "@/lib/utils"

const LOADING_MESSAGES = [
  "Analizando tu espacio...",
  "Calculando iluminación...",
  "Añadiendo muebles de diseño...",
  "Dando los últimos toques...",
]

const CURATED = [
  "/images/salondespues.webp",
  "/images/dormitoriodespues.webp",
  "/images/comedordespues.webp",
]


interface StylePreviewProps {
  selectedStyleId: string | null
  isProcessing: boolean
}

export function StylePreview({
  selectedStyleId,
  isProcessing,
}: StylePreviewProps) {
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    if (!isProcessing) {
      setMsgIdx(0)
      return
    }
    const t = setInterval(
      () => setMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length),
      3500,
    )
    return () => clearInterval(t)
  }, [isProcessing])

  const parsedMix = selectedStyleId ? parseMixValue(selectedStyleId) : null
  const mixStyleA = parsedMix ? STYLES.find((s) => s.id === parsedMix.idA) : null
  const mixStyleB = parsedMix ? STYLES.find((s) => s.id === parsedMix.idB) : null
  const selectedMix = parsedMix && mixStyleA && mixStyleB ? { mixStyleA, mixStyleB } : null
  const selectedStyle = !parsedMix && selectedStyleId ? STYLES.find((s) => s.id === selectedStyleId) : null

  // ── Procesando ────────────────────────────────────────────────────────────
  if (isProcessing) {
    return (
      <div className="flex flex-1 flex-col w-full h-full bg-[#1a1714] overflow-hidden">
        {/* Header con mensaje rotativo */}
        <div className="p-10 pb-6 shrink-0">
          <p className="text-xs uppercase tracking-[0.2em] text-warm/50 mb-4">
            Generando
          </p>
          <p
            key={msgIdx}
            className="font-serif italic text-2xl text-white/90 leading-snug animate-in fade-in duration-500"
          >
            {LOADING_MESSAGES[msgIdx]}
          </p>
        </div>

        {/* Skeleton grid */}
        <div className="flex-1 px-10 pb-10 grid grid-cols-2 grid-rows-2 gap-3 min-h-0">
          <div
            className="bg-white/8 animate-pulse rounded-none"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="bg-white/8 animate-pulse rounded-none"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="col-span-2 bg-white/8 animate-pulse rounded-none"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        {/* Barra de progreso indeterminada */}
        <div className="h-px bg-white/10 shrink-0 relative overflow-hidden">
          <div className="absolute inset-y-0 w-1/3 bg-warm/60 animate-[shimmer_2s_ease-in-out_infinite]" />
        </div>
      </div>
    )
  }

  // ── Mezcla seleccionada ───────────────────────────────────────────────────
  if (selectedMix) {
    const { mixStyleA, mixStyleB } = selectedMix

    return (
      <div className="flex flex-1 flex-col w-full h-full bg-[#1a1714] overflow-y-auto">
        <div className="px-10 pt-10 pb-6 shrink-0">
          <p className="text-xs uppercase tracking-[0.2em] text-warm/60 mb-1">Mezcla de estilos</p>
          <h2 className="font-serif italic text-3xl font-bold text-white">
            {mixStyleA.name} × {mixStyleB.name}
          </h2>
          <p className="text-sm text-white/50 mt-2">
            Fusión de {mixStyleA.description.toLowerCase()} con {mixStyleB.description.toLowerCase()}.
          </p>
        </div>

        {/* Dos imágenes lado a lado */}
        <div className="px-10 shrink-0 grid grid-cols-2 gap-2">
          {[mixStyleA, mixStyleB].map((s) =>
            s.image ? (
              <div key={s.id} className="relative aspect-video overflow-hidden">
                <Image src={s.image} alt={s.name} fill className="object-cover" sizes="25vw" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1a1714] to-transparent" />
                <p className="absolute bottom-2 left-3 font-serif italic text-sm text-white">{s.name}</p>
              </div>
            ) : (
              <div key={s.id} className="relative aspect-video overflow-hidden bg-white/5 flex items-center justify-center">
                <p className="font-serif italic text-2xl text-white/30">{s.name[0]}</p>
                <p className="absolute bottom-2 left-3 font-serif italic text-sm text-white/60">{s.name}</p>
              </div>
            )
          )}
        </div>

        {/* Grid curado de fondo */}
        <div className="px-10 py-6 shrink-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Inspiración combinada</p>
          <div className="grid grid-cols-3 gap-2">
            {CURATED.map((src, i) => (
              <div
                key={src}
                className={cn("relative overflow-hidden", i === 0 ? "aspect-[4/3]" : "aspect-square")}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover opacity-40 hover:opacity-70 transition-opacity"
                  sizes="15vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Sin estilo seleccionado (placeholder) ─────────────────────────────────
  if (!selectedStyle) {
    return (
      <div className="relative flex flex-1 flex-col w-full h-full bg-[#1a1714] overflow-hidden">
        {/* Thumbnails tenues de fondo */}
        <div className="flex-1 grid grid-cols-3 grid-rows-1 min-h-0 opacity-20">
          {CURATED.map((src, i) => (
            <div key={src} className="relative overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
          ))}
        </div>

        {/* Overlay con mensaje */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 pointer-events-none">
          <div className="h-px w-12 bg-warm/30 mb-8" />
          <p className="font-serif italic text-2xl text-white/25 text-center leading-relaxed">
            Selecciona un estilo
            <br />
            para ver inspiración.
          </p>
          <div className="h-px w-12 bg-warm/30 mt-8" />
        </div>
      </div>
    )
  }

  // ── Estilo seleccionado (preview) ─────────────────────────────────────────
  return (
    <div className="flex flex-1 flex-col w-full h-full bg-[#1a1714] overflow-y-auto">
      {/* Header */}
      <div className="px-10 pt-10 pb-6 shrink-0">
        <p className="text-xs uppercase tracking-[0.2em] text-warm/60 mb-2">
          Estilo seleccionado
        </p>
        <h2 className="font-serif italic text-3xl font-bold text-white leading-tight">
          {selectedStyle.name}
        </h2>
        <p className="text-sm text-white/50 mt-2 leading-relaxed">
          {selectedStyle.description}
        </p>
      </div>

      {/* Hero image */}
      <div className="px-10 shrink-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={selectedStyle.image}
            alt={selectedStyle.name}
            fill
            className="object-cover"
            sizes="50vw"
          />
          {/* Gradient overlay inferior */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1a1714] to-transparent" />
        </div>
      </div>

      {/* Divider */}
      <div className="mx-10 my-6 h-px bg-white/10 shrink-0" />

      {/* Grid curado */}
      <div className="px-10 pb-10 shrink-0">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">
          Espacios de referencia
        </p>
        <div className="grid grid-cols-3 gap-2">
          {CURATED.map((src, i) => (
            <div
              key={src}
              className={cn(
                "relative overflow-hidden",
                i === 0 ? "aspect-[4/3]" : "aspect-square",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover opacity-60 hover:opacity-90 transition-opacity duration-300"
                sizes="15vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
