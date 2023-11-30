import { NotificationType } from "@/app/lib/types/notification.types";
import { BadgeCheck } from "lucide-react";
import moment from "moment";
import Image from "next/image";

export default function SingleNotification({
  notification,
}: {
  notification: NotificationType;
}) {
  return (
    <div className="flex items-center gap-5 w-full">
      <Image
        src={notification?.source.image}
        alt={notification?.source.username}
        width={32}
        height={32}
        className="rounded-full"
      />
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1">
          <h1 className="font-bold text-body">{notification?.source.name} </h1>
          {notification?.source.verified && (
            <BadgeCheck size={16} className="text-primary" />
          )}
          <h1 className="text-body">{notification?.message}</h1>
        </div>
        <p className="text-[12px] text-accent1/50 font-bold self-end">
          {moment(notification?.createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
}
