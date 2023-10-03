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
import { Heart } from "lucide-react"
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
    <div className="flex flex-row items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="flex items-center justify-center"
              onClick={handleLike}
            >
              {liked ? (
                <Heart
                  className={`${
                    liked
                      ? "text-red-600 hover:text-white"
                      : "text-white hover:text-red-600"
                  }`}
                  size={"20px"}
                />
              ) : (
                <Heart
                  className={`${
                    liked
                      ? "text-red-600 hover:text-white"
                      : "text-white hover:text-red-600"
                  }`}
                  size={"20px"}
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
