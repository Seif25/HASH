import * as z from "zod";

export const UserValidationSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(30, {
      message: "Username cannot exceed 30 characters",
    })
    .regex(new RegExp("^[a-zA-Z0-9_]+$"), {
      message:
        "Username can only contain alphanumeric characters and underscores",
    }),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(0).max(50).optional(),
  email: z.string().email(),
  image: z.string().optional(),
  banner: z.string().optional(),
  bio: z.string().max(200).optional(),
  location: z.string().max(30).optional(),
  website: z.string().max(100).optional(),
  phoneNumber: z.string().max(15).optional(),
  birthDate: z.string().optional(),
});
