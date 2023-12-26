import { HashType, MediaType } from "@/app/lib/types/hash.types";
import CommentBtn from "./links/CommentBtn";
import InformationBtn from "./links/InformationBtn";
import LikeBtn from "./links/LikeBtn";
import RepostBtn from "./links/RepostBtn";
import ShareBtn from "./links/ShareBtn";
import Views from "./links/Views";
import { SummarizedUserType, UserType } from "@/app/lib/types/user.types";
import moment from "moment";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import Image from "next/image";

interface HashStatsProps {
  hashId: string;
  commentCount: number;
  likeCount: number;
  repostCount: number;
  viewCount: number;
  loggedInUser: string;
  hashMedia: MediaType[];
  hashText: string;
  hashAuthor: SummarizedUserType;
  hashLikes: string[];
  pinned: boolean;
  highlighted: boolean;
  bookmarked: boolean;
  restriction: "everyone" | "followers only" | "followed by me";
  createdAt: Date;
  reposted: { status: boolean; user: string };
  comments: HashType[];
  following?: string[];
  setReposted: (value: { status: boolean; user: string }) => void;
  page?: "home" | "hash";
}

export default function HashStats({
  hashId,
  commentCount,
  likeCount,
  repostCount,
  viewCount,
  loggedInUser,
  hashMedia,
  hashText,
  hashAuthor,
  hashLikes,
  pinned,
  highlighted,
  bookmarked,
  restriction,
  createdAt,
  reposted,
  comments,
  following,
  setReposted,
  page = "home",
}: HashStatsProps) {
  const [friends, setFriends] = useState<
    {
      user: string;
      avatar: string;
    }[]
  >([]);
  useEffect(() => {
    if (following) {
      comments.forEach((comment) => {
        if (comment.author?.following?.includes(loggedInUser)) {
          const data = {
            user: comment.author.name,
            avatar: comment.author.image,
          };
          setFriends((prev) => {
            // Check if the user already exists in the friends array
            if (!prev.some((friend) => friend.user === data.user)) {
              // If the user doesn't exist, add the new data
              return [...prev, data];
            } else {
              // If the user already exists, return the previous state
              return prev;
            }
          });
        }
      });
    }

    return () => setFriends([]);
  }, [comments, following]);

  return (
    <div className="flex flex-col justify-center w-full gap-0 mt-5">
      <div
        className={`flex items-center justify-between lg:justify-start lg:gap-10 lg:px-5 ml-5`}
      >
        <CommentBtn
          count={commentCount}
          hashAuthor={hashAuthor}
          hashMedia={hashMedia}
          hashText={hashText}
          commenter={loggedInUser}
          hashId={hashId}
        />
        <LikeBtn
          count={likeCount}
          loggedInUser={loggedInUser}
          likes={hashLikes}
          hashId={hashId}
        />
        <RepostBtn
          count={repostCount}
          loggedInUser={loggedInUser}
          hashId={hashId}
          reposted={reposted}
          setReposted={setReposted}
        />
        <Views count={viewCount} />
      </div>
      {friends.length > 1 && (
        <div className="flex items-center gap-1 ml-7 lg:ml-[52px] px-2 py-2 my-2 border-l border-accent2/10 dark:border-accent1/10">
          <div className="flex items-center">
            {friends.slice(0, 4).map((friend) => (
              <Image
                src={friend.avatar ?? "/assets/profile-pic.png"}
                alt={friend.user}
                key={friend.user}
                width={24}
                height={24}
                className="rounded-full size-5 bg-dark dark:bg-accent1"
              />
            ))}
          </div>
          <h3 className="text-paragraph text-accent2/50 dark:text-accent1/50">
            {friends[0].user} and {commentCount - 1} others commented
          </h3>
        </div>
      )}
      <div
        className={`flex items-center justify-between ml-5 ${
          friends.length > 1 ? "mt-0" : "mt-5"
        }`}
      >
        {/* Hash Timestamp */}
        <p className="text-accent2/50 dark:text-accent1/50 text-paragraph lg:ml-5">
          {moment(createdAt).format("MMM DD YYYY - hh:mm A")}
        </p>
        <div className="flex items-center gap-5">
          <ShareBtn
            hashId={hashId}
            author={hashAuthor.username}
            hashText={hashText}
            bookmarked={bookmarked}
            loggedInUser={loggedInUser}
          />
          <InformationBtn
            loggedInUser={loggedInUser}
            hashAuthor={hashAuthor}
            hashId={hashId}
            pinned={pinned}
            highlighted={highlighted}
            restriction={restriction}
            hashMedia={hashMedia}
            hashText={hashText}
          />
        </div>
      </div>
      {page === "hash" && <Separator className="mt-5" />}
    </div>
  );
}
