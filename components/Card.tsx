export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl shadow p-5 bg-white">{children}</div>;
}