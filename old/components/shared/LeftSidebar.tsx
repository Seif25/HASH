import { currentUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { getNotifications } from "@/lib/actions/notification.actions";
import { NotificationType } from "@/utils/types/notification.types";

const NavigationContent = dynamic(() => import("./NavigationContent"), {
  ssr: false,
});

export const revalidate = 1;

async function LeftSidebar() {
  const user = await currentUser();
  let notifications: NotificationType[] = [];
  if (user) {
    notifications = await getNotifications(user?.username ?? "");
  }
  return (
    <>
      {user && (
        <NavigationContent
          username={user?.username ?? ""}
          type="left"
          notifications={notifications}
        />
      )}
    </>
  );
}

export default LeftSidebar;
