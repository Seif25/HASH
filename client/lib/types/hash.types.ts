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
  views: number;
  createdAt: Date;
  pinned: boolean;
  highlighted: boolean;
  bookmarkedBy: string[];
};

export type MediaType = {
  id: string;
  url: string;
  alt: string;
};

export type RepostType = {
  user: string;
  quote: string;
};
