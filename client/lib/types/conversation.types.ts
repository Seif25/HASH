export type ConversationType = {
  id: string;
  name: string;
  image: string;
  messages: string[];
  read: boolean;
  unReadMessages: number;
  lastUpdated: Date;
};
