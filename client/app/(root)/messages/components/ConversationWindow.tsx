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
  Reply,
  SendHorizontal,
  Smile,
  Video,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { nanoid } from "nanoid";
import { EmojiClickData } from "emoji-picker-react";
import moment from "moment";
import EmojiBtn from "@/app/components/shared/triggers/EmojiBtn";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

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

  const [showReplySection, setShowReplySection] = useState<boolean>(false);
  const [messageToReplyTo, replyToMessage] = useState<MessageType>();

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
    let _replyData: string | null = null;
    if (showReplySection && messageToReplyTo) {
      _replyData = messageToReplyTo.id;
    }
    const generatedMessage: MessageType = {
      id: nanoid(),
      message: newMessage,
      sender: loggedInUser,
      timestamp: moment().toDate(),
      deleted: false,
      isReply: { replyTo: _replyData },
    };
    const data = [...messages, generatedMessage];
    const { error } = await supabase
      .from("Conversations")
      .update({ messages: data, last_update: moment().toDate() })
      .eq("id", conversation.id);
    changeMessage("");
    setShowReplySection(false);
    replyToMessage(undefined);
    if (error) throw new Error(error.message);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {conversation && (
        <div className="w-full flex items-center justify-center z-50">
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
          {/* Conversation */}
          <div
            className={clsx(
              "fixed flex flex-col gap-3 top-32 bg-accent2 w-full lg:w-[60%] pt-14 pb-10 px-5 overflow-y-scroll custom-scrollbar",
              showReplySection ? "h-[70vh] lg:h-[60vh]" : "h-[80vh] lg:h-[68vh]"
            )}
          >
            {messages.map((message, index) => (
              <Message
                key={message.id}
                message={message}
                conversationId={conversation.id}
                color={
                  message.sender === loggedInUser ? "gradient" : "bg-zinc-700"
                }
                rounded={
                  message.sender === loggedInUser
                    ? `${
                        message.isReply
                          ? "rounded-r-2xl rounded-tl-2xl"
                          : "rounded-r-full rounded-tl-full"
                      } rounded-bl-sm`
                    : `${
                        message.isReply
                          ? "rounded-l-2xl rounded-br-2xl"
                          : "rounded-l-full rounded-br-full"
                      } rounded-tr-sm`
                }
                position={
                  message.sender === loggedInUser ? "items-end" : "items-start"
                }
                index={index}
                length={messages.length}
                messagesEndRef={messagesEndRef}
                timestamp={message.timestamp}
                showReply={setShowReplySection}
                replyMessage={replyToMessage}
                messages={messages}
              />
            ))}
          </div>
          {/* Reply Section */}
          {showReplySection && (
            <div className="fixed flex items-center bg-accent2 border-t border-accent1/10 bottom-24 lg:bottom-[84px] h-[9vh] lg:h-[8vh] w-full lg:w-[60%]">
              <div className="flex items-center w-full">
                <Reply size={20} className="text-accent1 mx-2" />
                <div className="flex flex-col flex-grow border-l-primary border-l-4 pl-2">
                  <h1 className="text-body text-primary font-bold">
                    @{messageToReplyTo?.sender}
                  </h1>
                  <p className="text-[14px] text-accent1/50">
                    {messageToReplyTo?.message}
                  </p>
                </div>
                <Button
                  size={"icon"}
                  variant={"icon"}
                  onClick={() => setShowReplySection(false)}
                  className="self-end justify-self-end mx-2"
                >
                  <X size={20} className="text-accent1/50" />
                </Button>
              </div>
            </div>
          )}
          {/* Textfield & Options */}
          <footer className="fixed bottom-5 flex items-center p-5 h-[10vh] bg-accent2 rounded-b-2xl w-full lg:w-[60%] z-30 border-t border-accent1/10">
            <div className="flex items-center justify-between bg-dark rounded-2xl p-2 w-full">
              {/* Emoji & Image */}
              <div className="flex items-center gap-2">
                <EmojiBtn setMessage={changeMessage} />
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
                value={newMessage}
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
