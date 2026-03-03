import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Maneja el redirect de confirmación de email de Supabase
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/app"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Error: volver al login
  return NextResponse.redirect(`${origin}/login?error=Enlace+de+confirmación+inválido`)
}
