// *TYPES
import { User } from "@/utils/types/user.types";

// *SHADCN COMPONENTS
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

// *NEXT COMPONENTS
import Link from "next/link";
import Image from "next/image";

// *ICONS
import { BadgeCheck } from "lucide-react";

// *COMPONENTS
import UserHoverContent from "./UserHoverContent";

// *UTILS
import moment from "moment";


// MODIFY MOMENT LOCALE -> fromNow()
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

interface AuthorInformationProps {
  author: User;
  createdAt: Date;
  currentUser: string;
  hashId: string;
  isComment?: boolean;
}

export default function AuthorInformation({
  author,
  createdAt,
  currentUser,
  hashId,
  isComment,
}: AuthorInformationProps) {
  const isFollowing = author.followers?.includes(currentUser); //TODO: Remove ? after making followers required: [] by default
  return (
    <div className="flex items-start justify-between w-full">
      {/* USER INFORMATION */}
      <div className="flex w-auto flex-1 flex-row items-center gap-0">
        <HoverCard>
          {/* USER INFORMATION */}
          <HoverCardTrigger>
            <Link href={`/profile/${author.username}`}>
              <div className="flex w-full flex-1 flex-row items-center justify-start gap-2">
                <Image
                  src={author.image || "/assets/profile-pic.png"}
                  alt={author.username}
                  width={52}
                  height={52}
                  className="rounded-full"
                  priority
                  placeholder="blur"
                  blurDataURL="/assets/profile-pic.png"
                />
                <div className={`flex flex-col items-start gap-0`}>
                  <span className="font-extrabold truncate w-20 lg:w-auto text-accent1 flex items-center gap-1">
                    {author.name}
                    {author.verified && (
                      <span className="flex items-center justify-center">
                        <BadgeCheck className="text-primary" size={"16px"} />
                      </span>
                    )}
                  </span>
                  <span className="font-light text-accent1/50 truncate w-16 lg:w-auto">
                    {"@"}
                    {author.username}
                  </span>
                </div>
              </div>
            </Link>
          </HoverCardTrigger>
          {/* DETAILED USER INFORMATION */}
          <HoverCardContent>
            <div className="flex flex-col gap-3 w-full h-auto">
              <div className="flex flex-col gap-1 w-full h-auto">
                {/* PROFILE PICTURE & FOLLOW/UNFOLLOW BUTTON */}
                <div className="flex items-center justify-between w-full">
                  <Link href={`/profile/${author.username}`}>
                    <Image
                      src={author.image || "/assets/profile-pic.png"}
                      alt={author.username}
                      width={52}
                      height={52}
                      className="rounded-full"
                      priority
                      placeholder="blur"
                      blurDataURL="/assets/profile-pic.png"
                    />
                  </Link>
                  {currentUser !== author.username && (
                    <UserHoverContent
                      author={author.username}
                      currentUser={currentUser}
                      isFollowing={isFollowing ?? false}
                    />
                  )}
                </div>
                {/* USER INFORMATION */}
                <Link href={`/profile/${author.username}`}>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold truncate w-20 lg:w-auto text-white flex items-center gap-0 hover:underline">
                      {author.name}
                    </span>
                    {author.verified && (
                      <span className="flex items-center justify-center">
                        <BadgeCheck className="text-primary" size={"16px"} />
                      </span>
                    )}
                  </div>
                </Link>
                <Link href={`/profile/${author.username}`}>
                  <span className="font-light text-white truncate w-16 lg:w-auto -mt-1">
                    {"@"}
                    {author.username}
                  </span>
                </Link>
              </div>
              {/* BIO, FOLLOWING & FOLLOWERS */}
              <div className="max-w-xs lg:max-w-4xl">
                <p className="hash-text-wrap h-auto text-sm text-white">
                  {author.bio}
                </p>
              </div>
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
      </div>
      {/* DURATION */}
      <div className="w-auto flex items-center justify-end">
        {!isComment && (
          <span className="font-bold text-accent1/50 ml-1">
            {moment(createdAt).fromNow()}
          </span>
        )}
      </div>
    </div>
  );
}
