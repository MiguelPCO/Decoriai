"use client"

import { useFormStatus } from "react-dom"

interface SubmitButtonProps {
  label: string
  loadingLabel?: string
}

export function SubmitButton({
  label,
  loadingLabel = "Cargando...",
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-11 bg-foreground text-background text-sm uppercase tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? loadingLabel : label}
    </button>
  )
}
