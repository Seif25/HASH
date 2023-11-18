"use client";

import supabase from "@/app/lib/supabase/supabase";
import {
  ConversationsType,
  MessageType,
} from "@/app/lib/types/conversation.types";
import {
  BadgeCheck,
  ImageIcon,
  Mail,
  MoreVertical,
  Phone,
  SendHorizontal,
  Smile,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { nanoid } from "nanoid";
import { EmojiClickData } from "emoji-picker-react";
import moment from "moment";

export default function ConversationWindow({
  loggedInUser,
  conversation,
}: {
  loggedInUser: string;
  conversation: ConversationsType;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, updateMessages] = useState<MessageType[]>(
    conversation.messages ?? []
  );

  const [newMessage, changeMessage] = useState<string>("");

  useEffect(() => {
    // scroll to the end of the messages section
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  // Update messages in realtime
  useEffect(() => {
    const channel = supabase
      .channel("new_message")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Conversations",
          filter: `id=eq.${conversation.id}`,
        },
        (payload) => {
          updateMessages(payload.new.messages);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, conversation, messages, updateMessages]);

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    changeMessage(e.target.value);
  }

  async function sendMessage() {
    const generatedMessage: MessageType = {
      id: nanoid(),
      message: newMessage,
      sender: loggedInUser,
      timestamp: moment().toDate(),
    };
    const data = [...messages, generatedMessage];
    const { error } = await supabase
      .from("Conversations")
      .update({ messages: data, last_update: moment().toDate() })
      .eq("id", conversation.id);
    changeMessage("");
    if (error) throw new Error(error.message);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  const handleEmojiClick = (emoji: EmojiClickData) => {
    changeMessage(newMessage + emoji.emoji);
  };

  return (
    <>
      {conversation && (
        <div className="w-full flex items-center justify-center">
          {/* Recipient Information */}
          <nav className="fixed top-20 p-5 h-[10vh] lg:h-[13vh] bg-accent2 rounded-t-2xl w-full lg:w-[60%] z-30 border-b border-accent1/10">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                {/* Go Back */}
                <Link href="/messages" className="mr-5 self-center">
                  <Mail
                    size={"24px"}
                    className="text-accent1 hover:text-primary"
                  />
                </Link>
                <Image
                  src={
                    conversation?.receiver?.image ?? "/assets/profile-pic.png"
                  }
                  alt={conversation?.receiver?.name ?? ""}
                  width={48}
                  height={48}
                  className="rounded-full w-[48px] h-[48px] object-cover"
                />
                <div className="flex flex-col justify-center ml-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-accent1 text-heading">
                      {conversation?.receiver?.name ?? ""}
                    </h3>
                    <BadgeCheck size={"16px"} className="text-primary" />
                  </div>
                  <span className="text-accent1/50 text-paragraph">
                    @{conversation.receiver?.username ?? ""}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <button>
                  <Phone
                    size={"20px"}
                    className="text-accent1 hover:text-primary"
                  />
                </button>
                <button>
                  <Video
                    size={"20px"}
                    className="text-accent1 hover:text-primary"
                  />
                </button>
                <button>
                  <MoreVertical
                    size={"20px"}
                    className="text-accent1 hover:text-primary"
                  />
                </button>
              </div>
            </div>
          </nav>
          <div className="fixed flex flex-col gap-3 top-32 h-[80vh] lg:h-[68vh] bg-accent2 w-full lg:w-[60%] pt-14 pb-10 px-5 overflow-y-scroll custom-scrollbar">
            {messages.map((message, index) => (
              <Message
                key={message.id}
                message={message.message}
                color={
                  message.sender === loggedInUser ? "gradient" : "bg-zinc-700"
                }
                position={
                  message.sender === loggedInUser ? "items-end" : "items-start"
                }
                index={index}
                length={messages.length}
                messagesEndRef={messagesEndRef}
                timestamp={message.timestamp}
              />
            ))}
          </div>
          <footer className="fixed bottom-5 flex items-center p-5 h-[10vh] bg-accent2 rounded-b-2xl w-full lg:w-[60%] z-30 border-t border-accent1/10">
            <div className="flex items-center justify-between bg-dark rounded-2xl p-2 w-full">
              {/* Emoji & Image */}
              <div className="flex items-center gap-2">
                <button>
                  <Smile
                    size={"20px"}
                    className="text-accent1 hover:text-primary"
                  />
                </button>
                <button>
                  <ImageIcon
                    size={"20px"}
                    className="text-accent1 hover:text-primary"
                  />
                </button>
              </div>
              {/* Input Field */}
              <textarea
                className="bg-transparent w-full ring-0 outline-none border-none px-3 rounded-2xl resize-none"
                rows={1}
                placeholder="Send a message..."
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
              />
              <button onClick={sendMessage}>
                <SendHorizontal size={"20px"} className="text-primary" />
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
