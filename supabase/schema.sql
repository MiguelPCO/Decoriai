-- interior-ai schema
-- Ejecutar en Supabase SQL Editor: app.supabase.com > SQL Editor

-- Tabla de generaciones
CREATE TABLE IF NOT EXISTS generations (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Input
  prompt           TEXT NOT NULL,
  style            VARCHAR(50),
  input_image_url  TEXT,           -- imagen subida por el usuario (Supabase Storage)

  -- Output
  output_image_url TEXT,           -- imagen generada (Supabase Storage)
  status           TEXT NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  replicate_id     TEXT,           -- ID de predicción de Replicate (para polling)
  error_message    TEXT,

  -- Meta
  created_at       TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Row Level Security
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "generations: own"
  ON generations
  FOR ALL
  USING (auth.uid() = user_id);

-- Índices
CREATE INDEX IF NOT EXISTS idx_generations_user
  ON generations(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_generations_status
  ON generations(status)
  WHERE status IN ('pending', 'processing');

-- ─────────────────────────────────────────────────────────────
-- Storage (ejecutar en Supabase Storage + SQL Editor)
-- ─────────────────────────────────────────────────────────────

-- 1. Crear bucket público (desde la UI de Storage o con SQL)
-- INSERT INTO storage.buckets (id, name, public)
--   VALUES ('generations', 'generations', true)
--   ON CONFLICT DO NOTHING;

-- 2. RLS policies del bucket
--    (las políticas de storage van en storage.objects)

-- Usuarios autenticados pueden subir a su propia carpeta (user_id/)
CREATE POLICY "storage: authenticated uploads"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'generations' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Lectura pública de todas las imágenes (bucket es público)
CREATE POLICY "storage: public reads"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'generations');

-- Los usuarios solo pueden borrar sus propias imágenes
CREATE POLICY "storage: own deletes"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'generations' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
