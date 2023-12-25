import { ArrowPathIcon } from "@heroicons/react/20/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { repostHash, unrepostHash } from "@/lib/actions/hash.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface RepostBtnProps {
  count: number;
  loggedInUser: string;
  hashId: string;
  reposted: { status: boolean; user: string };
  setReposted: (value: { status: boolean; user: string }) => void;
}

export default function RepostBtn({
  count,
  loggedInUser,
  hashId,
  reposted,
  setReposted,
}: RepostBtnProps) {
  const pathname = usePathname();
  const [repostCount, setRepostCount] = useState<number>(count);
  async function handleRepost() {
    if (reposted.status && reposted.user === loggedInUser) {
      await unrepostHash({
        id: hashId,
        currentUser: loggedInUser,
        pathname,
      });
      setRepostCount((oldValue) => oldValue - 1);
      setReposted({ status: false, user: "" });
    } else {
      await repostHash({
        id: hashId,
        currentUser: loggedInUser,
        pathname,
      });
      setRepostCount((oldValue) => oldValue + 1);
      setReposted({ status: true, user: loggedInUser });
    }
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="group flex items-center gap-1">
          <TooltipTrigger onClick={handleRepost}>
            <ArrowPathIcon
              className={`size-5 ${
                reposted.user === loggedInUser
                  ? "text-emerald-500 hover:text-emerald-300"
                  : "text-accent2 dark:text-accent1 group-hover:text-emerald-500"
              }`}
            />
          </TooltipTrigger>
          <span className="text-accent2/50 dark:text-accent1/50 text-paragraph select-none">
            {repostCount}
          </span>
        </div>
        <TooltipContent>
          <p>Repost</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
