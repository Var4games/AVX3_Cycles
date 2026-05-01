import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Leaf } from "lucide-react";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { CycleCard } from "@/components/CycleCard";
import { Button } from "@/components/ui/button";
import { cycles } from "@/data/cycles";

export default function Home() {
  const nearby = cycles.filter(c => c.status === "Available").slice(0, 3);
  return (
    <div className="pb-24 md:pb-12">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.15),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" /> Live in Munich · 50 km radius
              </span>
              <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
                Smart Cycle<br />Rentals in <span className="text-primary glow-text">Your City</span>
              </h1>
              <p className="mt-6 max-w-md text-base text-muted-foreground">
                Unlock any AVX3 in seconds. Ride electric, ride urban, ride performance — across a network of hubs within a 50 km radius.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="font-mono text-xs uppercase tracking-[0.2em]">
                  <Link to="/rent">Find a Cycle <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-mono text-xs uppercase tracking-[0.2em] border-border">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[{ k: "128", l: "Cycles" }, { k: "4", l: "Hubs" }, { k: "50km", l: "Radius" }].map(s => (
                  <div key={s.l}>
                    <p className="font-display text-3xl">{s.k}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-in">
              <MapPlaceholder height="h-[520px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Zap, title: "Instant Unlock", desc: "Tap, scan, ride. Every AVX3 unlocks in under 3 seconds." },
            { icon: Shield, title: "Insured Rides", desc: "Every plan includes liability coverage and 24/7 support." },
            { icon: Leaf, title: "Zero Emissions", desc: "Electric and pedal-power. Fully renewable hub energy." },
          ].map(f => (
            <div key={f.title} className="glass glass-hover p-8">
              <f.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Nearby</p>
            <h2 className="mt-2 font-display text-3xl">Cycles around you</h2>
          </div>
          <Link to="/rent" className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nearby.map(c => <CycleCard key={c.id} cycle={c} variant="user" />)}
        </div>
      </section>
    </div>
  );
}
