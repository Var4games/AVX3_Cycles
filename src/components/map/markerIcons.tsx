import L from "leaflet";

export function zoneIcon(cycles: number, isNearest = false) {
  return L.divIcon({
    className: "",
    html: `<div class="avx-marker ${isNearest ? "is-nearest" : ""}">${cycles}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export const userIcon = L.divIcon({
  className: "",
  html: `<div class="avx-user-marker"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});