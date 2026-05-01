import { NavLink, Outlet, Link } from "react-router-dom";
import { Bike, MapPin, Tag, User, Activity, Shield, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home", icon: MapPin, end: true },
  { to: "/rent", label: "Find & Rent", icon: Bike },
  { to: "/map", label: "Zones", icon: MapIcon },
  { to: "/ride", label: "Ride", icon: Activity },
  { to: "/pricing", label: "Pricing", icon: Tag },
  { to: "/profile", label: "Profile", icon: User },
];

export default function UserLayout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center border border-primary/40 bg-primary/10">
              <span className="font-mono text-[10px] font-bold text-primary">A3</span>
            </div>
            <span className="font-display text-lg tracking-wide">AVX<span className="text-primary">3</span></span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) => cn(
                  "px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/admin" className="flex items-center gap-2 border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Shield className="h-3 w-3" /> Admin
          </Link>
        </div>
      </header>
      <main><Outlet /></main>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-around">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => cn("flex flex-1 flex-col items-center gap-1 py-3", isActive ? "text-primary" : "text-muted-foreground")}>
              <l.icon className="h-4 w-4" />
              <span className="font-mono text-[9px] uppercase tracking-wider">{l.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
