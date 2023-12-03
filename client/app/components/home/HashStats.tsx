import { MediaType } from "@/app/lib/types/hash.types";
import CommentBtn from "./links/CommentBtn";
import InformationBtn from "./links/InformationBtn";
import LikeBtn from "./links/LikeBtn";
import RepostBtn from "./links/RepostBtn";
import ShareBtn from "./links/ShareBtn";
import Views from "./links/Views";
import { SummarizedUserType } from "@/app/lib/types/user.types";
import moment from "moment";
import { Separator } from "@/components/ui/separator";

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
  reposted: boolean;
  setReposted: (value: boolean) => void;
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
  setReposted,
}: HashStatsProps) {
  return (
    <div className="flex flex-col justify-center w-full gap-5 mt-5">
      <div className="flex items-center justify-between lg:justify-start lg:gap-10 lg:px-5">
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
      <Separator />
      <div className="flex items-center justify-between">
        {/* Hash Timestamp */}
        <p className="text-accent1/50 text-paragraph">
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
    </div>
  );
}
