import { User } from "./user.types";

export type NotificationType = {
    user: string;
    message: string;
    read: boolean;
    link: string;
    type: string;
    source: string;
    createdAt: Date;
}

export type NewNotificationType = Omit<NotificationType, "createdAt" | "read">;

export type DetailedNotificationType = Omit<NotificationType, "source"> & {
    source: User
}