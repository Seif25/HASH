import * as z from "zod";

export const HashValidation = z.object({
  hash: z
    .string()
    .min(1, { message: "You need to write at least 1 character" })
    .max(280, { message: "Maximum amount of characters reached" })
    .nonempty({ message: "You can't post an empty Hash" }),
  username: z
    .string()
    .nonempty({ message: "You need to be logged in to post a Hash" }),
  media: z.array(z.any()),
});

export const CommentValidation = z.object({
  hash: z
    .string()
    .min(1, { message: "You need to write at least 1 character" })
    .max(280, { message: "Maximum amount of characters reached" })
    .nonempty({ message: "You can't post an empty Hash" }),
  media: z.array(z.string()),
});
