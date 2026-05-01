export const CycleSkeleton = () => (
  <div className="glass p-6">
    <div className="flex justify-between">
      <div className="h-5 w-20 animate-pulse bg-muted" />
      <div className="h-5 w-16 animate-pulse bg-muted" />
    </div>
    <div className="my-8 h-40 animate-pulse bg-muted/40" />
    <div className="h-6 w-2/3 animate-pulse bg-muted" />
    <div className="mt-2 h-3 w-1/3 animate-pulse bg-muted" />
    <div className="my-5 h-px bg-border" />
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <div className="h-3 w-12 animate-pulse bg-muted" />
          <div className="mt-2 h-5 w-16 animate-pulse bg-muted" />
        </div>
      ))}
    </div>
  </div>
);
