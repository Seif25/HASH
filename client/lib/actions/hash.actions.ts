"use server";

import { MongoHash } from "@/utils/types/hash";
import { connectDB } from "../mongoose";
import Hash from "../models/hash.model";
import { revalidatePath } from "next/cache";

export async function createHash({
  text,
  author,
  community,
  pathname,
}: MongoHash) {
  connectDB();

  try {
    const createdHash = await Hash.create({
      text,
      author,
      community: null, //TODO: community
    });

    await Hash.findByIdAndUpdate(author, {
      $push: { hash: createdHash._id },
    });

    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(`Error creating hash: ${error.message}`);
  }
}

export async function fetchHashes(pageNumber = 1, pageSize = 20) {
  connectDB();

  try {
    // Calculate skip and limit
    const skip = (pageNumber - 1) * pageSize;

    // Find parent threads
    const hashQuery = Hash.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(pageSize)
      .populate({ path: "author", model: "User" })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          select: "_id name parentId image",
        },
      });

    const totalPageCount = await Hash.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const hashes = await hashQuery.exec();

    const isNext = totalPageCount > skip + hashes.length;

    return  { hashes, isNext }
  } catch (error: any) {
    throw new Error(`Error fetching hashes: ${error.message}`);
  }
}
