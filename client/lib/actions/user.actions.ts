"use server";

import { MongoUser } from "@/utils/types/user";
import User from "../models/user.model";
import { connectDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import { addDays } from "date-fns";

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
  clerkId
}: MongoUser & { pathname: string, clerkId: string }): Promise<void> {
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

export async function getUser({clerkId}: {clerkId: string}): Promise<MongoUser | null> {
  connectDB();
  
    try {
        const user = await User.findOne({id: clerkId})
        return user
    } catch (error: any) {
        throw new Error(`Error getting user: ${error.message}`)
    }

}