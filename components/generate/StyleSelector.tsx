"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Check, Search, X, Shuffle } from "lucide-react"
import {
  STYLES,
  STYLE_CATEGORIES,
  createMixValue,
  parseMixValue,
  type StyleCategory,
} from "@/lib/constants/styles"
import { cn } from "@/lib/utils"

interface StyleSelectorProps {
  value: string | null
  onChange: (id: string | null) => void
  disabled?: boolean
  onSuggestion?: (text: string) => void
}

// ── Thumbnail con fallback de letra ──────────────────────────────────────────
function StyleThumb({
  image,
  name,
  size = "md",
}: {
  image: string
  name: string
  size?: "sm" | "md"
}) {
  const dim = size === "sm" ? "h-8 w-8" : "h-14 w-14"
  if (image) {
    return (
      <div className={cn("relative shrink-0 overflow-hidden", dim)}>
        <Image src={image} alt={name} fill className="object-cover" sizes="56px" />
      </div>
    )
  }
  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-center bg-gradient-to-br from-warm/20 to-warm/5",
        dim,
      )}
    >
      <span className="font-serif italic text-warm/70 leading-none select-none"
        style={{ fontSize: size === "sm" ? "0.7rem" : "1.1rem" }}>
        {name[0]}
      </span>
    </div>
  )
}

