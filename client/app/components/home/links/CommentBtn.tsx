import { BadgeCheck, MessageCircle, SendHorizonal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MediaType } from "@/lib/types/hash.types";
import Image from "next/image";

interface CommentBtnProps {
  count: number;
  commenter: string;
  hashMedia: MediaType[];
  hashText: string;
  hashAuthor: AuthorType;
}

type AuthorType = {
  name: string;
  username: string;
  image: string;
  verified: boolean;
};

export default function CommentBtn({
  count,
  hashMedia,
  hashText,
  hashAuthor,
  commenter,
}: CommentBtnProps) {
  const cols = ["grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4"];
  return (
    <div className="group flex items-center gap-1">
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <DialogTrigger asChild className="cursor-pointer">
              <TooltipTrigger>
                <MessageCircle
                  size={"24px"}
                  className="text-accent1 group-hover:text-primary"
                />
              </TooltipTrigger>
            </DialogTrigger>
            <TooltipContent>
              <p>Comment</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-col gap-1 border-b border-accent1/10">
              <div className="flex items-center gap-2">
                <Image
                  src={hashAuthor.image}
                  alt={hashAuthor.username}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <h1 className="text-accent1 text-heading">{hashAuthor.name}</h1>
                <p className="text-accent1/50 text-paragraph">
                  @{hashAuthor.username}
                </p>
                {hashAuthor.verified && (
                  <BadgeCheck size={"16px"} className="text-primary" />
                )}
              </div>
              <div className="flex flex-col gap-3 px-10 pb-5">
                <h3 className="text-accent1 text-body">{hashText}</h3>
                {hashMedia.length > 0 && (
                  <div
                    className={`grid ${
                      cols[hashMedia.length - 1]
                    } gap-5 w-full max-w-xs h-full max-h-[380px] rounded-2xl`}
                  >
                    {hashMedia.map((hashMedia) => (
                      <Image
                        src={hashMedia.url}
                        alt={hashMedia.alt}
                        width={100}
                        height={100}
                        key={hashMedia.url}
                        className="w-full h-auto max-h-[400px] rounded-2xl object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </DialogTitle>
            <DialogDescription className="pt-5">
              <div className="bg-accent2 rounded-2xl flex items-center justify-between px-5">
                <input
                  type="text"
                  id="comment-field"
                  className="w-full rounded-2xl p-2 bg-accent2 border-none outline-none ring-0 text-accent1"
                  placeholder="Write a comment..."
                />
                <button>
                  <SendHorizonal size={"16px"} className="text-primary" />
                </button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <span className="text-accent1/50 text-paragraph select-none">
        {count}
      </span>
    </div>
  );
}
