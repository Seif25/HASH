import { currentUser } from "@clerk/nextjs";
import { getUserInformation } from "@/lib/actions/user.actions";
import FloatingButtonDialog from "./FloatingButtonDialog";

export default async function FloatingButton() {
  const loggedInUser = await currentUser();
  const userInfo = await getUserInformation(loggedInUser?.username ?? "");
  return (
    <FloatingButtonDialog
      loggedInUser={loggedInUser?.username ?? ""}
      profilePic={userInfo?.image ?? "/assets/profile-pic.png"}
    />
  );
}
