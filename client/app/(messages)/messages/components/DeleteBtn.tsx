"use client";
import supabase from "@/app/lib/supabase/supabase";
import { MessageType } from "@/app/lib/types/conversation.types";

import { Trash } from "lucide-react";

interface DeleteBtnProps {
  conversationId: string;
  messageId: string;
}

export default function DeleteBtn({
  conversationId,
  messageId,
}: DeleteBtnProps) {
  async function deleteMessage() {
    const { data, error } = await supabase
      .from("Conversations")
      .select("messages")
      .eq("id", conversationId);
    if (error) console.error(error);
    if (data) {
      const messages: MessageType[] = data[0].messages;
      const index = messages.indexOf(
        messages.find((message) => message.id === messageId) as MessageType
      );
      messages[index] = {
        ...messages[index],
        message: "This message was deleted",
        deleted: true,
      };
      const { error: updateError } = await supabase
        .from("Conversations")
        .update({ messages })
        .eq("id", conversationId);
      if (updateError) console.error(updateError);
    }
  }

  return (
    <button
      className="flex items-center w-full gap-5 hover:text-red-500"
      onClick={deleteMessage}
    >
      <Trash size={"16px"} className="text-red-500" />
      Delete
    </button>
  );
}
