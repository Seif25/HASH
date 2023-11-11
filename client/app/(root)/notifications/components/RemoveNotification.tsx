"use client";

import { removeNotificationAction } from "@/app/lib/actions/notification/notification.actions";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function RemoveNotification({
  type,
  link,
}: {
  type: string;
  link: string;
}) {
  const pathname = usePathname();

  async function remove() {
    await removeNotificationAction({
      type,
      link,
      pathname,
    });
    // alert(JSON.stringify({ type, link, pathname }));
  }
  return (
    <Button
      className="self-end hover:text-red-500"
      size={"icon"}
      variant={"icon"}
      onClick={remove}
    >
      <X size={12} />
    </Button>
  );
}
