"use client";

import moment from "moment";
import { useClipboard } from "@reactuses/core";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Copy, Forward, Info, Reply, Trash } from "lucide-react";

interface MessageProps {
  message: {
    message: string;
    sender: string;
    timestamp: string;
  };
  sender: string;
  ref: any;
}

export default function Message({ message, sender, ref }: MessageProps) {
  const [text, copy] = useClipboard();

  const handleReplyDetails = () => {
    const replyDiv = document.getElementById("reply-section");
    if (replyDiv) {
      replyDiv.classList.remove("hidden");
    }
    const replyTo = document.getElementById("reply-to");
    if (replyTo) {
      replyTo.innerText = message.sender;
    }
    const replyMessage = document.getElementById("reply-message");
    if (replyMessage) {
      replyMessage.innerText = message.message;
    }
  };

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    // get the initial touch position
    const touch = e.touches[0];
    const startX = touch.clientX;
    e.currentTarget.dataset.startX = startX.toString();
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    // calculate the distance the user swiped in the x-axis only
    const touch = e.touches[0];
    const startX = parseInt(e.currentTarget.dataset.startX || "0");
    const deltaX = touch.clientX - startX;
    e.currentTarget.dataset.deltaX = deltaX.toString();
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    // get the distance the user swiped in the x-axis only
    const deltaX = parseInt(e.currentTarget.dataset.deltaX || "0");
    const distance = Math.abs(deltaX);
    if (distance >= 150) {
      handleReplyDetails();
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={`flex flex-col justify-center px-5 py-2 w-full rounded-2xl ${
            message.sender === sender ? "items-end" : "items-start"
          }`}
          ref={ref}
        >
          <div
            className="swipe-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Reply from Left */}
            <div className={`action left px-5`}>
              <Reply size={"20px"} className="text-primary" />
            </div>
            {/* Message */}
            <div
              className={`${
                message.sender === sender
                  ? "bg-primary rounded-l-2xl rounded-tr-2xl rounded-br-sm"
                  : "bg-accent3/25 rounded-r-2xl rounded-tl-2xl rounded-bl-sm"
              } py-2 px-5 w-auto max-w-xs h-auto text-accent1 swipe-element`}
            >
              <h3 className="select-none">{message.message}</h3>
            </div>
            {/* Reply from right */}
            <div className={`action right px-5`}>
              <Reply size={"20px"} className="text-primary" />
            </div>
          </div>
          <p className="font-bold text-accent1/50 text-[12px] select-none">
            {moment(message.timestamp).format("ddd hh:mm A")}
          </p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <button
            className="flex items-center justify-between gap-1"
            onClick={handleReplyDetails}
          >
            <Reply size={"16px"} className="text-accent1" />
            Reply
          </button>
        </ContextMenuItem>
        {message.sender === sender && (
          <ContextMenuItem>
            <button className="flex items-center justify-between gap-1">
              <Trash size={"16px"} className="text-red-500" />
              Delete
            </button>
          </ContextMenuItem>
        )}
        <ContextMenuItem>
          <button className="flex items-center justify-between gap-1">
            <Forward size={"16px"} className="text-accent1" />
            Forward
          </button>
        </ContextMenuItem>
        <ContextMenuItem>
          <button
            className="flex items-center justify-between gap-1"
            onClick={() => copy(message.message)}
          >
            <Copy size={"16px"} className="text-accent1" />
            Copy
          </button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
