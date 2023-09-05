import * as z from "zod";

export const HashValidation = z.object({
  hash: z
    .string()
    .min(1, { message: "You need to write at least 1 character" })
    .max(255, { message: "Maximum amount of characters reached" })
    .nonempty({ message: "You can't post an empty Hash" }),
  accountId: z
    .string()
    .nonempty({ message: "You need to be logged in to post a Hash" }),
});

export const CommentValidation = z.object({
  hash: z
    .string()
    .min(1, { message: "You need to write at least 1 character" })
    .max(255, { message: "Maximum amount of characters reached" })
    .nonempty({ message: "You can't post an empty Hash" }),
});
