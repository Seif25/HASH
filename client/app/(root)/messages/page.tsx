import { currentUser } from "@clerk/nextjs";
import UserConversationsPage from "./components/UserConversationsPage";
import { fetchUser } from "@/lib/actions/user.actions";
import {
  fetchReceiverInfoAction,
  fetchUserFollowingAction,
} from "@/app/lib/actions/user/user.actions";
import supabase from "@/app/lib/supabase/supabase";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const user = await currentUser();

  return {
    title: `@${user?.username} Messages / Hash`,
    description:
      "From breaking news and entertainment to sports and politics, get the full story with all the live commentary.",
    appleWebApp: true,
    applicationName: "Hash",
    creator: "Seif Ahmed",
    publisher: "Vercel",
  };
}

export const revalidate = 0;

export default async function Page() {
  const user = await currentUser();
  const loggedInUser = await fetchUser(user?.username ?? "");

  // Get user's following
  const following = await fetchUserFollowingAction(
    loggedInUser?.username ?? ""
  );

  // Get user's conversations from supabase
  const { data, error } = await supabase
    .from("Conversations")
    .select()
    .or(
      `participant_1.eq.${user?.username},participant_2.eq.${user?.username}`
    );
  if (error) console.error(error);
  // Get receiver's info from mongodb
  const conversations = await fetchReceiverInfoAction({
    username: user?.username ?? "",
    conversations: data ?? [],
  });

  return (
    <div>
      {loggedInUser && (
        <UserConversationsPage
          loggedInUser={loggedInUser}
          following={following}
          conversations={conversations}
        />
      )}
    </div>
  );
}
