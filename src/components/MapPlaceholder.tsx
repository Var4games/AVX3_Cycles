import { MapPin, Navigation, Plus, Minus } from "lucide-react";

interface Pin { x: number; y: number; label?: string; status?: "available" | "reserved" | "maintenance"; }

const colorMap = {
  available: "bg-success",
  reserved: "bg-warning",
  maintenance: "bg-destructive",
};

export const MapPlaceholder = ({ pins = [], height = "h-[480px]" }: { pins?: Pin[]; height?: string }) => {
  const defaultPins: Pin[] = pins.length ? pins : [
    { x: 22, y: 38, status: "available" },
    { x: 48, y: 30, status: "available" },
    { x: 65, y: 55, status: "reserved" },
    { x: 35, y: 70, status: "available" },
    { x: 80, y: 42, status: "maintenance" },
    { x: 55, y: 78, status: "available" },
  ];

  return (
    <div className={`glass relative ${height} w-full overflow-hidden`}>
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.08),transparent_60%)]" />

      {/* fake roads */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <path d="M 0 200 Q 200 180 400 220 T 800 200" stroke="hsl(var(--border))" strokeWidth="2" fill="none" />
        <path d="M 200 0 Q 220 200 180 400 T 220 800" stroke="hsl(var(--border))" strokeWidth="2" fill="none" />
        <path d="M 0 380 L 800 340" stroke="hsl(var(--border))" strokeWidth="1" fill="none" strokeDasharray="4 8" />
      </svg>

      {defaultPins.map((p, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <div className="relative">
            <MapPin className={`h-6 w-6 fill-current ${p.status === "reserved" ? "text-warning" : p.status === "maintenance" ? "text-destructive" : "text-primary"}`} strokeWidth={1.5} />
            <div className={`absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full ${colorMap[p.status ?? "available"]} pulse-dot`} />
          </div>
        </div>
      ))}

      {/* You marker */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute inset-0 -m-4 rounded-full bg-primary/20 pulse-dot" />
          <div className="h-4 w-4 rounded-full border-2 border-background bg-primary" />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-1">
        <button className="glass flex h-9 w-9 items-center justify-center hover:border-primary/40"><Plus className="h-4 w-4" /></button>
        <button className="glass flex h-9 w-9 items-center justify-center hover:border-primary/40"><Minus className="h-4 w-4" /></button>
      </div>
      <button className="glass absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center hover:border-primary/40">
        <Navigation className="h-4 w-4 text-primary" />
      </button>

      <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        48.1351° N, 11.5820° E · Munich
      </div>
    </div>
  );
};
