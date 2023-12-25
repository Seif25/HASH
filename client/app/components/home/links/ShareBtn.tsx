import { BookmarkMinus, BookmarkPlus, Link2, Mail, Share2 } from "lucide-react";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useClipboard } from "@reactuses/core";
import {
  bookmarkHashAction,
  unBookmarkHashAction,
} from "@/app/lib/actions/hash/hash.actions";
import { usePathname } from "next/navigation";

interface ShareBtnProps {
  hashId: string;
  author: string;
  hashText: string;
  bookmarked: boolean;
  loggedInUser: string;
}

export default function ShareBtn({
  hashId,
  author,
  hashText,
  bookmarked,
  loggedInUser,
}: ShareBtnProps) {
  const pathname = usePathname();

  const [_, copy] = useClipboard();
  const handleExternalShare = () => {
    navigator.share({
      title: `Hash / ${author}`,
      text: hashText,
      url: `https://hash-sage.vercel.app/hash/${hashId}`,
    });
  };

  function handleBookmarkHash() {
    if (!bookmarked) {
      bookmarkHashAction({ hashId, username: loggedInUser, pathname });
    } else {
      unBookmarkHashAction({ hashId, username: loggedInUser, pathname });
    }
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <div className="group">
            <DropdownMenuTrigger asChild>
              <TooltipTrigger>
                <ArrowUpOnSquareIcon className="size-4 text-accent2 dark:text-accent1 group-hover:text-primary" />
              </TooltipTrigger>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            {/* Copy Hash Link */}
            <DropdownMenuItem
              onClick={() =>
                copy(`https://hash-sage.vercel.app/hash/${hashId}`)
              }
              className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer"
            >
              <Link2 className="size-4 mr-2" />
              <span>Copy Link</span>
            </DropdownMenuItem>
            {/* Share Hash using External Services */}
            <DropdownMenuItem
              onClick={handleExternalShare}
              className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer"
            >
              <Share2 className="size-4 mr-2" />
              <span>Share Hash via...</span>
            </DropdownMenuItem>
            {/* Send as a DM */}
            <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
              <Mail className="size-4 mr-2" />
              <span>Send via Direct Messages</span>
            </DropdownMenuItem>
            {/* Bookmark Hash */}
            <DropdownMenuItem
              className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer"
              onClick={handleBookmarkHash}
            >
              {!bookmarked ? (
                <BookmarkPlus className="size-4 mr-2" />
              ) : (
                <BookmarkMinus className="size-4 mr-2" />
              )}
              <span>
                {!bookmarked ? "Bookmark Hash" : "Remove Hash from Bookmarks"}
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent>
          <p>Share</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
