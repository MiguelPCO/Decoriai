"use client"

import Image from "next/image"
import { STYLES } from "@/lib/constants/styles"
import { cn } from "@/lib/utils"

interface StyleSelectorProps {
  value: string | null
  onChange: (id: string) => void
  disabled?: boolean
}

export function StyleSelector({ value, onChange, disabled }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {STYLES.map((style) => {
        const selected = value === style.id
        return (
          <button
            key={style.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(style.id)}
            className={cn(
              "relative overflow-hidden text-left transition-all duration-200 group",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              selected
                ? "ring-2 ring-foreground ring-offset-2"
                : "hover:ring-1 hover:ring-foreground/40 hover:ring-offset-1",
            )}
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={style.image}
                alt={style.name}
                fill
                className={cn(
                  "object-cover transition-transform duration-300",
                  !disabled && "group-hover:scale-[1.04]",
                )}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {selected && (
                <div className="absolute inset-0 bg-foreground/10" />
              )}
            </div>

            {/* Label */}
            <div className="pt-2 pb-1">
              <p className="font-serif italic text-sm font-semibold text-foreground leading-tight">
                {style.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                {style.description}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
