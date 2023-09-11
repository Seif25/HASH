"use server";

import { MongoUser } from "@/utils/types/user";
import User from "../models/user.model";
import { connectDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import Hash from "../models/hash.model";

export async function updateUser({
  _id,
  username,
  name,
  image,
  bannerUrl,
  location,
  website,
  birthDate,
  bio,
  pathname,
  clerkId,
}: MongoUser & { pathname: string; clerkId: string }): Promise<void> {
  connectDB();

  try {
    await User.findOneAndUpdate(
      { id: clerkId },
      {
        id: clerkId,
        username: username?.toLowerCase(),
        name: name,
        image: image,
        banner: bannerUrl,
        bio: bio,
        location: location,
        website: website,
        birthDate: birthDate,
        onBoarded: true,
      },
      { upsert: true }
    );

    if (pathname.startsWith("/profile/edit")) {
      revalidatePath(pathname);
    }
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

export async function getUser({
  clerkId,
}: {
  clerkId: string;
}): Promise<MongoUser | null> {
  connectDB();

  try {
    return await User.findOne({ id: clerkId });
  } catch (error: any) {
    throw new Error(`Error getting user: ${error.message}`);
  }
}

export async function getUserById(id: string) {
  connectDB();

  try {
    return await User.findById(new mongoose.Types.ObjectId(id));
  } catch (error: any) {
    throw new Error(`Error getting user: ${error.message}`);
  }
}

export async function getUseProfile(id: string) {
  connectDB();

  try {
    const userQuery = User.findOne({ id: id })
      .populate({ path: "hashes", options: { sort: { createdAt: "desc" } } })
      .populate({ path: "likes", options: { sort: { createdAt: "desc" } } })

    const user = await userQuery.exec();

    return user;
  } catch (error: any) {
    throw new Error(`Error getting user: ${error.message}`);
  }
}
