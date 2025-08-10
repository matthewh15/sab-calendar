export default function Connect() {
  return (
    <main className="space-y-3">
      <h1 className="text-2xl font-bold">Connect Google Calendar</h1>
      <p>Use the Google sign-in flow to grant calendar permissions.</p>
      <a className="underline" href="/api/auth/signin">Sign in with Google</a>
    </main>
  );
}