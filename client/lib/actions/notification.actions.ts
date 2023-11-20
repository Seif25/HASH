"use server";
import {
  NewNotificationProps,
  NotificationType,
} from "@/app/lib/types/notification.types";
import NotificationModel from "../../app/lib/models/notification.model";
import {
  initializeMongoConnection,
  isConnected,
} from "../../app/lib/mongoose.middleware";
import { revalidatePath } from "next/cache";

async function connectToDB() {
  if (!isConnected) {
    await initializeMongoConnection();
  }
}

export async function getNotifications(username: string) {
  await connectToDB();

  try {
    return (await NotificationModel.find({
      user: username,
    })) as NotificationType[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getDetailedNotifications(username: string) {
  await connectToDB();

  try {
    const notificationsQuery = NotificationModel.find({
      user: username,
    }).populate({
      path: "source",
      model: "User",
      foreignField: "username",
      select: "name username image verified following followers bio",
    });

    const notifications =
      (await notificationsQuery.exec()) as NotificationType[];

    return notifications;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createNotification({
  user,
  message,
  type,
  link,
  source,
}: NewNotificationProps) {
  await connectToDB();

  try {
    await NotificationModel.create({
      user,
      message,
      type,
      link,
      source,
    });
    revalidatePath(`/notifications/${user}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
