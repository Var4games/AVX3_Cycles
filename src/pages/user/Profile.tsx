import { Settings, CreditCard, MapPin } from "lucide-react";
import { rideHistory } from "@/data/cycles";

export default function Profile() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-24 md:pb-12">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass p-8">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center border border-primary/40 bg-primary/10">
              <span className="font-display text-2xl text-primary">LV</span>
            </div>
            <div>
              <h2 className="font-display text-2xl">Lena Vogt</h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Member since Mar 2024</p>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm">
            <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Munich, DE</p>
            <p className="flex items-center gap-2 text-muted-foreground"><CreditCard className="h-3.5 w-3.5" /> Visa •••• 4291</p>
            <p className="flex items-center gap-2 text-muted-foreground"><Settings className="h-3.5 w-3.5" /> Day Pass active</p>
          </div>
        </div>

        <div className="glass p-8 lg:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Lifetime</p>
          <div className="mt-4 grid grid-cols-3 gap-6">
            <div><p className="font-display text-4xl">42</p><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Rides</p></div>
            <div><p className="font-display text-4xl">218<span className="text-base text-muted-foreground"> km</span></p><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Distance</p></div>
            <div><p className="font-display text-4xl text-primary glow-text">14.2<span className="text-base text-muted-foreground"> kg</span></p><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">CO₂ Saved</p></div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-xl">Ride History</h3>
        <div className="glass mt-4 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["ID", "Date", "Cycle", "Distance", "Duration", "Cost"].map(h => (
                  <th key={h} className="px-6 py-4 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rideHistory.map(r => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-card/40">
                  <td className="px-6 py-4 font-mono text-xs text-primary">{r.id}</td>
                  <td className="px-6 py-4 text-sm">{r.date}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{r.cycle}</td>
                  <td className="px-6 py-4 font-mono text-xs">{r.distance}</td>
                  <td className="px-6 py-4 font-mono text-xs">{r.duration}</td>
                  <td className="px-6 py-4 font-mono text-sm">{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
