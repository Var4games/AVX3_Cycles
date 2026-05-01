import { Battery, MapPin, Bike } from "lucide-react";
import type { Cycle } from "@/data/cycles";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";

interface Props {
  cycle: Cycle;
  variant?: "user" | "admin";
  onUnlock?: () => void;
}

export const CycleCard = ({ cycle, variant = "admin", onUnlock }: Props) => {
  return (
    <div className="glass glass-hover group relative overflow-hidden p-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <span className="border border-border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          {cycle.category}
        </span>
        <StatusBadge status={cycle.status} />
      </div>

      <div className="relative my-8 flex h-40 items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.12),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <Bike className="h-24 w-24 text-muted-foreground/40 transition-all duration-500 group-hover:text-primary group-hover:scale-110" strokeWidth={1} />
      </div>

      <div>
        <h3 className="font-display text-xl text-foreground">{cycle.name}</h3>
        <p className="mt-1 font-mono text-xs text-muted-foreground">Ref: {cycle.ref}</p>
      </div>

      <div className="my-5 h-px bg-border" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Range</p>
          <p className="mt-1 font-display text-base">{cycle.range}km</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Weight</p>
          <p className="mt-1 font-display text-base">{cycle.weight}kg</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1"><Battery className="h-3 w-3" />Battery</p>
          <p className="mt-1 font-display text-base">{cycle.battery}%</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />Loc</p>
          <p className="mt-1 truncate font-display text-base">{cycle.location}</p>
        </div>
      </div>

      {variant === "user" && (
        <Button
          variant="default"
          className="mt-6 w-full font-mono text-xs uppercase tracking-[0.18em]"
          disabled={cycle.status !== "Available"}
          onClick={onUnlock}
        >
          {cycle.status === "Available" ? "Unlock" : cycle.status}
        </Button>
      )}
    </div>
  );
};
