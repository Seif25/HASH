import Link from "next/link";

export default function URL({ children }: { children: string }) {
  return (
    <Link href={children} className="text-primary italic pr-1">
      {children.trim().startsWith("https") ? (
        <span className="hover:underline underline-offset-4">
          <span className="text-primary">
            {children.trim().length < children.length
              ? children.substring(0, 6)
              : children.substring(0, 5)}
          </span>
          <span className="text-primary">
            {children.trim().length < children.length
              ? children.substring(6, children.length)
              : children.substring(5, children.length)}
          </span>
        </span>
      ) : (
        <span className="hover:underline underline-offset-4">
          <span className="text-red-700">
            {children.trim().length < children.length
              ? children.substring(0, 5)
              : children.substring(0, 4)}
          </span>
          <span className="text-primary">
            {children.trim().length < children.length
              ? children.substring(5, children.length)
              : children.substring(4, children.length)}
          </span>
        </span>
      )}
    </Link>
  );
}
