import { Badge } from "@/components/ui/badge";
import { ConversationType } from "@/app/lib/types/conversation.types";
import moment from "moment";
import Image from "next/image";

interface ConversationPreviewProps {
  conversation: ConversationType;
  bottom?: boolean;
}

export default function ConversationPreview({
  conversation,
  bottom,
}: ConversationPreviewProps) {
  return (
    <div
      className={`flex items-center justify-center gap-5 w-full ${
        !bottom && "border-b border-accent1/10"
      } py-2 px-5 cursor-pointer`}
      key={conversation.id}
    >
      <Image
        src={conversation.image}
        alt={conversation.name}
        width={48}
        height={48}
        className="rounded-full w-[32px] h-[32px] object-cover"
      />
      <div className="flex flex-col justify-center gap-1 w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-heading text-accent1">{conversation.name}</h3>
          <p className="text-accent1/50 font-bold text-[12px]">
            {moment(conversation.lastUpdated).isSame(moment(), "day")
              ? moment(conversation.lastUpdated).format("hh:mm A")
              : moment(conversation.lastUpdated).format("ddd - hh:mm A")}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-body text-accent1/50">
            {conversation.messages.at(-1)}
          </h3>
          {conversation.unReadMessages > 0 && (
            <Badge className="gradient rounded-full flex items-center justify-center w-5 max-w-auto h-5">
              {conversation.unReadMessages}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
