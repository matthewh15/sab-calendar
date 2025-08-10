import { NextRequest, NextResponse } from "next/server";
import { buildSlots } from "@/lib/availability";

export async function GET(_: NextRequest, { params }: { params: { clinicianId: string } }) {
  const from = new Date();
  const to = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  const slots = await buildSlots(params.clinicianId, from, to);
  return NextResponse.json({ slots });
}