import { MediaType } from "./hash.types";

export type CreateHashParams = {
  author: string;
  text: string;
  media: MediaType[];
  pathname: string;
};

export type DeleteHashParams = {
  hashId: string;
  pathname: string;
};
