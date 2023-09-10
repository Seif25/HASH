"use client";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { likeHash, unlikeHash } from "@/lib/actions/hash.actions";
import { usePathname } from "next/navigation";
import CommentButton from "../buttons/CommentButton";
import RepostButton from "../buttons/RepostButton";
import { abbreviateNumber } from "@/lib/utils";

interface HashLinksProps {
  commentCount: number;
  likeCount: number;
  repostCount: number;
  viewCount: number;
  userId: string;
  hashId: string;
  liked: boolean;
  image: string
  reposted?: boolean;
}

function HashLinks({
  commentCount,
  likeCount,
  repostCount,
  viewCount,
  userId,
  hashId,
  liked,
  image,
  reposted
}: HashLinksProps) {
  const pathname = usePathname();

  const handleLike = async () => {
    if (liked) {
      await unlikeHash({ id: hashId, userId, pathname });
    } else {
      await likeHash({ id: hashId, userId, pathname });
    }
  };

  return (
    <div className="flex items-center gap-5 w-[90%] px-5">
      {/* Comment */}
      <CommentButton commentCount={commentCount} userId={userId} parentId={hashId} image={image} />
      {/* Re-post */}
      <RepostButton repostCount={repostCount} pathname={pathname} hashId={hashId} userId={userId} reposted={reposted} />
      {/* Like */}
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="w-5 h-5 p-3 flex items-center justify-center"
                onClick={handleLike}
              >
                {liked ? (
                  <FavoriteIcon
                    className={`${
                      liked
                        ? "text-red-600 hover:text-white"
                        : "text-white hover:text-red-600"
                    }`}
                    fontSize="small"
                  />
                ) : (
                  <FavoriteBorderIcon
                    className={`${
                      liked
                        ? "text-red-600 hover:text-white"
                        : "text-white hover:text-red-600"
                    }`}
                    fontSize="small"
                  />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{liked ? "Unlike" : "Like"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>{abbreviateNumber(likeCount)}</span>
      </div>
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
        <span>{abbreviateNumber(viewCount)}</span>
      </div>
    </div>
  );
}

export default HashLinks;
