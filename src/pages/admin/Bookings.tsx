import { useState } from "react";
import { BookingTable } from "@/components/BookingTable";
import { bookings } from "@/data/cycles";
import { cn } from "@/lib/utils";

export default function Bookings() {
  const [tab, setTab] = useState<"All" | "Active" | "Completed">("All");
  const data = bookings.filter(b => tab === "All" || b.status === tab);
  const counts = {
    All: bookings.length,
    Active: bookings.filter(b => b.status === "Active").length,
    Completed: bookings.filter(b => b.status === "Completed").length,
  };
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Operations</p>
      <h1 className="mt-2 font-display text-4xl">Bookings</h1>

      <div className="mt-6 flex gap-1 border-b border-border">
        {(["All", "Active", "Completed"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] -mb-px border-b-2 transition-colors",
              tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>
            {t} <span className="ml-2 text-muted-foreground">{counts[t]}</span>
          </button>
        ))}
      </div>
      <div className="mt-6"><BookingTable data={data} /></div>
    </div>
  );
}
