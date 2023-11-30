import { currentUser } from "@clerk/nextjs";
import ConversationWindow from "../components/ConversationWindow";
import { Metadata, ResolvingMetadata } from "next";
import supabase from "@/app/lib/supabase/supabase";
import { fetchReceiverInfoAction } from "@/app/lib/actions/user/user.actions";

type Props = {
  params: { conversationId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const user = await currentUser();

  return {
    title: `@${user?.username} Messages / Hash - ${params.conversationId}`,
  };
}

export default async function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const user = await currentUser();

  const { data, error } = await supabase
    .from("Conversations")
    .select()
    .eq("id", params.conversationId);
  if (error) console.error(error);

  const conversation = await fetchReceiverInfoAction({
    username: user?.username ?? "",
    conversations: data ?? [],
  });

  const { error: updateError } = await supabase
    .from("Conversations")
    .update({ opened: true })
    .eq("id", params.conversationId);
  if (updateError) console.error(updateError);

  return (
    <ConversationWindow
      loggedInUser={user?.username ?? ""}
      conversation={conversation[0]}
    />
  );
}
