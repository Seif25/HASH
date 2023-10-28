import { Metadata, ResolvingMetadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import { getDetailedNotifications } from "@/lib/actions/notification.actions";
import NotificationCard from "../components/NotificationCard";
import { DetailedNotificationType } from "@/utils/types/notification.types";

const NewNotification = dynamic(() => import("../components/NewNotification"), {
  ssr: false,
});

export const revalidate = 1;

type Props = {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  return {
    title: `@${params.userId} / Notifications on Hash`,
    description: `@${params.userId} Notifications Page on Hash.`,
  };
}

export default async function Notifications({
  params,
}: {
  params: { userId: string };
}) {
  const notifications = await getDetailedNotifications(params.userId);
  return (
    <div className="flex flex-col gap-5 p-5 max-h-screen custom-scrollbar overflow-y-scroll shadow-none rounded-xl">
      <h3 className="text-heading1-bold">Notifications</h3>
      {/* <NewNotification currentUser={user?.username ?? ""} /> */}
      {notifications && (
        <div className="flex flex-col gap-5">
          {notifications.map(
            (notification: DetailedNotificationType, index: number) => (
              <NotificationCard
                key={`notification-${notification.user}-${index}`}
                user={notification.user}
                message={notification.message}
                type={notification.type}
                link={notification.link}
                read={notification.read}
                createdAt={notification.createdAt}
                sourceName={notification.source?.name}
                sourceUsername={notification.source?.username}
                image={notification.source?.image}
              />
            )
          )}
        </div>
      )}
      {/* <pre>
        <code>{JSON.stringify(notifications, null, 2)}</code>
      </pre> */}
    </div>
  );
}
