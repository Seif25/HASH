import { ArrowPathRoundedSquareIcon } from "@heroicons/react/16/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { repostHash, unrepostHash } from "@/lib/actions/hash.actions";
import { usePathname } from "next/navigation";

interface RepostBtnProps {
  count: number;
  loggedInUser: string;
  hashId: string;
  reposted: boolean;
  setReposted: (value: boolean) => void;
}

export default function RepostBtn({
  count,
  loggedInUser,
  hashId,
  reposted,
  setReposted,
}: RepostBtnProps) {
  const pathname = usePathname();
  async function handleRepost() {
    if (reposted) {
      await unrepostHash({
        id: hashId,
        currentUser: loggedInUser,
        pathname,
      });
      setReposted(false);
    } else {
      await repostHash({
        id: hashId,
        currentUser: loggedInUser,
        pathname,
      });
      setReposted(true);
    }
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="group flex items-center gap-1">
          <TooltipTrigger onClick={handleRepost}>
            <ArrowPathRoundedSquareIcon
              className={`size-4 text-accent2 dark:text-accent1 group-hover:text-green-500 ${
                reposted && "text-green-500 hover:text-green-300"
              }`}
            />
          </TooltipTrigger>
          <span className="text-accent2/50 dark:text-accent1/50 text-paragraph select-none">
            {count}
          </span>
        </div>
        <TooltipContent>
          <p>Repost</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
