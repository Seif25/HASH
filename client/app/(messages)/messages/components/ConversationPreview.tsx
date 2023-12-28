import { Badge } from "@/components/ui/badge";
import { ConversationsType } from "@/app/lib/types/conversation.types";
import moment from "moment";
import Image from "next/image";

interface ConversationPreviewProps {
  conversation: ConversationsType;
  bottom?: boolean;
}

export default function ConversationPreview({
  conversation,
  bottom,
}: ConversationPreviewProps) {
  return (
    <div
      className={`flex items-center justify-center gap-5 w-full ${
        !bottom && "border-b border-accent2/10 dark:border-accent1/10"
      } py-2 px-5 cursor-pointer`}
      key={conversation.id}
    >
      <Image
        src={conversation.receiver?.image ?? "/assets/profile-pic.png"}
        alt={conversation.receiver?.name ?? ""}
        width={48}
        height={48}
        className="rounded-full size-10 object-cover"
      />
      <div className="flex flex-col justify-center gap-1 w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-paragraph text-accent2 dark:text-accent1">
            {conversation.receiver?.name}
          </h3>
          <p className="text-accent2/50 dark:text-accent1/50 font-bold text-[12px]">
            {moment(conversation.last_update).isSame(moment(), "day")
              ? moment(conversation.last_update).format("hh:mm A")
              : moment(conversation.last_update).format("ddd - hh:mm A")}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-paragraph text-accent2/50 dark:text-accent1/50">
            {conversation.messages.at(-1)?.message}
          </h3>
          {conversation.unread_messages > 0 && !conversation.opened && (
            <Badge className="gradient rounded-full flex items-center justify-center w-5 max-w-auto h-5">
              {conversation.unread_messages}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
