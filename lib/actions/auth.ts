"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export type AuthState = { error?: string } | null

export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) return { error: "Rellena todos los campos." }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: "Correo o contraseña incorrectos." }

  redirect("/app")
}

export async function register(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) return { error: "Rellena todos los campos." }
  if (password.length < 6)
    return { error: "La contraseña debe tener al menos 6 caracteres." }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) return { error: error.message }

  // Si el usuario ya existe, identities estará vacío
  if (data.user && data.user.identities?.length === 0) {
    return { error: "Este correo ya está registrado. Inicia sesión." }
  }

  redirect("/app")
}
