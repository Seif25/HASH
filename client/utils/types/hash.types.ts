import { Query } from "mongoose";
import { User } from "./user.types";

// Type definitions for Hash

// * Types for creating a new hash
export type CreateHashParams = {
  text: string;
  username: string;
  community: string | null;
  pathname: string;
};

// * Types for adding a new comment
export type AddCommentParams = {
  author: string;
  parentId: string;
  text: string;
  community: string | null;
  pathname: string;
}

// * Types for liking a hash
export type LikeHashParams = {
  id: string;
  currentUser: string;
  pathname: string;
}

// * Types for reposting a hash
export type RepostHashParams = {
  id: string;
  currentUser: string;
  quote: string;
  pathname: string;
}

export type MongoHash = {
  text: string;
  author: string;
  community: string | null;
  pathname: string;
};

export type Hash = {
  parentId: string | null;
  _id: string;
  text: string;
  author: User;
  community: string | null;
  children: Hash[];
  createdAt: Date;
  media: Media[];
  likes: string[];
  reposts: Repost[];
  views: number;
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
  reposts: Repost[];
  views: number;
  following: string[];
};

export type Media = {
  url: string;
  alt: string;
  id: string;
};

export type Repost = {
  user: string;
  quote: string;
};
