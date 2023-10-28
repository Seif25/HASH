import { Skeleton } from "@/components/ui/skeleton";

export default function LeftSidebarSkeleton() {
  return (
    <div className="left-sidebar">
      <div className="flex flex-col justify-between h-screen">
        <div className="flex flex-col gap-10 mt-10">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div className="left-sidebar-link" key={`left-${i}`}>
                <Skeleton className="h-6 w-h-6 rounded-full" />
                <Skeleton className="h-6 w-[250px]" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
