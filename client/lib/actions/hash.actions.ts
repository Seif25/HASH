"use server";

import {
  AddCommentParams,
  CreateHashParams,
  Hash,
  LikeHashParams,
  RepostHashParams,
} from "@/utils/types/hash.types";
import { initializeMongoConnection, isConnected } from "../mongoose.middleware";
import HashModel from "../models/hash.model";
import { revalidatePath } from "next/cache";
import mongoose, { MongooseError } from "mongoose";
import User from "../models/user.model";
import { logger } from "../logs/logger";
import moment from "moment";

// *SETTING UP LOGGER
logger.defaultMeta = { service: "hash-actions", timestamp: moment().format("DD MMM YYYY hh:mm A") };

/**
 * Try connecting to the database if not already connected
 */
function connectToDB() {
  if (!isConnected) {
    initializeMongoConnection();
  }
}

/**
 * Create Hash
 * @param {CreateHashParams} {text, author, community, pathname}
 * @returns {Promise<void>}
 * @throws {MongooseError}
 */
export async function createHash({
  text,
  username,
  community,
  pathname,
  media
}: CreateHashParams): Promise<void> {
  // Connect to DB
  connectToDB();

  logger.wait(`Creating new hash for: ${username}`)

  /**
   * @type {Hash}
   * @returns {Promise<void>}
   * @throws {MongooseError}
   */
  HashModel.create({
    text,
    author: username,
    community: null, //TODO: create community model
    media: media
  }).then((newHash: Hash) => {
    logger.info(`New hash created successfully for: ${username}`);
    // Add hash to user's hashes
    User.findOneAndUpdate(
      { username: username },
      {
        $push: { hashes: newHash._id },
      }
    )
      .then(() => {
        logger.info(`Updated hashes for: ${username}`);
      })
      .catch((error: MongooseError) => {
        logger.error(`Error updating ${username}'s hashes: ${error.message}`);
        throw new Error(
          `Error updating ${username}'s hashes: ${error.message}`
        );
      })
  }).catch((error: MongooseError) => {
    logger.error(`Error creating new hash`);
    throw new Error(
      `Error creating hash for ${username}: ${error.message}`
    );
  });
  // Revalidate path on the client
  revalidatePath(pathname);
}

/**
 * Return all hashes
 * @param pageNumber {number}
 * @param pageSize {number}
 * @returns {Promise<{hashes: Hash[], isNext: boolean}>}
 * @throws {MongooseError}
 */
export async function fetchHashes(
  pageNumber: number = 1,
  pageSize: number = 20
): Promise<{ hashes: Hash[]; isNext: boolean }> {
  // Connect to DB
  connectToDB();
  logger.wait(`Attempting to Fetch All Hashes`)

  try {
    // Calculate skip and limit
    const skip = (pageNumber - 1) * pageSize;

    // Find parent threads
    const hashQuery = HashModel.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(pageSize)
      .populate({
        path: "author",
        model: "User",
        foreignField: "username",
        select: "_id id name username verified image bio following followers",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          foreignField: "username",
          select:
            "_id id name parentId image verified username bio following followers",
        },
      });

    let totalPageCount: number = 0
    try {
      logger.wait(`Attempting to retrieve total page count`)
      totalPageCount = await HashModel.countDocuments({
        parentId: { $in: [null, undefined] },
      });
      logger.info(`Total page count retrieved successfully`)
    } catch (error: any) {
      logger.error(`Error retrieving total page count: ${error.message}`)
      revalidatePath(`/`);
      return { hashes: [], isNext: false };
    }

    const hashes = (await hashQuery.exec()) as Hash[];

    const isNext = totalPageCount > skip + hashes.length;

    
    return { hashes, isNext };
  } catch (error: any) {
    logger.error(`Error fetching hashes: ${error.message}`);
    throw new Error(`Error fetching hashes: ${error.message}`);
  }
}

/**
 * Fetch a Hash by ID
 * @param id {string}
 * @returns {Promise<Hash>}
 * @throws {MongooseError}
 */
export async function getHash(id: string): Promise<any> {
  // Connect to DB
  connectToDB();

  logger.wait(`Attempting to Fetch Hash: ${id}`)

  try {
    const hashQuery = HashModel.findById(new mongoose.Types.ObjectId(id))
      .populate({
        path: "author",
        model: "User",
        foreignField: "username",
        select: "_id id name username verified image bio",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          foreignField: "username",
          select: "_id id name parentId image verified username bio",
        },
      });

    const hash = await hashQuery.exec();
    logger.info(`Fetched Hash: ${id}`)
    return hash;
  } catch (error: any) {
    throw new Error(`Error getting hash: ${error.message}`);
  }
}

/**
 * Delete a Hash by ID
 * @param id {string}
 * @returns {Promise<void>}
 * @throws {MongooseError}
 */
export async function deleteHash(id: string): Promise<void> {
  // Connect to DB
  connectToDB();
  logger.wait(`Attempting to Delete Hash: ${id}`)
  try {
    // Delete Hash from hash collection
    const deletedHash: Hash | null = await HashModel.findByIdAndDelete(id);

    logger.info(`Deleted hash successfully`);

    if (deletedHash) {
      // Delete Hash from user's hashes
      await User.findOneAndUpdate(
        { username: deletedHash.author },
        { $pull: { hashes: deletedHash._id } }
      );
      logger.info(`Deleted hash from user's hashes successfully`);

      // Check if deleted hash was a child
      if (deletedHash.parentId) {
        await HashModel.findByIdAndUpdate(
          { _id: new mongoose.Types.ObjectId(deletedHash.parentId) },
          { $pull: { children: deletedHash._id } }
        );
        logger.info(`Deleted hash from parent's children successfully`);
      }
    }
  } catch (error: any) {
    throw new Error(`Error deleting hash: ${id} - ${error.message}`);
  }
}

