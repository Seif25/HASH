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
import { MediaType } from "@/app/lib/types/hash.types";
import Image from "next/image";
import { SummarizedUserType } from "@/app/lib/types/user.types";
import HashVideoPreview from "../HashVideoPreview";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import CommentField from "./CommentField";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

interface CommentBtnProps {
  count: number;
  commenter: string;
  hashMedia: MediaType[];
  hashText: string;
  hashAuthor: SummarizedUserType;
  hashId: string;
}

export default function CommentBtn({
  count,
  hashMedia,
  hashText,
  hashAuthor,
  commenter,
  hashId,
}: CommentBtnProps) {
  return (
    <div className="group flex items-center gap-1">
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <DialogTrigger asChild className="cursor-pointer">
              <TooltipTrigger>
                <ChatBubbleOvalLeftIcon className="text-accent1 group-hover:text-primary size-6" />
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
                {/* Hash Media */}
                {hashMedia.length > 0 && (
                  <div className="flex items-center justify-start w-full h-auto">
                    {hashMedia.length === 1 ? (
                      <div className="w-[250px] bg-transparent">
                        {hashMedia[0].mediaType === "image" ? (
                          <AspectRatio ratio={3 / 4}>
                            <Image
                              src={hashMedia[0].url}
                              alt={hashMedia[0].alt}
                              fill
                              priority
                              className="rounded-xl aspect-square bg-transparent object-contain"
                            />
                          </AspectRatio>
                        ) : hashMedia[0].mediaType === "video" ? (
                          <AspectRatio ratio={16 / 9}>
                            <HashVideoPreview src={hashMedia[0].url} />
                          </AspectRatio>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 w-full h-auto items-center">
                        {hashMedia.map((media, index) => (
                          <div
                            key={media.id}
                            className={`w-[150px] h-[150px] flex items-center justify-center bg-dark rounded-xl`}
                          >
                            {media.mediaType === "image" ? (
                              <AspectRatio ratio={1 / 1}>
                                <Image
                                  src={media.url}
                                  alt={media.alt}
                                  fill
                                  priority
                                  className={`rounded-xl aspect-square bg-transparent object-contain`}
                                />
                              </AspectRatio>
                            ) : media.mediaType === "video" ? (
                              <AspectRatio ratio={16 / 9}>
                                <HashVideoPreview src={media.url} />
                              </AspectRatio>
                            ) : (
                              <></>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </DialogTitle>
            <DialogDescription className="pt-5">
              <CommentField commenter={commenter} hashId={hashId} />
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
