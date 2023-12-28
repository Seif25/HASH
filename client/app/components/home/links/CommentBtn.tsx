"use client";

import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/20/solid";

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
import { useEffect, useState } from "react";

interface CommentBtnProps {
  count: number;
  commenter: string;
  hashMedia: MediaType[];
  hashText: string;
  hashAuthor: SummarizedUserType;
  hashId: string;
  restriction: "everyone" | "mentioned only" | "followed by me";
}

export default function CommentBtn({
  count,
  hashMedia,
  hashText,
  hashAuthor,
  commenter,
  hashId,
  restriction,
}: CommentBtnProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (commenter !== hashAuthor.username) {
      if (restriction === "everyone") {
        setDisabled(false);
      } else if (restriction === "mentioned only") {
        setDisabled(hashText.includes(`@${commenter}`) ? false : true);
      } else if (restriction === "followed by me") {
        setDisabled(hashAuthor.followers.includes(commenter) ? false : true);
      }
    }
  }, [restriction]);

  return (
    <div className="group flex items-center gap-1">
      <Dialog open={open} onOpenChange={setOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <button
                onClick={() => setOpen(true)}
                className="flex items-center disabled:text-accent2/50 dark:disabled:text-accent1/50"
                disabled={disabled}
              >
                <ChatBubbleOvalLeftIcon
                  className={`size-5 ${
                    disabled ? "text-inherit" : "text-accent2 dark:text-accent1"
                  } ${!disabled && "group-hover:text-primary"}`}
                />
              </button>
            </TooltipTrigger>
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
                <h1 className="text-accent2 dark:text-accent1 text-heading">
                  {hashAuthor.name}
                </h1>
                <p className="text-accent2/50 dark:text-accent1/50 text-paragraph">
                  @{hashAuthor.username}
                </p>
                {hashAuthor.verified && (
                  <CheckBadgeIcon className="size-4 text-primary" />
                )}
              </div>
              <div className="flex flex-col gap-3 px-10 pb-5">
                <h3 className="text-accent2 dark:text-accent1 text-body">
                  {hashText}
                </h3>
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
              <CommentField
                commenter={commenter}
                hashId={hashId}
                setOpen={setOpen}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <span className="text-accent2/50 dark:text-accent1/50 text-paragraph select-none flex items-center">
        {count}
      </span>
    </div>
  );
}
