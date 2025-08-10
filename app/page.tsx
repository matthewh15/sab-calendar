import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[70vh] flex flex-col gap-10">
      {/* Hero */}
      <section className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-[var(--bg)] via-white to-[var(--bg)] border border-white/60 shadow">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--accent)]">
            Service Animal Bureau — Scheduling
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-700">
            Secure booking for 30‑minute ESA/PSD evaluations. Clinicians manage availability; clients receive
            instant confirmations with calendar files.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/checkout"
              className="inline-flex items-center rounded-2xl px-5 py-3 font-semibold shadow hover:opacity-95"
              style={{ background: "var(--primary)", color: "white" }}
            >
              Start / Payment
            </Link>
            <Link
              href="/directory"
              className="inline-flex items-center rounded-2xl px-5 py-3 font-semibold border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--bg)]"
            >
              View Clinicians
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card title="Issue Booking Link" href="/admin/tokens">
          Create a one‑time, expiring link for a client after external payment. Ideal for phone orders or comps.
        </Card>
        <Card title="Clinician Portal" href="/portal/clinician">
          Set weekly hours, add overrides, and connect Google Calendar for automatic event syncing.
        </Card>
        <Card title="Booking (Have a link?)" href="/book/test-token" asExample>
          If you already have a tokenized link, open it to choose a time and confirm your session.
        </Card>
      </section>

      <footer className="text-sm text-slate-500">
        <p>
          Need help? Contact <a className="underline" href="mailto:support@serviceanimalbureau.org">support@serviceanimalbureau.org</a>
        </p>
      </footer>
    </main>
  );
}

function Card({ title, href, children, asExample = false }: { title: string; href: string; children: React.ReactNode; asExample?: boolean }) {
  return (
    <div className="rounded-2xl bg-white/90 border border-slate-200 shadow p-6 flex flex-col">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-700 flex-1">{children}</p>
      <div className="mt-4">
        <Link
          href={href}
          className={`inline-flex items-center rounded-xl px-4 py-2 font-semibold shadow-sm ${
            asExample
              ? "border border-slate-300 text-slate-700 hover:bg-[var(--bg)]"
              : "text-white hover:opacity-95"
          }`}
          style={!asExample ? { background: "var(--accent)" } : undefined}
        >
          {asExample ? "Open Example" : "Open"}
        </Link>
      </div>
    </div>
  );
}