"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import { getRecipient } from "@/lib/actions/user.actions";
import supabase from "@/utils/supabase/supabase";
import { ConversationsType } from "@/utils/types/messages.types";
import {
  ArrowLeft,
  BadgeCheck,
  ImageIcon,
  MoreVertical,
  Reply,
  SendHorizontal,
  Smile,
  Video,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import PhoneCall from "./PhoneCall";

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
  const replySection = useRef<HTMLParagraphElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll to the end of the messages section
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

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
      if (conversation.messages) {
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

  const handleCloseReply = () => {
    if (replySection.current) {
      replySection.current.classList.add("hidden");
    }
  };

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setMessage(message + emoji.emoji);
  };

  return (
    <div className="h-[90vh] max-h-[90vh] lg:h-full lg:min-h-screen lg:max-h-full custom-scrollbar">
      {conversation && (
        <div className="flex flex-col">
          {/* Recipient Information */}
          <div className="fixed top-0 lg:relative bg-accent2 w-full flex items-center justify-between border-b border-accent1/10 h-[10vh] max-h-[10vh] lg:h-[15vh] lg:max-h-[15vh]">
            {/* Back Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/messages`} className="px-5">
                    <ArrowLeft
                      size={"20px"}
                      className="text-accent1 hover:text-primary"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="text-[12px] font-bold bg-accent2 border-none text-accent1">
                  Conversations
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Recipient Information */}
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
            {/* Phone, Video */}
            <div className="flex items-center gap-5 px-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PhoneCall />
                  </TooltipTrigger>
                  <TooltipContent className="text-[12px] font-bold bg-accent2 border-none text-accent1">
                    {`Call @${conversation.recipient.username}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button id="leave">
                      <PhoneMissed size={"20px"} className="text-red-500" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="text-[12px] font-bold bg-accent2 border-none text-accent1">
                    {`Call @${conversation.recipient.username}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button id="join-video-call">
                      <Video
                        size={"20px"}
                        className="text-accent1 hover:text-primary"
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="text-[12px] font-bold bg-accent2 border-none text-accent1">
                    {`Video Call @${conversation.recipient.username}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button>
                      <MoreVertical
                        size={"20px"}
                        className="text-accent1 hover:text-primary"
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="text-[12px] font-bold bg-accent2 border-none text-accent1">
                    {`More`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {/* Messages */}
          <div
            id="messages-section"
            className="overflow-y-scroll custom-scrollbar mt-[12vh] lg:mt-0 h-[75vh] max-h-[75vh] bg-[#000a13] border-b border-accent1/10"
          >
            {conversation.messages?.map((message, index) => (
              <Message
                key={`message-${index}`}
                message={message}
                sender={sender}
                ref={
                  index === conversation.messages.length - 1
                    ? messagesEndRef
                    : null
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Reply Section */}
          <div
            id="reply-section"
            className={`hidden fixed bottom-[65px] z-50 lg:z-0 lg:relative lg:bottom-0 w-full h-[15vh] lg:h-[8vh] bg-primary/10 text-accent1 px-5`}
            ref={replySection}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Reply size={"16px"} className="text-primary" />
                <h3 id="reply-recipient" className="font-bold text-[14px]">
                  Replying to <span id="reply-to"></span>
                </h3>
              </div>
              <button onClick={handleCloseReply}>
                <X size={"16px"} className="text-accent1/10" />
              </button>
            </div>
            <h3 id="reply-message" className="w-full truncate"></h3>
          </div>
          {/* Message Text Area */}
          <div
            className={`fixed bottom-[70px] z-50 bg-accent2 lg:bg-transparent lg:z-0 lg:relative lg:bottom-0 flex flex-col items-center justify-center gap-2 w-full h-[8vh] lg:h-[10vh] max-h-[10vh]`}
          >
            <div className="w-full px-5">
              <div className="flex items-center justify-between px-3 gap-2 bg-accent3/10 w-full rounded-2xl">
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-accent1 hover:text-primary">
                        <Smile size={"16px"} className="text-inherit" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 flex items-center justify-center bg-transparent border-none p-0">
                      <EmojiPicker
                        theme={Theme.DARK}
                        emojiStyle={EmojiStyle.NATIVE}
                        onEmojiClick={(emoji) => handleEmojiClick(emoji)}
                      />
                    </PopoverContent>
                  </Popover>
                  <button className="text-accent1 hover:text-primary">
                    <ImageIcon size={"16px"} className="text-inherit" />
                  </button>
                </div>
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
        </div>
      )}
    </div>
  );
}
