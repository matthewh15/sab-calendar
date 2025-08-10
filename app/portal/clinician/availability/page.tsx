"use client";
import { useState } from "react";

export default function AvailabilityEditor() {
  const [weekday, setWeekday] = useState(1);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");

  const save = async () => {
    // Minimal demo: create a WEEKLY rule via API (you can extend with full CRUD later)
    const res = await fetch("/api/availability/" + "save", { method: "POST", body: JSON.stringify({ weekday, start, end }) });
    alert(res.ok ? "Saved" : "Error");
  };

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Weekly Availability</h1>
      <div className="grid grid-cols-3 gap-3">
        <select className="border p-2 rounded" value={weekday} onChange={e=>setWeekday(Number(e.target.value))}>
          {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((d, i) => (
            <option key={i} value={i}>{d}</option>
          ))}
        </select>
        <input className="border p-2 rounded" value={start} onChange={e=>setStart(e.target.value)} />
        <input className="border p-2 rounded" value={end} onChange={e=>setEnd(e.target.value)} />
      </div>
      <button onClick={save} className="px-4 py-2 rounded bg-black text-white">Save</button>
    </main>
  );
}