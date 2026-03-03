export default function HistoryLoading() {
  return (
    <div className="p-6 md:p-10">
      {/* Header skeleton */}
      <div className="mb-10">
        <div className="h-3 w-20 bg-muted animate-pulse mb-3 rounded-none" />
        <div className="h-10 w-52 bg-muted animate-pulse rounded-none" />
      </div>

      {/* Masonry skeleton — imita el layout columns-2 md:columns-3 */}
      <div className="columns-2 md:columns-3 gap-3">
        {[
          "aspect-[4/5]",
          "aspect-[4/3]",
          "aspect-[4/3]",
          "aspect-[3/4]",
          "aspect-[4/3]",
          "aspect-[4/3]",
        ].map((aspect, i) => (
          <div key={i} className="break-inside-avoid mb-3">
            <div className={`${aspect} bg-muted animate-pulse`} />
            <div className="pt-2 pb-1 space-y-1.5">
              <div className="h-3.5 w-24 bg-muted animate-pulse" />
              <div className="h-3 w-16 bg-muted animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
