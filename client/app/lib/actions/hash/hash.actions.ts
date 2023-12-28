"use server";

import HashModel from "@/app/lib/models/hash.model";
import {
  CreateHashParams,
  DeleteHashParams,
  EditHashParams,
} from "@/app/lib/types/hash.actions.types";
import { MongooseError } from "mongoose";
import { revalidatePath } from "next/cache";
import {
  DetailedHashType,
  HashType,
  SummarizedHashType,
} from "../../types/hash.types";
import UserModel from "../../models/user.model";
import { UserType } from "../../types/user.types";

/**
 * CREATE HASH ACTION
 * @param { author, text, media, pathname }: CreateHashParams
 * @returns void
 * @throws MongooseError
 */
export async function createHashAction({
  author,
  text,
  media,
  pathname,
}: CreateHashParams) {
  HashModel.create({
    author,
    text,
    media,
    community: null,
  })
    .then((res) => {
      UserModel.updateOne(
        { username: author },
        {
          $push: { hashes: res._id },
        }
      )
        .then(() => {
          console.log("New HASH Created Successfully");
        })
        .catch((error: MongooseError) => {
          console.error(
            "Failed to update user's hashes: " +
              error.name +
              ": " +
              error.message
          );
          throw new Error(error.message);
        });
    })
    .catch((error: MongooseError) => {
      console.error(error.name + ": " + error.message);
      throw new Error(error.message);
    });

  revalidatePath(pathname);
}

/**
 * fetch hashes for a user (recommended & their own & of the people they follow)
 * @param currentUser
 * @param pageNumber
 * @param pageSize
 * @returns Promise<{ hashes: HashType[], isNext: boolean}>
 */
