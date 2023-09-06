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
      .populate({ path: "author", model: "User", select: "_id name username verified image" })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          select: "_id name parentId image verified username",
        },
      });

    const totalPageCount = await Hash.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const hashes = await hashQuery.exec();

    const isNext = totalPageCount > skip + hashes.length;

    return { hashes, isNext };
  } catch (error: any) {
    throw new Error(`Error fetching hashes: ${error.message}`);
  }
}

export async function deleteHash(id: string): Promise<void> {
  connectDB();

  try {
    await Hash.findByIdAndDelete(id);
  } catch (error: any) {
    throw new Error(`Error deleting hash: ${error.message}`);
  }
}

export async function getHash(id: string) {
  connectDB();

  try {
    const hashQuery = Hash.find({
      _id: id,
    })
      .populate({ path: "author", model: "User", select: "_id name username verified image" })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          select: "_id name parentId image verified username",
        },
      });

    const hash = hashQuery.exec();

    return hash;
  } catch (error: any) {
    throw new Error(`Error getting hash: ${error.message}`);
  }
}
