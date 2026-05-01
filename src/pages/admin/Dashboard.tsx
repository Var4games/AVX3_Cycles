import { Bike, Activity, Wrench, Euro, MapPin, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { BookingTable } from "@/components/BookingTable";
import { stats, bookings } from "@/data/cycles";
import { MapPlaceholder } from "@/components/MapPlaceholder";

export default function Dashboard() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Overview</p>
          <h1 className="mt-2 font-display text-4xl">Fleet Operations</h1>
          <p className="mt-2 text-sm text-muted-foreground">Real-time signals across {stats.hubs} hubs · 50 km radius</p>
        </div>
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:block">
          <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot inline-block mr-2" />
          All systems nominal
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Vehicles" value={stats.totalVehicles} icon={Bike} accent />
        <StatsCard label="Active Rides" value={stats.activeRides} delta="+12% vs yesterday" icon={Activity} />
        <StatsCard label="Revenue Today" value={`€${stats.revenueToday.toLocaleString()}`} delta="+8.4%" icon={Euro} />
        <StatsCard label="Maintenance" value={stats.maintenance} icon={Wrench} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl">Live Activity</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Last 60 min</span>
          </div>
          <BookingTable data={bookings.slice(0, 5)} />
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl">Fleet Map</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary flex items-center gap-1"><MapPin className="h-3 w-3" /> {stats.hubs} hubs</span>
          </div>
          <MapPlaceholder height="h-[380px]" />
          <div className="glass mt-4 p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Utilization</p>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <p className="mt-2 font-display text-3xl">{stats.utilization}<span className="text-base text-muted-foreground">%</span></p>
            <div className="mt-3 h-1 w-full overflow-hidden bg-border">
              <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${stats.utilization}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
