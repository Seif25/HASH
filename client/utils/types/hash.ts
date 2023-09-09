import { User } from "./user";

export type MongoHash = {
  text: string;
  author: string;
  community: string | null;
  pathname: string;
};

export type HashCardProps = {
  id: string;
  _id: string
  content: string;
  currentUserId: string | undefined;
  parentId: string | null;
  createdAt: Date;
  community: string | null;
  comments: string[];
  author: User;
  media: Media[] | null;
};

export type Media = {
  url: string;
  alt: string;
  id: string;
}
