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
} from "@/lib/actions/hash/hash.actions";
import {
  BarChart2,
  MessageCircle,
  Pin,
  PinOff,
  Sparkles,
  Trash2,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface AuthorMoreInformationProps {
  hashId: string;
  pinned: boolean;
  highlighted: boolean;
}

export default function AuthorMoreInformation({
  hashId,
  pinned,
  highlighted,
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
    <DropdownMenuContent>
      {/* Delete Hash */}
      <DropdownMenuItem
        className="flex items-center gap-5 text-red-500 cursor-pointer"
        onClick={() => deleteHashAction({ hashId, pathname })}
      >
        <Trash2 size={"20px"} className="mr-2" />
        <span>Delete Hash</span>
      </DropdownMenuItem>
      {/* Pin Hash */}
      <DropdownMenuItem
        className="flex items-center gap-5 text-accent1 cursor-pointer"
        onClick={handlePinHash}
      >
        {!pinned ? (
          <Pin size={"20px"} className="mr-2" />
        ) : (
          <PinOff size={"20px"} className="mr-2" />
        )}
        <span>
          {!pinned
            ? "Pin Hash to your Profile"
            : "Unpin Hash from your profile"}
        </span>
      </DropdownMenuItem>
      {/* Highlight Hash */}
      <DropdownMenuItem
        className="flex items-center gap-5 text-accent1 cursor-pointer"
        onClick={handleHighlightHash}
      >
        {!highlighted ? (
          <Sparkles size={"20px"} className="mr-2" />
        ) : (
          <Sparkles size={"20px"} className="mr-2 text-primary" />
        )}
        <span>
          {!highlighted
            ? "Highlight Hash on your Profile"
            : "Unhighlight Hash from your Profile"}
        </span>
      </DropdownMenuItem>
      {/* Change Who can Reply */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent1 cursor-pointer">
        <MessageCircle size={"20px"} className="mr-2" />
        <span>Change who can Reply</span>
      </DropdownMenuItem>
      {/* View Post Analytics */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent1 cursor-pointer">
        <BarChart2 size={"20px"} className="mr-2" />
        <span>View Hash Analystics</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
