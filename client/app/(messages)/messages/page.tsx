import { getRecipients } from "@/lib/actions/user.actions";
import { UserSummary } from "@/utils/types/user.types";
import supabase from "@/utils/supabase/supabase";
import { ConversationsType } from "@/utils/types/messages.types";
import { currentUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Image from "next/image";

const Conversations = dynamic(() => import("@/app/(messages)/components/Conversations"), {ssr: false})
const NewConversation = dynamic(() => import("@/app/(messages)/components/NewConversation"), {ssr: false})

export const revalidate = 0;

export default async function Messages() {
  const user = await currentUser();

  const { data: chats, error } = await supabase.from("Chats").select().or(`sender.eq.${user?.username},recipient.eq.${user?.username}`);
  if (error) console.log(error)
  let _recipients: UserSummary[] | undefined;
  let _chats: ConversationsType[] | undefined;

  if (chats) {
    const recipients = chats.map((chat) => chat.recipient);
    _recipients = await getRecipients(recipients);
    // merge chats and recipients into one array of objects using the username
    _chats = chats?.map((chat) => {
      const recipient = _recipients?.find(
        (recipient) => recipient.username === chat.recipient
      );
      return {
        ...chat,
        recipient,
      };
    });
  }

  return (
    <div className="flex w-full bg-accent2 lg:rounded-xl">
      {
        process.env.NODE_ENV === "development" && (
          <p className="text-red-500">
            {error?.message}
          </p>
        )
      }
      <div className="w-full lg:w-[40%] p-5 rounded-l-xl">
        <Conversations
          initialConversations={_chats ?? []}
          username={user?.username ?? ""}
        />
      </div>
      <div className="hidden lg:w-[60%] lg:flex items-center justify-center h-auto gap-2 font-bold text-[20px] p-5 rounded-r-xl lg:border-l border-accent1/10 lg:rounded-r-xl">
        <Image src={"/logo.png"} alt="Hash" width={128} height={128} className="opacity-50" />
        {/* <NewConversation username={user?.username ?? ""} /> */}
      </div>
    </div>
  );
}
