"use client";

import { getRecipient } from "@/lib/actions/user.actions";
import supabase from "@/utils/supabase/supabase";
import { ConversationsType } from "@/utils/types/messages.types";
import { BadgeCheck, MessagesSquare, SendHorizontal } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const revalidate = 0;

export default function ConversationWindow({
  id,
  sender,
}: {
  id: string;
  sender: string;
}) {
  const [conversation, setConversation] = useState<ConversationsType>();
  const [message, setMessage] = useState<string>("");

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
    const channel = supabase
      .channel("new_message")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Chats",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          const changes = { ...conversation, messages: payload.new.messages };
          setConversation(changes as ConversationsType);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, id, setConversation, conversation]);

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }

  function handleAreaHeight(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.height =
      e.currentTarget.scrollHeight < 60
        ? e.currentTarget.scrollHeight + "px"
        : "60px";
    if (e.currentTarget.value === "") e.currentTarget.style.height = "auto";
  }

  async function sendMessage() {
    if (message.length > 0 && conversation) {
      const newMessage = {
        sender,
        message,
        timestamp: moment(),
      };
      let _data;
      if(conversation.messages) {
        _data = [...conversation.messages, newMessage];
      } else {
        _data = [newMessage];
      }
      setMessage("");
      const { error } = await supabase
        .from("Chats")
        .update({ messages: _data })
        .eq("id", id);
      if (error) throw new Error(error.message);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="h-[90vh] max-h-[90vh] lg:h-screen lg:max-h-screen custom-scrollbar">
      {conversation && (
        <div className="flex flex-col">
          {/* Recipient Information */}
          <div className="flex items-center justify-between border-b border-accent1/10 h-[10vh] max-h-[10vh] lg:h-[15vh] lg:max-h-[15vh]">
            <Link href={`/profile/${conversation.recipient.username}`}>
              <div className="flex gap-2 items-center p-5">
                <Image
                  src={
                    conversation.recipient.image ?? "/assets/profile-pic.png"
                  }
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
            <Link href={`/messages`} className="px-5 lg:hidden">
              <MessagesSquare size={"32px"} className="text-accent1" />
            </Link>
          </div>
          {/* Messages */}
          <div className="overflow-y-scroll custom-scrollbar h-[70vh] max-h-[70vh] lg:h-[75vh] lg:max-h-[75vh] bg-[#000a13] border-b border-accent1/10">
            {conversation.messages?.map((message, index) => (
              <div
                className={`flex flex-col justify-center px-5 py-2 w-full rounded-2xl ${
                  message.sender === sender ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`${
                    message.sender === sender
                      ? "bg-primary rounded-l-2xl rounded-tr-2xl rounded-br-sm"
                      : "bg-accent3/25 rounded-r-2xl rounded-tl-2xl rounded-bl-sm"
                  } py-2 px-5 w-auto max-w-xs h-auto text-accent1`}
                  key={`message-${index}`}
                >
                  <h3>{message.message}</h3>
                </div>
                <p className="font-bold text-accent1/50 text-[12px]">
                  {moment().calendar(message.timestamp)}
                </p>
              </div>
            ))}
          </div>
          {/* Message Text Area */}
          <div className="fixed bottom-[70px] z-50 bg-accent2 lg:bg-transparent lg:z-0 lg:relative lg:bottom-0 flex items-center justify-center w-full h-[10vh] max-h-[10vh]">
            <div className="flex items-center justify-between px-3 gap-2 bg-accent3/10 w-[80%] rounded-2xl">
              <textarea
                name="message"
                id="message"
                rows={1}
                onChange={handleMessageChange}
                onKeyUp={handleAreaHeight}
                onKeyDown={handleKeyDown}
                placeholder="Send a new message"
                value={message}
                className="bg-transparent min-h-8 h-full w-full py-2 px-3 ring-0 focus:ring-0 outline-none resize-none whitespace-pre-wrap break-words overflow-auto custom-scrollbar"
              />
              <button
                onClick={sendMessage}
                disabled={message.length === 0}
                className="text-primary disabled:text-accent1/50"
              >
                <SendHorizontal size={"16px"} className="text-inherit" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
