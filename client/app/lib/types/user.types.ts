import { number } from "zod";
import { HashType } from "./hash.types";

export type UserType = {
  _id: string;
  username: string;
  name: string;
  image: string;
  banner: string;
  joinedAt: string;
  verified: boolean;
  bio: string;
  website: string;
  location: string;
  following: string[];
  followers: string[];
  birthDate: Date;
  hashes: HashType[];
};

export type SummarizedUserType = {
  name: string;
  username: string;
  image: string;
  verified: boolean;
  following: string[];
  followers: string[];
};

export type FetchAllUsersParams = {
  currentUser: string;
  searchString: string;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
};

export type FetchUserReplies = {
  parentId: HashType;
} & Omit<HashType, "parentId">;
