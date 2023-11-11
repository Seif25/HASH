import { cn } from "@/app/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-accent1", className)}
      {...props}
    />
  );
}

export { Skeleton };
