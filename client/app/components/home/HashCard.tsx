"use client";

import { HashType } from "@/app/lib/types/hash.types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import HashAuthor from "./HashAuthor";
import Image from "next/image";
import HashStats from "./HashStats";
import HashText from "../shared/text/HashText";
import Link from "next/link";
import { useEffect, useState } from "react";
import HashVideoPreview from "./HashVideoPreview";
import HashCarousel from "./HashCarousel";
import { Pencil, Repeat2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { HashCarousel2 } from "./HashCarousel2";
import { ArrowPathIcon, PencilIcon } from "@heroicons/react/16/solid";
interface HashProps {
  hash: HashType;
  loggedInUser: string;
  following: string[];
  page?: "home" | "hash";
}

const item = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export default function HashCard({
  hash,
  loggedInUser,
  following,
  page = "home",
}: HashProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [reposted, setReposted] = useState<{ status: boolean; user: string }>({
    status: false,
    user: "",
  });

  useEffect(() => {
    if (hash && loggedInUser) {
      const found = hash.bookmarkedBy?.find(
        (bookmark) => bookmark === loggedInUser
      );
      setBookmarked(found ? true : false);

      if (hash.reposts) {
        const found = hash.reposts.find((user) => user.user === loggedInUser);
        if (found) {
          setReposted({ status: true, user: loggedInUser });
        } else {
          const following = hash.author.following;
          const foundFollowing = hash.reposts.find((user) =>
            following.includes(user.user)
          );
          if (foundFollowing) {
            setReposted({ status: true, user: foundFollowing.user });
          }
        }
      }
    }
  }, [hash, loggedInUser]);

  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      className={`bg-white dark:bg-dark rounded-2xl p-5 ${
        page === "hash" && "pb-0"
      }`}
    >
      {hash.edited && (
        <h3 className="text-accent2/50 dark:text-accent1/50 text-paragraph italic flex items-center gap-2 mb-5">
          <PencilIcon className="size-4" />
          Edited
        </h3>
      )}

      {reposted.status && (
        <h3 className="text-emerald-500 font-bold text-paragraph flex items-center gap-2 mb-5 capitalize">
          <ArrowPathIcon className="size-4" />
          {reposted.user === loggedInUser
            ? "You Reposted"
            : `${reposted.user} Reposted`}
        </h3>
      )}

      {/* AUTHOR INFORMATION */}
      <div className="flex items-center justify-between">
        <HoverCard>
          <HoverCardTrigger>
            <HashAuthor
              username={hash.author.username}
              name={hash.author.name}
              image={hash.author.image}
              verified={hash.author.verified}
              hover={false}
              bio={hash.author.bio}
              following={hash.author.following.length}
              followers={hash.author.followers.length}
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <HashAuthor
              username={hash.author.username}
              name={hash.author.name}
              image={hash.author.image}
              verified={hash.author.verified}
              hover={true}
              bio={hash.author.bio}
              following={hash.author.following.length}
              followers={hash.author.followers.length}
            />
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* HASH INFORMATION */}
      <div className="flex flex-col gap-5 lg:ml-5">
        {/* Hash Text */}
        <Link href={`/hash/${hash._id}`}>
          <h2 className="text-body font-normal text-accent2 dark:text-accent1 px-5 pt-5">
            <HashText text={hash.text} />
          </h2>
        </Link>

        {/* Hash Media */}
        {hash.media.length > 0 && (
          <>
            {hash.media.length > 1 ? (
              <div className="w-full flex items-center justify-start lg:px-10">
                <HashCarousel2 hashMedia={hash.media} />
              </div>
            ) : (
              <div className="w-full flex items-center justify-start">
                {hash.media[0]?.mediaType === "image" ? (
                  <Image
                    src={hash.media[0].url}
                    alt={hash.media[0].alt}
                    width={400}
                    height={400}
                    priority
                    className="aspect-square object-cover rounded-xl bg-[#000a13"
                  />
                ) : hash.media[0].mediaType === "video" ? (
                  <AspectRatio ratio={16 / 9}>
                    <HashVideoPreview src={hash.media[0].url} autoplay={true} />
                  </AspectRatio>
                ) : (
                  <></>
                )}
              </div>
            )}
          </>
        )}
        {/* {hash.media.length > 0 && (
          <div className="flex items-center justify-start w-full h-auto">
            {hash.media.length === 1 ? (
              <div className="w-[450px] bg-transparent">
                {hash.media[0].mediaType === "image" ? (
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={`/api/media/download?filename=${hash.media[0].url}&type=image`}
                      alt={hash.media[0].alt}
                      fill
                      priority
                      className="rounded-xl aspect-square bg-dark object-cover"
                    />
                  </AspectRatio>
                ) : hash.media[0].mediaType === "video" ? (
                  <AspectRatio ratio={16 / 9}>
                    <HashVideoPreview
                      src={`/api/media/download?filename=${hash.media[0].url}&type=video`}
                    />
                  </AspectRatio>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 w-full h-auto items-center relative">
                {hash.media.slice(0, 3).map((media, index) => (
                  <div
                    key={media.id}
                    className={`w-[150px] h-[150px] lg:w-[250px] lg:h-[250px] flex items-center justify-center bg-dark rounded-xl`}
                  >
                    {media.mediaType === "image" ? (
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={`/api/media/download?filename=${media.url}&type=image`}
                          alt={media.alt}
                          fill
                          priority
                          className={`${
                            index === 2 && "absolute z-0"
                          } rounded-xl aspect-square bg-transparent object-cover`}
                        />
                        {hash.media.length > 3 && index === 2 && (
                          <div className="absolute z-10 bg-accent2/20 w-[150px] h-[150px] lg:w-[250px] lg:h-[250px] rounded-xl flex items-center justify-center top-0">
                            <h3 className="text-[20px] text-accent2 dark:text-accent1">
                              {`+ ${hash.media.length - 3}`}
                            </h3>
                          </div>
                        )}
                      </AspectRatio>
                    ) : media.mediaType === "video" ? (
                      <AspectRatio ratio={16 / 9}>
                        <HashVideoPreview
                          src={`/api/media/download?filename=${media.url}&type=video`}
                        />
                      </AspectRatio>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
              // <HashCarousel HashMedia={hash.media} />
            )}
          </div>
        )} */}
      </div>

      {/* Hash Metadata */}
      <HashStats
        hashId={hash._id}
        commentCount={hash.children.length}
        likeCount={hash.likes.length}
        repostCount={hash.reposts?.length ?? 0}
        viewCount={hash.views}
        loggedInUser={loggedInUser}
        hashMedia={hash.media}
        hashAuthor={hash.author}
        hashText={hash.text}
        hashLikes={hash.likes}
        pinned={hash.pinned}
        highlighted={hash.highlighted}
        bookmarked={bookmarked}
        restriction={hash.restriction ?? ""}
        createdAt={hash.createdAt}
        reposted={reposted}
        comments={hash.children}
        following={following}
        setReposted={setReposted}
        page={page}
      />
    </motion.div>
  );
}
