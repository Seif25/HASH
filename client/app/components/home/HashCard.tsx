"use client";

import { HashType } from "@/app/lib/types/hash.types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import HashAuthor from "./HashAuthor";
import moment from "moment";
import Image from "next/image";
import HashStats from "./HashStats";
import HashText from "../shared/text/HashText";
import Link from "next/link";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import HashVideoPreview from "./HashVideoPreview";
import HashCarousel from "./HashCarousel";

interface HashProps {
  hash: HashType;
  loggedInUser: string;
}

export default function HashCard({ hash, loggedInUser }: HashProps) {
  const cols = ["grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4"];
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (hash && loggedInUser) {
      const found = hash.bookmarkedBy?.find(
        (bookmark) => bookmark === loggedInUser
      );
      setBookmarked(found ? true : false);
    }
  }, [hash, loggedInUser]);

  return (
    <div className="bg-accent2 rounded-2xl p-5">
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
      <div className="flex flex-col gap-5">
        {/* Hash Text */}
        <Link href={`/hash/${hash._id}`}>
          <h2 className="text-body lg:text-heading font-normal text-accent1 px-5 pt-5">
            <HashText text={hash.text} />
          </h2>
        </Link>

        {/* Hash Media */}
        {hash.media.length > 0 && (
          <div className="flex items-center justify-start w-full h-auto px-5">
            {hash.media.length === 1 ? (
              <Image
                src={hash.media[0].url}
                alt={hash.media[0].alt}
                width={400}
                height={400}
                className="rounded-2xl w-full lg:w-1/2 bg-accent1 h-80 object-cover"
              />
            ) : (
              // <HashCarousel media={hash.media} />
              <div className="grid grid-cols-2 gap-5 space-y-5 items-center justify-center w-full">
                {hash.media.map((media, index) => (
                  <div>
                    {media.mediaType === "image" ? (
                      <Image
                        src={media.url}
                        alt={media.alt}
                        width={400}
                        height={400}
                        className="rounded-2xl w-full bg-accent1 h-44 object-cover"
                      />
                    ) : (
                      <HashVideoPreview src={media.url} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hash Metadata */}
      <HashStats
        hashId={hash._id}
        commentCount={hash.children.length}
        likeCount={hash.likes.length}
        repostCount={hash.reposts.length}
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
      />
    </div>
  );
}
