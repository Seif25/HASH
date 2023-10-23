"use server"
import NotificationModel from "../models/notification.model";
import { initializeMongoConnection, isConnected } from "../mongoose.middleware";
import { revalidatePath } from "next/cache";
import { DetailedNotificationType, NewNotificationType, NotificationType } from "@/utils/types/notification.types";

async function connectToDB() {
    if (!isConnected) {
      await initializeMongoConnection();
    }
  }

export async function getNotifications(username: string){
    await connectToDB()

    try {
       return await NotificationModel.find({ user: username }) as NotificationType[]
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function getDetailedNotifications(username: string){
    await connectToDB()

    try {
       const notificationsQuery =  NotificationModel.find({ user: username }).populate({
         path: "source",
         model: "User",
         foreignField: "username",
         select: "name username image verified following followers bio"
       })

       const notifications = (await notificationsQuery.exec()) as DetailedNotificationType[]

       return notifications
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function createNotification({ user, message, type, link, source }: NewNotificationType){
    await connectToDB()

    try {
        await NotificationModel.create({
            user,
            message,
            type,
            link,
            source
        })
        revalidatePath(`/notifications/${user}`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}