"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import LinkIcon from "@mui/icons-material/Link";
import ShareIcon from "@mui/icons-material/Share";
import EmailIcon from "@mui/icons-material/Email";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useClipboard } from "@reactuses/core";
import { LucideShare, Share } from "lucide-react";

function ShareMenu({ id, authorId }: { id: string; authorId: string }) {
  const [text, copy] = useClipboard();
  return (
    <div className="w-full flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="rounded-full flex items-center justify-center"
          >
            <Share className="text-accent1 hover:text-primary" size={"20px"}/>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full flex flex-col gap-2 p-2">
          <DropdownMenuItem
            onClick={() => copy(`https://hash-sage.vercel.app/hash/${id}`)}
          >
            <LinkIcon className="mr-2 h-4 w-4" />
            <span className="">Copy link</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon className="mr-2 h-4 w-4" />
            <span className="">Share post via ...</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EmailIcon className="mr-2 h-4 w-4" />
            <span className="">Send via Direct Message</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookmarkAddIcon className="mr-2 h-4 w-4" />
            <span className="">Bookmark</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ShareMenu;
