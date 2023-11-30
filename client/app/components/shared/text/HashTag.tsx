import Link from "next/link";

export default function HashTag({ children }: { children: string }) {
  return (
    <Link
      href={`/search?q=${children.substring(1)}&type=hashtag`}
      className="text-primary hover:underline pr-1"
    >
      {children}
    </Link>
  );
}
