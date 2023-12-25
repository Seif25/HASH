"use client";

import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmojiBtnProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmojiBtn({ setMessage }: EmojiBtnProps) {
  const handleEmojiClick = (emoji: EmojiClickData) => {
    setMessage((oldValue) => oldValue + emoji.emoji);
  };

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger>
              <FaceSmileIcon className="size-4 text-accent2 dark:text-accent1 hover:text-primary" />
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent>
            <p>Emoji</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-80 flex items-center justify-center bg-transparent border-none p-0">
        <EmojiPicker
          theme={Theme.DARK}
          emojiStyle={EmojiStyle.NATIVE}
          onEmojiClick={(emoji) => handleEmojiClick(emoji)}
        />
      </PopoverContent>
    </Popover>
  );
}
