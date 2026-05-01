import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { CycleCard } from "@/components/CycleCard";
import { CycleSkeleton } from "@/components/CycleSkeleton";
import { cycles } from "@/data/cycles";
import { useMockLoad } from "@/hooks/useMockLoad";
import { toast } from "sonner";

export default function Rent() {
  const [filter, setFilter] = useState<"All" | "Urban" | "Performance" | "Cargo">("All");
  const [q, setQ] = useState("");
  const loading = useMockLoad(700);
  const nav = useNavigate();

  const filtered = cycles.filter(c =>
    (filter === "All" || c.category === filter) &&
    c.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-24 md:pb-12">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Discover</p>
          <h1 className="mt-2 font-display text-4xl">Find & Rent</h1>
          <p className="mt-2 text-sm text-muted-foreground">{filtered.length} cycles within your 50 km radius</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass flex items-center gap-2 px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search cycles…" className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-48" />
          </div>
          <button className="glass flex h-10 w-10 items-center justify-center hover:border-primary/40">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {(["All", "Urban", "Performance", "Cargo"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
              filter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CycleSkeleton key={i} />)
          : filtered.map(c => (
              <CycleCard
                key={c.id}
                cycle={c}
                variant="user"
                onUnlock={() => {
                  toast.success(`${c.name} unlocked. Ride started.`);
                  nav("/ride");
                }}
              />
            ))}
      </div>
    </div>
  );
}
