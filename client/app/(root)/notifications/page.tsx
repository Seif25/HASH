import { fetchUserNotificationsAction } from "@/app/lib/actions/notification/notification.actions";
import { NotificationType } from "@/app/lib/types/notification.types";
import { groupNotifications } from "@/app/utils/functions/functions";
import { Toggle } from "@/components/ui/toggle";
import { currentUser } from "@clerk/nextjs";
import {
  AtSign,
  BadgeCheck,
  Heart,
  MessageCircle,
  Repeat2,
  UserPlus2,
} from "lucide-react";
import SingleNotification from "./components/SingleNotification";
import GroupedNotification from "./components/GroupedNotification";
import Link from "next/link";
import RemoveNotification from "./components/RemoveNotification";

const toggleOptions = [
  { label: "Mentions", value: "mentions", icon: <AtSign size={16} /> },
  { label: "Replies", value: "replies", icon: <MessageCircle size={16} /> },
  { label: "Likes", value: "likes", icon: <Heart size={16} /> },
  { label: "Retweets", value: "retweets", icon: <Repeat2 size={16} /> },
  { label: "Follows", value: "follows", icon: <UserPlus2 size={16} /> },
  { label: "Verified", value: "verified", icon: <BadgeCheck size={16} /> },
];

export default async function Page() {
  const user = await currentUser();
  const notifications: NotificationType[] = await fetchUserNotificationsAction(
    user?.username ?? ""
  );

  const groupedNotifications = groupNotifications(
    notifications
  ) as NotificationType[][];

  return (
    <div className="bg-accent2 my-5 rounded-2xl w-full p-5">
      <h1 className="text-heading font-bold mb-5">Notifications</h1>
      {/* <div className="grid grid-cols-3 lg:flex items-center gap-5">
        {toggleOptions.map((option) => (
          <Toggle
            aria-label={option.label}
            key={option.value}
            value={option.value}
            name="notifications"
            className="my-2"
            size={"sm"}
          >
            {option.icon} {option.label}
          </Toggle>
        ))}
      </div> */}
      <div className="flex flex-col gap-5">
        {groupedNotifications.map(
          (group: NotificationType[], index: number) => (
            <div
              className="flex flex-col rounded-2xl bg-dark"
              key={`group-${index}`}
            >
              <RemoveNotification type={group[0].type} link={group[0].link} />
              <Link href={group[0]?.link ?? "#"} className="w-full px-5 pb-5">
                {group.length > 1 ? (
                  <GroupedNotification group={group ?? []} />
                ) : (
                  <SingleNotification notification={group[0]} />
                )}
              </Link>
            </div>
          )
        )}
      </div>
      {/* <pre className="grid grid-cols-2 gap-10">
        <code>{JSON.stringify(groupedNotifications, null, 2)}</code>
        <code>{JSON.stringify(groupedLikes, null, 2)}</code>
      </pre> */}
    </div>
  );
}
