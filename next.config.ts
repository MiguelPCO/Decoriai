import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Supabase Storage — imágenes generadas
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Replicate CDN — URL temporal antes del re-upload a Storage
      {
        protocol: "https",
        hostname: "*.replicate.delivery",
      },
    ],
  },
}

export default nextConfig
