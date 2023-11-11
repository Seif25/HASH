import { subYears } from "date-fns";
import * as z from "zod";

export const UserValidation = z.object({
  image: z.string(),
  name: z
    .string()
    .nonempty({message: "Name is Required"})
    .min(2, { message: "Name Can't be Less Than 2 Characters" })
    .max(50, { message: "Name Can't be More Than 50 Characters" }),
  username: z
    .string()
    .nonempty({message: "Username is Required"})
    .min(2, { message: "Username Can't be Less Than 2 Characters" })
    .max(30, { message: "Username Can't be More Than 30 Characters" }),
  bio: z
    .string()
    .max(150, { message: "Bio Can't be More Than 150 Characters" }),
  banner: z.string(),
  website: z.string().max(100, { message: "Website Can't be More Than 100 Characters" }),
  location: z.string().max(30, { message: "Location Can't be More Than 30 Characters" }),
  birthDate: z.date().min(subYears(new Date(), 60), { message: "Invalid Date" }).max(new Date()),
});
