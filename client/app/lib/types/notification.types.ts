import { Timestamp } from "mongodb";
import { SummarizedUserType } from "./user.types";
import { ObjectId } from "mongoose";

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

export type NotificationWatchType = {
  _id: {
    _data: string;
  };
  operationType: string;
  clusterTime: Timestamp;
  wallTime: Date;
  fullDocument: NotificationType;
  ns: { db: string; coll: string };
  documentKey: { _id: ObjectId };
};
