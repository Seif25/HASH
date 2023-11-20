import { SummarizedUserType } from "./user.types";

export type NotificationType = {
  _id: string;
  user: string;
  message: string;
  read: boolean;
  link: string;
  type: "like" | "mention" | "reply" | "repost" | "admin" | "follow";
  source: SummarizedUserType;
  createdAt: Date;
};

export type NotificationGroupedType = {
  like?: NotificationType[];
  reply?: NotificationType[];
  follow?: NotificationType[];
  mention?: NotificationType[];
  repost?: NotificationType[];
  admin?: NotificationType[];
};

export type NewNotificationProps = {
  user: string;
  message: string;
  link: string;
  type: "like" | "mention" | "reply" | "repost" | "admin" | "follow";
  source: string;
};
