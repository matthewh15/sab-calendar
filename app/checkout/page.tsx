"use client";
import Button from "@/components/Button";

export default function Checkout() {
  const pay = async () => {
    const res = await fetch("/api/stripe/create-checkout-session", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Service Animal Evaluations (ESA/PSD)</h1>
      <p>Pay first to receive a unique booking link. 30-minute session. EN/ES.</p>
      <Button onClick={pay}>Pay & Get Booking Link</Button>
    </main>
  );
}