"use server";

import Hash from "@/app/(root)/page";
import clientPromise from "@/lib/database/mongodb";
import HashModel from "@/lib/models/hash.model";
import UserModel from "@/lib/models/user.model";
import {
  CreateHashParams,
  DeleteHashParams,
} from "@/lib/types/hash.actions.types";
import { MediaType } from "@/lib/types/hash.types";
import { MongooseError } from "mongoose";
import { revalidatePath } from "next/cache";

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
    .then(() => {
      console.log("New HASH Created Successfully");
    })
    .catch((error: MongooseError) => {
      console.error(error.name + ": " + error.message);
      throw new Error(error.message);
    });

  revalidatePath(pathname);
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
