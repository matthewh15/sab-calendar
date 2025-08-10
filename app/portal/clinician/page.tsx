export default function ClinicianHome() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Clinician Portal</h1>
      <ul className="list-disc pl-5">
        <li><a className="underline" href="/portal/clinician/availability">Edit Availability</a></li>
        <li><a className="underline" href="/portal/clinician/connect">Connect Google Calendar</a></li>
      </ul>
    </main>
  );
}