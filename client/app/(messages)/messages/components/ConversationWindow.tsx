"use client";

import supabase from "@/app/lib/supabase/supabase";
import {
  ConversationsType,
  MessageType,
} from "@/app/lib/types/conversation.types";
import {
  ImageIcon,
  MoreVertical,
  Phone,
  Reply,
  SendHorizontal,
  Video,
  X,
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
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { SummarizedHashType } from "@/app/lib/types/hash.types";
import { fetchSummarizedHashAction } from "@/app/lib/actions/hash/hash.actions";
import {
  CheckBadgeIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ArrowPathIcon,
  ChartBarIcon,
} from "@heroicons/react/16/solid";

import HashText from "@/app/components/shared/text/HashText";
import { HashCarousel2 } from "@/app/components/home/HashCarousel2";
import HashVideoPreview from "@/app/components/home/HashVideoPreview";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function ConversationWindow({
  loggedInUser,
  conversation,
  searchParams,
}: {
  loggedInUser: string;
  conversation: ConversationsType;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showHashSection, setShowHashSection] = useState<boolean>(false);
  const [messages, updateMessages] = useState<MessageType[]>(
    conversation.messages ?? []
  );

  const [hash, setHash] = useState<SummarizedHashType>();

  const [newMessage, changeMessage] = useState<string>("");

  const [showReplySection, setShowReplySection] = useState<boolean>(false);
  const [messageToReplyTo, replyToMessage] = useState<MessageType>();

  useEffect(() => {
    if (searchParams) {
      const hashId = searchParams.hash as string;
      if (hashId) {
        fetchSummarizedHashAction(hashId)
          .then((res) => {
            setHash(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    return () => {
      setHash(undefined);
    };
  }, [searchParams]);

  useEffect(() => {
    if (searchParams) {
      if (searchParams.hash) {
        setShowHashSection(true);
        setShowReplySection(false);
      }
    }

    return () => {
      setShowHashSection(false);
    };
  }, [searchParams]);

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
    if (newMessage.length > 0) {
      const generatedMessage: MessageType = {
        id: nanoid(),
        message: newMessage,
        sender: loggedInUser,
        timestamp: moment().toDate(),
        deleted: false,
        isReply: { replyTo: _replyData },
        hash: hash,
      };
      const data = [...messages, generatedMessage];
      const { error } = await supabase
        .from("Conversations")
        .update({ messages: data, last_update: moment().toDate() })
        .eq("id", conversation.id);
      changeMessage("");
      setShowReplySection(false);
      replyToMessage(undefined);
      if (hash) {
        handleRemoveHash();
      }
      if (error) throw new Error(error.message);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleRemoveHash() {
    setShowHashSection(false);
    setHash(undefined);
    router.push(pathname ?? "/messages");
  }

  return (
    <div className="w-full">
      {conversation && (
        <section className="flex flex-col items-center justify-center mt-5 w-full">
          {/* Recipient Information */}
          <nav className="top-20 p-5 h-[10vh] lg:h-[13vh] bg-white dark:bg-dark lg:rounded-t-xl w-full z-30 border-b border-accent2/10 dark:border-accent1/10">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                {/* Go Back */}
                <Link href="/messages" className="mr-5 self-center">
                  <EnvelopeIcon className="size-5 text-accent2 dark:text-accent1 hover:text-primary" />
                </Link>
                <Image
                  src={
                    conversation?.receiver?.image ?? "/assets/profile-pic.png"
                  }
                  alt={conversation?.receiver?.name ?? ""}
                  width={48}
                  height={48}
                  className="rounded-full size-10 object-cover"
                />
                <div className="flex flex-col justify-center ml-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-accent2 dark:text-accent1 text-body">
                      {conversation?.receiver?.name ?? ""}
                    </h3>
                    <CheckBadgeIcon className="text-primary size-4" />
                  </div>
                  <span className="text-accent2/50 dark:text-accent1/50 text-paragraph">
                    @{conversation.receiver?.username ?? ""}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <button>
                  <Phone className="text-accent2 dark:text-accent1 hover:text-primary size-5" />
                </button>
                <button>
                  <Video className="text-accent2 dark:text-accent1 hover:text-primary size-5" />
                </button>
                <button>
                  <MoreVertical className="text-accent2 dark:text-accent1 hover:text-primary size-5" />
                </button>
              </div>
            </div>
          </nav>
          {/* Conversation */}
          <div
            className={clsx(
              " flex flex-col gap-3 top-32 bg-white dark:bg-dark w-full pt-14 pb-10 px-5 overflow-y-scroll custom-scrollbar",
              showReplySection || showHashSection
                ? "h-[70vh] lg:h-[60vh] max-h-[70vh] lg:max-h-[60vh]"
                : "h-[80vh] lg:h-[68vh] max-h-[80vh] lg:max-h-[68vh]"
            )}
          >
            {messages?.map((message, index) => (
              <Message
                key={message.id}
                message={message}
                conversationId={conversation.id}
                color={
                  message.sender === loggedInUser
                    ? "gradient"
                    : "bg-emerald-700"
                }
                rounded={
                  message.sender === loggedInUser
                    ? `${
                        message.isReply ? "rounded-xl" : "rounded-full"
                      } rounded-tr-xl`
                    : `${
                        message.isReply ? "rounded-xl" : "rounded-full"
                      } rounded-tl-xl`
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
                hash={message.hash ?? undefined}
              />
            ))}
          </div>
          {/* Attached Hash Section */}
          {showHashSection && hash && (
            <div className="flex lg:px-5 justify-between bg-white dark:bg-dark border-t border-accent2/10 dark:border-accent1/10 bottom-[84px] lg:h-[50vh] h-[70vh] w-full py-1">
              <div className="lg:w-1/2 w-full h-full bg-accent1 dark:bg-accent2 lg:rounded-xl flex flex-col justify-between gap-5 p-5">
                {/* Author Information */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Image
                      src={hash.author.image ?? "/assets/profile-pic.png"}
                      alt={hash.author.username ?? ""}
                      width={32}
                      height={32}
                      className="rounded-full size-5 object-cover"
                    />
                    <h3 className="text-accent2 dark:text-accent1 text-[12px]">
                      {hash.author.name}
                    </h3>
                    <h3 className="text-accent2/50 dark:text-accent1/50 text-[12px]">
                      @{hash.author.username}
                    </h3>
                    <CheckBadgeIcon className="text-primary size-4" />
                  </div>
                  <div>
                    <h3 className="text-accent2/50 dark:text-accent1/50 text-[12px]">
                      {moment(hash.createdAt).fromNow()}
                    </h3>
                  </div>
                </div>
                {/* Hash Information */}
                <div className="flex flex-col gap-5">
                  {/* Hash Text */}
                  <div className="text-[12px] line-clamp-3">
                    <HashText text={hash.text} />
                  </div>
                  {/* Hash Media */}
                  <div className="h-auto lg:max-h-[150px] max-h-[250px]">
                    {hash.media.length > 0 && (
                      <div className="w-full h-auto flex items-center justify-center">
                        {hash.media[0].mediaType === "image" ? (
                          <div className="w-full h-auto aspect-square">
                            <Image
                              src={hash.media[0].url}
                              alt={hash.media[0].alt}
                              width={200}
                              height={200}
                              className="rounded-xl w-auto max-w-[350px] h-auto lg:max-h-[150px] max-h-[250px] object-cover bg-dark"
                            />
                          </div>
                        ) : hash.media[0].mediaType === "video" ? (
                          <div className="w-full h-auto aspect-video">
                            <HashVideoPreview
                              src={hash.media[0].url}
                              autoplay={false}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* Hash Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <ChatBubbleOvalLeftIcon className="text-accent2 dark:text-accent1 size-4" />
                    <h3 className="text-[12px] text-accent2 dark:text-accent1">
                      {hash.children?.length ?? 0}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <HeartIcon className="text-accent2 dark:text-accent1 size-4" />
                    <h3 className="text-[12px] text-accent2 dark:text-accent1">
                      {hash.likes?.length ?? 0}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowPathIcon className="text-accent2 dark:text-accent1 size-4" />
                    <h3 className="text-[12px] text-accent2 dark:text-accent1">
                      {hash.reposts?.length ?? 0}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChartBarIcon className="text-accent2 dark:text-accent1 size-4" />
                    <h3 className="text-[12px] text-accent2 dark:text-accent1">
                      {hash.views}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="items-start justify-end pt-5">
                <button onClick={handleRemoveHash}>
                  <X className="size-4 text-accent2 dark:text-accent1" />
                </button>
              </div>
            </div>
          )}
          {/* Reply Section */}
          {showReplySection && (
            <div className="flex items-center bg-white dark:bg-dark border-t border-accent2/10 dark:border-accent1/10 bottom-24 lg:bottom-[84px] h-[9vh] lg:h-[10vh] w-full py-1">
              <div className="flex items-center w-full">
                <Reply className="text-accent2 dark:text-accent1 mx-2 w-[5%] size-4" />
                <div className="flex flex-col flex-grow border-l-primary border-l-4 pl-2 w-[90%]">
                  <h1 className="text-body text-primary font-bold">
                    @{messageToReplyTo?.sender}
                  </h1>
                  <p className="text-[14px] text-accent2/50 dark:text-accent1/50 line-clamp-2">
                    {messageToReplyTo?.message}
                  </p>
                </div>
                <Button
                  size={"icon"}
                  variant={"icon"}
                  onClick={() => setShowReplySection(false)}
                  className="self-end justify-self-end mx-2 w-[5%]"
                >
                  <X className="text-accent2/50 dark:text-accent1/50 size-4" />
                </Button>
              </div>
            </div>
          )}
          {/* Textfield & Options */}
          <footer className="mb-10 bottom-5 flex items-center p-5 h-[10vh] bg-white dark:bg-dark lg:rounded-b-xl w-full border-t border-accent2/10 dark:border-accent1/10">
            <div className="flex items-center justify-between bg-white dark:bg-dark rounded-xl p-2 w-full">
              {/* Emoji & Image */}
              <div className="flex items-center gap-2">
                <EmojiBtn setMessage={changeMessage} />
                <button>
                  <ImageIcon className="text-accent2 dark:text-accent1 hover:text-primary size-4" />
                </button>
              </div>
              {/* Input Field */}
              <textarea
                className="bg-transparent w-full ring-0 outline-none border-none px-3 rounded-xl resize-none"
                rows={1}
                placeholder="Send a message..."
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
                value={newMessage}
              />
              <button onClick={sendMessage}>
                <SendHorizontal className="text-primary size-4" />
              </button>
            </div>
          </footer>
        </section>
      )}
    </div>
  );
}
