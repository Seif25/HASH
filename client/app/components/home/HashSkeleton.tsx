import { Skeleton } from "@/components/ui/skeleton";

export default function HashSkeleton() {
  return (
    <div className="w-full flex flex-col gap-5 pt-5">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div
            className="flex flex-col gap-5 bg-accent2 rounded-xl p-5"
            key={i}
          >
            <div className="flex items-center space-x-4 w-full">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton className="h-4 w-full" key={`text-${i}`} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
