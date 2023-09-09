"use client";

import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BarChartIcon from "@mui/icons-material/BarChart";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { likeHash, unlikeHash } from "@/lib/actions/hash.actions";
import { usePathname } from "next/navigation";

interface HashLinksProps {
  commentCount: number | string;
  likeCount: number | string;
  repostCount: number | string;
  viewCount: number | string;
  userId: string;
  hashId: string;
  liked: boolean;
}

function HashLinks({
  commentCount,
  likeCount,
  repostCount,
  viewCount,
  userId,
  hashId,
  liked,
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
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-5 h-5 p-3 flex items-center justify-center">
                <CommentIcon
                  className="text-white hover:text-primary"
                  fontSize="small"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Comment</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>{commentCount}</span>
      </div>
      {/* Re-post */}
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-5 h-5 p-3 flex items-center justify-center">
                <CachedIcon
                  className="text-white hover:text-green-500"
                  fontSize="small"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Repost</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>{repostCount}</span>
      </div>
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
        <span>{likeCount}</span>
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
        <span>{viewCount}</span>
      </div>
    </div>
  );
}

export default HashLinks;
