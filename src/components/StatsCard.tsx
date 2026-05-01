import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
  accent?: boolean;
}

export const StatsCard = ({ label, value, delta, icon: Icon, accent }: Props) => (
  <div className={cn("glass glass-hover relative p-6 animate-fade-in overflow-hidden", accent && "border-primary/30")}>
    {accent && <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.15),transparent_50%)]" />}
    <div className="relative flex items-start justify-between">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        <p className={cn("mt-3 font-display text-4xl", accent && "glow-text text-primary")}>{value}</p>
        {delta && <p className="mt-2 font-mono text-xs text-success">{delta}</p>}
      </div>
      <div className="rounded-sm border border-border p-2">
        <Icon className="h-4 w-4 text-primary" />
      </div>
    </div>
  </div>
);
