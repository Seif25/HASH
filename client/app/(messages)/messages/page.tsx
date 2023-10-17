import { getRecipients } from "@/lib/actions/user.actions";
import { UserSummary } from "@/utils/types/user.types";
import supabase from "@/utils/supabase/supabase"
import Conversations from "../components/Conversations";
import { ConversationsType } from "@/utils/types/messages.types";

export const revalidate = 0

export default async function Messages() {

  const { data: chats, error } = await supabase.from("Chats").select();
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
    <div className="flex w-full bg-accent2 rounded-xl">
      <div className="w-[40%] p-5 rounded-l-xl">
        <Conversations initialConversations={_chats ?? []} />
      </div>
      <div className="w-[60%] flex items-center justify-center font-bold text-[20px] p-5 rounded-r-xl">
        Start a New Conversation
      </div>
    </div>
  );
}
