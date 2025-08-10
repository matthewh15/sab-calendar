export default function Admin() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Admin</h1>
      <ul className="list-disc pl-5">
        <li><a className="underline" href="/admin/clinicians">Clinicians</a></li>
        <li><a className="underline" href="/admin/settings">Settings</a></li>
      </ul>
    </main>
  );
}