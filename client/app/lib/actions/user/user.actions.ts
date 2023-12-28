"use server";

import { revalidatePath } from "next/cache";
import UserModel from "../../models/user.model";
import { UserValidationSchema } from "../../schemas/user.schema";
import {
  ConversationsType,
  SupabaseConversationType,
} from "../../types/conversation.types";
import { UserFollowingType, UserType } from "../../types/user.types";
import { HashType } from "../../types/hash.types";
import HashModel from "../../models/hash.model";
import NotificationModel from "../../models/notification.model";

/**
 * Fetch user's information using their username
 * @param username
 * @returns UserType
 */
export async function fetchUserAction(username: string): Promise<UserType> {
  try {
    return (await UserModel.findOne({ username: username }).lean()) as UserType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Update user's information
 * @param username string
 * @param data typeof UserValidationScheme
 * @param pathname string
 * @returns Promise<void>
 */
export async function updateUserAction({
  username,
  data,
  pathname,
}: {
  username: string;
  data: any;
  pathname: string;
}): Promise<void> {
  try {
    await UserModel.updateOne({ username }, data);

    revalidatePath(pathname);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

/**
 * Fetch user's information using their email
 * @param email
 * @returns Promise<boolean>
 */
export async function checkIfUserExistsAction(
  username: string
): Promise<boolean> {
  try {
    const user = await UserModel.findOne({ username }).select(
      "username blocked"
    );
    if (!user) return false;
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function checkIfEmailExistsAction(
  email: string
): Promise<boolean> {
  try {
    const user = await UserModel.findOne({ email }).select("email");
    if (!user) return false;
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Fetch people that a user is following
 */
export async function fetchUserFollowingAction(username: string) {
  try {
    return (await UserModel.findOne({ username: username })
      .select("followers following")
      .populate({
        path: "following",
        model: UserModel,
        foreignField: "username",
        select: "username name image followers following verified",
      })
      .sort({ name: -1 })
      .lean()) as UserFollowingType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchUserFollowersAction(username: string) {
  try {
    return (await UserModel.findOne({ username: username })
      .select("followers following")
      .populate({
        path: "followers",
        model: UserModel,
        foreignField: "username",
        select: "username name image followers following verified",
      })
      .sort({ name: -1 })
      .lean()) as UserFollowingType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchReceiverInfoAction({
  username,
  conversations,
}: {
  username: string;
  conversations: SupabaseConversationType[];
}) {
  const receivers = conversations.map((conversation) =>
    conversation.participant_1 === username
      ? conversation.participant_2
      : conversation.participant_1
  );

  try {
    const receiverInfo = await UserModel.find({ username: { $in: receivers } })
      .select("username name image followers following verified")
      .lean();

    // merge receiver info with conversations
    const populatedConversations = conversations.map((conversation) => {
      const receiver = receiverInfo.find(
        (receiver) =>
          receiver.username ===
          (conversation.participant_1 === username
            ? conversation.participant_2
            : conversation.participant_1)
      );
      return {
        ...conversation,
        receiver: receiver,
      };
    });
    return populatedConversations as ConversationsType[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateFCMToken({
  username,
  fcmToken,
}: {
  username: string;
  fcmToken: string;
}) {
  try {
    return await UserModel.updateOne({ username }, { fcmToken });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function newCommentAction({
  commenter,
  hashId,
  text,
  media,
}: {
  commenter: string;
  hashId: string;
  text: string;
  media: HashType[];
}) {
  try {
    const hash = (await HashModel.create({
      author: commenter,
      text,
      media,
      parentId: hashId,
    })) as HashType;
    if (hash) {
      const parentHash = await HashModel.findByIdAndUpdate(hashId, {
        $push: { children: hash._id },
      });
      await UserModel.findOneAndUpdate(
        { username: commenter },
        {
          $push: { hashes: hash._id },
        }
      );
      if (parentHash.author !== commenter) {
        const existingNotification = await NotificationModel.findOne({
          source: commenter,
          user: parentHash.author,
          type: "reply",
        });
        if (existingNotification) {
          await NotificationModel.findByIdAndUpdate(existingNotification._id, {
            createdAt: Date.now(),
          });
        } else {
          await NotificationModel.create({
            user: parentHash.author,
            message: "commented on your hash",
            link: `/hash/${hash._id.toString()}`,
            type: "reply",
            source: commenter,
          });
        }
      }
    }
  } catch (error: any) {
    console.log(error);
  }
}

export async function followUserAction({
  loggedInUser,
  userToFollow,
  pathname,
}: {
  loggedInUser: string;
  userToFollow: string;
  pathname: string;
}): Promise<void> {
  try {
    await UserModel.updateOne(
      { username: loggedInUser },
      { $push: { following: userToFollow } }
    );
    await UserModel.updateOne(
      { username: userToFollow },
      { $push: { followers: loggedInUser } }
    );

    await NotificationModel.create({
      user: userToFollow,
      message: "started following you",
      link: `/profile/${loggedInUser}`,
      type: "follow",
      source: loggedInUser,
    });

    revalidatePath(pathname);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function unfollowUserAction({
  loggedInUser,
  userToUnfollow,
  pathname,
}: {
  loggedInUser: string;
  userToUnfollow: string;
  pathname: string;
}): Promise<void> {
  try {
    await UserModel.updateOne(
      { username: loggedInUser },
      { $pull: { following: userToUnfollow } }
    );
    await UserModel.updateOne(
      { username: userToUnfollow },
      { $pull: { followers: loggedInUser } }
    );

    revalidatePath(pathname);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function blockUserAction({
  loggedInUser,
  userToBlock,
  pathname,
}: {
  loggedInUser: string;
  userToBlock: string;
  pathname: string | null;
}): Promise<void> {
  try {
    await UserModel.findOneAndUpdate(
      { username: userToBlock },
      {
        $push: { blocked: loggedInUser },
        $pull: { following: loggedInUser, followers: loggedInUser },
      }
    );
    await UserModel.findOneAndUpdate(
      { username: loggedInUser },
      { $pull: { following: userToBlock, followers: userToBlock } }
    );
    if (pathname) {
      revalidatePath(pathname);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function unBlockUserAction({
  loggedInUser,
  userToUnBlock,
  pathname,
}: {
  loggedInUser: string;
  userToUnBlock: string;
  pathname: string | null;
}): Promise<void> {
  try {
    await UserModel.findOneAndUpdate(
      { username: userToUnBlock },
      { $pull: { blocked: loggedInUser } }
    );
    if (pathname) {
      revalidatePath(pathname);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function markHashAsNotInterestingAction({
  loggedInUser,
  hashId,
  pathname,
}: {
  loggedInUser: string;
  hashId: string;
  pathname: string | null;
}): Promise<void> {
  try {
    await UserModel.updateOne(
      { username: loggedInUser },
      { $push: { notInterested: hashId } }
    );

    if (pathname) {
      revalidatePath(pathname);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
