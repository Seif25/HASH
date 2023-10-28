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
import { Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmojiBtnProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
}

export default function EmojiBtn({ message, setMessage }: EmojiBtnProps) {
  const handleEmojiClick = (emoji: EmojiClickData) => {
    setMessage(message + emoji.emoji);
  };

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger>
              <Smile
                size={"20px"}
                className="text-accent1 hover:text-primary"
              />
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
