"use client";
import { useEffect, useState } from "react";

export default function SlotPicker({ clinicianId, onSelect }: { clinicianId: string; onSelect: (s: { start: string; end: string }) => void }) {
  const [slots, setSlots] = useState<{ start: string; end: string }[]>([]);
  useEffect(() => {
    fetch(`/api/availability/${clinicianId}`).then(r => r.json()).then(d => setSlots(d.slots || []));
  }, [clinicianId]);
  return (
    <div className="grid grid-cols-2 gap-3">
      {slots.map((s) => (
        <button key={s.start} className="border rounded-lg p-2 hover:bg-[var(--bg)]" onClick={() => onSelect(s)}>
          {new Date(s.start).toLocaleString()}
        </button>
      ))}
    </div>
  );
}