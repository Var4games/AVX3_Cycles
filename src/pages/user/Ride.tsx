import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Battery, Lock, Zap, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { toast } from "sonner";

export default function Ride() {
  const [seconds, setSeconds] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  const distance = (seconds * 0.0042).toFixed(2);
  const cost = (1 + seconds * 0.0033).toFixed(2);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-24 md:pb-12">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" /> Ride active · AVX3 Urban E1
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MapPlaceholder height="h-[460px]" />
        </div>
        <div className="space-y-6">
          <div className="glass relative overflow-hidden p-8 text-center scan-line">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Elapsed</p>
            <p className="mt-3 font-display text-7xl tabular-nums glow-text text-primary">{m}:{s}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{distance} km · €{cost}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="glass p-4 text-center">
              <Battery className="mx-auto h-4 w-4 text-success" />
              <p className="mt-2 font-display text-lg">87%</p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Battery</p>
            </div>
            <div className="glass p-4 text-center">
              <Zap className="mx-auto h-4 w-4 text-primary" />
              <p className="mt-2 font-display text-lg">22</p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">km/h</p>
            </div>
            <div className="glass p-4 text-center">
              <Navigation className="mx-auto h-4 w-4 text-accent" />
              <p className="mt-2 font-display text-lg">NE</p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Heading</p>
            </div>
          </div>

          <Button
            variant="destructive"
            size="lg"
            className="w-full font-mono text-xs uppercase tracking-[0.2em]"
            onClick={() => { toast.success(`Ride ended · ${distance} km · €${cost}`); nav("/profile"); }}
          >
            <Lock className="mr-2 h-4 w-4" /> End Ride
          </Button>
        </div>
      </div>
    </div>
  );
}
