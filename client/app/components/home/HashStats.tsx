import { MediaType } from "@/lib/types/hash.types";
import CommentBtn from "./links/CommentBtn";
import InformationBtn from "./links/InformationBtn";
import LikeBtn from "./links/LikeBtn";
import RepostBtn from "./links/RepostBtn";
import ShareBtn from "./links/ShareBtn";
import Views from "./links/Views";
import { SummarizedUserType } from "@/lib/types/user.types";

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
}: HashStatsProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-evenly w-[80%]">
        <CommentBtn
          count={commentCount}
          hashAuthor={hashAuthor}
          hashMedia={hashMedia}
          hashText={hashText}
          commenter={loggedInUser}
        />
        <LikeBtn
          count={likeCount}
          loggedInUser={loggedInUser}
          likes={hashLikes}
        />
        <RepostBtn count={repostCount} />
        <Views count={viewCount} />
      </div>
      <div className="flex items-center justify-evenly w-[20%]">
        <ShareBtn
          hashId={hashId}
          author={hashAuthor.username}
          hashText={hashText}
          bookmarked={bookmarked}
        />
        <InformationBtn
          loggedInUser={loggedInUser}
          hashAuthor={hashAuthor}
          hashId={hashId}
          pinned={pinned}
          highlighted={highlighted}
          restriction={restriction}
        />
      </div>
    </div>
  );
}
