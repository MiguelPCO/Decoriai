export type Style = {
  id: string
  name: string
  description: string
  promptBoost: string
  image: string
}

export const STYLES: Style[] = [
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Líneas limpias, paleta neutra, sin exceso",
    promptBoost:
      "minimalist interior, clean lines, neutral palette, uncluttered, white walls, modern",
    image: "/images/minimalista.jpg",
  },
  {
    id: "nordico",
    name: "Nórdico",
    description: "Madera clara, texturas acogedoras, paredes blancas",
    promptBoost:
      "scandinavian interior, light wood, cozy textures, white walls, hygge atmosphere",
    image: "/images/nordico.jpg",
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Ladrillo visto, metal, materiales crudos",
    promptBoost:
      "industrial interior, exposed brick, metal accents, raw materials, loft style",
    image: "/images/industrial.jpg",
  },
  {
    id: "mediterraneo",
    name: "Mediterráneo",
    description: "Terracota cálida, arcos, luz natural",
    promptBoost:
      "mediterranean interior, warm terracotta, arched doorways, natural light, clay tiles",
    image: "/images/mediterraneo.jpg",
  },
  {
    id: "japandi",
    name: "Japandi",
    description: "Wabi-sabi, zen, materiales naturales",
    promptBoost:
      "japandi interior, wabi-sabi, zen atmosphere, natural materials, muted palette",
    image: "/images/japandi.jpg",
  },
  {
    id: "clasico",
    name: "Clásico",
    description: "Molduras elegantes, telas ricas, atemporal",
    promptBoost:
      "classic interior, elegant moldings, rich fabrics, timeless furniture, symmetrical",
    image: "/images/clasico.jpg",
  },
]

export function getUnsplashUrl(photoId: string, width = 800) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`
}
