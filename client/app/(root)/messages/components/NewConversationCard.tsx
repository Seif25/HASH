import supabase from "@/app/lib/supabase/supabase";
import { SummarizedUserType } from "@/app/lib/types/user.types";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NewConversationCardProps {
  user: SummarizedUserType;
  loggedInUser: string;
}

export default function NewConversationCard({
  user,
  loggedInUser,
}: NewConversationCardProps) {
  const router = useRouter();

  async function startNewConversation() {
    const { data, error } = await supabase
      .from("Conversations")
      .select("id, participant_1, participant_2")
      .or(`participant_1.eq.${user.username},participant_2.eq.${loggedInUser}`)
      .or(`participant_1.eq.${loggedInUser},participant_2.eq.${user.username}`);
    if (error) console.error(error);
    if (data) {
      if (data?.length > 0) {
        router.push(`/messages/${data[0].id}`);
      } else {
        const { data: newConversation, error: newConversationError } =
          await supabase
            .from("Conversations")
            .upsert({
              participant_1: loggedInUser,
              participant_2: user.username,
              messages: [],
              created_at: new Date(),
              last_update: new Date(),
              opened: false,
              unread_messages: 0,
              archived: false,
            })
            .select();
        if (newConversationError) console.error(newConversationError);
        if (newConversation) {
          router.push(`/messages/${newConversation[0].id}`);
        }
      }
    }
  }

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={startNewConversation}
    >
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
