import { HashCardProps } from "@/utils/types/hash";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import moment from "moment";

import FormattedWord from "../shared/FormattedWord";
import AuthorMoreMenu from "../shared/AuthorMoreMenu";
import ViewerMoreMenu from "../shared/ViewerMoreMenu";
import ShareMenu from "../shared/ShareMenu";
import VerifiedIcon from "@mui/icons-material/Verified";

import ImageDialog from "./ImageDialog";
import HashLinks from "../shared/HashLinks";

import CachedIcon from "@mui/icons-material/Cached";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const HashCard: FC<HashCardProps> = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  community,
  comments,
  media,
  likes,
  reposts,
}) => {
  let repostedByMe;
  if (reposts.length > 0) {
    if (currentUserId) {
      repostedByMe = reposts.find(
        (repost) => repost.user?.toString() === currentUserId
      );
    }
  }

  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "1s",
      ss: "%ds",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1m",
      MM: "%dm",
      y: "1y",
      yy: "%dy",
    },
  });

  function formatContent(input: string) {
    const words = input.trim().split(/\s+/);

    return words.map((formattedWord, index) => (
      <FormattedWord key={index} text={formattedWord} index={index} />
    ));
  }

  return (
    <article key={id} className="w-full">
      <div className="flex flex-col gap-5 p-5 w-full bg-accent2 rounded-lg">
        {repostedByMe && (
          <p className="italic font-bold text-green-500 flex items-center gap-1">
            <CachedIcon fontSize="small" color="inherit" />
            You reposted
          </p>
        )}
        <div className="flex items-start justify-between gap-3 w-full">
          {/* User Information + Hash Information */}
          <div className="flex w-auto flex-1 flex-row items-center gap-0">
            <HoverCard>
              <HoverCardTrigger>
                <Link href={`/profile/${author.id}`}>
                  <div className="flex w-full flex-1 flex-row items-center justify-start gap-2">
                    <Image
                      src={author.image ?? ""}
                      alt="pp"
                      width={42}
                      height={42}
                      className="rounded-full"
                    />
                    <span className="font-extrabold truncate w-20 lg:w-auto text-white flex items-center gap-0">
                      {author.name}
                    </span>
                    {author.verified && (
                      <span className="flex items-center justify-center">
                        <VerifiedIcon
                          className="text-amber-400"
                          fontSize="small"
                        />
                      </span>
                    )}
                    <span className="font-light text-white truncate w-16 lg:w-auto">
                      {"@"}
                      {author.username}
                    </span>
                  </div>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex flex-col gap-3 w-full h-auto">
                  <div className="flex flex-col gap-1 w-full h-auto">
                    <div className="flex items-center justify-between w-full">
                      <Link href={`/profile/${author.id}`}>
                        <Image
                          src={author.image ?? ""}
                          alt="pp"
                          width={52}
                          height={52}
                          className="rounded-full"
                        />
                      </Link>
                      <button className="bg-gradient-to-b from-primary via-[#1183e8] to-[#0671cb] p-2 rounded-full w-20 z-20 hover:scale-105">
                        Follow
                      </button>
                    </div>
                    <Link href={`/profile/${author.id}`}>
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold truncate w-20 lg:w-auto text-white flex items-center gap-0 hover:underline">
                          {author.name}
                        </span>
                        {author.verified && (
                          <span className="flex items-center justify-center">
                            <VerifiedIcon
                              className="text-amber-400"
                              fontSize="small"
                            />
                          </span>
                        )}
                      </div>
                    </Link>
                    <Link href={`/profile/${author.id}`}>
                      <span className="font-light text-white truncate w-16 lg:w-auto">
                        {"@"}
                        {author.username}
                      </span>
                    </Link>
                  </div>
                  <p className="whitespace-pre-line break-all h-auto w-full text-sm text-white">
                    {author.bio}
                  </p>
                  <div className="grid grid-cols-2 items-center gap-5">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">
                        {author.following?.length ?? 0}
                      </span>
                      <span className="text-light-3 font-light">Following</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">
                        {author.followers?.length ?? 0}
                      </span>
                      <span className="text-light-3 font-light">Followers</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <span className="font-light text-white">
              • {moment(createdAt).fromNow()}
            </span>
          </div>
          {/* More Information */}
          <div className="w-auto flex items-center justify-end">
            {currentUserId === author._id.toString() ? (
              <AuthorMoreMenu
                id={id.toString()}
                authorId={currentUserId?.toString() ?? ""}
              />
            ) : (
              <ViewerMoreMenu
                id={id.toString()}
                authorId={currentUserId?.toString() ?? ""}
                username={author.username ?? ""}
              />
            )}
          </div>
        </div>
        {/* Hash Image + Content */}
        <div className="px-10 flex flex-col gap-3 justify-center w-full">
          <Link href={`/hash/${id}`}>
            <h2 className="whitespace-pre-line break-all h-auto w-full text-sm">
              {formatContent(content)}
            </h2>
          </Link>
          {media && (
            <div
              className={`${
                media?.length > 1
                  ? "grid grid-cols-2 items-center justify-center h-auto border border-light-1 rounded-lg"
                  : "flex items-center justify-center"
              } z-20`}
            >
              {media?.map((m, index) => (
                <div
                  className={`${
                    media?.length > 1
                      ? `w-auto h-auto object-cover ${
                          index === 0 && "rounded-tl-lg"
                        } ${index === 1 && "rounded-tr-lg"} ${
                          index === 2 && "rounded-bl-lg"
                        } ${index === 3 && "rounded-br-lg"}`
                      : "w-full h-full rounded-lg"
                  }`}
                  key={m.id}
                >
                  {/* <div className="z-20"> */}
                  <ImageDialog
                    media={m}
                    commentCount={comments.length}
                    likeCount={likes?.length ?? 0}
                    repostCount={0}
                    viewCount={0}
                    id={id.toString()}
                    currentUserId={currentUserId ?? ""}
                    index={index}
                    liked={likes?.includes(currentUserId ?? "") ?? false}
                  />
                </div>
                // </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between w-full">
          <HashLinks
            commentCount={comments.length}
            likeCount={likes?.length ?? 0}
            repostCount={reposts.length ?? 0}
            viewCount={123456789}
            hashId={id.toString()}
            userId={currentUserId?.toString() ?? ""}
            liked={likes?.includes(currentUserId?.toString() ?? "") ?? false}
            image={author.image ?? ""}
            reposted={repostedByMe ? true : false}
          />
          <div className="w-[10%] flex items-center justify-end">
            <ShareMenu
              id={id.toString()}
              authorId={currentUserId?.toString() ?? ""}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default HashCard;
