const STATS = [
  { value: "6", label: "Estilos de diseño" },
  { value: "~30s", label: "Por generación" },
  { value: "IA", label: "Powered by Replicate" },
  { value: "Free", label: "Para empezar" },
]

export function StatsSection() {
  return (
    <section className="border-y border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-6 md:px-10 py-10 text-center ${
              i < STATS.length - 1 ? "border-r border-border" : ""
            }`}
          >
            <p className="font-serif italic text-4xl md:text-5xl font-bold text-foreground mb-1">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
