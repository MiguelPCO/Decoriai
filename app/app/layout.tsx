import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/app/sidebar"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  async function signOut() {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar email={user.email ?? ""} signOutAction={signOut} />
      {/* pt-14 compensa el top bar fijo en móvil, md:pt-0 lo elimina en desktop */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0">{children}</main>
    </div>
  )
}
