"use server";

import HashModel from "@/app/lib/models/hash.model";
import {
  CreateHashParams,
  DeleteHashParams,
  EditHashParams,
} from "@/app/lib/types/hash.actions.types";
import { MongooseError } from "mongoose";
import { revalidatePath } from "next/cache";
import { HashType } from "../../types/hash.types";
import UserModel from "../../models/user.model";

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

  const hash = (await Query.exec()) as HashType;
  const JsonHash = JSON.parse(JSON.stringify(hash)) as HashType;

  return JsonHash;
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
export async function unhighlightHashAction({
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
