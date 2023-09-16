"use client";

// * SHADCN COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// *UTILS
import { usePathname } from "next/navigation";
import { abbreviateNumber } from "@/lib/utils";

// *ACTIONS
import { likeHash, unlikeHash } from "@/lib/actions/hash.actions";

// *ICONS
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface LikeButtonProps {
  liked: boolean;
  hashId: string;
  currentUser: string;
  likeCount: number;
}

export default function LikeButton({
  liked,
  likeCount,
  hashId,
  currentUser,
}: LikeButtonProps) {
  // Get current pathname
  const pathname = usePathname();

  /**
   * Handle like
   */
  const handleLike = async () => {
    if (liked) {
      await unlikeHash({ id: hashId, currentUser, pathname });
    } else {
      await likeHash({ id: hashId, currentUser, pathname });
    }
  };
  return (
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
  );
}
