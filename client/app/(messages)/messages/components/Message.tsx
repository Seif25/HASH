import moment from "moment";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import CopyBtn from "./CopyBtn";
import DeleteBtn from "./DeleteBtn";
import { MessageType } from "@/app/lib/types/conversation.types";
import { AlertCircle } from "lucide-react";
import ReplyBtn from "./ReplyBtn";
import ForwardBtn from "./ForwardBtn";
import ReplyMessage from "./ReplyMessage";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SummarizedHashType } from "@/app/lib/types/hash.types";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowPathIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftIcon,
  CheckBadgeIcon,
  HeartIcon,
} from "@heroicons/react/16/solid";
import HashText from "@/app/components/shared/text/HashText";

interface MessageProps {
  position: string;
  color: string;
  rounded: string;
  message: MessageType;
  timestamp: Date;
  length: number;
  index: number;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  conversationId: string;
  showReply: (value: boolean) => void;
  replyMessage: (value: MessageType) => void;
  messages: MessageType[];
  hash?: SummarizedHashType;
}

export default function Message({
  position,
  color,
  rounded,
  message,
  timestamp,
  length,
  index,
  messagesEndRef,
  conversationId,
  showReply,
  replyMessage,
  messages,
  hash,
}: MessageProps) {
  const reply = messages.find((msg) => msg.id === message.isReply?.replyTo);
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <div
      id={message.id}
      className={`flex flex-col justify-center w-full ${position}`}
    >
      {message.deleted ? (
        <div className="flex items-center justify-between text-accent2/50 dark:text-accent1/50 w-auto p-2 select-none cursor-not-allowed">
          <AlertCircle className="size-4 mr-2" />
          <p className="rounded-xl flex items-center italic text-[14px] mr-5">
            {message.message}
          </p>
          <span className="text-[10px] font-light">
            {moment(timestamp).isSame(moment(), "day")
              ? moment(timestamp).format("hh:mm A")
              : moment(timestamp).format("ddd - hh:mm A")}
          </span>
        </div>
      ) : (
        <ContextMenu>
          <ContextMenuTrigger>
            {message.isReply && reply ? (
              <ReplyMessage
                sender={reply?.sender}
                replyMessage={reply?.message}
                replyId={reply?.id}
                message={message.message}
                color={color}
                rounded={rounded}
              />
            ) : (
              <div className={`${rounded} ${color} w-auto max-w-80`}>
                {hash && (
                  <Link href={`/hash/${hash._id.toString()}`}>
                    <div
                      className={`flex flex-col gap-5 p-2 ${
                        color === "gradient" ? "bg-accent3" : "bg-emerald-800"
                      } ${rounded} shadow-lg`}
                    >
                      <div className="flex items-center gap-1">
                        <Image
                          src={hash.author.image ?? "/assets/profile-pic.png"}
                          alt={hash.author.username ?? ""}
                          width={32}
                          height={32}
                          className="rounded-full size-4 object-cover"
                        />
                        <h3 className="text-accent1 text-[12px]">
                          {hash.author.name}
                        </h3>
                        <h3 className="text-accent1/50 text-[12px]">
                          @{hash.author.username}
                        </h3>
                        <CheckBadgeIcon className="text-primary size-4" />
                      </div>
                      <div className="flex flex-col justify-between gap-1">
                        <div className="text-[12px] line-clamp-3 text-accent1">
                          <HashText text={hash.text} />
                        </div>
                        {hash.media.length > 0 && (
                          <p className="text-[12px] text-accent1/80 italic">
                            +{hash.media.length} Media
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <ChatBubbleOvalLeftIcon className="text-accent1 size-4" />
                            <h3 className="text-[12px] text-accent1">
                              {hash.children?.length ?? 0}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1">
                            <HeartIcon className="text-accent1 size-4" />
                            <h3 className="text-[12px] text-accent1">
                              {hash.likes?.length ?? 0}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1">
                            <ArrowPathIcon className="text-accent1 size-4" />
                            <h3 className="text-[12px] text-accent1">
                              {hash.reposts?.length ?? 0}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1">
                            <ChartBarIcon className="text-accent1 size-4" />
                            <h3 className="text-[12px] text-accent1">
                              {hash.views}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
                {message.message.length > 250 ? (
                  <p
                    className={`gap-1 text-accent1 w-auto max-w-80 p-2 line-clamp-4 select-none `}
                  >
                    {showMore
                      ? message.message
                      : message.message.slice(0, 250) + "..."}
                    <Button
                      variant={"link"}
                      className="text-[12px] font-bold underline"
                      onClick={() => setShowMore((prev) => !prev)}
                    >
                      {showMore ? "Show Less" : "Show More"}
                    </Button>
                  </p>
                ) : (
                  <p
                    className={`text-accent1 w-auto max-w-80 p-2 select-none overflow-y-hidden`}
                  >
                    {message.message}
                  </p>
                )}
              </div>
            )}
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <ForwardBtn />
            </ContextMenuItem>
            <ContextMenuItem>
              <ReplyBtn
                showReply={showReply}
                replyMessage={replyMessage}
                message={message}
              />
            </ContextMenuItem>
            <ContextMenuItem>
              <CopyBtn message={message.message} />
            </ContextMenuItem>
            <ContextMenuItem>
              <DeleteBtn
                conversationId={conversationId}
                messageId={message.id}
              />
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      )}
      {!message.deleted && (
        <span className="text-[10px] font-light text-accent1/50 px-2">
          {moment(timestamp).isSame(moment(), "day")
            ? moment(timestamp).format("hh:mm A")
            : moment(timestamp).format("ddd - hh:mm A")}
        </span>
      )}
      {length - 1 === index && <div ref={messagesEndRef} />}
    </div>
  );
}
