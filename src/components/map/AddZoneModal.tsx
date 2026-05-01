import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Zone } from "@/data/zones";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSave: (data: { name: string; cycles: number }) => void;
  onDelete?: () => void;
  initial?: Partial<Zone> | null;
  coords?: { lat: number; lng: number } | null;
  mode: "create" | "edit";
}

export function AddZoneModal({ open, onOpenChange, onSave, onDelete, initial, coords, mode }: Props) {
  const [name, setName] = useState("");
  const [cycles, setCycles] = useState("5");

  useEffect(() => {
    if (open) {
      setName(initial?.name ?? "");
      setCycles(String(initial?.cycles ?? 5));
    }
  }, [open, initial]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const n = Math.max(0, parseInt(cycles, 10) || 0);
    onSave({ name: name.trim(), cycles: n });
  };

  const lat = coords?.lat ?? initial?.lat;
  const lng = coords?.lng ?? initial?.lng;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border">
        <DialogHeader>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {mode === "create" ? "New Parking Zone" : "Edit Parking Zone"}
          </p>
          <DialogTitle className="font-display text-2xl">
            {mode === "create" ? "Place a zone" : initial?.name}
          </DialogTitle>
          <DialogDescription className="font-mono text-[11px]">
            {lat != null && lng != null ? `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E` : "Select a point on the map"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="zone-name" className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Zone name</Label>
            <Input id="zone-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Kanhangad Bus Stand" autoFocus />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zone-cycles" className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Available cycles</Label>
            <Input id="zone-cycles" type="number" min={0} value={cycles} onChange={e => setCycles(e.target.value)} />
          </div>

          <DialogFooter className="flex-row justify-between sm:justify-between">
            {mode === "edit" && onDelete ? (
              <Button type="button" variant="ghost" onClick={onDelete} className="font-mono text-[10px] uppercase tracking-[0.18em] text-destructive hover:text-destructive">
                Delete zone
              </Button>
            ) : <span />}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="font-mono text-[10px] uppercase tracking-[0.18em]">Cancel</Button>
              <Button type="submit" className="font-mono text-[10px] uppercase tracking-[0.18em]">{mode === "create" ? "Save zone" : "Update"}</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}