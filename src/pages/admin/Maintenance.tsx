import { Wrench, AlertTriangle, Clock } from "lucide-react";
import { cycles } from "@/data/cycles";
import { StatusBadge } from "@/components/StatusBadge";

const issues = [
  { id: "M-021", cycle: "AVX3 Commuter Lite", issue: "Brake pad replacement", since: "2d 4h", priority: "high" },
  { id: "M-020", cycle: "AVX3 Aero Carbon", issue: "Battery diagnostic", since: "8h", priority: "med" },
  { id: "M-019", cycle: "AVX3 Cargo Pro", issue: "Tire pressure recalibration", since: "1d", priority: "low" },
  { id: "M-018", cycle: "AVX3 Trail S", issue: "Firmware update v2.4", since: "3h", priority: "low" },
];

const priorityColor = { high: "text-destructive", med: "text-warning", low: "text-muted-foreground" } as const;

export default function Maintenance() {
  const inMaint = cycles.filter(c => c.status === "Maintenance");
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Service</p>
      <h1 className="mt-2 font-display text-4xl">Maintenance</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="glass p-6">
          <Wrench className="h-5 w-5 text-primary" />
          <p className="mt-4 font-display text-3xl">{issues.length}</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Open Tickets</p>
        </div>
        <div className="glass p-6">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <p className="mt-4 font-display text-3xl">1</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">High Priority</p>
        </div>
        <div className="glass p-6">
          <Clock className="h-5 w-5 text-warning" />
          <p className="mt-4 font-display text-3xl">14<span className="text-base text-muted-foreground">h</span></p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Avg. Resolution</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl">Service Queue</h2>
          <div className="glass mt-4 divide-y divide-border">
            {issues.map(i => (
              <div key={i.id} className="flex items-center gap-4 p-5">
                <div className={`h-10 w-1 ${i.priority === "high" ? "bg-destructive" : i.priority === "med" ? "bg-warning" : "bg-muted-foreground"}`} />
                <div className="flex-1">
                  <p className="font-mono text-xs text-primary">{i.id}</p>
                  <p className="mt-1 text-sm">{i.cycle}</p>
                  <p className="text-xs text-muted-foreground">{i.issue}</p>
                </div>
                <div className="text-right">
                  <p className={`font-mono text-[10px] uppercase tracking-wider ${priorityColor[i.priority as keyof typeof priorityColor]}`}>{i.priority}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{i.since}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-xl">Units in Bay</h2>
          <div className="mt-4 space-y-3">
            {inMaint.length === 0 && <p className="glass p-6 text-sm text-muted-foreground">No units currently in service bay.</p>}
            {inMaint.map(c => (
              <div key={c.id} className="glass flex items-center justify-between p-5">
                <div>
                  <p className="font-display">{c.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{c.ref} · {c.location}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
