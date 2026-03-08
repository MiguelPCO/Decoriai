// ── Unsplash helper ──────────────────────────────────────────────────────────
export function getUnsplashUrl(photoId: string, width = 800) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`
}

// ── Mix encoding ─────────────────────────────────────────────────────────────
export const MIX_PREFIX = "mix::"

export function createMixValue(idA: string, idB: string): string {
  return `${MIX_PREFIX}${idA}::${idB}`
}

export function parseMixValue(value: string): { idA: string; idB: string } | null {
  if (!value.startsWith(MIX_PREFIX)) return null
  const rest = value.slice(MIX_PREFIX.length)
  const idx = rest.indexOf("::")
  if (idx === -1) return null
  const idA = rest.slice(0, idx)
  const idB = rest.slice(idx + 2)
  return idA && idB ? { idA, idB } : null
}

export function getStyleDisplayName(value: string): string {
  const mix = parseMixValue(value)
  if (mix) {
    const a = STYLES.find((s) => s.id === mix.idA)?.name ?? mix.idA
    const b = STYLES.find((s) => s.id === mix.idB)?.name ?? mix.idB
    return `${a} × ${b}`
  }
  return STYLES.find((s) => s.id === value)?.name ?? value
}

export function getMixPromptBoost(idA: string, idB: string): string {
  const a = STYLES.find((s) => s.id === idA)
  const b = STYLES.find((s) => s.id === idB)
  if (!a || !b) return ""
  return `${a.promptBoost}, seamlessly blended with ${b.promptBoost}`
}

// ── Types ─────────────────────────────────────────────────────────────────────
export type StyleCategory =
  | "Históricos y clásicos"
  | "Modernos y contemporáneos"
  | "Regionales y étnicos"
  | "Rústicos y naturales"
  | "Industriales y urbanos"
  | "Costeros y náuticos"
  | "Lujo y glamour"
  | "Eclécticos y de fusión"
  | "Filosóficos y bienestar"
  | "Micro-tendencias digitales"
  | "Tecnológicos y futuristas"
  | "Tendencias 2025-2026"

export type Style = {
  id: string
  name: string
  category: StyleCategory
  description: string
  promptBoost: string
  image: string
  promptSuggestions: string[]
}

export const STYLE_CATEGORIES: StyleCategory[] = [
  "Históricos y clásicos",
  "Modernos y contemporáneos",
  "Regionales y étnicos",
  "Rústicos y naturales",
  "Industriales y urbanos",
  "Costeros y náuticos",
  "Lujo y glamour",
  "Eclécticos y de fusión",
  "Filosóficos y bienestar",
  "Micro-tendencias digitales",
  "Tecnológicos y futuristas",
  "Tendencias 2025-2026",
]

// ── 90 Estilos ────────────────────────────────────────────────────────────────
export const STYLES: Style[] = [
  // ── I. Históricos y clásicos ─────────────────────────────────────────────
  {
    id: "barroco",
    name: "Barroco",
    category: "Históricos y clásicos",
    description: "Grandioso y dramático, dorados y mármol",
    promptBoost:
      "baroque interior, ornate gold details, dramatic marble columns, rich velvet burgundy fabrics, painted ceiling frescoes, grand chandeliers, opulent grandeur",
    image: getUnsplashUrl("photo-1761116191941-fe3915e57d8b"),
    promptSuggestions: [
      "frescos pintados en el techo abovedado",
      "dorados profusos en marcos y molduras",
      "terciopelo borgoña en tapicería y cortinas",
      "mármol en suelos y columnas",
    ],
  },
  {
    id: "rococo",
    name: "Rococó",
    category: "Históricos y clásicos",
    description: "Curvas pastel y porcelana, Francia s.XVIII",
    promptBoost:
      "rococo interior, pastel pink and blue palette, ornate asymmetrical curves, shell and floral motifs, gilded furniture, delicate porcelain accents, playful elegance",
    image: getUnsplashUrl("photo-1706868366619-55a41824b0c5"),
    promptSuggestions: [
      "molduras asimétricas en rosa pálido y oro",
      "porcelana decorativa en vitrinas lacadas",
      "muebles curvos con tallas de conchas y flores",
      "telas de seda en rosa empolvado y azul cielo",
    ],
  },
  {
    id: "georgiano",
    name: "Georgiano",
    category: "Históricos y clásicos",
    description: "Simetría clásica y elegancia británica",
    promptBoost:
      "georgian interior, classical symmetry, ornate cornice moldings, paneled walls, four-poster bed, sage green powder blue palette, mahogany furniture, refined british",
    image: getUnsplashUrl("photo-1698360308566-5e2e8353dbf2"),
    promptSuggestions: [
      "panelado de paredes en verde salvia",
      "cama con dosel en seda",
      "molduras de cornisa en techo alto",
      "caoba oscura con apliques de latón",
    ],
  },
  {
    id: "neoclasico",
    name: "Neoclásico",
    category: "Históricos y clásicos",
    description: "Grecorromano refinado, simetría y pasteles",
    promptBoost:
      "neoclassical interior, greek revival columns, symmetrical layout, pastel palette, garland and urn motifs, gilded plaster moldings, marble floors, robert adam style",
    image: getUnsplashUrl("photo-1693842899089-f5058316ad0e"),
    promptSuggestions: [
      "columnas y pilastras blancas encuadradas",
      "motivos de guirnaldas y urnas en frisos",
      "suelo de mármol ajedrezado blanco y gris",
      "espejos con marcos dorados neoclásicos",
    ],
  },
  {
    id: "regencia",
    name: "Regencia",
    category: "Históricos y clásicos",
    description: "Neoclásico con influencias exóticas y rayas",
    promptBoost:
      "regency interior, bold striped wallpaper, animal-leg furniture, chinoiserie accents, sphinx motifs, rich cobalt red emerald, satin lacquer finishes, exotic influences",
    image: getUnsplashUrl("photo-1716077482677-ae4ff36c8183"),
    promptSuggestions: [
      "papel pintado de rayas audaces en cobalto o rojo",
      "muebles con patas de animal en latón dorado",
      "motivos chinoiserie en laca negra y oro",
      "tapices de seda en colores joya",
    ],
  },
  {
    id: "victoriano",
    name: "Victoriano",
    category: "Históricos y clásicos",
    description: "Opulencia industrial, tapicería y ornamento",
    promptBoost:
      "victorian interior, richly patterned wallpaper, ornate carved wooden furniture, button-tufted velvet upholstery, stained glass windows, dark jewel tones burgundy purple green",
    image: getUnsplashUrl("photo-1699084260268-e7422f82fc7d"),
    promptSuggestions: [
      "papel pintado muy ornamentado en verde profundo",
      "tapicería capitoné en terciopelo oscuro",
      "chimenea con manto de madera tallada",
      "vidriera emplomada en ventana",
    ],
  },
  {
    id: "arts-crafts",
    name: "Arts & Crafts",
    category: "Históricos y clásicos",
    description: "Artesanía manual frente al exceso victoriano",
    promptBoost:
      "arts and crafts interior, handcrafted ceramics, exposed oak joinery with visible joints, stained glass accents, earthy olive russet palette, handmade tiles, copper fixtures",
    image: "https://imagenes.elpais.com/resizer/v2/HRTASYP6P5EBFGGUWMWFEVYNSE.jpg?auth=bb416940f3fd2e56e8123a0b3c776236b9df2ec0119f7fe69bed28424950f9fc&width=1200",
    promptSuggestions: [
      "vitrales artesanales en tonos ámbar y verde",
      "madera de roble con ensamblajes visibles",
      "azulejos de cerámica pintados a mano",
      "cobre martillado en apliques y manivelas",
    ],
  },
  {
    id: "art-nouveau",
    name: "Art Nouveau",
    category: "Históricos y clásicos",
    description: "Líneas orgánicas florales, hierro y vidrio",
    promptBoost:
      "art nouveau interior, sinuous floral botanical lines, wrought iron with leaf motifs, curved stained glass windows, olive sage green palette, mosaic tile floors, organic asymmetry",
    image: getUnsplashUrl("photo-1639950265589-c7002e35d4ec"),
    promptSuggestions: [
      "barandillas de hierro forjado con motivos florales",
      "vidrieras con curvas orgánicas y flores",
      "suelo de mosaico con patrones curvos",
      "lámparas de vidrio soplado en formas orgánicas",
    ],
  },
  {
    id: "art-deco",
    name: "Art Déco",
    category: "Históricos y clásicos",
    description: "Geometría glamurosa, tonos joya, dorados",
    promptBoost:
      "art deco interior, bold geometric patterns, jewel tones, gold accents, sunburst motifs, velvet furniture, chrome details",
    image: getUnsplashUrl("photo-1618221195710-dd6b41faaea6"), // art-deco — sin imagen local
    promptSuggestions: [
      "espejos con marcos dorados geométricos",
      "terciopelo en tonos esmeralda o zafiro",
      "suelo de mármol con incrustaciones geométricas",
      "iluminación de pared art déco en latón",
    ],
  },
  {
    id: "bauhaus",
    name: "Bauhaus",
    category: "Históricos y clásicos",
    description: "Geometría funcional, acero tubular",
    promptBoost:
      "bauhaus interior, tubular steel furniture, geometric forms, primary color accents red blue yellow on white background, industrial grid windows, minimal decoration, form follows function",
    image: getUnsplashUrl("photo-1729603483130-453cb9e49593"),
    promptSuggestions: [
      "silla Wassily de acero tubular y cuero negro",
      "ventana industrial de cuadrícula metálica",
      "acentos en rojo, azul y amarillo sobre blanco",
      "estante geométrico de madera y acero",
    ],
  },
  {
    id: "colonial",
    name: "Colonial",
    category: "Históricos y clásicos",
    description: "Europa en América, proporción y calidez",
    promptBoost:
      "colonial american interior, symmetrical layout, Windsor chairs, canopy bed, simple moldings, muted sage gray blue pale pink palette, pine cherry maple furniture, handwoven rugs",
    image: "https://www.expodecomagazine.com/uploads/fotos_noticias/2019/04/w800px_19474-156942-decoracion-colonial-un-estilo-con-personalidad.jpg",
    promptSuggestions: [
      "cama con dosel de madera de cerezo",
      "sillas Windsor alrededor de mesa de pino",
      "molduras sencillas y ventanas simétricas",
      "alfombra hooked de lana con patrón geométrico",
    ],
  },

  // ── II. Modernos y contemporáneos ─────────────────────────────────────────
  {
    id: "moderno",
    name: "Moderno",
    category: "Modernos y contemporáneos",
    description: "Menos es más, líneas rectas y vidrio",
    promptBoost:
      "modern interior, clean straight lines, floor-to-ceiling glass windows, black white gray palette, minimal decoration, steel and concrete, open floor plan, architectural clarity",
    image: "/images/moderno.webp",
    promptSuggestions: [
      "grandes ventanales de piso a techo sin cortinas",
      "sofá bajo de cuero negro sobre parqué liso",
      "pavimento de hormigón pulido o mármol blanco",
      "iluminación lineal empotrada en techo",
    ],
  },
  {
    id: "mid-century",
    name: "Mid-Century",
    category: "Modernos y contemporáneos",
    description: "Líneas orgánicas, patas cónicas, optimismo retro",
    promptBoost:
      "mid-century modern interior, organic forms, tapered legs, warm walnut wood, mustard yellow accents, Eames-era furniture, atomic age design",
    image: "/images/mid-century.jpeg",
    promptSuggestions: [
      "sofá con patas cónicas de madera de nogal",
      "lámpara de arco en latón dorado",
      "papel pintado de patrones geométricos en la pared",
      "colores mostaza, naranja y verde azulado como acentos",
    ],
  },
  {
    id: "contemporaneo",
    name: "Contemporáneo",
    category: "Modernos y contemporáneos",
    description: "Fluido y actual, siempre en evolución",
    promptBoost:
      "contemporary interior, clean lines, bold accent colors on neutral background, statement art pieces, mix of matte and gloss finishes, integrated technology, current design",
    image: getUnsplashUrl("photo-1772112334897-7e249a9ad811"),
    promptSuggestions: [
      "arte de gran formato en pared de acento",
      "mezcla de materiales: latón mate y mármol blanco",
      "sofá modular en gris neutro con cojines de color",
      "iluminación de diseño como escultura colgante",
    ],
  },
  {
    id: "minimalista",
    name: "Minimalista",
    category: "Modernos y contemporáneos",
    description: "Líneas limpias, paleta neutra, sin exceso",
    promptBoost:
      "minimalist interior, clean lines, neutral palette, uncluttered, white walls, modern",
    image: "/images/minimalista.jpg",
    promptSuggestions: [
      "añade luz natural con grandes ventanales",
      "suelo de mármol blanco o microcemento",
      "sin cuadros en las paredes, solo una pieza de arte",
      "mobiliario de perfil bajo y líneas rectas",
    ],
  },
  {
    id: "posmoderno",
    name: "Posmoderno",
    category: "Modernos y contemporáneos",
    description: "Ironía y asimetría contra el modernismo",
    promptBoost:
      "postmodern interior, playful irony, unexpected color combinations, asymmetrical shapes, Memphis group inspired furniture, neon accents, mixed unconventional materials, anti-minimalism",
    image: "/images/posmoderno.webp",
    promptSuggestions: [
      "muebles Memphis Group en colores inesperados",
      "lámparas de neón como pieza artística",
      "mezcla de estampados geométricos sin coordinar",
      "sillas en formas caprichosas inspiradas en escultura",
    ],
  },
  {
    id: "transicional",
    name: "Transicional",
    category: "Modernos y contemporáneos",
    description: "Puente clásico-contemporáneo, equilibrio",
    promptBoost:
      "transitional interior, classic furniture shapes with clean lines, neutral cream taupe gray palette, rich textures velvet linen, minimal accessories, natural stone, timeless bridge",
    image: getUnsplashUrl("photo-1600210491741-a69593e43133"),
    promptSuggestions: [
      "sofá clásico de brazos curvos en lino neutro",
      "mesa de centro de madera oscura con patas limpias",
      "cortinas de lino sin estampado hasta el suelo",
      "mix de madera noble y acero inoxidable",
    ],
  },

  // ── III. Regionales y étnicos ─────────────────────────────────────────────
  {
    id: "nordico",
    name: "Nórdico",
    category: "Regionales y étnicos",
    description: "Madera clara, texturas acogedoras, paredes blancas",
    promptBoost:
      "scandinavian interior, light wood, cozy textures, white walls, hygge atmosphere",
    image: "/images/nordico.jpg",
    promptSuggestions: [
      "añade plantas en macetas de cerámica blanca",
      "alfombra de lana beige o gris suave",
      "velas y luz cálida ambiente",
      "madera de abedul o pino clara",
    ],
  },
  {
    id: "mediterraneo",
    name: "Mediterráneo",
    category: "Regionales y étnicos",
    description: "Terracota cálida, arcos, luz natural",
    promptBoost:
      "mediterranean interior, warm terracotta, arched doorways, natural light, clay tiles",
    image: "/images/mediterraneo.jpg",
    promptSuggestions: [
      "arcos en puertas o ventanas",
      "azulejos de terracota o hidráulicos en el suelo",
      "paredes encaladas en blanco puro",
      "vegetación abundante: buganvillas, plantas aromáticas",
    ],
  },
  {
    id: "andaluz",
    name: "Andaluz",
    category: "Regionales y étnicos",
    description: "Patios encalados, azulejos y buganvillas",
    promptBoost:
      "andalusian interior, whitewashed walls, hydraulic tile floors blue and terracotta, iron-wrought details, bougainvillea plants, central courtyard fountain, moorish influence",
    image: getUnsplashUrl("photo-1767961124261-b2cb3f9906af"),
    promptSuggestions: [
      "azulejos hidráulicos en suelo o zócalo",
      "patio interior con fuente de cerámica",
      "buganvillas y geranios en macetas de barro",
      "rejas de hierro forjado en ventanas",
    ],
  },
  {
    id: "mudejar",
    name: "Mudéjar",
    category: "Regionales y étnicos",
    description: "Ladrillo, azulejo geométrico e yesería",
    promptBoost:
      "mudejar interior, intricate geometric tile patterns, carved plaster yeseria arabesques, artesonado wooden coffered ceiling, terracotta cobalt blue palette, horseshoe arches",
    image: getUnsplashUrl("photo-1770922907579-4fa68b0db2d5"),
    promptSuggestions: [
      "artesonado de madera con casetones en techo",
      "azulejos geométricos en verde y azul cobalto",
      "arco de herradura en acceso a sala",
      "yeserías talladas con arabescos en pared",
    ],
  },
  {
    id: "colonial-mexicano",
    name: "Colonial Mexicano",
    category: "Regionales y étnicos",
    description: "Patio, arcos y talavera, barroco fusionado",
    promptBoost:
      "mexican colonial hacienda interior, central courtyard fountain, talavera tile accents, whitewashed adobe walls, dark wood ceiling beams, wrought iron grilles, terracotta floors",
    image: getUnsplashUrl("photo-1661000839866-a444be7c2dd6"),
    promptSuggestions: [
      "patio central con fuente de talavera azul y blanca",
      "vigas de madera oscura a la vista en techo de adobe",
      "paredes encaladas con rejas de hierro forjado",
      "baldosas de barro rojo con alfombra de Teotitlán",
    ],
  },
  {
    id: "mexicano-contemporaneo",
    name: "Mexicano Contemporáneo",
    category: "Regionales y étnicos",
    description: "Minimalismo cálido con artesanía local",
    promptBoost:
      "contemporary mexican interior, warm minimalism, oaxacan textiles as wall art, barro negro ceramics, volcanic stone elements, neutral beige with turquoise rosa mexicano accents",
    image: getUnsplashUrl("photo-1770872938037-390c2f1a987f"),
    promptSuggestions: [
      "textil oaxaqueño enmarcado como arte en pared",
      "barro negro de Oaxaca como escultura",
      "piedra volcánica en bañera o lavabo",
      "concreto pulido con alfombra de palma",
    ],
  },
  {
    id: "frances-provincial",
    name: "Francés Provincial",
    category: "Regionales y étnicos",
    description: "Encanto rural francés, muebles patinados",
    promptBoost:
      "french provincial interior, distressed painted furniture in cream, toile de jouy fabric, wrought iron accents, vintage accessories, soft cream yellow lavender sage palette",
    image: getUnsplashUrl("photo-1668511949286-bee319d2271f"),
    promptSuggestions: [
      "muebles decapados en crema o gris paloma",
      "estampado toile en cojines y pantallas de lámpara",
      "armario de madera pintada con bisagras de hierro",
      "jarrón de terracota con lavanda seca",
    ],
  },
  {
    id: "toscano",
    name: "Toscano",
    category: "Regionales y étnicos",
    description: "Estuco cálido, terracota y vigas vistas",
    promptBoost:
      "tuscan interior, warm textured plaster walls, exposed terracotta floor tiles, wood ceiling beams, olive green and sienna palette, wrought iron light fixtures, mediterranean warmth",
    image: getUnsplashUrl("photo-1761060846985-42a82c166e4a"),
    promptSuggestions: [
      "paredes de estuco texturizado en ocre o siena",
      "vigas de madera a la vista en techo",
      "suelo de terracota con alfombra kilim",
      "aparador rústico de madera con jarras de oliva",
    ],
  },
  {
    id: "ingles-campestre",
    name: "Inglés Campestre",
    category: "Regionales y étnicos",
    description: "Chintz floral, tweed y chimenea inglesa",
    promptBoost:
      "english country interior, floral chintz upholstery, layered patterns and prints, antique furniture, stone fireplace, warm rose green cream yellow palette, hunting prints",
    image: getUnsplashUrl("photo-1763692842249-d08599ac4a71"),
    promptSuggestions: [
      "sillones tapizados en chintz floral",
      "chimenea de piedra con repisa de madera oscura",
      "capas de estampados florales y tartán mezclados",
      "estantería con libros, vajilla y objetos de caza",
    ],
  },
  {
    id: "marroqui",
    name: "Marroquí",
    category: "Regionales y étnicos",
    description: "Zellige, latón y telas joya del Magreb",
    promptBoost:
      "moroccan interior, zellige tile geometric patterns, carved plaster arabesques, brass lanterns, leather pouf, jewel tones cobalt emerald saffron ruby, tadelakt walls, cedar wood",
    image: getUnsplashUrl("photo-1740602552445-c71ac1dd04d9"),
    promptSuggestions: [
      "azulejos zellige en cobalto y verde en pared",
      "linternas de latón con arabescos colgantes",
      "pouf de cuero bordado en saffron y bordó",
      "techo con cúpula de madera de cedro tallado",
    ],
  },
  {
    id: "japones-zen",
    name: "Japonés Zen",
    category: "Regionales y étnicos",
    description: "Minimalismo contemplativo, tatami y shoji",
    promptBoost:
      "japanese zen interior, shoji rice paper screens, tatami mats, low profile furniture, indoor-outdoor connection, beige gray moss green palette, bamboo stone natural fibers",
    image: "/images/japones-zen.webp",
    promptSuggestions: [
      "pantallas shoji de madera y papel de arroz",
      "tatami en suelo con futon de algodón sin teñir",
      "jardín zen con grava, piedras y bambú",
      "ikebana en tokonoma, el nicho de honor",
    ],
  },
  {
    id: "chinoiserie",
    name: "Chinoiserie",
    category: "Regionales y étnicos",
    description: "Laca, pagoda y papel pintado escénico",
    promptBoost:
      "chinoiserie interior, scenic hand-painted wallpaper with birds and pagodas, lacquered furniture black red gold, bamboo accents, blue and white porcelain, jade green",
    image: getUnsplashUrl("photo-1676115404791-bee82a783028"),
    promptSuggestions: [
      "papel pintado escénico con pájaros y bambú",
      "muebles lacados en negro y rojo con incrustaciones de oro",
      "jarrones de porcelana azul y blanca",
      "biombos pintados como divisor de espacios",
    ],
  },
  {
    id: "indio",
    name: "Indio",
    category: "Regionales y étnicos",
    description: "Tallados, seda bordada y especias de color",
    promptBoost:
      "indian interior, intricate wood carvings, richly embroidered silk textiles, brass and copper accents, saffron turquoise crimson jewel palette, marble jali screens",
    image: getUnsplashUrl("photo-1758172948668-52fbabc52a7c"),
    promptSuggestions: [
      "puertas talladas en madera de teca con incrustaciones",
      "textiles bordados en seda saffron y carmesí",
      "lámparas de latón caladas con patrones geométricos",
      "suelo de mármol con incrustaciones de piedras semipreciosas",
    ],
  },
  {
    id: "suroeste-americano",
    name: "Suroeste Americano",
    category: "Regionales y étnicos",
    description: "Adobe, turquesa y textiles nativos",
    promptBoost:
      "american southwest interior, adobe walls, navajo geometric patterns, solid wood furniture, wrought iron accents, terracotta turquoise red adobe sandy palette, native american craft",
    image: getUnsplashUrl("photo-1648129027192-4e4fa2dfc90f"),
    promptSuggestions: [
      "muros de adobe pintado en terracota o blanco arena",
      "textiles navajo como tapiz o sobre sofá",
      "vigas de madera maciza en techo de adobe",
      "ristras de chiles y cestas de paja como decoración",
    ],
  },
  {
    id: "tropical",
    name: "Tropical",
    category: "Regionales y étnicos",
    description: "Vegetación exuberante, ratán y brisa",
    promptBoost:
      "tropical interior, lush indoor plants large leaf banana monstera, open plan, rattan and bamboo furniture, ceiling fans, green turquoise coral white sand palette",
    image: getUnsplashUrl("photo-1683914791868-69e86700fee1"),
    promptSuggestions: [
      "plantas de gran follaje: platanera, monstera, heliconia",
      "ventilador de techo con aspas de bambú",
      "muebles de ratán o bambú trenzado",
      "lino blanco en cortinas que se mueven con el viento",
    ],
  },
  {
    id: "africano",
    name: "Africano",
    category: "Regionales y étnicos",
    description: "Kente, mud cloth y artesanía de la diáspora",
    promptBoost:
      "afrocentric interior, kente and mud cloth textiles, hand-carved wooden sculptures, woven baskets, vibrant earth tones with gold emerald accents, terracotta ceramics, symbolic motifs",
    image: "/images/africano.webp",
    promptSuggestions: [
      "tela mud cloth como tapiz o funda de cojín",
      "cestas tejidas apiladas en diferentes tamaños",
      "esculturas de madera de ébano o caoba",
      "lámparas de terracota pintada con motivos tribales",
    ],
  },
  {
    id: "americano",
    name: "Americano",
    category: "Regionales y étnicos",
    description: "Quilts, madera envejecida y señas vintage",
    promptBoost:
      "americana interior, vintage patchwork quilts, distressed wood furniture, mason jars, cast iron accents, red white blue natural wood palette, farmhouse nostalgia, patriotic",
    image: getUnsplashUrl("photo-1571247865791-9d7ed2ddf033"),
    promptSuggestions: [
      "quilt de patchwork en cama o pared como arte",
      "frascos mason como floreros o portavelas",
      "señales de metal vintage en paredes",
      "madera envejecida americana en suelo o bancada",
    ],
  },

  // ── IV. Rústicos y naturales ──────────────────────────────────────────────
  {
    id: "rustico",
    name: "Rústico",
    category: "Rústicos y naturales",
    description: "Madera sin tratar, piedra y naturaleza cruda",
    promptBoost:
      "rustic interior, raw unfinished wood beams, stone fireplace, natural woven textiles, animal hide rugs, earthy brown tan cream forest green palette, iron hardware",
    image: getUnsplashUrl("photo-1758116448135-e989799305da"),
    promptSuggestions: [
      "chimenea de piedra como elemento central de la sala",
      "vigas de madera bruta sin tratar en techo",
      "pieles naturales sobre suelo de madera sin pulir",
      "cestas de mimbre y lino grueso como textiles",
    ],
  },
  {
    id: "farmhouse",
    name: "Farmhouse",
    category: "Rústicos y naturales",
    description: "Madera recuperada, acogedor, estilo granja",
    promptBoost:
      "modern farmhouse interior, shiplap white walls, reclaimed wood beams, open shelving, barn door, warm and cozy, galvanized metal accents",
    image: "/images/farmhouse.jpg",
    promptSuggestions: [
      "vigas de madera recuperada en el techo",
      "pared de tablillas blancas (shiplap)",
      "cocina con estantes abiertos y tarro mason",
      "puerta de granero corredera en madera oscura",
    ],
  },
  {
    id: "modern-farmhouse",
    name: "Modern Farmhouse",
    category: "Rústicos y naturales",
    description: "Granja actualizada, shiplap y acentos negros",
    promptBoost:
      "modern farmhouse interior, white shiplap walls, reclaimed wood accents, matte black hardware and fixtures, open shelving kitchen, clean neutral palette, contemporary farmhouse",
    image: getUnsplashUrl("photo-1768486143865-342d8cc12c90"),
    promptSuggestions: [
      "shiplap blanco con tabla de madera recuperada",
      "grifería y manivelas en negro mate",
      "estantes abiertos con jarras de cerámica blanca",
      "puerta de granero corredera con riel negro",
    ],
  },
  {
    id: "cottage",
    name: "Cottage",
    category: "Rústicos y naturales",
    description: "Simplicidad rural, flores y encanto nostálgico",
    promptBoost:
      "cottagecore interior, floral printed fabrics, vintage painted furniture, soft yellow sage rose cream palette, handmade textiles, wildflowers in jars, cozy nostalgic rural",
    image: "/images/cottage.webp",
    promptSuggestions: [
      "estampados florales pequeños en cortinas y cojines",
      "muebles pintados en blanco envejecido o azul claro",
      "flores silvestres en jarras de cerámica",
      "manteles y tapetes de encaje o punto",
    ],
  },
  {
    id: "cabana-chalet",
    name: "Cabaña Chalet",
    category: "Rústicos y naturales",
    description: "Refugio de montaña, maderas y chimenea",
    promptBoost:
      "alpine chalet interior, dark wood paneling, large stone fireplace, animal fur throws, exposed ceiling beams, deep forest greens burgundy warm browns, iron candelabras",
    image: "/images/cabana-chalet.webp",
    promptSuggestions: [
      "pared revestida en madera oscura tipo paneling",
      "piel de oveja o lana frente a chimenea de piedra",
      "vigas de madera gruesa a la vista",
      "astas de ciervo o antorchas como decoración",
    ],
  },
  {
    id: "shabby-chic",
    name: "Shabby Chic",
    category: "Rústicos y naturales",
    description: "Vintage romántico, muebles decapados",
    promptBoost:
      "shabby chic interior, whitewashed distressed furniture, floral fabrics, lace trim accents, pastel pink blue cream lavender, vintage roses, romantic feminine aesthetic",
    image: "/images/shabby-chic.webp",
    promptSuggestions: [
      "muebles decapados en blanco con toques de madera vista",
      "telas de encaje como cubresofa o cortina",
      "marcos dorados envejecidos con espejos",
      "rosas secas y flores en jarras de porcelana vintage",
    ],
  },

  // ── V. Industriales y urbanos ─────────────────────────────────────────────
  {
    id: "industrial",
    name: "Industrial",
    category: "Industriales y urbanos",
    description: "Ladrillo visto, metal, materiales crudos",
    promptBoost:
      "industrial interior, exposed brick, metal accents, raw materials, loft style",
    image: "/images/industrial.jpg",
    promptSuggestions: [
      "tuberías y conductos vistos en el techo",
      "ladrillo visto en una pared",
      "suelo de hormigón pulido o resina",
      "iluminación Edison con bombillas vistas",
    ],
  },
  {
    id: "neo-industrial",
    name: "Neo-Industrial",
    category: "Industriales y urbanos",
    description: "Industrial refinado, cobre y equilibrio",
    promptBoost:
      "neo-industrial interior, exposed brick with clean mortar joints, decorative copper pipe elements, natural wood slab furniture, warm grey black copper palette, sophisticated urban",
    image: "/images/neo-industrial.webp",
    promptSuggestions: [
      "ladrillo expuesto con juntas limpias y regulares",
      "tubería de cobre vista como elemento estético",
      "mesa de losa de madera maciza con patas de metal",
      "hormigón pulido alternado con madera natural",
    ],
  },
  {
    id: "urbano-moderno",
    name: "Urbano Moderno",
    category: "Industriales y urbanos",
    description: "Metropolitano elegante, monocromía y arte",
    promptBoost:
      "modern urban interior, polished concrete walls, charcoal black deep blue moody palette, statement artwork gallery, track lighting, open plan sophisticated metropolitan",
    image: getUnsplashUrl("photo-1765766601592-ac2936aa87e0"),
    promptSuggestions: [
      "paredes de hormigón visto o microcemento gris oscuro",
      "iluminación track negro mate con focos orientables",
      "arte de gran formato como única decoración",
      "sofá en forma de L en gris antracita sobre parqué oscuro",
    ],
  },
  {
    id: "steampunk",
    name: "Steampunk",
    category: "Industriales y urbanos",
    description: "Victoriano más maquinaria industrial",
    promptBoost:
      "steampunk interior, decorative gears and cogs, exposed copper pipes, victorian furniture with mechanical modifications, warm brass dark brown burgundy palette, aged leather",
    image: getUnsplashUrl("photo-1678705543115-78279c55abc5"),
    promptSuggestions: [
      "engranajes y relojes de latón como decoración de pared",
      "tuberías de cobre vista como estantería",
      "sillas victorianas con ruedas y partes mecánicas",
      "globos terráqueos y telescopios vintage como accesorios",
    ],
  },
  {
    id: "loft",
    name: "Loft",
    category: "Industriales y urbanos",
    description: "Planta diáfana, techos altos y eclecticismo",
    promptBoost:
      "loft interior, open plan no partitions, high ceilings with steel beams, industrial grid windows, mezzanine level, mix of raw textures with design furniture pieces",
    image: getUnsplashUrl("photo-1668438712649-ffd85f756de5"),
    promptSuggestions: [
      "planta completamente abierta sin tabiques divisorios",
      "ventanales industriales de cuadrícula de acero negro",
      "mezzanine de madera con barandilla metálica",
      "mezcla de sofá de diseño con objetos industriales vintage",
    ],
  },

  // ── VI. Costeros y náuticos ───────────────────────────────────────────────
  {
    id: "costero",
    name: "Costero",
    category: "Costeros y náuticos",
    description: "Brisa marina, tonos arena y azul, relajado",
    promptBoost:
      "coastal interior, Hamptons style, driftwood textures, ocean blues, linen fabrics, bright airy spaces, natural rattan",
    image: "/images/costero.jpg",
    promptSuggestions: [
      "maderas desgastadas tipo flotante (driftwood)",
      "telas de lino en blanco y azul claro",
      "cestas de mimbre y ratán como almacenaje",
      "toques de azul marino y arena en cojines",
    ],
  },
  {
    id: "nautico",
    name: "Náutico",
    category: "Costeros y náuticos",
    description: "Rayas navy y motivos marítimos",
    promptBoost:
      "nautical interior, navy and white stripe patterns, anchor and helm motifs, rope decorative details, brass ship hardware, teak wood, marine blue white red palette",
    image: getUnsplashUrl("photo-1636773683156-c7d66e0ef3df"),
    promptSuggestions: [
      "rayas navy horizontales en alfombra o cojines",
      "anclas y timones de latón como decoración",
      "cuerda trenzada en apliques y pomos",
      "madera de teca envejecida en suelo o muebles",
    ],
  },

  // ── VII. Lujo y glamour ───────────────────────────────────────────────────
  {
    id: "hollywood-regency",
    name: "Hollywood Regency",
    category: "Lujo y glamour",
    description: "Glamour dorado, lacas y espejos de Hollywood",
    promptBoost:
      "hollywood regency interior, lacquered surfaces, mirrored furniture and accents, button-tufted velvet sofas, crystal chandeliers, bold contrast white black jewel tones emerald sapphire",
    image: getUnsplashUrl("photo-1622640391303-11220d732542"),
    promptSuggestions: [
      "sofá capitoné en terciopelo esmeralda o zafiro",
      "mesa de centro o aparador espejado",
      "cortinas de seda de piso a techo con cenefa dorada",
      "lámpara de araña de cristal como pieza central",
    ],
  },
  {
    id: "glam-lujo",
    name: "Glam Lujo",
    category: "Lujo y glamour",
    description: "Opulencia y sofisticación en cada detalle",
    promptBoost:
      "glamour luxury interior, high gloss finishes, metallic gold silver accents, plush velvet and silk fabrics, crystal glass accessories, cream black gold palette, opulent statement",
    image: getUnsplashUrl("photo-1625244695851-1fc873f942bc"),
    promptSuggestions: [
      "candelabros de cristal de varios brazos",
      "tapete de pelo largo en crema o blanco",
      "acentos dorados en marcos, lámparas y apliques",
      "telas de terciopelo y seda en tonos joya",
    ],
  },
  {
    id: "quiet-luxury",
    name: "Quiet Luxury",
    category: "Lujo y glamour",
    description: "Lujo silencioso, calidad sin ostentación",
    promptBoost:
      "quiet luxury stealth wealth interior, natural travertine stone, noble oak walnut woods, linen cashmere textiles, understated palette taupe beige cream warm grey, old money aesthetic",
    image: getUnsplashUrl("photo-1758448755952-42b404bc6f39"),
    promptSuggestions: [
      "suelo y pared de travertino sin pulir",
      "tapicería de cachemira o lino de calidad excepcional",
      "un solo objeto artesanal como escultura focal",
      "madera de roble o nogal en acabado natural sin lacar",
    ],
  },
  {
    id: "clasico",
    name: "Clásico",
    category: "Lujo y glamour",
    description: "Molduras elegantes, telas ricas, atemporal",
    promptBoost:
      "classic interior, elegant moldings, rich fabrics, timeless furniture, symmetrical",
    image: "/images/clasico.jpg",
    promptSuggestions: [
      "molduras ornamentadas en paredes y techo",
      "muebles con patas torneadas y telas damasco",
      "chimenea de mármol como elemento central",
      "araña de cristal en el techo",
    ],
  },

  // ── VIII. Eclécticos y de fusión ──────────────────────────────────────────
  {
    id: "boho",
    name: "Bohemio",
    category: "Eclécticos y de fusión",
    description: "Macramé, textiles globales, espíritu libre",
    promptBoost:
      "bohemian interior, macrame wall art, rattan furniture, layered textiles, plants, eclectic global decor, earthy tones",
    image: "/images/bohemio.jpg",
    promptSuggestions: [
      "macramé en la pared",
      "plantas colgantes y suculentas",
      "alfombras en capas de distintas texturas",
      "cojines con estampados étnicos",
    ],
  },
  {
    id: "eclectico",
    name: "Ecléctico",
    category: "Eclécticos y de fusión",
    description: "Mezcla curada de épocas y orígenes",
    promptBoost:
      "eclectic interior, curated mix of periods and origins, antiques alongside modern pieces, varied textures and patterns, travel-inspired objects, coherent through color and balance",
    image: getUnsplashUrl("photo-1595446757331-795d866924a9"),
    promptSuggestions: [
      "antigüedad junto a pieza de diseño contemporáneo",
      "alfombra étnica bajo mesa de diseño moderno",
      "galería de arte variado sin criterio de período",
      "mezcla de madera oscura, latón y mármol blanco",
    ],
  },
  {
    id: "maximalista",
    name: "Maximalista",
    category: "Eclécticos y de fusión",
    description: "Más es más, capas, color y declaración",
    promptBoost:
      "maximalist interior, layered patterns and textures, gallery wall with multiple frames, bold jewel tone palette, statement furniture pieces, ceiling painted in dark color with moldings",
    image: getUnsplashUrl("photo-1659640219304-b5656eee3465"),
    promptSuggestions: [
      "paredes galería con marcos de distintos tamaños",
      "terciopelo estampado en sofá con cojines variados",
      "techo pintado en color oscuro con molduras",
      "colección de objetos de arte organizados por color",
    ],
  },
  {
    id: "kitsch",
    name: "Kitsch",
    category: "Eclécticos y de fusión",
    description: "Ironía absurdista, pop art y provocación",
    promptBoost:
      "kitsch interior, pop art decorative objects, deliberately mismatched colors and styles, neon signs as art, plastic elements, absurdist humor, provocative anti-taste eclecticism",
    image: getUnsplashUrl("photo-1650138185915-6e1cb9aa3ae4"),
    promptSuggestions: [
      "objetos pop art como lámparas en formas de labios o bananas",
      "neón con mensaje o forma como arte de pared",
      "mezcla deliberada de estampados que chocan",
      "muebles en colores fluorescentes o animal print",
    ],
  },
  {
    id: "japandi",
    name: "Japandi",
    category: "Eclécticos y de fusión",
    description: "Wabi-sabi, zen, materiales naturales",
    promptBoost:
      "japandi interior, wabi-sabi, zen atmosphere, natural materials, muted palette",
    image: "/images/japandi.jpg",
    promptSuggestions: [
      "mobiliario de perfil muy bajo, pegado al suelo",
      "cerámica artesanal con irregularidades visibles",
      "luz tamizada a través de paneles shoji",
      "bambú, piedra y madera sin tratar como materiales",
    ],
  },
  {
    id: "scandi-boho",
    name: "Scandi-Boho",
    category: "Eclécticos y de fusión",
    description: "Minimalismo nórdico con eclecticismo boho",
    promptBoost:
      "scandi boho interior, nordic minimal furniture with bohemian warmth, macrame on white walls, rattan next to clean lined furniture, layered wool rugs, muted earthy tones",
    image: getUnsplashUrl("photo-1608131167861-017f29499468"),
    promptSuggestions: [
      "macramé grande en pared blanca",
      "silla de ratán junto a mueble nórdico de líneas limpias",
      "alfombras de lana en capas sobre parqué claro",
      "plantas en macetas de cerámica blanca o terracota",
    ],
  },
  {
    id: "afrohemian",
    name: "Afrohemian",
    category: "Eclécticos y de fusión",
    description: "Afrocéntrico y bohemio, herencia y libertad",
    promptBoost:
      "afrohemian interior, african mud cloth kente textiles, handwoven baskets, tropical plants in terracotta, rich earth tones with gold cobalt accents, handcrafted ceramics diaspora",
    image: "https://blog.planreforma.com/wp-content/uploads/2015/12/blog.planreforma_africanchic-10.jpg",
    promptSuggestions: [
      "tela mud cloth o kente como tapiz o funda de cojín",
      "cestas tejidas africanas en distintos tamaños apiladas",
      "plantas tropicales en macetas de terracota artesanal",
      "mezcla de fibras naturales con acentos dorados",
    ],
  },
  {
    id: "grandmillennial",
    name: "Grandmillennial",
    category: "Eclécticos y de fusión",
    description: "Decoración de abuela con ironía millennial",
    promptBoost:
      "grandmillennial granny chic interior, floral chintz wallpaper, skirted upholstered furniture, needlepoint pillows, displayed china collection, preppy traditional palette pink green",
    image: getUnsplashUrl("photo-1727645710175-aa1dc3449e40"),
    promptSuggestions: [
      "papel pintado floral vintage en toda la habitación",
      "sillones con faldón tapizado en chintz",
      "colección de porcelana china en vitrina",
      "cojines de needlepoint con animales o flores",
    ],
  },
  {
    id: "coastal-scandifornia",
    name: "Coastal Scandifornia",
    category: "Eclécticos y de fusión",
    description: "Escandinavo + California costera, 2025",
    promptBoost:
      "coastal scandifornia interior, soft utility, clean nordic lines with californian beachy warmth, airy linen, light pine wood, sage turquoise golden yellow soft ocean blues",
    image: "/images/coastal-scandifornia.webp",
    promptSuggestions: [
      "muebles de pino claro sin tratar con cojines de lino",
      "acentos en verde salvia y turquesa suave",
      "cestería natural y plantas suculentas",
      "cortinas de lino crema que dejan pasar la luz",
    ],
  },
  {
    id: "revival-70s",
    name: "Revival Años 70",
    category: "Eclécticos y de fusión",
    description: "Macramé, terciopelo y paleta setentera",
    promptBoost:
      "70s revival interior, macrame wall art, curved velvet sofas, conversation pit, patterned wallpaper, shag carpet, moss green mustard burnt sienna palette, retro optimism",
    image: "/images/revival-70s.webp",
    promptSuggestions: [
      "sofá curvo de terciopelo en verde musgo o mostaza",
      "macramé grande de pared con flecos largos",
      "alfombra shag en tonos tierra",
      "lámpara de arco en latón sobre mesa de centro baja",
    ],
  },

  // ── IX. Filosóficos y bienestar ───────────────────────────────────────────
  {
    id: "wabi-sabi",
    name: "Wabi-Sabi",
    category: "Filosóficos y bienestar",
    description: "Belleza en la imperfección, texturas crudas",
    promptBoost:
      "wabi-sabi interior, imperfect beauty, raw textures, organic shapes, aged wood, handmade ceramics, natural imperfections, earthy neutrals",
    image: "/images/wabi-sabi.jpg",
    promptSuggestions: [
      "cerámica artesanal con grietas visibles y formas irregulares",
      "madera sin tratar con veta natural",
      "paredes de cal con textura rugosa",
      "flores secas y ramas naturales como decoración",
    ],
  },
  {
    id: "hygge",
    name: "Hygge",
    category: "Filosóficos y bienestar",
    description: "Bienestar danés, velas y textiles acogedores",
    promptBoost:
      "hygge interior, candles everywhere soft glow, chunky knit throws, sheepskin rugs, natural wood materials, warm ambient lighting, cozy reading nook, warm white cream beige",
    image: getUnsplashUrl("photo-1697787991571-c7ede3ae81e8"),
    promptSuggestions: [
      "velas de diferentes alturas por toda la estancia",
      "mantas de punto grueso y piel de oveja en sofá",
      "rincón de lectura con butaca y luz cálida",
      "madera de abedul con iluminación de temperatura muy cálida",
    ],
  },
  {
    id: "lagom",
    name: "Lagom",
    category: "Filosóficos y bienestar",
    description: "Suficiente y equilibrado, concepto sueco",
    promptBoost:
      "lagom interior, careful balance nothing excessive, quality functional beauty, sustainable natural materials, soft whites blue grey greens, well-crafted pieces, swedish philosophy",
    image: "https://sevilla.abc.es/estilo/bulevarsur/wp-content/uploads/sites/14/2017/09/decoracion-lagom-p.jpg",
    promptSuggestions: [
      "muebles de calidad sin exceso de piezas",
      "tejidos naturales sostenibles: lino, lana orgánica",
      "almacenaje funcional integrado invisible",
      "luz natural maximizada, sin decoración superflua",
    ],
  },
  {
    id: "kinfolk",
    name: "Kinfolk",
    category: "Filosóficos y bienestar",
    description: "Simplicidad auténtica, artesanía y calma",
    promptBoost:
      "kinfolk interior, authentic simplicity, handmade ceramics on raw wood table, undyed linen textiles, natural light protagonist, honest materials, calm convivial atmosphere",
    image: getUnsplashUrl("photo-1754912895549-48470d574792"),
    promptSuggestions: [
      "mesa de madera sin tratar con cerámica artesanal",
      "lino sin teñir en manteles y servilletas",
      "luz natural como protagonista, pocas velas",
      "objetos pequeños con historia personal",
    ],
  },
  {
    id: "biofilico",
    name: "Biofílico",
    category: "Filosóficos y bienestar",
    description: "Conexión con la naturaleza en el espacio",
    promptBoost:
      "biophilic design interior, living green wall with plants, abundant natural light, indoor water feature, organic curved shapes, green forest palette, natural stone wood bamboo",
    image: getUnsplashUrl("photo-1761971974926-a86159bc3471"),
    promptSuggestions: [
      "pared vegetal vertical como elemento principal",
      "fuente de agua interior en piedra natural",
      "maximizar luz natural con espejos estratégicos",
      "plantas en todos los rincones: suelo, techo y estantes",
    ],
  },
  {
    id: "salutogenico",
    name: "Salutogénico",
    category: "Filosóficos y bienestar",
    description: "Diseño para salud física y mental",
    promptBoost:
      "salutogenic design interior, air purifying plants, circadian optimized lighting, ergonomic natural fabric furniture, non-toxic materials, calm blue green neutral wellness palette",
    image: "https://media.admagazine.com/photos/659ecd2340f6f2a104e6ca03/16:9/w_1920,c_limit/231107-House-of-Grey-Reset-Space-037-Web.jpg",
    promptSuggestions: [
      "plantas purificadoras de aire: pothos, espáctila, dracena",
      "iluminación LED de temperatura ajustable por hora del día",
      "mobiliario ergonómico con tapizado de lana natural",
      "materiales no tóxicos: pintura sin COV, madera maciza",
    ],
  },

  // ── X. Micro-tendencias digitales ────────────────────────────────────────
  {
    id: "dark-academia",
    name: "Dark Academia",
    category: "Micro-tendencias digitales",
    description: "Maderas oscuras, libros, atmósfera intelectual",
    promptBoost:
      "dark academia interior, dark wood paneling, floor-to-ceiling bookshelves, moody lighting, classical art, Persian rugs, leather armchair, scholarly atmosphere",
    image: "/images/daracademia.jpg",
    promptSuggestions: [
      "estanterías hasta el techo llenas de libros encuadernados",
      "butaca de cuero envejecido junto a lámpara de lectura",
      "globo terráqueo y esculturas de busto clásico",
      "alfombra persa oscura en granate y verde",
    ],
  },
  {
    id: "dark-cottagecore",
    name: "Dark Cottagecore",
    category: "Micro-tendencias digitales",
    description: "Cottage oscuro, bosque profundo y gótico",
    promptBoost:
      "dark cottagecore interior, deep forest green walls, gothic botanical prints vintage frames, dark wood beams, luxurious velvet, dried flowers and herbs, candlelight moody romantic",
    image: "https://i.pinimg.com/736x/5a/b7/8d/5ab78d1aa662dc7f96c45fd34fc90571.jpg",
    promptSuggestions: [
      "paredes pintadas en verde bosque profundo",
      "grabados botánicos vintage en marcos dorados",
      "velas y flores secas como decoración principal",
      "terciopelo en verde oscuro o borgoña en sillas",
    ],
  },
  {
    id: "goblincore",
    name: "Goblincore",
    category: "Micro-tendencias digitales",
    description: "Naturaleza caótica, setas, musgo y cristales",
    promptBoost:
      "goblincore interior, organized natural chaos, terrariums with ferns and moss, crystal and stone collections, mushroom motifs, deep greens earthy browns, foraged objects",
    image: "https://i.pinimg.com/564x/57/36/cf/5736cf475da52174feb6c6cf76bfee2e.jpg",
    promptSuggestions: [
      "terrario de plantas carnívoras y helechos",
      "colección de cristales y piedras en bandeja de madera",
      "musgo decorativo en marcos o macetas",
      "cuadros botánicos vintage con setas y helechos",
    ],
  },
  {
    id: "cluttercore",
    name: "Cluttercore",
    category: "Micro-tendencias digitales",
    description: "Anti-minimalismo, objetos curados con historia",
    promptBoost:
      "cluttercore interior, densely displayed personal objects and collectibles, floor-to-ceiling bookshelves, mixed layered textiles, rich eclectic color, curated personal meaningful chaos",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSkEIn7MCPDQRQo5yzkgd0wSm2qxooZlpfAA&s",
    promptSuggestions: [
      "estantería de piso a techo con libros de lomo visible",
      "galería densa de marcos y postales en toda una pared",
      "cestas con objetos y textiles mezclados",
      "colección de objetos vintage organizados por color",
    ],
  },
  {
    id: "regencycore",
    name: "Regencycore",
    category: "Micro-tendencias digitales",
    description: "Opulencia Regencia, estilo Bridgerton",
    promptBoost:
      "regencycore bridgerton inspired interior, ornate floral wallpaper, white wood moldings, antique gilded furniture, pastel dusty blue rose green palette, silk brocade, crystal chandelier",
    image: "https://hips.hearstapps.com/hmg-prod/images/regencycore-1648553601.jpg",
    promptSuggestions: [
      "papel pintado ornamentado floral en azul empolvado",
      "molduras de madera blancas en puertas y paredes",
      "butacas tapizadas en seda brocada color pastel",
      "lámpara de araña de cristal pequeña como foco",
    ],
  },
  {
    id: "balletcore",
    name: "Balletcore",
    category: "Micro-tendencias digitales",
    description: "Etéreo y delicado, tutú y barra de ballet",
    promptBoost:
      "balletcore interior, sheer tulle gauze drapes, ballet barre element, large delicate mirror, pale rose cream white nude grey soft palette, ribbons, ethereal feminine",
    image: "https://fotos.imghs.net/media/pisosblog/2015/09/la-habitacion-de-una-bailarina-de-ballet5.jpg",
    promptSuggestions: [
      "cortinas de tul y gasa translúcida",
      "barra de ballet integrada en habitación o vestidor",
      "espejo grande de suelo a techo con marco dorado delicado",
      "paleta total en rosa pálido, crema y nude",
    ],
  },
  {
    id: "dopamine-decor",
    name: "Dopamine Decor",
    category: "Micro-tendencias digitales",
    description: "Colores saturados para provocar alegría",
    promptBoost:
      "dopamine decor interior, saturated bold colors cobalt emerald tangerine sunflower hot pink, maximalist color blocking, playful joyful patterns, expressive and personal happiness",
    image: "https://static.bainet.es/clip/6cf8054a-6b73-44fd-95cb-1715c37329ef_source-aspect-ratio_1600w_0.jpg",
    promptSuggestions: [
      "paredes pintadas en cobalto o esmeralda saturado",
      "cojines en naranja y amarillo girasol sobre sofá neutro",
      "alfombra de pelo en color vibrante",
      "mezcla de colores primarios y secundarios sin miedo",
    ],
  },
  {
    id: "chateaucore",
    name: "Chateaucore",
    category: "Micro-tendencias digitales",
    description: "Chateau francés romántico y envejecido",
    promptBoost:
      "chateaucore interior, antique Louis XV furniture white and gold distressed, toile de jouy wallpaper dusty rose, ornate fireplace overmantel, candelabras, faded romantic grandeur",
    image: "https://hips.hearstapps.com/hmg-prod/images/ideas-comedores-sillas-diferentes-blancas-estilo-nordico-mesa-madera-1561718934.jpg",
    promptSuggestions: [
      "muebles Luis XV envejecidos en blanco y dorado",
      "papel pintado toile en rosa empolvado o verde sage",
      "chimenea con repisa ornamentada y candelabros",
      "suelo de parquet a espiga envejecido sin pulir",
    ],
  },
  {
    id: "pearlcore",
    name: "Pearlcore",
    category: "Micro-tendencias digitales",
    description: "Nacarado e iridiscente, suave y luminoso",
    promptBoost:
      "pearlcore interior, pearlescent iridescent surfaces and tiles, rounded soft curved forms, mother of pearl accents, soft diffused lighting, white champagne blush silver palette",
    image: "https://media.admagazine.com/photos/62c4716e6a7ae6b5eea738a8/16:9/w_1920,c_limit/Sala%20perla.jpg",
    promptSuggestions: [
      "acabados nacarados en muebles o azulejos",
      "iluminación difusa muy suave y perlada",
      "textiles de seda y satén en blanco y champán",
      "accesorios con nácar en cuadros y pomos",
    ],
  },
  {
    id: "scotlandcore",
    name: "Scotlandcore",
    category: "Micro-tendencias digitales",
    description: "Tierras Altas escocesas, tartán y piedra",
    promptBoost:
      "scotlandcore highland inspired interior, tartan plaid throws and cushions, stone or slate walls, dried heather, amber candlelight, deep greens burgundy navy purple heather palette",
    image: "/images/scotlandcore.webp",
    promptSuggestions: [
      "mantas y cojines en tartán de clan escocés",
      "muros de piedra vista o pizarra gris",
      "brezo seco y velas de ámbar como decoración",
      "madera oscura de roble con apliques de hierro forjado",
    ],
  },
  {
    id: "forestcore",
    name: "Forestcore",
    category: "Micro-tendencias digitales",
    description: "Bosque pastoral, animales y folclore",
    promptBoost:
      "forestcore deercore interior, forest and deer botanical motifs, dark wood furniture, pressed botanical framed prints, earthy mushroom olive palette, enchanted woodland atmosphere",
    image: "https://media.admagazine.com/photos/6439d66d44f5df16735c0bea/16:9/w_1920,c_limit/forestcore.jpg",
    promptSuggestions: [
      "papel pintado con motivos de bosque y ciervos",
      "cuadros de plantas prensadas en marcos de madera",
      "ramas naturales y hojas secas como decoración",
      "hiedra y helechos trepando por estantería",
    ],
  },

  // ── XI. Tecnológicos y futuristas ─────────────────────────────────────────
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    category: "Tecnológicos y futuristas",
    description: "Neón distópico y tecnología retrofutura",
    promptBoost:
      "cyberpunk interior, neon LED strips magenta and cyan under furniture edges, smart home screen integration, transparent acrylic furniture with internal lighting, dark concrete walls",
    image: "/images/cyberpunk.webp",
    promptSuggestions: [
      "tiras LED neón en magenta y cian bajo muebles",
      "pantallas integradas en pared como arte interactivo",
      "mobiliario acrílico transparente con iluminación interna",
      "paredes de hormigón oscuro con grafiti digital",
    ],
  },
  {
    id: "retrofuturismo",
    name: "Retrofuturismo",
    category: "Tecnológicos y futuristas",
    description: "El futuro que soñó el pasado, retro + tech",
    promptBoost:
      "retrofuturism interior, sputnik chandelier starburst, lava lamp accent, atomic age curves and forms, bold colors on white, vinyl fiberglass materials, space age 1950s optimism",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpdPKKkKRAsr59mrbbFiOJwsJrhbvM9WSynbk_8KUwvEDCBqO6JUuSngy2-SujptJYPxiDXJbEpkZ8Vz9h835YhcvmnvzadaMF09auI70l9ncDH7sb1jXpurSo2J7erHmzmy6Q1G5OCsqo1eLqOWOdmtsOx_12Th0rN0BtrAAmYLElX2kl_s9Z7oIUmkU/s1280/estilo-retro-futurista.webp",
    promptSuggestions: [
      "lámpara Sputnik de brazos como pieza central",
      "lámpara de lava como acento retro-tecnológico",
      "muebles con curvas atómicas en fibra de vidrio",
      "reloj y accesorios inspirados en la carrera espacial",
    ],
  },
  {
    id: "futurismo-sostenible",
    name: "Futurismo Sostenible",
    category: "Tecnológicos y futuristas",
    description: "Smart home ecológico, tecnología integrada",
    promptBoost:
      "sustainable futurism smart home interior, hidden integrated technology, solar panel aesthetic integration, recycled design materials with premium finish, clean whites natural wood, AI living",
    image: getUnsplashUrl("photo-1725042893312-5ec0dea9e369"),
    promptSuggestions: [
      "tecnología completamente oculta en mobiliario",
      "materiales reciclados con acabado de diseño premium",
      "paneles solares integrados estéticamente",
      "luz natural maximizada con sensores automáticos",
    ],
  },

  // ── XII. Tendencias 2025-2026 ─────────────────────────────────────────────
  {
    id: "minimalismo-calido",
    name: "Minimalismo Cálido",
    category: "Tendencias 2025-2026",
    description: "Minimalismo con textura, calidez y cal",
    promptBoost:
      "warm minimalism interior, lime plaster textured walls, light oak wood floors, creamy warm neutral palette, few curated meaningful objects, tactile natural textures, abundant natural light",
    image: "https://media.admagazine.com/photos/678157301c7f2190953ae8f3/16:9/w_1920,c_limit/MKD_FOCH_%2017-RETOUCHE.jpg",
    promptSuggestions: [
      "paredes de cal en tono crema o blanco cálido",
      "suelo de roble natural sin tratar",
      "dos o tres objetos cerámicos curados como única decoración",
      "textiles de lino y lana en tonos arena",
    ],
  },
  {
    id: "minimalismo-energetico",
    name: "Minimalismo Energético",
    category: "Tendencias 2025-2026",
    description: "Espacio intencional con resonancia emocional",
    promptBoost:
      "energetic minimalism interior, intentional space flow, meaningful singular objects, undraped windows for natural light, pure forms with emotional resonance, vibrational design 2025",
    image: "https://media.admagazine.com/photos/65afe54d29b09ea3597f21fa/16:9/w_1920,c_limit/Featured%20-%201620%20x%201080%20(1).png",
    promptSuggestions: [
      "un solo objeto artesanal significativo en cada habitación",
      "luz natural sin obstáculos como protagonista",
      "espacio vacío deliberado como elemento de diseño",
      "sin decoración superficial en paredes",
    ],
  },
  {
    id: "minimalismo-maximalista",
    name: "Minimalismo Maximalista",
    category: "Tendencias 2025-2026",
    description: "Drama en forma y silueta, paleta neutra",
    promptBoost:
      "maximalist minimalism interior 2025, bold graphic stripes on one wall, oversized sculptural furniture in neutral tones, single dramatic statement form, drama through shape not color",
    image: "https://luzio.es/cdn/shop/articles/salon-decorado-en-estilo-maximalista_91d736ee-f995-4acf-bffa-b79b0d21ac17_720x.jpg?v=1765974788",
    promptSuggestions: [
      "rayas audaces en una sola pared o suelo",
      "sofá sobredimensionado con silueta escultórica neutra",
      "una escultura grande como único elemento decorativo",
      "contraste entre escala enorme y paleta monocromática",
    ],
  },
  {
    id: "organico-moderno",
    name: "Orgánico Moderno",
    category: "Tendencias 2025-2026",
    description: "Curvas suaves, materiales naturales, 2025",
    promptBoost:
      "organic modern interior, curved sculptural furniture, warm earth tones, natural stone, linen and jute textiles, biophilic design, rounded shapes, warm minimalism 2025",
    image: "/images/organicomoderno.jpg",
    promptSuggestions: [
      "sofá con curvas orgánicas en tela boucle beige",
      "mesa de mármol travertino de forma irregular",
      "paredes de estuco liso en tono crema cálido",
      "plantas de gran tamaño como elemento escultórico",
    ],
  },
  {
    id: "neo-deco",
    name: "Neo Deco",
    category: "Tendencias 2025-2026",
    description: "Art Déco contemporáneo, arcos y geometría",
    promptBoost:
      "neo deco interior 2026, fan arch headboard or window element, subtle metallic accents bronze or matte gold, sculptural clean lines, geometric mirror or console, pinterest direction",
    image: "https://hips.hearstapps.com/hmg-prod/images/oscar-lucien-recibidor-1619269914.jpg",
    promptSuggestions: [
      "arco de abanico en cabecero, ventana o espejo",
      "acentos metálicos sutiles en bronce o dorado mate",
      "geometría limpia en consola o aparador de diseño",
      "espejo de forma geométrica escultórica en entrada",
    ],
  },
  {
    id: "modern-heritage",
    name: "Modern Heritage",
    category: "Tendencias 2025-2026",
    description: "Arquitectura clásica con paleta actual",
    promptBoost:
      "modern heritage interior 2026, classical architectural details moldings and paneling with updated contemporary palette, current materials on historic bones, craft nostalgia with freshness",
    image: "https://media.admagazine.com/photos/63d9a55be36bb9adbc3300f2/master/w_1920,c_limit/16450221089_8673.jpg",
    promptSuggestions: [
      "molduras tradicionales pintadas en color contemporáneo",
      "mobiliario actual sobre suelo histórico restaurado",
      "carpintería clásica con accesorios modernos en latón",
      "artesanía local enmarcada en contexto mínimal",
    ],
  },
  {
    id: "hollywood-cottage",
    name: "Hollywood Cottage",
    category: "Tendencias 2025-2026",
    description: "Encanto cottage + glamour Hollywood",
    promptBoost:
      "hollywood cottage interior 2026, velvet sofa with layered cushions mixing casual and glamorous, small chandelier over rustic wood table, fresh flowers statement art, warm neutrals jewel accents",
    image: "https://static.bainet.es/clip/6b2342bc-2f49-49a5-ba31-3bfaa41cd393_16-9-aspect-ratio_1600w_0.webp",
    promptSuggestions: [
      "sofá de terciopelo acogedor con cojines de diferentes texturas",
      "lámpara de araña pequeña sobre mesa de madera rústica",
      "flores frescas abundantes y arte de gran declaración",
      "mezcla de elementos casuales y glamurosos",
    ],
  },
  {
    id: "calma-curada",
    name: "Calma Curada",
    category: "Tendencias 2025-2026",
    description: "Silenciosamente expresivo, materiales honestos",
    promptBoost:
      "curated calm interior 2026 dezeen, quietly expressive handmade objects personal meaning, tactile honest materials, resists extravagance, longevity over trend, machines vs meaning",
    image: "https://content.revistainteriores.es/medio/2025/01/03/tu-casa-te-invita-a-una-vida-mas-lenta-sin-prisas-y-en-calma_a52d67bf_250103101928_1280x794.webp",
    promptSuggestions: [
      "un objeto artesanal de calidad excepcional como foco visual",
      "texturas táctiles en todas las superficies: lana, barro, madera",
      "nada superfluo, cada objeto cuenta una historia personal",
      "materiales honestos sin verniz que oculte su naturaleza",
    ],
  },
  {
    id: "diseno-sensorial",
    name: "Diseño Sensorial",
    category: "Tendencias 2025-2026",
    description: "Para todos los sentidos, 2025-2026",
    promptBoost:
      "sensory emotional design interior 2025, integrated scent diffuser as design object, varied tactile textures velvet rough smooth in same room, circadian lighting, wellbeing all senses",
    image: "https://rocasa.as/wp-content/uploads/2025/05/Interiorismo-sensorial-y-la-eleccion-de-materiales-ROCASA-768x512.jpg",
    promptSuggestions: [
      "difusor de fragancia integrado como pieza de diseño",
      "texturas muy variadas: terciopelo, rugoso y liso en la misma estancia",
      "iluminación circadiana que cambia temperatura de color con el día",
      "plantas con propiedades sensoriales: aroma, tacto y color",
    ],
  },
]

// ── Backward compat: empty STYLE_MIXES so old imports don't break at build time ─
export const STYLE_MIXES: never[] = []
