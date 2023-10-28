import { MediaType } from "@/lib/types/hash.types";
import CommentBtn from "./links/CommentBtn";
import InformationBtn from "./links/InformationBtn";
import LikeBtn from "./links/LikeBtn";
import RepostBtn from "./links/RepostBtn";
import ShareBtn from "./links/ShareBtn";
import Views from "./links/Views";

interface HashStatsProps {
  commentCount: number;
  likeCount: number;
  repostCount: number;
  viewCount: number;
  loggedInUser: string;
  hashMedia: MediaType[];
  hashText: string;
  hashAuthor: AuthorType;
}

type AuthorType = {
  name: string;
  username: string;
  image: string;
  verified: boolean;
};

export default function HashStats({
  commentCount,
  likeCount,
  repostCount,
  viewCount,
  loggedInUser,
  hashMedia,
  hashText,
  hashAuthor,
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
        <LikeBtn count={likeCount} />
        <RepostBtn count={repostCount} />
        <Views count={viewCount} />
      </div>
      <div className="flex items-center justify-evenly w-[20%]">
        <ShareBtn />
        <InformationBtn />
      </div>
    </div>
  );
}
