export interface Zone {
  id: number;
  name: string;
  lat: number;
  lng: number;
  cycles: number;
}

export const KANHANGAD_CENTER: [number, number] = [12.3081, 75.1063];

export const initialZones: Zone[] = [
  { id: 1, name: "Kanhangad Bus Stand", lat: 12.3081, lng: 75.1063, cycles: 8 },
  { id: 2, name: "Kanhangad Railway Station", lat: 12.3119, lng: 75.0901, cycles: 6 },
  { id: 3, name: "Nileshwaram Town", lat: 12.2589, lng: 75.1335, cycles: 4 },
  { id: 4, name: "Bekal Fort", lat: 12.3919, lng: 75.0314, cycles: 7 },
  { id: 5, name: "Kasaragod Town", lat: 12.4996, lng: 74.9869, cycles: 5 },
  { id: 6, name: "Cheruvathur", lat: 12.2167, lng: 75.1500, cycles: 3 },
  { id: 7, name: "Hosdurg Beach", lat: 12.3050, lng: 75.0750, cycles: 6 },
  { id: 8, name: "Pallikere Beach", lat: 12.3833, lng: 75.0333, cycles: 4 },
  { id: 9, name: "Ajanur", lat: 12.3411, lng: 75.0853, cycles: 5 },
  { id: 10, name: "Padannakkad", lat: 12.2667, lng: 75.1167, cycles: 3 },
  { id: 11, name: "Kanhangad New Bus Stand", lat: 12.3175, lng: 75.0991, cycles: 9 },
  { id: 12, name: "Trikaripur", lat: 12.1583, lng: 75.1833, cycles: 4 },
];