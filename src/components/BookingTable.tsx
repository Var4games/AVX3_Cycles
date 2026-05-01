import { StatusBadge } from "./StatusBadge";
import { bookings } from "@/data/cycles";

export const BookingTable = ({ data = bookings }: { data?: typeof bookings }) => (
  <div className="glass overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="border-b border-border">
          {["ID", "User", "Cycle", "Start", "Duration", "Distance", "Revenue", "Status"].map(h => (
            <th key={h} className="px-6 py-4 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(b => (
          <tr key={b.id} className="border-b border-border/50 transition-colors hover:bg-card/40">
            <td className="px-6 py-4 font-mono text-xs text-primary">{b.id}</td>
            <td className="px-6 py-4 text-sm">{b.user}</td>
            <td className="px-6 py-4 text-sm text-muted-foreground">{b.cycle}</td>
            <td className="px-6 py-4 font-mono text-xs">{b.start}</td>
            <td className="px-6 py-4 font-mono text-xs">{b.duration}</td>
            <td className="px-6 py-4 font-mono text-xs">{b.distance}</td>
            <td className="px-6 py-4 font-mono text-sm text-foreground">{b.revenue}</td>
            <td className="px-6 py-4"><StatusBadge status={b.status as any} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
