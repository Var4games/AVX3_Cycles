import { useState } from "react";
import { LayoutGrid, Table as TableIcon } from "lucide-react";
import { CycleCard } from "@/components/CycleCard";
import { CycleSkeleton } from "@/components/CycleSkeleton";
import { StatusBadge } from "@/components/StatusBadge";
import { cycles, type CycleCategory } from "@/data/cycles";
import { useMockLoad } from "@/hooks/useMockLoad";
import { cn } from "@/lib/utils";

const categories: ("All" | CycleCategory)[] = ["All", "Urban", "Performance", "Cargo", "Electric Assist"];

export default function Inventory() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [filter, setFilter] = useState<"All" | CycleCategory>("All");
  const [availability, setAvailability] = useState<"All" | "Available" | "Reserved" | "Maintenance">("All");
  const loading = useMockLoad(600);

  const list = cycles.filter(c =>
    (filter === "All" || c.category === filter) &&
    (availability === "All" || c.status === availability)
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
      {/* Sidebar filters */}
      <aside>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Fleet Filters</p>
        <div className="mt-4 space-y-2">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={cn("flex w-full items-center justify-between py-2 text-left text-sm transition-colors",
                filter === c ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
              {c === "All" ? "All Units" : c}
              <span className={cn("h-3 w-3 border", filter === c ? "border-primary bg-primary" : "border-border")} />
            </button>
          ))}
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Availability</p>
        <div className="mt-4 space-y-2">
          {(["Available", "Reserved", "Maintenance"] as const).map(s => (
            <button key={s} onClick={() => setAvailability(availability === s ? "All" : s)}
              className={cn("flex w-full items-center justify-between py-2 text-left text-sm",
                availability === s ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
              {s}
              <span className={cn("h-3 w-3 border", availability === s ? "border-primary bg-primary" : "border-border")} />
            </button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl">Current Inventory</h1>
            <p className="mt-2 text-sm text-muted-foreground">{list.length} of {cycles.length} units across 4 locations</p>
          </div>
          <div className="flex border border-border">
            <button onClick={() => setView("grid")} className={cn("flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em]",
              view === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground")}>
              <LayoutGrid className="h-3 w-3" /> Grid
            </button>
            <button onClick={() => setView("table")} className={cn("flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] border-l border-border",
              view === "table" ? "bg-secondary text-foreground" : "text-muted-foreground")}>
              <TableIcon className="h-3 w-3" /> Table
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <CycleSkeleton key={i} />)
              : list.map(c => <CycleCard key={c.id} cycle={c} />)}
          </div>
        ) : (
          <div className="glass mt-8 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Ref", "Name", "Category", "Range", "Battery", "Location", "Status"].map(h => (
                    <th key={h} className="px-6 py-4 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map(c => (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-card/40">
                    <td className="px-6 py-4 font-mono text-xs text-primary">{c.ref}</td>
                    <td className="px-6 py-4 text-sm">{c.name}</td>
                    <td className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{c.category}</td>
                    <td className="px-6 py-4 font-mono text-xs">{c.range} km</td>
                    <td className="px-6 py-4 font-mono text-xs">{c.battery}%</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{c.location}</td>
                    <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
