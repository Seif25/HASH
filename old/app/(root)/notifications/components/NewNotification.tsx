"use client";

import { createNotification } from "@/lib/actions/notification.actions";

export default function NewNotification({
  currentUser,
}: {
  currentUser: string;
}) {
  const handleNew = async () => {
    await createNotification({
      user: currentUser,
      message: "This is a test notification",
      type: "users",
      link: "/notifications",
      source: "hash",
    });
  };

  return (
    <div>
      <button onClick={handleNew}>Add New Notification</button>
    </div>
  );
}
