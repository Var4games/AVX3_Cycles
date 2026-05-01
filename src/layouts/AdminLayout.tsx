import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Boxes, CalendarRange, Wrench, Map as MapIcon, Plus, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarRange },
  { to: "/admin/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/admin/map", label: "Map View", icon: MapIcon },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col border-r border-border bg-sidebar p-6 lg:flex">
        <Link to="/admin" className="mb-12 flex items-center gap-3">
          <Plus className="h-5 w-5 text-primary" strokeWidth={1.5} />
          <span className="font-display text-base tracking-[0.2em]">AVX3</span>
        </Link>

        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Workspace</p>
        <nav className="space-y-1">
          {items.map(i => (
            <NavLink
              key={i.to}
              to={i.to}
              end={i.end}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
                isActive ? "border-l-2 border-primary text-primary bg-sidebar-accent" : "border-l-2 border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <i.icon className="h-3.5 w-3.5" />
              {i.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <Link to="/" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-3 w-3" /> Exit to User
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border px-6 lg:px-10">
          <div className="flex items-center gap-3 lg:hidden">
            <Plus className="h-5 w-5 text-primary" />
            <span className="font-display tracking-[0.2em]">AVX3</span>
          </div>
          <nav className="hidden items-center gap-8 lg:flex">
            {items.slice(1).map(i => (
              <NavLink key={i.to} to={i.to} className={({ isActive }) => cn("font-mono text-[11px] uppercase tracking-[0.2em]", isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                {i.label.split(" ")[0]}
              </NavLink>
            ))}
          </nav>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Munich HQ <span className="text-border mx-2">/</span> <span className="text-foreground">Admin</span>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-10"><Outlet /></main>

        {/* Mobile nav */}
        <nav className="border-t border-border bg-sidebar lg:hidden">
          <div className="flex items-center justify-around">
            {items.map(i => (
              <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) => cn("flex flex-1 flex-col items-center gap-1 py-3", isActive ? "text-primary" : "text-muted-foreground")}>
                <i.icon className="h-4 w-4" />
                <span className="font-mono text-[9px] uppercase tracking-wider">{i.label.split(" ")[0]}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
