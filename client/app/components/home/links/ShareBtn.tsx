import {
  BookmarkMinus,
  BookmarkPlus,
  Link2,
  Mail,
  Share,
  Share2,
} from "lucide-react";
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
} from "@/lib/actions/hash/hash.actions";
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
          <div className="group flex items-center gap-1">
            <DropdownMenuTrigger asChild>
              <TooltipTrigger>
                <Share
                  size={"24px"}
                  className="text-accent1 group-hover:text-primary"
                />
              </TooltipTrigger>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            {/* Copy Hash Link */}
            <DropdownMenuItem
              onClick={() =>
                copy(`https://hash-sage.vercel.app/hash/${hashId}`)
              }
              className="flex items-center gap-5 text-accent1 cursor-pointer"
            >
              <Link2 size={"20px"} className="mr-2" />
              <span>Copy Link</span>
            </DropdownMenuItem>
            {/* Share Hash using External Services */}
            <DropdownMenuItem
              onClick={handleExternalShare}
              className="flex items-center gap-5 text-accent1 cursor-pointer"
            >
              <Share2 size={"20px"} className="mr-2" />
              <span>Share Hash via...</span>
            </DropdownMenuItem>
            {/* Send as a DM */}
            <DropdownMenuItem className="flex items-center gap-5 text-accent1 cursor-pointer">
              <Mail size={"20px"} className="mr-2" />
              <span>Send via Direct Messages</span>
            </DropdownMenuItem>
            {/* Bookmark Hash */}
            <DropdownMenuItem
              className="flex items-center gap-5 text-accent1 cursor-pointer"
              onClick={handleBookmarkHash}
            >
              {!bookmarked ? (
                <BookmarkPlus size={"20px"} className="mr-2" />
              ) : (
                <BookmarkMinus size={"20px"} className="mr-2" />
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
