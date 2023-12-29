import { Skeleton } from "@/components/ui/skeleton";

export default function UserCardSkeleton() {
  return (
    <div className="flex flex-col gap-5 justify-between">
      <div className="w-full bg-accent1 dark:bg-accent2 rounded-lg px-2 mt-5 py-5 flex flex-col gap-5">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="px-5 flex items-center justify-between">
              <Skeleton className="rounded-full size-10 bg-accent2 dark:bg-accent1" />
              <Skeleton className="w-full h-3 bg-accent2 dark:bg-accent1" />
            </div>
          ))}
      </div>
    </div>
  );
}
