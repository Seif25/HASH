"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClipboard } from "@reactuses/core";
import { Bookmark, Link2, Mail, Share, Share2 } from "lucide-react";

function ShareMenu({
  id,
  authorId,
  content,
}: {
  id: string;
  authorId: string;
  content?: string;
}) {
  const [text, copy] = useClipboard();
  const handleExternalShare = () => {
    navigator.share({
      title: `Hash / ${authorId}`,
      text: content,
      url: `https://hash-sage.vercel.app/hash/${id}`,
    });
  };
  return (
    <div className="w-full flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full flex items-center justify-center">
            <Share className="text-accent1 hover:text-primary" size={"20px"} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full flex flex-col gap-2 p-2">
          <DropdownMenuItem
            onClick={() => copy(`https://hash-sage.vercel.app/hash/${id}`)}
          >
            <Link2 size={"20px"} className="mr-2" />
            <span className="">Copy link</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExternalShare}>
            <Share2 size={"20px"} className="mr-2" />
            <span className="">Share post via ...</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail size={"20px"} className="mr-2" />
            <span className="">Send via Direct Message</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bookmark size={"20px"} className="mr-2" />
            <span className="">Bookmark</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ShareMenu;
