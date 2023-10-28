export type ConversationsType = {
  id: string;
  created_at: string;
  seen: boolean;
  messages: MessageType[];
  sender: string;
  recipient: RecipientType;
};

export type RecipientType = {
  _id: string;
  followers: string[];
  following: string[];
  image: string;
  name: string;
  username: string;
  verified: boolean;
};

export type MessageType = {
  sender: string;
  message: string;
  timestamp: string
}
