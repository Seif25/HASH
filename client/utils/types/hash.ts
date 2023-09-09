import { User } from "./user";

export type MongoHash = {
  text: string;
  author: string;
  community: string | null;
  pathname: string;
};

export type Hash = {
  _id: string;
  text: string;
  author: User;
  community: string | null;
  children: Hash[];
  createdAt: Date;
  media: Media[];
  likes: string[];
};

export type HashCardProps = {
  id: string;
  _id: string;
  content: string;
  currentUserId: string | undefined;
  parentId: string | null;
  createdAt: Date;
  community: string | null;
  comments: Hash[];
  author: User;
  media: Media[] | null;
  likes: string[];
};

export type Media = {
  url: string;
  alt: string;
  id: string;
};
