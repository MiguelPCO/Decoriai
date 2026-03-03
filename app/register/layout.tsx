import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Crear cuenta — Décoriai",
  description:
    "Regístrate gratis en Décoriai y empieza a rediseñar tus espacios con inteligencia artificial.",
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
