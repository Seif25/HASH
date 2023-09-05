import { HashValidation } from "@/lib/validations/hash";
import { UserValidation } from "@/lib/validations/user";
import { Control } from "react-hook-form";
import * as z from "zod";

export type MongoUser = {
  _id: string;
  username?: string | null;
  bio?: string;
  name: string;
  image?: string;
  bannerUrl?: string;
  website?: string;
  location?: string;
  birthDate?: Date;
  onBoarded?: boolean;
};

export type User = {
  id?: string;
} & MongoUser;

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

export type TextAreaProps = {
  rows: number;
} & Omit<TextFieldProps, "type" | "max" | "min" | "minLength">;

export type DatePickerProps = {
    date: Date;
    onDateChange: (date: Date) => void;
} & Pick<TextFieldProps, "control" | "name" | "label">;
