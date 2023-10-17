import { ConversationsType } from "@/utils/types/messages.types";
import type { Metadata, ResolvingMetadata } from "next";
import { UserSummary } from "@/utils/types/user.types";
import supabase from "@/utils/supabase/supabase";
import { getRecipients } from "@/lib/actions/user.actions";
import dynamic from "next/dynamic";
const Conversations = dynamic(() => import("@/app/(messages)/components/Conversations"), { ssr: false});
const ConversationWindow = dynamic(() => import("@/app/(messages)/components/ConversationWindow"), { ssr: false })

type Props = {
  params: { conversationId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 0;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const conversationId = params.conversationId;

  return {
    title: `Conversation on Hash: ${conversationId}`,
  };
}

export default async function Conversation({
  params,
}: {
  params: { conversationId: string };
}) {
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
      <div className="w-[30%] p-5 rounded-l-xl">
        <Conversations initialConversations={_chats ?? []} selectedConversation={params.conversationId} />
      </div>
      <div className="w-[70%] border-l border-accent1/10 rounded-r-xl">
        <ConversationWindow id={params.conversationId} />
      </div>
    </div>
  );
}
