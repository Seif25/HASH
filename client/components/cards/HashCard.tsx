import { HashCardProps } from "@/utils/types/hash";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";
import moment from "moment";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BarChartIcon from "@mui/icons-material/BarChart";
import CachedIcon from "@mui/icons-material/Cached";
import { Button } from "../ui/button";
import FormattedWord from "../shared/FormattedWord";
import AuthorMoreMenu from "../shared/AuthorMoreMenu";
import ViewerMoreMenu from "../shared/ViewerMoreMenu";
import ShareMenu from "../shared/ShareMenu";
import VerifiedIcon from "@mui/icons-material/Verified";

import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  verified,
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
    const words = input.split(" ");
    const formattedWords: string[] = [];

    words.forEach((word, index) => {
      if (index === 0) {
        formattedWords.push(word);
      } else {
        formattedWords.push(` ${word}`);
      }
    });

    return formattedWords.map((formattedWord, index) => (
      <FormattedWord key={index} text={formattedWord} index={index} />
    ));
  }
  return (
    <article key={id} className="border-b border-light-3 w-full py-5">
      <div className="flex flex-col gap-5 px-0 lg:p-5 pb-5 w-full bg-dark-3 rounded-lg">
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
                <span className="font-extrabold truncate w-20 lg:w-auto text-light-1 flex items-center gap-0">
                  {author.name}
                </span>
                {verified && (
                  <span className="flex items-center justify-center">
                    <VerifiedIcon className="text-amber-400" />
                  </span>
                )}
                <span className="font-light text-light-3 truncate w-16 lg:w-auto">
                  {"@"}
                  {author.username}
                </span>
              </div>
            </Link>
            <span className="font-light text-light-3">
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
        {/* Hash Image */}
        <Link href={`/hash/${id}`}>
          <div className="px-10 flex flex-col gap-3 justify-center">
            <h2>{formatContent(content)}</h2>
            {media && (
              <div
                className={`${
                  media?.length > 1
                    ? "grid grid-cols-2 gap-3 items-center justify-center h-auto"
                    : "flex items-center justify-center"
                }`}
              >
                {media?.map((m) => (
                  <div
                    className={`${
                      media?.length > 1
                        ? "w-auto h-[250px] rounded-lg p-3 object-cover"
                        : "w-full h-full rounded-lg"
                    }`}
                    key={m.id}
                  >
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        key={m.id}
                        src={m.url}
                        alt={m.alt}
                        fill
                        priority
                        className={`rounded-lg object-cover`}
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Link>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1 w-[90%]">
            <Button
              variant={"ghost"}
              className="flex items-center justify-center gap-3"
            >
              <CommentIcon className="text-[#CBCCFF]" /> 0
            </Button>
            <Button
              variant={"ghost"}
              className="flex items-center justify-center gap-3"
            >
              <CachedIcon className="text-[#CBCCFF]" /> 0
            </Button>
            <Button
              variant={"ghost"}
              className="flex items-center justify-center gap-3"
            >
              <FavoriteBorderIcon className="text-[#CBCCFF]" /> 0
            </Button>
            <Button
              variant={"ghost"}
              className="flex items-center justify-center gap-3"
            >
              <BarChartIcon className="text-[#CBCCFF]" /> 0
            </Button>
          </div>
          <div className="w-[10%] flex items-center justify-end">
            <ShareMenu id={id.toString()} authorId={currentUserId ?? ""} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default HashCard;
