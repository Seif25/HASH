import { currentUser } from "@clerk/nextjs";
import NotificationAlertComponent from "./NotificationAlertComponent";

export default async function NotificationAlert() {
  const user = await currentUser();

  fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/socket/notificationS`);
  //   const HOST =
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:3000"
  //       : process.env.URL;
  //   const res = await fetch(
  //     `${HOST}/api/notifications/watch?id=${user?.username}`
  //   );
  //   const data = await res.json();
  //   console.log("Notification watch: ");
  //   console.log(data);

  return <NotificationAlertComponent currentUser={user?.username ?? ""} />;
}
