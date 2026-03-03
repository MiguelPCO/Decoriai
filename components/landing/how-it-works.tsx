import { Upload, Palette, Sparkles } from "lucide-react"

const STEPS = [
  {
    number: "01",
    icon: Upload,
    title: "Sube una foto",
    description:
      "Haz una foto con el móvil o sube una imagen desde tu ordenador. Cualquier ángulo, cualquier habitación.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Elige tu estilo",
    description:
      "Selecciona entre 6 estilos: Minimalista, Nórdico, Industrial, Mediterráneo, Japandi o Clásico.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Obtén el resultado",
    description:
      "La IA genera la versión rediseñada en segundos. Compárala con el original y descárgala.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header — alineado a la izquierda, editorial */}
        <div className="grid md:grid-cols-[1fr_auto] items-end gap-8 mb-16 md:mb-20">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-warm mb-4 block">
              Simple y rápido
            </span>
            <h2 className="font-serif italic text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Tres pasos.
              <br />
              Resultado instantáneo.
            </h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs md:text-right">
            No necesitas experiencia en diseño ni software especializado. Solo
            una foto y tus ganas de transformar el espacio.
          </p>
        </div>

        {/* Steps — números editoriales grandes */}
        <div className="grid md:grid-cols-3 gap-0 border border-border divide-y md:divide-y-0 md:divide-x divide-border">
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="p-8 md:p-10 bg-white">
                {/* Number grande — muy editorial */}
                <span className="font-serif italic text-8xl font-bold text-warm/15 leading-none block mb-6 -ml-1">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center border border-border mb-5 bg-background">
                  <Icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <h3 className="font-semibold text-base text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
