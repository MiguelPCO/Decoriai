"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { validateImageFile } from "@/lib/storage"

interface ImageUploaderProps {
  onFile: (file: File) => void
  preview: string | null
  onClear: () => void
  disabled?: boolean
}

export function ImageUploader({
  onFile,
  preview,
  onClear,
  disabled,
}: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    const err = validateImageFile(file)
    if (err) {
      setError(err)
      return
    }
    setError(null)
    onFile(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  if (preview) {
    return (
      <div className="space-y-2">
        <div className="relative aspect-[4/3] overflow-hidden border border-border">
          <Image
            src={preview}
            alt="Foto seleccionada"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
            unoptimized // blob URL — no pasar por next/image optimizer
          />
        </div>
        {!disabled && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Cambiar foto
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div
        role="button"
        tabIndex={0}
        aria-label="Subir imagen"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-4 min-h-52 border-2 border-dashed transition-colors",
          disabled
            ? "opacity-50 cursor-not-allowed border-border"
            : "cursor-pointer",
          !disabled &&
            (isDragOver
              ? "border-foreground bg-muted/30"
              : "border-border hover:border-foreground/60"),
        )}
      >
        <Upload className="h-7 w-7 text-muted-foreground" />
        <div className="text-center px-6">
          <p className="text-sm font-medium text-foreground">
            Arrastra tu foto aquí
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            o haz clic para seleccionar
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            JPG · PNG · WebP &nbsp;·&nbsp; máx 10 MB
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={disabled}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = "" // reset so same file can be re-selected
          }}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
