"use client";
import { useState } from "react";
import SlotPicker from "@/components/SlotPicker";
import Button from "@/components/Button";

export default function Book({ params }: { params: { token: string } }) {
  const [clinicianId, setClinicianId] = useState("");
  const [slot, setSlot] = useState<{ start: string; end: string } | null>(null);
  const [client, setClient] = useState({ name: "", email: "", phone: "", state: "", animalType: "Dog", language: "en" });

  const submit = async () => {
    if (!slot || !clinicianId) return alert("Pick a clinician and slot");
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: params.token, clinicianId, startISO: slot.start, endISO: slot.end, client }),
    });
    const data = await res.json();
    if (data.ok) alert("Booked!");
    else alert(data.error || "Error");
  };

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Book your session</h1>
      <div>
        <label className="block font-semibold mb-1">Choose Clinician (ID)</label>
        <input className="border p-2 rounded w-full" placeholder="clinicianId" value={clinicianId} onChange={e => setClinicianId(e.target.value)} />
      </div>
      <div className="space-y-2">
        <label className="block font-semibold">Pick a time</label>
        {clinicianId ? <SlotPicker clinicianId={clinicianId} onSelect={setSlot} /> : <p>Enter clinician ID to load slots.</p>}
        {slot && <p className="text-sm">Selected: {new Date(slot.start).toLocaleString()}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Full name" value={client.name} onChange={e=>setClient({ ...client, name: e.target.value })} />
        <input className="border p-2 rounded" placeholder="Email" value={client.email} onChange={e=>setClient({ ...client, email: e.target.value })} />
        <input className="border p-2 rounded" placeholder="Phone" value={client.phone} onChange={e=>setClient({ ...client, phone: e.target.value })} />
        <input className="border p-2 rounded" placeholder="State" value={client.state} onChange={e=>setClient({ ...client, state: e.target.value })} />
      </div>
      <div className="flex gap-3 items-center">
        <select className="border p-2 rounded" value={client.language} onChange={e=>setClient({ ...client, language: e.target.value })}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
        <Button onClick={submit}>Confirm Booking</Button>
      </div>
    </main>
  );
}