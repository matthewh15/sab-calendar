import { v4 as uuidv4 } from "uuid";

export function generateICS({ summary, description, start, end, organizer, attendee }: {
  summary: string; description: string; start: string; end: string; organizer: string; attendee: string;
}) {
  const uid = uuidv4();
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Service Animal Bureau//SAB Booking//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    `DTSTART:${toICS(start)}`,
    `DTEND:${toICS(end)}`,
    `ORGANIZER:${organizer}`,
    `ATTENDEE:${attendee}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return { uid, ics };
}

function toICS(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}