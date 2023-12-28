"use server";
import {
  NewNotificationProps,
  NotificationType,
  NotificationWatchType,
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

export async function fetchNotificationsAction(username: string) {
  await connectToDB();

  try {
    return (await NotificationModel.find({
      user: username,
    }).sort({ createdAt: -1 })) as NotificationType[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getDetailedNotifications(username: string) {
  await connectToDB();

  try {
    const notificationsQuery = NotificationModel.find({
      user: username,
    })
      .populate({
        path: "source",
        model: "User",
        foreignField: "username",
        select: "name username image verified following followers bio",
      })
      .sort({ createdAt: -1 });

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

// export async function watchNotificationAction({
//   currentUser,
// }: {
//   currentUser: string;
// }) {
//   const notificationStream = NotificationModel.watch([
//     {
//       $match: {
//         "fullDocument.user": currentUser,
//         operationType: { $in: ["insert", "update", "replace"] },
//       },
//     },
//   ]);
//   notificationStream.on("change", (change) => {

//   });
//   notificationStream.close();
// }
