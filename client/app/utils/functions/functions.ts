import {
  NotificationGroupedType,
  NotificationType,
} from "@/app/lib/types/notification.types";

var groupBy = function (xs: any[], key: string | number) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

var groupByArray = function (xs: any[], key: string | number) {
  const grouped = xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

  return Object.values(grouped);
};

export const groupNotifications = function (array: NotificationType[]) {
  // Group by type
  const grouped: NotificationGroupedType = groupBy(array, "type");

  // Group each type by action
  const groupedLike = grouped.like
    ? grouped.like?.length > 1
      ? groupByArray(grouped.like, "link")
      : [grouped.like]
    : [];
  const groupedReply = grouped.reply
    ? grouped.reply?.length > 1
      ? groupByArray(grouped.reply, "link")
      : [grouped.reply]
    : [];
  const groupedFollow = grouped.follow
    ? grouped.follow?.length > 1
      ? groupByArray(grouped.follow, "link")
      : [grouped.follow]
    : [];
  const groupedMention = grouped.mention
    ? grouped.mention?.length > 1
      ? groupByArray(grouped.mention, "link")
      : [grouped.mention]
    : [];
  const groupedRepost = grouped.repost
    ? grouped.repost?.length > 1
      ? groupByArray(grouped.repost, "link")
      : [grouped.repost]
    : [];
  // const groupedAdmin = grouped.admin
  //   ? grouped.admin?.length > 1
  //     ? groupByArray(grouped.admin, "link")
  //     : [grouped.admin]
  //   : [];

  return [
    ...groupedLike,
    ...groupedReply,
    ...groupedFollow,
    ...groupedMention,
    ...groupedRepost,
    // ...groupedAdmin,
  ];
};

export const getMediaType = function (url: string): ReturnMediaType {
  const type = url.split(".").pop();
  console.log(url, type);
  if (
    type === "jpg" ||
    type === "jpeg" ||
    type === "png" ||
    type === "gif" ||
    type === "webp"
  ) {
    return "image";
  } else if (
    type === "mp4" ||
    type === "webm" ||
    type === "ogg" ||
    type === "mov"
  ) {
    return "video";
  } else if (
    type === "mp3" ||
    type === "wav" ||
    type === "ogg" ||
    type === "m4a"
  ) {
    return "audio";
  }
  return "unknown";
};

type ReturnMediaType = "image" | "video" | "audio" | "unknown";
