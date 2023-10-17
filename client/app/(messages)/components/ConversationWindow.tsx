"use client";

import { getRecipient } from "@/lib/actions/user.actions";
import supabase from "@/utils/supabase/supabase";
import { ConversationsType } from "@/utils/types/messages.types";
import { BadgeCheck } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const revalidate = 0;

export default function ConversationWindow({ id }: { id: string }) {
  const [conversation, setConversation] = useState<ConversationsType>();

  useEffect(() => {
    supabase
      .from("Chats")
      .select()
      .eq("id", id)
      .then(({ data, error }) => {
        if (data) {
          getRecipient(data[0].recipient).then((recipient) => {
            setConversation({
              ...data[0],
              recipient,
            });
          });
        }
        if (error) console.log(error);
      });
  }, [supabase, id, setConversation]);

  useEffect(() => {
    const channel = supabase.channel("new_message").on("postgres_changes", {
      event: "UPDATE",
      schema: "public",
      table: "Chats",
      filter: `id=eq.${id}`,
    }, (payload) => {
        const changes = {...conversation, messages: payload.new.messages}
        setConversation(changes as ConversationsType)
    }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, id, setConversation, conversation]);

  return (
    <div>
      {conversation && (
        <div className="flex flex-col gap-2">
          <Link href={`/profile/${conversation.recipient.username}`}>
            <div className="flex gap-2 items-center p-5">
              <Image
                src={conversation.recipient.image ?? "/assets/profile-pic.png"}
                alt={conversation.recipient.username}
                width={48}
                height={48}
                className="rounded-full bg-accent2"
              />
              <div className="flex flex-col">
                <h1 className="text-[16px] text-accent1 flex items-center gap-1">
                  {conversation.recipient.name}
                  {conversation.recipient.verified && (
                    <BadgeCheck size={"16px"} className="text-primary" />
                  )}
                </h1>
                <h1 className="font-bold text-[16px] text-accent1/50">
                  @{conversation.recipient.username}
                </h1>
              </div>
            </div>
          </Link>
          {conversation.messages.map((message, index) => (
            <div
              className={`flex flex-col justify-center px-5 py-2 w-full rounded-2xl ${
                message.sender === conversation.sender
                  ? "items-end"
                  : "items-start"
              }`}
            >
              <div
                className={`${
                  message.sender === conversation.sender
                    ? "bg-primary rounded-l-full rounded-tr-full rounded-br-md"
                    : "bg-emerald-500 rounded-r-full rounded-tl-full rounded-bl-md"
                } py-2 px-5 w-60 max-w-xs h-auto text-accent1`}
                key={`message-${index}`}
              >
                <h3>{message.message}</h3>
              </div>
              <p className="font-bold text-accent1/50 text-[12px]">
                {moment(message.timestamp).format("h:mm A")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
