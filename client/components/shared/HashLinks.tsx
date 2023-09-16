// * ICONS
import BarChartIcon from "@mui/icons-material/BarChart";

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
    <div className="flex items-center gap-5 w-[95%]">
      {/* Comment */}
      <CommentButton commentCount={commentCount} currentUser={currentUser} parentId={hashId} image={image} parentAuthor={parentAuthor}/>
      {/* Re-post */}
      <RepostButton repostCount={repostCount} hashId={hashId} currentUser={currentUser} reposted={reposted} />
      {/* Like */}
      <LikeButton liked={liked} likeCount={likeCount} hashId={hashId} currentUser={currentUser} />
      {/* Views */}
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-5 h-5 p-3 flex items-center justify-center">
                <BarChartIcon
                  className="text-white hover:text-amber-500"
                  fontSize="small"
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
