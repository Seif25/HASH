export type UserType = {
    username: string;
    name: string;
    image: string;
    createdAt: string;
    verified: boolean;
    bio: string;
    website: string;
    location: string;
    following: string[]
    followers: string[]
}

export type SummarizedUserType = {
    name: string;
    username: string;
    image: string;
    verified: boolean;
    following: string[]
    followers: string[]
  };