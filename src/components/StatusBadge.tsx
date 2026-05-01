import { cn } from "@/lib/utils";
import type { CycleStatus } from "@/data/cycles";

const styles: Record<string, { dot: string; text: string }> = {
  Available:    { dot: "bg-success", text: "text-success" },
  Reserved:     { dot: "bg-warning", text: "text-warning" },
  Maintenance:  { dot: "bg-destructive", text: "text-destructive" },
  "In Transit": { dot: "bg-primary", text: "text-primary" },
  Active:       { dot: "bg-primary", text: "text-primary" },
  Completed:    { dot: "bg-muted-foreground", text: "text-muted-foreground" },
};

interface Props {
  status: CycleStatus | "Active" | "Completed";
  className?: string;
}

export const StatusBadge = ({ status, className }: Props) => {
  const s = styles[status] ?? styles.Available;
  return (
    <span className={cn("inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em]", s.text, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full pulse-dot", s.dot)} />
      {status}
    </span>
  );
};
