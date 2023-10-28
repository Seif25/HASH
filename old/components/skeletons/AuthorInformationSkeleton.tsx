import { Skeleton } from "../ui/skeleton";

export default function AuthorInformationSkeleton({
  isComment,
}: {
  isComment: boolean;
}) {
  return (
    <div className="flex items-start justify-between w-full">
      <div className="flex w-auto flex-1 flex-row items-center gap-0">
        <div className="flex w-full flex-1 flex-row items-center justify-start gap-2">
          <Skeleton className="bg-accent1 rounded-full w-[42px] h-[42px]" />
          <div
            className={`flex w-full ${
              isComment
                ? "flex-col gap-0 items-start"
                : "flex-row gap-1 items-center"
            }`}
          >
            <Skeleton className="bg-accent1 rounded-full w-full h-4 pb-2" />
            <Skeleton className="bg-accent1 rounded-full w-full h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