export async function fetchHashesAction(
  currentUser: string | undefined,
  pageNumber: number = 1,
  pageSize: number = 20
): Promise<{ hashes: HashType[]; isNext: boolean }> {
  if (!currentUser) throw new Error("UnAuthorized");
  try {
    const skip = (pageNumber - 1) * pageSize;

    const userInformation = (await UserModel.findOne({
      username: currentUser,
    }).populate({
      path: "likes",
      model: "Hash",
      select: "_id author",
      populate: {
        path: "author",
        foreignField: "username",
        model: "User",
        select: "_id username",
      },
    })) as UserType;

    // users that the current user is following
    const following = userInformation.following;

    // posts that the user liked
    const likedPosts = userInformation.likes;

    let recommendedUsers: string[] = [];
    likedPosts?.forEach((post) => {
      recommendedUsers.push(post.author.username);
    });

    const query = HashModel.find({
      $and: [
        { parentId: { $in: [null, undefined] } },
        {
          $or: [
            { author: { $in: following } },
            { author: { $in: recommendedUsers } },
          ],
        },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate({
        path: "author",
        model: "User",
        foreignField: "username",
        select:
          "username notInterested blocked name image followers following verified bio",
      })
      .populate({
        path: "children",
        model: "Hash",
        populate: {
          path: "author",
          model: "User",
          foreignField: "username",
          select:
            "username notInterested blocked name image followers following verified bio",
        },
      });

    let totalPageCount: number = 0;
    try {
      totalPageCount = await HashModel.countDocuments({
        parentId: { $in: [null, undefined] },
      });
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }

    const hashes = (await query.exec()) as HashType[];
    const isNext = totalPageCount > skip + hashes.length;

    // hash filtering logic

    // STEP 1: remove hashes from blocked users
    const filterBlocked = hashes.filter(
      (hash) =>
        hash.author.blocked.length === 0 ||
        !hash.author.blocked.includes(currentUser)
    );

    // STEP 2: remove hashes that the user is not interested in
    const filterNotInterested = filterBlocked.filter(
      (hash) =>
        userInformation.notInterested.length === 0 ||
        !userInformation.notInterested.includes(hash._id)
    );

    // hash parsing logic
    const parsedHashes = JSON.parse(
      JSON.stringify(filterNotInterested)
    ) as HashType[];

    return { hashes: parsedHashes, isNext };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

/**
 * EDIT HASH ACTION
 */
export async function editHashAction({
  hashId,
  text,
  media,
  pathname,
}: EditHashParams) {
  await HashModel.findByIdAndUpdate(
    { _id: hashId },
    { text, media, edited: true }
  );
  revalidatePath(pathname);
}

/**
 * FETCH HASH BY ID ACTION
 */
export async function fetchHashByIdAction(hashId: string) {
  const Query = HashModel.findById({ _id: hashId })
    .populate({
      path: "parentId",
      model: "Hash",
      populate: {
        path: "author",
        model: "User",
        foreignField: "username",
        select: "username name image followers following verified bio",
      },
    })
    .populate({
      path: "author",
      model: "User",
      foreignField: "username",
      select: "username name image followers following verified bio",
    })
    .populate({
      path: "children",
      model: "Hash",
      populate: {
        path: "author",
        model: "User",
        foreignField: "username",
        select: "username name image followers following verified bio",
      },
    })
    .lean();

  const hash = (await Query.exec()) as DetailedHashType;
  const JsonHash = JSON.parse(JSON.stringify(hash)) as DetailedHashType;

  return JsonHash;
}

export async function fetchSummarizedHashAction(
  hashId: string
): Promise<SummarizedHashType> {
  try {
    return (await HashModel.findById({ _id: hashId })
      .select("_id text media children views author createdAt likes reposts")
      .populate({
        path: "author",
        model: "User",
        foreignField: "username",
        select: "username name image verified",
      })
      .lean()) as SummarizedHashType;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

/**
 * DELETE HASH ACTION
 * @param { hashId, pathname }: DeleteHashParams
 * @returns void
 * @throws MongooseError
 */
export async function deleteHashAction({ hashId, pathname }: DeleteHashParams) {
  HashModel.findByIdAndDelete({ _id: hashId })
    .then(() => {
      console.log("HASH Deleted Successfully");
    })
    .catch((error: MongooseError) => {
      console.error(error.name + ": " + error.message);
      throw new Error(error.message);
    });

  revalidatePath(pathname);
}

/**
 * PIN HASH ACTION
 * @param { hashId, pathname }: { hashId: string, pathname: string }
 * @returns void
 * @throws MongooseError
 */
export async function pinHashAction({
  hashId,
  pathname,
}: {
  hashId: string;
  pathname: string;
}) {
  HashModel.findByIdAndUpdate({ _id: hashId }, { pinned: true })
    .then(() => {
      console.log("HASH Pinned Successfully");
    })
    .catch((error: MongooseError) => {
      console.error(error.name + ": " + error.message);
      throw new Error(error.message);
    });

  revalidatePath(pathname);
}

/**
 * UNPIN HASH ACTION
 * @param { hashId, pathname }: { hashId: string, pathname: string }
 * @returns void
 * @throws MongooseError
 */
export async function unpinHashAction({
  hashId,
  pathname,
}: {
  hashId: string;
  pathname: string;
}) {
  HashModel.findByIdAndUpdate({ _id: hashId }, { pinned: false })
    .then(() => {
      console.log("HASH Unpinned Successfully");
    })
    .catch((error: MongooseError) => {
      console.error(error.name + ": " + error.message);
      throw new Error(error.message);
    });

  revalidatePath(pathname);
}

/**
 * HIGHLIGHT HASH ACTION
 * @param { hashId, pathname }: { hashId: string, pathname: string }
 * @returns void
 * @throws MongooseError
 */
export async function highlightHashAction({
  hashId,
  pathname,
}: {
  hashId: string;
  pathname: string;
}) {
  HashModel.findByIdAndUpdate({ _id: hashId }, { highlighted: true })
    .then(() => {
      console.log("HASH Highlighted Successfully");
    })
    .catch((error: MongooseError) => {
      console.error(error.name + ": " + error.message);
      throw new Error(error.message);
    });

  revalidatePath(pathname);
}

/**
 * UNHIGHLIGHT HASH ACTION
 * @param { hashId, pathname }: { hashId: string, pathname: string }
 * @returns void
 * @throws MongooseError
 */
export async function unHighlightHashAction({
  hashId,
  pathname,
}: {
  hashId: string;
  pathname: string;
}) {
  HashModel.findByIdAndUpdate({ _id: hashId }, { highlighted: false })
    .then(() => {
      console.log("HASH Unhighlighted Successfully");
    })
    .catch((error: MongooseError) => {
      console.error(error.name + ": " + error.message);
      throw new Error(error.message);
    });

  revalidatePath(pathname);
}

/**
 * BOOKMARK HASH ACTION
 */
export async function bookmarkHashAction({
  hashId,
  username,
  pathname,
}: {
  hashId: string;
  username: string;
  pathname: string;
}) {
  HashModel.findByIdAndUpdate(
    { _id: hashId },
    { $push: { bookmarkedBy: username } }
  )
    .then(() => {
      console.log("HASH Bookmarked Successfully");
    })
    .catch((error: MongooseError) => {
      console.error(error.name + ": " + error.message);
      throw new Error(error.message);
    });

  revalidatePath(pathname);
}

/**
 * UNBOOKMARK HASH ACTION
 */
export async function unBookmarkHashAction({
  hashId,
  username,
  pathname,
}: {
  hashId: string;
  username: string;
  pathname: string;
}) {
  HashModel.findByIdAndUpdate(
    { _id: hashId },
    { $pull: { bookmarkedBy: username } }
  )
    .then(() => {
      console.log("HASH UnBookmarked Successfully");
    })
    .catch((error: MongooseError) => {
      console.error(error.name + ": " + error.message);
      throw new Error(error.message);
    });

  revalidatePath(pathname);
}

/**
 * fetch user bookmarks
 * @param username: string
 * @returns HashType[]
 */
export async function fetchUserBookmarks({ username }: { username: string }) {
  const Query = HashModel.find({ bookmarkedBy: username })
    .populate({
      path: "author",
      model: "User",
      foreignField: "username",
      select: "username name image followers following verified bio",
    })
    .lean();

  const hash = (await Query.exec()) as HashType[];
  const JsonHash = JSON.parse(JSON.stringify(hash)) as HashType[];

  return JsonHash;
}

export async function changeRestrictionAction({
  hashId,
  restriction,
  pathname,
}: {
  hashId: string;
  restriction: string;
  pathname: string;
}) {
  HashModel.findByIdAndUpdate({ _id: hashId }, { restriction })
    .then(() => {
      console.log("HASH Restriction Changed Successfully");
    })
    .catch((error: MongooseError) => {
      console.error(error.name + ": " + error.message);
      throw new Error(error.message);
    });

  revalidatePath(pathname);
}
