"use client"

import { useActionState } from "react"
import Link from "next/link"
import Image from "next/image"
import { register } from "@/lib/actions/auth"
import { SubmitButton } from "@/components/ui/submit-button"

const PANEL_IMAGE =
  "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1200&q=85"

export default function RegisterPage() {
  const [state, action] = useActionState(register, null)

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Panel izquierdo — imagen editorial ── */}
      <div className="relative hidden lg:block">
        <Image
          src={PANEL_IMAGE}
          alt="Interior Japandi"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Contenido sobre la imagen */}
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Link href="/" className="font-serif italic text-white text-2xl font-bold">
            Décoriai
          </Link>
          <div className="text-white">
            <p className="font-serif italic text-4xl leading-tight mb-6 max-w-xs">
              Transforma
              <br />
              cualquier
              <br />
              espacio.
            </p>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-warm" />
                6 estilos de diseño disponibles
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-warm" />
                Resultados en menos de 30 segundos
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-warm" />
                Completamente gratis para empezar
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Panel derecho — formulario ── */}
      <div className="flex flex-col items-center justify-center px-6 py-16 bg-background">
        <div className="w-full max-w-sm">
          {/* Logo mobile */}
          <Link
            href="/"
            className="font-serif italic text-2xl font-bold text-foreground mb-10 block lg:hidden"
          >
            Décoriai
          </Link>

          {/* Header */}
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-warm mb-3 block">
              Es gratis
            </span>
            <h1 className="font-serif italic text-3xl font-bold text-foreground leading-tight">
              Crea tu cuenta
              <br />y empieza hoy.
            </h1>
          </div>

          {/* Error */}
          {state?.error && (
            <div className="border border-red-200 bg-red-50 px-4 py-3 mb-6">
              <p className="text-sm text-red-700">{state.error}</p>
            </div>
          )}

          {/* Form */}
          <form action={action} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-[0.15em] text-foreground"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="tu@correo.com"
                className="w-full border border-border bg-white px-4 h-11 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-[0.15em] text-foreground"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                className="w-full border border-border bg-white px-4 h-11 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div className="pt-2">
              <SubmitButton label="Crear cuenta" loadingLabel="Creando cuenta..." />
            </div>
          </form>

          {/* Terms note */}
          <p className="text-xs text-muted-foreground mt-4 text-center leading-relaxed">
            Al registrarte aceptas nuestros términos de uso.
          </p>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
