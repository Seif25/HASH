"use client";

import CachedIcon from "@mui/icons-material/Cached";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { repostHash, unrepostHash } from "@/lib/actions/hash.actions";
import { abbreviateNumber } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Repeat2 } from "lucide-react";
import { useState } from "react";

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
  const [repostState, setRepostState] = useState<boolean | undefined>(reposted)
  const handleRepost = async () => {
    if (!reposted) {
      await repostHash({
        id: hashId,
        currentUser: currentUser,
        pathname,
        quote: "",
      });
      setRepostState(true)
    } else {
      await unrepostHash({
        id: hashId,
        currentUser: currentUser,
        pathname,
      });
      setRepostState(false)
    }
  };
  return (
    <div className="flex flex-row items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="flex items-center justify-center"
              onClick={handleRepost}
            >
              <Repeat2
                className={`${
                  repostState
                    ? "text-green-500 hover:text-white"
                    : "text-white hover:text-green-500"
                }`}
                size={"20px"}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{repostState ? "UnRepost" : "Repost"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span>{abbreviateNumber(repostCount)}</span>
    </div>
  );
}
