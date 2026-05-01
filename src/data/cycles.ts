export type CycleStatus = "Available" | "Reserved" | "Maintenance" | "In Transit";
export type CycleCategory = "Urban" | "Performance" | "Cargo" | "Electric Assist";

export interface Cycle {
  id: string;
  name: string;
  ref: string;
  category: CycleCategory;
  status: CycleStatus;
  range: number; // km
  weight: number; // kg
  battery: number; // %
  location: string;
  distance: number; // km from user
  motor?: string;
  frame?: string;
  tires?: string;
}

export const cycles: Cycle[] = [
  { id: "c1", name: "AVX3 Urban E1", ref: "AVX-2940-U", category: "Urban", status: "Available", range: 65, weight: 18.4, battery: 92, location: "Marienplatz Hub", distance: 0.4, motor: "250W Hub", frame: "Aluminum 6061" },
  { id: "c2", name: "AVX3 Velocity X", ref: "AVX-8812-P", category: "Performance", status: "Available", range: 80, weight: 14.2, battery: 78, location: "Hauptbahnhof", distance: 1.1, motor: "350W Mid", frame: "T-800 Carbon" },
  { id: "c3", name: "AVX3 Cargo Pro", ref: "AVX-1102-C", category: "Cargo", status: "Reserved", range: 55, weight: 26.8, battery: 64, location: "Schwabing Dock", distance: 2.3, motor: "500W Mid", frame: "Steel CrMo" },
  { id: "c4", name: "AVX3 Trail S", ref: "AVX-4471-E", category: "Electric Assist", status: "Available", range: 90, weight: 22.1, battery: 88, location: "English Garden", distance: 3.0, motor: "250W Hub", frame: "Alloy 7005" },
  { id: "c5", name: "AVX3 Commuter Lite", ref: "AVX-7720-U", category: "Urban", status: "Maintenance", range: 45, weight: 16.0, battery: 12, location: "Service Bay 02", distance: 0, motor: "200W Hub", frame: "Aluminum" },
  { id: "c6", name: "AVX3 Aero Carbon", ref: "AVX-3318-P", category: "Performance", status: "Available", range: 110, weight: 12.6, battery: 95, location: "Olympia Park", distance: 4.2, motor: "350W Mid", frame: "T-1000 Carbon" },
  { id: "c7", name: "AVX3 City Glide", ref: "AVX-5590-U", category: "Urban", status: "In Transit", range: 60, weight: 17.5, battery: 71, location: "Route → Sendling", distance: 1.8, motor: "250W Hub", frame: "Aluminum" },
  { id: "c8", name: "AVX3 Cargo Max", ref: "AVX-9001-C", category: "Cargo", status: "Available", range: 50, weight: 28.4, battery: 83, location: "Westend Hub", distance: 2.9, motor: "500W Mid", frame: "Steel" },
];

export const stats = {
  totalVehicles: 128,
  activeRides: 34,
  revenueToday: 657,
  utilization: 67,
  maintenance: 6,
  hubs: 4,
};

export const bookings = [
  { id: "BK-2401", user: "Lena Vogt", cycle: "AVX3 Urban E1", start: "08:14", duration: "42m", distance: "6.2 km", status: "Active", revenue: "₹10.50" },
  { id: "BK-2400", user: "Markus Bauer", cycle: "AVX3 Velocity X", start: "07:58", duration: "1h 12m", distance: "14.3 km", status: "Active", revenue: "₹12" },
  { id: "BK-2399", user: "Sara Klein", cycle: "AVX3 Aero Carbon", start: "07:30", duration: "28m", distance: "4.8 km", status: "Completed", revenue: "₹9" },
  { id: "BK-2398", user: "Tobias Reich", cycle: "AVX3 Cargo Pro", start: "07:12", duration: "1h 45m", distance: "18.1 km", status: "Completed", revenue: "₹12" },
  { id: "BK-2397", user: "Mira Hoffmann", cycle: "AVX3 City Glide", start: "06:55", duration: "33m", distance: "5.1 km", status: "Completed", revenue: "₹10" },
  { id: "BK-2396", user: "Jonas Weber", cycle: "AVX3 Trail S", start: "06:20", duration: "2h 04m", distance: "26.7 km", status: "Completed", revenue: "₹12" },
];

export const rideHistory = [
  { id: "R-118", date: "Apr 28", cycle: "AVX3 Urban E1", distance: "7.2 km", duration: "31m", cost: "₹8" },
  { id: "R-117", date: "Apr 25", cycle: "AVX3 Velocity X", distance: "12.4 km", duration: "48m", cost: "₹12" },
  { id: "R-116", date: "Apr 22", cycle: "AVX3 City Glide", distance: "4.1 km", duration: "18m", cost: "₹5" },
  { id: "R-115", date: "Apr 20", cycle: "AVX3 Aero Carbon", distance: "21.8 km", duration: "1h 12m", cost: "₹12" },
];

export const pricingPlans = [
  { name: "Per Minute", price: "₹0.25", unit: "/ minute", desc: "Pay only for what you ride. No commitment.", features: ["Unlock fee ₹2", "Available 24/7", "Any AVX3 unit"], featured: false },
  { name: "Hourly", price: "₹12", unit: "/ hour", desc: "Best for errands and short trips.", features: ["No unlock fee", "Pause up to 10 min", "Includes helmet"], featured: true },
  { name: "Day Pass", price: "₹250", unit: "/ day", desc: "Explore the whole city, your way.", features: ["Unlimited rides", "Performance units included", "Insurance bundled"], featured: false },
];
