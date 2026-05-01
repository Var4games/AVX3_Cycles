import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/data/cycles";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 pb-24 md:pb-16">
      <div className="text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Pricing</p>
        <h1 className="mt-3 font-display text-5xl">Pay how you ride</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Three transparent plans. No subscriptions. Cancel any ride, any time.</p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {pricingPlans.map(p => (
          <div key={p.name} className={cn("glass relative p-8 animate-fade-in", p.featured && "border-primary/50 shadow-glow")}>
            {p.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 border border-primary bg-background px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                Most Popular
              </span>
            )}
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{p.name}</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className={cn("font-display text-5xl", p.featured && "text-primary")}>{p.price}</span>
              <span className="font-mono text-xs text-muted-foreground">{p.unit}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{p.desc}</p>
            <div className="my-6 h-px bg-border" />
            <ul className="space-y-3">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full font-mono text-xs uppercase tracking-[0.2em]" variant={p.featured ? "default" : "outline"}>
              Choose {p.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
