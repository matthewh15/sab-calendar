export default function Button({ children, ...props }: any) {
  return (
    <button className="px-4 py-2 rounded-2xl font-semibold shadow hover:opacity-90"
            style={{ background: "var(--primary)", color: "white" }} {...props}>
      {children}
    </button>
  );
}