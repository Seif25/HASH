"use server";

import { MongoHash } from "@/utils/types/hash";
import { connectDB } from "../mongoose";
import Hash from "../models/hash.model";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

interface CommentParams {
  id: string;
  parentId: string;
  text: string;
  community: string | null;
  pathname: string;
}

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
      .populate({
        path: "author",
        model: "User",
        select: "_id id name username verified image",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          select: "_id id name parentId image verified username",
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

export async function getHash(id: string): Promise<any> {
  connectDB();

  try {
    const hashQuery = Hash.find({
      _id: id,
    })
      .populate({
        path: "author",
        model: "User",
        select: "_id id name username verified image",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          select: "_id id name parentId image verified username",
        },
      });

    const hash = await hashQuery.exec();

    return hash[0];
  } catch (error: any) {
    throw new Error(`Error getting hash: ${error.message}`);
  }
}

export async function addComment({
  id,
  parentId,
  text,
  community,
  pathname,
}: CommentParams): Promise<void> {
  connectDB();

  try {
    const createdHash = await Hash.create({
      text,
      author: new mongoose.Types.ObjectId(id),
      community: null,
    });

    await Hash.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {
      $push: { hash: createdHash._id },
    });

    await Hash.findByIdAndUpdate(new mongoose.Types.ObjectId(parentId), {
      $push: { children: createdHash._id },
    });

    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(`Error adding comment: ${error.message}`);
  }
}

export async function likeHash({
  id,
  userId,
  pathname
}: {
  id: string;
  userId: string;
  pathname: string
}): Promise<void> {
  connectDB();


  try {
    await Hash.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {
      $push: { likes: new mongoose.Types.ObjectId(userId) },
    });

    revalidatePath(pathname);

  } catch (error: any) {
    throw new Error(`Error liking hash: ${error.message}`);
  }
}

export async function unlikeHash({
  id,
  userId,
  pathname
}: {
  id: string;
  userId: string;
  pathname: string
}): Promise<void>{
  connectDB()

  try {
    await Hash.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {
      $pull: { likes: new mongoose.Types.ObjectId(userId) },
    })

    revalidatePath(pathname)
  } catch (error: any) {
    throw new Error(`Error un-liking hash: ${error.message}`);
  }
}
