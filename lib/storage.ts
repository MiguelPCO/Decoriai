import { createClient } from "@/lib/supabase/client"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type))
    return "Solo se aceptan imágenes JPG, PNG o WebP."
  if (file.size > MAX_BYTES) return "La imagen no puede superar 10 MB."
  return null
}

/**
 * Sube una imagen a Supabase Storage (bucket "generations")
 * y devuelve la URL pública permanente.
 * Debe llamarse desde un Client Component.
 */
export async function uploadRoomPhoto(
  file: File,
  userId: string,
): Promise<string> {
  const supabase = createClient()
  const ext = file.name.split(".").pop() ?? "jpg"
  const path = `${userId}/${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from("generations")
    .upload(path, file, { contentType: file.type, upsert: false })

  if (error) throw new Error(`Error al subir imagen: ${error.message}`)

  const {
    data: { publicUrl },
  } = supabase.storage.from("generations").getPublicUrl(path)

  return publicUrl
}
