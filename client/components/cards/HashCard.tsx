import { HashCardProps } from "@/utils/types/hash";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BarChartIcon from "@mui/icons-material/BarChart";
import IosShareIcon from "@mui/icons-material/IosShare";
import CachedIcon from "@mui/icons-material/Cached";
import { Button } from "../ui/button";
import FormattedWord from "../shared/FormattedWord";

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
    <article
      key={id}
      className="border-b border-light-3 flex flex-col gap-5 p-5"
    >
      <div className="flex items-start justify-between gap-5">
        {/* User Information + Hash Information */}
        <div className="flex w-full flex-1 flex-row items-center gap-0">
          <Link href={`/profile/${author.id}`}>
            <div className="flex w-full flex-1 flex-row items-center gap-2">
              <Image
                src={author.image ?? ""}
                alt="pp"
                width={42}
                height={42}
                className="rounded-md"
              />
              <span className="font-extrabold truncate w-20 lg:w-auto text-light-1">
                {author.name}
              </span>
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
        <Button variant={"ghost"}>
          <MoreVertIcon className="text-[#CBCCFF]" />
        </Button>
      </div>
      {/* Hash Image */}
      <div className="px-10 flex flex-col gap-3 justify-center w-full">
        <h2>{formatContent(content)}</h2>
        {media && (
          <div
            className={`${
              media?.length > 1
                ? "grid grid-cols-2 gap-5 items-center justify-center"
                : "flex items-center justify-center"
            }`}
          >
            {media?.map((m) => (
              <Image
                key={m.id}
                src={m.url}
                alt={m.alt}
                width={200}
                height={200}
                priority
                layout="responsive"
                className="w-full h-full rounded-lg"
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-10 gap-5">
        <div className="flex items-center justify-evenly gap-3">
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
        <Button variant={"ghost"}>
          <IosShareIcon className="text-[#CBCCFF]" />
        </Button>
      </div>
    </article>
  );
};

export default HashCard;
