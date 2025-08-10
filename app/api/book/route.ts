import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateICS } from "@/lib/ics";
import { sendEmail } from "@/lib/email";
import { insertCalendarEvent } from "@/lib/google";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, clinicianId, startISO, endISO, client } = body;

  const pat = await prisma.paymentAccessToken.findUnique({ where: { token } });
  if (!pat || (pat.consumedAt && pat.consumedAt < new Date()) || pat.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: {
      clinicianId,
      startsAtUTC: new Date(startISO),
      endsAtUTC: new Date(endISO),
      clientName: client.name,
      email: client.email,
      phone: client.phone,
      state: client.state,
      animalType: client.animalType,
      language: client.language || "en",
      paymentStatus: "PAID",
    },
  });

  await prisma.paymentAccessToken.update({ where: { id: pat.id }, data: { consumedAt: new Date() } });

  const summary = "Service Animal Evaluation (ESA/PSD)";
  const description = `Clinician booking\nClient: ${client.name}\nState: ${client.state}`;
  const googleEventId = await insertCalendarEvent(clinicianId, summary, description, startISO, endISO);
  if (googleEventId) await prisma.booking.update({ where: { id: booking.id }, data: { googleEventId } });

  const { ics } = generateICS({
    summary,
    description,
    start: startISO,
    end: endISO,
    organizer: "mailto:noreply@serviceanimalbureau.org",
    attendee: `mailto:${client.email}`,
  });

  await sendEmail(client.email, "Booking confirmed — Service Animal Bureau", `<p>See you at ${startISO}</p>`, [
    { filename: "booking.ics", content: ics },
  ]);

  return NextResponse.json({ ok: true, bookingId: booking.id });
}