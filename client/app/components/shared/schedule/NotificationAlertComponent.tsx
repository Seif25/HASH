"use client";

import { toast } from "sonner";
import { useState, useEffect } from "react";
import { NotificationType } from "@/app/lib/types/notification.types";

import { useRouter } from "next/navigation";
import { useSocket } from "@/app/providers/SocketProvider";
import { Badge } from "@/components/ui/badge";

export default function NotificationAlertComponent({
  currentUser,
}: {
  currentUser: string;
}) {
  const { isConnected, socket } = useSocket();

  const channelKey = `notification:${currentUser}:watch`;
  const router = useRouter();
  //   const [newNotification, setNewNotification] = useState<NotificationType>();

  useEffect(() => {
    if (isConnected) {
      socket.on(channelKey, (data: string) => {
        const newNotification = JSON.parse(data) as NotificationType;
        alert(newNotification.message);
        toast("New Notification", {
          description: `@${newNotification.source} ${newNotification.message}`,
          action: {
            label: "view",
            onClick: () => router.push(newNotification.link),
          },
        });
      });
    }
  }, [isConnected]);

  //   if (!isConnected) {
  //     return <Badge variant={"default"}>connected</Badge>;
  //   } else {
  //     return <Badge variant={"destructive"}>connecting...</Badge>;
  //   }
  return <div></div>;
}
