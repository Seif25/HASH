"use client";

import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { NotificationType } from "@/app/lib/types/notification.types";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ClockIcon, FunnelIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { groupNotifications } from "@/app/utils/functions/functions";

export default function NotificationComponent({
  notifications,
  notificationLength,
}: {
  notifications: NotificationType[];
  notificationLength: number;
}) {
  const [limit, setLimit] = useState<number>(5);
  const [groupedNotifications, setGroupedNotifications] = useState<
    NotificationType[][]
  >([]);

  useEffect(() => {
    //   group similar notifications together based on link
    const grouped = groupNotifications(notifications) as NotificationType[][];

    setGroupedNotifications(grouped);

    return () => {
      setGroupedNotifications([]);
    };
  }, [notifications]);

  function handleViewMore() {
    setLimit(limit + 5);
  }

  return (
    <Card className="w-full text-accent2 dark:text-accent1 bg-white dark:bg-dark border-none">
      <CardHeader>
        <CardTitle className="text-[16px]">Notifications</CardTitle>
        <CardDescription className="text-accent2/50 dark:text-accent1/50">
          You have {notificationLength} unread messages.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {notificationLength > 0 && (
          <div className="flex justify-between items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-40 h-7">
                  <FunnelIcon className="size-4 mr-2" />
                  Filter by type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Like</DropdownMenuItem>
                <DropdownMenuItem>Mention</DropdownMenuItem>
                <DropdownMenuItem>Reply</DropdownMenuItem>
                <DropdownMenuItem>Repost</DropdownMenuItem>
                <DropdownMenuItem>Follow</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-40 h-7">
                  <ClockIcon className="size-4 mr-2" />
                  Filter by time
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>Last hour</DropdownMenuItem>
                <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
                <DropdownMenuItem>Last week</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {notificationLength === 0 && (
          <div className="flex items-center text-heading text-accent2 dark:text-accent1">
            <p>You are all caught up!</p>
          </div>
        )}
        {groupedNotifications
          .slice(0, limit)
          .map((notification: NotificationType[]) => (
            <Link
              href={notification[0].link}
              key={notification[0]._id.toString()}
            >
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                <div className="flex items-start justify-between">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium">
                      {notification.length === 1
                        ? `@${notification[0].source.username} ${notification[0].message}`
                        : `@${notification[0].source.username} and ${
                            notification.length - 1
                          } others ${notification[0].message}`}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {moment(notification.at(-1)?.createdAt).fromNow()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {notification.slice(0, 3).map((media) => (
                      <Avatar
                        className="rounded-full bg-dark size-4"
                        key={media._id}
                      >
                        <AvatarImage
                          src={media.source.image}
                          alt={media.source.name}
                        />
                        <AvatarFallback>
                          {media.source.name
                            .split(" ")[0]
                            .substring(0, 1)
                            .toUpperCase()}
                          {media.source.name
                            .split(" ")
                            .at(-1)
                            ?.substring(0, 1)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        {notificationLength > 5 && limit < groupedNotifications.length && (
          <div className="flex items-center justify-center">
            <button
              onClick={handleViewMore}
              className="text-primary underline underline-offset-4 text-paragraph hover:font-bold bg-transparent border-none outline-none transition-all ease-in-out duration-100"
            >
              View More
            </button>
          </div>
        )}
      </CardContent>
      {/* {JSON.stringify(groupedNotifications, null, 2)} */}
    </Card>
  );
}
