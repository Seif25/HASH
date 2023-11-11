import { currentUser } from "@clerk/nextjs";
import UserConversationsPage from "./components/UserConversationsPage";
import { fetchUser } from "@/lib/actions/user.actions";

export default async function Page() {
  const user = await currentUser();
  const loggedInUser = await fetchUser(user?.username ?? "");
  return (
    <div>
      {loggedInUser && <UserConversationsPage loggedInUser={loggedInUser} />}
    </div>
  );
}
