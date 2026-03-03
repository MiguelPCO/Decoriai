import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Iniciar sesión — Décoriai",
  description: "Accede a tu cuenta de Décoriai y retoma tus diseños de interiores con IA.",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
