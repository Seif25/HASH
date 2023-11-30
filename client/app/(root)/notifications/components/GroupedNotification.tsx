import { NotificationType } from "@/app/lib/types/notification.types";
import moment from "moment";
import Image from "next/image";

export default function GroupedNotification({
  group,
}: {
  group: NotificationType[];
}) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between gap-5 w-full">
        <div className="flex items-center gap-3">
          {group.slice(0, 4).map((image) => (
            <Image
              src={image.source.image}
              alt={image.source.username}
              width={32}
              height={32}
              className="rounded-full"
              key={image._id}
            />
          ))}
        </div>
        <p className="text-[12px] text-accent1/50 font-bold self-end">
          {moment(group.at(-1)?.createdAt).fromNow() ??
            moment(group[0].createdAt).fromNow()}
        </p>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1">
          <h1 className="font-bold text-body">
            {group[0].source.name} <span className="font-normal">and </span>
            {group.length > 2
              ? `${group.length - 1} others`
              : group[1].source.name}
          </h1>
          <h1 className="text-body">{group[0].message}</h1>
        </div>
      </div>
    </div>
  );
}
