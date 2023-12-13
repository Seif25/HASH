"use server";

import HashModel from "../../models/hash.model";
import UserModel from "../../models/user.model";
import { HashType } from "../../types/hash.types";
import { UserType } from "../../types/user.types";

export async function searchAction({
  loggedUsername,
  loggedName,
  query,
  type,
}: {
  loggedUsername: string;
  loggedName: string;
  query: string;
  type: "hashtag" | "query" | "profile";
}): Promise<{
  results: {
    users: UserType[];
    hashes: HashType[];
  };
}> {
  let hashes: HashType[] = [];
  let users: UserType[] = [];
  if (type === "hashtag") {
    hashes = await HashModel.find({
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
        select: "name username image banner verified following followers",
      })
      .lean();
  } else if (type === "query") {
    hashes = await HashModel.find({
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
    users = await UserModel.find({
      name: {
        $ne: loggedName,
        $regex: new RegExp(query, "i"),
      },
      username: {
        $ne: loggedUsername,
        $regex: new RegExp(query, "i"),
      },
    })
      .select("name username verified image banner following followers bio")
      .lean();
  } else if (type === "profile") {
    users = await UserModel.find({
      name: {
        $ne: loggedName,
        $regex: new RegExp(query.substring(1), "i"),
      },
      username: {
        $ne: loggedUsername,
        $regex: new RegExp(query.substring(1), "i"),
      },
    })
      .select("name username verified image banner following followers bio")
      .lean();
  }
  const queryResults = {
    users,
    hashes,
  };
  return { results: queryResults };
}
