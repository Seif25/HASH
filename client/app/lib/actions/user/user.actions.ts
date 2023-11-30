"use server";

import UserModel from "../../models/user.model";
import {
  ConversationsType,
  SupabaseConversationType,
} from "../../types/conversation.types";
import { UserFollowingType } from "../../types/user.types";

/**
 * Fetch people that a user is following
 */
export async function fetchUserFollowingAction(username: string) {
  try {
    return (await UserModel.findOne({ username: username })
      .select("following")
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