// ── Mini picker de estilo dentro del mixer ────────────────────────────────────
function StylePicker({
  label,
  value,
  onChange,
  exclude,
  disabled,
}: {
  label: string
  value: string | null
  onChange: (id: string | null) => void
  exclude?: string | null
  disabled?: boolean
}) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = value ? STYLES.find((s) => s.id === value) : null

  const filtered = STYLES.filter(
    (s) =>
      s.id !== exclude &&
      (search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase())),
  ).slice(0, 40)

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  function handleSelect(id: string) {
    onChange(id)
    setSearch("")
    setOpen(false)
  }

  function handleClear() {
    onChange(null)
    setSearch("")
    setOpen(false)
  }

  return (
    <div className="space-y-1" ref={containerRef}>
      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>

      {selected ? (
        <div className="flex items-center gap-3 px-3 py-2.5 border border-warm/40 bg-warm/5">
          <StyleThumb image={selected.image} name={selected.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="font-serif italic text-sm font-semibold leading-tight text-foreground">
              {selected.name}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">{selected.category}</p>
          </div>
          <button
            type="button"
            disabled={disabled}
            onClick={handleClear}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              placeholder="Buscar estilo..."
              disabled={disabled}
              className="w-full pl-9 pr-3 py-2.5 text-xs border border-border bg-background focus:outline-none focus:border-foreground transition-colors disabled:opacity-40 placeholder:text-muted-foreground"
            />
          </div>

          {open && (
            <div className="absolute top-full left-0 right-0 z-50 bg-background border border-border border-t-0 max-h-[220px] overflow-y-auto shadow-lg">
              {filtered.length === 0 ? (
                <p className="px-3 py-4 text-xs text-muted-foreground text-center">
                  Sin resultados
                </p>
              ) : (
                filtered.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleSelect(s.id)}
                    className="flex items-center gap-3 px-3 py-2.5 w-full text-left hover:bg-warm/5 transition-colors border-b border-border/50 last:border-0"
                  >
                    <StyleThumb image={s.image} name={s.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif italic text-sm leading-tight">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{s.category}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
export function StyleSelector({
  value,
  onChange,
  disabled,
  onSuggestion,
}: StyleSelectorProps) {
  const [activeTab, setActiveTab] = useState<"estilos" | "mezclar">("estilos")
  const [search, setSearch] = useState("")
  const [mixA, setMixA] = useState<string | null>(null)
  const [mixB, setMixB] = useState<string | null>(null)

  // Sincronizar pickers si el valor externo ya es una mezcla
  useEffect(() => {
    if (!value) return
    const parsed = parseMixValue(value)
    if (parsed) {
      setMixA(parsed.idA)
      setMixB(parsed.idB)
      setActiveTab("mezclar")
    }
  }, []) // solo al montar

  // Cuando ambos pickers tienen valor, notificar al padre
  useEffect(() => {
    if (mixA && mixB) {
      onChange(createMixValue(mixA, mixB))
    }
  }, [mixA, mixB]) // eslint-disable-line react-hooks/exhaustive-deps

  const parsedMix = value ? parseMixValue(value) : null
  const isValueMix = parsedMix !== null
  const isValueStyle = value && !isValueMix

  // ── Estilos filtrados ─────────────────────────────────────────────────────
  const filtered = STYLES.filter(
    (s) =>
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()),
  )

  // Agrupar por categoría (solo cuando no hay búsqueda activa)
  const grouped = STYLE_CATEGORIES.map((cat) => ({
    cat,
    styles: filtered.filter((s) => s.category === cat),
  })).filter((g) => g.styles.length > 0)

  const selectedMixStyleA = parsedMix ? STYLES.find((s) => s.id === parsedMix.idA) : null
  const selectedMixStyleB = parsedMix ? STYLES.find((s) => s.id === parsedMix.idB) : null

  return (
    <div className="flex flex-col">
      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="flex border border-border rounded-md overflow-hidden">
        <button
          type="button"
          onClick={() => setActiveTab("estilos")}
          className={cn(
            "flex-1 h-9 text-xs uppercase tracking-wide transition-colors",
            activeTab === "estilos"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Estilos ({STYLES.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("mezclar")}
          className={cn(
            "flex-1 h-9 text-xs uppercase tracking-wide transition-colors border-l border-border flex items-center justify-center gap-1.5",
            activeTab === "mezclar"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
            isValueMix ? "ring-1 ring-inset ring-warm/50" : "",
          )}
        >
          <Shuffle className="h-3 w-3" />
          Mezclar
          {isValueMix && <span className="text-[9px] opacity-70">✓</span>}
        </button>
      </div>

      {/* ── Contenido ────────────────────────────────────────────────────── */}
      <div className="border border-border border-t-0">
        {/* Badge si hay un estilo simple seleccionado en tab mezclar */}
        {activeTab === "mezclar" && isValueStyle && (
          <div className="px-3 py-1.5 bg-muted/40 border-b border-border text-[10px] text-muted-foreground">
            Estilo simple seleccionado — elige dos estilos para crear una mezcla
          </div>
        )}

        {/* ── TAB: Estilos ─────────────────────────────────────────────── */}
        {activeTab === "estilos" && (
          <>
            {/* Buscador */}
            <div className="relative border-b border-border">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Buscar entre ${STYLES.length} estilos...`}
                className="w-full pl-9 pr-8 py-2.5 text-xs bg-background focus:outline-none focus:bg-warm/[0.02] transition-colors placeholder:text-muted-foreground"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Lista agrupada */}
            <div className="max-h-[340px] overflow-y-auto">
              {grouped.map(({ cat, styles }) => (
                <div key={cat}>
                  {/* Separador de categoría */}
                  <div className="sticky top-0 z-10 px-3 py-1.5 bg-muted/60 backdrop-blur-sm border-b border-border/60">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                      {cat}
                    </p>
                  </div>

                  <div className="divide-y divide-border/60">
                    {styles.map((style) => {
                      const selected = value === style.id
                      return (
                        <div key={style.id}>
                          <button
                            type="button"
                            disabled={disabled}
                            onClick={() => onChange(style.id)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2.5 w-full text-left transition-colors",
                              "disabled:opacity-50 disabled:cursor-not-allowed",
                              selected ? "bg-warm/10" : "hover:bg-warm/5",
                            )}
                          >
                            <StyleThumb image={style.image} name={style.name} />

                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  "font-serif italic text-sm font-semibold leading-tight",
                                  selected ? "text-foreground" : "text-foreground/80",
                                )}
                              >
                                {style.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                {style.description}
                              </p>
                            </div>

                            {selected && (
                              <div className="shrink-0 flex items-center gap-1.5">
                                <Check className="h-3.5 w-3.5 text-warm" />
                              </div>
                            )}
                          </button>

                          {/* Chips de sugerencia */}
                          {selected && onSuggestion && (
                            <div className="px-4 pb-3 flex flex-wrap gap-1.5 bg-warm/10 border-b border-border">
                              {style.promptSuggestions.map((suggestion) => (
                                <button
                                  key={suggestion}
                                  type="button"
                                  disabled={disabled}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onSuggestion(suggestion)
                                  }}
                                  className="text-[10px] px-2 py-1 border border-warm/30 text-warm/80 hover:bg-warm/10 hover:border-warm transition-colors"
                                >
                                  + {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    Sin resultados para &quot;{search}&quot;
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── TAB: Mezclar ─────────────────────────────────────────────── */}
        {activeTab === "mezclar" && (
          <div className="p-4 space-y-4">
            <div className="space-y-1">
              <p className="font-serif italic text-base font-semibold text-foreground">
                Crea tu mezcla de estilos
              </p>
              <p className="text-xs text-muted-foreground">
                Elige dos estilos y la IA los fusionará en un solo diseño.
              </p>
            </div>

            {/* Pickers */}
            <StylePicker
              label="Primer estilo"
              value={mixA}
              onChange={(id) => {
                setMixA(id)
                if (!id) {
                  // Si limpiamos A, resetear el valor de mezcla
                  if (value && parseMixValue(value)) onChange(null)
                }
              }}
              exclude={mixB}
              disabled={disabled}
            />

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <div className="h-7 w-7 rounded-full border border-border flex items-center justify-center shrink-0">
                <Shuffle className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="flex-1 h-px bg-border" />
            </div>

            <StylePicker
              label="Segundo estilo"
              value={mixB}
              onChange={(id) => {
                setMixB(id)
                if (!id) {
                  if (value && parseMixValue(value)) onChange(null)
                }
              }}
              exclude={mixA}
              disabled={disabled}
            />

            {/* Preview de la mezcla */}
            {selectedMixStyleA && selectedMixStyleB && (
              <div className="border border-warm/30 bg-warm/5 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <StyleThumb
                    image={selectedMixStyleA.image}
                    name={selectedMixStyleA.name}
                    size="sm"
                  />
                  <X className="h-3 w-3 text-muted-foreground shrink-0" />
                  <StyleThumb
                    image={selectedMixStyleB.image}
                    name={selectedMixStyleB.name}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0 ml-1">
                    <p className="font-serif italic text-sm font-semibold leading-tight text-foreground">
                      {selectedMixStyleA.name} × {selectedMixStyleB.name}
                    </p>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-warm shrink-0" />
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Fusión de <span className="text-foreground/70">{selectedMixStyleA.description.toLowerCase()}</span>
                  {" "}con <span className="text-foreground/70">{selectedMixStyleB.description.toLowerCase()}</span>.
                </p>
              </div>
            )}

            {/* Hint si aún faltan pickers */}
            {(!mixA || !mixB) && (
              <p className="text-[10px] text-muted-foreground text-center py-2">
                {!mixA && !mixB
                  ? "Selecciona los dos estilos para crear la mezcla"
                  : "Selecciona el segundo estilo para completar la mezcla"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
