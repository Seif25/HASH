import { MediaType } from "@/lib/types/hash.types";

// * Types for creating a new hash
export type CreateHashParams = {
    text: string;
    username: string;
    community: string | null;
    pathname: string;
    media: MediaType[];
  };
  
  // * Types for adding a new comment
  export type AddCommentParams = {
    author: string;
    parentId: string;
    text: string;
    community: string | null;
    pathname: string;
    media: MediaType[];
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
    quote?: string;
    pathname: string;
  }