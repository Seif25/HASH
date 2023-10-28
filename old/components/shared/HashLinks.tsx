// * ICONS
import { BarChart2 } from "lucide-react";

// * SHADCN COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// * COMPONENTS
import CommentButton from "../buttons/CommentButton";
import RepostButton from "../buttons/RepostButton";
const LikeButton = dynamic(() => import("../shared/LikeButton"), {
  ssr: false, // This ensures the component is only rendered on the client-side
});

// * UTILS
import { abbreviateNumber } from "@/lib/utils";
import dynamic from "next/dynamic";

interface HashLinksProps {
  hashId: string;
  commentCount: number;
  likeCount: number;
  repostCount: number;
  viewCount: number;
  currentUser: string;
  liked: boolean;
  image: string;
  reposted?: boolean;
  parentAuthor: string;
}

export default function HashLinks({
  commentCount,
  likeCount,
  repostCount,
  viewCount,
  currentUser,
  hashId,
  liked,
  image,
  reposted,
  parentAuthor,
}: HashLinksProps) {
  return (
    <div className="flex items-center justify-between gap-5 w-[70%]">
      {/* Comment */}
      <CommentButton
        commentCount={commentCount}
        currentUser={currentUser}
        parentId={hashId}
        image={image}
        parentAuthor={parentAuthor}
      />
      {/* Re-post */}
      <RepostButton
        repostCount={repostCount}
        hashId={hashId}
        currentUser={currentUser}
        reposted={reposted}
      />
      {/* Like */}
      <LikeButton
        liked={liked}
        likeCount={likeCount}
        hashId={hashId}
        currentUser={currentUser}
        author={parentAuthor}
      />
      {/* Views */}
      <div className="flex flex-row items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center justify-center">
                <BarChart2
                  className="text-white hover:text-amber-500"
                  size="20px"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Views</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="flex flex-col gap-1">
          {abbreviateNumber(viewCount)}
        </span>
      </div>
    </div>
  );
}
