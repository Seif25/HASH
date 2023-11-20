"use client";

import { MessageType } from "@/app/lib/types/conversation.types";
import { Reply } from "lucide-react";

interface ReplyBtnProps {
  showReply: (value: boolean) => void;
  replyMessage: (value: MessageType) => void;
  message: MessageType;
}

export default function ReplyBtn({
  showReply,
  replyMessage,
  message,
}: ReplyBtnProps) {
  function handleReply() {
    showReply(true);
    replyMessage(message);
  }
  return (
    <button
      className="flex items-center w-full gap-5 hover:text-primary"
      onClick={handleReply}
    >
      <Reply size={"16px"} />
      Reply
    </button>
  );
}
