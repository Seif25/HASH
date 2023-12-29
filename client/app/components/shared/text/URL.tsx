import Link from "next/link";

export default function URL({ children }: { children: string }) {
  return (
    <Link href={children} className="text-primary italic pr-1">
      <span className="hover:underline underline-offset-4">{children}</span>
    </Link>
  );
}
