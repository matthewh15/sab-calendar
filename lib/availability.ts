import { addMinutes, formatISO, isBefore } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { prisma } from "./db";

export type Slot = { start: string; end: string };

export async function buildSlots(clinicianId: string, from: Date, to: Date): Promise<Slot[]> {
  const clinician = await prisma.clinicianProfile.findUnique({ where: { id: clinicianId } });
  if (!clinician) return [];
  const event = await prisma.eventType.findUnique({ where: { clinicianId } });
  const duration = event?.duration ?? 30;
  const buffer = event?.buffer ?? Number(process.env.DEFAULT_BUFFER_MIN ?? 0);
  const leadHours = Number(process.env.LEAD_TIME_HOURS ?? 12);

  // Very simple demo logic: generate slots on each day 9-17 based on weekly rules
  const slots: Slot[] = [];
  let d = new Date(from);
  while (d <= to) {
    const weekday = d.getDay();
    const rules = await prisma.availabilityRule.findMany({ where: { clinicianId, kind: "WEEKLY", weekday } });
    for (const r of rules) {
      if (!r.startTime || !r.endTime) continue;
      const [sh, sm] = r.startTime.split(":").map(Number);
      const [eh, em] = r.endTime.split(":").map(Number);
      const localStart = new Date(d);
      localStart.setHours(sh, sm ?? 0, 0, 0);
      const localEnd = new Date(d);
      localEnd.setHours(eh, em ?? 0, 0, 0);
      let cur = new Date(localStart);
      while (addMinutes(cur, duration) <= localEnd) {
        const slotStartUTC = zonedTimeToUtc(cur, clinician.timezone);
        const slotEndUTC = addMinutes(slotStartUTC, duration + buffer);
        // Lead time filter
        if (isBefore(new Date(), addMinutes(slotStartUTC, -leadHours * 60))) {
          slots.push({ start: slotStartUTC.toISOString(), end: slotEndUTC.toISOString() });
        }
        cur = addMinutes(cur, duration + buffer);
      }
    }
    d = addMinutes(d, 24 * 60);
  }
  // TODO: filter by Google free/busy in lib/google.ts (stubbed call below)
  return slots;
}