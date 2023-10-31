import ConversationWindow from "../components/ConversationWindow";

export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  return <ConversationWindow conversationId={params.conversationId} />;
}
