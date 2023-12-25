import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  deleteHashAction,
  highlightHashAction,
  pinHashAction,
  unhighlightHashAction,
  unpinHashAction,
} from "@/app/lib/actions/hash/hash.actions";
import {
  BarChart2,
  Globe2,
  MessageCircle,
  Pencil,
  Pin,
  PinOff,
  Sparkles,
  Trash2,
  UserCheck2,
  UserPlus2,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface AuthorMoreInformationProps {
  hashId: string;
  pinned: boolean;
  highlighted: boolean;
  closeDropdown: (value: boolean) => void;
  whoCanReply: "everyone" | "followers only" | "followed by me" | "";
  handleOpenDialog: () => void;
  handleOpenEditDialog: () => void;
  handleOpenDeleteDialog: () => void;
}

export default function AuthorMoreInformation({
  hashId,
  pinned,
  highlighted,
  whoCanReply,
  handleOpenDialog,
  handleOpenEditDialog,
  handleOpenDeleteDialog,
}: AuthorMoreInformationProps) {
  const pathname = usePathname();

  function handlePinHash() {
    if (pinned) {
      unpinHashAction({ hashId, pathname });
    } else {
      pinHashAction({ hashId, pathname });
    }
  }

  function handleHighlightHash() {
    if (highlighted) {
      unhighlightHashAction({ hashId, pathname });
    } else {
      highlightHashAction({ hashId, pathname });
    }
  }

  return (
    <div>
      <DropdownMenuContent>
        {/* Delete Hash */}
        <DropdownMenuItem
          className="flex items-center gap-5 text-red-500 cursor-pointer"
          onClick={handleOpenDeleteDialog}
        >
          <Trash2 className="size-4 mr-2" />
          <span>Delete Hash</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer"
          onClick={handleOpenEditDialog}
        >
          <Pencil className="size-4 mr-2" />
          <span>Edit Hash</span>
        </DropdownMenuItem>
        {/* Pin Hash */}
        <DropdownMenuItem
          className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer"
          onClick={handlePinHash}
        >
          {!pinned ? (
            <Pin className="size-4 mr-2" />
          ) : (
            <PinOff className="size-4 mr-2 text-primary" />
          )}
          <span>
            {!pinned
              ? "Pin Hash to your Profile"
              : "Unpin Hash from your profile"}
          </span>
        </DropdownMenuItem>
        {/* Highlight Hash */}
        <DropdownMenuItem
          className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer"
          onClick={handleHighlightHash}
        >
          {!highlighted ? (
            <Sparkles className="size-4 mr-2" />
          ) : (
            <Sparkles className="size-4 mr-2 text-primary" />
          )}
          <span>
            {!highlighted
              ? "Highlight Hash on your Profile"
              : "Unhighlight Hash from your Profile"}
          </span>
        </DropdownMenuItem>
        {/* Change Who can Reply */}
        <DropdownMenuItem
          className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer"
          onClick={handleOpenDialog}
        >
          {whoCanReply === "everyone" ? (
            <Globe2 className="size-4 mr-2 text-primary" />
          ) : whoCanReply === "followers only" ? (
            <UserPlus2 className="size-4 mr-2 text-primary" />
          ) : whoCanReply === "followed by me" ? (
            <UserCheck2 className="size-4 mr-2 text-primary" />
          ) : (
            <MessageCircle className="size-4 mr-2" />
          )}
          <span className="flex flex-col gap-1">
            Change Who can Reply
            <span className="text-paragraph text-primary text-[12px]">
              {whoCanReply === "everyone" ? (
                <span className="flex items-center gap-1">Everyone</span>
              ) : whoCanReply === "followers only" ? (
                <span className="flex items-center gap-1">
                  Only Your Followers Can Reply
                </span>
              ) : whoCanReply === "followed by me" ? (
                <span className="flex items-center gap-1">
                  Only People You Follow Can Reply
                </span>
              ) : (
                ""
              )}
            </span>
          </span>
        </DropdownMenuItem>
        {/* View Post Analytics */}
        <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
          <BarChart2 className="size-4 mr-2" />
          <span>View Hash Analytics</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </div>
  );
}
