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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Filter } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import { NotificationType } from "@/app/lib/types/notification.types";
import { getDetailedNotifications } from "@/lib/actions/notification.actions";
import moment from "moment";
import { groupNotifications } from "@/app/utils/functions/functions";
import Link from "next/link";

export default async function Page() {
  const user = await currentUser();
  const notifications: NotificationType[] = await getDetailedNotifications(
    user?.username ?? ""
  );

  //   group similar notifications together based on link
  const groupedNotifications = groupNotifications(
    notifications
  ) as NotificationType[][];

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full text-accent1 bg-accent2 border-none">
        <CardHeader>
          <CardTitle className="text-[16px]">Notifications</CardTitle>
          <CardDescription className="text-accent1/50">
            You have {notifications.length} unread messages.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex justify-between items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
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
                <Button variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
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
          {groupedNotifications.map((notification: NotificationType[]) => (
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
                        className="rounded-full bg-accent2"
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
        </CardContent>
        {/* {JSON.stringify(groupedNotifications, null, 2)} */}
      </Card>
    </div>
  );
}
