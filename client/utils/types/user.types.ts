import { CommentValidation, HashValidation } from "@/lib/validations/hash";
import { UserValidation } from "@/lib/validations/user";
import { Control } from "react-hook-form";
import * as z from "zod";
import { Hash } from "./hash.types";
import { SortOrder } from "mongoose";

// *Type for User object in MongoDB
export type User = {
  _id: string;
  id: string;
  username: string;
  verified: boolean;
  onBoarded: boolean;
  name: string;
  image?: string;
  banner?: string;
  bio?: string;
  location?: string;
  website?: string;
  birthDate?: Date;
  hashes?: string[];
  following?: string[];
  followers?: string[];
  communities?: string[];
  likes?: string[];
  joinedAt: Date;
}

// *Type for User object in MongoDB
export type DetailedUser = {
  _id: string;
  id: string;
  username: string;
  verified: boolean;
  onBoarded: boolean;
  name: string;
  image?: string;
  banner?: string;
  bio?: string;
  location?: string;
  website?: string;
  birthDate?: Date;
  hashes?: Hash[];
  following?: User[];
  followers?: User[];
  communities?: string[];
  likes?: Hash[];
  joinedAt: Date;
}

// *Types for uploading an image
export type ImageFieldProps = {
  control: Control<z.infer<typeof UserValidation>> | undefined;
  name: any;
  label?: string;
  type: string;
  accept: string;
  placeholder?: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>, field: (...event: any[]) => void) => void;
}

// *Types for fetching all Users
export type FetchAllUsersParams = {
  currentUser: string,
  searchString: string,
  pageNumber: number,
  pageSize: number,
  sortBy: SortOrder,
}

export type MongoUser = {
  _id: string;
  id: string;
  username: string;
  name: string;
  onBoarded: boolean;
  verified: boolean;
  following: string[];
  followers: string[];
  joinedAt: Date;
  bio?: string;
  image?: string;
  banner?: string;
  website?: string;
  location?: string;
  birthDate?: Date;
};

export type MongoUserUser = {
  _id: string;
  username?: string;
  name: string;
  bio?: string;
  image?: string;
  bannerUrl?: string;
  website?: string;
  location?: string;
  birthDate?: Date;
};

// export type User = {
//   id?: string;
// } & MongoUser;

export type TextFieldProps = {
  control: Control<z.infer<typeof UserValidation>> | undefined;
  name: any;
  label?: string;
  max?: number;
  maxLength?: number;
  min?: number;
  minLength?: number;
  type: string;
  placeholder?: string;
};

export type HashFieldProps = {
  control: Control<z.infer<typeof HashValidation>> | undefined;
} & Omit<TextAreaProps, "control">

export type CommentFieldProps = {
  control: Control<z.infer<typeof CommentValidation>> | undefined;
} & Omit<TextAreaProps, "control">

export type TextAreaProps = {
  rows: number;
} & Omit<TextFieldProps, "type" | "max" | "min" | "minLength">;

export type DatePickerProps = {
    date: Date;
    onDateChange: (date: Date) => void;
} & Pick<TextFieldProps, "control" | "name" | "label">;
