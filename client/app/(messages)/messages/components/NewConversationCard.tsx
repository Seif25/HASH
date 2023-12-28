import supabase from "@/app/lib/supabase/supabase";
import { SummarizedUserType } from "@/app/lib/types/user.types";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NewConversationCardProps {
  user: SummarizedUserType;
  loggedInUser: string;
  customUrl?: string;
  setOpen?: (value: boolean) => void;
}

export default function NewConversationCard({
  user,
  loggedInUser,
  customUrl,
  setOpen,
}: NewConversationCardProps) {
  const router = useRouter();

  async function startNewConversation(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (setOpen) setOpen(false);
    const { data, error } = await supabase
      .from("Conversations")
      .select("id, participant_1, participant_2");
    if (error) console.error(error);
    if (data) {
      console.log(data);
      if (data.length > 0) {
        const condition1 =
          data[0].participant_1 === loggedInUser &&
          data[0].participant_2 === user.username;
        const condition2 =
          data[0].participant_1 === user.username &&
          data[0].participant_2 === loggedInUser;
        if (condition1 || condition2) {
          const url = customUrl
            ? `/messages/${data[0].id}${customUrl}`
            : `/messages/${data[0].id}`;
          router.push(url);
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
            const url = customUrl
              ? `/messages/${newConversation[0].id}${customUrl}`
              : `/messages/${newConversation[0].id}`;
            router.push(url);
          }
        }
      }
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
        const url = customUrl
          ? `/messages/${newConversation[0].id}${customUrl}`
          : `/messages/${newConversation[0].id}`;
        router.push(url);
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
        className="rounded-full object-cover size-10"
      />
      <div className="flex flex-col ml-5">
        <div className="flex items-center gap-1">
          <h3 className="text-body text-accent2 dark:text-accent1">
            {user.name}
          </h3>
          {user.verified && <CheckBadgeIcon className="size-4 text-primary" />}
        </div>
        <span className="text-[12px] text-accent2/50 dark:text-accent1/50">
          @{user.username}
        </span>
      </div>
    </div>
  );
}
