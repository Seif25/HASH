"use client";

import CachedIcon from "@mui/icons-material/Cached";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { repostHash } from "@/lib/actions/hash.actions";
import { abbreviateNumber } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface RepostButtonProps {
  repostCount: number;
  hashId: string;
  currentUser: string;
  reposted?: boolean;
}

export default function RepostButton({
  repostCount,
  hashId,
  currentUser,
  reposted,
}: RepostButtonProps) {
  const pathname = usePathname();
  const handleRepost = async () => {
    if (!reposted) {
      await repostHash({
        id: hashId,
        currentUser: currentUser,
        pathname,
        quote: "",
      });
    }
  };
  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="w-5 h-5 p-3 flex items-center justify-center"
              onClick={handleRepost}
            >
              <CachedIcon
                className={`${
                  reposted
                    ? "text-green-500 hover:text-white"
                    : "text-white hover:text-green-500"
                }`}
                fontSize="small"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Repost</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span>{abbreviateNumber(repostCount)}</span>
    </div>
  );
}
