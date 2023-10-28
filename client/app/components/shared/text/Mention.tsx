import Link from "next/link";

export default function Mention({ children }: { children: string }) {
  return (
    <Link
      href={`/profile/${children.replace(/\W+$/, "").substring(1)}`}
      className="text-primary font-bold hover:underline pr-1"
    >
      {children}
    </Link>
  );
}
