"use server";

import {
  DetailedUser,
  FetchAllUsersParams,
  MongoUser,
  User,
} from "@/utils/types/user.types";
import UserModel from "../models/user.model";
import { initializeMongoConnection, isConnected } from "../mongoose.middleware";
import { revalidatePath } from "next/cache";
import mongoose, { FilterQuery, MongooseError } from "mongoose";
import Hash from "../models/hash.model";

import moment from "moment";
// import { logger } from "../logs/logger";

// *SETTING UP LOGGER
// logger.defaultMeta = {
//   service: "user-actions",
//   timestamp: moment().format("DD MMM YYYY hh:mm A"),
// };

/**
 * Try connecting to the database if not already connected
 */
function connectToDB() {
  if (!isConnected) {
    initializeMongoConnection();
  }
}
/**
 * Get Full User by Username
 * @param username {string}
 * @returns {Promise<User | null>}
 * @throws {MongooseError}
 */
export async function fetchUser(
  username: string
): Promise<DetailedUser | null> {
  // Connect to MongoDB
  connectToDB();

  try {
    const userQuery = UserModel.findOne({ username: username })
      .populate({
        path: "hashes",
        populate: {
          path: "author",
          foreignField: "username",
          select: "username name image verified following followers bio",
        },
        options: { sort: { createdAt: "desc" } },
      })
      .populate({
        path: "likes",
        populate: {
          path: "author",
          foreignField: "username",
          select: "username name image verified following followers bio",
        },
        options: { sort: { createdAt: "desc" } },
      });

    console.log(`Attempting to Fetch user ${username}`);
    const user = await userQuery.exec();

    if (user) {
      console.info(`Successfully fetched user ${username}`);
      return user;
    } else {
      console.error(`Failed to fetch user ${username}`);
      return null;
    }
  } catch (error: any) {
    console.error(`Error finding user ${username}: ${error.message}`);
    return null;
  }
}

/**
 * Get User Information by Username
 * @param username {string}
 * @returns {Promise<User | null>}
 * @throws {MongooseError}
 */
export async function getUserInformation(
  username: string
): Promise<User | null> {
  connectToDB();

  console.log(`Attempting to Fetch user information for ${username}`);

  try {
    const user = await UserModel.findOne({ username: username });
    console.info(`Successfully fetched user information for ${username}`);
    return user;
  } catch (error: any) {
    console.error(
      `Error finding user information for ${username}: ${error.message}`
    );
    throw new Error(`Error getting user: ${error.message}`);
  }
}

/**
 * Get Users followed by current user
 * @param username {string}
 * @returns {Promise<User[] | null>}
 * @throws {MongooseError}
 */
export async function getFollowing(username: string): Promise<any> {
  // Connect to MongoDB
  connectToDB();

  console.log(`Attempting to Fetch user's following for ${username}`);

  try {
    const followingQuery = UserModel.findOne({ username: username })
      .populate({
        path: "following",
        foreignField: "username",
        options: { sort: { createdAt: "desc" } },
        select: "username name bio followers following image verified",
      })
      .select("following")
      .lean();
    return await followingQuery.exec();
  } catch (error: any) {
    console.error(
      `Error finding user's following for ${username}: ${error.message}`
    );
    throw new Error(`Error getting user's following: ${error.message}`);
  }
}

/**
 * Get Users following current user
 * @param username {string}
 * @returns {Promise<User[] | null>}
 * @throws {MongooseError}
 */
export async function getFollowers(username: string): Promise<any> {
  // Connect to MongoDB
  connectToDB();

  console.log(`Attempting to Fetch user's followers for ${username}`);

  try {
    const followersQuery = UserModel.findOne({ username: username })
      .populate({
        path: "followers",
        foreignField: "username",
        options: { sort: { createdAt: "desc" } },
        select: "username name bio followers following image verified",
      })
      .select("followers")
      .lean();
    return await followersQuery.exec();
  } catch (error: any) {
    console.error(
      `Error finding user's followers for ${username}: ${error.message}`
    );
    throw new Error(`Error getting user's followers: ${error.message}`);
  }
}

/**
 * Fetch All Users for Search
 *
 * @returns {Promise<{users: User[], isNext: boolean }>}
 * @throws {MongooseError}
 */
export async function fetchUsers({
  currentUser,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: FetchAllUsersParams): Promise<{ users: User[]; isNext: boolean } | null> {
  // Connect to MongoDB
  connectToDB();

  console.log(`Attempting to Fetch users with search string ${searchString}`);

  const skip = (pageNumber - 1) * pageSize;

  const regex = new RegExp(searchString, "i");

  if (searchString.length === 0) {
    return null;
  }

  try {
    const query: FilterQuery<typeof UserModel> = {
      username: { $ne: currentUser },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        {
          username: {
            $regex: regex,
          },
        },
        {
          name: { $regex: regex },
        },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = UserModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const totalUsers = await UserModel.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUsers > skip + users.length;

    console.info(
      `Successfully fetched users with search string ${searchString}`
    );
    return { users, isNext };
  } catch (error: any) {
    console.error(
      `Error finding users with search string ${searchString}: ${error.message}`
    );
    throw new Error(`Error getting users: ${error.message}`);
  }
}

/*
    ! ################################### !
    ! NOT UPDATED FOR NEW CONVENTIONS YET !
    ! ################################### !
*/

export async function updateUser({
  _id,
  username,
  name,
  image,
  banner,
  location,
  website,
  birthDate,
  bio,
  pathname,
  clerkId,
}: MongoUser & { pathname: string; clerkId: string }): Promise<void> {
  connectToDB();

  console.log(`Attempting to update user ${username}`);

  try {
    await UserModel.findOneAndUpdate(
      { id: clerkId },
      {
        id: clerkId,
        username: username?.toLowerCase(),
        name: name,
        image: image,
        banner: banner,
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

export async function getUserById(id: string) {
  connectToDB();

  try {
    return await UserModel.findById(new mongoose.Types.ObjectId(id));
  } catch (error: any) {
    throw new Error(`Error getting user: ${error.message}`);
  }
}

export async function getUseProfile(id: string) {
  connectToDB();

  try {
    const userQuery = UserModel.findOne({ id: id })
      .populate({ path: "hashes", options: { sort: { createdAt: "desc" } } })
      .populate({ path: "likes", options: { sort: { createdAt: "desc" } } });

    const user = await userQuery.exec();

    return user;
  } catch (error: any) {
    throw new Error(`Error getting user: ${error.message}`);
  }
}

export async function followUser({
  currentUser,
  toFollowId,
  pathname,
}: {
  currentUser: string;
  toFollowId: string;
  pathname: string;
}): Promise<void> {
  connectToDB();

  try {
    await UserModel.findOneAndUpdate(
      { username: currentUser },
      {
        $push: { following: toFollowId },
      }
    );
    await UserModel.findOneAndUpdate(
      { username: toFollowId },
      {
        $push: { followers: currentUser },
      }
    );

    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(`Error following user: ${error.message}`);
  }
}
