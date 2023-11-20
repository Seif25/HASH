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
}: MessageProps) {
  const reply = messages.find((msg) => msg.id === message.isReply?.replyTo);
  return (
    <div
      id={message.id}
      className={`flex flex-col justify-center w-full ${position}`}
    >
      {message.deleted ? (
        <div className="flex items-center justify-between text-accent1/50 w-auto max-w-80 p-2 select-none cursor-not-allowed">
          <AlertCircle size={"16px"} className="mr-2" />
          <p className="rounded-2xl flex items-center italic mr-5">
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
              <p
                className={`${rounded} text-accent1 w-auto max-w-80 p-2 select-none ${color}`}
              >
                {message.message}
              </p>
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
