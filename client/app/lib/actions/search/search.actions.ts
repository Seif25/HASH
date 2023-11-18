"use server";

import HashModel from "../../models/hash.model";
import UserModel from "../../models/user.model";
import { HashType } from "../../types/hash.types";

export async function searchAction({
  query,
  type,
}: {
  query: string;
  type: string | string[];
}) {
  if (type === "hashtag") {
    const hashes = await HashModel.find({
      tags: {
        $exists: true,
        $not: { $size: 0 },
        $in: [query],
      },
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        model: UserModel,
        foreignField: "username",
        select: "name username image verified following followers",
      })
      .lean();
    return { results: hashes as HashType[], type: "hash" };
  } else if (type === "posts") {
    const hashes = await HashModel.find({
      text: {
        $regex: new RegExp(query, "i"),
      },
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        model: UserModel,
        foreignField: "username",
        select: "name username image verified following followers",
      })
      .lean();
    return { results: hashes as HashType[], type: "hash" };
  }
}
