import { Link2, Share2 } from "lucide-react";
import {
  ArrowUpTrayIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
  EnvelopeIcon,
} from "@heroicons/react/16/solid";
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
import NewConversationWindow from "@/app/(messages)/messages/components/NewConversationWindow";
import { useEffect, useState } from "react";
import { SummarizedUserType } from "@/app/lib/types/user.types";
import { fetchUserFollowingAction } from "@/app/lib/actions/user/user.actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewConversationCard from "@/app/(messages)/messages/components/NewConversationCard";

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

  const [open, setOpen] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [following, setFollowing] = useState<SummarizedUserType[]>([]);

  const [_, copy] = useClipboard();
  const handleExternalShare = () => {
    navigator.share({
      title: `Hash / ${author}`,
      text: hashText,
      url: `https://hash-sage.vercel.app/hash/${hashId}`,
    });
  };

  useEffect(() => {
    fetchUserFollowingAction(loggedInUser)
      .then((res) => {
        setFollowing(res.following);
      })
      .catch((err) => console.log(err));

    return () => {
      setFollowing([]);
    };
  }, [loggedInUser]);

  function handleBookmarkHash() {
    if (!bookmarked) {
      bookmarkHashAction({
        hashId,
        username: loggedInUser,
        pathname: pathname ?? "",
      });
    } else {
      unBookmarkHashAction({
        hashId,
        username: loggedInUser,
        pathname: pathname ?? "",
      });
    }
  }

  function handleDialogOpen(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setOpen(true);
  }

  function handleDialogClose(value: boolean) {
    if (value === false) {
      setOpen(value);
      // setOpenDropDown(value);
    }
  }

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenu>
            <div className="group">
              <DropdownMenuTrigger asChild>
                <TooltipTrigger>
                  <ArrowUpTrayIcon className="size-4 text-accent2 dark:text-accent1 group-hover:text-primary" />
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
              <Dialog open={open} onOpenChange={setOpen}>
                <DropdownMenuItem
                  className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer"
                  onClick={handleDialogOpen}
                >
                  <DialogTrigger>
                    <button className="flex items-center gap-5">
                      <EnvelopeIcon className="size-4 mr-2" />
                      <span>Send via Direct Messages</span>
                    </button>
                  </DialogTrigger>
                </DropdownMenuItem>
                <DialogContent className="max-h-96 overflow-y-scroll custom-scrollbar">
                  <DialogHeader>
                    <DialogTitle>Start A New Conversation</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-10">
                    {following.map((user) => (
                      <NewConversationCard
                        user={user}
                        key={user.username}
                        loggedInUser={loggedInUser}
                        customUrl={`?hash=${hashId}`}
                        setOpen={handleDialogClose}
                      />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              {/* Bookmark Hash */}
              <DropdownMenuItem
                className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer"
                onClick={handleBookmarkHash}
              >
                {!bookmarked ? (
                  <BookmarkIcon className="size-4 mr-2" />
                ) : (
                  <BookmarkSlashIcon className="size-4 mr-2" />
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
    </div>
  );
}
