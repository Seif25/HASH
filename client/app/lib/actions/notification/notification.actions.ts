"use server";

import { revalidatePath } from "next/cache";
import NotificationModel from "../../models/notification.model";
import UserModel from "../../models/user.model";
import { NotificationType } from "@/app/lib/types/notification.types";

export async function fetchUserNotificationsAction(username: string) {
  return (await NotificationModel.find({ user: username })
    .sort({
      createdAt: -1,
    })
    .populate({
      path: "source",
      model: UserModel,
      foreignField: "username",
      select: "username name image verified",
    })) as NotificationType[];
}

export async function fetchNotificationCountAction(username: string) {
  return await NotificationModel.countDocuments({
    user: username,
  });
}

export async function removeNotificationAction({
  type,
  link,
  pathname,
}: {
  type: string;
  link: string;
  pathname: string;
}) {
  await NotificationModel.deleteMany({
    type,
    link,
  });
  revalidatePath(pathname);
}
