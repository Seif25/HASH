import { UserType } from "./user.types";

export type HashType = {
  _id: string;
  parentId: string;
  text: string;
  author: UserType;
  community: string[] | null;
  children: HashType[];
  media: MediaType[];
  likes: string[];
  reposts: RepostType[];
  views: string[];
  createdAt: Date;
  pinned: boolean;
  highlighted: boolean;
  bookmarkedBy: string[];
  restriction: "everyone" | "mentioned only" | "followed by me";
  edited: boolean;
};

export type SummarizedHashType = {
  _id: string;
  text: string;
  media: MediaType[];
  likes: string[];
  reposts: RepostType[];
  views: string[];
  createdAt: Date;
  author: UserType;
  children: string[];
};

export type DetailedHashType = {
  _id: string;
  parentId: HashType;
  text: string;
  author: UserType;
  community: string[] | null;
  children: HashType[];
  media: MediaType[];
  likes: string[];
  reposts: RepostType[];
  views: string[];
  createdAt: Date;
  pinned: boolean;
  highlighted: boolean;
  bookmarkedBy: string[];
  restriction: "everyone" | "mentioned only" | "followed by me";
  edited: boolean;
};

export type MediaType = {
  id: string;
  url: string;
  alt: string;
  mediaType: ContentType;
};

export type ContentType = "image" | "video" | "audio" | "unknown";

export type RepostType = {
  user: string;
  quote: string;
};
