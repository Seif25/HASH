import { getRecommendedUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import RightSidebarContent from "./RightSidebarContent";

export default async function RightSidebar() {
  const user = await currentUser();
  const recommendedUsers = await getRecommendedUsers(user?.username ?? ""); //TODO: Add username and implement recommendation system

  return (
    <RightSidebarContent recommendedUsers={recommendedUsers} />
  );
}
