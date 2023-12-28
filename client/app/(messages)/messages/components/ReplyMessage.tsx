"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ReplyMessageProps {
  sender: string;
  replyMessage: string;
  replyId: string;
  message: string;
  color: string;
  rounded: string;
}

export default function ReplyMessage({
  sender,
  replyMessage,
  replyId,
  message,
  color,
  rounded,
}: ReplyMessageProps) {
  const [showMore, setShowMore] = useState<boolean>(false);
  function handleScroll() {
    const element = document.getElementById(replyId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      element.classList.add("animate-pulse");

      setTimeout(() => {
        element.classList.remove("animate-pulse");
      }, 3000);
    }
  }
  return (
    <div
      className={`flex flex-col gap-2 ${rounded} p-2 w-auto max-w-80 select-none ${color}`}
    >
      <div
        className="flex flex-col flex-grow border-l-accent1 border-l-4 pl-2 cursor-pointer"
        onClick={handleScroll}
      >
        <h1 className="text-body text-accent1">@{sender}</h1>
        <p className="text-[14px] text-accent1/50">
          {replyMessage.length > 250
            ? replyMessage.slice(0, 250) + "..."
            : replyMessage}
        </p>
      </div>
      <div>
        {message.length > 250 ? (
          <p
            className={`${rounded} gap-1 text-accent1 w-auto max-w-80 p-2 select-none ${color}`}
          >
            {showMore ? message : message.slice(0, 250) + "..."}
            <Button
              variant={"link"}
              className="text-[12px] font-bold underline"
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </p>
        ) : (
          <p
            className={`${rounded} text-accent1 w-auto max-w-80 max-h-20 p-2 select-none line-clamp-6 overflow-y-hidden`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
