import { SummarizedUserType } from "./user.types";

export type ConversationType = {
  id: string;
  name: string;
  image: string;
  messages: string[];
  read: boolean;
  unReadMessages: number;
  lastUpdated: Date;
};

export type SupabaseConversationType = {
  id: string;
  participant_1: string;
  participant_2: string;
  messages: MessageType[];
  unread_messages: number;
  opened: boolean;
  archived: boolean;
  created_at: Date;
  last_update: Date;
};

export type ConversationsType = {
  id: string;
  participant_1: string;
  participant_2: string;
  messages: MessageType[];
  unread_messages: number;
  opened: boolean;
  archived: boolean;
  created_at: Date;
  last_update: Date;
  receiver?: SummarizedUserType;
};

export type MessageType = {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  deleted?: boolean;
  isReply?: { replyTo: string | null };
};
