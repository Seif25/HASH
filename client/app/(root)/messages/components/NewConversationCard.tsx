import { SummarizedUserType } from "@/app/lib/types/user.types";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

interface NewConversationCardProps {
  user: SummarizedUserType;
}

export default function NewConversationCard({
  user,
}: NewConversationCardProps) {
  return (
    <div className="flex items-center cursor-pointer">
      <Image
        src={user.image}
        alt={user.name}
        width={32}
        height={32}
        className="rounded-full object-cover"
      />
      <div className="flex flex-col ml-5">
        <div className="flex items-center gap-1">
          <h3 className="text-body text-accent1">{user.name}</h3>
          {user.verified && <BadgeCheck size={16} className="text-primary" />}
        </div>
        <span className="text-[12px] text-accent1/50">@{user.username}</span>
      </div>
    </div>
  );
}
