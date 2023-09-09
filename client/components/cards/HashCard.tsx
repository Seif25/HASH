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
}) => {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%ds",
      m: "a minute",
      mm: "%dm",
      h: "an hour",
      hh: "%dh",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
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
      <div className="flex flex-col gap-5 px-0 lg:p-5 pb-5 w-full bg-accent2 rounded-lg">
        <div className="flex items-start justify-between gap-3 w-full">
          {/* User Information + Hash Information */}
          <div className="flex w-auto flex-1 flex-row items-center gap-0">
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
                    <VerifiedIcon className="text-amber-400" fontSize="small" />
                  </span>
                )}
                <span className="font-light text-white truncate w-16 lg:w-auto">
                  {"@"}
                  {author.username}
                </span>
              </div>
            </Link>
            <span className="font-light text-white">
              • {moment(createdAt).fromNow()}
            </span>
          </div>
          {/* More Information */}
          <div className="w-auto flex items-center justify-end">
            {currentUserId === author.id ? (
              <AuthorMoreMenu
                id={id.toString()}
                authorId={currentUserId ?? ""}
              />
            ) : (
              <ViewerMoreMenu
                id={id.toString()}
                authorId={currentUserId ?? ""}
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
                    commentCount={0}
                    likeCount={0}
                    repostCount={0}
                    viewCount={0}
                    id={id.toString()}
                    currentUserId={currentUserId}
                    index={index}
                  />
                </div>
                // </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between w-full">
          <HashLinks
            commentCount={0}
            likeCount={0}
            repostCount={0}
            viewCount={0}
          />
          <div className="w-[10%] flex items-center justify-end">
            <ShareMenu id={id.toString()} authorId={currentUserId ?? ""} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default HashCard;
