"use client";

import { getRecipient } from "@/lib/actions/user.actions";
import supabase from "@/utils/supabase/supabase";
import { ConversationsType } from "@/utils/types/messages.types";
import { BadgeCheck } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewConversation from "./NewConversation";

interface ConversationsProps {
  initialConversations: ConversationsType[];
  selectedConversation?: string;
  username: string;
}

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1s ago",
    ss: "%ds ago",
    m: "1m ago",
    mm: "%dm ago",
    h: "1h ago",
    hh: "%dh ago",
    d: "1d ago",
    dd: "%dd ago",
    M: "1m ago",
    MM: "%dm ago",
    y: "1y ago",
    yy: "%dy ago",
  },
});

export const revalidate = 0;

export default function Conversations({
  initialConversations,
  selectedConversation = "",
  username,
}: ConversationsProps) {
  const [conversations, setConversations] =
    useState<ConversationsType[]>(initialConversations);

  // Add new conversations to the list
  useEffect(() => {
    const channel = supabase
      .channel("new_conversation")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Chats",
        },
        (payload) => {
          getRecipient(payload.new.recipient).then((recipient) => {
            const newConversation = { ...payload.new, recipient };
            setConversations((prev) => [
              ...prev,
              newConversation as ConversationsType,
            ]);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, conversations, setConversations]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-5 w-full">
        <h1 className="font-bold text-[20px] text-accent1">Conversations</h1>
        <NewConversation username={username} />
      </div>
      {conversations && (
        <>
          {conversations.length > 0 ? (
            <div className="flex flex-col gap-5 mt-5 w-full">
              {conversations.map((conversation, index) => (
                <Link
                  href={`/messages/${conversation.id}`}
                  key={"conversation-" + index}
                >
                  <div
                    className={`flex items-center gap-5 hover:bg-primary/10 rounded-xl p-3 cursor-pointer ${
                      selectedConversation === conversation.id &&
                      "bg-primary/10"
                    } w-full`}
                  >
                    <Link
                      href={`/profile/${conversation.recipient.username}`}
                      className="z-20"
                    >
                      <Image
                        src={
                          conversation.recipient.image ??
                          "/assets/profile-pic.png"
                        }
                        alt={conversation.recipient.username}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                    </Link>
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold text-[14px] text-accent1">
                            {conversation.recipient.name}
                          </h3>
                          {conversation.recipient.verified && (
                            <BadgeCheck
                              className="text-primary"
                              size={"16px"}
                            />
                          )}
                          <h3 className="text-accent1/50 font-bold text-[14px]">
                            @{conversation.recipient.username}
                          </h3>
                        </div>
                        <div>
                          <h3 className="text-accent1/50 font-bold text-[14px]">
                            {moment(conversation.created_at).fromNow()}
                          </h3>
                        </div>
                      </div>
                      {!selectedConversation && (
                        <h3 className="text-accent1/50 text-[14px] text-ellipsis w-44 truncate">
                          {conversation.messages?.at(-1)?.message ?? ""}
                        </h3>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="p-5 text-[16px]">{"No Conversations Yet!"}</p>
          )}
        </>
      )}
    </div>
  );
}