/**
 * Add Comment to Hash
 * @param {AddCommentParams} {author, parentId, text, community, pathname}
 * @returns {Promise<void>}
 * @throws {MongooseError}
 */
export async function addComment({
  author,
  parentId,
  text,
  community,
  pathname,
}: AddCommentParams): Promise<void> {
  // Connect to DB
  connectToDB();

  logger.wait(`Attempting to Add Comment to Hash: ${parentId}`)

  // Add comment as new hash to hash collection
  HashModel.create({
    text,
    author,
    parentId,
    community: null, //TODO: create community model
  }).then((newHash: Hash) => {
    logger.info(`New comment created successfully by: ${author}`);
    // Add comment to parent hash's children
    HashModel.findByIdAndUpdate(new mongoose.Types.ObjectId(parentId), {
      $push: { children: newHash._id },
    })
      .then(() => {
        logger.info(`Updated children for: ${parentId}`);
        // Add comment to user's hashes
        User.findOneAndUpdate(
          { username: author },
          {
            $push: { hashes: newHash._id },
          }
        )
          .then(() => logger.info(`Updated hashes for: ${author}`))
          .catch((error: MongooseError) => {
            throw new Error(
              `Error updating ${author}'s hashes: ${error.message}`
            );
          });
      })
      .catch((error: MongooseError) => {
        throw new Error(
          `Error updating ${parentId}'s children: ${error.message}`
        );
      });
  });
  // Revalidate path on the client
  revalidatePath(pathname);
}

/**
 * Like a Hash
 * @param {LikeHashParams} {id, currentUser, pathname}
 * @returns {Promise<void>}
 * @throws {MongooseError}
 */
export async function likeHash({
  id,
  currentUser,
  pathname,
}: LikeHashParams): Promise<void> {
  // Connect to DB
  connectToDB();

  logger.wait(`Attempting to Like Hash: ${id}`)

  // Add like to hash
  HashModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {
    $push: { likes: currentUser },
  })
    .then(() => {
      logger.info(`${currentUser} liked hash: ${id}`);
      // Add like to user's likes
      User.findOneAndUpdate(
        { username: currentUser },
        {
          $push: { likes: new mongoose.Types.ObjectId(id) },
        }
      )
        .then(() => {
          logger.info(`Updated likes for: ${currentUser}`);
        })
        .catch((error: MongooseError) => {
          throw new Error(
            `Error updating ${currentUser}'s likes: ${error.message}`
          );
        });
    })
    .catch((error: MongooseError) => {
      throw new Error(`Error updating ${id}'s likes: ${error.message}`);
    });

  revalidatePath(pathname);
}

/**
 * Unlike a Hash
 * @param {LikeHashParams} {id, currentUser, pathname}
 * @returns {Promise<void>}
 * @throws {MongooseError}
 */
export async function unlikeHash({
  id,
  currentUser,
  pathname,
}: LikeHashParams): Promise<void> {
  // Connect to DB
  connectToDB();

  logger.wait(`Attempting to Unlike Hash: ${id}`)

  // Remove like from hash
  HashModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {
    $pull: { likes: currentUser },
  })
    .then(() => {
      logger.info(`${currentUser} unliked hash: ${id}`);
      // Remove like from user's likes
      User.findOneAndUpdate(
        { username: currentUser },
        {
          $pull: { likes: new mongoose.Types.ObjectId(id) },
        }
      ).catch((error: MongooseError) => {
        throw new Error(
          `Error updating ${currentUser}'s likes: ${error.message}`
        );
      });
    })
    .catch((error: MongooseError) => {
      throw new Error(`Error updating ${id}'s likes: ${error.message}`);
    });

  revalidatePath(pathname);
}

/**
 * Repost a Hash
 * @param {RepostHashParams} {id, currentUser, pathname, quote}
 * @returns
 * @throws {MongooseError}
 */
export async function repostHash({
  id,
  currentUser,
  pathname,
  quote,
}: RepostHashParams) {
  // Connect to DB
  connectToDB();

  logger.wait(`Attempting to Repost Hash: ${id}`)

  try {
    const repost = {
      user: currentUser,
      quote: quote,
    };

    const hash = await HashModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      {
        $push: {
          reposts: repost,
        },
      }
    );

    if (!hash) {
      throw new Error("Hash not found");
    } else {
      await User.findOneAndUpdate(
        { username: currentUser },
        {
          $push: { hashes: new mongoose.Types.ObjectId(id) },
        }
      );

      revalidatePath(pathname);
    }
  } catch (error: any) {
    throw new Error(`Error reposting hash: ${error.message}`);
  }
}

/**
 * Add a view to a Hash
 * @param id {string}
 * @returns {Promise<void>}
 * @throws {MongooseError}
 */
export async function view(id: string): Promise<void> {
  // Connect to DB
  connectToDB();

  try {
    await HashModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      {
        $inc: { views: 1 },
      },
      { upsert: true }
    );

    revalidatePath(`/hash/${id}`);
  } catch (error: any) {
    throw new Error(`Error finding hash: ${error.message}`);
  }
}
