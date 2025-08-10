import { google } from "googleapis";
import { prisma } from "./db";

export async function getOAuthClient(userId: string) {
  const oauth2Client = new (google as any).auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );
  // In a real flow, you'd load the refresh token from ClinicianProfile
  const clinician = await prisma.clinicianProfile.findFirst({ where: { userId } });
  if (clinician?.googleRefreshToken) {
    oauth2Client.setCredentials({ refresh_token: clinician.googleRefreshToken });
  }
  return oauth2Client;
}

export async function insertCalendarEvent(clinicianId: string, summary: string, description: string, startISO: string, endISO: string) {
  const clinician = await prisma.clinicianProfile.findUnique({ where: { id: clinicianId } });
  if (!clinician) return null;
  if (!clinician.googleRefreshToken || !clinician.googleCalendarId) return null; // Not connected
  const oauth2Client = await getOAuthClient(clinician.userId);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const res = await calendar.events.insert({
    calendarId: clinician.googleCalendarId,
    requestBody: {
      summary,
      description,
      start: { dateTime: startISO },
      end: { dateTime: endISO },
    },
  });
  return res.data.id || null;
}